"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import Swal from "sweetalert2";

// Assuming these components are in the same directory or correctly imported
import Info from "./Info";
import KeyMetrics from "./KeyMetrics";
import SkillMetrics from "./Skill";
import Traits from "./Traits";

import { useGetScoutsPlayerDetails } from "@/hooks/scout";

const Statistics = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Changed dependency to `id` for better hook behavior

  // The full-screen loader remains. The components below will only render
  // once loading is false, which is the desired behavior.
  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] grid place-content-center">
        <Loader color="primary.6" />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[2fr_1fr]">
      {/* Left Column (stacks on top on mobile) */}
      <div className="flex flex-col gap-6 w-full">
        {/* Pass `isLoading` prop to children */}
        <Info data={data} isLoading={loading} />
        <KeyMetrics data={data} isLoading={loading} />
      </div>

      {/* Right Column (stacks below on mobile) */}
      <div className="flex flex-col gap-6 w-full">
        {/* Pass `isLoading` prop to children */}
        <SkillMetrics data={data} isLoading={loading} />
        <Traits data={data} isLoading={loading} />
      </div>
    </div>
  );
};

export default Statistics;