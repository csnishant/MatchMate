import { Search, RotateCcw, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchFilter({
  filters,
  setFilters,
  showFilters,
  universities,
}) {
  const selectClass =
    "appearance-none bg-[#1c1c1e] border border-white/5 px-5 py-3 rounded-2xl text-sm font-medium text-zinc-300 outline-none focus:border-indigo-500/50 transition-all cursor-pointer min-w-[140px]";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: "", gender: "", university: "", hasRoom: "" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Enter city to find matches (e.g. Bhopal, Indore).."
            className="w-full bg-[#1c1c1e] border border-white/5 rounded-[22px] pl-12 pr-4 py-4 text-sm text-white outline-none focus:border-indigo-500/30 focus:bg-[#242427] transition-all"
          />
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-6 bg-[#09090b] border border-white/5 rounded-[32px] flex flex-wrap gap-4 items-center">
            <FilterItem label="Status">
              <select
                name="hasRoom"
                value={filters.hasRoom}
                onChange={handleChange}
                className={selectClass}>
                <option value="">All Types</option>
                <option value="yes">Has Room</option>
                <option value="no">Needs Room</option>
              </select>
            </FilterItem>

            <FilterItem label="Gender">
              <select
                name="gender"
                value={filters.gender}
                onChange={handleChange}
                className={selectClass}>
                <option value="">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </FilterItem>

            <FilterItem label="University" className="flex-1 min-w-[200px]">
              <select
                name="university"
                value={filters.university}
                onChange={handleChange}
                className={selectClass + " w-full"}>
                <option value="">All Universities</option>
                {universities.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </FilterItem>

            <button
              onClick={resetFilters}
              className="mt-5 p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
              <RotateCcw size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Small helper to keep JSX clean
const FilterItem = ({ label, children, className = "" }) => (
  <div className={`relative flex flex-col gap-1.5 ${className}`}>
    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
      {label}
    </label>
    {children}
  </div>
);
