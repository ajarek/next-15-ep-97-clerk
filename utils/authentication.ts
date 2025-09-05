import type { SetActive, SignInResource } from "@clerk/types";
import { Dispatch, FormEvent, SetStateAction } from "react";

export const handleGoogleSignIn = async (
  isLoaded: boolean,
  signIn: SignInResource | undefined
) => {
  if (!isLoaded || !signIn) return;
  console.log("Attempting Google Sign In");
  try {
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/dashboard",
      redirectUrlComplete: "/dashboard",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Google Sign In failed:", error.message);
    } else {
      console.error("Google Sign In failed:", error);
    }
  }
};

export const handleSignInSubmit = async (
  email: string,
  password: string,
  signIn: SignInResource | null,
  setError: Dispatch<SetStateAction<string>>,
  isLoaded: boolean,
  setActive: SetActive | undefined,
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  console.log("Sign in submitted");

  if (!isLoaded || !signIn) return;

  try {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    const attempt = await signIn.create({
      identifier: email,
      password,
    });

    if (attempt.status === "complete") {
      if (attempt.createdSessionId) {
        if (setActive) {
          await setActive({ session: attempt.createdSessionId });
          window.location.href = "/dashboard"; // Redirect to dashboard after successful sign-in
        } else {
          setError("setActive is undefined.");
        }
      } else {
        setError("Session ID is missing.");
      }
    } else {
      console.warn("Additional steps needed:", attempt);
    }
  } catch (err: unknown) {
    console.error("Sign-in error:", err);
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unknown error occurred.");
    }
  }
};