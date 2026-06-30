import { memo, useEffect, useState } from 'react';
import { m } from 'framer-motion';

const AICore = ({ activeTab, onArrive }) => {
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    let timeout;
    const updatePosition = () => {
      const dock = document.getElementById(`ai-core-dock-${activeTab}`);
      if (dock) {
        const rect = dock.getBoundingClientRect();
        // Calculate center of dock
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Only update if changed significantly to avoid jitter
        setTargetPos(prev => {
          if (Math.abs(prev.x - x) > 1 || Math.abs(prev.y - y) > 1) {
            
            // Notify arrival after travel duration (800ms)
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              if (['home', 'projects', 'contact'].includes(activeTab)) {
                setIsPulsing(true);
                setTimeout(() => setIsPulsing(false), 500);
              }
              onArrive(activeTab);
            }, 800);
            
            return { x, y };
          }
          return prev;
        });
      }
    };
    
    // Short timeout to allow React to mount/display the section
    const mountTimeout = setTimeout(updatePosition, 50);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      clearTimeout(mountTimeout);
      clearTimeout(timeout);
      window.removeEventListener('resize', updatePosition);
    };
  }, [activeTab, onArrive]);

  return (
    <m.div
      initial={{ x: -100, y: -100, opacity: 0 }}
      animate={{ 
        x: targetPos.x - 11, // 11 is half of 22px
        y: targetPos.y - 11,
        opacity: targetPos.x > -50 ? 1 : 0
      }}
      transition={{
        x: { duration: 0.8, ease: "easeOut" },
        y: { duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 15px 3px rgba(255, 255, 255, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.8)',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <m.div 
        animate={{ 
          scale: isPulsing ? 1.8 : 1, 
          opacity: isPulsing ? 0 : 0.5 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute'
        }}
      />
    </m.div>
  );
};

export default memo(AICore);
