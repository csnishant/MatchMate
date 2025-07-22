import React, { useState } from "react";
import Hero from "@/components/Hero";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import Community from "./Community";
import CreatePostModal from "./Post/CreatePostModal";
import PostButton from "./Post/PostButton";
import SearchFilter from "./SearchFilter";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#6d28d9]">
      {/* Search Section */}
      <section className="py-8 md:py-10">
        <SearchBar route="all-users" />
      </section>

      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Hero />
        </div>
      </section>

      {/* Post Button & Modal */}
      <section>
        <div className="p-4 sm:p-6">
          <PostButton open={() => setIsOpen(true)} />
          <CreatePostModal isOpen={isOpen} close={() => setIsOpen(false)} />
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-10">
            Why Choose MatchMate? 🚀
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-[40px] shadow-xl border border-gray-200 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
              <div className="text-5xl mb-3">🧠</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Smart Matching
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Find roommates who actually match your lifestyle and habits.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-[40px] shadow-xl border border-gray-200 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
              <div className="text-5xl mb-3">🔒</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Secure Profiles
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Your data is safe, and you control what to share with others.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-[40px] shadow-xl border border-gray-200 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
              <div className="text-5xl mb-3">💬</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Easy Communication
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Chat directly with potential roommates before deciding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Users / Community Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-10">
            Meet Our Community
          </h2>
          <Community />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
