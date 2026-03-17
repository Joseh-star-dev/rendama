"use client";
import AddUnitForm from "@/components/AddUnitForm";
import { useUnit } from "@/context/UnitsContext";
import api from "@/lib/api";
import Loader from "@/ui/Loader";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Units() {
  const [showUnitsForm, setShowUnitsForm] = useState(false);
  const { units, loading } = useUnit();
  if (loading) {
    <Loader />;
  }
  return (
    <main>
      <div>
        <h3 className="text-2xl font-bold mb-4">Manage your Units</h3>
        <div className="flex flex-col md:flex-row gap-5">
          <p className="primary-btn bg-green-700 flex justify-between px-4 text-xl font-bold">
            <span>total units</span> <span>{units.length ?? 0}</span>
          </p>
          <button
            onClick={() => setShowUnitsForm(true)}
            className="primary-btn text-xl font-bold"
          >
            Add new unit
          </button>
        </div>
        {showUnitsForm && (
          <div>
            <AddUnitForm onClose={() => setShowUnitsForm(false)} />
          </div>
        )}
      </div>
    </main>
  );
}
