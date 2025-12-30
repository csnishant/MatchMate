import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { POST_API_END_POINT, Request_API_END_POINT } from "@/utils/constant";
import SearchFilter from "@/components/SearchFilter";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import toast from "react-hot-toast";
import { LayoutGrid, SlidersHorizontal, Loader2, Sparkles } from "lucide-react";
import PostCard from "../Post/PostCard";

export default function ExplorePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState({});

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [filterHasRoom, setFilterHasRoom] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [visiblePosts, setVisiblePosts] = useState(10);
  const postsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, reqRes] = await Promise.all([
          axios.get(`${POST_API_END_POINT}/all-posts`),
          axios
            .get(`${Request_API_END_POINT}/requests`, { withCredentials: true })
            .catch(() => ({ data: { requests: [] } })),
        ]);

        setPosts(postsRes.data.posts);

        const statusMap = {};
        reqRes.data.requests.forEach((r) => {
          if (r.receiver?._id) statusMap[r.receiver._id] = r.status;
        });
        setRequestStatus(statusMap);
      } catch (err) {
        console.error("Data Fetching Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (searchInput) query.set("search", searchInput);
    else query.delete("search");
    navigate({ search: query.toString() }, { replace: true });
  }, [searchInput]);

  const filteredPosts = useSearchFilter(posts, searchInput, [
    "city",
    "area",
    "user.name",
  ]);

  const finalFilteredPosts = filteredPosts
    .filter((post) => post.user)
    .filter((post) => {
      const genderMatch = selectedGender
        ? post.lookingForGender === selectedGender
        : true;
      const uniMatch = selectedUniversity
        ? post.user?.university === selectedUniversity
        : true;
      const hasRoomMatch =
        filterHasRoom === "yes" ? post.hasRoom === true : true;
      return genderMatch && uniMatch && hasRoomMatch;
    });

  return (
    <div className="bg-black min-h-screen text-white pb-32">
      {/* 1. iOS STYLE TOP HEADER & FILTERS */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/5 pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">
                Discover
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-3">
                Explore <Sparkles className="text-yellow-400" size={32} />
              </h1>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-2xl flex items-center gap-2 transition-all border ${
                showFilters
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-white border-white/10"
              }`}>
              <SlidersHorizontal size={20} />
              <span className="text-sm font-bold hidden md:inline">
                Filters
              </span>
            </motion.button>
          </div>

          <SearchFilter
            search={searchInput}
            setSearch={setSearchInput}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filterHasRoom={filterHasRoom}
            setFilterHasRoom={setFilterHasRoom}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedUniversity={selectedUniversity}
            setSelectedUniversity={setSelectedUniversity}
            universities={Array.from(
              new Set(posts.map((p) => p.user?.university))
            ).filter(Boolean)}
          />
        </div>
      </header>

      {/* 2. POSTS GRID (Masonry Feel) */}
      <main className="max-w-7xl mx-auto px-6 mt-10" ref={postsRef}>
        <div className="flex items-center gap-2 text-gray-500 mb-6 px-2">
          <LayoutGrid size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">
            {finalFilteredPosts.length} matches found
          </span>
        </div>

        {loading ? (
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
                {finalFilteredPosts.slice(0, visiblePosts).map((post, idx) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}>
                    <PostCard
                      post={post}
                      requestStatus={requestStatus[post.user?._id]}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {!finalFilteredPosts.length && (
              <div className="text-center py-40">
                <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LayoutGrid className="text-gray-600" size={32} />
                </div>
                <h3 className="text-xl font-bold italic text-gray-400">
                  No one matches your vibe yet.
                </h3>
                <p className="text-gray-600 mt-2">
                  Try adjusting your filters.
                </p>
              </div>
            )}

            {/* 3. LOAD MORE (iOS Button Style) */}
            {visiblePosts < finalFilteredPosts.length && (
              <div className="flex justify-center mt-20">
                <button
                  onClick={() => setVisiblePosts((prev) => prev + 10)}
                  className="bg-[#1c1c1e] text-white px-10 py-4 rounded-2xl font-bold border border-white/5 hover:bg-white/10 active:scale-95 transition-all shadow-xl">
                  Load more posts
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
