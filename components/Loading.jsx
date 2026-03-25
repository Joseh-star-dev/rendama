import React from "react";

export default function Loading({ content }) {
  return (
    <div className="w-full min-h-screen bg-black/10 fixed inset-0 top-0 flex justify-center items-center">
      <div className="flex flex-col space-y-5 items-center">
        <div className="h-15 w-15 border-b-3 border-r-3 border-blue-600 rounded-full animate-spin duration-200"></div>
        <p className="animate-bounce duration-100 text-gray-950 font-bold">
          {content}
        </p>
      </div>
    </div>
  );
}
