import { motion } from "framer-motion";
import { MapPin, Banknote, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeHero = ({ post }) => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[80vh] bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-[#1c1c1e] rounded-[50px] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Status Badge */}
        {post && (
          <div
            className={`absolute top-0 right-0 px-6 py-2 rounded-bl-[20px] text-[10px] font-black uppercase tracking-widest ${
              post.isActive
                ? "bg-green-500 text-black"
                : "bg-red-500 text-white"
            }`}>
            {post.isActive ? "Live Post" : "Hidden"}
          </div>
        )}

        {/* Heading */}
        <div className="mb-10">
          <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            Find Your Perfect Roommate
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic leading-tight">
            Smart Living <br /> Starts Here
          </h1>
          <p className="text-gray-400 mt-4 max-w-md font-medium text-sm">
            Discover people, rooms, and shared spaces that match your lifestyle
            and budget.
          </p>
        </div>

        {/* Info Cards */}
        {post && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5">
              <MapPin className="text-indigo-400 mb-2" size={20} />
              <p className="text-sm font-bold">{post.area}</p>
              <p className="text-[11px] text-gray-500 uppercase">{post.city}</p>
            </div>

            <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5">
              <Banknote className="text-green-400 mb-2" size={20} />
              <p className="text-sm font-bold">₹{post.budgetPerPerson}</p>
              <p className="text-[11px] text-gray-500 uppercase">Budget</p>
            </div>

            <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5">
              <Calendar className="text-orange-400 mb-2" size={20} />
              <p className="text-sm font-bold">
                {new Date(post.fromDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
              <p className="text-[11px] text-gray-500 uppercase">
                Available From
              </p>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/all-posts")}
            className="bg-indigo-600 px-8 py-4 rounded-[22px] font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-500/30 flex items-center gap-2">
            Explore Now <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/my-post")}
            className="bg-white text-black px-8 py-4 rounded-[22px] font-black text-sm uppercase tracking-widest">
            Post Requirement
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeHero;
