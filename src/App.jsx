import { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import NotFound from './pages/NotFound';
import { MacDock } from './components/layout/MacDock';
import { Preloader } from './components/layout/Preloader';
import details from './data/details.json';
import ProjectDetail from './pages/ProjectDetail';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = details.profile.avatarUrl;
    document.title = `${details.profile.name} | Portfolio`;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <Preloader onComplete={() => setIsPreloaderDone(true)} />
        <div className="relative min-h-screen bg-slate-100 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 font-sans selection:bg-indigo-500/30 transition-colors duration-300 pb-32">
          <Routes>
            <Route path="/" element={<LandingPage isPreloaderDone={isPreloaderDone} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:blogId" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MacDock />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
