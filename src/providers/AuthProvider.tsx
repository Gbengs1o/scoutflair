"use client";
import { useEffect } from "react";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";

import Swal from "sweetalert2";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const determineIndex = () => {
    const current = pathName.split("/")[2];
    switch (current) {
      case "scout":
        return 0;
      case "player":
        return 1;
      case "coach":
        return 2;
    }

    return -1;
  };

  const page = determineIndex();
  const router = useRouter();

  const { getToken } = useToken();

  const isOtherPage = () => {
    const current = pathName.split("/")[1];
    return current !== "dashboard";
  };

  useEffect(() => {
    const token = getToken();
    if (!isOtherPage() && page !== -1 && token === undefined) {
      Swal.fire({
        title: "Oops...",
        text: `Please login to continue`,
        icon: "error",
      });
      router.push("/auth/login?redirect=true");
    }
  }, [router]);

  return <>{children}</>;
}

export const useToken = () => {
  const getToken = () => Cookies.get("scoutflair-token");
  const setToken = (token: string) => {
    const decoded = jwtDecode(token);
    let expiryDate: Date | undefined;
    if (decoded.exp) {
      expiryDate = new Date(decoded?.exp * 1000);
    }

    Cookies.set("scoutflair-token", token, {
      expires: expiryDate,
      secure: true,
      sameSite: "strict",
    });
  };
  const removeToken = () => {
    Cookies.remove("scoutflair-token");
  };

  return { getToken, setToken, removeToken };
};
