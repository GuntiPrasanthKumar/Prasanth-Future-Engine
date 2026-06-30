import { memo,  useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Bot, Check } from 'lucide-react';

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

const Contact = ({ isCoreArrived }) => {
  const [selectedChip, setSelectedChip] = useState(null);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [aiResponseStage, setAiResponseStage] = useState(0);
  const [hasFormRevealed, setHasFormRevealed] = useState(false);
  
  const greetings = [
    ["Hello.", "I'm FRIDAY, your AI Assistant.", "How can I help you today?"],
    ["Welcome.", "I'm FRIDAY.", "What brings you here today?"],
    ["Hi there.", "I'm FRIDAY.", "I'm ready to help."],
    ["Hello.", "Communication channel established.", "Choose a purpose below."],
    ["Welcome.", "I'm FRIDAY.", "What would you like to discuss today?"]
  ];

  // Initialize randomly on mount
  useEffect(() => {
    setGreetingIndex(Math.floor(Math.random() * greetings.length));
  }, []);

  // Rotate greeting every 12 seconds if not interacting
  useEffect(() => {
    if (isInteracting) return;
    
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 12000);
    
    return () => clearInterval(interval);
  }, [isInteracting, greetings.length]);

  const quickActions = [
    {
      id: "hiring",
      icon: "🎯",
      title: "I'm Hiring",
      desc: "Looking for an AI Engineer or Software Developer.",
      aiPart1: "Excellent. Hiring communication channel established.",
      aiPart2: "Please share the opportunity below.",
      placeholder: "Tell me about the opportunity...",
      buttonText: "Submit Opportunity"
    },
    {
      id: "project",
      icon: "🚀",
      title: "I Have a Project",
      desc: "Let's build something amazing together.",
      aiPart1: "Project detected. I'd love to hear more.",
      aiPart2: "Describe your project below.",
      placeholder: "Describe your project...",
      buttonText: "Initiate Project"
    },
    {
      id: "collab",
      icon: "🤝",
      title: "Let's Collaborate",
      desc: "Open source, startup or research collaboration.",
      aiPart1: "Collaboration request received. I'm ready.",
      aiPart2: "Tell me what you'd like to build.",
      placeholder: "Tell me what you'd like to build...",
      buttonText: "Begin Collaboration"
    },
    {
      id: "intern",
      icon: "🎓",
      title: "Internship Opportunity",
      desc: "Discuss internships or research opportunities.",
      aiPart1: "Internship opportunity received. I'm ready.",
      aiPart2: "Please share the details below.",
      placeholder: "Share the internship details...",
      buttonText: "Share Opportunity"
    },
    {
      id: "idea",
      icon: "💡",
      title: "I Have an Idea",
      desc: "Share an idea or product concept.",
      aiPart1: "Creativity detected. I'm listening.",
      aiPart2: "Tell me about your idea.",
      placeholder: "Tell me about your idea...",
      buttonText: "Share Idea"
    },
    {
      id: "hello",
      icon: "💬",
      title: "Just Say Hello",
      desc: "No agenda. Just start a conversation.",
      aiPart1: "Hello 👋",
      aiPart2: "Feel free to tell me anything.",
      placeholder: "Type your message...",
      buttonText: "Send Message"
    }
  ];

  const handleChipSelect = (action) => {
    if (selectedChip?.id === action.id) return;
    setSelectedChip(action);
    setAiResponseStage(1); // 1 = typing indicator
  };

  useEffect(() => {
    if (aiResponseStage === 1) {
      // Show typing indicator for 700ms then show part 1
      const timer = setTimeout(() => setAiResponseStage(2), 700);
      return () => clearTimeout(timer);
    } else if (aiResponseStage === 2) {
      if (selectedChip?.aiPart2) {
        // Pause then show part 2
        const timer = setTimeout(() => {
          setAiResponseStage(3);
          setHasFormRevealed(true);
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        // Just say hello - no part 2, go straight to form reveal
        const timer = setTimeout(() => {
          setAiResponseStage(3);
          setHasFormRevealed(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [aiResponseStage, selectedChip]);

  return (
    <m.section className="terminal-section" style={{ position: 'relative' }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}>
      <div id="ai-core-dock-contact" style={{ position: 'absolute', top: '20%', left: '10%', width: 22, height: 22 }} />
      <div className="tech-bg-layers">
        <div className="tech-bg-bloom terminal-bloom"></div>
        <div className="tech-bg-particles"></div>
        <div className="tech-bg-mesh"></div>
        <div className="tech-bg-grain"></div>
      </div>

      <div className="terminal-container">
        <div className="terminal-header-area">
          <span className="terminal-protocol">COMMUNICATION PROTOCOL</span>
          <h2 className="terminal-title">AI COMMUNICATION TERMINAL</h2>
        </div>

        <div className="terminal-glass-card">
          <m.div className="terminal-friday-header">
            <div className="friday-avatar-ring">
              <Bot size={20} className="friday-icon" />
            </div>
            <div className="friday-status">
              <span className="friday-status-dot"></span>
              <span className="friday-status-text">FRIDAY ONLINE</span>
            </div>
          </m.div>
          <div className="terminal-ai-bubble">
            {true && <AnimatePresence mode="wait">
              {!selectedChip ? (
                <m.div
                  key={`greeting-${greetingIndex}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.3 }
                    },
                    exit: { opacity: 0, transition: { duration: 0.35 } }
                  }}
                  className="ai-greeting-lines">
                  {greetings[greetingIndex].map((line, idx) => (
                    <m.p variants={contentVariants} key={idx} className="ai-greeting-line">
                      {line}
                    </m.p>
                  ))}
                </m.div>
              ) : (
                <m.div
                  key={`response-${selectedChip.id}`}
                  
                  
                  exit={{ opacity: 0 }}
                  
                  className="ai-greeting-lines">
                  <AnimatePresence mode="wait">
                    {aiResponseStage === 1 ? (
                      <m.div
                        key="typing"
                        
                        
                        exit={{ opacity: 0 }}>
                        <div className="typing-indicator" style={{ paddingTop: '0.2rem' }}>
                          <span></span><span></span><span></span>
                        </div>
                      </m.div>
                    ) : (
                      <m.div
                        key="text">
                        <p>{selectedChip.aiPart1}</p>
                        {aiResponseStage>= 3 && selectedChip.aiPart2 && (
                          <m.p variants={contentVariants} className="ai-response-part2">
                            {selectedChip.aiPart2}
                          </m.p>
                        )}
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              )}
            </AnimatePresence>}

            <div className="ai-available-section">
              <span className="ai-available-label">AVAILABLE FOR</span>
              <div className="ai-available-chips">
                {["AI Engineering", "Software Development", "Research", "Internships"].map(skill => (
                  <span key={skill} className="ai-available-chip">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="ai-quick-actions-wrapper">
            <span className="ai-available-label" style={{ marginBottom: '1rem', marginTop: '1rem' }}>HOW CAN I HELP YOU TODAY?</span>
            
            <div className="ai-quick-actions-grid">
              {quickActions.map(action => {
                const isActive = selectedChip?.id === action.id;
                return (
                  <button 
                    key={action.id}
                    className={`ai-quick-action-card ${isActive ? 'active' : ''}`}
                    onClick={() => handleChipSelect(action)}
                    data-cursor="action">
                    <div className="quick-action-icon">{action.icon}</div>
                    <div className="quick-action-content">
                      <span className="quick-action-title">{action.title}</span>
                      <span className="quick-action-desc">{action.desc}</span>
                    </div>
                    {isActive && (
                      <div className="quick-action-check">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>


          <AnimatePresence>
            {hasFormRevealed && selectedChip && (
              <m.div 
                className="terminal-form-wrapper"
                
                
                exit={{ opacity: 0, y: -20 }}>
                <form className="terminal-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="terminal-form-row">
                    <div className="terminal-form-group">
                      <input type="text" id="fullName" className="terminal-input" placeholder=" " 
                             onFocus={() => setIsInteracting(true)} onBlur={() => setIsInteracting(false)} />
                      <label htmlFor="fullName" className="terminal-label">Full Name</label>
                    </div>
                    <div className="terminal-form-group">
                      <input type="email" id="email" className="terminal-input" placeholder=" " 
                             onFocus={() => setIsInteracting(true)} onBlur={() => setIsInteracting(false)} />
                      <label htmlFor="email" className="terminal-label">Email Address</label>
                    </div>
                  </div>
                  
                  <div className="terminal-form-group">
                    <textarea id="message" className="terminal-textarea" placeholder={selectedChip.placeholder}
                              onFocus={() => setIsInteracting(true)} onBlur={() => setIsInteracting(false)}></textarea>
                    <label htmlFor="message" className="terminal-label">Message</label>
                  </div>

                  <button type="submit" className="terminal-submit-btn">
                    <span>{selectedChip.buttonText}</span>
                  </button>
                </form>
              </m.div>
            )}
          </AnimatePresence>

          <div className="terminal-status-bar">
            <span className="terminal-status-label">COMMUNICATION STATUS</span>
            <div className="terminal-status-indicator">
              <span className="terminal-status-dot"></span>
              <span className="terminal-status-text">READY</span>
            </div>
          </div>
        </div>
      </div>
    </m.section>
  );
};

export default memo(Contact);
