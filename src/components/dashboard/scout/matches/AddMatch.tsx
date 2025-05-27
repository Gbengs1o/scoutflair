import { iAcademyResponse, useGetAcademies } from "@/hooks/academy";
import { useCreateMatch } from "@/hooks/match";
import { Loader } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useFormik } from "formik";
import { useGetLocalPitches } from "@/hooks/pitch";

interface AddMatchProps {
  currentAcademy: string;
  close: () => void;
  // Optional: to control visibility if this component is directly used as a modal
  isOpen?: boolean;
}

const AddMatch: FC<AddMatchProps> = ({ currentAcademy, close, isOpen }) => {
  const {
    loading: loadingAcademies,
    success: academiesSuccess,
    data: academies,
  } = useGetAcademies();

  const {
    loading: loadingPitches,
    // success: pitchesSuccess, // Not used, can be removed if not needed elsewhere
    data: pitches,
  } = useGetLocalPitches();

  const [home, setHome] = useState<iAcademyResponse | null>(null);
  const {
    loading: loadingCreation,
    success: createdMatch,
    create,
  } = useCreateMatch();

  useEffect(() => {
    if (!loadingCreation && createdMatch) {
      // Consider a more modern approach than reload, e.g., refetching data or using state management
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [loadingCreation, createdMatch]);

  useEffect(() => {
    if (!loadingAcademies && academiesSuccess && academies) {
      const foundHome = academies.find(
        (academy) => academy.name === currentAcademy
      );
      if (foundHome) {
        setHome(foundHome);
      }
    }
  }, [loadingAcademies, academiesSuccess, academies, currentAcademy]);

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        refree: "",
        competition: "",
        dateTime: "",
        away: "",
        pitch: "",
      },
      validate: (values) => {
        const errors: any = {};
        if (!values.refree) errors.refree = "Required";
        if (!values.competition) errors.competition = "Required";
        if (!values.dateTime) errors.dateTime = "Required";
        if (!values.away) errors.away = "Required";
        if (!values.pitch) errors.pitch = "Required";
        return errors;
      },
      onSubmit: (values) => {
        if (home !== null && academies) {
          const awayAcademy = academies.find(
            (academy) => academy.name === values.away
          );

          if (!awayAcademy) {
            console.error("Away academy not found"); // Or show a user-friendly error
            return;
          }

          const [datePart, timePart] = values.dateTime.split("T");
          if (!datePart || !timePart) {
            console.error("Invalid dateTime format"); // Or show a user-friendly error
            return;
          }

          create({
            awayTeam: awayAcademy.name,
            awayTeamLogoUrl: awayAcademy.imageUrl,
            competition: values.competition,
            dateTime: `${datePart} ${timePart}:00`, // Ensure time is correctly formatted
            homeTeam: home.name,
            homeTeamLogoUrl: home.imageUrl,
            referee: values.refree,
            pitch: values.pitch,
          });
        }
      },
    });

  // If this component is used as a modal, this conditional rendering is useful
  // if (isOpen === false) { // Check for explicit false if isOpen can be undefined
  //   return null;
  // }

  return (
    // This outer div would be the modal panel itself.
    // It's responsive: full width on small screens, max-width on larger screens, and centered.
    // Added overflow-y-auto and max-h for scrollability on small screens if content is long.
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8">
      {loadingAcademies || loadingPitches ? ( // Show loader if either is loading
        <div className="w-full h-60 flex flex-col items-center justify-center">
          <Loader color="primary.8" />
          <p className="mt-2 text-gray-600">Loading data...</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center justify-between pb-4 border-b border-gray-200">
            <h2 className="text-dark font-bold text-lg sm:text-xl">
              Add New Match
            </h2>
            <button
              type="button"
              onClick={close}
              className="text-gray-500 hover:text-dark transition-colors"
              aria-label="Close"
            >
              <IoMdCloseCircleOutline size={24} />
            </button>
          </div>

          <form
            method="POST"
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-y-4 md:gap-y-5" // Responsive gap
          >
            {/* Competition Name */}
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="competition"
                className="text-sm font-semibold text-[#333333]"
              >
                Competition Name
              </label>
              <input
                id="competition"
                type="text"
                name="competition"
                placeholder="E.g., Premier League U18"
                value={values.competition}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border bg-white placeholder:text-gray-400 text-dark text-sm sm:text-base font-medium placeholder:font-normal border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 h-10 px-3"
              />
              {errors.competition && touched.competition && (
                <p className="text-xs text-red-600">{errors.competition}</p>
              )}
            </div>

            {/* Competition Date */}
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="dateTime"
                className="text-sm font-semibold text-[#333333]"
              >
                Date & Time
              </label>
              <input
                id="dateTime"
                type="datetime-local"
                name="dateTime"
                value={values.dateTime}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border bg-white text-dark text-sm sm:text-base font-medium border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 h-10 px-3"
              />
              {errors.dateTime && touched.dateTime && (
                <p className="text-xs text-red-600">{errors.dateTime}</p>
              )}
            </div>

            {/* Name of Referee */}
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="refree"
                className="text-sm font-semibold text-[#333333]"
              >
                Name of Referee
              </label>
              <input
                id="refree"
                type="text"
                name="refree"
                placeholder="E.g., John Doe"
                value={values.refree}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border bg-white placeholder:text-gray-400 text-dark text-sm sm:text-base font-medium placeholder:font-normal border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 h-10 px-3"
              />
              {errors.refree && touched.refree && (
                <p className="text-xs text-red-600">{errors.refree}</p>
              )}
            </div>

            {/* Away Team */}
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="away"
                className="text-sm font-semibold text-[#333333]"
              >
                Away Team
              </label>
              <select
                id="away"
                name="away"
                value={values.away} // Controlled component
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border bg-white text-dark text-sm sm:text-base font-medium border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 h-10 px-3 appearance-none"
              >
                <option value="">Select Team</option>
                {academies &&
                  academies
                    .filter((f) => f.name !== currentAcademy)
                    .map((d) => (
                      <option key={d.id || d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
              </select>
              {errors.away && touched.away && (
                <p className="text-xs text-red-600">{errors.away}</p>
              )}
            </div>

            {/* Pitch */}
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="pitch"
                className="text-sm font-semibold text-[#333333]"
              >
                Pitch
              </label>
              <select
                id="pitch"
                name="pitch"
                value={values.pitch} // Controlled component
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-md border bg-white text-dark text-sm sm:text-base font-medium border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 h-10 px-3 appearance-none"
              >
                <option value="">Select Pitch</option>
                {pitches &&
                  pitches.map((d) => (
                    <option key={d.id || d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
              </select>
              {errors.pitch && touched.pitch && (
                <p className="text-xs text-red-600">{errors.pitch}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loadingCreation}
              className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 flex items-center justify-center rounded-lg text-white text-sm sm:text-base font-semibold h-11 sm:h-12 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loadingCreation ? (
                <Loader color="white" size="sm" />
              ) : (
                "Add Match"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddMatch;

// --- How you might use it in a parent component as a modal ---
// const ParentComponent = () => {
//   const [isAddMatchModalOpen, setIsAddMatchModalOpen] = useState(false);
//   const currentAcademyName = "My Current Academy"; // Example

//   return (
//     <div>
//       <button onClick={() => setIsAddMatchModalOpen(true)}>Add Match</button>

//       {isAddMatchModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           {/* The AddMatch component itself becomes the modal content panel */}
//           <div className="max-h-[90vh] overflow-y-auto"> {/* Added for scrollability of the modal content */}
//             <AddMatch
//               currentAcademy={currentAcademyName}
//               close={() => setIsAddMatchModalOpen(false)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };