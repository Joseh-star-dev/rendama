"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";

const { createContext, useState, useEffect, useContext } = require("react");

const UnitsContext = createContext();

export function UnitProvider({ children }) {
  const [units, setUnits] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch units on mount;
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoading(true);
        const res = await api.get("/units");
        setUnits(res.data);
      } catch (err) {
        setUnits(null);
        console.error(err);
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  const addUnit = async (form) => {
    try {
      setLoading(true);
      const res = await api.post("/units", form);
      setMessage(res.data.message);
      const updatedUnits = await api.get("/units");
      setUnits(updatedUnits.data);
      return true;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something happened. Try again!");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setError("");
      }, 1200);
    }
  };

  const updateUnit = async (form) => {
    try {
      setLoading(true);
      const res = await api.put(`/units/${id}`, form);
      setMessage(res.data.message);
      const updatedUnits = await api.get("/units");
      setUnits(updatedUnits.data);
      return true;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update. Try again!");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setError("");
      }, 1200);
    }
  };

  const deleteUnit = async (id) => {
    try {
      setLoading(true);
      const res = await api.put(`/units/${id}`);
      setMessage(res.data.message);
      const updatedUnits = await api.get("/units");
      setUnits(updatedUnits.data);
      return true;
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to delete unit. Try again!",
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
        setError("");
      }, 1200);
    }
  };

  return (
    <UnitsContext.Provider
      value={{ units, addUnit, deleteUnit, updateUnit, error, message }}
    >
      {children}
    </UnitsContext.Provider>
  );
}

export const useUnit = () => {
  const context = useContext(UnitsContext);

  if (!context) {
    throw new Error("useUnits context must be used within UnitsProvider");
  }

  return context;
};
