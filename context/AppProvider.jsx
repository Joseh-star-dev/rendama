import { AuthProvider } from "@/lib/AuthContext";
import React from "react";
import { PropertyProvider } from "./PropetyContext";
import { UnitProvider } from "./UnitsContext";
import { TenantProvider } from "./TenantContext";

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <PropertyProvider>
        <UnitProvider>
          <TenantProvider>{children}</TenantProvider>
        </UnitProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}
