import { AnimatedCard, AnimatedText } from '@/components/layout/AnimatedCard';
import details from '@/data/details.json';

export default function Contact() {
  return (
    <div className="min-h-screen p-6 md:p-10 pb-32 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <AnimatedCard startY={50} cardClassName="p-12 text-center flex flex-col items-center gap-8">
        <AnimatedText className="text-4xl font-bold dark:text-zinc-100 text-slate-900">Contact</AnimatedText>
        <AnimatedText className="dark:text-zinc-400 text-slate-600 text-lg max-w-lg">
          I'm always open to new opportunities, collaborations, or just a chat. Feel free to reach out via any of the platforms below!
        </AnimatedText>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
          {details.socials.map((social, idx) => (
            <AnimatedText key={idx} className="w-full">
              <a 
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                className="block w-full py-4 rounded-xl border dark:border-zinc-800 border-slate-200 dark:bg-zinc-900/50 bg-slate-50 hover:bg-indigo-50 hover:dark:bg-zinc-800 hover:border-indigo-400 dark:hover:border-zinc-500 transition-all dark:text-zinc-300 text-slate-800 font-medium capitalize shadow-sm hover:shadow-md"
              >
                {social.name}
              </a>
            </AnimatedText>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}
