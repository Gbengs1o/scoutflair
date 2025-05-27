import LoginPage from "@/components/auth/login/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
};

export default function Onboarding() {
  return <LoginPage />;
}