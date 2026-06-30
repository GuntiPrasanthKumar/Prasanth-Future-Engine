import { useState, useRef, useEffect, useCallback } from 'react';
import { m, LazyMotion, domMax, useInView  } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Home, User, Briefcase, Code, Mail, Trophy } from 'lucide-react';
import Scene from './components/Scene';
import AICore from './components/AICore';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Custom easing function (easeInOutQuad)
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [coreArrivedAt, setCoreArrivedAt] = useState('home');
  const [isFocusShifting, setIsFocusShifting] = useState(false);
  const scrollRafRef = useRef(null);
  const isScrollingRef = useRef(false);

  const cancelScroll = useCallback(() => {
    if (isScrollingRef.current) {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      isScrollingRef.current = false;
      setIsFocusShifting(false);
    }
  }, []);

  // Listen for manual interruptions
  useEffect(() => {
    const handleInterrupt = () => cancelScroll();
    window.addEventListener('wheel', handleInterrupt, { passive: true });
    window.addEventListener('touchstart', handleInterrupt, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        handleInterrupt();
      }
    }, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleInterrupt);
      window.removeEventListener('touchstart', handleInterrupt);
      window.removeEventListener('keydown', handleInterrupt);
    };
  }, [cancelScroll]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCoreArrivedAt(null);
    cancelScroll(); // Cancel any ongoing programmatic scroll
    
    // Wait 120ms before starting the transition
    setTimeout(() => {
      setIsFocusShifting(true);
      
      const targetElement = document.getElementById(`ai-core-dock-${tab}`);
      if (!targetElement) {
        setIsFocusShifting(false);
        return;
      }
      
      // Calculate target scroll position (center the dock roughly)
      const targetY = Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - 100);
      const startY = window.scrollY;
      const distance = Math.abs(targetY - startY);
      
      if (distance < 5) {
          setIsFocusShifting(false);
          return;
      }

      // Adapt duration based on distance
      let duration = distance < 1500 ? 450 : distance > 3000 ? 850 : 450 + ((distance - 1500) / 1500) * 400;
      
      let startTime = null;
      isScrollingRef.current = true;
      
      const scrollStep = (timestamp) => {
        if (!isScrollingRef.current) return; // Interrupted
        if (!startTime) startTime = timestamp;
        
        const elapsed = timestamp - startTime;
        let progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOut(progress);
        
        window.scrollTo(0, startY + (targetY - startY) * easeProgress);
        
        // Restore focus shift when nearing destination
        if (progress > 0.8 && isScrollingRef.current) {
          setIsFocusShifting(false);
        }
        
        if (progress < 1) {
          scrollRafRef.current = requestAnimationFrame(scrollStep);
        } else {
          isScrollingRef.current = false;
          setIsFocusShifting(false); // Ensure it's off
        }
      };
      
      scrollRafRef.current = requestAnimationFrame(scrollStep);
      
    }, 120);
  };

  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { amount: 0.1 });

  return (
    <LazyMotion features={domMax}>
    <>
      <CustomCursor />
      <div id="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Scene />
        </Canvas>
      </div>

      <div className="overlay">
        {/* Subtle top gradient and logo to fill free space */}
        <AICore activeTab={activeTab} onArrive={setCoreArrivedAt} />
        <div id="ai-core-dock-home" style={{ position: 'absolute', top: '5vh', left: '50vw' }} />
        <div className="top-gradient"></div>
        <div style={{ position: 'absolute', top: '2rem', left: '5vw', zIndex: 10 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>Prasanth</h1>
        </div>

        <m.div
          animate={{
            opacity: isFocusShifting ? 0.97 : 1,
            scale: isFocusShifting ? 0.997 : 1,
            filter: isFocusShifting ? 'blur(1.2px)' : 'blur(0px)'
          }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
        >
          <div className={activeTab === 'home' ? '' : 'hidden-section'}>
            <Hero isCoreArrived={coreArrivedAt === 'home'} />
          </div>
          
          <div className={activeTab === 'about' ? '' : 'hidden-section'}>
            <About isCoreArrived={coreArrivedAt === 'about'} />
          </div>
          <div className={activeTab === 'projects' ? '' : 'hidden-section'}>
            <Projects isCoreArrived={coreArrivedAt === 'projects'} />
          </div>
          <div className={activeTab === 'skills' ? '' : 'hidden-section'}>
            <Skills isCoreArrived={coreArrivedAt === 'skills'} />
          </div>
          <div className={activeTab === 'achievements' ? '' : 'hidden-section'}>
            <Achievements isCoreArrived={coreArrivedAt === 'achievements'} />
          </div>
          <div className={activeTab === 'contact' ? '' : 'hidden-section'}>
            <Contact isCoreArrived={coreArrivedAt === 'contact'} />
          </div>
        </m.div>

        {/* Unique Bottom Navbar */}
        <m.nav 
          className="bottom-nav"
          initial={{ x: "-50%" }}
          animate={{
            opacity: footerInView ? 0 : 1,
            y: footerInView ? 30 : 0,
            x: "-50%",
            pointerEvents: footerInView ? 'none' : 'auto'
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button 
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleTabChange('home')}
            title="Home"
          >
            <Home size={20} />
          </button>
          <button 
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => handleTabChange('about')}
            title="About"
          >
            <User size={20} />
          </button>
          <button 
            className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => handleTabChange('projects')}
            title="Projects"
          >
            <Briefcase size={20} />
          </button>
          <button 
            className={`nav-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => handleTabChange('skills')}
            title="Skills"
          >
            <Code size={20} />
          </button>
          <button 
            className={`nav-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => handleTabChange('achievements')}
            title="Achievements"
          >
            <Trophy size={20} />
          </button>
          <button 
            className={`nav-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => handleTabChange('contact')}
            title="Contact"
          >
            <Mail size={20} />
          </button>
        </m.nav>

        <div ref={footerRef}>
          <Footer isCoreArrived={coreArrivedAt === 'footer'} />
        </div>
      </div>
    </>
    </LazyMotion>
  );
}

export default App;
