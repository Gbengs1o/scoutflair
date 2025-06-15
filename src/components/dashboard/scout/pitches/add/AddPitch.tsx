"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { useFormik } from "formik";
import { useCreateLocalPitch } from "@/hooks/pitch";
import { useUploadLogo } from "@/hooks/common";
import { Loader } from "@mantine/core";
import { facilitiesRatings, surfaceAreas } from "@/constants/constants";

const AddPitch = () => {
  const { loading, create, success } = useCreateLocalPitch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileImageData, setFileImageData] = useState<string>("");

  const {
    upload,
    data,
    loading: uploadingLogo,
    success: uploadedLogo,
  } = useUploadLogo();

  const {
    errors,
    touched,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      address: "",
      longitude: "",
      latitude: "",
      facilities: "",
      pitchLength: "",
      width: "",
      year: "",
      surface: "",
      rating: "",
      state: "",
      lga: "",
      file: "",
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.address) {
        errors.address = "Required";
      }

      if (!values.longitude) {
        errors.longitude = "Required";
      }

      if (!values.latitude) {
        errors.latitude = "Required";
      }

      if (!values.facilities) {
        errors.facilities = "Required";
      }

      if (!values.pitchLength) {
        errors.pitchLength = "Required";
      }

      if (!values.width) {
        errors.width = "Required";
      }

      if (!values.year) {
        errors.year = "Required";
      }

      if (!values.surface) {
        errors.surface = "Required";
      }

      if (!values.rating) {
        errors.rating = "Required";
      }

      if (!values.state) {
        errors.state = "Required";
      }

      if (!values.lga) {
        errors.lga = "Required";
      }

      if (file === null) {
        errors.file = "Required";
      }

      return errors;
    },
    onSubmit: (values, object) => {
      upload(file!);
    },
  });

  useEffect(() => {
    if (!uploadingLogo && uploadedLogo) {
      create({
        address: values.address,
        facilities: values.facilities,
        latitude: values.latitude,
        length: values.pitchLength,
        lga: values.lga,
        longitude: values.longitude,
        name: values.name,
        state: values.state,
        surface: values.surface,
        width: values.width,
        estYear: values.year,
        rating: values.rating,
        imageUrl: data,
      });
    }
  }, [uploadingLogo, uploadedLogo]);

  useEffect(() => {
    if (!loading && success) {
      window.location.replace("/dashboard/scout/pitches");
    }
  }, [loading, success]);

  return (
    // CHANGE 1: Reduced padding on mobile for the main container
    <div className="w-full p-4 md:p-6">
      <form method="POST" onSubmit={handleSubmit}>
        {/* CHANGE 1 (cont.): Reduced padding on mobile for the card */}
        <div className="w-full p-4 md:p-6 flex flex-col gap-6 bg-white shadow-custom rounded-[1rem]">
          <h2 className="text-16-19 text-primary-2 font-semibold">
            Add Local Pitch
          </h2>

          <div>
            <div
              onClick={() => fileRef.current?.click()}
              className={`w-full h-40 ${
                file !== null
                  ? "bg-cover bg-center"
                  : "border-2 border-primary-2 border-dashed"
              } rounded-lg overflow-hidden cursor-pointer flex flex-col justify-center items-center gap-2`}
            >
              {file !== null ? (
                <img
                  src={fileImageData}
                  alt=""
                  className="object-cover w-full h-full"
                />
              ) : (
                <>
                  <FaImage className="text-primary-2 text-2xl" />
                  <p className="text-14-16 font-medium text-primary-2">
                    Upload pitch image
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      setFile(file);
                      setFileImageData(reader.result as string);
                    };
                  }
                }}
              />
            </div>
            {errors.file && touched.name && (
              <p className="text-8-9 text-red-600">{errors.file}</p>
            )}
          </div>
          {/* CHANGE 2: Grid is now 1 column on mobile, and 2 columns on medium screens and up */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Pitch Name
              </h2>
              <input
                type="text"
                name="name"
                placeholder=""
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.name && touched.name && (
                <p className="text-8-9 text-red-600">{errors.name}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Address
              </h2>
              <input
                type="text"
                name="address"
                placeholder=""
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.address && touched.address && (
                <p className="text-8-9 text-red-600">{errors.address}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">State</h2>
              <input
                type="text"
                name="state"
                placeholder=""
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.state && touched.state && (
                <p className="text-8-9 text-red-600">{errors.state}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">LGA</h2>
              <input
                type="text"
                name="lga"
                placeholder=""
                value={values.lga}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.lga && touched.lga && (
                <p className="text-8-9 text-red-600">{errors.lga}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Latitude
              </h2>
              <input
                type="text"
                name="latitude"
                placeholder=""
                value={values.latitude}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("latitude", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.latitude && touched.latitude && (
                <p className="text-8-9 text-red-600">{errors.latitude}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Longitude
              </h2>
              <input
                type="text"
                name="longitude"
                placeholder=""
                value={values.longitude}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("longitude", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.longitude && touched.longitude && (
                <p className="text-8-9 text-red-600">{errors.longitude}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Length (in metres)
              </h2>
              <input
                type="text"
                name="pitchLength"
                placeholder=""
                value={values.pitchLength}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("pitchLength", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.pitchLength && touched.pitchLength && (
                <p className="text-8-9 text-red-600">{errors.pitchLength}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Width (in meters)
              </h2>
              <input
                type="text"
                name="width"
                placeholder=""
                value={values.width}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("width", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.width && touched.width && (
                <p className="text-8-9 text-red-600">{errors.width}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Facilities
              </h2>
              <select
                name="facilities"
                defaultValue={""}
                onChange={handleChange}
                value={values.facilities}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              >
                <option value="">Select</option>
                {facilitiesRatings.map((facility) => (
                  <option key={facility} value={facility}>
                    {facility}
                  </option>
                ))}
              </select>
              {errors.facilities && touched.facilities && (
                <p className="text-8-9 text-red-600">{errors.facilities}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Year of Establishment
              </h2>
              <input
                type="text"
                name="year"
                placeholder=""
                value={values.year}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("year", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.year && touched.year && (
                <p className="text-8-9 text-red-600">{errors.year}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Surface
              </h2>
              <select
                name="surface"
                defaultValue={""}
                onChange={handleChange}
                value={values.surface}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              >
                <option value="">Select</option>
                {surfaceAreas.map((srf) => (
                  <option key={srf} value={srf}>
                    {srf}
                  </option>
                ))}
              </select>
              {errors.surface && touched.surface && (
                <p className="text-8-9 text-red-600">{errors.surface}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <h2 className="text-12-14 font-semibold text-[#333333]">
                Rating
              </h2>
              <input
                type="text"
                name="rating"
                placeholder=""
                value={values.rating}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("rating", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.rating && touched.rating && (
                <p className="text-8-9 text-red-600">{errors.rating}</p>
              )}
            </div>
          </div>
          <div className="w-full grid place-content-center mt-5">
            <button
              type="submit"
              /* CHANGE 3: Button is full-width on mobile, fixed on medium+ screens */
              className="w-full md:w-[160px] grid place-content-center rounded-md h-10 text-white bg-primary-2"
            >
              {loading || uploadingLogo ? (
                <Loader color="white.6" />
              ) : (
                "Add Pitch"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPitch;