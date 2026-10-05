import { useNavigate } from 'react-router-dom';
import { AnimatedCard } from '@/components/layout/AnimatedCard';
import details from '@/data/details.json';

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 md:p-10 pb-32 max-w-6xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold dark:text-zinc-100 text-slate-900 tracking-tight">Featured Projects</h1>
        <p className="dark:text-zinc-400 text-slate-600 text-lg max-w-xl mx-auto">
          Explore my open-source applications, tools, and engineering projects.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {details.projects.map((project, idx) => (
          <AnimatedCard 
            key={project.id} 
            startY={40 * (idx + 1)}
            onClick={() => navigate(`/projects/${project.id}`)}
            cardClassName="p-0 overflow-hidden flex flex-col group border-zinc-800/80 hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className="h-44 w-full relative overflow-hidden dark:bg-zinc-900 bg-slate-200">
              <img 
                src={project.bannerUrl} 
                alt={project.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t dark:from-zinc-950 from-slate-900/60 via-transparent to-transparent" />
            </div>

            <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold dark:text-zinc-100 text-slate-900 group-hover:text-indigo-500 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full dark:bg-indigo-950 bg-indigo-50 dark:border-indigo-800 border-indigo-200 dark:text-indigo-300 text-indigo-700 font-semibold">
                    {project.license}
                  </span>
                </div>
                <p className="dark:text-zinc-400 text-slate-600 text-sm line-clamp-2 font-light leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-medium px-2 py-0.5 rounded dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 dark:text-zinc-400 text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-indigo-500 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>View Details & Documentation ↗</span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}

