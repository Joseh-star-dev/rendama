"use client";
import { useProperty } from "@/context/PropertyContext";
import { useTenant } from "@/context/TenantContext";
import { useUnit } from "@/context/UnitsContext";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddTenantForm({ close, unit_number }) {
  const { properties } = useProperty();
  const { units } = useUnit();
  const { addTenant, loading, message, error } = useTenant();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    unitNumber: unit_number || "",
    property: "",
    moveInDate: "",
  });

  useEffect(() => {
    if (!form.property && properties.length > 0) {
      setForm((prev) => ({ ...prev, property: properties[0].name }));
    }

    if (!form.unitNumber && units.length > 0 && !unit_number) {
      setForm((prev) => ({ ...prev, unitNumber: units[0].unitNumber }));
    }
  }, [properties, units, unit_number]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    console.log("property number is", form.property);
    console.log("unit number is", form.unitNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTenant(form);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white px-4 py-6 max-w-md mx-auto rounded-md relative">
      <Toaster />
      {error && (
        <p className="text-red-500 text-lg p-2 font-semibold text-center">
          {error}
        </p>
      )}
      {message && (
        <p className="text-green-600 font-semibold text-lg p-2 text-center">
          {message}
        </p>
      )}
      <X size={30} onClick={close} className="mb-4 text-gray-700" />
      <h1 className="text-lg mb-5 font-semibold">Add new tenant</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="">
          <label className="">Tenant Name</label>
          <input
            type="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className=""
          />
        </div>

        <div className="">
          <label className="">Tenant Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="07** *** ***"
            className="placeholder:text-2xl"
          />
        </div>

        <div className="">
          <label className="">Unit Number</label>
          {unit_number ? (
            <input
              type="text"
              value={unit_number}
              readOnly
              className="input-field"
            />
          ) : (
            <select
              name="unitNumber"
              value={form.unitNumber}
              onChange={handleChange}
              className="input-field rounded-md"
            >
              {units.length > 0 ? (
                units.map((u) => (
                  <option key={u._id} value={u.unitNumber}>
                    {u.unitNumber}
                  </option>
                ))
              ) : (
                <option value="">You have not unit yet</option>
              )}
            </select>
          )}
        </div>

        <div className="">
          <label className="">Select Property</label>
          <select
            name="property"
            value={form.property}
            onChange={handleChange}
            className="input-field rounded-md"
          >
            {properties.length > 0 ? (
              properties.map((p) => (
                <option key={p._id} value={p.name} className="">
                  {p.name}
                </option>
              ))
            ) : (
              <option value="">No properties available</option>
            )}
          </select>
        </div>

        <div className="">
          <label className="">Move in date</label>
          <input
            type="date"
            name="moveInDate"
            value={form.moveInDate}
            onChange={handleChange}
            className="placeholder:text-2xl"
          />
        </div>
        <button className="primary-btn py-3">Add Tenant</button>
      </form>
    </div>
  );
}
