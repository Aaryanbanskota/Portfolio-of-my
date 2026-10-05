import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard } from '@/components/layout/AnimatedCard';
import blogs from '@/data/blogs.json';

export default function Blog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'readTime' | 'views'
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

  // Extract all categories with count
  const categoryCounts = useMemo(() => {
    const counts = { All: blogs.length, Bookmarks: bookmarks.length };
    blogs.forEach(b => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, [bookmarks]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    blogs.forEach(b => b.tags?.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, []);

  // Filter & Search Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      // Bookmark filter
      if (selectedCategory === 'Bookmarks') {
        if (!bookmarks.includes(blog.id)) return false;
      } else if (selectedCategory !== 'All' && blog.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !blog.tags?.includes(selectedTag)) {
        return false;
      }

      // Deep text search
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
      if (sortBy === 'views') return parseFloat(b.views) - parseFloat(a.views);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedTag, sortBy, bookmarks]);

  // Featured article (first featured or first blog when no search/tag filter)
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
    <div className="min-h-screen p-4 sm:p-8 md:p-10 pb-36 max-w-6xl mx-auto space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase"
        >
          ✨ Technical Writings & Architecture Insights
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold dark:text-zinc-100 text-slate-900 tracking-tight">
          Articles & Publications
        </h1>
        <p className="dark:text-zinc-400 text-slate-600 text-base sm:text-lg font-light leading-relaxed">
          Deep dives into software engineering, low-level microprocessors, offline-first system design, and hackathon retrospectives.
        </p>
      </div>

      {/* Featured Hero Article */}
      {featuredArticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(`/blog/${featuredArticle.id}`)}
          className="relative group cursor-pointer overflow-hidden rounded-3xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 shadow-2xl hover:border-indigo-500/50 transition-all duration-300 grid grid-cols-1 md:grid-cols-12"
        >
          <div className="md:col-span-7 h-64 md:h-full relative overflow-hidden dark:bg-zinc-950 bg-slate-100">
            <img 
              src={featuredArticle.coverUrl} 
              alt={featuredArticle.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r dark:from-zinc-900 via-transparent to-transparent opacity-90" />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-lg">
              ★ Featured Post
            </span>
          </div>

          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-medium dark:text-zinc-400 text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full dark:bg-zinc-800 bg-slate-100 dark:text-indigo-300 text-indigo-700 font-semibold border dark:border-zinc-700 border-slate-200">
                  {featuredArticle.category}
                </span>
                <span>{featuredArticle.date}</span>
                <span>• {featuredArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold dark:text-white text-slate-900 group-hover:text-indigo-500 transition-colors leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="dark:text-zinc-400 text-slate-600 text-sm font-light leading-relaxed line-clamp-3">
                {featuredArticle.summary}
              </p>
            </div>

            <div className="pt-4 border-t dark:border-zinc-800 border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <span>Read Featured Article</span>
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
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
                {bookmarks.includes(featuredArticle.id) ? '★' : '☆'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Control Toolbar: Categories, Tags, Search & Sorting */}
      <div className="space-y-4">
        
        {/* Row 1: Search & Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          
          {/* Advanced Search Input */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title, topic, content or #tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-9 pr-8 rounded-2xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 text-xs sm:text-sm dark:text-zinc-100 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm transition-all"
            />
            <span className="absolute left-3 top-3 text-xs text-slate-400">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs dark:text-zinc-400 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown & Quick Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs dark:text-zinc-400 text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 text-xs font-semibold dark:text-zinc-200 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="readTime">Shortest Read</option>
                <option value="views">Most Popular</option>
              </select>
            </div>

            {(selectedTag || searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag(null);
                }}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>

        </div>

        {/* Row 2: Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {Object.keys(categoryCounts).map((cat) => {
            const count = categoryCounts[cat];
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTag(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-slate-200 dark:text-zinc-300 text-slate-700 hover:border-indigo-400'
                }`}
              >
                <span>{cat === 'Bookmarks' ? '🔖 Bookmarks' : cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'dark:bg-zinc-800 bg-slate-100 text-slate-500 dark:text-zinc-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Tag Selector Cloud */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-medium dark:text-zinc-500 text-slate-400 mr-1">Tags:</span>
            {allTags.map((tag) => {
              const isTagSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isTagSelected ? null : tag)}
                  className={`text-[11px] font-medium px-2.5 py-0.5 rounded-lg border transition-all ${
                    isTagSelected
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-600 dark:text-indigo-300 font-bold'
                      : 'dark:bg-zinc-900/60 bg-slate-50 border-slate-200 dark:border-zinc-800/80 dark:text-zinc-400 text-slate-600 hover:border-indigo-400'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Articles Grid Section */}
      <AnimatePresence mode="wait">
        {regularBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 dark:bg-zinc-900/40 bg-slate-50 rounded-3xl border border-dashed dark:border-zinc-800 border-slate-200 space-y-3"
          >
            <div className="text-3xl">🔍</div>
            <h3 className="text-lg font-bold dark:text-zinc-200 text-slate-800">No matching articles found</h3>
            <p className="text-xs dark:text-zinc-400 text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keyword or clearing tag/category filters to see all available posts.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag(null);
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md hover:bg-indigo-700 transition-colors"
            >
              Clear All Filters
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

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => toggleBookmark(e, blog.id)}
                      className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-all ${
                        isBookmarked
                          ? 'bg-amber-500/80 border-amber-400 text-white shadow-lg'
                          : 'bg-black/40 border-white/20 text-white/80 hover:bg-black/70 hover:text-amber-400'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
                    >
                      {isBookmarked ? '★' : '☆'}
                    </button>
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

                      <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Read Full Article ↗</span>
                        {blog.views && <span className="text-[11px] dark:text-zinc-500 text-slate-400 font-normal">👁 {blog.views}</span>}
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
