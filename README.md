# 🚀 Aaryan Banskota — Personal Portfolio & Technical Hub

[![Deploy Status](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange?style=flat-square&logo=cloudflare)](https://aaryanbanskota.pages.dev/)
[![React Version](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A high-performance, mobile-first personal portfolio and technical publishing platform engineered with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**. 

Designed to showcase **4+ years of software development experience**, featured open-source applications (**PocketDesk**, **Nagar Sampark**, **Bloom Terminal**), hackathon achievements (**Godawari Hacks 1st Place Winner**, **WCBT Hackathon**, **MBMC Webathon**), IT OJT milestones, and deep technical engineering articles.

---

## 🌟 Key Features

### 1. 🖥️ Interactive macOS-Style Floating Dock (`MacDock`)
- Floating glassmorphism navigation dock with spring-physics scale animation.
- Intuitive recruiter-optimized navigation: **Home** → **Projects** → **Blog** → **Contact** → **Theme Switcher**.
- Full light & dark mode support with system preference memory via `localStorage`.

### 2. 📱 Production Project Showcase (`/projects`)
- Interactive project grid featuring live GitHub repositories, release APK/Linux binary downloads, custom Markdown documentation readers, and contributor breakdowns.
- Featured applications:
  - **PocketDesk**: Production offline-first privacy ecosystem built with Flutter & Isar NoSQL.
  - **Nagar Sampark**: Municipal government contact directory app developed during 1st & 2nd OJT.
  - **Bloom Terminal**: Rich-text Python terminal suite & developer CLI workspace.

### 3. ✍️ Technical Writing & Article Hub (`/blog`)
- Dedicated markdown article reader supporting GFM syntax, code blocks, blockquotes, and deep linking.
- **Advanced Multi-Field Search**: Instant search matching titles, topics, tags, and content.
- **Collapsible Filter System**: Filter by category (`Engineering`, `OJT`, `Hackathons`, `First Steps`, `Computer Science`) and tag clouds.
- **Reading Utility**: Scroll reading progress bar, one-click link sharing, and local article bookmarking.

### 4. 🎯 Interactive Timeline & Milestone Hub
- Interactive milestone cards linked directly to dedicated retrospective articles.
- Highlights: *1st Project Report Card Creator*, *1st OJT IT Hardware & LAN Networking*, *2nd OJT Mobile Engineering*, *Godawari Hacks AfnoCare (1st Place)*, *WCBT HealthWhisper AI*, and *MBMC Webathon Calorie Tracker*.

### 5. ⚡ 60FPS Mobile Optimization
- Zero GPU backdrop blur lag on mobile devices.
- Hardware-accelerated CSS transforms (`transform-gpu`) replacing heavy layout morphing.
- Asynchronous image decoding (`decoding="async"`) & lazy loading (`loading="lazy"`).

### 6. 🔍 Search Engine & Social Media SEO
- Full Open Graph & Twitter Card preview cards.
- Structured JSON-LD schema (`Person` and `WebSite`) for Google Rich Results.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|:---|:---|
| **Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Styling & Icons** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom SVGs |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Markdown Engine** | `react-markdown` + `remark-gfm` + `rehype-raw` |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com/) (`pages_build_output_dir: dist`) |

---

## 📂 Project Structure

```
├── public/
│   └── _redirects              # SPA routing fallback for Cloudflare Pages
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AnimatedCard.jsx # Optimized GPU-accelerated card container
│   │   │   ├── MacDock.jsx      # macOS-style floating dock navigation
│   │   │   └── Preloader.jsx    # Smooth asset preloader
│   │   └── ui/                  # UI components
│   ├── data/
│   │   ├── blogs.json           # Dedicated dataset for all technical articles
│   │   └── details.json         # Profile, skills, projects, and milestone data
│   ├── pages/
│   │   ├── Blog.jsx             # Filterable article catalog & search engine
│   │   ├── BlogDetail.jsx       # Markdown article reader & progress bar
│   │   ├── Contact.jsx          # Contact page with Gmail & social links
│   │   ├── LandingPage.jsx      # Bento grid hero & interactive milestones
│   │   ├── Projects.jsx         # Project showcase grid
│   │   └── ProjectDetail.jsx    # Dedicated project documentation reader
│   ├── App.jsx                  # Main router & theme provider
│   ├── index.css                # Global Tailwind CSS & custom scrollbars
│   └── main.jsx                 # Entry point
├── index.html                   # HTML template with full SEO & OpenGraph metadata
├── wrangler.json                # Cloudflare Pages deployment configuration
└── package.json                 # Project dependencies & build scripts
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aaryanbanskota/Portfolio-of-my.git
   cd Portfolio-of-my
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Lint codebase**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```
   Output directory: `dist/`

---

## 🌐 Deployment (Cloudflare Pages)

This project is configured for seamless zero-config deployment on **Cloudflare Pages**.

- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Wrangler Config**: `wrangler.json` (`pages_build_output_dir: "dist"`)

---

## 📬 Author & Social Links

**Aaryan Banskota** — *Software Engineer & Tech Creator*

- 🌐 **Portfolio**: [aaryanbanskota.pages.dev](https://aaryanbanskota.pages.dev/)
- 💻 **GitHub**: [@Aaryanbanskota](https://github.com/Aaryanbanskota)
- 💼 **LinkedIn**: [aaryan-banskota](https://www.linkedin.com/in/aaryan-banskota-164619370/)
- 📧 **Gmail**: [aaryanbanskota@gmail.com](mailto:aaryanbanskota@gmail.com)
- 🐦 **X (Twitter)**: [@Aaryan_banskota](https://x.com/Aaryan_banskota)
- 📘 **Facebook**: [aaryan.baskota.2025](https://www.facebook.com/aaryan.baskota.2025)
- 📷 **Instagram**: [@its.aaryan_01](https://www.instagram.com/its.aaryan_01/)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
