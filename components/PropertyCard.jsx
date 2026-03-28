"use client";
import { BadgeInfo, BuildingIcon, HouseIcon, MapPin } from "lucide-react";
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
      className="p-6 shadow-lg border rounded-md border-indigo-200 space-y-2"
    >
      <div className="space-y-2 text-sm">
        <h1 className="flex justify-center items-center py-2 px-6 border-b">
          <span>
            <BuildingIcon className="text-indigo-700" />
          </span>
          <span className="p-1.5 text-gray-950 font-bold rounded-md">
            {name}
          </span>
        </h1>
        <p className="text-gray-600 font-semibold flex items-center">
          <MapPin size={18} className="text-blue-600 mr-2" />
          <span className="text-gray-900 mr-2">Location:</span>
          {location}
        </p>
        <p className="text-gray-600 font-semibold flex">
          <BadgeInfo className="text-blue-600 mr-2" size={20} />
          <span className="text-gray-900 mr-1">Description: </span>
          {description}
        </p>
        <p className="text-gray-600 font-semibold flex items-center">
          <HouseIcon className="text-blue-900 mr-2" size={20} />
          <span className="text-gray-900 mr-1">Total Units: </span>
          {totalUnits} units
        </p>
        <button className="primary-btn bg-transparent text-blue-800 font-bold border">
          View more
        </button>
      </div>
    </Link>
  );
}
