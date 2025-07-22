// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import UserCard from "./UserCard";
// import { Request_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
// import toast from "react-hot-toast";
// import { useLocation } from "react-router-dom";
// import { useSearchFilter } from "@/hooks/useSearchFilter";
// import {
//   Search,
//   Filter,
//   Home,
//   Users,
//   ClipboardList,
//   DoorOpen,
// } from "lucide-react";

// export default function AllUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [requestStatus, setRequestStatus] = useState({});
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedUniversity, setSelectedUniversity] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [showFilters, setShowFilters] = useState(false);

//   // Pagination states
//   const [visibleListings, setVisibleListings] = useState(10);
//   const [visibleRooms, setVisibleRooms] = useState(10);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const urlSearch = queryParams.get("search") || "";

//   const listingsRef = useRef(null);
//   const postsRef = useRef(null);
//   const roomsRef = useRef(null);

//   useEffect(() => {
//     setSearchInput(urlSearch);
//   }, [urlSearch]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/all-users`, {
//         withCredentials: true,
//       });
//       setUsers(res.data.users);
//     } catch (err) {
//       console.error("Fetch Users Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await axios.get(`${Request_API_END_POINT}/requests`, {
//           withCredentials: true,
//         });
//         const statusMap = {};
//         res.data.requests.forEach((r) => {
//           statusMap[r.receiver._id] = r.status;
//         });
//         setRequestStatus(statusMap);
//       } catch (err) {
//         toast.error("Failed to load request status");
//       }
//     };
//     fetchRequests();
//   }, []);

//   const sendRequest = async (receiverId) => {
//     try {
//       const res = await axios.post(
//         `${Request_API_END_POINT}/send`,
//         { receiverId },
//         { withCredentials: true }
//       );
//       setRequestStatus((prev) => ({ ...prev, [receiverId]: "pending" }));
//       toast.success(res.data.message || "Request Sent");
//     } catch (err) {
//       const message = err.response?.data?.message;
//       if (message) {
//         toast.error(message);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   // 🔍 Filter Logic
//   const filteredBySearch = useSearchFilter(users, searchInput, [
//     "name",
//     "university",
//     "course",
//     "location",
//   ]);

//   const finalFiltered = filteredBySearch.filter((user) => {
//     return (
//       (selectedGender ? user.gender === selectedGender : true) &&
//       (selectedUniversity ? user.university === selectedUniversity : true)
//     );
//   });

//   const haveRoomUsers = finalFiltered.filter((user) => user.haveRoom === true);
//   const noRoomUsers = finalFiltered.filter((user) => user.haveRoom !== true);

//   const handleScroll = (ref) => {
//     if (ref.current) {
//       ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   return (
//     <>
//       <div className="relative">
//         <div className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#6d28d9] p-4 pb-24">
//           {/* 🔍 Sticky Top Bar */}
//           <div className=" flex flex-wrap items-center gap-4 mb-6">
//             {/* Search Bar */}
//             <div className="flex flex-1 items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
//               <input
//                 type="text"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 placeholder="Search City, Area, Name..."
//                 className="flex-1 bg-transparent outline-none placeholder-white/70 text-white"
//               />
//               <Search className="text-white/70" />
//             </div>

//             {/* Filters Button */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/20 transition">
//               <Filter size={18} />
//               Filters
//             </button>

//             {/* Post Roommate Button */}
//             <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-full text-white shadow-md hover:scale-105 transition">
//               + Post Roommate
//             </button>
//           </div>

//           {/* 🔽 Filters */}
//           {showFilters && (
//             <div className="flex gap-4 flex-wrap mb-6">
//               <select
//                 value={selectedGender}
//                 onChange={(e) => setSelectedGender(e.target.value)}
//                 className="bg-white/10 border border-white/30 px-4 py-2 rounded-xl backdrop-blur-md text-white">
//                 <option value="">All Genders</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>

//               <select
//                 value={selectedUniversity}
//                 onChange={(e) => setSelectedUniversity(e.target.value)}
//                 className="bg-white/10 border border-white/30 px-4 py-2 rounded-xl backdrop-blur-md text-white">
//                 <option value="">All Universities</option>
//                 {Array.from(new Set(users.map((u) => u.university)))
//                   .filter((u) => u)
//                   .map((uni) => (
//                     <option key={uni} value={uni}>
//                       {uni}
//                     </option>
//                   ))}
//               </select>

//               <button
//                 onClick={() => {
//                   setSelectedGender("");
//                   setSelectedUniversity("");
//                   setSearchInput("");
//                 }}
//                 className="border border-white/30 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">
//                 Reset
//               </button>
//             </div>
//           )}

//           {/* 🔥 Sections */}
//           <div className="space-y-10">
//             {/* 🏠 All Listings */}
//             <div ref={listingsRef}>
//               <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-white">
//                 <Home /> All Listings
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {loading ? (
//                   <p className="text-white/80">Loading...</p>
//                 ) : noRoomUsers.length ? (
//                   noRoomUsers
//                     .slice(0, visibleListings)
//                     .map((user) => (
//                       <UserCard
//                         key={user._id}
//                         user={user}
//                         requestStatus={requestStatus[user._id]}
//                         sendRequest={sendRequest}
//                       />
//                     ))
//                 ) : (
//                   <p className="text-white/80">No users found</p>
//                 )}
//               </div>
//               {visibleListings < noRoomUsers.length && (
//                 <div className="flex justify-center mt-4">
//                   <button
//                     onClick={() => setVisibleListings(visibleListings + 10)}
//                     className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/20">
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 📝 All Posts */}
//             <div ref={postsRef}>
//               <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-white">
//                 <ClipboardList /> All Posts
//               </h2>
//               <div className="border border-white/20 rounded-xl p-4 text-center text-white/70">
//                 <p>Post Listings Coming Soon...</p>
//               </div>
//             </div>

//             {/* 🚪 Already Have Room */}
//             <div ref={roomsRef}>
//               <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-white">
//                 <DoorOpen /> Already Have Room
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {haveRoomUsers.length ? (
//                   haveRoomUsers
//                     .slice(0, visibleRooms)
//                     .map((user) => (
//                       <UserCard
//                         key={user._id}
//                         user={user}
//                         requestStatus={requestStatus[user._id]}
//                         sendRequest={sendRequest}
//                       />
//                     ))
//                 ) : (
//                   <p className="text-white/80">No users found</p>
//                 )}
//               </div>
//               {visibleRooms < haveRoomUsers.length && (
//                 <div className="flex justify-center mt-4">
//                   <button
//                     onClick={() => setVisibleRooms(visibleRooms + 10)}
//                     className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/20">
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🍏 iPhone Style Bottom Navbar */}
//       <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-3 flex gap-10 shadow-lg z-50">
//         <div
//           onClick={() => handleScroll(listingsRef)}
//           className="flex flex-col items-center text-white cursor-pointer hover:scale-110 transition">
//           <Home size={20} />
//           <span className="text-xs mt-1">Listings</span>
//         </div>
//         <div
//           onClick={() => handleScroll(postsRef)}
//           className="flex flex-col items-center text-white cursor-pointer hover:scale-110 transition">
//           <Users size={20} />
//           <span className="text-xs mt-1">Roommates</span>
//         </div>
//         <div
//           onClick={() => handleScroll(roomsRef)}
//           className="flex flex-col items-center text-white cursor-pointer hover:scale-110 transition">
//           <ClipboardList size={20} />
//           <span className="text-xs mt-1">Rooms</span>
//         </div>
//       </div>
//     </>
//   );
// }
