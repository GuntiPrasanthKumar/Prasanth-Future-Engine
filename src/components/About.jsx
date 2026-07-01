import { useState, useEffect, useMemo } from 'react';
import { m } from 'framer-motion';
import { Cpu, Box, Code, Rocket } from 'lucide-react';

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const glassVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};
const sectionRevealVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

// Reusable animated floating card
const FloatingCard = ({ icon: Icon, title, desc, delay, top, left, right, bottom, floatPath, mousePosition }) => {
  // Simple 3D tilt based on mouse position
  const tiltX = mousePosition.y * 10; // degrees
  const tiltY = mousePosition.x * -10;

  return (
    <m.div
      className="floating-glass-card"
      style={{ top, left, right, bottom, zIndex: 20 }}
      animate={{
        ...floatPath,
        rotateX: tiltX,
        rotateY: tiltY,
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 4,
        ease: 'easeInOut',
        scale: { duration: 0.5, delay, ease: 'easeOut' },
        y: { duration: 0.5, delay, ease: 'easeOut' },
        rotateX: { type: 'spring', stiffness: 50, damping: 20 },
        rotateY: { type: 'spring', stiffness: 50, damping: 20 }
      }}>
      <m.div
        style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div className="card-icon">
          <Icon size={24} />
        </div>
        <div className="card-content">
          <h4 className="card-title">{title}</h4>
          <p className="card-desc">{desc}</p>
        </div>
      </m.div>
    </m.div>
  );
};

