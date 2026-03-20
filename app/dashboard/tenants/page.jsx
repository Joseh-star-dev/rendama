"use client";
import AddTenantForm from "@/components/AddTenantForm";
import { useTenant } from "@/context/TenantContext";
import Loader from "@/ui/Loader";
import { PlusIcon, User, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Tenants() {
  const { tenants, loading, error, message } = useTenant();
  const [showForm, setShowForm] = useState(false);

  const searchParams = useSearchParams();
  const unitNumber = searchParams.get("unitNumber");

  useEffect(() => {
    if (unitNumber) {
      setShowForm(true);
    }
  }, [unitNumber]);
  if (loading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <main className="relative">
      <div className="mx-auto mx-w-7xl space-y-7">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-center md:text-start">
            Manage your tenants
          </h1>
          <div className="max-w-4xl flex flex-col md:flex-row gap-4">
            <div className="bg-green-600 hover:bg-green-700 flex text-lg justify-between gap-8 items-center-safe text-white font-semibold px-6 py-3 rounded-2xl">
              <p className="flex gap-2">
                <Users /> Total Tenants:
              </p>
              <span className="text-3xl">{tenants.length ?? 0}</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-md flex justify-center items-center"
            >
              <PlusIcon />
              <span>Add new tenant</span>
            </button>
          </div>
        </div>
        {tenants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {tenants.map((t) => (
              <div
                key={t._id}
                className="px-3 py-4 bg-gray-100 shadow rounded-md transition border border-white hover:border-gray-300"
              >
                <h1 className="text-lg mb-2 text-center text-indigo-600 font-extrabold">
                  <span className="text-gray-900">Name :</span>{" "}
                  <span> {t.name}</span>
                </h1>
                <div className="text-sm">
                  <p className="text-gray-700 font-semibold space-x-2">
                    <span>Phone Number:</span>{" "}
                    <strong className="text-gray-950">{t.phone}</strong>
                  </p>
                  <p className="text-gray-700 font-semibold space-x-2">
                    <span>Rent Status:</span>
                    <strong className="text-gray-950">{t.rentStatus}</strong>
                  </p>
                  <p className="text-gray-700 font-semibold space-x-2">
                    <span>Unit Number:</span>
                    <strong className="text-gray-950">{t.unitNumber}</strong>
                  </p>
                  <p className="text-gray-700 font-semibold space-x-2">
                    <span>Move in date:</span>
                    <strong className="text-gray-950">
                      {new Date(t.moveInDate).toLocaleDateString()}
                    </strong>
                  </p>
                </div>
                <p className="text-gray-700 font-semibold space-x-2">
                  <span>Property:</span>
                  <strong className="text-gray-950">{t.property}</strong>
                </p>
                <div className="flex gap-2 mt-5">
                  <button className="primary-btn py-1">Update</button>
                  <button className="primary-btn py-1 bg-red-500 hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center-safe md:items-start py-4 px-6 border border-gray-200 rounded-md max-w-md">
            <h2 className="text-2xl font-semibold mb-5">
              You have no tenant yet
            </h2>
            <p>Click "Add Tenant" to get started!</p>
            <button
              onClick={() => setShowForm(true)}
              className="primary-btn bg-gray-800 text-lg mt-7 py-3"
            >
              Add new tenant
            </button>
          </div>
        )}
      </div>
      {showForm && (
        <div className="min-h-screen bg-black/40 fixed inset-0 top-0 mx-auto z-60 py-25 px-2">
          <AddTenantForm
            close={() => setShowForm(false)}
            unit_number={unitNumber}
          />
        </div>
      )}
    </main>
  );
}
