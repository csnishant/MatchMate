import { Search, Filter } from "lucide-react";

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
  return (
    <>
      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex flex-1 items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search City, Area, Name..."
            className="flex-1 bg-transparent outline-none placeholder-white/70 text-white"
          />
          <Search className="text-white/70" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/20 transition">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Dropdown Filters */}
      {showFilters && (
        <div className="flex gap-4 flex-wrap mb-6">
          <select
            value={filterHasRoom}
            onChange={(e) => setFilterHasRoom(e.target.value)}
            className="bg-white/10 border border-white/30 px-4 py-2 rounded-xl backdrop-blur-md text-white">
            <option value="">All Rooms</option>
            <option value="yes">Has Room</option>
            <option value="no">No Room</option>
          </select>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="bg-white/10 border border-white/30 px-4 py-2 rounded-xl backdrop-blur-md text-white">
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="bg-white/10 border border-white/30 px-4 py-2 rounded-xl backdrop-blur-md text-white">
            <option value="">All Universities</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSelectedGender("");
              setSelectedUniversity("");
              setSearch("");
            }}
            className="border border-white/30 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">
            Reset
          </button>
        </div>
      )}
    </>
  );
}
