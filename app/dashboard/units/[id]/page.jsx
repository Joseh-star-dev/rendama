"use client";
import Loading from "@/components/Loading";
import { useUnit } from "@/context/UnitsContext";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

export default function UnitDetails() {
  const { id } = useParams();
  const { units, loading } = useUnit();
  const unit = units.find((unit) => unit._id === id);

  function UnitNotFound() {
    return (
      <div className="h-screen flex justify-center items-center bg-black/10">
        <div>
          <h1 className="text-red-600 text-lg">Unit not found!</h1>
        </div>
      </div>
    );
  }
  function UnitData() {
    return (
      <div className="mx-w-7xl p-2">
        <div className="flex flex-col bg-gray-100 p-6 border border-gray-200 max-w-86">
          <div className="bg-green-600 py-4 text-center text-xl mb-5">
            <h1 className="font-bold text-gray-900">
              Unit Number: <span className="text-white">{unit.unitNumber}</span>
            </h1>
          </div>
          <div className="text-gray-600 font-semibold">
            <p className="">
              Tenant Name:{" "}
              <span className="text-gray-800">
                {unit.tenant ?? "No tenant !"}
              </span>
            </p>
            <p className="">
              Status: <span className="text-gray-800">{unit.status}</span>
            </p>
            <p className="">
              Rent Amount: <span className="text-green-700">{unit.rent}</span>
            </p>
            <p className="">
              Due Day: <span className="text-green-700">{unit.dueDay}</span>
            </p>
            <p className="">
              Property Name:{"  "}
              <span className="text-gray-800"> {unit.property.name}</span>
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
  function Content() {
    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    if (!unit) {
      <UnitNotFound />;
    } else {
      return (
        <div>
          <UnitData />
        </div>
      );
    }
  }
  return (
    <Suspense fullback={<Loading />}>
      <Content />
    </Suspense>
  );
}
