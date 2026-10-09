import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedCard } from '@/components/layout/AnimatedCard';

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-10 pb-36 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-8 my-auto pt-16">
      
      <AnimatedCard className="w-full max-w-2xl" cardClassName="p-8 sm:p-12 flex flex-col items-center justify-center space-y-6">
        
        {/* Status Badge */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="px-4 py-1.5 rounded-full dark:bg-rose-500/10 bg-rose-50 border dark:border-rose-500/30 border-rose-200 dark:text-rose-400 text-rose-600 text-xs font-mono font-semibold tracking-wide uppercase"
        >
          404 • Page Not Found
        </motion.div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black dark:text-white text-slate-900 tracking-tight">
            Lost in Cyberspace?
          </h1>
          <p className="dark:text-zinc-400 text-slate-600 text-base sm:text-lg font-normal max-w-md mx-auto">
            The page or resource you are looking for does not exist or has been moved to a new route.
          </p>
        </div>

        {/* Typed URL Path Inspector */}
        <div className="w-full p-4 rounded-2xl dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 text-left font-mono text-xs sm:text-sm space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between dark:text-zinc-500 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
            <span>Requested URL Path:</span>
            <span>HTTP 404</span>
          </div>
          <div className="dark:text-rose-400 text-rose-600 font-bold truncate">
            {location.pathname}
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 w-full">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-2xl dark:bg-zinc-800 bg-slate-200 dark:text-zinc-200 text-slate-800 hover:dark:bg-zinc-700 hover:bg-slate-300 font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            ← Go Back
          </button>

          <Link
            to="/"
            className="px-6 py-2.5 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold text-xs sm:text-sm transition-all shadow-md"
          >
            Return to Home Page
          </Link>

          <Link
            to="/projects"
            className="px-5 py-2.5 rounded-2xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 dark:text-zinc-300 text-slate-700 hover:border-indigo-400 font-semibold text-xs sm:text-sm transition-all shadow-xs"
          >
            View Projects
          </Link>
        </div>

      </AnimatedCard>

    </div>
  );
}
