import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedCard } from '@/components/layout/AnimatedCard';
import details from '@/data/details.json';

export default function Blog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(details.blogs.map(b => b.category))];

  const filteredBlogs = details.blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-10 pb-36 max-w-6xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold dark:text-zinc-100 text-slate-900 tracking-tight">
          Articles & Insights
        </h1>
        <p className="dark:text-zinc-400 text-slate-600 text-base sm:text-lg font-light">
          Thoughts on software engineering, low-level architecture, offline-first systems, and technical retrospectives.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 dark:text-zinc-300 text-slate-700 hover:border-indigo-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-9 rounded-xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 text-xs sm:text-sm dark:text-zinc-100 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
          />
          <span className="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>
        </div>

      </div>

      {/* Articles Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 dark:text-zinc-500 text-slate-400 font-medium">
          No articles found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredBlogs.map((blog, idx) => (
            <AnimatedCard
              key={blog.id}
              startY={30 * (idx + 1)}
              onClick={() => navigate(`/blog/${blog.id}`)}
              cardClassName="p-0 overflow-hidden flex flex-col group border-zinc-800/80 hover:border-indigo-500/50 transition-all duration-300"
            >
              {/* Cover Image Header */}
              <div className="h-48 w-full relative overflow-hidden dark:bg-zinc-900 bg-slate-200">
                <img
                  src={blog.coverUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-zinc-950 from-slate-900/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {blog.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs dark:text-zinc-400 text-slate-500 font-medium">
                    <span>{blog.date}</span>
                    <span>• {blog.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold dark:text-zinc-100 text-slate-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="dark:text-zinc-400 text-slate-600 text-sm line-clamp-3 font-light leading-relaxed">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-2 space-y-3 border-t dark:border-zinc-800/60 border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 dark:text-zinc-400 text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Read Full Article ↗</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}

    </div>
  );
}
