"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  useCurrentUserStore,
} from "../stores/userStore";

import { useRouter } from "next/navigation";
import { Loader } from "@mantine/core";
import Swal from "sweetalert2";

export default function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathName = usePathname();
  const router = useRouter();
  const userRole = useCurrentUserStore((state) => state.role);

  const [showChildren, shouldShowChildren] = useState<boolean>(true);


  useEffect(() => {
    if (userRole === "") return;

    const type = determineUser();
    const canViewPage: boolean = isOtherPage() || ((type === 0 && userRole === "PLAYER") || (type === 1 && userRole === "SCOUT"));
    if (!canViewPage) {
      shouldShowChildren(false);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "You do not have permissions to view this page"
      });
      router.back();
    }
  }, [userRole, router]);


  const isOtherPage = () => {
    const current = pathName.split("/")[1];
    return current !== "dashboard";
  }

  const determineUser = () => {
    const current = pathName.split("/")[2];
    if (current === "player") {
      return 0;
    } else if (current === "scout") {
      return 1;
    }
    return -1;
  };


  if (!showChildren) {
    return <> </>
  }

  return <>{children}</>;
}
