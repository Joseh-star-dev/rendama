"use client";
import AddUnitForm from "@/components/AddUnitForm";
import Loading from "@/components/Loading";
import UnitCard from "@/components/UnitCard";
import { useUnit } from "@/context/UnitsContext";
import { MessageCircleWarning } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Units() {
  const [showUnitsForm, setShowUnitsForm] = useState(false);
  const { units, loading, message } = useUnit();

  if (loading) {
    return <Loading />;
  }
  return (
    <Suspense fullback={<Loading />}>
      <main className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold ">
              Manage your Units. <br />
              <span className="text-sm">
                Add tenants, update and delete units.
              </span>
            </h3>
            <div className="flex flex-col md:flex-row gap-5 max-w-lg">
              <div className="primary-btn bg-green-700 flex justify-between px-4 text-xl font-bold">
                <span>total units</span> <span>{units.length ?? 0}</span>
              </div>
              <button
                onClick={() => setShowUnitsForm(true)}
                className="primary-btn text-xl font-bold"
              >
                Add new unit
              </button>
            </div>
          </div>
        </div>
        {units.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {units.map((unit) => (
              <UnitCard
                key={unit._id}
                id={unit._id}
                unitNumber={unit.unitNumber}
                propertyName={unit.property.name}
                tenant={unit.tenant ?? "No tenant !"}
                rent={unit.rent}
                dueDay={unit.dueDay}
                status={unit.status}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-xl p-4 border border-gray-300 rounded-2xl mt-8">
            <h1 className="my-3 text-lg font-bold">
              You have {units.length ?? "no"} registered units!
            </h1>
            <p className="text-gray-700 mb-2">
              Click "Add new unit" to register them 1 by 1.
            </p>
            <button
              onClick={() => setShowUnitsForm(true)}
              className="primary-btn bg-green-700 text-xl font-bold max-w-sm"
            >
              Add new unit
            </button>
          </div>
        )}
        {showUnitsForm && (
          <div className="min-h-screen  bg-black/40 fixed insert-0 top-0 mx-auto z-50 md:py-2 py-4 px-2 left-0 right-0">
            <AddUnitForm onClose={() => setShowUnitsForm(false)} />
          </div>
        )}
      </main>
    </Suspense>
  );
}