export default function About({ isCoreArrived }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate rich background particles (Stars + Dust)
  const particles = useMemo(() => {
    const arr = [];
    // Tiny sharp stars
    for (let i = 0; i < 30; i++) {
      arr.push({
        top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1, blur: 0, opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 5 + 5, delay: Math.random() * 5, type: 'star'
      });
    }
    // Ambient dust (larger, blurred)
    for (let i = 0; i < 20; i++) {
      arr.push({
        top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 4, blur: Math.random() * 4 + 2, opacity: Math.random() * 0.2 + 0.1,
        duration: Math.random() * 10 + 10, delay: Math.random() * 5, type: 'dust'
      });
    }
    return arr;
  }, []);

  return (
    <m.section className="section about-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}>
      <div className="about-layout">
        <div id="ai-core-dock-about" style={{ position: 'absolute', top: '20%', left: '10%', width: 22, height: 22 }} />
        
        {/* LEFT COLUMN: TIMELINE */}
        <div className="timeline-section">
          
          <div className="timeline-group" style={{ marginBottom: '3rem' }}>
            <h2 className="timeline-header">WHO I AM</h2>
            <m.div variants={cardVariants} className="career-objective-card glass-card">
              <p className="career-objective-text">
                I am a passionate software developer and AI enthusiast dedicated to building intelligent solutions that solve complex, real-world problems.
              </p>
            </m.div>
          </div>

          <div className="timeline-group" style={{ marginBottom: '3rem' }}>
            <h2 className="timeline-header">ENGINEERING VISION</h2>
            <m.div variants={cardVariants} className="career-objective-card glass-card">
              <p className="career-objective-text">
                I don't just aspire to work in Artificial Intelligence—I aspire to <span className="highlight">engineer intelligent systems that create real impact</span>.
                <br/><br/>
                My mission is to build products where Artificial Intelligence, software engineering, and human-centered design come together to solve meaningful problems. I am committed to continuously learning, embracing challenging opportunities, and contributing to teams that are shaping the future through innovation, scalability, and engineering excellence.
              </p>
            </m.div>
          </div>

          <div className="timeline-group">
            <h2 className="timeline-header">ACADEMIC JOURNEY</h2>
            <m.div variants={cardVariants}   className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">2023 - 2027</div>
              <h3 className="timeline-title">B.Tech in Information Technology</h3>
              <p className="timeline-inst">Aditya College of Engineering and Technology</p>
            </m.div>
            <m.div variants={cardVariants}   className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">2021 - 2023</div>
              <h3 className="timeline-title">Intermediate (MPC)</h3>
              <p className="timeline-inst">Pragathi Junior College</p>
            </m.div>
            <m.div variants={cardVariants}   className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">2016 - 2021</div>
              <h3 className="timeline-title">High School</h3>
              <p className="timeline-inst">Zilla Parishadh High School</p>
            </m.div>
          </div>

          <div className="timeline-group">
            <h2 className="timeline-header">PROFESSIONAL EXPERIENCE</h2>
            <m.div variants={cardVariants}   className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">MAY 2025 - JUN 2025</div>
              <h3 className="timeline-title">Software Development Intern</h3>
              <p className="timeline-inst">Technical Hub</p>
              <p className="timeline-inst" style={{ marginTop: '0.8rem', opacity: 0.8 }}>
                Built responsive UI modules, supported backend maintained code using Git/GitHub.
              </p>
            </m.div>
          </div>
          
          {/* CORE STRENGTHS (Integrated linearly) */}
          <div className="timeline-group" style={{ marginTop: '1rem' }}>
            <h2 className="timeline-header" style={{ marginBottom: '1rem' }}>CORE STRENGTHS</h2>
            <div className="core-chips">
              <span className="core-chip">AI Engineer</span>
              <span className="core-chip">Problem Solver</span>
              <span className="core-chip">Full Stack Developer</span>
              <span className="core-chip">Always Learning</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PORTRAIT & CARDS */}
        <div className="portrait-section" style={{ perspective: '1000px' }}>
          
          <div className="portrait-visuals">
          {/* Deep Radial Background Glow */}
          <m.div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '800px', height: '800px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 30%, transparent 60%)',
            zIndex: 0,
            x: `calc(-50% + ${mousePosition.x * -20}px)`,
            y: `calc(-50% + ${mousePosition.y * -20}px)`,
          }} />

          {/* Premium Animated SVG Rings - Perfectly Centered */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, zIndex: 1, pointerEvents: 'none' }}>
            {/* Outer dotted ring */}
            <m.svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '-350px', left: '-350px', width: '700px', height: '700px', opacity: 0.5, filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8)) drop-shadow(0 0 10px rgba(255,255,255,0.4))' }}>
              <circle cx="50" cy="50" r="48" fill="none" stroke="#fff" strokeWidth="0.15" strokeDasharray="1 3" />
            </m.svg>
            {/* Middle segmented ring */}
            <m.svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '-300px', left: '-300px', width: '600px', height: '600px', opacity: 0.6, filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8)) drop-shadow(0 0 15px rgba(255,255,255,0.4))' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#fff" strokeWidth="0.2" strokeDasharray="20 10 5 10" />
            </m.svg>
            {/* Inner faint ring */}
            <m.svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '-200px', left: '-200px', width: '400px', height: '400px', opacity: 0.7, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8)) drop-shadow(0 0 20px rgba(255,255,255,0.4))' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeWidth="0.1" />
            </m.svg>
          </div>
          
          {/* Almost Invisible Platform (Centered under portrait) */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            marginTop: '150px', // Push down below portrait center
            marginLeft: '-200px', // Center horizontally
            width: '400px',
            height: '80px',
            borderRadius: '50%',
            transform: 'rotateX(75deg)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            boxShadow: '0 0 20px rgba(255,255,255,0.02)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          {/* Particle Field */}
          <div style={{ position: 'absolute', inset: -150, zIndex: 2, pointerEvents: 'none' }}>
            {particles.map((p, i) => (
              <m.div
                key={i}
                className="particle"
                style={{ 
                  top: p.top, left: p.left, width: p.size, height: p.size, 
                  filter: `blur(${p.blur}px)`, opacity: p.opacity,
                  boxShadow: p.type === 'star' ? '0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.8)' : '0 0 20px rgba(255,255,255,0.4)'
                }}
                
                
              />
            ))}
          </div>

          {/* Floating Portrait with Mask & Glow */}
          <m.div 
            className="portrait-image-wrapper"
            style={{ 
              position: 'relative', 
              zIndex: 10,
              width: '400px',
              x: mousePosition.x * 10, // Subtle Mouse Parallax
              y: mousePosition.y * 10,
            }}>
            <img loading="lazy" decoding="async" 
              src="/23P31A1285_processed.png" 
              alt="Prasanth" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                objectFit: 'cover'
              }} 
            />
          </m.div>
          </div>



          {/* FLOATING SKILL CARDS CONTAINER */}
          <div className="cards-wrapper">
            {/* Top Left (Move up/down) */}
            <FloatingCard 
              icon={Cpu} title="AI Engineer" desc="Building intelligent solutions for the future."
              delay={0.1} top="-220px" left="-380px"
              mousePosition={mousePosition}
              floatPath={{ y: [-15, 15, -15] }}
            />

            {/* Top Right (Drift left/right) */}
            <FloatingCard 
              icon={Box} title="Problem Solver" desc="Turning complex problems into simple solutions."
              delay={0.3} top="-150px" left="180px"
              mousePosition={mousePosition}
              floatPath={{ x: [-15, 15, -15] }}
            />

            {/* Bottom Left (Diagonal) */}
            <FloatingCard 
              icon={Code} title="Full Stack Developer" desc="Crafting seamless web experiences."
              delay={0.5} top="120px" left="-400px"
              mousePosition={mousePosition}
              floatPath={{ x: [-10, 10, -10], y: [-10, 10, -10] }}
            />

            {/* Bottom Right (Circular) */}
            <FloatingCard 
              icon={Rocket} title="Always Learning" desc="Exploring new tech and building everyday."
              delay={0.7} top="180px" left="150px"
              mousePosition={mousePosition}
              floatPath={{ 
                x: [0, 15, 0, -15, 0], 
                y: [15, 0, -15, 0, 15], 
                rotate: [0, 2, 0, -2, 0] 
              }}
            />
          </div>

        </div>
      </div>
    </m.section>
  );
}
