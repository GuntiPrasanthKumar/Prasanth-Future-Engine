import { memo,  useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, Server, Terminal, Coffee, Zap, Database, GitBranch, Cloud, ExternalLink, Calendar, Briefcase, BarChart2 } from 'lucide-react';

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

const technologies = [
  { id: 1, name: 'React', subtitle: 'Frontend Library', icon: <SettingsIcon color="#61DAFB" />, 
    experience: '3+ Years', projects: '12+ Projects', proficiency: 95, techUsed: ['JSX', 'Redux', 'Tailwind CSS', 'Vite'], desc: 'A powerful JavaScript library for building fast and interactive user interfaces.' },
  { id: 2, name: 'Node.js', subtitle: 'Runtime Environment', icon: <Server color="#339933" />,
    experience: '2+ Years', projects: '8+ Projects', proficiency: 85, techUsed: ['Express', 'REST APIs', 'WebSockets', 'Jest'], desc: 'Asynchronous event-driven JavaScript runtime designed to build scalable network applications.' },
  { id: 3, name: 'FastAPI', subtitle: 'Web Framework', icon: <Zap color="#009688" />,
    experience: '1+ Years', projects: '4+ Projects', proficiency: 80, techUsed: ['Python', 'Pydantic', 'SQLAlchemy', 'JWT'], desc: 'A modern, fast web framework for building APIs with Python based on standard Python type hints.' },
  { id: 4, name: 'Git', subtitle: 'Version Control', icon: <GitBranch color="#F05032" />,
    experience: '3+ Years', projects: '20+ Projects', proficiency: 90, techUsed: ['GitHub', 'GitLab', 'CI/CD', 'Actions'], desc: 'Distributed version control system for tracking changes in source code during software development.' },
  { id: 5, name: 'REST APIs', subtitle: 'API Integration', icon: <Cloud color="#FFFFFF" />,
    experience: '3+ Years', projects: '15+ Projects', proficiency: 90, techUsed: ['Postman', 'Swagger', 'GraphQL', 'OAuth2'], desc: 'Designing and integrating robust, secure, and scalable RESTful web services.' },
  { id: 6, name: 'MongoDB', subtitle: 'Database', icon: <Database color="#47A248" />,
    experience: '2+ Years', projects: '6+ Projects', proficiency: 85, techUsed: ['Mongoose', 'Aggregation', 'Atlas', 'NoSQL'], desc: 'A document-based, distributed database built for modern application developers and the cloud era.' },
  { id: 7, name: 'Java', subtitle: 'Programming Language', icon: <Coffee color="#ED8B00" />,
    experience: '2+ Years', projects: '5+ Projects', proficiency: 75, techUsed: ['Spring Boot', 'JPA', 'Maven', 'JUnit'], desc: 'A high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.' },
  { id: 8, name: 'Python', subtitle: 'Programming Language', icon: <Terminal color="#3776AB" />,
    experience: '3+ Years', projects: '10+ Projects', proficiency: 90, techUsed: ['Pandas', 'NumPy', 'Scikit-Learn', 'Flask'], desc: 'An interpreted, high-level, general-purpose programming language heavily used in AI and data science.' },
];

function SettingsIcon({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  )
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      particles = [];
      for (let i = 0; i < 90; i++) {
        let layer;
        if (i < 30) layer = 1; // background
        else if (i < 60) layer = 2; // middle
        else layer = 3; // foreground

        const speedBase = layer * 0.1;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speedBase,
          vy: (Math.random() - 0.5) * speedBase,
          radius: layer === 1 ? 0.5 : layer === 2 ? 0.75 : 1,
          opacity: layer === 1 ? 0.05 : layer === 2 ? 0.1 : 0.15,
        });
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x> canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y> canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
};

const TechNode = ({ tech, index, selectedNode, cardVisibleId, radius, onSelect, getCardStyle, setHoveredNodeId, isTransferring }) => {
  const angle = (index / technologies.length) * Math.PI * 2 - Math.PI / 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  const isSelected = selectedNode?.id === tech.id;
  const showCard = cardVisibleId === tech.id;
  const opacity = selectedNode ? (isSelected ? 1 : 0.8) : 1;

  // We rely on Framer Motion's automatic keyframes for pop and breathe
  return (
    <>
      <m.div
        className={`ai-tech-node ${isSelected ? 'active' : ''}`}
        data-cursor="tech"
        data-cursor-text={tech.name}
        style={{ left: `calc(50% + ${x}%)`, top: `calc(50% + ${y}%)`, opacity }}
        onMouseEnter={() => setHoveredNodeId(tech.id)}
        onMouseLeave={() => setHoveredNodeId(null)}
        onClick={onSelect}
        animate={
          isTransferring
            ? { x: "-50%", y: "-50%", scale: 1.2, filter: "brightness(1.5)" }
            : { x: "-50%", y: "-50%", scale: 1 }
        }
        transition={
          isTransferring
            ? {
                scale: { type: "spring", stiffness: 300, damping: 10 },
                default: { duration: 0.35 }
              }
            : { type: "spring", stiffness: 300, damping: 20 }
        }>
        <div className="ai-tech-icon">{tech.icon}</div>
        <div className="ai-tech-title">{tech.name}</div>
        <div className="ai-tech-subtitle">{tech.subtitle}</div>
      </m.div>

    </>
  );
};

