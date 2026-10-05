import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const cardVariants = {
  hidden: ({ x, y }) => ({
    x: x || 0,
    y: y || 0,
    opacity: 0,
  }),
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.28,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.06,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

export function AnimatedCard({ 
  children, 
  className, 
  startX = 0, 
  startY = 0, 
  cardClassName = "",
  layoutId = null,
  onClick,
  isReady = true
}) {
  return (
    <motion.div
      custom={{ x: startX, y: startY }}
      variants={cardVariants}
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      layoutId={layoutId}
      onClick={onClick}
      className={`relative h-full w-full group transform-gpu ${className ? className : ''} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <Card className={`
        h-full w-full 
        dark:bg-zinc-950 bg-white md:dark:bg-zinc-950/90 md:bg-white/95 md:backdrop-blur-md 
        dark:border-zinc-800/80 border-slate-200 border-t border-l
        dark:border-b-[3px] dark:border-r-[3px] dark:border-b-zinc-900 dark:border-r-zinc-900
        border-b-[2px] border-r-[2px] border-b-slate-300 border-r-slate-300
        shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_25px_rgb(0,0,0,0.6)] 
        transition-all duration-200 
        group-hover:border-b-indigo-500/50 group-hover:border-r-indigo-500/50
        dark:text-zinc-50 text-slate-900 overflow-hidden rounded-3xl ${cardClassName}
      `}>
        {children}
      </Card>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
    </motion.div>
  );
}

export function AnimatedText({ children, className = "", as: Component = "div" }) {
  const MotionComponent = motion[Component] || motion.div;
  return (
    <MotionComponent variants={itemVariants} className={className}>
      {children}
    </MotionComponent>
  );
}
