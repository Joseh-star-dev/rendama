"use client";
import Loading from "@/components/Loading";
import { useAuth } from "@/lib/AuthContext";
import Loader from "@/ui/Loader";
import { redirect } from "next/navigation";
import React from "react";

export default function () {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user && !isLoading) {
    return redirect("/login");
  }

  return (
    <div className="p-4 md:p-20 mx-auto">
      <div className="bg-gray-50 shadow p-8 w-90 mx-auto rounded-2xl space-y-5">
        <h1 className="text-center text-2xl font-bold text-gray-950">
          Profile
        </h1>
        <div className="flex flex-col items-start p-4 border border-gray-100">
          <p className="text-blue-700 text-sm text-center font-bold">
            Username: <span className="text-gray-600">{user.username}</span>
          </p>
          <p className="text-blue-700 font-bold text-sm text-center">
            Email: <span className="text-gray-600">{user.email}</span>
          </p>
        </div>
        <button className="primary-btn">Edit profile</button>
      </div>
    </div>
  );
}
