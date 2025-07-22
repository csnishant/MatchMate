export default function PostButton({ open }) {
  return (
    <button
      onClick={open}
      className="
        px-5 py-3 rounded-full
        bg-gradient-to-r from-indigo-500 to-purple-600
        text-white font-semibold shadow-lg
        backdrop-blur-md border border-white/20
        hover:scale-105 hover:shadow-xl
        transition-all duration-300
      ">
      + Create Roommate Post
    </button>
  );
}
