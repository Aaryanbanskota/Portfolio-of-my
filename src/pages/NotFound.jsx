import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen p-6 sm:p-10 pb-36 max-w-3xl mx-auto flex flex-col items-center justify-center text-center pt-24 sm:pt-32 space-y-6">
      
      {/* Huge Elegant 404 Number */}
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-7xl sm:text-9xl font-black tracking-tighter dark:text-zinc-100 text-slate-900 font-serif"
      >
        404
      </motion.h1>

      {/* Main Message */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="space-y-3"
      >
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-zinc-200 text-slate-800 font-serif leading-snug">
          Oops, you have entered the wrong URL or this URL does not exist.
        </h2>

        <p className="dark:text-zinc-400 text-slate-600 text-sm sm:text-base font-normal font-mono pt-2">
          Requested URL: <span className="dark:text-indigo-400 text-indigo-600 font-semibold">{location.pathname}</span>
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-4 pt-6"
      >
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold text-xs sm:text-sm transition-all shadow-md"
        >
          Return to Home Page
        </Link>

        <Link
          to="/projects"
          className="px-6 py-3 rounded-2xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-300 dark:text-zinc-200 text-slate-800 hover:border-indigo-400 font-semibold text-xs sm:text-sm transition-all shadow-xs"
        >
          View Projects
        </Link>
      </motion.div>

    </div>
  );
}
