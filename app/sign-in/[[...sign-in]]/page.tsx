"use client";

import GoogleBtn from "@/components/GoogleBtn";
import { handleGoogleSignIn, handleSignInSubmit } from "@/utils/authentication";
import { useSignIn } from "@clerk/nextjs";
import React, { useState } from "react";
import type { SignInResource } from "@clerk/types";
import Link from "next/link";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn, setActive, isLoaded } = useSignIn();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0f0f0f] text-white">
      <form onSubmit={(e) =>
          handleSignInSubmit(
            email,
            password,
            signIn as SignInResource | null,
            setError,
            isLoaded,
            setActive,
            e
          )
        } className="w-full max-w-md space-y-4 bg-[#1a1a1a] p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Welcome back</h1>
        {/* Google Sign In Button with custom function in utils folder */}
        <div className="flex items-center justify-center mt-4 mb-8">
          <button
            onClick={() =>
              handleGoogleSignIn(isLoaded, signIn as SignInResource | undefined)
            }
          >
            Google Sign In
          </button>
          {/* This way is with clerk elements */}
          <GoogleBtn />
        </div>
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
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {/* Required placeholder: Clerk will mount the CAPTCHA here */}
        <div id="clerk-captcha"></div>
        <button className="bg-blue-600 text-white w-full p-3 rounded-xl hover:bg-blue-700 transition">
          Sign In
        </button>
        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="underline text-blue-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;