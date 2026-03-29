import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CanvasSequence = () => {
  const canvasContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 60;
  
  // Clean initial entrance animation for the canvas
  useEffect(() => {
    if (images.length > 0 && canvasContainerRef.current) {
      gsap.fromTo(canvasContainerRef.current, 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
      );
    }
  }, [images.length]);

  useEffect(() => {
    const loadedImages = new Array(frameCount).fill(null);
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const id = i.toString().padStart(3, '0');
        img.src = `/assets/seq/ezgif-frame-${id}.jpg`;
        
        img.onload = () => {
            loadedImages[i - 1] = img;
            loadedCount++;
            
            // Eagerly render the very first image for instant mobile loading,
            // or update once everything is completely loaded.
            if (i === 1 || loadedCount === frameCount) {
                setImages([...loadedImages]);
            }
        };
    }
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    const render = () => {
      const scrollPos = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrollPos / maxScroll : 0));

      let frameIndex = Math.floor(progress * (frameCount - 1));
      
      // Cinematic Parallax effect only (removed zoom scale to keep it fit)
      const parallaxY = progress * 50; 
      
      if (canvasContainerRef.current) {
         gsap.set(canvasContainerRef.current, {
           scale: 1,
           y: parallaxY
         });
      }

      // Fallback to the first image if the user scrolls before all frames finish downloading
      const img = images[frameIndex] || images[0];
      if (img) {
         const canvasRatio = canvas.width / canvas.height;
         const imgRatio = img.width / img.height;
         let drawWidth, drawHeight, offsetX, offsetY;
         
         // 'cover' logic: make the image fill the entire screen completely
         if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
         } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
         }
         
         context.clearRect(0, 0, canvas.width, canvas.height);
         context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const handleScroll = () => {
      requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    handleResize();
    render(); // Initial render

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images]);

  return (
    <div className="canvas-container" ref={canvasContainerRef} style={{ opacity: 0 }}>
      <canvas ref={canvasRef} className="sequence-canvas"></canvas>
    </div>
  );
};

export default CanvasSequence;
