import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Code } from 'lucide-react';

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

const projects = [
  {
    title: 'AI Forensic Lab',
    desc: 'AI-based web app to classify text as human-written or AI-generated using advanced NLP metrics and neural networks.',
    img: '/ai_forensic_lab_1782470998769.png',
    tags: ['React', 'FastAPI', 'NLP', 'Neural Net'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'SCOMC Dashboard',
    desc: 'Municipal e-Governance platform for complaint tracking, city operations, and real-time data analytics.',
    img: '/scomc_dashboard_1782471009610.png',
    tags: ['Frontend', 'Backend', 'Data Vis', 'Dashboard'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'SkillTrove',
    desc: 'AI-enabled learning platform for students with topic-based learning, holographic knowledge cards, and coding support.',
    img: '/skill_trove_1782471021819.png',
    tags: ['AI', 'Education', 'Full-stack', 'Interactive'],
    demoUrl: '#',
    githubUrl: '#'
  }
];

// Swipe detection logic
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function Projects({ isCoreArrived }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Subtle Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <m.section className="section" style={{ height: '100vh', overflow: 'hidden', padding: '0 5vw' }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}>
      <div className="projects-layout">
        
        {/* LEFT COLUMN: Controls & Info */}
        <div className="projects-left">
          <div id="ai-core-dock-projects" style={{ position: 'absolute', top: '20%', right: '40%', width: 22, height: 22 }} />
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fff' }} />
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)' }}>Portfolio</span>
            </div>
            
            <m.h2 variants={headingVariants} style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-2px' }}>
              Selected<br/>Works
            </m.h2>
            
            <m.p variants={contentVariants} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Drag, swipe, or click to explore my latest creations.
            </m.p>

            <div className="projects-indicator">
              0{currentIndex + 1} <span style={{ color: 'rgba(255,255,255,0.3)' }}>/ 0{projects.length}</span>
            </div>

            <div className="projects-progress-bar">
              <div 
                className="projects-progress-fill" 
                style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
              />
            </div>

            <div className="projects-nav">
              <button className="projects-nav-btn" onClick={prevProject}>
                <ChevronLeft size={24} />
              </button>
              <button className="projects-nav-btn" onClick={nextProject}>
                <ChevronRight size={24} />
              </button>
            </div>
          </m.div>
        </div>

        {/* RIGHT COLUMN: Cover Flow Carousel */}
        <div className="projects-right">
          <div 
            className="coverflow-container"
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
            }}>
            <AnimatePresence>
              {projects.map((project, i) => {
                // Calculate relative position
                let relativeIndex = i - currentIndex;
                // Handle wrapping for infinite feel
                if (relativeIndex> 1) relativeIndex -= projects.length;
                if (relativeIndex < -1) relativeIndex += projects.length;

                // We only render active, previous, and next to save performance
                if (Math.abs(relativeIndex)> 1) return null;

                const isActive = relativeIndex === 0;
                const isLeft = relativeIndex === -1;
                const isRight = relativeIndex === 1;

                // Animate properties based on state
                let zIndex = isActive ? 10 : 5;
                let scale = isActive ? 1 : 0.82;
                let rotateY = isActive ? 0 : (isLeft ? 22 : -22);
                let x = isActive ? '0%' : (isLeft ? '-30%' : '30%');
                let opacity = isActive ? 1 : 0.5;
                let filter = isActive ? 'blur(0px)' : 'blur(4px)';

                return (
                  <m.div
                    key={i}
                    className="coverflow-card"
                    data-cursor={isActive ? "project" : undefined}
                    whileTap={isActive ? { scale: 0.98, transition: { duration: 0.14, ease: "easeOut" } } : {}}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (!isActive) return;
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) {
                        nextProject();
                      } else if (swipe> swipeConfidenceThreshold) {
                        prevProject();
                      }
                    }}
                    onClick={() => {
                      if (isLeft) prevProject();
                      if (isRight) nextProject();
                    }}
                    animate={{ zIndex, scale, rotateY, x, opacity, filter }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{
                      cursor: isActive ? 'grab' : 'pointer',
                      boxShadow: isActive ? 'var(--shadow-md)' : '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                    whileHover={isActive ? { y: -6, backgroundColor: 'var(--glass-bg-hover)', borderColor: 'var(--glass-border-hover)', boxShadow: 'var(--shadow-lg)', transition: { duration: 0.22, ease: "easeOut" } } : {}}>
                    <div className="coverflow-img-wrapper">
                      <img loading="lazy" decoding="async" src={project.img} alt={project.title} className="coverflow-img" />
                    </div>
                    <div className="coverflow-content">
                      <div>
                        <h3 className="coverflow-title">{project.title}</h3>
                        <p className="coverflow-desc">{project.desc}</p>
                        <div className="coverflow-tags">
                          {project.tags.map(t => <span className="coverflow-tag" key={t}>{t}</span>)}
                        </div>
                      </div>
                      <div className="coverflow-actions">
                        <button className="action-btn"><ExternalLink size={18} /></button>
                        <button className="action-btn"><Code size={18} /></button>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Bottom Thumbnails */}
          <div style={{ position: 'absolute', bottom: '1rem', display: 'flex', gap: '1rem', zIndex: 20 }}>
            {projects.map((p, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden',
                  border: currentIndex === i ? '2px solid #fff' : '2px solid transparent',
                  boxShadow: currentIndex === i ? '0 0 15px rgba(255,255,255,0.8)' : 'none',
                  cursor: 'pointer', transition: 'all 0.3s ease', opacity: currentIndex === i ? 1 : 0.5,
                  padding: 0, background: 'transparent'
                }}>
                <img loading="lazy" decoding="async" src={p.img} alt={`thumb-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </m.section>
  );
}
