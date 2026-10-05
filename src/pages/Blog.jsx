import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard } from '@/components/layout/AnimatedCard';
import blogs from '@/data/blogs.json';

const icons = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  filter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
  ),
  bookmark: (filled) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
  ),
  arrowUpRight: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
  ),
  chevronDown: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  ),
};

export default function Blog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('blog_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const toggleBookmark = (e, blogId) => {
    e.stopPropagation();
    let updated;
    if (bookmarks.includes(blogId)) {
      updated = bookmarks.filter(id => id !== blogId);
    } else {
      updated = [...bookmarks, blogId];
    }
    setBookmarks(updated);
    localStorage.setItem('blog_bookmarks', JSON.stringify(updated));
  };

  const categoryCounts = useMemo(() => {
    const counts = { All: blogs.length, Saved: bookmarks.length };
    blogs.forEach(b => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, [bookmarks]);

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    blogs.forEach(b => b.tags?.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, []);

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) + (selectedTag ? 1 : 0);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      if (selectedCategory === 'Saved') {
        if (!bookmarks.includes(blog.id)) return false;
      } else if (selectedCategory !== 'All' && blog.category !== selectedCategory) {
        return false;
      }

      if (selectedTag && !blog.tags?.includes(selectedTag)) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = blog.title.toLowerCase().includes(q);
        const matchesSummary = blog.summary.toLowerCase().includes(q);
        const matchesCategory = blog.category.toLowerCase().includes(q);
        const matchesTags = blog.tags?.some(t => t.toLowerCase().includes(q));
        const matchesContent = blog.content.toLowerCase().includes(q);

        return matchesTitle || matchesSummary || matchesCategory || matchesTags || matchesContent;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'readTime') return parseInt(a.readTime) - parseInt(b.readTime);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedTag, sortBy, bookmarks]);

  const featuredArticle = useMemo(() => {
    if (searchQuery || selectedTag || selectedCategory !== 'All') return null;
    return blogs.find(b => b.featured) || blogs[0];
  }, [searchQuery, selectedTag, selectedCategory]);

  const regularBlogs = useMemo(() => {
    if (featuredArticle) {
      return filteredBlogs.filter(b => b.id !== featuredArticle.id);
    }
    return filteredBlogs;
  }, [filteredBlogs, featuredArticle]);

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-10 pb-36 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black dark:text-zinc-100 text-slate-900 tracking-tight">
          Blog
        </h1>
        <p className="dark:text-zinc-400 text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
          Writing on software engineering, low-level architecture, offline-first systems, and technical retrospectives.
        </p>
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(`/blog/${featuredArticle.id}`)}
          className="relative group cursor-pointer overflow-hidden rounded-3xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 shadow-xl hover:border-indigo-500/50 transition-all duration-300 grid grid-cols-1 md:grid-cols-12"
        >
          <div className="md:col-span-7 h-64 md:h-full relative overflow-hidden dark:bg-zinc-950 bg-slate-100">
            <img 
              src={featuredArticle.coverUrl} 
              alt={featuredArticle.title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r dark:from-zinc-900 via-transparent to-transparent opacity-90" />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-900/90 text-white text-xs font-semibold border border-zinc-700 backdrop-blur-md">
              Featured
            </span>
          </div>

          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-medium dark:text-zinc-400 text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full dark:bg-zinc-800 bg-slate-100 dark:text-zinc-300 text-slate-700 font-semibold border dark:border-zinc-700 border-slate-200">
                  {featuredArticle.category}
                </span>
                <span>{featuredArticle.date}</span>
                <span>• {featuredArticle.readTime}</span>
              </div>

              <h2 className="text-2xl font-bold dark:text-white text-slate-900 group-hover:text-indigo-500 transition-colors leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="dark:text-zinc-400 text-slate-600 text-sm font-normal leading-relaxed line-clamp-3">
                {featuredArticle.summary}
              </p>
            </div>

            <div className="pt-4 border-t dark:border-zinc-800 border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                <span>Read article</span>
                <span className="group-hover:translate-x-0.5 transition-transform">{icons.arrowUpRight}</span>
              </div>

              <button
                onClick={(e) => toggleBookmark(e, featuredArticle.id)}
                className={`p-2 rounded-xl border transition-all ${
                  bookmarks.includes(featuredArticle.id)
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-500'
                    : 'dark:bg-zinc-800 bg-slate-100 border-slate-200 dark:border-zinc-700 dark:text-zinc-400 text-slate-600 hover:text-amber-500'
                }`}
                title="Bookmark article"
              >
                {icons.bookmark(bookmarks.includes(featuredArticle.id))}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-9 pr-8 rounded-2xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 text-xs sm:text-sm dark:text-zinc-100 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs transition-all"
            />
            <span className="absolute left-3 top-3.5 text-slate-400">{icons.search}</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                {icons.close}
              </button>
            )}
          </div>

          {/* Action Buttons: Filter Toggle & Sort */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                isFilterOpen || activeFilterCount > 0
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'dark:bg-zinc-900 bg-white border-slate-200 dark:border-zinc-800 dark:text-zinc-200 text-slate-700 hover:border-indigo-400'
              }`}
            >
              <span>{icons.filter}</span>
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white text-indigo-700 font-bold">
                  {activeFilterCount}
                </span>
              )}
              <span className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}>
                {icons.chevronDown}
              </span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs dark:text-zinc-400 text-slate-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 rounded-2xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 text-xs font-semibold dark:text-zinc-200 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="readTime">Read Time</option>
              </select>
            </div>

          </div>

        </div>

        {/* Collapsible Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.95, y: -8 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.95, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="transform-gpu origin-top"
            >
              <div className="p-5 rounded-3xl dark:bg-zinc-900 bg-slate-50 border dark:border-zinc-800 border-slate-200 space-y-4 shadow-lg">
                
                {/* Categories */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider dark:text-zinc-400 text-slate-500">Categories</span>
                    {(selectedCategory !== 'All' || selectedTag) && (
                      <button
                        onClick={() => {
                          setSelectedCategory('All');
                          setSelectedTag(null);
                        }}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                      >
                        Reset All
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {Object.keys(categoryCounts).map((cat) => {
                      const count = categoryCounts[cat];
                      const isActive = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border shadow-xs ${
                            isActive
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                              : 'dark:bg-zinc-950 bg-white border-slate-200 dark:border-zinc-800 dark:text-zinc-300 text-slate-700 hover:border-indigo-400'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                            isActive ? 'bg-white/20 text-white' : 'dark:bg-zinc-800 bg-slate-100 text-slate-500 dark:text-zinc-400'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tags */}
                {allTags.length > 0 && (
                  <div className="space-y-2 pt-2 border-t dark:border-zinc-800/80 border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider dark:text-zinc-400 text-slate-500">Tags</span>
                    <div className="flex flex-wrap gap-1.5">
                      {allTags.map((tag) => {
                        const isTagSelected = selectedTag === tag;
                        return (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(isTagSelected ? null : tag)}
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                              isTagSelected
                                ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                                : 'dark:bg-zinc-950 bg-white border-slate-200 dark:border-zinc-800 dark:text-zinc-400 text-slate-600 hover:border-indigo-400'
                            }`}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Articles Grid */}
      <AnimatePresence mode="wait">
        {regularBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 dark:bg-zinc-900/40 bg-slate-50 rounded-3xl border border-dashed dark:border-zinc-800 border-slate-200 space-y-3"
          >
            <h3 className="text-base font-semibold dark:text-zinc-200 text-slate-800">No articles match your criteria</h3>
            <p className="text-xs dark:text-zinc-400 text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing tag and category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag(null);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {regularBlogs.map((blog, idx) => {
              const isBookmarked = bookmarks.includes(blog.id);
              return (
                <AnimatedCard
                  key={blog.id}
                  startY={20 * (idx + 1)}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  cardClassName="p-0 overflow-hidden flex flex-col group border-zinc-800/80 hover:border-indigo-500/50 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  {/* Cover Image */}
                  <div className="h-48 w-full relative overflow-hidden dark:bg-zinc-900 bg-slate-200">
                    <img
                      src={blog.coverUrl}
                      alt={blog.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t dark:from-zinc-950 from-slate-900/70 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {blog.category}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(e, blog.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                        isBookmarked
                          ? 'bg-amber-500/80 border-amber-400 text-white'
                          : 'bg-black/40 border-white/20 text-white/80 hover:bg-black/70 hover:text-amber-400'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
                    >
                      {icons.bookmark(isBookmarked)}
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs dark:text-zinc-400 text-slate-500 font-medium">
                        <span>{blog.date}</span>
                        <span>• {blog.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold dark:text-zinc-100 text-slate-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="dark:text-zinc-400 text-slate-600 text-sm line-clamp-3 font-normal leading-relaxed">
                        {blog.summary}
                      </p>
                    </div>

                    <div className="pt-3 space-y-3 border-t dark:border-zinc-800/60 border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(selectedTag === tag ? null : tag);
                            }}
                            className={`text-[11px] font-medium px-2 py-0.5 rounded cursor-pointer transition-colors ${
                              selectedTag === tag
                                ? 'bg-indigo-600 text-white'
                                : 'dark:bg-zinc-900 bg-slate-100 border dark:border-zinc-800 border-slate-200 dark:text-zinc-400 text-slate-600 hover:border-indigo-400'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                        <span>Read article</span>
                        <span>{icons.arrowUpRight}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
