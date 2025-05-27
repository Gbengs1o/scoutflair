"use client";

import React, { Suspense, useEffect, useCallback } from "react"; // Added useCallback
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import Info from "./Info";
import { useGetScoutsPlayerDetails } from "@/hooks/scout";
import Swal from "sweetalert2";
import Comments from "./Comments";
// Import other components if you plan to use them
// import History from "./History";
// import Gallery from "./Gallery";
// import Trending from "./Trending";

const Reports: React.FC = () => {
  return (
    // The Suspense fallback can be styled if needed, but Loader itself is usually small.
    // If you want the Loader centered in the same space as content,
    // the fallback might need similar padding/layout as the main content's loading state.
    // For now, a simple Loader is fine.
    <Suspense
      fallback={
        <div className="w-full h-[calc(100vh-4rem)] grid place-content-center p-3 sm:p-4 md:p-6">
          <Loader color="primary.6" />
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

  const { data, loading, error, get: getPlayer } = useGetScoutsPlayerDetails(); // Assuming error is also returned

  // useCallback for navigateBack to stabilize its reference for useEffect
  const navigateBack = useCallback(() => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An error occurred or the player ID is missing. Please try again.", // More specific message
    });
    router.back();
  }, [router]);

  useEffect(() => {
    if (id) {
      getPlayer(id);
    } else {
      // If ID is null/undefined immediately, navigate back.
      // This handles cases where the component mounts without an ID.
      navigateBack();
    }
  }, [id, getPlayer, navigateBack]); // Added id, getPlayer, navigateBack to dependencies

  // Handle error state from the hook if it exists
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load player data",
        text: error.message || "An unknown error occurred.", // Display error from hook
      });
      // Optionally navigate back or show an error message in place
      // router.back();
    }
  }, [error, router]);


  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] grid place-content-center p-3 sm:p-4 md:p-6"> {/* Responsive padding */}
        <Loader color="primary.6" size="lg" /> {/* Slightly larger loader */}
      </div>
    );
  }

  // If data is null after loading and no error (should ideally be handled by error state)
  // or if ID was invalid and getPlayer resulted in no data.
  if (!data && !loading) {
    return (
      <div className="w-full text-center py-10 px-3 sm:px-4 md:px-6">
        <p className="text-lg text-gray-600">Player data not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-6 p-3 sm:p-4 md:p-6"> {/* Responsive layout, gap, and padding */}
      {/* Main content column / Left column on larger screens */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4 lg:gap-6"> {/* Full width on mobile, 2/3 on lg. Added inner gap for potential multiple components */}
        <Info data={data} />
        {/* If you uncomment these, they will stack within this column: */}
        {/* <History /> */}
        {/* <Gallery /> */}
      </div>

      {/* Sidebar / Right column on larger screens */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-6"> {/* Full width on mobile, 1/3 on lg. Added inner gap */}
        <Comments comment={data?.scoutComments} />
        {/* If you uncomment this, it will stack within this column: */}
        {/* <Trending /> */}
      </div>
    </div>
  );
};

export default Reports;