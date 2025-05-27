import SignUpSuccessPage from "@/components/auth/SignUpSuccess";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Successful",
};

export default function Onboarding() {
  return <SignUpSuccessPage />;
}