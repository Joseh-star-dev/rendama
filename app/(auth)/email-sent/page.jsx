"use client"
import { CircleCheckIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function EmailSentNote({ message, closeModal }){
  return (
    <div className="font-serif min-h-screen fixed bg-black/10 insert-0 backdrop-blur-sm flex flex-col w-full px-2">
      <div className="bg-white shadow p-8 rounded-2xl mx-auto mt-20 flex flex-col items-center">
        <div className="flex justify-center p-4 flex-col items-center">
          <CircleCheckIcon size={50} className="text-green-600" />
          <p className='text-red-600 font-bold mt-1'>Check your email</p>
        </div>
        <h1 className="text-center">
          {"Verification link was send to your email"}
        </h1>
        <p className="mb-5 text-gray-900 font-bold text-sm text-center">
          Click the link in your email to verify your account!
        </p>
        <div className="my-4">
          <Link
            href="/resend-verification"
            className="primary-btn p-2 text-sm"
            onClick={closeModal}
          >
            Resend verification
          </Link>
        </div>
      </div>
    </div>
  );
}