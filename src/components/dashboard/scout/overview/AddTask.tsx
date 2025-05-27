import React, { FC, useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Modal, Loader } from "@mantine/core";
import { useGetPlayerNamesList } from "@/hooks/player"; // Assuming these hooks are correctly set up
import { useCreateScoutTask } from "@/hooks/scout";   // Assuming these hooks are correctly set up
import Swal from "sweetalert2";

// Dummy hook implementations for standalone testing if needed
// const useGetPlayerNamesList = () => ({
//   loading: false,
//   data: [
//     { playerUserId: 1, fullName: "Player One" },
//     { playerUserId: 2, fullName: "Player Two" },
//     { playerUserId: 3, fullName: "Player Three" },
//   ],
// });
// const useCreateScoutTask = () => ({
//   loading: false,
//   success: false,
//   create: (id: number) => console.log("Create task for player ID:", id),
//   data: null,
// });


const AddTask: FC<{ close: () => void }> = ({ close }) => {
  const { loading: loadingPlayers, data: playersData } = useGetPlayerNamesList();
  const [playerId, setPlayerId] = useState<number>(-1);
  const {
    loading: loadingCreation,
    success: createdTask,
    create,
    data: errorData, // Renamed to avoid conflict with playersData if in same scope (though not here)
  } = useCreateScoutTask();

  useEffect(() => {
    if (loadingCreation) return; // Don't show alerts while still loading

    if (createdTask) {
      Swal.fire({
        title: "Success!",
        text: "Task created successfully!",
        icon: "success",
        timer: 1500, // Auto close after 1.5s
        showConfirmButton: false,
      }).then(() => { // Use promise for more reliable closing
        close();
      });
    } else if (errorData) { // Check if errorData exists to avoid firing on initial render
      const message =
        errorData?.response?.data?.message ?? "An error occurred while creating the task.";
      Swal.fire({
        title: "Oops...",
        text: message,
        icon: "error",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCreation, createdTask, errorData, close]); // Added errorData and close to deps

  return (
    <Modal.Root
      opened={true}
      onClose={close}
      centered
      padding={0} // We'll handle padding inside Modal.Body's child
      radius="lg" // Mantine's lg radius (16px)
      // Responsive modal size:
      // - base: 95% of viewport width, good for small mobile
      // - sm (640px Tailwind breakpoint): 500px width
      // - md (768px Tailwind breakpoint): 600px width
      size={{ base: '95%', sm: 500, md: 600 }}
      // Optional: Add transition
      transitionProps={{ transition: 'pop', duration: 200 }}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          {/* Adjusted padding for responsiveness: p-4 on smallest, p-6 on sm+, p-8 on md+ */}
          <div className="w-full bg-white p-4 sm:p-6 md:p-8">
            {loadingPlayers && (
              <div className="w-full h-40 grid place-content-center">
                <Loader color="primary.8" /> {/* Ensure primary.8 is defined in your Mantine theme */}
              </div>
            )}
            {!loadingPlayers && playersData && ( // Added check for playersData
              <div className="w-full flex flex-col gap-4 md:gap-6"> {/* Slightly larger gap on md+ screens */}
                <div className="w-full flex items-center justify-between">
                  <div>
                    {/*
                      Assuming text-16-19 and text-12-14 are custom.
                      Consider using Tailwind's standard responsive text sizes for better control,
                      e.g., text-lg sm:text-xl for title, text-sm for subtitle.
                      If your custom classes are already responsive, keep them.
                    */}
                    <h2 className="text-dark font-bold text-base sm:text-lg md:text-xl">
                      {/* Replaced text-16-19 with standard Tailwind for demo */}
                      Add New Task
                    </h2>
                    <p className="text-placeholder text-xs sm:text-sm">
                      {/* Replaced text-12-14 with standard Tailwind for demo */}
                      Add a new player to your scouting plan
                    </p>
                  </div>
                  <IoMdCloseCircleOutline
                    onClick={close}
                    className="cursor-pointer text-dark hover:text-gray-700 transition-colors"
                    size={24} // You can make this responsive too if needed: size={window.innerWidth < 640 ? 20 : 24} or use CSS
                  />
                </div>

                <select
                  value={playerId}
                  onChange={(e) => {
                    setPlayerId(Number.parseInt(e.target.value));
                  }}
                  // text-14-16 could be text-sm or text-base.
                  // Added focus rings for accessibility
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option
                    value={-1}
                    // text-16-19 might be too large for an option on mobile. text-sm or text-base is common.
                    className="cursor-pointer text-sm sm:text-base text-dark font-semibold"
                  >
                    Select a player
                  </option>
                  {playersData.map((player, i) => (
                    <option
                      key={i}
                      value={player.playerUserId}
                      className="cursor-pointer text-sm sm:text-base text-dark font-semibold"
                    >
                      {player.fullName}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    if (playerId !== -1) {
                      create(playerId);
                    }
                  }}
                  disabled={loadingCreation || playerId === -1} // Disable button when loading or no player selected
                  // text-14-24 for button text (font-size/line-height?)
                  // Using standard Tailwind text size text-sm or text-base
                  className="w-full bg-primary-2 grid place-content-center rounded-lg text-white text-sm sm:text-base font-medium h-12 transition-colors hover:bg-primary-3 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {loadingCreation ? (
                    <Loader color="white" size="sm" /> /* Mantine loader white, size sm */
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            )}
            {!loadingPlayers && !playersData && ( // Handle case where playersData is null/undefined after loading
                <div className="w-full h-40 grid place-content-center text-placeholder">
                    No players available or failed to load.
                </div>
            )}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AddTask;