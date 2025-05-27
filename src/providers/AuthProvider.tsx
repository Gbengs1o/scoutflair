"use client";
import { useEffect } from "react";

import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode"; // Import JwtPayload for type safety
import { usePathname, useRouter } from "next/navigation";

import Swal from "sweetalert2";

// Define a type for your decoded token if you know its structure
interface MyTokenPayload extends JwtPayload {
  // add other custom claims here if you have them
  // e.g., userId: string;
}

export const useToken = () => {
  const getToken = () => Cookies.get("scoutflair-token");

  const setToken = (token: string) => {
    try {
      const decoded = jwtDecode<MyTokenPayload>(token);
      let expiryDate: Date | undefined;
      if (decoded.exp) {
        expiryDate = new Date(decoded.exp * 1000);
      }

      Cookies.set("scoutflair-token", token, {
        expires: expiryDate,
        secure: process.env.NODE_ENV === 'production', // More secure: only set secure flag in production
        sameSite: "strict",
      });
    } catch (error) {
      console.error("Failed to decode or set token:", error);
      // Handle invalid token, e.g., by not setting it or removing an old one
    }
  };

  const removeToken = () => {
    Cookies.remove("scoutflair-token");
  };

  return { getToken, setToken, removeToken };
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const { getToken } = useToken();

  useEffect(() => {
    // Wait until pathName is available
    if (pathName === null) {
      return; // pathName is not yet available, useEffect will re-run when it is
    }

    const pathSegments = pathName.split("/"); // e.g. for "/dashboard/scout", segments = ["", "dashboard", "scout"]

    const determineIndex = () => {
      if (pathSegments.length > 2) { // Ensure there's a segment at index 2
        const current = pathSegments[2];
        switch (current) {
          case "scout":
            return 0;
          case "player":
            return 1;
          case "coach":
            return 2;
        }
      }
      return -1;
    };

    const isDashboardPage = () => {
      // A dashboard page would be like "/dashboard/..."
      // So, pathSegments[1] should be "dashboard"
      if (pathSegments.length > 1) {
        return pathSegments[1] === "dashboard";
      }
      return false; // Not enough segments to be a dashboard page
    };

    const pageUserTypeIndex = determineIndex();
    const token = getToken();

    // If it IS a dashboard page, AND it's one of the specific types (scout, player, coach), AND no token exists
    if (isDashboardPage() && pageUserTypeIndex !== -1 && token === undefined) {
      Swal.fire({
        title: "Oops...",
        text: `Please login to continue`,
        icon: "error",
      });
      router.push("/auth/login?redirect=true");
    }
  }, [pathName, router, getToken]); // Add dependencies

  return <>{children}</>;
}