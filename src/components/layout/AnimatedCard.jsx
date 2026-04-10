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

export function AnimatedCard({ children, className, startX = 0, startY = 0, cardClassName = "" }) {
  return (
    <motion.div
      custom={{ x: startX, y: startY }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`h-full w-full ${className || ''}`}
    >
      <Card className={`h-full w-full bg-zinc-950 border-zinc-800 text-zinc-50 overflow-hidden rounded-3xl ${cardClassName}`}>
        {children}
      </Card>
    </motion.div>
  );
}

export function AnimatedText({ children, className = "" }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
