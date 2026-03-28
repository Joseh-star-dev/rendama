"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function TenantInformation() {
  const { id } = useParams();

  return <div>{id}</div>;
}
