"use client";

import React, { FC, useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Modal, Loader } from "@mantine/core";
import { useGetPlayerNamesList } from "@/hooks/player";
import { useCreateScoutTask } from "@/hooks/scout";
import Swal from "sweetalert2";

const AddTask: FC<{ close: () => void }> = ({ close }) => {
  const { loading: loadingPlayers, data } = useGetPlayerNamesList();
  const [playerId, setPlayerId] = useState<number>(-1);
  const {
    loading: loadingCreation,
    success: createdTask,
    create,
    data: error,
  } = useCreateScoutTask();

  useEffect(() => {
    // This effect should only run after the creation attempt
    if (loadingCreation) return;

    if (createdTask) {
      Swal.fire({
        title: "Success!",
        text: "Task created successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(close, 1500);
    } else if (error) {
      // Check if there's an error object to show a message
      const message = error?.response?.data?.message ?? "An error occurred.";
      Swal.fire({
        title: "Oops...",
        text: message,
        icon: "error",
      });
    }
  }, [loadingCreation, createdTask, error, close]);

  return (
    <Modal.Root
      opened={true}
      onClose={close}
      centered
      padding={0}
      size="md" // Let Mantine handle responsive sizing
      radius={16}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          <div className="w-full bg-white p-4 sm:p-6 md:p-8">
            {loadingPlayers ? (
              <div className="w-full h-40 grid place-content-center">
                <Loader color="primary.8" />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-5">
                <div className="w-full flex items-start justify-between">
                  <div>
                    <h2 className="text-dark font-bold text-lg">
                      Add New Task
                    </h2>
                    <p className="text-placeholder text-sm mt-1">
                      Add a new player to your scouting plan
                    </p>
                  </div>
                  <button onClick={close} aria-label="Close modal">
                    <IoMdCloseCircleOutline
                      className="cursor-pointer text-dark"
                      size={24}
                    />
                  </button>
                </div>

                <select
                  value={playerId}
                  onChange={(e) => setPlayerId(Number(e.target.value))}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 px-3 focus:ring-2 focus:ring-primary-2 focus:border-transparent outline-none"
                >
                  <option
                    value={-1}
                    disabled
                    className="cursor-pointer text-dark font-semibold"
                  >
                    Select a player
                  </option>
                  {data?.map((player) => (
                    <option
                      key={player.playerUserId}
                      value={player.playerUserId}
                      className="cursor-pointer text-dark font-semibold"
                    >
                      {player.fullName}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => playerId !== -1 && create(playerId)}
                  disabled={playerId === -1 || loadingCreation}
                  className="w-full bg-primary-2 grid place-content-center rounded-lg text-white text-base font-semibold h-12 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loadingCreation ? (
                    <Loader color="white" size="sm" />
                  ) : (
                    "Add Task"
                  )}
                </button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AddTask;