import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Pure SVGs to avoid any lucide-react import crashes
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
};

export function MacDock() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  const apps = [
    { name: 'Home', icon: icons.home, path: "/" },
    { name: 'Projects', icon: icons.folder, path: "/projects" },
    { name: 'Contact', icon: icons.mail, path: "/contact" },
  ];

  const getScale = (index) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.1;
    return 1;
  };

  const getYParams = (index) => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return -15;
    if (distance === 1) return -8;
    return 0;
  };

  return (
    <div className="fixed bottom-6 inset-x-0 w-full flex justify-center pointer-events-none z-[200]">
      <motion.div 
        className="pointer-events-auto flex items-center gap-4 px-5 py-3 bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
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
                  className="absolute -top-12 bg-zinc-900/90 backdrop-blur-md text-zinc-100 font-semibold text-xs px-3 py-1 rounded-full shadow-2xl border border-zinc-700/80 pointer-events-none z-30"
                >
                  {app.name}
                </motion.div>
              )}

              {/* Icon Container - Glassy Squircle */}
              <motion.button
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{ scale, y }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700/60 shadow-lg overflow-hidden transition-colors ${
                  isActive 
                    ? 'from-indigo-600/40 to-zinc-900 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                    : 'hover:from-zinc-700 hover:to-zinc-900 hover:border-zinc-500'
                }`}
                style={{ width: 48, height: 48, transformOrigin: 'bottom' }}
              >
                {/* Gloss Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none" />
                <div className="text-zinc-200 group-hover:text-white transition-colors">
                  {app.icon()}
                </div>
              </motion.button>

              {/* Active Indicator Dot */}
              <div className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,1)]' 
                  : 'bg-transparent'
              }`} />
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
