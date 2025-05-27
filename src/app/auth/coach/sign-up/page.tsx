import CoachSignUp from "@/components/auth/coach/CoachSignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coach Sign Up",
};

export default function Onboarding() {
  return <CoachSignUp />;
}