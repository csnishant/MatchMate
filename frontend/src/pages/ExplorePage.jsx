import React, { useEffect, useState, useMemo } from "react"; // ⚡ FIX 1: Added useMemo import
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SearchFilter from "@/components/SearchFilter";
import toast from "react-hot-toast";
import { LayoutGrid, Loader2, Sparkles, SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import PostCard from "@/components/Post/PostCard";
import { getAllPosts } from "../api/postApi";

export default function ExplorePage() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Cache the URLSearchParams to avoid layout thrashing on fast typing
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const initialSearch = searchParams.get("search") || user?.city || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: initialSearch,
    gender: "",
    university: "",
    hasRoom: "",
  });

  // EFFECT 1: Security Guard (Isolated Authentication Check)
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [user, navigate]);

  // EFFECT 2: Sync URL and Reset Pagination Page when any filter input changes
  // Why: Pinned ONLY to filters object so it doesn't conflict with the async data fetcher
  useEffect(() => {
    if (!user) return;

    // Update browser URL query params dynamically
    const query = new URLSearchParams();
    if (filters.search) query.set("search", filters.search);
    navigate({ search: query.toString() }, { replace: true });

    // ⚡ FIX 2: Reset pagination strictly when filters change, before making the API call
    setPage(1);
  }, [
    filters.search,
    filters.gender,
    filters.university,
    filters.hasRoom,
    navigate,
    user,
  ]);

  // EFFECT 3: Clean Debounced Data Fetcher
  // Why: Separating this from URL Sync prevents duplicate network triggers and infinite loops
  useEffect(() => {
    if (!user || !filters.search) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await getAllPosts(filters, page, 4);

        if (data.success) {
          // ⚡ FIX 3: If it's a fresh search/reset (page 1), replace old array. If page > 1, append for pagination.
          if (page === 1) {
            setPosts(data.posts);
          } else {
            setPosts((prev) => [...prev, ...data.posts]);
          }
          setHasMore(data.hasMore);
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    // Wait 500ms to ensure the user finished typing before wasting backend bandwidth
    const timer = setTimeout(fetchPosts, 500);

    // Cleanup: Destroys pending timeout if another keystroke happens before 500ms
    return () => clearTimeout(timer);
  }, [user, filters, page]); // Only depends on structural data states

  // Cache unique list of universities from current posts to prevent redundant child renders
  const memoizedUniversities = useMemo(() => {
    return Array.from(new Set(posts.map((p) => p.user?.university))).filter(
      Boolean,
    );
  }, [posts]);

  return (
    <div className="bg-black min-h-screen text-white pb-32">
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/5 pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">
                Discover
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-3">
                Explore
                <Sparkles className="text-yellow-400" size={32} />
              </h1>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-2xl flex items-center gap-2 border transition-all ${
                showFilters
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-white border-white/10"
              }`}>
              <SlidersHorizontal size={20} />
              <span className="text-sm font-bold hidden md:inline">
                Filters
              </span>
            </button>
          </div>

          <SearchFilter
            filters={filters}
            setFilters={setFilters}
            showFilters={showFilters}
            universities={memoizedUniversities}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex items-center gap-2 text-gray-500 mb-6 px-2">
          <LayoutGrid size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">
            {posts.length} matches found
          </span>
        </div>

        {loading && page === 1 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
            <p className="text-gray-500 font-medium animate-pulse">
              Hunting for the best vibes...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {posts.map((post, idx) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}>
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {!posts.length && (
              <div className="text-center py-40 text-gray-500 italic">
                No one matches your vibe yet.
              </div>
            )}

            {hasMore && (
              <div className="flex justify-center mt-20">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="bg-[#1c1c1e] text-white px-10 py-4 rounded-2xl font-bold border border-white/5 hover:bg-white/10 transition-all">
                  Load More Posts
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
