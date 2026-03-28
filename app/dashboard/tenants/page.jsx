"use client";
import AddTenantForm from "@/components/AddTenantForm";
import Loading from "@/components/Loading";
import TenantCard from "@/components/TenantCard";
import { useProperty } from "@/context/PropertyContext";
import { useTenant } from "@/context/TenantContext";
import { ChevronDown, ChevronUp, PlusIcon, User, Users, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

export default function Tenants() {
  const { tenants, loading, error, message } = useTenant();
  const [showForm, setShowForm] = useState(false);

  const { property } = useProperty();

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
        <Loading />
      </div>
    );
  }

  const TenantListItem = ({ tenant }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
      <div className="max-w-md">
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="flex space-x-3 border border-gray-300 pt-3 pb-1 px-4 relative max-w-md mb-2"
        >
          <h1 className="font-bold">
            Name:{" "}
            <span className="font-semibold text-blue-600">{tenant.name}</span>
          </h1>
          <p className="font-bold">
            Unit No: <span className="text-blue-600">{tenant.unitNumber}</span>
          </p>
          <p className="absolute right-5">
            {openDropdown ? <ChevronUp /> : <ChevronDown />}
          </p>
        </div>
        {openDropdown && (
          <TenantCard
            phone={tenant.phone}
            moveInDate={new Date(tenant.moveInDate).toDateString()}
            rent={tenant.rentAmount}
            rentStatus={tenant.rentStatus}
            id={tenant._id}
          />
        )}
      </div>
    );
  };

  return (
    <Suspense fallback={<Loading />}>
      <main className="relative font-serif">
        <div className="mx-auto mx-w-7xl space-y-7">
          <div className="space-y-3">
            <h1 className="text-lg text-center md:text-start">
              Manage your tenants
            </h1>
            <div className="flex flex-col md:flex-row  max-w-md gap-4 text-sm">
              <div className="flex  bg-gray-200 justify-between gap-8 items-center-safe text-gray-900 font-semibold px-4 py-3 rounded-md">
                <p className="flex gap-2">
                  <Users className="text-blue-600" /> Total Tenants:
                </p>
                <span className="text-lg">{tenants.length ?? 0}</span>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gray-200 text-blue-600 text-sm font-semibold py-3 px-6 rounded-md flex justify-center items-center"
              >
                <PlusIcon />
                <span>Add new tenant</span>
              </button>
            </div>
          </div>
          {tenants.length > 0 ? (
            <div className="space-y-2">
              {tenants.map((tenant) => (
                <TenantListItem key={tenant._id} tenant={tenant} />
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
                className="primary-btn bg-blue-600 text-lg mt-7 py-3"
              >
                Add new tenant
              </button>
            </div>
          )}
        </div>
        {showForm && (
          <div className="min-h-screen bg-black/40 fixed inset-0 top-0 mx-auto z-60  px-2">
            <AddTenantForm
              close={() => setShowForm(false)}
              unit_number={unitNumber}
            />
          </div>
        )}
      </main>
    </Suspense>
  );
}
