import { AnimatedCard, AnimatedText } from '@/components/layout/AnimatedCard';

export default function Projects() {
  return (
    <div className="min-h-screen p-6 md:p-10 pb-32 max-w-6xl mx-auto flex flex-col items-center justify-center">
      <AnimatedCard startY={50} cardClassName="p-12 text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
        <AnimatedText className="text-4xl font-bold text-zinc-100">Projects</AnimatedText>
        <AnimatedText className="text-zinc-400 text-lg">
          This is a placeholder for your Projects page. You can map through your Git repositories here later!
        </AnimatedText>
        <AnimatedText className="w-full h-64 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 flex items-center justify-center">
          <span className="text-zinc-600 font-medium">Under Construction</span>
        </AnimatedText>
      </AnimatedCard>
    </div>
  );
}
