import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import details from '@/data/details.json';

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-black dark:text-white text-slate-900 mt-6 mb-4 pb-3 border-b dark:border-zinc-800 border-slate-200 flex items-center gap-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-bold dark:text-zinc-100 text-slate-800 mt-8 mb-4 pb-2 border-b dark:border-zinc-800/60 border-slate-200 flex items-center gap-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold dark:text-indigo-300 text-indigo-600 mt-6 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base dark:text-zinc-300 text-slate-700 leading-relaxed my-4 font-normal">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside space-y-2.5 my-4 pl-6 dark:text-zinc-300 text-slate-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside space-y-2.5 my-4 pl-6 dark:text-zinc-300 text-slate-700">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 leading-relaxed dark:text-zinc-300 text-slate-700">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 dark:bg-indigo-950/30 bg-indigo-50 px-5 py-4 my-6 rounded-r-xl dark:text-indigo-200 text-indigo-900 italic font-medium border-y border-r dark:border-indigo-500/20 border-indigo-200 shadow-sm">
      {children}
    </blockquote>
  ),
  code: ({ inline, children }) => {
    if (inline) {
      return (
        <code className="px-2 py-0.5 rounded dark:bg-zinc-800 bg-slate-100 dark:text-indigo-300 text-indigo-700 text-sm font-mono border dark:border-zinc-700/60 border-slate-200">
          {children}
        </code>
      );
    }
    return (
      <code className="block p-4 rounded-xl dark:bg-zinc-950 bg-slate-900 dark:text-emerald-400 text-emerald-300 font-mono text-sm overflow-x-auto my-4 border dark:border-zinc-800 border-slate-800 shadow-inner">
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
    <hr className="my-8 border-t dark:border-zinc-800 border-slate-200" />
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="dark:text-indigo-400 text-indigo-600 hover:underline font-medium transition-colors">
      {children}
    </a>
  ),
};

export default function BlogDetail() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const blog = details.blogs.find(b => b.id === blogId || b.slug === blogId);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!blog) {
    return (
      <div className="min-h-screen p-10 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-3xl font-bold dark:text-zinc-100 text-slate-900">Article Not Found</h2>
        <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">← Back to Articles</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-10 pb-36 max-w-4xl mx-auto space-y-8">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 hover:dark:border-zinc-700 hover:border-slate-300 dark:text-zinc-300 text-slate-700 hover:dark:text-white hover:text-slate-900 transition-all text-sm font-medium shadow-xs group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Articles
        </button>

        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-indigo-600/20 bg-indigo-50 border dark:border-indigo-500/40 border-indigo-200 hover:dark:bg-indigo-600/30 hover:bg-indigo-100 dark:text-indigo-300 text-indigo-700 transition-all text-xs sm:text-sm font-semibold shadow-xs"
        >
          <span>{copied ? 'Link Copied! 📋' : 'Share Article 🔗'}</span>
        </button>
      </div>

      {/* Article Cover Banner */}
      <div className="rounded-3xl overflow-hidden border dark:border-zinc-800 border-slate-200 dark:bg-zinc-900 bg-white shadow-xl relative">
        <img src={blog.coverUrl} alt={blog.title} className="w-full h-auto max-h-96 object-cover" />
        
        <div className="p-6 md:p-8 dark:bg-zinc-950/95 bg-white/95 border-t dark:border-zinc-800/80 border-slate-200 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
              {blog.category}
            </span>
            <span className="dark:text-zinc-400 text-slate-500">{blog.date}</span>
            <span className="dark:text-zinc-400 text-slate-500">• {blog.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black dark:text-white text-slate-900 leading-tight">
            {blog.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2 border-t dark:border-zinc-800 border-slate-200">
            <img 
              src={details.profile.avatarUrl} 
              alt={details.profile.name} 
              className="w-10 h-10 rounded-full object-cover border dark:border-zinc-700 border-slate-300"
            />
            <div>
              <h4 className="text-sm font-bold dark:text-zinc-200 text-slate-900">{details.profile.name}</h4>
              <p className="text-xs dark:text-zinc-400 text-slate-500 font-light">Software Engineer & Tech Creator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Markdown Body */}
      <div className="p-6 md:p-10 rounded-3xl dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/80 border-slate-200 shadow-md">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
          components={markdownComponents}
        >
          {blog.content}
        </ReactMarkdown>
      </div>

    </div>
  );
}
