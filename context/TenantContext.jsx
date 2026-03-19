"use client";

import api from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

const TenantContext = createContext();

export function TenantProvider({ children }) {
  const [tenants, setTenants] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTenants = async () => {
      try {
        const res = await api.get("/tenants");
        setTenants(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Something happened!");
        setTenants(null);
      } finally {
        setLoading(false);
      }
    };

    getTenants();
  }, []);

  const addTenant = async (form) => {
    try {
      setLoading(true);
      const res = await api.post("/tenants", form);
      setMessage(res.data.message);
      const newTenants = await api.get("/tenants");
      setTenants(newTenants.data);
    } catch (err) {
      console.error("Error adding tenant", err);
      setError(err.response?.data?.error || "Something happened. Try again!");
    } finally {
      setTimeout(() => {
        setError("");
        setLoading(false);
      }, 1200);
    }

    const deleteTenant = async (id) => {
      try {
        setLoading(true);
        const res = await api.post(`/tenants/${id}`);
        setMessage(res.data.message);
        const newTenants = await api.get("/tenant");
        setTenants(newTenants.data);
      } catch (err) {
        console.error("Error deleting tenant", err);
        setError(err.response?.data?.error || "Something happened. Try again!");
      } finally {
        setTimeout(() => {
          setError("");
          setLoading(false);
        }, 1200);
      }
    };
  };

  return (
    <TenantContext.Provider value={{ tenants, addTenant, message, error }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error("useTenant context must be used within UnitsProvider");
  }

  return context;
};
