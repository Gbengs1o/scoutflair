"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "@mantine/core";
import Banner from "./Banner";
import Bio from "./Bio";
import Posts from "@/components/reusable/post/Posts";
import { useGetPlayerByEmail } from "@/hooks/player";

const ViewPlayer = () => {
  return (
    // The main page uses Suspense for the data-dependent part
    <Suspense
      fallback={
        <div className="w-full grid place-content-center h-screen">
          <Loader color="primary.6" size="lg" />
        </div>
      }
    >
      <ViewPlayerContent />
    </Suspense>
  );
};

const ViewPlayerContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const playerEmail = searchParams.get("email");
  const { loading, data, get } = useGetPlayerByEmail();

  useEffect(() => {
    if (!playerEmail) {
      // If no email is found, go back to the previous page
      router.back();
    } else {
      get(playerEmail);
    }
    // `get` and `router` are stable, but included for hook dependency completeness
  }, [playerEmail, get, router]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6">
      <Banner data={data} />
      {/* Responsive Layout: Stacks on mobile, grid on large screens */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-6">
        {/* Sticky behavior only enabled on large screens */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Bio data={data} />
        </div>
        {/* Ensure playerEmail is not null before passing to Posts */}
        {playerEmail && <Posts playerEmail={playerEmail} />}
      </div>
    </div>
  );
};

export default ViewPlayer;