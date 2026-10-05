import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard, AnimatedText } from '@/components/layout/AnimatedCard';
import details from '@/data/details.json';

export default function LandingPage() {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col font-sans p-6 md:p-10 pb-32 overflow-hidden selection:bg-indigo-500/30">
      


      <main className="flex-grow w-full max-w-6xl mx-auto relative cursor-default">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto] gap-6 h-full">

          {/* 1. Who Am I Box */}
          <AnimatedCard layoutId="who-am-i" onClick={() => setActiveId('who-am-i')} startX={-150} startY={-150} className="md:col-span-2" cardClassName="p-8 justify-center">
            <AnimatedText className="text-xl md:text-2xl font-light text-zinc-400 mb-2">{details.profile.title}</AnimatedText>
            <AnimatedText className="text-2xl md:text-3xl font-medium leading-relaxed drop-shadow-sm text-zinc-300">
               I am <span className="text-indigo-400 font-semibold">{details.profile.name}</span>, a 17-year-old developer with 4 years of coding experience and a proven track record in engineering and innovation.
            </AnimatedText>
          </AnimatedCard>

          {/* 2. Samurai Main Image Box (Hero) */}
          <AnimatedCard layoutId="hero" className="md:col-span-1 md:row-span-2" startX={150} startY={-150} cardClassName="p-0 relative group overflow-hidden flex flex-col items-center text-center justify-end border-zinc-800">
            <AnimatedText className="absolute inset-0 flex items-center justify-center -z-10">
               <img 
                 src={details.hero.imageUrl} 
                 alt="Hero" 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </AnimatedText>
            <AnimatedText className="pb-8 text-2xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_15px_rgba(0,0,0,1)] z-10">
              {details.hero.tagline}
            </AnimatedText>
          </AnimatedCard>

          {/* 3. Skills Box */}
          <AnimatedCard layoutId="skills" onClick={() => setActiveId('skills')} startX={-150} startY={0} className="md:col-span-1 border-emerald-900/30" cardClassName="p-8 justify-center">
            <AnimatedText className="text-xl font-light text-zinc-400 mb-6">{details.skills.title}</AnimatedText>
            <div className="flex flex-wrap gap-2 text-sm font-medium">
              {details.skills.items.slice(0, 5).map((skill, i) => (
                <AnimatedText key={i} className={`px-2 py-1 rounded bg-zinc-900 border border-zinc-800 ${skill.colorClass}`}>
                  {skill.name}
                </AnimatedText>
              ))}
              <AnimatedText className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">
                +{details.skills.items.length - 5} more...
              </AnimatedText>
            </div>
          </AnimatedCard>

          {/* 4. GitHub Profile Box */}
          <AnimatedCard layoutId="profile" onClick={() => setActiveId('profile')} startX={0} startY={150} className="md:col-span-1" cardClassName="p-8 flex items-center justify-center group overflow-hidden relative">
            <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center gap-6 z-10 pointer-events-none">
              <AnimatedText className="relative w-28 h-28 rounded-full border-[3px] border-zinc-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden group-hover:border-blue-500 transition-colors duration-500">
                 <img src={details.profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </AnimatedText>
              <AnimatedText className="text-lg font-medium tracking-wide flex flex-col items-center text-zinc-200">
                 <span>@{details.profile.githubUrl.split('/').pop()}</span>
              </AnimatedText>
            </div>
          </AnimatedCard>

          {/* 5. Milestones Box */}
          <AnimatedCard layoutId="milestones" onClick={() => setActiveId('milestones')} startX={-150} startY={150} className="md:col-span-1" cardClassName="p-8 justify-center">
            <AnimatedText className="text-xl font-light text-zinc-400 mb-6">{details.milestones.title}</AnimatedText>
            <ul className="space-y-4 text-lg font-medium list-none">
              {details.milestones.items.map((ms, i) => (
                <AnimatedText as="li" key={i} className="text-zinc-200 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                   {ms.title}
                </AnimatedText>
              ))}
            </ul>
          </AnimatedCard>

          {/* 6. Description Box */}
          <AnimatedCard layoutId="desc" startX={150} startY={150} className="md:col-span-2" cardClassName="p-8 justify-center relative shadow-inner">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-emerald-500 rounded-l-3xl opacity-50" />
            <AnimatedText className="text-lg md:text-xl font-light leading-relaxed text-zinc-300 space-y-4">
              {details.description.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </AnimatedText>
          </AnimatedCard>

        </div>
      </main>

      {/* --- MODAL LAYER --- */}
      <AnimatePresence>
        {activeId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div 
              layoutId={activeId}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
              <button 
                onClick={() => setActiveId(null)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors z-20"
              >
                ✕
              </button>

              <div className="p-8 md:p-12 flex-grow">
                {activeId === 'who-am-i' && (
                  <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-left">
                     <img src={details.profile.avatarUrl} alt="Face" className="w-48 h-48 rounded-3xl object-cover shadow-2xl border-2 border-zinc-800" />
                     <div className="space-y-6">
                       <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                         {details.profile.name}
                       </h2>
                       <p className="text-xl text-zinc-300 leading-relaxed font-light">
                         {details.profile.expandedBio}
                       </p>
                     </div>
                  </div>
                )}

                {activeId === 'skills' && (
                  <div>
                    <h2 className="text-3xl font-bold text-zinc-100 mb-8 tracking-wide">My Technology Stack</h2>
                    <div className="flex flex-wrap gap-4">
                      {details.skills.items.map((skill, i) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.03 }}
                          key={i} 
                          className={`px-4 py-2 text-lg rounded-xl bg-zinc-900 border border-zinc-700 shadow-md ${skill.colorClass}`}
                        >
                          {skill.name}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeId === 'milestones' && (
                  <div>
                    <h2 className="text-3xl font-bold text-zinc-100 mb-8 tracking-wide">Milestones</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {details.milestones.items.map((ms, i) => (
                        <a href={ms.url} target="_blank" rel="noreferrer" key={i} className="group block rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-indigo-500 transition-colors">
                          <div className="h-48 overflow-hidden">
                            <img src={ms.imageUrl} alt={ms.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-indigo-400">{ms.title}</h3>
                            <p className="text-zinc-400">{ms.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {activeId === 'profile' && (
                  <div className="flex flex-col items-center justify-center text-center py-6 space-y-8">
                     <img src={details.profile.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]" />
                     <div>
                       <h2 className="text-3xl font-bold text-zinc-100">@{details.profile.githubUrl.split('/').pop()}</h2>
                       <a href={details.profile.githubUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 hover:underline text-sm mt-1 inline-block">
                         View GitHub Profile ↗
                       </a>
                     </div>
                     
                     {/* Stats Grid */}
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                       <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
                         <div className="text-3xl font-black text-white">{details.profile.stats.repos}</div>
                         <div className="text-zinc-400 uppercase tracking-widest text-xs mt-1">Repositories</div>
                       </div>
                       <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
                         <div className="text-3xl font-black text-white">{details.profile.stats.followers}</div>
                         <div className="text-zinc-400 uppercase tracking-widest text-xs mt-1">Followers</div>
                       </div>
                       <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
                         <div className="text-3xl font-black text-white">{details.profile.stats.following}</div>
                         <div className="text-zinc-400 uppercase tracking-widest text-xs mt-1">Following</div>
                       </div>
                       <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
                         <div className="text-lg font-bold text-white">{details.profile.stats.memberSince}</div>
                         <div className="text-zinc-400 uppercase tracking-widest text-xs mt-1">Member Since</div>
                       </div>
                     </div>

                     {/* GitHub Achievements Badges */}
                     {details.profile.achievements && details.profile.achievements.length > 0 && (
                       <div className="w-full max-w-3xl flex flex-col items-center gap-4">
                         <h3 className="text-lg font-semibold text-zinc-300">Achievements</h3>
                         <div className="flex flex-wrap justify-center gap-6">
                           {details.profile.achievements.map((ach, idx) => (
                             <a 
                               key={idx}
                               href={ach.url}
                               target="_blank"
                               rel="noreferrer"
                               className="relative group p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/80 transition-all flex flex-col items-center gap-2 shadow-lg"
                             >
                               <div className="relative w-16 h-16 flex items-center justify-center">
                                 <img src={ach.badgeUrl} alt={ach.name} className="w-14 h-14 object-contain group-hover:scale-110 transition-transform" />
                                 {ach.count && (
                                   <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-600 text-white shadow-md border border-indigo-400">
                                     {ach.count}
                                   </span>
                                 )}
                               </div>
                               <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">{ach.name}</span>
                             </a>
                           ))}
                         </div>
                       </div>
                     )}

                     {/* Badges / GitHub Stats Card */}
                     <div className="w-full max-w-3xl flex flex-col items-center gap-4">
                       <h3 className="text-lg font-semibold text-zinc-300">GitHub Stats</h3>
                       <div className="flex flex-wrap justify-center gap-4">
                         <img 
                           src="https://github-readme-stats.vercel.app/api?username=Aaryanbanskota&show_icons=true&theme=dark&bg_color=09090b&border_color=27272a&text_color=a1a1aa&icon_color=818cf8&title_color=f4f4f5" 
                           alt="GitHub Stats" 
                           className="rounded-xl border border-zinc-800 shadow-md max-w-full"
                         />
                         <img 
                           src="https://github-readme-stats.vercel.app/api/top-langs/?username=Aaryanbanskota&layout=compact&theme=dark&bg_color=09090b&border_color=27272a&text_color=a1a1aa&title_color=f4f4f5" 
                           alt="Top Languages" 
                           className="rounded-xl border border-zinc-800 shadow-md max-w-full"
                         />
                       </div>
                     </div>

                     {/* Contributions Calendar Graph */}
                     <div className="w-full max-w-3xl flex flex-col items-center gap-4">
                       <h3 className="text-lg font-semibold text-zinc-300">GitHub Contributions</h3>
                       <div className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-x-auto flex justify-center">
                         <img 
                           src="https://ghchart.rshah.org/4f46e5/Aaryanbanskota" 
                           alt="GitHub Contribution Graph" 
                           className="min-w-[650px] w-full"
                         />
                       </div>
                     </div>

                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