const Skills = ({ isCoreArrived }) => {
  const radius = 38;
  const [selectedNode, setSelectedNode] = useState(null);
  const [transferSequence, setTransferSequence] = useState(null);
  const [cardVisibleId, setCardVisibleId] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [idleMessageIndex, setIdleMessageIndex] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const orbitRef = useRef(null);

  const activeCardTech = cardVisibleId ? technologies.find(t => t.id === cardVisibleId) : null;

  const IDLE_MESSAGES = [
    { title: "AI ENGINE", status: "ONLINE" },
    { title: "Awaiting Input...", status: null },
    { title: "Ready", status: null },
    { title: "Select a Technology", status: null }
  ];

  useEffect(() => {
    if (transferSequence) {
      setIdleMessageIndex(0);
      return;
    }

    const timeSinceInteraction = Date.now() - lastInteraction;
    let timer;
    
    if (timeSinceInteraction < 8000) {
      timer = setTimeout(() => {
        setIdleMessageIndex(prev => (prev + 1) % IDLE_MESSAGES.length);
      }, 8000 - timeSinceInteraction);
    } else {
      timer = setTimeout(() => {
        setIdleMessageIndex(prev => (prev + 1) % IDLE_MESSAGES.length);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [transferSequence, lastInteraction, idleMessageIndex]);

  useEffect(() => {
    if (transferSequence?.stage === 'LOADING') {
      const timer = setTimeout(() => {
        setTransferSequence(prev => ({ ...prev, stage: 'CONNECTED' }));
        setCardVisibleId(transferSequence.id);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (transferSequence?.stage === 'CONNECTED') {
      const timer = setTimeout(() => {
        setTransferSequence(null);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [transferSequence]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (orbitRef.current && !orbitRef.current.contains(e.target)) {
        setSelectedNode(null);
        setCardVisibleId(null);
        setTransferSequence(null);
        setLastInteraction(Date.now());
        setIdleMessageIndex(0);
      }
    };
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
        setCardVisibleId(null);
        setTransferSequence(null);
        setLastInteraction(Date.now());
        setIdleMessageIndex(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const getCardStyle = (index) => {
    const offset = '68px';
    if (index === 0) {
      return { transform: `translate(${offset}, -50%)`, originX: 0, originY: 0.5 };
    } else if (index === 1 || index === 2) {
      return { transform: `translate(calc(-100% - ${offset}), -50%)`, originX: 1, originY: 0.5 };
    } else if (index === 3 || index === 4 || index === 5) {
      return { transform: `translate(-50%, calc(-100% - ${offset}))`, originX: 0.5, originY: 1 };
    } else if (index === 6 || index === 7) {
      return { transform: `translate(${offset}, -50%)`, originX: 0, originY: 0.5 };
    }
    return {};
  };

  const activeTransfer = transferSequence?.stage === 'LOADING' ? transferSequence : null;
  
  const getSuccessMessage = (name) => {
    const map = {
      'React': 'React Loaded',
      'Python': 'Runtime Ready',
      'Java': 'JVM Ready',
      'Node.js': 'Server Online',
      'MongoDB': 'Database Connected',
      'FastAPI': 'API Ready',
      'Git': 'Repository Synced',
      'REST APIs': 'Endpoints Available'
    };
    return map[name] || `${name} Ready`;
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 40, stiffness: 60, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const engineX = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  const engineY = useTransform(smoothMouseY, [-1, 1], [-4, 4]);
  const orbitX = useTransform(smoothMouseX, [-1, 1], [2, -2]);
  const orbitY = useTransform(smoothMouseY, [-1, 1], [2, -2]);
  const bgX = useTransform(smoothMouseX, [-1, 1], [6, -6]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [6, -6]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <m.section className="tech-section" id="skills" style={{ position: 'relative' }} onMouseMove={handleMouseMove} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}>
      <div id="ai-core-dock-skills" style={{ position: 'absolute', top: '10%', left: '50%', width: 22, height: 22 }} />
      <m.div style={{ position: 'absolute', inset: -20, pointerEvents: 'none', x: bgX, y: bgY, zIndex: 0 }}>
        <ParticleBackground />
      </m.div>
      <div className="tech-bg-layers">
        <div className="tech-bg-bloom"></div>
        <div className="tech-bg-particles"></div>
        <div className="tech-bg-mesh"></div>
        <div className="tech-bg-grain"></div>
      </div>

      <div className="tech-container">
        <div className="tech-grid">
          <m.div className="tech-left" variants={containerVariants}>
            <m.div className="tech-label" variants={cardVariants}>
              <span>// TECH STACK</span>
            </m.div>
            <m.h2 className="tech-heading" variants={headingVariants}>
              Engineering<br />Toolkit
            </m.h2>
            <m.p className="tech-subtitle" variants={contentVariants}>
              Building intelligent software using modern technologies and AI-powered development tools.
            </m.p>
          </m.div>

          <div className="tech-right">
            <m.div style={{ position: 'absolute', inset: 0, x: orbitX, y: orbitY }}>
              <div className="ai-orbit-container" ref={orbitRef}>
              <div className="ai-orbit-fog"></div>
              <svg className="ai-svg-lines" viewBox="-50 -50 100 100">
                {technologies.map((tech, index) => {
                  const angle = (index / technologies.length) * Math.PI * 2 - Math.PI / 2;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const isSelected = selectedNode?.id === tech.id;
                  const isHovered = hoveredNodeId === tech.id;
                  const isTransferring = activeTransfer?.id === tech.id;
                  const strokeOpacity = isTransferring ? 0.6 : (isSelected ? 0.5 : (isHovered ? 0.4 : 0.25));
                  const strokeWidth = isTransferring ? 0.25 : 0.15;
                  
                  return (
                    <line 
                      key={`line-${tech.id}`}
                      x1="0" y1="0" x2={x} y2={y} 
                      className={`ai-line ${isTransferring ? 'highlighted' : ''}`}
                      style={{ strokeOpacity, strokeWidth }}
                    />
                  );
                })}

                {/* Data Particles */}
                {activeTransfer && technologies.map((tech) => {
                  if (tech.id !== activeTransfer.id) return null;
                  
                  const angle = (technologies.findIndex(t => t.id === tech.id) / technologies.length) * Math.PI * 2 - Math.PI / 2;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <g key={`particles-${tech.id}-${activeTransfer.key}`}>
                      {[0, 1, 2, 3].map((i) => (
                        <m.circle
                          key={i}
                          r="0.25"
                          fill="#FFF"
                          style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))' }}
                          
                          
                          
                        />
                      ))}
                    </g>
                  );
                })}
              </svg>

              {/* Orbital Nodes */}
              {technologies.map((tech, index) => (
                <TechNode
                  key={tech.id}
                  tech={tech}
                  index={index}
                  selectedNode={selectedNode}
                  cardVisibleId={cardVisibleId}
                  radius={radius}
                  isTransferring={activeTransfer?.id === tech.id}
                  onSelect={() => {
                    setLastInteraction(Date.now());
                    if (selectedNode?.id === tech.id) {
                      setSelectedNode(null);
                      setCardVisibleId(null);
                      setTransferSequence(null);
                      setIdleMessageIndex(0);
                    } else {
                      setSelectedNode({ ...tech, index });
                      setCardVisibleId(null);
                      setTransferSequence({ id: tech.id, key: Date.now(), stage: 'LOADING', name: tech.name });
                    }
                  }}
                  setHoveredNodeId={setHoveredNodeId}
                  getCardStyle={getCardStyle}
                />
              ))}

              {/* Central AI Engine */}
              <m.div style={{ position: 'absolute', inset: 0, x: engineX, y: engineY, zIndex: 10, pointerEvents: 'none' }}>
                <m.div 
                  className="ai-core"
                  animate={activeTransfer ? { x: "-50%", y: "-50%", scale: 1.1, filter: "brightness(1.5)" } : { x: "-50%", y: "-50%", scale: 1 }}
                  transition={activeTransfer ? { scale: { type: "spring", stiffness: 300, damping: 10 }, default: { duration: 0.35 } } : { duration: 0 }}>
                  <div className={`ai-core-bloom ${activeTransfer ? 'pulse' : ''}`}></div>
                <div className="ai-ring-outer"></div>
                <div className="ai-ring-dashed"></div>
                <div className="ai-core-glow"></div>
                <div className="ai-core-inner">
                  <AnimatePresence mode="wait">
                    {!transferSequence && (
                      <m.div 
                        key={`idle-${idleMessageIndex}`}
                        
                        
                        exit={{ opacity: 0 }}
                        
                        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="ai-icon-code">
                          <Code2 size={40} strokeWidth={1.5} />
                        </div>
                        {idleMessageIndex === 0 ? (
                          <>
                            <div className="ai-title">AI ENGINE</div>
                            <div className="ai-status">ONLINE</div>
                          </>
                        ) : (
                          <div className="ai-title" style={{ textTransform: 'none', fontSize: '0.9rem', letterSpacing: '2px', color: '#FFF' }}>
                            {IDLE_MESSAGES[idleMessageIndex].title}
                          </div>
                        )}
                      </m.div>
                    )}
                    
                    {transferSequence?.stage === 'LOADING' && (
                      <m.div 
                        key="loading"
                        
                        
                        exit={{ opacity: 0 }}
                        
                        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="ai-title" style={{ textTransform: 'none', fontSize: '0.9rem', letterSpacing: '2px', color: '#FFF' }}>
                          Loading {transferSequence.name}...
                        </div>
                        <div className="ai-status" style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '12px' }}>
                          <m.div   style={{ width: '5px', height: '5px', backgroundColor: '#888', borderRadius: '50%' }} />
                          <m.div   style={{ width: '5px', height: '5px', backgroundColor: '#888', borderRadius: '50%' }} />
                          <m.div   style={{ width: '5px', height: '5px', backgroundColor: '#888', borderRadius: '50%' }} />
                        </div>
                      </m.div>
                    )}

                    {transferSequence?.stage === 'CONNECTED' && (
                      <m.div 
                        key="connected"
                        
                        
                        exit={{ opacity: 0 }}
                        
                        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="ai-title" style={{ color: '#FFF', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                          {getSuccessMessage(transferSequence.name)}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
                </m.div>
              </m.div>

              </div>
            </m.div>
            
            <AnimatePresence>
              {activeCardTech && (
                <div className="context-card-wrapper">
                  <m.div
                    className="context-card"
                    initial={{ opacity: 0, x: 40, scale: 0.96 }}
                    animate={{ 
                      opacity: 1, x: 0, scale: 1,
                      transition: { duration: 0.4, ease: "easeOut", type: "spring", stiffness: 200, damping: 20 }
                    }}
                    exit={{ 
                      opacity: 0, x: -40, scale: 0.96,
                      transition: { duration: 0.22, ease: "easeOut" }
                    }}
                    style={{ pointerEvents: 'auto' }}
                    onClick={(e) => e.stopPropagation()}>
                  <div className="context-header">
                    <div className="context-icon">{activeCardTech.icon}</div>
                    <div className="context-title-group">
                      <div className="context-title">{activeCardTech.name}</div>
                      <div className="context-subtitle">{activeCardTech.subtitle}</div>
                    </div>
                  </div>

                  <div className="context-desc">
                    {activeCardTech.desc}
                  </div>

                  <div className="context-stats">
                    <div className="context-stat-row">
                      <div className="context-stat-label">
                        <Calendar size={14} /> Experience
                      </div>
                      <div className="context-stat-val">{activeCardTech.experience}</div>
                    </div>
                    <div className="context-stat-row">
                      <div className="context-stat-label">
                        <Briefcase size={14} /> Projects Used
                      </div>
                      <div className="context-stat-val">{activeCardTech.projects}</div>
                    </div>
                    <div className="context-stat-row">
                      <div className="context-stat-label">
                        <BarChart2 size={14} /> Proficiency
                      </div>
                      <div className="context-stat-val">{activeCardTech.proficiency}%</div>
                    </div>
                    
                    <div className="context-progress-bg">
                      <div className="context-progress-fill" style={{ width: `${activeCardTech.proficiency}%` }}>
                        <div className="context-progress-glow"></div>
                      </div>
                    </div>
                  </div>

                  <div className="context-tech-used">
                    <div className="context-tech-title">Technologies Used</div>
                    <div className="context-tags">
                      {activeCardTech.techUsed.map((t, i) => (
                        <span key={i} className="context-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="context-buttons">
                    <button className="context-btn">
                      <GitBranch size={14} /> GitHub
                    </button>
                    <button className="context-btn">
                      <ExternalLink size={14} /> Live Demo
                    </button>
                  </div>
                  </m.div>
                </div>
              )}
            </AnimatePresence>
            
          </div>
          
        </div>
      </div>
    </m.section>
  );
};

export default memo(Skills);
