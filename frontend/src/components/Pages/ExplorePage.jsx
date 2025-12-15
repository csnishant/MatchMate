import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  USER_API_END_POINT,
  POST_API_END_POINT,
  Request_API_END_POINT,
} from "@/utils/constant";

import SearchFilter from "@/components/SearchFilter";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import toast from "react-hot-toast";
import { Home, Users, ClipboardList } from "lucide-react";
import UserCard from "../Users/UserCard";
import PostCard from "../Post/PostCard";

export default function ExplorePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState({});

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [visibleListings, setVisibleListings] = useState(10);
  const [visibleRooms, setVisibleRooms] = useState(10);
  const [visiblePosts, setVisiblePosts] = useState(10);

  const listingsRef = useRef(null);
  const postsRef = useRef(null);
  const roomsRef = useRef(null);

  // ✅ Fetch Users & Posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postRes] = await Promise.all([
          axios.get(`${USER_API_END_POINT}/all-users`, {
            withCredentials: true,
          }),
          axios.get(`${POST_API_END_POINT}/all-posts`),
        ]);
        setUsers(userRes.data.users);
        setPosts(postRes.data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
          statusMap[r.receiver._id] = r.status;
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
    if (searchInput) {
      query.set("search", searchInput);
    } else {
      query.delete("search");
    }
    navigate({ search: query.toString() }, { replace: true });
    // eslint-disable-next-line
  }, [searchInput]);

  // 🔍 Search & Filter Logic Users
  const filteredUsers = useSearchFilter(users, searchInput, [
    "name",
    "university",
    "course",
    "location",
  ]);
  const finalFilteredUsers = filteredUsers.filter(
    (user) =>
      (selectedGender ? user.gender === selectedGender : true) &&
      (selectedUniversity ? user.university === selectedUniversity : true)
  );

  const haveRoomUsers = finalFilteredUsers.filter(
    (user) => user.haveRoom === true
  );
  const noRoomUsers = finalFilteredUsers.filter(
    (user) => user.haveRoom !== true
  );

  // 🔍 Search & Filter Logic Posts
  const filteredPosts = useSearchFilter(posts, searchInput, [
    "city",
    "area",
    "user.name",
  ]);
  const finalFilteredPosts = filteredPosts.filter(
    (post) =>
      (selectedGender ? post.lookingForGender === selectedGender : true) &&
      (selectedUniversity ? post.user?.university === selectedUniversity : true)
  );

  // 🔥 Handle Scroll
  const handleScroll = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#6d28d9] min-h-screen p-4 pb-24">
        {/* 🔍 Search Filter */}
        <SearchFilter
          search={searchInput}
          setSearch={setSearchInput}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedUniversity={selectedUniversity}
          setSelectedUniversity={setSelectedUniversity}
          universities={Array.from(
            new Set(users.map((u) => u.university))
          ).filter((u) => u)}
        />

        {/* 🔥 Sections */}
        <div className="space-y-10">
          {/* 🏠 All Listings */}
          <div ref={listingsRef}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Home /> All Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loading ? (
                <p className="text-white/80">Loading...</p>
              ) : noRoomUsers.length ? (
                noRoomUsers
                  .slice(0, visibleListings)
                  .map((user) => (
                    <UserCard
                      key={user._id}
                      user={user}
                      requestStatus={requestStatus[user._id]}
                      sendRequest={() => {}}
                    />
                  ))
              ) : (
                <p className="text-white/80">No users found</p>
              )}
            </div>
            {visibleListings < noRoomUsers.length ? (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setVisibleListings(visibleListings + 10)}
                  className="border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/10">
                  Load More
                </button>
              </div>
            ) : (
              noRoomUsers.length > 0 && (
                <p className="text-center text-white/70 mt-2">
                  No more listings
                </p>
              )
            )}
          </div>

          {/* 📝 All Posts */}
          <div ref={postsRef}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ClipboardList /> All Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {finalFilteredPosts.length ? (
                finalFilteredPosts
                  .slice(0, visiblePosts)
                  .map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <p className="text-white/80">No posts found</p>
              )}
            </div>
            {visiblePosts < finalFilteredPosts.length ? (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setVisiblePosts(visiblePosts + 10)}
                  className="border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/10">
                  Load More
                </button>
              </div>
            ) : (
              finalFilteredPosts.length > 0 && (
                <p className="text-center text-white/70 mt-2">No more posts</p>
              )
            )}
          </div>

          {/*  Already Have Room */}
          <div ref={roomsRef}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Users /> Already Have Room
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {haveRoomUsers.length ? (
                haveRoomUsers
                  .slice(0, visibleRooms)
                  .map((user) => (
                    <UserCard
                      key={user._id}
                      user={user}
                      requestStatus={requestStatus[user._id]}
                      sendRequest={() => {}}
                    />
                  ))
              ) : (
                <p className="text-white/80">No users found</p>
              )}
            </div>
            {visibleRooms < haveRoomUsers.length ? (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setVisibleRooms(visibleRooms + 10)}
                  className="border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/10">
                  Load More
                </button>
              </div>
            ) : (
              haveRoomUsers.length > 0 && (
                <p className="text-center text-white/70 mt-2">No more users</p>
              )
            )}
          </div>
        </div>
      </div>

      {/* 🍏 Bottom Navbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-3 flex gap-10 shadow-lg z-50">
        <div
          onClick={() => handleScroll(listingsRef)}
          className="flex flex-col items-center text-white cursor-pointer hover:scale-110 transition">
          <Home size={20} />
          <span className="text-xs mt-1">Listings</span>
        </div>
        <div
          onClick={() => handleScroll(postsRef)}
          className="flex flex-col items-center text-white cursor-pointer hover:scale-110 transition">
          <ClipboardList size={20} />
          <span className="text-xs mt-1">Posts</span>
        </div>
        <div
          onClick={() => handleScroll(roomsRef)}
          className="flex flex-col items-center text-white cursor-pointer hover:scale-110 transition">
          <Users size={20} />
          <span className="text-xs mt-1">Rooms</span>
        </div>
      </div>
    </>
  );
}
