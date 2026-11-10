import habittaImg from '../assets/habitta-img.png';
import dateFinderImg from '../assets/date-finder.png';

export const site = {
  name: 'Aakash Puri',
  firstName: 'Aakash',
  lastName: 'Puri',
  username: 'aakashpuree',
  role: 'Full Stack Developer',
  location: 'Nepal',
  timeZone: 'Asia/Kathmandu',
  availability: 'Open to opportunities',
  bio: 'I design and build fast, expressive products for the web — from full-stack platforms used across Nepal to interfaces that feel alive.',
  philosophy: 'Just not going with the flow.',
  github: 'https://github.com/aakashpuree',
  repoUrl: 'https://github.com/aakashpuree/Portfolio',
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      handle: '@aakashpuree',
      url: 'https://github.com/aakashpuree',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'in/aakashpuree',
      url: 'https://www.linkedin.com/in/aakashpuree/',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@aakashpuree',
      url: 'https://www.instagram.com/aakashpuree/',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      handle: 'Chat directly',
      url: 'https://wa.me/9779748848620',
    },
  ],
};

export const navigation = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'github', label: 'GitHub' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const facts = [
  { label: 'Based in', value: 'Nepal — NPT (UTC+5:45)' },
  { label: 'Focus', value: 'Full-stack & interaction design' },
  { label: 'Core stack', value: 'React, Vue, TypeScript, Python' },
  { label: 'Status', value: 'Available for select projects' },
];

export const skillGroups = [
  {
    icon: 'code',
    title: 'Frontend',
    description: 'Interfaces that are fast, accessible and full of character.',
    skills: ['React', 'Vue', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'GSAP'],
  },
  {
    icon: 'server',
    title: 'Backend & Data',
    description: 'The systems and data flows that make products actually work.',
    skills: ['Node.js', 'Python', 'REST APIs', 'SQL', 'Data pipelines', 'OCR / ML basics'],
  },
  {
    icon: 'tool',
    title: 'Tools & Craft',
    description: 'A practical toolkit for designing, shipping and iterating.',
    skills: ['Vite', 'Git & GitHub', 'Figma', 'Vercel', 'Lenis', 'Responsive design', 'Performance'],
  },
];

export const featuredProjects = [
  {
    repo: 'Habitta-app',
    title: 'Habitta',
    category: 'Web Apps',
    description:
      'A responsive habit tracker with a clean dashboard, daily streaks and progress analytics — built to make consistency feel effortless.',
    stack: ['JavaScript', 'Vite', 'CSS'],
    live: 'https://aakashpuree.github.io/Habitta-app/',
    image: habittaImg,
    icon: 'sparkles',
    featured: true,
  },
  {
    repo: 'Date-Finder',
    title: 'Date Finder',
    category: 'Web Apps',
    description:
      'A client-side search engine for 326+ Nepali banknote records. Search any birth date and discover the notes that carry it.',
    stack: ['JavaScript', 'SQL', 'Client-side'],
    live: 'https://aakashpuree.github.io/Date-Finder/',
    image: dateFinderImg,
    icon: 'scan',
  },
  {
    repo: 'Himali-Weather',
    title: 'Himali Weather',
    category: 'Web Apps',
    description:
      'A weather platform covering all 77 districts of Nepal, with live conditions, 7-day forecasts and an interactive district map.',
    stack: ['TypeScript', 'Weather API', 'Maps'],
    live: 'https://himali-weather.vercel.app',
    icon: 'cloud',
  },
  {
    repo: 'Swastha-Sewa',
    title: 'Swastha Sewa',
    category: 'Web Apps',
    description:
      'A health-services platform for humans, animals and plants — making everyday health information simple to reach.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    live: 'https://swastha-sewa.vercel.app/',
    icon: 'heart',
  },
  {
    repo: 'Com.Eng-notes',
    title: 'Com.Eng Notes',
    category: 'Web Apps',
    description:
      'A modern study platform for NEB computer engineering students to browse, preview and download class notes.',
    stack: ['Vue', 'Vite', 'Notes'],
    live: 'https://com-eng-notes.vercel.app',
    icon: 'book',
  },
  {
    repo: 'nepali-banknote-symbol-extractor',
    title: 'Banknote Extractor',
    category: 'Python & ML',
    description:
      'An Apache-2.0 licensed machine-learning pipeline for detecting and extracting symbols and denominations from Nepali rupee banknotes.',
    stack: ['Python', 'Machine Learning', 'OCR'],
    icon: 'terminal',
  },
];

