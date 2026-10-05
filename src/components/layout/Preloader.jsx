import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import details from '@/data/details.json';

export function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Collect all critical image URLs to preload
    const urls = [
      details.profile.avatarUrl,
      details.hero.imageUrl,
      ...details.projects.map(p => p.bannerUrl).filter(Boolean),
      ...details.milestones.items.map(m => m.logoUrl || m.imageUrl).filter(Boolean),
      ...details.skills.categories.flatMap(c => c.skills.map(s => s.icon)).filter(Boolean),
      ...details.profile.achievements.map(a => a.badgeUrl).filter(Boolean),
    ];

    let loadedCount = 0;
    const total = urls.length;

    if (total === 0) {
      setProgress(100);
      setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 300);
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const currentPct = Math.min(Math.round((loadedCount / total) * 100), 100);
      setProgress(currentPct);

      if (loadedCount >= total) {
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 250);
      }
    };

    urls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Fallback timer to ensure page loads within 800ms max even if network is slow
    const timeout = setTimeout(() => {
      setProgress(100);
      setIsDone(true);
      if (onComplete) onComplete();
    }, 800);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
          className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center p-6 text-zinc-100 selection:bg-none"
        >
          <div className="flex flex-col items-center space-y-6 max-w-xs w-full text-center">
            
            {/* Logo Avatar Pulsing Ring */}
            <div className="relative w-20 h-20 rounded-full p-1 bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
              <img
                src={details.profile.avatarUrl}
                alt={details.profile.name}
                className="w-full h-full object-cover rounded-full animate-pulse"
              />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl font-bold tracking-wide text-zinc-100">{details.profile.name}</h2>
              <p className="text-xs text-zinc-500 font-mono mt-1">Preloading assets...</p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2">
              <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800/80">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Optimizing portfolio</span>
                <span>{progress}%</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
