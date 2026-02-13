import { Search, Filter, RotateCcw, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchFilter({
  search,
  setSearch,
  showFilters,
  setShowFilters,
  filterHasRoom,
  setFilterHasRoom,
  selectedGender,
  setSelectedGender,
  selectedUniversity,
  setSelectedUniversity,
  universities,
}) {
  const selectClass =
    "appearance-none bg-[#1c1c1e] border border-white/5 px-5 py-3 rounded-2xl text-sm font-medium text-zinc-300 outline-none focus:border-indigo-500/50 transition-all cursor-pointer min-w-[140px]";

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      {/* Search Bar Row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city, area, or name..."
            className="w-full bg-[#1c1c1e] border border-white/5 rounded-[22px] pl-12 pr-4 py-4 text-sm text-white outline-none focus:border-indigo-500/30 focus:bg-[#242427] transition-all placeholder:text-zinc-600"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-4 rounded-[22px] border transition-all flex items-center gap-2 ${
            showFilters
              ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
              : "bg-[#1c1c1e] border-white/5 text-zinc-400 hover:border-white/10"
          }`}>
          <Filter size={20} />
          <span className="hidden md:block text-xs font-black uppercase tracking-widest">
            Filters
          </span>
        </button>
      </div>

      {/* Animated Dropdown Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-6 bg-[#09090b] border border-white/5 rounded-[32px] flex flex-wrap gap-4 items-center">
            {/* Room Filter */}
            <div className="relative flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Status
              </label>
              <select
                value={filterHasRoom}
                onChange={(e) => setFilterHasRoom(e.target.value)}
                className={selectClass}>
                <option value="">All Types</option>
                <option value="yes">Has Room</option>
                <option value="no">Needs Room</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="relative flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                Gender
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className={selectClass}>
                <option value="">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* University Filter */}
            <div className="relative flex flex-col gap-1.5 flex-1 min-w-[200px]">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                University
              </label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className={selectClass}>
                <option value="">All Universities</option>
                {universities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSelectedGender("");
                setSelectedUniversity("");
                setFilterHasRoom("");
                setSearch("");
              }}
              className="mt-5 p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
              title="Reset All">
              <RotateCcw size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
