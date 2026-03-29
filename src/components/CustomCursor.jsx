import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Smooth lerp following
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Frame loop for lerping
    const render = () => {
      cursorX += (mouseX - cursorX) * 0.15; // Smooth lag
      cursorY += (mouseY - cursorY) * 0.15;
      
      if (cursor) {
        gsap.set(cursor, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50,
        });
      }
      
      requestAnimationFrame(render);
    };
    
    requestAnimationFrame(render);

    // Hover detection
    const handleMouseOver = (e) => {
      // Find closest anchor or button
      if (e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
        gsap.to(cursor, { scale: 1.2, duration: 0.2, ease: 'power2.out' });
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(false);
        gsap.to(cursor, { scale: 1, duration: 0.2, ease: 'power2.out' });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        fontSize: '2rem',
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
      }}
    >
      {isHovering ? '👆' : '✋'}
    </div>
  );
};

export default CustomCursor;
