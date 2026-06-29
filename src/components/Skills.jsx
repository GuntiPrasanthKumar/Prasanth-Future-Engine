import { motion } from 'framer-motion';
import { Code, Server, Database, Terminal } from 'lucide-react';

const skillCategories = [
  { icon: <Terminal size={32} />, title: 'Languages', tags: ['Java', 'Python', 'JavaScript', 'SQL'] },
  { icon: <Code size={32} />, title: 'Frontend', tags: ['HTML', 'CSS', 'React.js', 'Three.js'] },
  { icon: <Server size={32} />, title: 'Backend', tags: ['FastAPI', 'Node.js', 'REST APIs'] },
  { icon: <Database size={32} />, title: 'Tools & DB', tags: ['MySQL', 'Git', 'Vercel'] },
];

export default function Skills() {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 style={{ fontSize: '3rem', textAlign: 'center' }}>Technical Skills</h2>
        
        <div className="skills-grid">
          {skillCategories.map((c, i) => (
            <div className="skill-card" key={i}>
              <div className="skill-icon">{c.icon}</div>
              <h3 style={{ marginBottom: '1.5rem' }}>{c.title}</h3>
              <div className="tags" style={{ justifyContent: 'center' }}>
                {c.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Certifications</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="tag" style={{ border: '1px solid var(--glass-border)' }}>GitHub Foundations</span>
            <span className="tag" style={{ border: '1px solid var(--glass-border)' }}>MongoDB Associate Developer</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
