import { memo,  useState, useEffect, useRef, useCallback } from 'react';
import { Mail, FileText } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

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

const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const statuses = [
  "ONLINE",
  "READY",
  "AWAITING NEXT MISSION",
  "READY FOR COLLABORATION"
];

const Footer = ({ isCoreArrived }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const statusIndexRef = useRef(0);
  const idleTimeoutRef = useRef(null);
  const cycleIntervalRef = useRef(null);

  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isPreparingResume, setIsPreparingResume] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText('prasanthgunti07@gmail.com');
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

  const handleResumeClick = () => {
    setIsPreparingResume(true);
    setTimeout(() => {
      setIsPreparingResume(false);
      window.open('/resume.pdf', '_blank'); // Update with actual resume path when ready
    }, 300);
  };

  const startCycling = useCallback(() => {
    setStatusIndex(1);
    statusIndexRef.current = 1;

    cycleIntervalRef.current = setInterval(() => {
      setStatusIndex((prev) => {
        const next = (prev + 1) % statuses.length;
        statusIndexRef.current = next;
        return next;
      });
    }, 5000);
  }, []);

  const resetIdle = useCallback(() => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);

    if (statusIndexRef.current !== 0) {
      setStatusIndex(0);
      statusIndexRef.current = 0;
    }

    idleTimeoutRef.current = setTimeout(() => {
      startCycling();
    }, 5000);
  }, [startCycling]);

  useEffect(() => {
    const handleActivity = () => resetIdle();
    
    // Use passive event listeners for performance on scroll/touch
    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('click', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });

    resetIdle();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
    };
  }, [resetIdle]);

  return (
    <m.footer className="footer-section" style={{ position: 'relative' }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionRevealVariants}>
      <div id="ai-core-dock-footer" style={{ position: 'absolute', top: '10%', left: '10%', width: 22, height: 22 }} />
      <div className="footer-divider"></div>
      <div className="footer-top-fade"></div>
      
      <div className="tech-bg-layers">
        <div className="tech-bg-bloom footer-bloom"></div>
        <div className="tech-bg-particles"></div>
        <div className="tech-bg-grain"></div>
      </div>

      <div className="footer-container">
        <div className="footer-row-1">
          <span className="footer-status-dot"></span>
          <span className="footer-label-inline">AI ENGINE</span>
          <div className="footer-status-text-wrapper">
            <AnimatePresence mode="wait">
              <m.span 
                key={statusIndex}
                className="footer-status-inline"
                
                
                exit={{ opacity: 0, y: -10 }}>
                {statuses[statusIndex]}
              </m.span>
            </AnimatePresence>
          </div>
        </div>

        <h2 className="footer-heading">Thanks for Visiting.</h2>

        <div className="footer-desc">
          <p>Let's build intelligent software together.</p>
          <p>Open to internships, AI research and software engineering opportunities.</p>
        </div>

        <div className="footer-social-row">
          <a href="https://github.com/GuntiPrasanthKumar" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
            <div className="footer-social-icon-box">
              <GithubIcon size={20} />
            </div>
            <span className="footer-social-label">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/gunti-prasanth-kumar-68207027a" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
            <div className="footer-social-icon-box">
              <LinkedinIcon size={20} />
            </div>
            <span className="footer-social-label">LinkedIn</span>
          </a>

          <button onClick={handleEmailClick} className="footer-social-link" aria-label="Copy Email Address">
            <div className="footer-social-icon-box">
              <Mail size={20} />
            </div>
            <span className="footer-social-label">Email</span>
          </button>

          <button onClick={handleResumeClick} className="footer-social-link" aria-label="View Resume">
            <div className="footer-social-icon-box">
              <FileText size={20} />
            </div>
            <span className="footer-social-label">{isPreparingResume ? "Preparing..." : "Resume"}</span>
          </button>
        </div>

        <div className="footer-bottom-row">
          <p>© 2026 Prasanth Kumar</p>
          <p className="footer-credits">Built with React • Tailwind CSS • Framer Motion • FastAPI</p>
        </div>
      </div>

      <AnimatePresence>
        {isEmailCopied && (
          <m.div
            className="email-toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}>
            ✓ Email Copied
          </m.div>
        )}
      </AnimatePresence>
    </m.footer>
  );
};

export default memo(Footer);
