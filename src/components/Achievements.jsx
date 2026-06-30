import { memo,  useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Award, Database, Rocket, Target, ExternalLink, X } from 'lucide-react';

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

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1, 
    transition: { duration: 0.5, ease: "easeInOut" } 
  }
};

const mobileLineVariants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1, 
    transition: { duration: 0.5, ease: "easeInOut" } 
  }
};

const nodesContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.9 
    }
  }
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.22 }
  }
};

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.4
    }
  }
};

const timelineData = [1, 2, 3, 4];

const Achievements = ({ isCoreArrived }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedCert]);

  return (
    <m.section className="achievements-section" style={{ position: 'relative' }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}>
      <div id="ai-core-dock-achievements" style={{ position: 'absolute', top: '15%', right: '10%', width: 22, height: 22 }} />
      {/* Premium Black & White Background inherited from existing styles */}
      <div className="tech-bg-layers">
        <div className="tech-bg-bloom"></div>
        <div className="tech-bg-particles"></div>
        <div className="tech-bg-mesh"></div>
        <div className="tech-bg-grain"></div>
      </div>

      <div className="achievements-container">
        <m.div className="achievements-header" variants={containerVariants}>
          <m.div className="achievements-label" variants={cardVariants}>ACHIEVEMENTS</m.div>
          <m.h2 className="achievements-heading" variants={headingVariants}>Journey & Certifications</m.h2>
          <m.p className="achievements-subtitle" variants={contentVariants}>
            Milestones that shaped my journey as an AI Engineer.
          </m.p>
        </m.div>
        
        {/* Layout containers prepared for future implementation */}
        <div className="achievements-content">
          <div className="timeline-container" 
            style={{ 
              '--hover-left': hoveredIndex !== null ? `${(hoveredIndex / (timelineData.length - 1)) * 100}%` : '0%',
              '--hover-opacity': hoveredIndex !== null ? 1 : 0
            }}>
            <div className="timeline-track">
              <m.div 
                className="timeline-line desktop-line"
                
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}>
                <m.div 
                  className="timeline-traveling-light desktop-light"
                  style={{ 
                    left: hoveredIndex !== null ? `${(hoveredIndex / (timelineData.length - 1)) * 100}%` : '0%',
                    opacity: hoveredIndex !== null ? 1 : 0
                  }}></m.div>
              </m.div>

              <m.div 
                className="timeline-line mobile-line"
                
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ transformOrigin: 'top' }}>
                <m.div 
                  className="timeline-traveling-light mobile-light"
                  style={{ 
                    top: hoveredIndex !== null ? `${(hoveredIndex / (timelineData.length - 1)) * 100}%` : '0%',
                    opacity: hoveredIndex !== null ? 1 : 0
                  }}></m.div>
              </m.div>
              
              <m.div 
                className="timeline-nodes"
                
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}>
                <m.div className="timeline-node-container">
                  <div className={`timeline-dot ${hoveredIndex === 0 ? 'glow' : ''}`}></div>
                  <span className="timeline-node-label">GitHub Foundations</span>
                </m.div>
                <m.div className="timeline-node-container">
                  <div className={`timeline-dot ${hoveredIndex === 1 ? 'glow' : ''}`}></div>
                  <span className="timeline-node-label">MongoDB Associate Developer</span>
                </m.div>
                <m.div className="timeline-node-container">
                  <div className={`timeline-dot ${hoveredIndex === 2 ? 'glow' : ''}`}></div>
                  <span className="timeline-node-label">ISRO Hackathon</span>
                </m.div>
                <m.div className="timeline-node-container">
                  <div className={`timeline-dot ${hoveredIndex === 3 ? 'glow' : ''}`}></div>
                  <span className="timeline-node-label">Next Mission</span>
                </m.div>
              </m.div>
            </div>
          </div>
          <div className="achievements-cards-area">
            <m.div 
              className="achievements-cards-grid"
              
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}>
              
              {/* Card 1 */}
              <m.div 
                className="achievement-card"
                
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <div className="achievement-card-icon">
                  <Award size={24} />
                </div>
                <h3 className="achievement-card-title">GitHub Foundations</h3>
                <div className="achievement-card-meta">
                  <span>Issuer: GitHub</span>
                  <span className="meta-dot">•</span>
                  <span>Year: 2026</span>
                </div>
                <p className="achievement-card-desc">
                  Certified mastery of core GitHub concepts, version control, and repository management.
                </p>
                <div className="achievement-card-action">
                  <button 
                    className="achievement-btn" 
                    onClick={() => setSelectedCert({
                      name: "GitHub Foundations",
                      issuer: "GitHub",
                      date: "2026",
                      id: "GHF-90210-2026",
                      desc: "Certified mastery of core GitHub concepts, version control, and repository management.",
                      skills: ["Git", "GitHub", "Version Control", "Branches", "Pull Requests", "Repository Management"]
                    })}>
                    <span>View Credential</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </m.div>

              {/* Card 2 */}
              <m.div 
                className="achievement-card"
                
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <div className="achievement-card-icon">
                  <Database size={24} />
                </div>
                <h3 className="achievement-card-title">MongoDB Associate Developer</h3>
                <div className="achievement-card-meta">
                  <span>Issuer: MongoDB</span>
                  <span className="meta-dot">•</span>
                  <span>Year: 2026</span>
                </div>
                <p className="achievement-card-desc">
                  Validated expertise in building, managing, and optimizing MongoDB applications.
                </p>
                <div className="achievement-card-action">
                  <button 
                    className="achievement-btn"
                    onClick={() => setSelectedCert({
                      name: "MongoDB Associate Developer",
                      issuer: "MongoDB",
                      date: "2026",
                      id: "MDB-CERT-1138",
                      desc: "Validated expertise in building, managing, and optimizing MongoDB applications.",
                      skills: ["MongoDB", "NoSQL", "Aggregation Framework", "Data Modeling", "Indexes"]
                    })}>
                    <span>View Credential</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </m.div>

              {/* Card 3 */}
              <m.div 
                className="achievement-card"
                
                onMouseEnter={() => setHoveredIndex(2)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <div className="achievement-card-icon">
                  <Rocket size={24} />
                </div>
                <h3 className="achievement-card-title">ISRO Hackathon</h3>
                <div className="achievement-card-meta">
                  <span>Status: Participant</span>
                  <span className="meta-dot">•</span>
                  <span>Year: 2026</span>
                </div>
                <p className="achievement-card-desc">
                  Participated in the prestigious ISRO space innovation hackathon to solve real-world aerospace challenges.
                </p>
                <div className="achievement-card-action">
                  <button 
                    className="achievement-btn"
                    onClick={() => setSelectedCert({
                      name: "ISRO Space Innovation Hackathon",
                      issuer: "ISRO",
                      date: "2026",
                      id: "PARTICIPANT-404",
                      desc: "Participated in the prestigious ISRO space innovation hackathon to solve real-world aerospace challenges.",
                      skills: ["Problem Solving", "Innovation", "Aerospace Data", "Teamwork"]
                    })}>
                    <span>View Details</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </m.div>

              {/* Card 4 */}
              <m.div 
                className="achievement-card"
                
                onMouseEnter={() => setHoveredIndex(3)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <div className="achievement-card-icon">
                  <Target size={24} />
                </div>
                <h3 className="achievement-card-title">Next Mission</h3>
                <div className="achievement-card-meta">
                  <span>Target: CERN</span>
                  <span className="meta-dot">•</span>
                  <span>Status: In Progress</span>
                </div>
                <p className="achievement-card-desc">
                  Currently aiming for an engineering internship at CERN to explore the frontiers of physics and computing.
                </p>
                <div className="achievement-card-action">
                  <button className="achievement-btn disabled">
                    <span>Pending</span>
                  </button>
                </div>
              </m.div>

            </m.div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <m.div 
            className="certificate-modal-overlay" 
            onClick={() => setSelectedCert(null)}
            
            
            exit={{ opacity: 0 }}>
            <m.div 
              className="certificate-modal" 
              onClick={(e) => e.stopPropagation()}
              
              
              exit={{ opacity: 0, scale: 0.96, y: 12 }}>
              <div className="modal-header">
                <div className="modal-icon-container">
                  <Award size={32} />
                </div>
                <button className="modal-close-btn" onClick={() => setSelectedCert(null)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="modal-body">
                <h3 className="modal-title">{selectedCert.name}</h3>
                
                <div className="modal-meta-grid">
                  <div className="modal-meta-item">
                    <span className="modal-label">Issuer</span>
                    <span className="modal-value">{selectedCert.issuer}</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="modal-label">Issue Year</span>
                    <span className="modal-value">{selectedCert.date}</span>
                  </div>
                  {selectedCert.id && (
                    <div className="modal-meta-item">
                      <span className="modal-label">Credential ID</span>
                      <span className="modal-value font-mono">{selectedCert.id}</span>
                    </div>
                  )}
                </div>

                <div className="modal-divider"></div>

                <div className="modal-desc-section">
                  <span className="modal-label">Description</span>
                  <p className="modal-desc-text">{selectedCert.desc}</p>
                </div>

                {selectedCert.skills && (
                  <div className="modal-skills-section">
                    <span className="modal-label">Skills Covered</span>
                    <div className="modal-skills-flex">
                      {selectedCert.skills.map((skill, i) => (
                        <span key={i} className="modal-skill-pill">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="modal-primary-btn">Verify Certificate</button>
                <button className="modal-secondary-btn" onClick={() => setSelectedCert(null)}>Close</button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </m.section>
  );
};

export default memo(Achievements);
