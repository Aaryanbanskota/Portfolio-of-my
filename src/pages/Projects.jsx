import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard, AnimatedText } from '@/components/layout/AnimatedCard';
import details from '@/data/details.json';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    if (!selectedProject?.rawReadmeUrl || selectedProject?.customReadme) return;

    let isMounted = true;
    const fetchReadme = async () => {
      try {
        const res = await fetch(selectedProject.rawReadmeUrl);
        const text = await res.text();
        if (isMounted) {
          setReadmeContent(text);
        }
      } catch {
        if (isMounted) {
          setReadmeContent('Failed to load README content.');
        }
      }
    };

    fetchReadme();
    return () => { isMounted = false; };
  }, [selectedProject]);

  const activeReadme = selectedProject?.customReadme || readmeContent;

  return (
    <div className="min-h-screen p-6 md:p-10 pb-32 max-w-6xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">Featured Projects</h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Explore my open-source applications, tools, and engineering projects.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {details.projects.map((project, idx) => (
          <AnimatedCard 
            key={project.id} 
            startY={40 * (idx + 1)}
            onClick={() => setSelectedProject(project)}
            cardClassName="p-0 overflow-hidden flex flex-col group border-zinc-800/80 hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className="h-44 w-full relative overflow-hidden bg-zinc-900">
              <img 
                src={project.bannerUrl} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            </div>

            <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-semibold">
                    {project.license}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm line-clamp-2 font-light leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>View Details & Documentation ↗</span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* --- PROJECT VIEWER MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header Bar */}
              <div className="px-8 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-zinc-100">{selectedProject.title}</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-semibold">
                    License: {selectedProject.license}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    View Code on GitHub
                  </a>

                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto flex-grow space-y-10">
                {/* Banner Header */}
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-md">
                  <img src={selectedProject.bannerUrl} alt="Project Banner" className="w-full h-auto max-h-80 object-cover" />
                </div>

                {/* Markdown Readme Section */}
                <div className="prose prose-invert max-w-none prose-indigo leading-relaxed text-zinc-300 font-light">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {activeReadme || 'Loading documentation...'}
                  </ReactMarkdown>
                </div>

                {/* Contributors & License Footer */}
                <div className="pt-8 border-t border-zinc-800/80 space-y-6">
                  {/* Contributors */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Contributors</h4>
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.contributors.map((contrib, cIdx) => (
                        <a 
                          key={cIdx} 
                          href={contrib.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition-all text-zinc-200"
                        >
                          <img src={contrib.avatar} alt={contrib.name} className="w-8 h-8 rounded-full border border-indigo-500" />
                          <span className="text-sm font-medium">{contrib.name}</span>
                          <svg className="w-4 h-4 fill-zinc-400" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* GitHub Contribution Graph */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">GitHub Contributions</h4>
                    <div className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-x-auto flex justify-center">
                      <img 
                        src="https://ghchart.rshah.org/4f46e5/Aaryanbanskota" 
                        alt="GitHub Contribution Graph" 
                        className="min-w-[650px] w-full"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

