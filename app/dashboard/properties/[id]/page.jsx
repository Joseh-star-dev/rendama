"use client";
import Loading from "@/components/Loading";
import PropertyCard from "@/components/PropertyCard";
import { useProperty } from "@/context/PropertyContext";
import api from "@/lib/api";
import { ChevronDown, ChevronUp, House } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

export default function PropertyDetail() {
  const { id } = useParams();
  const { properties, loading } = useProperty();
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUnits, setRegisteredUnits] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getRegisteredUnits = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setRegisteredUnits(res.data.registeredUnits);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getRegisteredUnits();
  }, []);
  const property = properties.find((p) => p._id === id);
  const unregisteredUnits = () => {
    return Number(property?.totalUnits - registeredUnits?.length);
  };
  if (loading) return <Loading />;
  function PropertyIdInfo() {
    if (loading) {
      return (
        <div>
          <Loading content={"Property id..."} />
        </div>
      );
    }
    if (!property) {
      return (
        <div>
          <h1>Property not found</h1>
        </div>
      );
    }

    return (
      <div className="space-y-2 p-4 shadow-md">
        <div className="flex justify-center flex-col items-center bg-blue-700 py-2 rounded-md">
          <House size={40} className="text-white mb-3" />
          <h1>
            <span className="text-white text-lg">{property.name}</span>
          </h1>
        </div>

        <div className="text-gray-900 font-bold">
          <p>
            Total Units:{" "}
            <span className="text-gray-700 font-bold">
              {property.totalUnits} units
            </span>
          </p>
          <p>
            Location:{" "}
            <span className="text-gray-700 font-bold">{property.location}</span>
          </p>
          <p>
            Description:{" "}
            <span className="text-gray-700 font-bold">
              {property.description}
            </span>
          </p>
          <p>
            Created On:{" "}
            <span className="text-gray-700 font-bold">
              {new Date(property.createdAt).toDateString()}
            </span>
          </p>
          <p>
            Last Update:{" "}
            <span className="text-gray-700 font-bold">
              {new Date(property.updatedAt).toDateString()}
            </span>
          </p>
        </div>
        <div className="flex gap-4 md:justify-between items-center mt-5 max-w-60">
          <button className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-md">
            Update
          </button>

          <button className="px-8 py-2 bg-red-500 hover:bg-red-700 text-white font-bold text-sm rounded-md">
            Delete
          </button>
        </div>
      </div>
    );
  }

  function UnitsContent() {
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="py-6 mt-5 flex flex-col gap-4 max-w-md">
        <div className="">
          <h1 className="font-bold mb-2 flex justify-around gap-2 px-3 py-2 bg-gray-200 rounded-md">
            Total registered Units
            <span className="text-blue-700 font-extrabold">
              {registeredUnits.length ?? 0}
            </span>
            <p>
              {showDropdown ? (
                <ChevronUp onClick={() => setShowDropdown(false)} />
              ) : (
                <ChevronDown onClick={() => setShowDropdown(true)} />
              )}
            </p>
          </h1>
          {registeredUnits && (
            <div className="grid grid-cols-1 md:grid-cols-2 text-sm md:text-lg gap-4 mt-5">
              {showDropdown &&
                registeredUnits.map((unit) => (
                  <Link
                    href={`/dashboard/units/${unit._id}`}
                    key={unit._id}
                    className="p-2 shadow-md border border-gray-200"
                  >
                    <h1 className="font-extrabold text-gray-950 mb-2">
                      Unit Name:{" "}
                      <span className="text-blue-600">{unit.unitNumber}</span>
                    </h1>
                    <p className="font-semibold text-gray-600">
                      Tenant:{" "}
                      <span className="text-red-500">
                        {unit.tenant ?? "No tenant!"}
                      </span>
                    </p>
                    <p className="text-gray-600 font-semibold">
                      Status:{" "}
                      <span className="text-green-600">{unit.status}</span>
                    </p>
                  </Link>
                ))}
            </div>
          )}
        </div>
        <div className="border flex items-center justify-center gap-4 rounded-md max-w-86 p-3 border-gray-200">
          <h1 className="font-bold text-sms md:text-xl">
            Total Unregistered Units
          </h1>
          <span className="text-blue-700 font-extrabold text-xl">
            {unregisteredUnits() ?? 0}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mx-auto">
        <Suspense fallback={<loading />}>
          <PropertyIdInfo />
        </Suspense>
        <Suspense fullback={<isLoading />}>
          <UnitsContent />
        </Suspense>
      </div>
    </div>
  );
}
