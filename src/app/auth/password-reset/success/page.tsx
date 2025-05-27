import PasswordResetSuccess from "@/components/auth/PasswordResetSuccess";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Link Sent",
};

export default function Onboarding() {
  return <PasswordResetSuccess />;
}