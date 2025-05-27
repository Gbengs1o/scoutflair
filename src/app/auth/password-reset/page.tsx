import PasswordResetPage from "@/components/auth/PassworResetPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset your password",
};

export default function Onboarding() {
  return <PasswordResetPage />;
}