import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const Startup = ({ onComplete }) => {
  const [phase, setPhase] = useState('intro');

  useEffect(() => {
    // 0ms: Black screen
    // 200ms: PRASANTH starts fading in (duration 700ms)
    // 900ms: PRASANTH fully visible. Shine starts (duration 600ms)
    // 1050ms: Subtitle starts fading in (150ms after shine starts, duration 350ms)
    // 1400ms: Subtitle finishes. Shine finishes at 1500ms.
    // 1550ms: Hold is complete. Trigger fade out.
    const fadeOutTimer = setTimeout(() => {
      setPhase('outro');
    }, 1550);

    // 1550ms + 350ms fade out = 1900ms.
    // 100ms black pause = 2000ms total duration.
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}
    >
      <AnimatePresence>
        {phase === 'intro' && (
          <m.div
            key="startup-text"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <m.h1 
              className="title"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }} 
              style={{ 
                margin: '0 auto',
                position: 'relative'
              }}
            >
              PRASANTH
              
              <m.span
                initial={{ WebkitMaskPosition: '200% 0' }}
                animate={{ WebkitMaskPosition: '-100% 0' }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  WebkitMaskImage: 'linear-gradient(60deg, transparent 45%, #fff 50%, transparent 55%)',
                  WebkitMaskSize: '200% 100%',
                  WebkitMaskRepeat: 'no-repeat',
                  pointerEvents: 'none'
                }}
              >
                PRASANTH
              </m.span>
            </m.h1>

            <m.div 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 1.05, ease: "easeOut" }}
              style={{ 
                fontSize: '0.75rem', 
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.5)', // Soft gray
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '1.5rem' // Generous spacing
              }}
            >
              ENGINEERING AI WORKSPACE
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Startup;
