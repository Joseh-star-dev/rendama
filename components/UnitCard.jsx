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
      className="p-6  border border-gray-200 rounded-md"
    >
      <div className="space-y-3">
        <h1 className="px-4 py-2 text-center font-extrabold  bg-blue-600">
          Unit Number: <span className="text-white">{unitNumber}</span>
        </h1>
        <div className="text-gray-700 font-semibold">
          <p>
            Property Name: <span>{propertyName}</span>
          </p>
          <p>
            Tenant Name:{" "}
            <span
              className={`${!tenant ? "text-red-600" : "hover:text-blue-600"}`}
            >
              {tenant}
            </span>
          </p>
          <p>
            Rent Amount: <span>{rent}</span>
          </p>
          <p>
            Due Day: <span>{dueDay}</span>
          </p>
          <p>status: {status}</p>
        </div>
        <button className="text-lg font-bold text-blue-600 text-center w-full p-2 bg-gray-200 rounded-md">
          View more
        </button>
      </div>
    </Link>
  );
}
