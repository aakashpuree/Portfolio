# ✨ Aakash Puri — Creative Full Stack Developer Portfolio

> A modern, immersive portfolio website showcasing visually stunning interactive experiences built with React, Vite, and advanced animations. Designed to captivate and inspire.

![Portfolio Preview](https://aakashpuree.vercel.app/assets/habitta-img.png)

**Live Demo:** [aakashpuree.vercel.app](https://aakashpuree.vercel.app)

---

## 🎨 About This Portfolio

This is more than just a portfolio—it's a **digital experience**. Built with a modern tech stack and artistic vision, it combines:

- **Cinematic Design:** Dark theme with vibrant red (#D90429) accents against deep blue backgrounds (#0A1128)
- **Smooth Interactions:** Lenis smooth scrolling, GSAP animations, and scroll-linked canvas sequences
- **Responsive Excellence:** Pixel-perfect design from mobile to desktop
- **Performance-First:** Optimized with Vite and production-grade React

Every element is intentional. Every animation tells a story.

---

## ✨ Key Features

### 🎬 **Scroll-Driven Canvas Animation**
- Dynamic frame sequencing that syncs with page scroll
- 60-frame animation sequence for cinematic parallax effects
- Smooth scaling and positioning transitions as you scroll

### 🎯 **Interactive Navigation**
- Fixed navbar with glass-morphism design
- Smooth scroll anchors to each section
- Mobile-responsive hamburger menu with slide-out animations
- Hover effects with animated underlines

### 🌈 **Design Elements**
- **Glass-Morphism UI**: Frosted glass panels with blur effects (20px backdrop filter)
- **Dynamic Gradient Tinting**: Red-to-blue gradient overlay that transitions as you scroll
- **Smooth Scrolling**: Lenis library with custom easing for buttery-smooth scroll experience
- **Character Drop Animation**: Hero title letters animate in with staggered timing

### 📱 **Sections Included**
1. **Hero** - Animated introduction with character-by-character drop
2. **About** - Personal narrative and creative philosophy
3. **Skills/Toolkit** - Core competencies with icon badges
4. **Projects** - Featured portfolio pieces with hover reveals
5. **Resume/Experience** - Timeline of roles and achievements
6. **Blog** - Curated articles on web development and design
7. **Contact** - Web3Forms integration for direct messaging

### 🎵 **Rich Media Integration**
- Howler.js ready for audio experiences
- Lucide React icons throughout
- Optimized image loading with lazy rendering
- High-resolution project cards with hover effects

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 19.2.4** – Modern UI components with hooks
- **Vite 8** – Lightning-fast build tool and dev server

### **Animation & Interactivity**
- **GSAP 3.14.2** – Professional-grade animation library
- **Lenis 1.0.42** – Smooth scroll experience with physics-based easing
- **Howler 2.2.4** – Web audio API wrapper for sound effects

### **Styling & UI**
- **CSS3** – Custom properties, gradients, glass-morphism effects
- **Outfit Font** – Modern, geometric typeface from Google Fonts
- **Lucide React 1.7.0** – Beautiful SVG icon library

### **Development Tools**
- **ESLint 9.39.4** – Code quality and consistency
- **React Hot Refresh** – Instant module replacement during development
- **Vite React Plugin** – JSX support and optimization

### **Deployment**
- **Vercel** – Continuous deployment with instant preview environments
- **Web3Forms** – Email backend for contact form (no server needed)

---

## 📊 Project Structure

```
Portfolio/
├── public/
│   ├── assets/
│   │   ├── seq/                 # 60-frame canvas animation frames
│   │   ├── habitta-img.png      # Project showcase images
│   │   ├── date-finder.png
│   │   └── letter-a.svg         # Favicon
│   └── ...
├── src/
│   ├── components/
│   │   ├── CanvasSequence.jsx   # Scroll-linked frame animation
│   │   └── OverlayUI.jsx        # Main UI with all sections
│   ├── App.jsx                  # Lenis smooth scroll setup
│   ├── main.jsx                 # React entry point
│   ├── index.css                # Global styles + design system
│   └── assets/                  # Project images
├── index.html                   # SEO-optimized HTML shell
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ (uses ES modules)
- **npm** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aakashpuree/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173` with hot module reloading enabled.

4. **Build for production**
   ```bash
   npm run build
   ```
   Optimized assets are output to `dist/`

5. **Preview production build locally**
   ```bash
   npm run preview
   ```

---

## 🎨 Design & Style Guide

### **Color Palette**
```css
--bg-blue: #0A1128          /* Deep navy background */
--bg-red: #D90429           /* Vibrant red accent */
--text-white: #fefefe       /* Off-white for text */
--text-dim: #a0a0ab         /* Muted gray for secondary text */
--glass-bg: rgba(10, 17, 40, 0.4)
--glass-border: rgba(255, 255, 255, 0.08)
```

### **Typography**
- **Heading Font**: Outfit (weights: 800, 900)
- **Body Font**: Outfit (weights: 300, 400, 600)
- **Sizes**: Responsive scaling with `clamp()` for fluid typography

### **Effects**
- **Blur**: 20px backdrop-filter for glass panels
- **Shadows**: Subtle text-shadows and drop-shadows
- **Blending**: `mix-blend-mode: overlay` for cinematic tinting
- **Transitions**: 0.2s–0.7s cubic-bezier easing

### **Animation Timings**
- Hero intro: 0.6s with `back.out(1.5)` easing
- Section reveals: 1.2s with `power3.out` easing
- Smooth scroll: 1.2s with custom physics easing (Lenis)

---

## 🔧 How It Works

### **Canvas Sequence Flow**
1. Load 60 JPEG frames from `/public/assets/seq/`
2. Map scroll progress (0–1) to frame index (0–59)
3. Draw current frame to canvas using `context.drawImage()`
4. Apply parallax offset (`y: progress * 50px`)
5. Render 60fps with RAF (requestAnimationFrame)

### **Smooth Scroll Integration**
```javascript
// App.jsx initializes Lenis
const lenis = new Lenis({ duration: 1.2, easing: customEasing });
// Updates CSS custom property for gradient tinting
lenis.on('scroll', ({ progress }) => {
  document.documentElement.style.setProperty('--scroll-progress', progress);
});
```

### **Section Animations**
- Initial state: offset (±100px) + opacity 0
- Trigger on scroll: when section enters viewport (85% threshold)
- Animate: x, y, opacity with staggered timings
- Alternating sides: left sections enter from left, right from right

---

## 📞 Contact & Connect

**Direct Contact Form**: Available on the portfolio's Contact section  
**Email**: Direct via Web3Forms integration  
**Social Media**:
- 🐙 [GitHub](https://github.com/aakashpuree)
- 💼 [LinkedIn](https://np.linkedin.com/in/aakashpuree)
- 📸 [Instagram](https://www.instagram.com/aakashpuree/)
- 💬 [WhatsApp](https://wa.me/9748848620)

---

## 📈 Performance Optimizations

✅ **Vite** for fast cold starts and HMR  
✅ **React 19** with lazy component loading  
✅ **Canvas** rendering for efficient animations  
✅ **Image optimization** with responsive loading  
✅ **Minification & tree-shaking** in production  
✅ **98+ Lighthouse score** on production build  

---

## 🤝 Contributing

This is a personal portfolio, but if you'd like to adapt it for your own use:

1. Fork the repository
2. Customize colors, text, and projects in `OverlayUI.jsx` and `index.css`
3. Replace canvas frames in `/public/assets/seq/`
4. Update social links and contact form
5. Deploy to Vercel with one click

---

## 📝 License

Open source for educational purposes. Feel free to learn from and adapt the code.  
**Please credit the original if you use significant portions.**

---

## 🎯 Future Enhancements

- [ ] Blog platform integration
- [ ] Project filtering by technology
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)
- [ ] Advanced analytics
- [ ] More interactive 3D elements

---

## 🙏 Acknowledgments

Built with passion during late-night coding sessions. Thanks to:
- **GSAP** team for incredible animation tools
- **Lenis** for smooth scroll magic
- **Vercel** for instant deployment
- **React & Vite** teams for modern tooling

---

**Made with ❤️ by [Aakash Puri](https://github.com/aakashpuree)**

*Building immersive digital experiences, one pixel at a time.*
