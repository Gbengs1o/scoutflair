import ScoutSignUp from "@/components/auth/scout/ScoutSignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scout Sign Up",
};

export default function Onboarding() {
  return <ScoutSignUp />;
}