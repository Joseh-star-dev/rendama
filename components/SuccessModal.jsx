"use client";
import { CircleCheck, X } from "lucide-react";
import React from "react";

export default function SuccessModal({ message, onclose }) {
  return (
    <div>
      <X onClick={onclose} />
      <div>
        <CircleCheck />
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
