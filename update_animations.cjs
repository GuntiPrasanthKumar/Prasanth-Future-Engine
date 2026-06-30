const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const headingVariants = `const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};`;

const contentVariants = `const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};`;

const containerVariants = `const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};`;

const cardVariants = `const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};`;

const glassVariants = `const glassVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};`;

const sectionVariants = `const sectionRevealVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};`;

const variantsCode = `\n${headingVariants}\n${contentVariants}\n${containerVariants}\n${cardVariants}\n${glassVariants}\n${sectionVariants}\n`;

const files = ['About.jsx', 'Projects.jsx', 'Skills.jsx', 'Achievements.jsx', 'Contact.jsx', 'Footer.jsx'];

files.forEach(f => {
  const filePath = path.join(componentsDir, f);
  let c = fs.readFileSync(filePath, 'utf8');

  if (!c.includes('const headingVariants')) {
    c = c.replace(/(import .*?;\n)+(?!\s*import)/, `$&${variantsCode}`);
  }

  // Remove `hasRevealed` state hooks
  c = c.replace(/const \[hasRevealed, setHasRevealed\] = useState\(false\);\n?\s*/g, '');
  c = c.replace(/useEffect\(\(\) => \{ if \(isCoreArrived && !hasRevealed\) setHasRevealed\(true\); \}, \[isCoreArrived, hasRevealed\]\);\n?\s*/g, '');

  // Strip all old initial/animate/transition props from <m.*>
  // This regex matches `initial={...}` or `animate={...}` or `transition={...}` where the content doesn't contain a closing tag >
  // We'll run it a few times to catch all of them.
  c = c.replace(/initial=\{\{[^}]+\}\}/g, '');
  c = c.replace(/animate=\{\{[^}]+\}\}/g, '');
  c = c.replace(/transition=\{\{[^}]+\}\}/g, '');
  // Also clean up any boolean conditionals like animate={{ opacity: hasRevealed ? 1 : 0 }}
  c = c.replace(/initial=\{[^}]+\}/g, '');
  c = c.replace(/animate=\{[^}]+\}/g, '');
  c = c.replace(/transition=\{[^}]+\}/g, '');
  c = c.replace(/variants=\{[^}]+\}/g, ''); // strip any existing variants we might have added

  // Now, inject `variants` based on the tag or class names.
  // 1. Headings (m.h1, m.h2, m.h3) -> headingVariants
  c = c.replace(/<m\.(h[1-6])([^>]*)>/g, '<m.$1 variants={headingVariants} $2>');
  // 2. Main content (m.p) -> contentVariants
  c = c.replace(/<m\.p([^>]*)>/g, '<m.p variants={contentVariants} $2>');
  
  // 3. Wrappers / Cards. This requires more context.
  // Let's find specific components.
  // In About: `timeline-item`
  c = c.replace(/<m\.div([^>]*)className="timeline-item"([^>]*)>/g, '<m.div variants={cardVariants} $1 className="timeline-item" $2>');
  // In Projects: `project-info`, `project-nav`
  // Actually, for Projects, the outer wrapper `<m.div className="project-window"` can be glassVariants.
  c = c.replace(/<m\.div([^>]*)className="project-window"([^>]*)>/g, '<m.div variants={glassVariants} $1 className="project-window" $2>');
  // And `project-info` content? Let's just use contentVariants
  c = c.replace(/<m\.div([^>]*)className="project-info"([^>]*)>/g, '<m.div variants={contentVariants} $1 className="project-info" $2>');

  // 4. Wrap everything in a viewport trigger if not already.
  // We can add `initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}` to the outermost wrapper inside <section>.
  // But wait, it's easier to add it to the <section> itself by making it <m.section>!
  // Wait, I can't just change <section> to <m.section> without importing it if it's not imported.
  // But `m` is imported. Let's do that!
  c = c.replace(/<section([^>]*)>/, '<m.section$1 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}>');
  c = c.replace(/<\/section>/, '</m.section>');

  // Same for footer
  c = c.replace(/<footer([^>]*)>/, '<m.footer$1 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}>');
  c = c.replace(/<\/footer>/, '</m.footer>');

  // Cleanup double spaces
  c = c.replace(/\s+>/g, '>');

  fs.writeFileSync(filePath, c);
});
