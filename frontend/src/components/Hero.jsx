import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import img from "@/assets/hero.png";

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-20 px-4 sm:px-6 py-12 md:py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -bottom-40 left-0 w-full h-[300px] bg-gradient-to-b from-purple-700 via-pink-600 to-blue-400 opacity-30 blur-sm -z-10" />

      {/* Text Content */}
      <div
        className={`md:w-1/2 text-left transform transition-all duration-700 ease-out ${
          animate ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        }`}>
        <div className="text-xs sm:text-sm font-semibold bg-black bg-opacity-30 w-max px-3 py-1 rounded mb-3">
          Preview
        </div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight 
    text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-500">
          Find Your <br /> Perfect Roommate
        </h1>

        <p className="mt-4 text-sm sm:text-base max-w-md text-gray-100">
          Discover compatible roommates based on your lifestyle, habits, and
          preferences with MatchMate.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-full shadow hover:bg-purple-100 transition">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-purple-600">
            Learn More
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div
        className={`md:w-1/2 transform transition-all duration-700 ease-out ${
          animate ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}>
        <img
          src={img}
          alt="iPhone Mockup"
          className="w-[250px] sm:w-[320px] md:w-[400px] lg:w-[450px] animate-bounce"
          style={{ animationDuration: "6s" }} // Slow bounce
        />
      </div>
    </section>
  );
}
