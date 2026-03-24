"use client";
import Loading from "@/components/Loading";
import api from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const TokenError = ({ error, token }) => {
  return (
    <div className="min-h-screen bg-black/10 fixed inset-0 flex justify-center py-20 px-4">
      <div className="p-8 bg-white shadow rounded-md flex flex-col gap-4">
        <h1 className="text-red-500 font-bold text-center text-lg font-serif">
          {error}
        </h1>
        <div>
          <p className="font-bold text-lg text-gray-950">
            Unable to verify your email.
          </p>
          <span className="text-sm text-gray-700 font-semibold">
            Make sure you use the link sent to your email
          </span>
          <div className="my-4">
            <Link href="/resend-verification" className="primary-btn p-3">
              Resend verification
            </Link>
          </div>
          <div className="mt-5 text-sm py-2 flex gap-2 text-gray-500 font-semibold">
            <p>Contact Support: </p>
            <span className="font-bold text-gray-950">0113822842</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmailSentNote = ({ message, closeModal }) => {
  return (
    <div className="min-h-screen fixed bg-black/10 insert-0 backdrop-blur-sm flex flex-col w-full">
      <div className="bg-white shadow p-8 rounded-2xl mx-auto mt-20 flex flex-col items-center">
        <div className="flex justify-center p-4">
          <CircleCheckIcon size={50} className="text-green-600" />
        </div>
        <h1 className="text-center">
          {message ? message : "Verification link was send to your email"}
        </h1>
        <p className="mb-5 text-gray-500">
          Click the link in your email to verify your account!
        </p>
        <div className="my-4">
          <Link
            href="/resend-verification"
            className="primary-btn p-3"
            onClick={closeModal}
          >
            Resend verification
          </Link>
        </div>
      </div>
    </div>
  );
};

function VerifyContent() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const storedToken = useSearchParams();
  const token = storedToken.get("token");

  useEffect(() => {
    if (user?.isVerified) {
      router.push("/dashboard");
      return;
    }
    if (token) {
      setLoading(true);
      const verify = async () => {
        try {
          const res = await api.get(`/auth/verify-email?token=${token}`);
          setMessage(res.data.message);
          setTimeout(() => router.push("/login"), 1500);
        } catch (error) {
          setError(
            error.response?.data?.error || "Something happened. Try again!",
          );
          setLoading(false);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      };
      verify();
    }
  }, [token, user, router]);

  if (loading) {
    return <Loading />;
  }
  if (!token && !loading && !user) {
    return (
      <Suspense fullback={<Loading />}>
        <TokenError error={error} token={token} />
      </Suspense>
    );
  }

  if (message) {
    return <VerificationSuccess message={message} />;
  } else {
    return <EmailSentNote message={message} />;
  }
}

const VerificationSuccess = ({ message }) => {
  return (
    <div className="fixed mih-h-screen bg-black/30 insert-0 w-full flex flex-col items-center py-20">
      <div className="bg-white mx-auto shadow rounded-md px-15 py-20">
        <div className="flex justify-center">
          <CircleCheckIcon size={50} className="text-green-600 mb-5" />
        </div>
        <h1 className="text-sm font-semibold text-center">{message}</h1>
      </div>
    </div>
  );
};
export default function VerifyEmail() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyContent />
    </Suspense>
  );
}
