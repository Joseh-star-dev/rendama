"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Building2Icon, BuildingIcon } from "lucide-react";
import api from "@/lib/api";
import AddPropertyForm from "@/components/AddPropertyForm";
import toast, { Toaster } from "react-hot-toast";
import PropertyCard from "@/components/PropertyCard";
import { useProperty } from "@/context/PropetyContext";
import Error from "@/components/Error";
import Loading from "@/components/Loading";

export default function MyProperty() {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const onclose = () => setShowPropertyForm(false);

  const { properties, loading, message, error } = useProperty();

  if (loading) {
    return (
      <div className="min-h-[60] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  const hasProperties = properties.length > 0;

  return (
    <main className="flex flex-col w-full min-h-screen relative pb-12">
      <Toaster position="top-right" />

      <div className="p-4 md:px-10 md:py-8 space-y-6 max-w-7xl mx-auto w-full">
        <h1 className="font-bold text-2xl md:text-3xl">
          {message || "Manage Your Properties"}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <div className="flex-1 max-w-xs bg-green-700 text-white px-6 py-4 rounded-xl shadow flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BuildingIcon size={28} />
              <span className="text-lg font-medium">Total Properties</span>
            </div>
            <span className="text-2xl font-bold">
              {properties?.length ?? 0}
            </span>
          </div>

          <button
            onClick={() => setShowPropertyForm(true)}
            className="flex-1 max-w-xs bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl shadow flex items-center justify-center gap-3 text-lg font-medium transition-colors"
          >
            Add New Property
            <Building2Icon size={24} />
          </button>
        </div>

        {!hasProperties ? (
          <div className="py-16 text-center text-gray-500">
            <p className="text-xl mb-3">You don't have any properties yet</p>
            <p className="mb-6">Click "Add New Property" to get started</p>
            <button
              onClick={() => setShowPropertyForm(true)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                name={property.name}
                location={property.location}
                description={property.description}
                totalUnits={property.totalUnits}
                createdAt={new Date(property.createdAt).toLocaleDateString()}
                updatedAt={new Date(property.updatedAt).toLocaleDateString()}
                // Add more props if your PropertyCard supports them (image, status, etc.)
              />
            ))}
          </div>
        )}
      </div>

      {showPropertyForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto relative">
            <AddPropertyForm onclose={() => setShowPropertyForm(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
