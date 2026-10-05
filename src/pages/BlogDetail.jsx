import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import blogs from '@/data/blogs.json';
import details from '@/data/details.json';

const icons = {
  bookmark: (filled) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
  ),
  share: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
};

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
    <blockquote className="border-l-4 border-indigo-500 dark:bg-indigo-950/30 bg-indigo-50 px-5 py-4 my-6 rounded-r-xl dark:text-indigo-200 text-indigo-900 italic font-medium border-y border-r dark:border-indigo-500/20 border-indigo-200 shadow-xs">
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const blog = blogs.find(b => b.id === blogId || b.slug === blogId);

  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('blog_bookmarks') || '[]');
      return blog ? saved.includes(blog.id) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleBookmark = () => {
    if (!blog) return;
    try {
      const saved = JSON.parse(localStorage.getItem('blog_bookmarks') || '[]');
      let updated;
      if (saved.includes(blog.id)) {
        updated = saved.filter(id => id !== blog.id);
        setIsBookmarked(false);
      } else {
        updated = [...saved, blog.id];
        setIsBookmarked(true);
      }
      localStorage.setItem('blog_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.summary,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedArticles = blog
    ? blogs.filter(b => b.id !== blog.id && (b.category === blog.category || b.tags?.some(t => blog.tags?.includes(t)))).slice(0, 2)
    : [];

  if (!blog) {
    return (
      <div className="min-h-screen p-10 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-3xl font-bold dark:text-zinc-100 text-slate-900">Article Not Found</h2>
        <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">← Back to Articles</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-10 pb-36 max-w-4xl mx-auto space-y-8 relative">
      
      {/* Scroll Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-indigo-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 hover:dark:border-zinc-700 hover:border-slate-300 dark:text-zinc-300 text-slate-700 hover:dark:text-white hover:text-slate-900 transition-all text-sm font-medium shadow-xs group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Blog
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleBookmark}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all shadow-xs ${
              isBookmarked
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-500'
                : 'dark:bg-zinc-900 bg-white border-slate-200 dark:border-zinc-800 dark:text-zinc-300 text-slate-700 hover:border-amber-400'
            }`}
          >
            {icons.bookmark(isBookmarked)}
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 dark:text-zinc-300 text-slate-700 hover:dark:border-zinc-700 transition-all text-xs sm:text-sm font-medium shadow-xs"
          >
            {copied ? icons.check : icons.share}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Cover Header */}
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

          <div className="flex items-center gap-3 pt-2 border-t dark:border-zinc-800 border-slate-200">
            <img 
              src={details.profile.avatarUrl} 
              alt={details.profile.name} 
              className="w-10 h-10 rounded-full object-cover border dark:border-zinc-700 border-slate-300"
            />
            <div>
              <h4 className="text-sm font-bold dark:text-zinc-200 text-slate-900">{details.profile.name}</h4>
              <p className="text-xs dark:text-zinc-400 text-slate-500 font-normal">Software Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="p-6 md:p-10 rounded-3xl dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/80 border-slate-200 shadow-md">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
          components={markdownComponents}
        >
          {blog.content}
        </ReactMarkdown>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold dark:text-zinc-100 text-slate-900">More Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigate(`/blog/${rel.id}`)}
                className="p-5 rounded-2xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 hover:border-indigo-500 cursor-pointer transition-all space-y-2 group shadow-xs"
              >
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {rel.category}
                </span>
                <h4 className="text-base font-bold dark:text-zinc-100 text-slate-900 group-hover:text-indigo-500 transition-colors line-clamp-1">
                  {rel.title}
                </h4>
                <p className="text-xs dark:text-zinc-400 text-slate-600 line-clamp-2 font-normal">
                  {rel.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
