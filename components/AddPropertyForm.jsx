"use client";
import { useProperty } from "@/context/PropetyContext";
import { Building2Icon, Map, MapIcon, X } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ButtonLoading from "./ButtonLoading";

export default function AddPropertyForm({ onclose }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    totalUnits: "",
  });
  const { message, error, loading, addProperty } = useProperty();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProperty(form);
    } catch (err) {
      toast.error(err);
    }
  };

  if (message) {
    toast.success(message);
  }

  if (error) {
    toast.error(error);
  }
  return (
    <main className="mx-auto w-full mt-8">
      <Toaster />

      <div className="relative bg-white w-90 overflow-hidden p-4 border border-gray-200 rounded-2xl">
        <X
          onClick={() => onclose()}
          size={30}
          className="border border-gray-300 text-gray-900 rounded-md absolute top-3"
        />
        <h1 className="text-center font-bold text-gray-950 mb-6">
          Add new property
        </h1>
        <form className="space-y-3 " onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="input-group">
              <label className="input-label">Building Name</label>
              <div className="relative">
                <Building2Icon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Umoja flats"
                  value={form.name}
                  onChange={handleChange}
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Location</label>
              <div className="relative">
                <Map
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Nairobi"
                  value={form.location}
                  onChange={handleChange}
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea
                rows={3}
                type="text"
                name="description"
                placeholder="Short description of your property"
                value={form.description}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Units (Number of rooms)</label>
              <div className="relative">
                <Building2Icon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="number"
                  name="totalUnits"
                  placeholder="0"
                  value={form.totalUnits}
                  onChange={handleChange}
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>
          </div>
          <button className="primary-btn p-2.5" disabled={loading}>
            {loading ? <ButtonLoading /> : "Add Property"}
          </button>
        </form>
      </div>
    </main>
  );
}
