import { Building2 } from "lucide-react";
import React from "react";

export default function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
        <Building2 className="text-white w-5 h-5" />
      </div>
      <span className="text-xl font-display font-bold tracking-tight text-gray-950">
        Rendama
      </span>
    </div>
  );
}
