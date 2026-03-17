import { AuthProvider } from "@/lib/AuthContext";
import React from "react";
import { PropertyProvider } from "./PropetyContext";
import { UnitProvider } from "./UnitsContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <PropertyProvider>
        <UnitProvider>{children}</UnitProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}
