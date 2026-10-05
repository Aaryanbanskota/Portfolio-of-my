import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard, AnimatedText } from '@/components/layout/AnimatedCard';
import details from '@/data/details.json';

export default function LandingPage({ isPreloaderDone = true }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="h-screen max-h-screen dark:bg-zinc-950 bg-slate-100 dark:text-zinc-50 text-slate-900 flex flex-col font-sans p-4 md:p-8 pb-24 overflow-y-auto md:overflow-hidden selection:bg-indigo-500/30 justify-center transition-colors duration-300">
      
      <main className="w-full max-w-6xl mx-auto relative cursor-default my-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto] gap-6 h-full">

          {/* 1. Who Am I Box */}
          <AnimatedCard isReady={isPreloaderDone} layoutId="who-am-i" onClick={() => setActiveId('who-am-i')} startX={-150} startY={-150} className="md:col-span-2" cardClassName="p-8 justify-center">
            <AnimatedText className="text-xl md:text-2xl font-light dark:text-zinc-400 text-slate-500 mb-2">{details.profile.title}</AnimatedText>
            <AnimatedText className="text-2xl md:text-3xl font-medium leading-relaxed drop-shadow-sm dark:text-zinc-300 text-slate-800">
               I am <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{details.profile.name}</span>, an 18-year-old developer with 4 years of coding experience and a proven track record in engineering and innovation.
            </AnimatedText>
          </AnimatedCard>

          {/* 2. Samurai Main Image Box (Hero) */}
          <AnimatedCard isReady={isPreloaderDone} layoutId="hero" className="md:col-span-1 md:row-span-2" startX={150} startY={-150} cardClassName="p-0 relative group overflow-hidden flex flex-col items-center text-center justify-end border-zinc-800">
            <AnimatedText className="absolute inset-0 flex items-center justify-center -z-10">
               <img 
                 src={details.hero.imageUrl} 
                 alt="Hero" 
                 decoding="async"
                 loading="eager"
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </AnimatedText>
            <AnimatedText className="pb-8 text-2xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_15px_rgba(0,0,0,1)] z-10">
              {details.hero.tagline}
            </AnimatedText>
          </AnimatedCard>

          {/* 3. Skills Box */}
          <AnimatedCard isReady={isPreloaderDone} layoutId="skills" onClick={() => setActiveId('skills')} startX={-150} startY={0} className="md:col-span-1 border-emerald-900/30" cardClassName="p-8 justify-center">
            <AnimatedText className="text-xl font-light dark:text-zinc-400 text-slate-500 mb-6">{details.skills.title}</AnimatedText>
            <div className="flex flex-wrap gap-2 text-sm font-medium">
              {details.skills.categories.flatMap(c => c.skills).slice(0, 6).map((skill, i) => (
                <AnimatedText key={i} className="px-2.5 py-1 rounded-lg dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 dark:text-zinc-300 text-slate-700 flex items-center gap-1.5 text-xs">
                  <img src={skill.icon} alt={skill.name} className="w-3.5 h-3.5 object-contain" />
                  {skill.name}
                </AnimatedText>
              ))}
              <AnimatedText className="px-2 py-1 rounded dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 dark:text-zinc-500 text-slate-500 text-xs">
                +{details.skills.categories.flatMap(c => c.skills).length - 6} more...
              </AnimatedText>
            </div>
          </AnimatedCard>

          {/* 4. GitHub Profile Box */}
          <AnimatedCard isReady={isPreloaderDone} layoutId="profile" onClick={() => setActiveId('profile')} startX={0} startY={150} className="md:col-span-1" cardClassName="p-8 flex items-center justify-center group overflow-hidden relative">
            <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center gap-6 z-10 pointer-events-none">
              <AnimatedText className="relative w-28 h-28 rounded-full border-[3px] dark:border-zinc-700 border-slate-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden group-hover:border-blue-500 transition-colors duration-500">
                 <img src={details.profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </AnimatedText>
              <AnimatedText className="text-lg font-medium tracking-wide flex flex-col items-center dark:text-zinc-200 text-slate-800">
                 <span>@{details.profile.githubUrl.split('/').pop()}</span>
              </AnimatedText>
            </div>
          </AnimatedCard>

          {/* 5. Milestones Box */}
          <AnimatedCard isReady={isPreloaderDone} layoutId="milestones" onClick={() => setActiveId('milestones')} startX={-150} startY={150} className="md:col-span-1" cardClassName="p-8 justify-center">
            <AnimatedText className="flex items-center justify-between mb-4">
              <span className="text-xl font-light dark:text-zinc-400 text-slate-500">{details.milestones.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 dark:text-zinc-400 text-slate-600 font-semibold">
                {details.milestones.items.length} Total
              </span>
            </AnimatedText>
            
            <div className="relative space-y-3.5 pl-1">
              {details.milestones.items.slice(0, 3).map((ms, i) => (
                <AnimatedText key={i} className="relative flex items-center gap-3 dark:text-zinc-200 text-slate-800">
                  {i < 2 && (
                    <div className="absolute left-[4px] top-3 bottom-[-18px] w-[2px] bg-gradient-to-b from-indigo-500 via-indigo-500/80 to-indigo-500/40 shadow-[0_0_8px_rgba(99,102,241,0.6)] z-0" />
                  )}
                  <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.9)] ring-2 dark:ring-zinc-950 ring-white shrink-0" />
                  <div className="flex items-center gap-2 overflow-hidden text-sm font-medium">
                    {ms.logoUrl && (
                      <img src={ms.logoUrl} alt={ms.title} className="w-4 h-4 object-contain shrink-0 rounded" />
                    )}
                    <span className="truncate dark:text-zinc-200 text-slate-800 font-semibold">{ms.title}</span>
                  </div>
                </AnimatedText>
              ))}
            </div>

            <AnimatedText className="mt-4 pt-3 border-t dark:border-zinc-800/60 border-slate-200 flex items-center justify-between text-xs dark:text-zinc-400 text-slate-500 font-medium">
              <span>View full timeline</span>
              <span>+3 more ↗</span>
            </AnimatedText>
          </AnimatedCard>

          {/* 6. Description Box */}
          <AnimatedCard isReady={isPreloaderDone} layoutId="desc" startX={150} startY={150} className="md:col-span-2" cardClassName="p-8 justify-center relative shadow-inner">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-emerald-500 rounded-l-3xl opacity-50" />
            <AnimatedText className="text-lg md:text-xl font-light leading-relaxed dark:text-zinc-300 text-slate-700 space-y-4">
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
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto dark:bg-zinc-950 bg-white border dark:border-zinc-800 border-slate-200 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden dark:text-zinc-50 text-slate-900"
            >
              <button 
                onClick={() => setActiveId(null)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full dark:bg-zinc-800 bg-slate-100 hover:dark:bg-zinc-700 hover:bg-slate-200 dark:text-zinc-300 text-slate-700 transition-colors z-20"
              >
                ✕
              </button>

              <div className="p-8 md:p-12 flex-grow">
                {activeId === 'who-am-i' && (
                  <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-left">
                     <img src={details.profile.avatarUrl} alt="Face" className="w-48 h-48 rounded-3xl object-cover shadow-2xl border-2 border-zinc-800" />
                     <div className="space-y-6">
                       <h2 className="text-4xl md:text-5xl font-black text-white">
                         {details.profile.name}
                       </h2>
                       <p className="text-xl text-zinc-300 leading-relaxed font-light">
                         {details.profile.expandedBio}
                       </p>
                     </div>
                  </div>
                )}

                {activeId === 'skills' && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-zinc-100 tracking-wide">Skills & Technologies</h2>
                    <div className="space-y-6">
                      {details.skills.categories.map((cat, idx) => (
                        <div key={idx} className="space-y-3">
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">{cat.category}</h3>
                          <div className="flex flex-wrap gap-3">
                            {cat.skills.map((skill, i) => (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.02 }}
                                key={i} 
                                className="px-3.5 py-2 text-sm rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 flex items-center gap-2.5 shadow-md hover:border-zinc-700 transition-colors"
                              >
                                <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" />
                                <span>{skill.name}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeId === 'milestones' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-zinc-100 tracking-wide">Milestones Timeline</h2>
                        <p className="text-zinc-400 text-sm mt-1">Explore key hackathons, achievements & engineering experience.</p>
                      </div>
                      <span className="self-start md:self-auto text-xs px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                        Timeline
                      </span>
                    </div>

                    {/* Clean Timeline Path with Subtle Node Dots */}
                    <div className="relative pl-6 md:pl-10 space-y-8">
                      
                      {/* Subtle Vertical Connector Line */}
                      <div className="absolute left-[11px] md:left-[19px] top-6 bottom-6 w-[2px] bg-zinc-800 z-0" />

                      {details.milestones.items.map((ms, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="relative flex items-start gap-4 md:gap-6 group"
                        >
                          {/* Subtle Interactive Dot Node */}
                          <div className="relative z-10 w-5 h-5 md:w-6 md:h-6 rounded-full bg-zinc-800 border-2 border-zinc-700 group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all duration-200 shrink-0 mt-2 flex items-center justify-center cursor-pointer">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-white transition-colors" />
                          </div>

                          {/* Achievement Card */}
                          <a 
                            href={ms.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-grow p-5 md:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 group-hover:bg-zinc-900/80 transition-all duration-200 block relative overflow-hidden"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              
                              {/* Left Info */}
                              <div className="space-y-2 flex-grow">
                                <div className="flex items-center gap-3">
                                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-sm ${
                                    ms.status === 'Winner 🏆' ? 'bg-amber-950/60 border-amber-800/60 text-amber-300' :
                                    ms.status === 'Completed' ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-300' :
                                    'bg-zinc-800 border-zinc-700 text-zinc-300'
                                  }`}>
                                    {ms.badge || ms.status}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                                  {ms.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                                  {ms.description}
                                </p>
                              </div>

                              {/* Right Logo Container */}
                              {ms.logoUrl && (
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-950 rounded-xl border border-zinc-800 p-3 flex items-center justify-center shrink-0 group-hover:border-zinc-700 transition-colors">
                                  <img 
                                    src={ms.logoUrl} 
                                    alt={ms.title} 
                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200" 
                                  />
                                </div>
                              )}

                            </div>

                            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400 font-medium group-hover:text-zinc-200 transition-colors">
                              <span>View details</span>
                              <span className="group-hover:translate-x-1 transition-transform">↗</span>
                            </div>
                          </a>

                        </motion.div>
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

                     {/* GitHub Stats & Top Languages Side-by-Side */}
                     <div className="w-full max-w-3xl flex flex-col items-center gap-4">
                       <h3 className="text-lg font-semibold text-zinc-300">GitHub Overview & Top Languages</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch justify-items-center">
                         <div className="w-full flex items-center justify-center p-2 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-md">
                           <img 
                             src="https://github-readme-stats.vercel.app/api?username=Aaryanbanskota&show_icons=true&theme=dark&bg_color=09090b&border_color=27272a&text_color=a1a1aa&icon_color=818cf8&title_color=f4f4f5" 
                             alt="GitHub Stats" 
                             className="w-full h-auto max-h-[165px] object-contain rounded-xl"
                           />
                         </div>
                         <div className="w-full flex items-center justify-center p-2 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-md">
                           <img 
                             src="https://github-readme-stats.vercel.app/api/top-langs/?username=Aaryanbanskota&layout=compact&theme=dark&bg_color=09090b&border_color=27272a&text_color=a1a1aa&title_color=f4f4f5&hide_progress=false" 
                             alt="Most Used Languages" 
                             className="w-full h-auto max-h-[165px] object-contain rounded-xl"
                           />
                         </div>
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
