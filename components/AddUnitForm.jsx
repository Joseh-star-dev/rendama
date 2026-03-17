"use client";

import { Building2, Home, DollarSign, User, Calendar, X } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ButtonLoading from "./ButtonLoading";
import { useUnit } from "@/context/UnitsContext";
import { useProperty } from "@/context/PropetyContext";

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
  const { properties } = useProperty();

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <Toaster position="top-center" />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-4 p-1 rounded-full hover:bg-gray-100 transition"
          aria-label="Close form"
        >
          <X size={24} className="text-gray-600" />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Add New Unit
          </h2>

          {/* Server feedback */}
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-center text-red-700 border border-red-200">
              {error}
            </p>
          )}
          {message && (
            <p className="mb-4 rounded-lg bg-green-50 p-3 text-center text-green-700 border border-green-200">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Property (likely should be a select of user's properties in real app) */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Property *
              </label>
              <div className="relative">
                <Building2
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
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
                        <option id={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
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
                Current Tenant (optional)
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  name="tenant"
                  placeholder="e.g. John Doe"
                  value={form.tenant}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
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
        </div>
      </div>
    </div>
  );
}
