import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Hero from "@/components/Hero";



import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import Community from "@/components/Community";


export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#000000] text-black selection:bg-indigo-500/30">
      {/* 1. iOS BLURRED TOP SEARCH BAR */}
      <nav className=" top-0 z-50 backdrop-blur-2xl bg-black/60 border-b border-white/5 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <SearchBar route="all-users" />
        </div>
      </nav>

      {/* 2. DYNAMIC HERO SECTION */}
      <section className="relative pt-10 pb-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/20 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Hero />
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section className="py-24 px-6 bg-[#000000] selection:bg-indigo-500/30">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <header className="mb-20 text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">
                The Problem Solver
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-zinc-100 tracking-tighter uppercase italic leading-none">
                Built for the{" "}
                <span className="text-indigo-500">Right Fit.</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-6">
                Finding a home is a transaction. Finding a roommate is an{" "}
                <span className="text-zinc-200">experience.</span> We make sure
                it's a good one.
              </p>
            </motion.div>
          </header>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Sparkles className="text-yellow-500" size={24} />,
                title: "Smart Habit Filter",
                desc: "Algorithms that prioritize your peace. We match you based on actual living patterns, not just budget.",
                result: "Zero Lifestyle Clashes",
                glow: "group-hover:bg-yellow-500/10",
              },
              {
                icon: <ShieldCheck className="text-blue-500" size={24} />,
                title: "Verified Privacy",
                desc: "Encrypted identity checks and double-blind privacy. Your data is only shared when you say 'Yes'.",
                result: "100% Secure Profiles",
                glow: "group-hover:bg-blue-500/10",
              },
              {
                icon: <MessageCircle className="text-emerald-500" size={24} />,
                title: "Vibe-Check Chat",
                desc: "Built-in icebreakers and lifestyle tags in chat. Know their cleaning schedule before you know their name.",
                result: "Better Pre-move Trust",
                glow: "group-hover:bg-emerald-500/10",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col p-8 rounded-[32px] bg-[#09090b] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
                {/* Subtle Glow Overlay */}
                <div
                  className={`absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-0 transition-opacity duration-500 ${feature.glow}`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-zinc-100 mb-3 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    {feature.desc}
                  </p>

                  {/* Result Tag - The 'Why' */}
                  <div className="mt-auto pt-5 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                      Impact
                    </span>
                    <span className="text-xs font-bold text-zinc-200">
                      {feature.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center">
            <button className="group px-8 py-4 bg-zinc-100 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all flex items-center gap-3 mx-auto shadow-xl shadow-white/5">
              Start Your Search
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. COMMUNITY FEED (The Main Content) */}
      <section className="py-10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter italic">
              The Community
            </h2>
            <div className="h-[1px] flex-grow mx-6 bg-white/10 hidden md:block" />
            <button className="text-indigo-400 text-sm font-semibold flex items-center gap-2 hover:underline">
              View All <ArrowRight size={16} />
            </button>
          </div>

          <Community />
        </div>
      </section>

      <Footer />
    </main>
  );
}

// UI Helper: Feature Card (Bento Style)
function FeatureCard({ icon, title, desc, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-[#1c1c1e] p-8 rounded-[2.5rem] border border-white/5 transition-all duration-300 ${gradient}`}>
      <div className="mb-6 bg-white/5 w-fit p-4 rounded-3xl">{icon}</div>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
