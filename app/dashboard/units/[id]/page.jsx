"use client";
import Loading from "@/components/Loading";
import { useUnit } from "@/context/UnitsContext";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

export default function UnitDetails() {
  const { id } = useParams();
  const { units, loading } = useUnit();
  const unit = units.find((unit) => unit._id === id);

  if (loading) return <Loading />;
  if (!unit) {
    return (
      <div className="h-screen flex justify-center items-center bg-black/10">
        <div>
          <h1 className="text-red-600 text-lg">Unit not found!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="font-serif max-w-7xl">
      <div className="flex flex-col bg-gray-50 p-6 max-w-xs">
        <div className="py-2 px-4 border-b border-gray-300 mb-4">
          <h1 className="font-bold text-gray-700">
            Unit Number: <span className="text-gray-950">{unit.Number}</span>
          </h1>
        </div>
        <div className="text-gray-600 font-semibold text-sm space-y-1">
          <p className="">
            Tenant Name:{" "}
            <span className="text-gray-800">
              {unit.tenant?.name ?? "No tenant !"}
            </span>
          </p>
          <p className="">
            Status: <span className="text-gray-800">{unit.status}</span>
          </p>
          <p className="">
            Rent Amount: <span className="text-blue-700">Ksh. {unit.rent}</span>
          </p>
          <p className="">
            Due Day:{" "}
            <span className="text-blue-700">
              {new Date(unit.dueDay).toLocaleDateString()}
            </span>
          </p>
          <p className="">
            Property Name:{"  "}
            <span className="text-gray-800"> {unit.property?.name}</span>
          </p>
          <p className="">
            Registered On:{" "}
            <span className="text-gray-800">
              {new Date(unit.createdAt).toDateString()}
            </span>
          </p>
          <p className="">
            Last Update:{" "}
            <span className="text-gray-800">
              {new Date(unit.updatedAt).toDateString()}
            </span>
          </p>
        </div>
        <div className="flex gap-3 md:justify-between mt-5">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm font-bold">
            Update
          </button>
          <button className="px-8 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-sm font-bold">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
