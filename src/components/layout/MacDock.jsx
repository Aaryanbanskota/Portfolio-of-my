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
        className="pointer-events-auto flex items-end gap-2 px-4 pb-3 bg-zinc-950/70 backdrop-blur-3xl border border-zinc-800/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-[72px]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
      >
        {apps.map((app, index) => {
          const scale = getScale(index);
          const y = getYParams(index);
          const isHovered = hoveredIndex === index;
          const isActive = app.path && location.pathname === app.path;

          const content = (
            <div className="relative group flex flex-col items-center">
              {/* Floating Tooltip */}
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-14 bg-zinc-800 text-zinc-100 font-medium text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-zinc-700 pointer-events-none"
                >
                  {app.name}
                </motion.div>
              )}

              {/* Icon Container with Apple squircle-like look */}
              <motion.button
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{ scale, y }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative flex items-center justify-center rounded-[14px] bg-gradient-to-tr from-zinc-800 to-zinc-700 shadow-lg border border-zinc-600/50 overflow-hidden hover:from-zinc-700 hover:to-zinc-600"
                style={{ width: 44, height: 44, transformOrigin: 'bottom' }}
                onClick={app.action}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                {app.icon()}
              </motion.button>

              {/* Active Dot indicator */}
              <div className={`mt-1.5 w-[5px] h-[5px] rounded-full transition-all duration-300 ${isActive ? 'bg-zinc-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-transparent'}`} />
            </div>
          );

          if (app.path) {
            return <Link to={app.path} key={app.name}>{content}</Link>;
          }
          if (app.url) {
            return <a href={app.url} target="_blank" rel="noreferrer" key={app.name}>{content}</a>;
          }
          return <div key={app.name}>{content}</div>;
        })}
      </motion.div>
    </div>
  );
}
