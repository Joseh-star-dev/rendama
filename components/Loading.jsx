"use client";
import React from "react";

export default function Loading({ content }) {
  return (
    <div className="min-h-screen bg-black/10 fixed inset-0 top-0 mx-auto z-60 px-2 flex justify-center items-center">
      <div className="flex flex-col space-y-5 items-center">
        <div className="border-b-2 border-t-2 border-blue-600 w-10 h-10 animate-spin duration-200 rounded-full"></div>
      </div>
    </div>
  );
}
