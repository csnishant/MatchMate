import React from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <div className="relative">
      {/* Diagonal Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#6d28d9] clip-diagonal-footer z-[-1]"></div>

      <div className="max-w-7xl mx-auto px-6 py-10 text-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left */}
          <div>
            <h1 className="text-2xl font-bold text-white">MatchMate</h1>
            <p className="mt-3 text-sm">
              Find your perfect roommate with MatchMate. The right roommate
              makes every place feel like home.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#">
                <Linkedin className="w-5 h-5 hover:text-blue-300" />
              </a>
              <a href="#">
                <Instagram className="w-5 h-5 hover:text-pink-400" />
              </a>
              <a href="#">
                <Twitter className="w-5 h-5 hover:text-sky-400" />
              </a>
            </div>
          </div>

          {/* Middle */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <a href="#" className="hover:text-white">
              About
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              FAQs
            </a>
          </div>

          {/* Right */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Get the App
            </h2>
            <div className="flex flex-col gap-3">
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_App_Store_logo.svg"
                  alt="App Store"
                  className="w-32 hover:opacity-80"
                />
              </a>
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Play Store"
                  className="w-36 hover:opacity-80"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/30 mt-8 pt-4 text-sm text-center">
          © {new Date().getFullYear()} MatchMate. All rights reserved.
        </div>
      </div>
    </div>
  );
}
