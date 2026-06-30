import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const requestRef = useRef(null);

  // Use refs for positions to avoid React re-renders on mousemove
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    const checkTouch = () => {
      return ('ontouchstart' in window) || 
             (navigator.maxTouchPoints > 0) || 
             (navigator.msMaxTouchPoints > 0);
    };

    if (checkTouch() || window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Center cursor initially if possible, or wait for mousemove
    ringPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      if (prefersReducedMotion) {
        // No interpolation
        ringPos.current.x = mouse.current.x;
        ringPos.current.y = mouse.current.y;
      } else {
        // Lerp for smooth follow
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;
      }

      // Apply transforms via CSS variables to allow CSS scaling without position jumping
      if (dotRef.current) {
        dotRef.current.style.setProperty('--x', `${mouse.current.x}px`);
        dotRef.current.style.setProperty('--y', `${mouse.current.y}px`);
      }
      if (ringRef.current) {
        ringRef.current.style.setProperty('--x', `${ringPos.current.x}px`);
        ringRef.current.style.setProperty('--y', `${ringPos.current.y}px`);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    // Global Hover states
    const onMouseOver = (e) => {
      if (!ringRef.current || !dotRef.current) return;
      
      const target = e.target;
      
      // Native text elements and inputs
      const computedStyle = window.getComputedStyle(target);
      if (
        computedStyle.cursor === 'text' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA'
      ) {
        ringRef.current.classList.add('cursor-hidden');
        dotRef.current.classList.add('cursor-hidden');
        return;
      } else {
        ringRef.current.classList.remove('cursor-hidden');
        dotRef.current.classList.remove('cursor-hidden');
      }

      // Clear previous classes
      ringRef.current.className = 'custom-cursor-ring';
      textRef.current.textContent = '';

      // Check buttons
      if (target.closest('button, .btn')) {
        ringRef.current.classList.add('cursor-button');
        return;
      }
      
      // Check links
      if (target.closest('a')) {
        ringRef.current.classList.add('cursor-link');
        return;
      }

      // Check data-cursor attributes
      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const cursorType = cursorTarget.getAttribute('data-cursor');
        const cursorText = cursorTarget.getAttribute('data-cursor-text');
        
        if (cursorType === 'project') {
          ringRef.current.classList.add('cursor-project');
          textRef.current.textContent = 'OPEN';
        } else if (cursorType === 'tech') {
          ringRef.current.classList.add('cursor-tech');
          if (cursorText) textRef.current.textContent = cursorText;
        } else if (cursorType === 'action') {
          ringRef.current.classList.add('cursor-action');
          textRef.current.textContent = 'SELECT';
        }
      }
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.classList.add('cursor-clicked');
    };

    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('cursor-clicked');
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={ringRef} 
        className="custom-cursor-ring" 
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <span ref={textRef} className="cursor-text"></span>
      </div>
      <div 
        ref={dotRef} 
        className="custom-cursor-dot"
        style={{ opacity: isVisible ? 1 : 0 }}
      ></div>
    </>
  );
};

export default CustomCursor;
