"use client";

import { Building2, Home, DollarSign, User, Calendar, X } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ButtonLoading from "./ButtonLoading";
import { useUnit } from "@/context/UnitsContext";
import { useProperty } from "@/context/PropertyContext";
import { useTenant } from "@/context/TenantContext";
import AddTenantForm from "./AddTenantForm";

export default function AddUnitForm({ onClose }) {
  const [form, setForm] = useState({
    property: "", // probably should be property _id in real app
    unitNumber: "",
    rent: "",
    tenant: "",
    status: "vacant",
    dueDay: "",
  });
  ``;

  const { message, error, loading, addUnit } = useUnit();
  const { tenants } = useTenant();
  const { properties } = useProperty();
  const [showAddTenantForm, setShowAddTenantForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tenant" && value === "new") {
      // console.log(value, name);
      setShowAddTenantForm(true);
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation (optional but recommended)
    if (!form.property.trim() || !form.unitNumber.trim() || !form.rent) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addUnit(form);
      toast.success("Unit added successfully!");
      onClose(); // close modal on success
    } catch (err) {
      console.error("Add unit failed:", err);
      toast.error(err?.message || "Failed to add unit");
    }
  };

  if (error) {
    toast.error(error);
  }

  if (message) {
    toast.success(message);
  }
  return (
    <div className="bg-white px-4 py-6 max-w-md mx-auto rounded-md relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-12 right-4 p-1 rounded-full hover:bg-gray-100 transition"
        aria-label="Close form"
      >
        <X size={24} className="text-gray-600" />
      </button>

      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Add New Unit
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Property (likely should be a select of user's properties in real app) */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Property *
          </label>

          <select
            name="property"
            value={form.property}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          >
            <option value="" disabled={properties.length > 0}>
              e.g Umoja Heights
            </option>
            {properties.length > 0
              ? properties.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        {/* Unit Number */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Unit Number *
          </label>
          <div className="relative">
            <Home
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              name="unitNumber"
              placeholder="e.g. A-101, B3, 204"
              value={form.unitNumber}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Rent */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Monthly Rent (KSh) *
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="number"
              name="rent"
              placeholder="e.g. 25000"
              value={form.rent}
              onChange={handleChange}
              min="0"
              step="1"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Tenant */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Current Tenant (You can skip and add later)
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <select
              name="tenant"
              value={form.tenant}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {tenants.length > 0 ? (
                tenants.map((t) => (
                  <option value={t.name} key={t._id}>
                    {t.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="" disabled>
                    You have not tenants skip
                  </option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Status *
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            required
          >
            <option value="vacant">Vacant</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Under Maintenance</option>
          </select>
        </div>

        {/* Due Day */}
        <div>
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Rent Due Date *
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="date"
              name="dueDay"
              value={form.dueDay}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
                mt-6 w-full py-3 px-6 rounded-lg font-medium text-white
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                }
                transition-colors flex items-center justify-center gap-2
              `}
        >
          {loading ? <ButtonLoading /> : "Add Unit"}
        </button>
      </form>
      {/* {showAddTenantForm && <p>Form open</p> && (
        <div className="fixed inset-0 top-p min-h-screen">
          <AddTenantForm close={() => setShowAddTenantForm(false)} />
        </div>
      )} */}
    </div>
  );
}
