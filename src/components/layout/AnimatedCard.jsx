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
      type: 'spring',
      stiffness: 70,
      damping: 12,
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

export const itemVariants = {
  hidden: { filter: 'blur(10px)', opacity: 0, y: 10 },
  visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.4 } },
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
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layoutId={layoutId}
      onClick={onClick}
      className={`relative h-full w-full group ${className ? className : ''} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <Card className={`
        h-full w-full 
        dark:bg-zinc-950/80 bg-white/90 backdrop-blur-xl 
        dark:border-zinc-800/80 border-slate-200 border-t border-l
        dark:border-b-[4px] dark:border-r-[4px] dark:border-b-zinc-900 dark:border-r-zinc-900
        border-b-[3px] border-r-[3px] border-b-slate-300 border-r-slate-300
        shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgb(0,0,0,0.8)] 
        transition-all duration-300 
        group-hover:border-b-indigo-500/50 group-hover:border-r-indigo-500/50
        dark:text-zinc-50 text-slate-900 overflow-hidden rounded-3xl ${cardClassName}
      `}>
        {children}
      </Card>
      
      {/* 3D Reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
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
