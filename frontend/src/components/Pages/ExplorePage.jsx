import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { POST_API_END_POINT, Request_API_END_POINT } from "@/utils/constant";

import SearchFilter from "@/components/SearchFilter";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import toast from "react-hot-toast";
import { ClipboardList } from "lucide-react";
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

  // ✅ Fetch Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${POST_API_END_POINT}/all-posts`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Fetch Posts Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // ✅ Fetch Requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${Request_API_END_POINT}/requests`, {
          withCredentials: true,
        });
        const statusMap = {};
        res.data.requests.forEach((r) => {
          if (r.receiver?._id) {
            statusMap[r.receiver._id] = r.status;
          }
        });
        setRequestStatus(statusMap);
      } catch (err) {
        toast.error("Failed to load request status");
      }
    };
    fetchRequests();
  }, []);

  // ✅ URL Sync for Search Query
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (searchInput) query.set("search", searchInput);
    else query.delete("search");
    navigate({ search: query.toString() }, { replace: true });
  }, [searchInput]);

  // 🔍 Filter Posts
  const filteredPosts = useSearchFilter(posts, searchInput, [
    "city",
    "area",
    "user.name",
  ]);

  const finalFilteredPosts = filteredPosts
    .filter((post) => post.user) // only posts with user
    .filter((post) => {
      const genderMatch = selectedGender
        ? post.lookingForGender === selectedGender
        : true;
      const uniMatch = selectedUniversity
        ? post.user?.university === selectedUniversity
        : true;
      const hasRoomMatch =
        filterHasRoom === "yes" ? post.hasRoom === true : true; // ✅ filter by hasRoom
      return genderMatch && uniMatch && hasRoomMatch;
    });

  return (
    <div className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#6d28d9] min-h-screen p-4 pb-24">
      {/* 🔍 Search Filter */}
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
        ).filter((u) => u)}
      />

      {/* 📝 Posts Section */}
      <div ref={postsRef} className="space-y-10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <ClipboardList /> All Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-white/80">Loading...</p>
          ) : finalFilteredPosts.length ? (
            finalFilteredPosts
              .slice(0, visiblePosts)
              .map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  requestStatus={requestStatus[post.user?._id]}
                />
              ))
          ) : (
            <p className="text-white/80">No posts found</p>
          )}
        </div>
        {visiblePosts < finalFilteredPosts.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setVisiblePosts(visiblePosts + 10)}
              className="border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/10">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
