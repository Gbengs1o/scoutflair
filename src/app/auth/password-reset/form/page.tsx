import PasswordResetForm from "@/components/auth/PasswordResetForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Link Sent",
};

export default function Onboarding() {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <PasswordResetForm />
    </Suspense>
  );
}