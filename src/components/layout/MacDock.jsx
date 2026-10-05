import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/App';

// Pure SVGs to avoid any icon import crashes
const icons = {
  home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  folder: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
  ),
  mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  blog: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
  ),
  sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  ),
  moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  ),
};

export function MacDock() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const apps = [
    { name: 'Home', icon: icons.home, path: "/" },
    { name: 'Projects', icon: icons.folder, path: "/projects" },
    { name: 'Blog', icon: icons.blog, path: "/blog" },
    { name: 'Contact', icon: icons.mail, path: "/contact" },
  ];

  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.4;
    if (distance === 1) return 1.2;
    return 1;
  };

  const getYParams = (index) => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return -12;
    if (distance === 1) return -6;
    return 0;
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-0 w-full flex justify-center pointer-events-none z-[200] px-4">
      <motion.div 
        className="pointer-events-auto flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 dark:bg-zinc-900 bg-white md:dark:bg-zinc-900/85 md:bg-white/85 md:backdrop-blur-xl border dark:border-white/10 border-slate-300/80 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.25)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-colors duration-200 transform-gpu"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {apps.map((app, index) => {
          const scale = getScale(index);
          const y = getYParams(index);
          const isHovered = hoveredIndex === index;
          const isActive = app.path && location.pathname === app.path;

          return (
            <Link to={app.path} key={app.name} className="relative group flex flex-col items-center">
              {/* Floating Tooltip */}
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute -top-12 dark:bg-zinc-900/90 bg-slate-900 text-white font-semibold text-xs px-3 py-1 rounded-full shadow-2xl border border-zinc-700/80 pointer-events-none z-30"
                >
                  {app.name}
                </motion.div>
              )}

              {/* Icon Container */}
              <motion.button
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{ scale, y }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative flex items-center justify-center rounded-2xl dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-950 bg-slate-100 border border-slate-300 dark:border-zinc-700/60 shadow-md overflow-hidden transition-colors ${
                  isActive 
                    ? 'dark:from-indigo-600/40 dark:to-zinc-900 border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.3)] bg-indigo-50' 
                    : 'hover:border-zinc-500'
                }`}
                style={{ width: 44, height: 44, transformOrigin: 'bottom' }}
              >
                <div className="dark:text-zinc-200 text-slate-700 group-hover:text-indigo-500 dark:group-hover:text-white transition-colors">
                  {app.icon()}
                </div>
              </motion.button>

              {/* Active Indicator Dot */}
              <div className={`mt-1 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]' 
                  : 'bg-transparent'
              }`} />
            </Link>
          );
        })}

        {/* Divider Bar */}
        <div className="w-px h-7 bg-zinc-300 dark:bg-zinc-800/80 mx-1" />

        {/* Theme Switcher Button */}
        <div className="relative group flex flex-col items-center">
          {hoveredIndex === 'theme' && (
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -top-12 dark:bg-zinc-900/90 bg-slate-900 text-white font-semibold text-xs px-3 py-1 rounded-full shadow-2xl border border-zinc-700/80 pointer-events-none z-30 whitespace-nowrap"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </motion.div>
          )}

          <motion.button
            onClick={toggleTheme}
            onHoverStart={() => setHoveredIndex('theme')}
            onHoverEnd={() => setHoveredIndex(null)}
            animate={{ scale: getScale(apps.length), y: getYParams(apps.length) }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative flex items-center justify-center rounded-2xl dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-950 bg-slate-100 border border-slate-300 dark:border-zinc-700/60 shadow-md overflow-hidden hover:border-zinc-500 transition-colors"
            style={{ width: 44, height: 44, transformOrigin: 'bottom' }}
          >
            <div className="dark:text-zinc-200 text-slate-700 group-hover:text-indigo-500 dark:group-hover:text-white transition-colors">
              {theme === 'dark' ? icons.sun() : icons.moon()}
            </div>
          </motion.button>
          
          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-transparent" />
        </div>

      </motion.div>
    </div>
  );
}
