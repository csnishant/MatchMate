import React from "react";
import PostForm from "./PostForm";

export default function CreatePostModal({ isOpen, close }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6 text-white shadow-2xl w-[90%] max-w-2xl relative">
        {/* ❌ Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-4 text-white/70 hover:text-white text-2xl">
          &times;
        </button>

        {/* 🔥 Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          🏠 Create Roommate Post
        </h2>
        <p className="text-center text-white/70 mb-4">
          Share your requirement or offer your room to find the perfect roommate easily.
        </p>

        {/* 🚀 Form */}
        <PostForm close={close} />
      </div>
    </div>
  );
}
