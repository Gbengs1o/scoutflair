"use client";

import React, { Suspense, useEffect, useCallback } from "react"; // Added useCallback
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import Info from "./Info";
import KeyMetrics from "./KeyMetrics";
import SkillMetrics from "./Skill"; // Assuming SkillMetrics is the correct import for "./Skill"
import Traits from "./Traits";
import { useGetScoutsPlayerDetails } from "@/hooks/scout";
import Swal from "sweetalert2";
// Import other components if you uncomment them later
// import Clips from "./Clips";
// import Badges from "./Badges";

const Statistics: React.FC = () => {
  return (
    <Suspense
      fallback={ // Provide a fallback UI that matches the loading state in Content
        <div className="w-full h-[calc(100vh-4rem)] grid place-content-center p-3 sm:p-4 md:p-6">
          <Loader color="primary.6" size="lg" />
        </div>
      }
    >
      <Content />
    </Suspense>
  );
};

const Content: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  // Assuming your hook might also return an error state
  const { data, loading, error, get: getPlayer } = useGetScoutsPlayerDetails();

  // Memoize navigateBack to stabilize its reference for useEffect
  const navigateBack = useCallback((message?: string) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message || "An error occurred. Please try again.",
    });
    router.back();
  }, [router]);

  useEffect(() => {
    // Only attempt to fetch if id is a non-empty string
    if (typeof id === 'string' && id.trim() !== '') {
      getPlayer(id);
    } else if (id === null && !loading) {
      // If id is explicitly null (param not present) and we are not already loading something else, navigate back.
      // This handles the case where the page is accessed without an ID.
      navigateBack("Player ID is missing. Redirecting back.");
    }
  }, [id, getPlayer, navigateBack, loading]); // Corrected dependencies

  // Handle API errors
  useEffect(() => {
    if (error) {
      navigateBack(error.message || "Failed to load player data.");
    }
  }, [error, navigateBack]);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] grid place-content-center p-3 sm:p-4 md:p-6"> {/* Responsive padding */}
        <Loader color="primary.6" size="lg" /> {/* Consistent loader size */}
      </div>
    );
  }

  // If ID was invalid or data fetch failed silently after loading,
  // and not caught by the error effect.
  if (!data && !loading) {
    return (
      <div className="w-full text-center py-10 px-3 sm:px-4 md:px-6">
        <p className="text-lg text-gray-600">Player data not found for the given ID.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }


  return (
    // Main layout: stacks on mobile, two columns on lg+
    <div className="w-full flex flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]
                   gap-4 md:gap-6 p-3 sm:p-4 md:p-6"> {/* Responsive gap and padding */}

      {/* Left Column */}
      <div className="flex flex-col gap-4 md:gap-6 w-full"> {/* Responsive gap within column */}
        <Info data={data} />
        <KeyMetrics data={data} />
        {/* <Clips /> */} {/* If you re-enable Clips, ensure it's also responsive */}
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-4 md:gap-6 w-full"> {/* Responsive gap within column */}
        {/* <Badges /> */} {/* If you re-enable Badges, ensure it's also responsive */}
        <SkillMetrics data={data} />
        <Traits data={data} />
      </div>
    </div>
  );
};

export default Statistics;