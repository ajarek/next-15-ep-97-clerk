"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) return null;

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Sign Up Clicked");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signUp.create({ emailAddress: email, password: password });
      //   send verification email with the code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
      setError("");
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? err.message);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });
      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        window.location.href = "/dashboard"; // Redirect to dashboard after successful verification
      } else {
        setError(`Unexpected status: ${attempt.status}`);
      }
    } catch (err: any) {
      const msg =
        err.errors?.[0]?.code === "form_code_incorrect"
          ? "The code you entered is incorrect or expired. Please check and try again."
          : err.errors?.[0]?.message ?? "An unknown error occurred.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0f0f0f] text-white">
      {verifying ? (
        <form
          onSubmit={handleVerify}
          className="w-full max-w-md space-y-4 bg-[#1a1a1a] p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center">Verify your email</h2>
          <input
            type="text"
            placeholder="6‑digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full bg-[#2a2a2a] text-white border border-gray-700 p-3 rounded-xl placeholder-gray-400"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="bg-blue-600 text-white w-full p-3 rounded-xl hover:bg-blue-700 transition">
            Verify
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                await signUp.prepareEmailAddressVerification({
                  strategy: "email_code",
                });
                setError("A new code has been sent to your email.");
              } catch {
                setError("Could not resend. Try again later.");
              }
            }}
            className="text-sm text-blue-400 underline"
          >
            Resend code
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md space-y-4 bg-[#1a1a1a] p-8 rounded-2xl shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center">Create an account</h1>

          <input
            className="w-full bg-[#2a2a2a] text-white border border-gray-700 p-3 rounded-xl placeholder-gray-400"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full bg-[#2a2a2a] text-white border border-gray-700 p-3 rounded-xl placeholder-gray-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <input
            className="w-full bg-[#2a2a2a] text-white border border-gray-700 p-3 rounded-xl placeholder-gray-400"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Required placeholder: Clerk will mount the CAPTCHA here */}
          <div id="clerk-captcha"></div>

          <button className="bg-blue-600 text-white w-full p-3 rounded-xl hover:bg-blue-700 transition">
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline text-blue-400">
              Sign In
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;