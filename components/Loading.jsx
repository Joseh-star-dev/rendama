import React from "react";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-black/5  fixed top-0 flex justify-center items-center">
      <div className="flex flex-col space-y-5 items-center">
        <div className="h-15 w-15 border-b-3 border-green-600 rounded-full animate-spin duration-200"></div>
        <p className="animate-bounce duration-100 text-gray-950 font-bold">
          Loading...
        </p>
      </div>
    </div>
  );
}
