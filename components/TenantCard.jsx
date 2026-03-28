"use client";
import Link from "next/link";
import React from "react";

export default function TenantCard({
  name,
  phone,
  rentStatus,
  rent,
  unitNumber,
  moveInDate,
  id,
}) {
  return (
    <Link
      href={`/dashboard/tenants/${id}`}
      key={id}
      className="px-3 py-4 flex flex-col shadow-md max-w-md"
    >
      <div className="text-sm">
        <p className="text-gray-700 font-semibold space-x-2">
          <span>Phone Number:</span>{" "}
          <strong className="text-gray-950">{phone}</strong>
        </p>
        <p className="text-gray-700 font-semibold space-x-2">
          <span>Rent:</span>
          <strong className="text-gray-950">{rent}</strong>
        </p>
        <p className="text-gray-700 font-semibold space-x-2">
          <span>Rent Status:</span>
          <strong className="text-gray-950">{rentStatus}</strong>
        </p>

        <p className="text-gray-700 font-semibold space-x-2">
          <span>Move in date:</span>
          <strong className="text-gray-950">
            {new Date(moveInDate).toLocaleDateString()}
          </strong>
        </p>
      </div>
    </Link>
  );
}
