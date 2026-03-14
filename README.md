# 🌟 Pooja Wavdara — Developer Portfolio

A premium, AI-powered developer portfolio built with Next.js 14, featuring a glassmorphism dark design merged with an industrial light aesthetic. Includes an intelligent AI chat assistant powered by OpenRouter.

## ✨ Features

- **AI Chat Assistant** — Understands visitor context (recruiter, developer, etc.) and pitches your profile accordingly
- **GitHub Auto-Sync** — Automatically fetches your public repos
- **Config-Driven** — Edit one file (`config/portfolio.js`) to update everything
- **Premium Design** — Merged glassmorphism + warm industrial aesthetic
- **Smooth Animations** — Scroll-triggered reveals, typing effects, hover states
- **Mobile Responsive** — Looks great on all devices
- **Vercel Ready** — Deploy in minutes with zero config

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```env
OPENROUTER_API_KEY=sk-or-v1-your-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Customize your portfolio
Edit **`config/portfolio.js`** — this is the only file you need to edit!

### 4. Run locally
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## 📝 How to Customize

### Update Personal Information
Open `config/portfolio.js` and update:

```javascript
const portfolio = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  email: "your@email.com",
  
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
  // ... etc
}
```

### Add a New Project
```javascript
featuredProjects: [
  {
    id: 1,
    title: "My New Project",
    description: "What this project does",
    tech: ["React", "Node.js"],
    image: "https://your-image-url.jpg",
    github: "https://github.com/you/project",
    live: "https://yourproject.com",
    category: "Full Stack",
  },
  // ...
]
```

### Update Skills
```javascript
skills: {
  Frontend: {
    icon: "🎨",
    color: "#34D399",
    items: [
      { name: "React.js", level: 90 }, // level = 0-100
      // ...
    ],
  },
  // Add more categories...
}
```

### Update Work Experience
```javascript
experience: [
  {
    role: "Software Engineer",
    company: "Company Name",
    location: "City, Country",
    period: "2023 – Present",
    description: "What you did",
    highlights: ["Achievement 1", "Achievement 2"],
    tech: ["React", "Node.js"],
    logo: "💼",
  },
]
```

### Customize the AI Chat Persona
Edit `config/portfolio.js` → `chat.persona` to customize how the AI presents you:

```javascript
chat: {
  enabled: true, // Set to false to disable
  greeting: "Hi! I'm [Your Name]'s AI assistant...",
  persona: `You are an AI assistant for [Your Name]...
  
  KEY INFORMATION:
  - [Your skills]
  - [Your experience]
  - [Your goals]
  
  // etc.`,
}
```

---

## 🌐 Deploy to Vercel

### Method 1: Vercel CLI (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Method 2: GitHub + Vercel Dashboard
1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `OPENROUTER_API_KEY` = your OpenRouter key
   - `NEXT_PUBLIC_SITE_URL` = your Vercel URL
5. Click Deploy!

### Setting Environment Variables on Vercel
1. Go to your project → Settings → Environment Variables
2. Add:
   - `OPENROUTER_API_KEY` (required for AI chat)
   - `GITHUB_TOKEN` (optional, increases GitHub API rate limit)
   - `NEXT_PUBLIC_SITE_URL` (your deployed URL)

---

## 🔑 API Keys & Services

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| [OpenRouter](https://openrouter.ai) | AI chat (gemma-3-4b-it:free) | ✅ Free |
| [GitHub API](https://github.com/settings/tokens) | Auto-fetch repos | ✅ 60 req/hr (unauthenticated) |
| [Formspree](https://formspree.io) | Contact form | ✅ 50/month |

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── chat/route.js       ← AI chat endpoint
│   │   └── github/route.js     ← GitHub data endpoint
│   ├── layout.js               ← HTML shell + metadata
│   ├── page.js                 ← Main page
│   └── globals.css             ← Design system CSS
│
├── components/
│   ├── Navigation.jsx          ← Floating glass navbar
│   ├── Hero.jsx                ← Hero section
│   ├── About.jsx               ← About section
│   ├── Skills.jsx              ← Skills showcase
│   ├── Projects.jsx            ← Projects + GitHub sync
│   ├── Experience.jsx          ← Work + education timeline
│   ├── Contact.jsx             ← Contact form + socials
│   └── ChatWidget.jsx          ← AI chat floating widget
│
├── config/
│   └── portfolio.js            ← ⭐ ALL YOUR DATA HERE
│
├── public/
│   └── resume.pdf              ← Drop your resume here
│
├── .env.local.example          ← Copy to .env.local
├── next.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎨 Design System

This portfolio uses a unique merged design system:
- **Dark sections**: Glassmorphism with grain overlay (hero, skills, experience, contact)
- **Light sections**: Warm industrial (#EBEBE8) with grid lines (about, projects)
- **Typography**: Fraunces (display/editorial) + DM Sans (body) + Space Mono (code/labels)
- **Accent**: Emerald green (#34D399) with blue secondary (#0066FF)

---

## 🤖 AI Chat — How It Works

The AI chat widget uses OpenRouter's free tier with `google/gemma-3-4b-it:free`. It:

1. **Detects visitor type** — Asks subtle questions to understand if they're a recruiter, developer, student, etc.
2. **Adapts its pitch** — Tailors responses based on what the visitor needs
3. **Maintains context** — Remembers the conversation history
4. **Stays in persona** — Always represents your professional profile

To customize the AI's behavior, edit `config/portfolio.js` → `chat.persona`.

---

## 📊 GitHub Auto-Sync

Your public GitHub repos are automatically fetched and displayed in the Projects section. To configure:

```javascript
github: {
  username: "Poojax21",         // Your GitHub username
  fetchProjects: true,          // Set to false to disable
  maxProjects: 6,               // Max repos to show
  exclude: ["username", ".github"], // Repos to skip
}
```

Repos are cached for 1 hour to avoid rate limiting.

---

## 📬 Contact Form Setup

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy the form ID
3. Add it to `config/portfolio.js`:
   ```javascript
   contact: {
     formspreeId: "xyzabcde",  // Your Formspree form ID
   }
   ```

Without a Formspree ID, the form falls back to a `mailto:` link.

---

## 💡 Tips for Best Results

- **Add your resume**: Drop `resume.pdf` in the `/public` folder
- **Add a profile photo**: Place `profile.jpg` in `/public` and update the config
- **Update the AI persona**: The more detail you give it, the better it represents you
- **Add real projects**: Update `featuredProjects` with your actual work
- **Set real experience**: Update `experience` with your actual jobs/internships

---

Built with ❤️ using Next.js, Tailwind CSS, and OpenRouter AI
