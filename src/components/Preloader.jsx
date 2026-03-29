import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // Animate text reveal
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 50, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }
    )
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.in'
    })
    // Slide up the container
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut'
    });
    
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="preloader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 
        ref={textRef}
        style={{
          color: '#f0f0f0',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
        }}
      >
        Aakash Puri.
      </h1>
    </div>
  );
};

export default Preloader;
