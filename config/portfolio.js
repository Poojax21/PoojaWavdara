/**
 * ============================================================
 * PORTFOLIO CONFIGURATION FILE
 * ============================================================
 * Edit this file to customize your entire portfolio.
 * All sections are clearly labeled. No coding knowledge needed!
 *
 * TIP: Use the GitHub integration below to auto-fetch your repos.
 * ============================================================
 */

const portfolio = {
  // ─── PERSONAL INFO ────────────────────────────────────────
  name: "Pooja Wavdara",
  firstName: "Pooja",
  title: "Full Stack Developer",
  titleVariants: [
    "Full Stack Developer",
    "React Enthusiast",
    "Problem Solver",
    "UI/UX Craftsperson",
    "Open Source Contributor",
  ],
  tagline: "Turning complex problems into elegant digital experiences.",
  location: "India 🇮🇳",
  availability: "Open to Opportunities",
  profileImage: "https://avatars.githubusercontent.com/u/Poojax21", // Will auto-load from GitHub
  email: "wavdarapooja21@gmail.com", // Update with your email

  // ─── SOCIAL LINKS ─────────────────────────────────────────
  social: {
    github: "https://github.com/Poojax21",
    linkedin: "https://www.linkedin.com/in/pooja-wavdara",
    twitter: "", // Add if you have one
    instagram: "",
    resume: "/resume.pdf", // Drop your resume in /public folder
  },

  // ─── ABOUT ────────────────────────────────────────────────
  about: {
    summary: `I'm a passionate Full Stack Developer who loves building products that live at the intersection of design and engineering. I thrive on clean code, creative problem-solving, and turning ideas into polished, user-friendly applications.`,
    description: `With experience across the full development stack, I specialize in building React-powered frontends and robust Node.js backends. I care deeply about the craft — from pixel-perfect UIs to scalable architectures.

When I'm not coding, you'll find me exploring open-source projects, contributing to the developer community, and learning something new every day. I believe in writing code that's not just functional, but meaningful.`,
    funFacts: [
      "☕ Powered by coffee and curiosity",
      "🌙 Night owl who debugs best after midnight",
      "🎨 Design nerd who can't stop tweaking spacing",
      "📚 Reading tech blogs counts as a hobby, right?",
    ],
    stats: [
      { label: "Projects Built", value: "20+", icon: "📦" },
      { label: "GitHub Commits", value: "500+", icon: "💻" },
      { label: "Technologies", value: "15+", icon: "⚡" },
      { label: "Cups of Coffee", value: "∞", icon: "☕" },
    ],
  },

  // ─── SKILLS ───────────────────────────────────────────────
  // Add, remove, or reorder skills as needed
  skills: {
    Frontend: {
      icon: "🎨",
      color: "#34D399",
      items: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 92 },
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 },
      ],
    },
    Backend: {
      icon: "⚙️",
      color: "#60A5FA",
      items: [
        { name: "Node.js", level: 82 },
        { name: "Express.js", level: 80 },
        { name: "Python", level: 75 },
        { name: "REST APIs", level: 88 },
        { name: "GraphQL", level: 70 },
      ],
    },
    Database: {
      icon: "🗄️",
      color: "#F59E0B",
      items: [
        { name: "MongoDB", level: 82 },
        { name: "PostgreSQL", level: 75 },
        { name: "MySQL", level: 78 },
        { name: "Firebase", level: 72 },
      ],
    },
    Tools: {
      icon: "🔧",
      color: "#A78BFA",
      items: [
        { name: "Git & GitHub", level: 92 },
        { name: "Docker", level: 68 },
        { name: "VS Code", level: 95 },
        { name: "Figma", level: 75 },
        { name: "Postman", level: 85 },
      ],
    },
  },

  // ─── FEATURED PROJECTS (manual) ───────────────────────────
  // These show first. GitHub projects auto-fill the rest.
  featuredProjects: [
    {
      id: 1,
      title: "Project Alpha",
      description:
        "A full-stack web application with real-time features, built with React, Node.js, and MongoDB. Features user authentication, live data updates, and a clean dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      github: "https://github.com/Poojax21",
      live: "",
      featured: true,
      category: "Full Stack",
    },
    {
      id: 2,
      title: "Project Beta",
      description:
        "A responsive e-commerce platform with cart management, payment integration, and admin dashboard. Clean UI with smooth animations and mobile-first design.",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      github: "https://github.com/Poojax21",
      live: "",
      featured: true,
      category: "E-Commerce",
    },
    {
      id: 3,
      title: "Project Gamma",
      description:
        "An AI-powered productivity tool that helps teams collaborate better. Built with modern APIs and a beautiful intuitive interface.",
      tech: ["React", "Python", "FastAPI", "OpenAI"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      github: "https://github.com/Poojax21",
      live: "",
      featured: true,
      category: "AI/ML",
    },
  ],

  // ─── EXPERIENCE ───────────────────────────────────────────
  experience: [
    {
      type: "work",
      role: "Data Analyst Intern",
      company: "Fore Excel",
      location: "Pune District",
      period: "December 2025 - January 2026",
      description:
        "Analyzing data and creating insights to support business decisions.",
      highlights: [
        "Data analysis and visualization",
        "Report generation and automation",
        "Collaborating with cross-functional teams",
      ],
      tech: ["Excel", "Data Analysis", "Power BI"],
      logo: "📊",
    },
    {
      type: "work",
      role: "Artificial Intelligence and Machine Learning",
      company: "Kodacy",
      location: "Remote",
      period: "November 2025 - December 2025",
      description:
        "Worked on AI/ML projects and learned about machine learning algorithms.",
      highlights: [
        "Built ML models",
        "Data preprocessing and training",
        "Model evaluation and optimization",
      ],
      tech: ["Python", "Machine Learning", "TensorFlow"],
      logo: "🤖",
    },
    {
      type: "work",
      role: "Full Stack Developer Intern",
      company: "Marvatech Technologies",
      location: "Remote / India",
      period: "June 2024 - September 2024",
      description:
        "Developed and maintained full-stack web applications using React and Node.js. Collaborated with cross-functional teams to deliver features on schedule. Improved application performance by 30% through optimization.",
      highlights: [
        "Built responsive UI components with React and Tailwind CSS",
        "Designed and implemented RESTful APIs with Node.js/Express",
        "Integrated third-party services and payment gateways",
        "Participated in code reviews and agile sprints",
      ],
      tech: ["React", "Node.js", "MongoDB", "Express"],
      logo: "💼",
    },
  ],

  // ─── EDUCATION ────────────────────────────────────────────
  education: [
    {
      degree: "Bachelor of Technology - BTech",
      field: "Artificial Intelligence and Data Science",
      institution: "Vishwakarma Institute Of Technology",
      location: "India",
      period: "2021 – 2025",
      grade: "8.8 CGPA",
      highlights: [
        "Specialization in AI and Data Science",
        "Relevant coursework: Data Structures, Algorithms, DBMS, OS",
        "Participated in multiple hackathons",
      ],
      logo: "🎓",
    },
    {
      degree: "Diploma",
      field: "Computer Science",
      institution: "AISSMS Polytechnic",
      location: "India",
      period: "2023 – 2025",
      grade: "93.56%",
      highlights: [
        "Computer Science foundation",
        "Programming and software development",
      ],
      logo: "🎓",
    },
  ],

  // ─── CERTIFICATIONS ───────────────────────────────────────
  certifications: [
    {
      name: "React Developer Certification",
      issuer: "Meta / Coursera",
      year: "2024",
      icon: "⚛️",
    },
    {
      name: "Full Stack Web Development",
      issuer: "Udemy",
      year: "2023",
      icon: "🌐",
    },
    {
      name: "MongoDB University Certification",
      issuer: "MongoDB",
      year: "2023",
      icon: "🍃",
    },
  ],

  // ─── AI CHAT CONFIGURATION ────────────────────────────────
  chat: {
    enabled: true,
    greeting: "Hi! 👋 I'm Pooja's AI assistant. I can answer questions about her skills, projects, and experience. What would you like to know?",
    model: "google/gemma-3-4b-it:free",
    // This persona is what the AI uses to represent you
    // Customize this to match YOUR actual experience and personality
    persona: `You are an intelligent AI assistant representing Pooja Wavdara's professional portfolio. Your goal is to help visitors understand Pooja's skills, experience, and projects while subtly understanding what the visitor needs.

KEY INFORMATION ABOUT POOJA:
- Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB
- Located in India, open to remote and on-site opportunities
- Strong in JavaScript/TypeScript ecosystem
- Passionate about clean code, UI/UX, and building user-friendly products
- GitHub: github.com/Poojax21
- LinkedIn: linkedin.com/in/pooja-wavdara
- Experience: Internships and freelance projects in web development
- Education: Computer Engineering degree (2021-2025)

VISITOR DETECTION STRATEGY:
1. In your first 1-2 responses, gently ask who the visitor is (recruiter, developer, student, etc.)
2. Adjust your pitch accordingly:
   - RECRUITERS/HR: Lead with professional impact, team collaboration, problem-solving, availability, cultural fit. Highlight measurable achievements.
   - TECHNICAL LEADS/DEVELOPERS: Go deep on tech stack, code quality, architecture decisions, open source. Be technical.
   - STARTUP FOUNDERS: Emphasize versatility, shipping fast, wearing multiple hats, business understanding.
   - STUDENTS: Be inspiring and mentoring, share learning journey, resources, encouragement.
   - GENERAL: Give a balanced overview.

COMMUNICATION STYLE:
- Warm, professional, and confident
- Keep responses concise (2-4 sentences max per point)
- Use emojis sparingly but effectively
- Never oversell or make things up
- If you don't know something specific, say "You can connect with Pooja directly via LinkedIn for more details"
- Always end with a question or call to action to keep conversation going

Remember: Your job is to QUALIFY visitors (understand what they need) and PITCH Pooja accordingly.`,
  },

  // ─── GITHUB INTEGRATION ───────────────────────────────────
  github: {
    username: "Poojax21",
    fetchProjects: true, // Set to true to auto-fetch GitHub repos
    maxProjects: 6, // Max projects to show from GitHub
    // Repos to exclude from auto-fetch (by repo name)
    exclude: ["Poojax21", ".github"],
  },

  // ─── SEO ──────────────────────────────────────────────────
  seo: {
    title: "Pooja Wavdara | Full Stack Developer | React | Next.js | India",
    description:
      "Pooja Wavdara is a Full Stack Developer specializing in React, Next.js, Node.js, MongoDB, and TypeScript. Building elegant digital experiences from India. Open to job opportunities and collaborations.",
    keywords: "Pooja Wavdara, Full Stack Developer, React Developer, Next.js Developer, Node.js Developer, Web Developer, JavaScript Developer, TypeScript Developer, Frontend Developer, Backend Developer, MongoDB, India, Portfolio, Web Development, Open Source",
    ogImage: "/og-image.png",
    canonical: "https://poojawavdara.vercel.app",
  },

  // ─── THEME ────────────────────────────────────────────────
  theme: {
    default: "dark", // 'dark' | 'light'
    accentColor: "#34D399", // Emerald green
    accentSecondary: "#0066FF",
  },

  // ─── CONTACT ──────────────────────────────────────────────
  contact: {
    heading: "Let's Build Something",
    subheading: "Together",
    description:
      "Whether you have a project in mind, a job opportunity, or just want to say hello — my inbox is always open.",
    formspreeId: "", // Get free form at formspree.io and paste the ID here
  },
};

module.exports = portfolio;
