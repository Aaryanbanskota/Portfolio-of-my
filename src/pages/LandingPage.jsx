import { AnimatedCard, AnimatedText } from '@/components/layout/AnimatedCard';
// lucide-react import removed
import heroImg from '@/assets/hero.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col font-sans p-6 md:p-10 selection:bg-zinc-800">
      
      {/* Top Navigation */}
      <nav className="flex justify-center md:justify-end space-x-6 mb-12 max-w-6xl mx-auto w-full text-zinc-400">
        <a href="#home" className="hover:text-zinc-50 transition-colors">.home</a>
        <a href="#contact" className="hover:text-zinc-50 transition-colors">.contact</a>
        <a href="#project" className="hover:text-zinc-50 transition-colors">.project</a>
      </nav>

      {/* Main Bento Grid */}
      <main className="flex-grow w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto] gap-6 h-full">

          {/* 1. Who Am I Box */}
          <AnimatedCard startX={-150} startY={-150} className="md:col-span-2" cardClassName="p-8 justify-center">
            <AnimatedText className="text-xl md:text-2xl font-light text-zinc-400 mb-2">who am i ?</AnimatedText>
            <AnimatedText className="text-2xl md:text-3xl font-medium leading-relaxed">
              I am Aaryan Banskota, a 17-year-old developer with 4 years of coding experience and a proven track record in engineering and innovation.
            </AnimatedText>
          </AnimatedCard>

          {/* 2. Samurai Main Image Box */}
          <AnimatedCard startX={150} startY={-150} className="md:col-span-1 md:row-span-2" cardClassName="p-6 relative group overflow-hidden flex flex-col justify-between items-center text-center">
            <AnimatedText className="w-full flex-grow flex items-center justify-center pt-8">
               {/* Use the hero.png if available, else a stylized placeholder */}
               <img 
                 src={heroImg} 
                 alt="Samurai 3D" 
                 className="object-cover max-h-64 object-center drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-700 ease-in-out"
                 onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop'; }}
               />
            </AnimatedText>
            <AnimatedText className="mt-8 text-2xl font-bold tracking-widest uppercase text-zinc-200">
              Never give up
            </AnimatedText>
          </AnimatedCard>

          {/* 3. Skills Box */}
          <AnimatedCard startX={-150} startY={0} className="md:col-span-1" cardClassName="p-8 justify-center">
            <AnimatedText className="text-xl font-light text-zinc-400 mb-6">skill</AnimatedText>
            <div className="space-y-4 text-xl font-medium">
              <AnimatedText className="text-blue-400">react.js</AnimatedText>
              <AnimatedText className="text-emerald-400">supabase</AnimatedText>
              <AnimatedText className="text-zinc-50">shadcn/ui</AnimatedText>
            </div>
          </AnimatedCard>

          {/* 4. Logo Circle Box */}
          <AnimatedCard startX={0} startY={150} className="md:col-span-1" cardClassName="p-8 flex items-center justify-center">
            <AnimatedText className="flex flex-col items-center gap-6">
              <div className="relative w-24 h-24">
                 {/* Sketch-like circles intersecting */}
                 <div className="absolute inset-x-0 w-16 h-16 border border-zinc-500 rounded-full left-1/2 -ml-8 top-0" />
                 <div className="absolute w-16 h-16 border border-zinc-500 rounded-full bottom-0 left-0" />
                 <div className="absolute w-16 h-16 border border-zinc-500 rounded-full bottom-0 right-0" />
              </div>
              <span className="text-lg font-medium tracking-wide">AaryanBanskota</span>
            </AnimatedText>
          </AnimatedCard>

          {/* 5. Milestones Box */}
          <AnimatedCard startX={-150} startY={150} className="md:col-span-1" cardClassName="p-8 justify-center">
            <AnimatedText className="text-xl font-light text-zinc-400 mb-6">Milestones</AnimatedText>
            <ul className="space-y-4 text-lg font-medium list-disc list-inside">
              <AnimatedText as="li">1 hackathon win</AnimatedText>
              <AnimatedText as="li">gone to ojt</AnimatedText>
            </ul>
          </AnimatedCard>

          {/* 6. Description Box */}
          <AnimatedCard startX={150} startY={150} className="md:col-span-2" cardClassName="p-8 justify-center">
            <AnimatedText className="text-lg md:text-xl font-light leading-relaxed text-zinc-300 space-y-4">
              <p>I'm a 17-year-old developer with 4 years of experience who loves building things that solve real-world problems.</p>
              <p>I enjoy diving deep into technical research and exploring new technologies to see how they actually work.</p>
              <p>I'm always experimenting and looking for better ways to turn creative ideas into functional digital solutions.</p>
            </AnimatedText>
          </AnimatedCard>

        </div>
      </main>

      {/* Bottom Socials */}
      <footer className="mt-12 mb-4 flex justify-center space-x-4 max-w-6xl mx-auto w-full">
        <a href="#" className="border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 px-6 py-2 rounded-full transition-all flex items-center gap-2">
          linkedin
        </a>
        <a href="#" className="border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 px-6 py-2 rounded-full transition-all flex items-center gap-2">
          facebook
        </a>
        <a href="#" className="border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 px-6 py-2 rounded-full transition-all flex items-center gap-2">
          gmail
        </a>
        <a href="#" className="border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 px-6 py-2 rounded-full transition-all flex items-center gap-2">
          number
        </a>
      </footer>

    </div>
  );
}
