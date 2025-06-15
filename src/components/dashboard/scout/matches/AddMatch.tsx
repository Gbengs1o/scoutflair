import { iAcademyResponse, useGetAcademies } from "@/hooks/academy";
import { useCreateMatch } from "@/hooks/match";
import { Loader } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { useFormik } from "formik";
import { useGetLocalPitches } from "@/hooks/pitch";

const AddMatch: FC<{ currentAcademy: string; close: () => void }> = ({
  currentAcademy,
  close,
}) => {
  const {
    loading: loadingAcademies,
    success: academiesSuccess,
    data: academies,
  } = useGetAcademies();

  const {
    loading: loadingPitches,
    success: pitchesSuccess,
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
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [loadingCreation, createdMatch]);

  useEffect(() => {
    if (!loadingAcademies && academiesSuccess) {
      for (let i = 0; i < academies.length; ++i) {
        if (currentAcademy === academies[i].name) {
          setHome(academies[i]);
          break;
        }
      }
    }
  }, [loadingAcademies, academiesSuccess]);

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

        if (!values.refree) {
          errors.refree = "Required";
        }

        if (!values.competition) {
          errors.competition = "Required";
        }

        if (!values.dateTime) {
          errors.dateTime = "Required";
        }

        if (!values.away) {
          errors.away = "Required";
        }

        if (!values.pitch) {
          errors.pitch = "Required";
        }

        return errors;
      },
      onSubmit: (values) => {
        if (home !== null) {
          let away = undefined;
          for (let i = 0; i < academies.length; ++i) {
            if (academies[i].name === values.away) {
              away = academies[i];
              break;
            }
          }

          if (away === undefined) return;

          const s = values.dateTime.split("T");

          create({
            awayTeam: away.name,
            awayTeamLogoUrl: away.imageUrl,
            competition: values.competition,
            dateTime: [s[0], `${s[1]}:00`].join(" "),
            homeTeam: home.name,
            homeTeamLogoUrl: home.imageUrl,
            referee: values.refree,
            pitch: values.pitch,
          });
        }
      },
    });

  return (
    <div className="w-full bg-white px-8 py-6">
      {loadingAcademies && (
        <div className="w-full h-40 grid place-content-center">
          <Loader color="primary.8" />
        </div>
      )}
      {!loadingAcademies && (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-dark font-bold text-16-19">Add New Match</h2>
            <IoMdCloseCircleOutline
              onClick={close}
              className="cursor-pointer text-dark"
              size={24}
            />
          </div>

          <form
            method="POST"
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Competition Name
              </h2>
              <input
                type="text"
                name="competition"
                placeholder=""
                value={values.competition}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.competition && touched.competition && (
                <p className="text-8-9 text-red-600">{errors.competition}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Competition Date
              </h2>
              <input
                type="datetime-local"
                name="dateTime"
                placeholder=""
                value={values.dateTime}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.dateTime && touched.dateTime && (
                <p className="text-8-9 text-red-600">{errors.dateTime}</p>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Name of Refree
              </h2>
              <input
                type="text"
                name="refree"
                placeholder=""
                value={values.refree}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.refree && touched.refree && (
                <p className="text-8-9 text-red-600">{errors.refree}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Away Team
              </h2>
              <select
                name="away"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={""}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              >
                <option value="">Select Team</option>
                {academies
                  .filter((f, _) => f.name !== currentAcademy)
                  .map((d, i) => (
                    <option key={i} value={d.name}>
                      {d.name}
                    </option>
                  ))}
              </select>
              {errors.away && touched.away && (
                <p className="text-8-9 text-red-600">{errors.away}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">Pitch</h2>
              <select
                name="pitch"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={""}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              >
                <option value="">Select Pitch</option>
                {pitches.map((d, i) => (
                  <option key={i} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.pitch && touched.pitch && (
                <p className="text-8-9 text-red-600">{errors.pitch}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary-2 grid place-content-center rounded-lg text-white text-14-24 h-12"
            >
              {loadingCreation ? <Loader color="white.6" /> : "Add Match"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddMatch;
