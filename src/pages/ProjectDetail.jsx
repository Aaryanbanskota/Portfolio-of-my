import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import details from '@/data/details.json';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [readmeContent, setReadmeContent] = useState('');
  const [loading, setLoading] = useState(true);

  const project = details.projects.find(p => p.id === projectId);

  useEffect(() => {
    if (!project?.rawReadmeUrl || project?.customReadme) return;

    let isMounted = true;
    const fetchReadme = async () => {
      try {
        const res = await fetch(project.rawReadmeUrl);
        const text = await res.text();
        if (isMounted) {
          setReadmeContent(text);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setReadmeContent('Failed to load README documentation.');
          setLoading(false);
        }
      }
    };

    fetchReadme();
    return () => { isMounted = false; };
  }, [project]);

  const activeReadme = project?.customReadme || readmeContent;

  if (!project) {
    return (
      <div className="min-h-screen p-10 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-3xl font-bold text-zinc-100">Project Not Found</h2>
        <Link to="/projects" className="text-indigo-400 hover:underline">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-10 pb-36 max-w-5xl mx-auto space-y-8">
      
      {/* Top Header Navigation Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-sm font-medium shadow-sm group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
        </button>

        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 hover:text-white transition-all text-xs md:text-sm font-semibold shadow-md"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          View Code on GitHub ↗
        </a>
      </div>

      {/* Main Banner Header */}
      <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl relative">
        <img src={project.bannerUrl} alt={project.title} className="w-full h-auto max-h-96 object-cover" />
        <div className="p-6 md:p-8 bg-zinc-950/90 border-t border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">{project.title}</h1>
            <p className="text-zinc-400 text-base mt-1 font-light">{project.shortDescription}</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-semibold">
              License: {project.license}
            </span>
          </div>
        </div>
      </div>

      {/* GitHub Releases Section */}
      {project.releases && project.releases.length > 0 && (
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/90 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="text-indigo-400">📦</span> Official GitHub Releases & Downloads
            </h3>
            <span className="text-xs text-zinc-500 font-medium">{project.releases.length} Release(s)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.releases.map((rel, rIdx) => (
              <div key={rIdx} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-3 shadow-md hover:border-zinc-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-100 text-sm">{rel.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{rel.tag}</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">Published: {rel.publishedAt} • Size: {rel.size}</div>
                </div>

                <a 
                  href={rel.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                  Download {rel.fileName}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documentation & README Content */}
      <div className="p-6 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-lg space-y-6">
        <h3 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-4">
          📖 Documentation & README
        </h3>
        
        <div className="prose prose-invert max-w-none prose-indigo leading-relaxed text-zinc-300 font-light">
          {loading && !activeReadme ? (
            <div className="py-12 text-center text-zinc-500 font-medium">Loading documentation...</div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {activeReadme}
            </ReactMarkdown>
          )}
        </div>
      </div>

      {/* Contributors & GitHub Graph Footer */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-lg space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Project Contributors</h4>
          <div className="flex flex-wrap gap-4">
            {project.contributors.map((contrib, cIdx) => (
              <a 
                key={cIdx} 
                href={contrib.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500 transition-all text-zinc-200 shadow-sm"
              >
                <img src={contrib.avatar} alt={contrib.name} className="w-8 h-8 rounded-full border border-indigo-500" />
                <span className="text-sm font-medium">{contrib.name}</span>
                <svg className="w-4 h-4 fill-zinc-400" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-zinc-800/80">
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
  );
}
