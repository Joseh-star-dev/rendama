"use client";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // fetch current properties on mount ;
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/properties");
        setProperties(res.data);
        return true;
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);

  const addProperty = async (form) => {
    setLoading(true);
    try {
      const res = await api.post("/properties", form);
      setMessage(res.data.message);
      const newProperties = await api.get("/properties");
      setProperties(newProperties.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Error occurred! Please try again");
      return false;
    } finally {
      setTimeout(() => {
        setLoading(false);
        setError("");
      }, 1500);
    }
  };

  const updateProperty = async (id) => {
    try {
      const res = await api.put(`/properties/${id}`);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err.response?.data?.error);
      setError(err.response?.data?.error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const res = await api.delete(`/properties/${id}`);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err.response?.data?.error);
      setError(err.response?.data?.error);
    }
  };

  const addUnit = async () => {
    setLoading(true);
    try {
      const res = await api.post("/units");
      setMessage(res.data.message);
    } catch (error) {}
  };
  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        loading,
        error,
        message,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within PropertyProvider");
  }

  return context;
};
