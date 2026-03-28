"use client";
import Loading from "@/components/Loading";
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
      <div className="space-y-2 p-4 shadow-md font-serif">
        <div className="flex justify-center flex-col items-center bg-blue-700 py-2 rounded-md">
          <House size={40} className="text-white mb-3" />
          <h1>
            <span className="text-white text-lg">{property.name}</span>
          </h1>
        </div>

        <div className="text-gray-900 font-bold text-sm space-y-1 ">
          <p>
            Total Units:{" "}
            <span className="text-gray-600 font-bold">
              {property.totalUnits} units
            </span>
          </p>
          <p>
            Location:{" "}
            <span className="text-gray-600 font-bold">{property.location}</span>
          </p>
          <p>
            Description:{" "}
            <span className="text-gray-600 font-bold">
              {property.description}
            </span>
          </p>
          <p>
            Created On:{" "}
            <span className="text-gray-600 font-bold">
              {new Date(property.createdAt).toDateString()}
            </span>
          </p>
          <p>
            Last Update:{" "}
            <span className="text-gray-600 font-bold">
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
      <div className="py-6 mt-5 flex flex-col space-y-4">
        <div className="flex gap-4 text-sm font-serif">
          <div className="py-2 px-3 flex flex-col items-center border border-gray-300">
            <p className="">Expected Rent</p>
            <span className="font-extrabold text-blue-600 mt-2 text-sm">
              Ksh. {0}
            </span>
          </div>
          <div className="py-2 px-3 flex flex-col items-center border border-gray-300">
            <p>Collected Rent</p>
            <span className="font-extrabold text-blue-600 mt-2 text-sm">
              Ksh. {0}
            </span>
          </div>
          <div className="py-2 px-3 flex flex-col items-center border border-gray-300">
            <p>Pending Rent</p>
            <span className="font-extrabold text-blue-600 mt-2 text-sm">
              Ksh. {0}
            </span>
          </div>
        </div>
        <div className="py-2 flex items-center gap-4 px-4 border border-gray-200 max-w-md">
          <h1 className="text-sm">Unregistered Units</h1>
          <span className="text-blue-700 font-extrabold">
            {unregisteredUnits() ?? 0}
          </span>
        </div>
        <div className="max-w-md">
          <h1 className="py-2 px-4s flex gap-5 border px-4 border-gray-200 relative">
            Registered Units
            <span className="text-blue-700 font-extrabold">
              {registeredUnits.length ?? 0}
            </span>
            <p className="absolute right-5">
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
                    className="p-4 shadow-md bg-gray-100 text-sm font-serif"
                  >
                    <h1 className="text-gray-700 font-semibold flex items-center gap-2 justify-start mb-2 border-b border-gray-200 p-2">
                      <House size={20} className="text-blue-600" />
                      Unit Name:{" "}
                      <span className="text-gray-950">{unit.unitNumber}</span>
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
                    <p className="text-gray-600 font-semibold">
                      Rent: <span className="text-green-600">{unit.rent}</span>
                    </p>
                    <button className="primary-btn mt-5 rounded-none">
                      View Unit
                    </button>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl font-serif">
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
