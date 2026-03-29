import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Settings, Code, Component, Layout, Briefcase, Camera, Mail } from 'lucide-react';

const OverlayUI = () => {
  const sectionsRef = useRef([]);
  const heroRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // User's Web3Forms Access Key
    formData.append("access_key", "1370f99d-303c-4d20-9591-5659f7d4ee11");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      alert("Transmission Successful! Aakash has received your message.");
      event.target.reset();
    } else {
      alert("Transmission Failed. Please try again or use direct email.");
    }
  };

  useEffect(() => {
    // Dropdown effect staggered for each letter with 0.5s delay
    if (heroRef.current) {
      const chars = heroRef.current.querySelectorAll('.hero-char');
      const subtitle = heroRef.current.querySelector('.hero-subtitle');
      
      gsap.fromTo(chars, 
        { y: -150, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', stagger: 0.04, delay: 0.5 }
      );
      
      gsap.fromTo(subtitle,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 1.0 }
      );
    }

    // Scroll animation for other sections alternating Top-Left and Top-Right
    const handleScroll = () => {
      sectionsRef.current.forEach((el, index) => {
        if (!el || el.dataset.animated === "true") return;
        
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.dataset.animated = "true";
          const isEven = index % 2 === 0;
          
          gsap.fromTo(el, 
            { 
              x: isEven ? -100 : 100, 
              y: -50, 
              opacity: 0 
            },
            { 
              x: 0, 
              y: 0, 
              opacity: 1, 
              duration: 1.2, 
              ease: 'power3.out' 
            }
          );
        }
      });
    };
    
    // Set initial state for sections (opacity 0) via CSS or GSAP set
    sectionsRef.current.forEach((el, index) => {
      if (el) {
        const isEven = index % 2 === 0;
        gsap.set(el, { x: isEven ? -100 : 100, y: -50, opacity: 0 });
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <div className="cinematic-tint"></div>

      <div className="overlay-container">
        {/* HERO */}
        <section className="section hero">
          <div className="hero-content" ref={heroRef}>
            <h1 className="hero-title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0 }}>
              <div style={{ display: 'flex' }}>
                {"AAKASH".split('').map((char, i) => <span key={`first-${i}`} className="hero-char" style={{ display: 'inline-block' }}>{char}</span>)}
              </div>
              <div style={{ display: 'flex' }}>
                {"PURI".split('').map((char, i) => <span key={`last-${i}`} className="hero-char" style={{ display: 'inline-block' }}>{char}</span>)}
              </div>
            </h1>
            <p className="hero-subtitle" style={{ opacity: 0 }}>Creative Full Stack Developer</p>
          </div>
        </section>

        <section className="section spacer"></section>

        {/* ABOUT */}
        <section className="section">
          <div className="glass-panel" ref={addToRefs}>
            <h2 className="section-title">The Mastermind</h2>
            <p className="section-text">
              I'm Aakash, a creative genius developer who thrives in the quiet of the night. 
              When the world sleeps, I build visually stunning, highly interactive digital 
              experiences that blend art with logic.
            </p>
            <p className="section-text">
              My approach isn't just about writing code; it's about crafting immersive software
              that tells a story. From pixel-perfect UI design to robust full-stack architecture, 
              I leave nothing to chance.
            </p>
          </div>
        </section>

        <section className="section spacer"></section>

        {/* SKILLS */}
        <section className="section">
          <div className="glass-panel" ref={addToRefs}>
            <h2 className="section-title">Arsenal</h2>
            <p className="section-text">Equipped with cutting-edge tools to dominate the digital landscape.</p>
            <div className="skills-grid">
              <div className="skill-badge"><Code size={20}/> React Ecosystem</div>
              <div className="skill-badge"><Component size={20}/> Vue + Vite</div>
              <div className="skill-badge"><Settings size={20}/> Full Stack Architecture</div>
              <div className="skill-badge"><Layout size={20}/> UI/UX Design</div>
              <div className="skill-badge"><Code size={20}/> GSAP & WebGL</div>
              <div className="skill-badge"><Layout size={20}/> Tailwind & PostCSS</div>
            </div>
          </div>
        </section>
        
        <section className="section spacer"></section>

        {/* PROJECTS */}
        <section className="section">
          <div className="glass-panel" ref={addToRefs} style={{ maxWidth: '1100px' }}>
            <h2 className="section-title">Masterpieces</h2>
            <div className="projects-grid">
              <div className="project-card">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" alt="Project 1" />
                <div className="project-info">
                  <h3>Project Genesis</h3>
                  <p>A cinematic WebGL e-commerce experience.</p>
                </div>
              </div>
              <div className="project-card">
                 <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" alt="Project 2" />
                <div className="project-info">
                  <h3>Neuro Dashboard</h3>
                  <p>Next.js fintech platform with real-time data visualization.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section spacer"></section>

        {/* EXPERIENCE */}
        <section className="section">
          <div className="glass-panel" ref={addToRefs}>
            <h2 className="section-title">Timeline</h2>
            <div className="timeline">
              <div className="timeline-item">
                <h3>Senior Frontend Architect</h3>
                <span>2024 - Present</span>
                <p className="section-text">Leading development of award-winning interfaces. Focused on performance, WebGL, and micro-interactions.</p>
              </div>
              <div className="timeline-item">
                <h3>Creative Developer</h3>
                <span>2022 - 2024</span>
                <p className="section-text">Built high-conversion landing pages and experimental digital campaigns for global brands.</p>
              </div>
              <div className="timeline-item">
                <h3>Full Stack Engineer</h3>
                <span>2020 - 2022</span>
                <p className="section-text">Developed scalable backend architectures and robust APIs to support complex web apps.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section spacer"></section>

        {/* CONTACT */}
        <section className="section" style={{ minHeight: '80vh' }}>
          <div className="glass-panel" ref={addToRefs}>
            <h2 className="section-title">Initiate Contact</h2>
            <p className="section-text">Impressed? Let's build something extraordinary together.</p>
            
            <form className="contact-form" onSubmit={onSubmit}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea rows="4" name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Send Transmission</button>
            </form>

            <div className="social-links">
              <a href="https://github.com/aakash-puri" target="_blank" rel="noreferrer"><Code size={30} /></a>
              <a href="https://linkedin.com/in/aakashpuri" target="_blank" rel="noreferrer"><Briefcase size={30} /></a>
              <a href="#" aria-label="Instagram"><Camera size={30} /></a>
              <a href="#" aria-label="WhatsApp"><Mail size={30} /></a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OverlayUI;
