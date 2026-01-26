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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                MatchMate?
              </span>
            </h2>
            <p className="text-gray-400 mt-4 text-lg">
              Finding a home is hard. Finding the right human is harder.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="text-yellow-400" size={32} />}
              title="Smart Matching"
              desc="Our AI filters roommates based on sleep cycles, food habits, and cleaning standards."
              gradient="hover:border-yellow-500/30"
            />
            <FeatureCard
              icon={<ShieldCheck className="text-blue-400" size={32} />}
              title="Secure Profiles"
              desc="Every profile is verified. Your privacy is our priority, always."
              gradient="hover:border-blue-500/30"
            />
            <FeatureCard
              icon={<MessageCircle className="text-green-400" size={32} />}
              title="Direct Chat"
              desc="Talk before you meet. Build trust through our end-to-end secure messaging."
              gradient="hover:border-green-500/30"
            />
          </div>
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

          <Community/>
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
