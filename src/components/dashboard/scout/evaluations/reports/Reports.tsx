"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import Info from "./Info";
import { useGetScoutsPlayerDetails } from "@/hooks/scout";
import Swal from "sweetalert2";
import Comments from "./Comments";

const Reports = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const { data, loading, get: getPlayer } = useGetScoutsPlayerDetails();

  const navigateBack = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An error occurred. Please try again",
    });
    router.back();
  };

  useEffect(() => {
    if (id === null) {
      navigateBack();
    } else {
      getPlayer(id);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] grid place-content-center">
        <Loader color="primary.6" />
      </div>
    );
  }

  return (
    <div className="w-full flex gap-6 p-6">
      <div className="w-2/3">
        <Info data={data} />
      </div>
      <div className="w-1/3">
        <Comments comment={data?.scoutComments} />
      </div>

      {/* <div className="flex flex-col gap-6">
        <History />
        <Gallery />
        <Trending />
      </div> */}
    </div>
  );
};

export default Reports;
