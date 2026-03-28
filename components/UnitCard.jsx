"use client";
import React from "react";
import Link from "next/link";

export default function UnitCard({
  id,
  propertyName,
  unitNumber,
  rent,
  dueDay,
  status,
  tenant,
}) {
  return (
    <Link
      href={`/dashboard/units/${id}`}
      className="px-6 py-4 bg-gray-200 shadow-md border-gray-100 border hover:bg-gray-200 transition"
    >
      <div className="space-y-3">
        <h1 className="px-4 py-2 text-center border-b border-gray-700">
          Unit Number:{" "}
          <span className="text-gray-950 font-extrabold">{unitNumber}</span>
        </h1>
        <div className="text-gray-700 text-sm">
          <p className="font-semibold">
            Property Name: <span className="font-normal">{propertyName}</span>
          </p>
          <p className="font-semibold">
            Tenant Name: <span className="font-normal">{tenant}</span>
          </p>
          <p className="font-semibold">
            Rent Amount: <span className="font-normal">{rent}</span>
          </p>
          <p className="font-semibold">
            Due Day: <span className="font-normal">{dueDay}</span>
          </p>
          <p className="font-semibold">
            status: <span className="font-normal">{status}</span>
          </p>
        </div>
        <button className="text-lg font-bold text-blue-600 text-center w-full p-2 bg-gray-200 rounded-md">
          View more
        </button>
      </div>
    </Link>
  );
}
