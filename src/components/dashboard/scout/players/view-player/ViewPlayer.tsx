"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "@mantine/core"; // Assuming Mantine is set up
import Banner from "./Banner";
import Bio from "./Bio";
import Posts from "@/components/reusable/post/Posts";
import { useGetPlayerByEmail, iPlayerResponse } from "@/hooks/player"; // Ensure iPlayerResponse is exported or accessible

// Fallback component for Suspense
const PageLoader = () => (
  <div className="w-full h-screen flex justify-center items-center">
    <Loader color="primary" /> {/* Use your theme's primary color if defined */}
  </div>
);

const ViewPlayer = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <ViewPlayerContent />
    </Suspense>
  );
};

const ViewPlayerContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const playerEmail: string | null = searchParams.get("email");

  // Ensure useGetPlayerByEmail hook initializes `data` appropriately (e.g., to null or a default structure)
  // and that `get` is stable (e.g., memoized with useCallback)
  const { loading, data, success, get, error } = useGetPlayerByEmail();

  useEffect(() => {
    if (playerEmail) {
      get(playerEmail);
    } else if (playerEmail === null) {
      // If email param is explicitly not there, go back.
      // This handles the case where ?email= is missing entirely.
      // console.warn("Player email missing from query parameters.");
      router.back();
    }
    // Dependencies:
    // - playerEmail: to refetch if it changes (e.g. client-side navigation to a different player)
    // - get: the function to fetch data (should be stable from the hook)
    // - router: for navigation (stable from Next.js)
  }, [playerEmail, get, router]);

  // Handle loading state
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[calc(100vh-200px)] p-4">
        <Loader color="primary" />
      </div>
    );
  }

  // Handle error state or no data after loading
  if (error || (!loading && !data && playerEmail)) { // playerEmail check ensures we expected data
    return (
      <div className="w-full text-center p-4 sm:p-6">
        <p className="text-lg text-red-600 mb-2">
          {error ? "Error loading player data." : "Player not found or data is unavailable."}
        </p>
        {error && <p className="text-sm text-gray-500 mb-4">{typeof error === 'string' ? error : 'An unexpected error occurred.'}</p>}
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // If playerEmail was null initially and router.back() was called,
  // this component might unmount before rendering further.
  // If data is still null/undefined here but no error/loading, it means playerEmail was invalid or fetch failed silently.
  // The above error block should catch most cases. If data is truly expected, we proceed.
  if (!data) {
     // This state should ideally be covered by loading or error states.
     // If router.back() has been called, this part might not even render.
     // If playerEmail was valid but `data` is still null and not loading, implies an issue.
    return (
      <div className="w-full text-center p-4 sm:p-6">
        <p className="text-lg text-gray-700">Waiting for player data...</p>
        {/* Or redirect if playerEmail is truly invalid and wasn't caught */}
      </div>
    );
  }


  // At this point, `data` should be valid `iPlayerResponse` and `playerEmail` a valid string
  return (
    <div className="w-full flex flex-col 
                   gap-4 p-3 
                   sm:p-4 sm:gap-5 
                   md:p-6 md:gap-6"> {/* Responsive padding and gap */}
      <Banner data={data} />

      {/* Container for Bio and Posts */}
      <div className="w-full flex flex-col gap-4 
                     sm:gap-5 
                     md:gap-6 
                     lg:grid lg:grid-cols-[1fr_2fr] lg:gap-6"> {/* Stacked by default, grid on lg+ */}
        
        {/* Bio Section - sticky on large screens */}
        <div className="lg:sticky lg:top-6 lg:self-start"> 
          {/* `lg:self-start` ensures it doesn't stretch if the other column is taller */}
          {/* `top-6` (1.5rem) for spacing from viewport top when sticky. Adjust if you have a global sticky navbar. */}
          <Bio data={data} />
        </div>

        {/* Posts Section */}
        <div> {/* This div wrapper ensures Posts takes the second grid column on lg+ */}
          {/* playerEmail is asserted as non-null because previous checks ensure it's valid if we reach here */}
          <Posts playerEmail={playerEmail!} />
        </div>
      </div>
    </div>
  );
};

export default ViewPlayer;