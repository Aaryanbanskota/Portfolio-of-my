import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import details from '@/data/details.json';

import rehypeRaw from 'rehype-raw';

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-black text-white mt-6 mb-4 pb-3 border-b border-zinc-800 flex items-center gap-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-8 mb-4 pb-2 border-b border-zinc-800/60 flex items-center gap-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-indigo-300 mt-6 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base text-zinc-300 leading-relaxed my-4 font-normal">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside space-y-2.5 my-4 pl-6 text-zinc-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside space-y-2.5 my-4 pl-6 text-zinc-300">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 leading-relaxed text-zinc-300">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 bg-indigo-950/30 px-5 py-4 my-6 rounded-r-xl text-indigo-200 italic font-medium border-y border-r border-indigo-500/20 shadow-sm">
      {children}
    </blockquote>
  ),
  code: ({ inline, children }) => {
    if (inline) {
      return (
        <code className="px-2 py-0.5 rounded bg-zinc-800 text-indigo-300 text-sm font-mono border border-zinc-700/60">
          {children}
        </code>
      );
    }
    return (
      <code className="block p-4 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-sm overflow-x-auto my-4 border border-zinc-800 shadow-inner">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="p-0 bg-transparent overflow-x-auto my-4">
      {children}
    </pre>
  ),
  hr: () => (
    <hr className="my-8 border-t border-zinc-800" />
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline font-medium transition-colors">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-zinc-800">
      <table className="w-full text-left border-collapse text-sm text-zinc-300">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-900/90 text-zinc-100 font-semibold border-b border-zinc-800">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="p-3 border-r border-zinc-800 last:border-r-0 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="p-3 border-b border-r border-zinc-800/60 last:border-r-0 bg-zinc-950/40">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="rounded-xl border border-zinc-800 my-4 max-w-full h-auto shadow-md" />
  ),
};

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
    <div className="min-h-screen p-4 md:p-10 pb-36 max-w-6xl mx-auto space-y-8">
      
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

      {/* 2-Column GitHub Style Layout: Left README (70%), Right GitHub Sidebar (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
        
        {/* LEFT COLUMN: README Documentation (7 Columns) */}
        <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 shadow-lg space-y-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <span>📖</span> README.md
            </h3>
          </div>
          
          <div className="text-zinc-300 font-normal leading-relaxed">
            {loading && !activeReadme ? (
              <div className="py-12 text-center text-zinc-500 font-medium">Loading documentation...</div>
            ) : (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {activeReadme}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Official GitHub Sidebar (3 Columns) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* 1. GitHub Releases Box */}
          {project.releases && project.releases.length > 0 && (
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/90 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <span>Releases</span>
                  <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold">
                    {project.releases.length}
                  </span>
                </h4>
              </div>

              {/* Latest Release */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">🏷️</span>
                  <span className="font-bold text-zinc-100 text-sm">{project.releases[0].name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                    Latest
                  </span>
                </div>
                <div className="text-xs text-zinc-500 pl-6">
                  Published {project.releases[0].publishedAt} • {project.releases[0].size}
                </div>
                <div className="pl-6 pt-1">
                  <a 
                    href={project.releases[0].downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline"
                  >
                    <span>📥</span> Download {project.releases[0].fileName}
                  </a>
                </div>
              </div>

              {/* Other Releases List */}
              {project.releases.length > 1 && (
                <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                  <span className="text-xs text-zinc-400 font-medium">Previous Releases:</span>
                  <div className="space-y-2">
                    {project.releases.slice(1).map((rel, rIdx) => (
                      <div key={rIdx} className="flex items-center justify-between text-xs pl-2">
                        <span className="text-zinc-300 font-medium">{rel.name}</span>
                        <a 
                          href={rel.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:underline text-[11px]"
                        >
                          Download APK ↗
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. Contributors Box */}
          {project.contributors && project.contributors.length > 0 && (
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/90 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <span>Contributors</span>
                  <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold">
                    {project.contributors.length}
                  </span>
                </h4>
              </div>

              <div className="space-y-3">
                {project.contributors.map((contrib, cIdx) => (
                  <a 
                    key={cIdx} 
                    href={contrib.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-indigo-500/50 transition-all group"
                  >
                    <img src={contrib.avatar} alt={contrib.name} className="w-8 h-8 rounded-full border border-zinc-700 group-hover:border-indigo-500" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors">{contrib.name}</span>
                      <span className="text-xs text-zinc-500">{contrib.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 3. Languages Breakdown Box */}
          {project.languages && project.languages.length > 0 && (
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/90 shadow-lg space-y-4">
              <div className="border-b border-zinc-800 pb-3">
                <h4 className="text-base font-bold text-zinc-100">Languages</h4>
              </div>

              {/* Progress Color Bar */}
              <div className="w-full h-2.5 rounded-full bg-zinc-800 flex overflow-hidden">
                {project.languages.map((lang, lIdx) => (
                  <div 
                    key={lIdx} 
                    style={{ width: lang.percentage, backgroundColor: lang.color }} 
                    className="h-full"
                    title={`${lang.name}: ${lang.percentage}`}
                  />
                ))}
              </div>

              {/* Language Percentage Legend */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                {project.languages.map((lang, lIdx) => (
                  <div key={lIdx} className="flex items-center gap-2 text-zinc-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="font-medium text-zinc-200">{lang.name}</span>
                    <span className="text-zinc-500 text-[11px]">{lang.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