export const journey = [
  {
    year: '2026 — Present',
    title: 'Full Stack Developer',
    description:
      'Designing and shipping production web apps used across Nepal — from a 77-district weather platform to a health-services directory. Focused on performance, accessibility and clean UI.',
  },
  {
    year: '2026',
    title: 'Building in public',
    description:
      'Maintaining 20+ public repositories, including an Apache-2.0 machine-learning pipeline for Nepali banknotes and a client-side search engine for 326+ banknote records.',
  },
  {
    year: '2025',
    title: 'Creative developer',
    description:
      'Built an immersive, scroll-driven portfolio with React, GSAP, Lenis and canvas frame animation. Started treating the browser as a canvas, not just a document.',
  },
  {
    year: '2025',
    title: 'The beginning',
    description:
      'Wrote my first lines of code and began publishing projects on GitHub — learning full-stack fundamentals by building real products, not tutorials.',
  },
];

export const focusedOn = [
  'Full-stack products',
  'Interaction design',
  'Open source',
  'Web performance',
];

export const githubFallback = {
  profile: {
    name: 'Aakash Puri',
    login: 'aakashpuree',
    avatar_url: 'https://avatars.githubusercontent.com/u/245210187?v=4',
    bio: 'Just not going with flow !!',
    public_repos: 20,
    followers: 10,
    following: 16,
    html_url: 'https://github.com/aakashpuree',
    created_at: '2025-11-20T15:16:49Z',
  },
  totals: {
    repos: 20,
    stars: 59,
    followers: 10,
    contributions: 1310,
  },
  languages: [
    { name: 'JavaScript', count: 5, percent: 29 },
    { name: 'Vue', count: 4, percent: 24 },
    { name: 'HTML', count: 4, percent: 24 },
    { name: 'Python', count: 2, percent: 12 },
    { name: 'CSS', count: 1, percent: 6 },
    { name: 'TypeScript', count: 1, percent: 5 },
  ],
  repositories: [
    {
      name: 'Registered-Company',
      description: 'Data of registered companies in Nepal with registered date, location and more.',
      language: null,
      stargazers_count: 0,
      html_url: 'https://github.com/aakashpuree/Registered-Company',
      updated_at: '2026-11-03T16:03:00Z',
    },
    {
      name: 'nepali-banknote-symbol-extractor',
      description: 'An Apache 2.0 ML pipeline for extracting symbols and denominations from Nepali rupee banknotes.',
      language: 'Python',
      stargazers_count: 0,
      html_url: 'https://github.com/aakashpuree/nepali-banknote-symbol-extractor',
      updated_at: '2026-10-21T17:35:18Z',
    },
    {
      name: 'Portfolio',
      description: 'Cinematic portfolio with scroll animations, React, Vite and GSAP.',
      language: 'JavaScript',
      stargazers_count: 4,
      html_url: 'https://github.com/aakashpuree/Portfolio',
      updated_at: '2026-10-07T13:33:01Z',
    },
    {
      name: 'Himali-Weather',
      description: 'Interactive weather forecasting platform covering all 77 districts of Nepal.',
      language: 'TypeScript',
      stargazers_count: 4,
      html_url: 'https://github.com/aakashpuree/Himali-Weather',
      updated_at: '2026-07-16T02:22:47Z',
    },
  ],
};
