import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import details from '@/data/details.json';

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
  instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
  facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
  )
};

export function MacDock() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [language, setLanguage] = useState("EN");
  const location = useLocation();

  // Grab social links dynamically if they exist, otherwise fallback
  const getSocialUrl = (name) => {
    return details.socials.find(s => s.name.toLowerCase() === name.toLowerCase())?.url || "#";
  };

  const apps = [
    { name: 'Home', icon: icons.home, path: "/" },
    { name: 'Projects', icon: icons.folder, path: "/projects" },
    { name: 'Email', icon: icons.mail, path: "/contact" },
    { name: 'Instagram', icon: icons.instagram, url: getSocialUrl('instagram') },
    { name: 'X / Twitter', icon: icons.twitter, url: getSocialUrl('twitter') },
    { name: 'Facebook', icon: icons.facebook, url: getSocialUrl('facebook') },
    { name: 'Phone', icon: icons.phone, url: getSocialUrl('number') },
    { name: `Language (${language})`, icon: icons.globe, action: () => setLanguage(lang => lang === "EN" ? "NE" : "EN") },
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
