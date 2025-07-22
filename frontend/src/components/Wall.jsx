// MemorialWall.jsx
import React from "react";

const MemorialWall = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-7xl px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Veer Smriti - Memorial Wall
        </h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
          />
        </div>

        <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                      

            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow w-full max-w-sm">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">Hero Name</h2>
                <p className="text-sm text-gray-600">Regiment Name</p>
                <p className="text-xs text-gray-500">Date of Martyrdom</p>
                <blockquote className="mt-2 text-sm italic text-gray-700">
                  "Sample quote from hero."
                </blockquote>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow w-full max-w-sm">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">Hero Name</h2>
                <p className="text-sm text-gray-600">Regiment Name</p>
                <p className="text-xs text-gray-500">Date of Martyrdom</p>
                <blockquote className="mt-2 text-sm italic text-gray-700">
                  "Sample quote from hero."
                </blockquote>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow w-full max-w-sm">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">Hero Name</h2>
                <p className="text-sm text-gray-600">Regiment Name</p>
                <p className="text-xs text-gray-500">Date of Martyrdom</p>
                <blockquote className="mt-2 text-sm italic text-gray-700">
                  "Sample quote from hero."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MemorialWall;
