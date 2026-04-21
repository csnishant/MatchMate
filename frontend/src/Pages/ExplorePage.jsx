import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SearchFilter from "@/components/SearchFilter";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import toast from "react-hot-toast";
import { LayoutGrid, Loader2, Sparkles, SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import PostCard from "@/components/Post/PostCard";
import { getAllPosts } from "../api/postApi";

export default function ExplorePage() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(10);

  // Filter States
  const [filters, setFilters] = useState({
    // Priority: URL Query -> User's Profile City -> Empty String
    search: params.get("search") || user?.city || "",
    gender: "",
    university: "",
    hasRoom: "",
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please login to access Explore page");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        // filters.search ko city query param ki tarah bhejien
        const cityQuery = filters.search ? `?city=${filters.search}` : "";

        const { data } = await getAllPosts(filters.search);

        if (data.success) {
          setPosts(data.posts);
        }
      } catch (err) {
        // Pehli baar bina city ke error handle karne ke liye
      
      } finally {
        setLoading(false);
      }
    };

    // Debouncing use karein ya fir jab search length > 2 ho tabhi call karein
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500); // 500ms delay taaki har character par API hit na ho

    return () => clearTimeout(delayDebounceFn);
  }, [user, filters.search]); // filters.search add kiya yahan

  // Sync URL with Search Input
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (filters.search) query.set("search", filters.search);
    else query.delete("search");
    navigate({ search: query.toString() }, { replace: true });
  }, [filters.search, navigate]);

  // Combined Filtering Logic
  const textFilteredPosts = useSearchFilter(posts, filters.search, [
    "city",
    "area",
    "user.name",
  ]);

  // ExplorePage mein bas "finalFilteredPosts" ki sorting logic check karni hai

  const finalFilteredPosts = textFilteredPosts
    .filter((post) => {
      if (!post.user) return false;
      const genderMatch =
        !filters.gender || post.lookingForGender === filters.gender;
      const uniMatch =
        !filters.university || post.user?.university === filters.university;
      const roomMatch =
        !filters.hasRoom ||
        (filters.hasRoom === "yes" ? post.hasRoom : !post.hasRoom);
      return genderMatch && uniMatch && roomMatch;
    })
    // AGAR backend se matchScore aa raha hai, toh use score ke hisaab se sort karein
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  if (!user) return null;

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
                Explore <Sparkles className="text-yellow-400" size={32} />
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
            universities={Array.from(
              new Set(posts.map((p) => p.user?.university)),
            ).filter(Boolean)}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10">
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
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {!finalFilteredPosts.length && (
              <div className="text-center py-40 text-gray-500 italic">
                No one matches your vibe yet.
              </div>
            )}

            {visiblePosts < finalFilteredPosts.length && (
              <div className="flex justify-center mt-20">
                <button
                  onClick={() => setVisiblePosts((prev) => prev + 10)}
                  className="bg-[#1c1c1e] text-white px-10 py-4 rounded-2xl font-bold border border-white/5 hover:bg-white/10 transition-all">
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
