"use client";
import Link from "next/link";
import React from "react";

export default function PropertyCard({
  property,
  id,
  name,
  owner,
  location,
  description,
  totalUnits,
  createdAt,
  updatedAt,
}) {
  const date = new Date(createdAt);
  return (
    <Link
      href={`/dashboard/properties/${id}`}
      className="p-6 bg-gray-100 space-y-2"
    >
      <div className="space-y-2">
        <h1 className="font-bold text-gray-950 text-xl mb-3 flex flex-col text-center gap-2">
          <span className="p-1.5 bg-blue-700 text-white font-bold rounded-md">
            {name}
          </span>
        </h1>
        <p className="text-gray-900 font-semibold">
          <span className="text-gray-600">Location: </span>
          {location}
        </p>
        <p className="text-gray-900 font-semibold">
          <span className="text-gray-600">Description: </span>
          {description}
        </p>
        <p className="text-gray-900 font-semibold">
          <span className="text-gray-600">Total Units: </span>
          {totalUnits} units
        </p>
        <button className="primary-btn bg-transparent text-blue-800 font-bold border">
          View more
        </button>
      </div>
    </Link>
  );
}
