import Home from "@/components/auth/SignUpSelect";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Choose your role",
};

export default function Onboarding() {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Home />
    </Suspense>
  )
}