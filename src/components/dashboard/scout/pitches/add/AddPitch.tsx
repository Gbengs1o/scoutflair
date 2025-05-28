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
      pitchLength: "", // Renamed from 'length' in create call context to match form
      width: "",
      year: "",
      surface: "",
      rating: "",
      state: "",
      lga: "",
      file: "", // This is for error tracking, actual file is in `file` state
    },
    validate: (values) => {
      const errors: any = {}; // Consider defining a stricter type for errors

      if (!values.name) errors.name = "Required";
      if (!values.address) errors.address = "Required";
      if (!values.longitude) errors.longitude = "Required";
      if (!values.latitude) errors.latitude = "Required";
      if (!values.facilities) errors.facilities = "Required";
      if (!values.pitchLength) errors.pitchLength = "Required";
      if (!values.width) errors.width = "Required";
      if (!values.year) errors.year = "Required";
      if (!values.surface) errors.surface = "Required";
      if (!values.rating) errors.rating = "Required";
      if (!values.state) errors.state = "Required";
      if (!values.lga) errors.lga = "Required";
      if (file === null) errors.file = "Pitch image is required";

      return errors;
    },
    onSubmit: (formValues) => { // Renamed 'values' to 'formValues' to avoid confusion with outer scope 'values'
      if (file) { // Ensure file is not null before uploading
        upload(file);
      } else {
        // This case should ideally be caught by validation, but good to double check
        console.error("Attempted to submit without a file.");
        // Optionally, set an error message here if not already handled by formik's errors.file
      }
    },
  });

  useEffect(() => {
    if (!uploadingLogo && uploadedLogo && data) { // Ensure 'data' (imageUrl) is present
      create({
        address: values.address,
        facilities: values.facilities,
        latitude: values.latitude,
        length: values.pitchLength, // Assuming 'create' expects 'length'
        lga: values.lga,
        longitude: values.longitude,
        name: values.name,
        state: values.state,
        surface: values.surface,
        width: values.width,
        estYear: values.year,
        rating: values.rating,
        imageUrl: data, // 'data' from useUploadLogo is the imageUrl
        localPitchId: undefined, // Or omit if not needed for creation
      });
    }
  }, [uploadingLogo, uploadedLogo, data, create, values]); // Added missing dependencies

  useEffect(() => {
    if (!loading && success) {
      window.location.replace("/dashboard/scout/pitches");
    }
  }, [loading, success]);

  // Ensure this return block is clean and has no hidden characters.
  // The Vercel log pointed to an error at the start of this div.
  return (
    <div className="w-full p-6"> {/* Vercel log showed p-3 sm:p-4 md:p-6, using your code's p-6 */}
      <form method="POST" onSubmit={handleSubmit}>
        <div className="w-full p-6 flex flex-col gap-6 bg-white shadow-custom rounded-[1rem]">
          <h2 className="text-16-19 text-primary-2 font-semibold">
            Add Local Pitch
          </h2>

          <div>
            <div
              onClick={() => fileRef.current?.click()}
              className={`w-full h-40 ${
                file !== null
                  ? "bg-cover bg-center"
                  // It's good practice to ensure background image is actually set via style if using bg-cover with dynamic image
                  : "border-2 border-primary-2 border-dashed"
              } rounded-lg overflow-hidden cursor-pointer flex flex-col justify-center items-center gap-2`}
              style={file !== null && fileImageData ? { backgroundImage: `url(${fileImageData})` } : {}}
            >
              {file === null && ( // Only show placeholder if file is null
                <>
                  <FaImage className="text-primary-2 text-2xl" />
                  <p className="text-14-16 font-medium text-primary-2">
                    Upload pitch image
                  </p>
                </>
              )}
              {/* The img tag was removed as background image is now handled by the div style for consistency with bg-cover */}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  const reader = new FileReader();
                  reader.onloadend = () => { // Use onloadend for better certainty
                    setFile(selectedFile);
                    setFileImageData(reader.result as string);
                    setFieldValue("file", selectedFile.name); // Update formik about file presence
                  };
                  reader.readAsDataURL(selectedFile);
                }
              }}
            />
            {/* Touched.file might be more accurate than touched.name for file errors */}
            {errors.file && touched.file && (
              <p className="text-8-9 text-red-600 mt-1">{errors.file as string}</p>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pitch Name */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="name" className="text-12-14 font-semibold text-[#333333]">
                Pitch Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter pitch name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.name && touched.name && (
                <p className="text-8-9 text-red-600 mt-1">{errors.name as string}</p>
              )}
            </div>

            {/* Address */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="address" className="text-12-14 font-semibold text-[#333333]">
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Enter address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.address && touched.address && (
                <p className="text-8-9 text-red-600 mt-1">{errors.address as string}</p>
              )}
            </div>
            
            {/* State */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="state" className="text-12-14 font-semibold text-[#333333]">State</label>
              <input
                id="state"
                type="text"
                name="state"
                placeholder="Enter state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.state && touched.state && (
                <p className="text-8-9 text-red-600 mt-1">{errors.state as string}</p>
              )}
            </div>

            {/* LGA */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="lga" className="text-12-14 font-semibold text-[#333333]">LGA</label>
              <input
                id="lga"
                type="text"
                name="lga"
                placeholder="Enter LGA"
                value={values.lga}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.lga && touched.lga && (
                <p className="text-8-9 text-red-600 mt-1">{errors.lga as string}</p>
              )}
            </div>

            {/* Latitude */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="latitude" className="text-12-14 font-semibold text-[#333333]">
                Latitude
              </label>
              <input
                id="latitude"
                type="text" // Consider type="number" for direct numeric input, but handle parsing carefully
                name="latitude"
                placeholder="Enter latitude"
                value={values.latitude}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (res === "" || !isNaN(Number(res))) { // Allow empty or numeric
                    setFieldValue("latitude", res);
                  }
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.latitude && touched.latitude && (
                <p className="text-8-9 text-red-600 mt-1">{errors.latitude as string}</p>
              )}
            </div>

            {/* Longitude */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="longitude" className="text-12-14 font-semibold text-[#333333]">
                Longitude
              </label>
              <input
                id="longitude"
                type="text"
                name="longitude"
                placeholder="Enter longitude"
                value={values.longitude}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (res === "" || !isNaN(Number(res))) {
                    setFieldValue("longitude", res);
                  }
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.longitude && touched.longitude && (
                <p className="text-8-9 text-red-600 mt-1">{errors.longitude as string}</p>
              )}
            </div>

            {/* Length (in metres) */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="pitchLength" className="text-12-14 font-semibold text-[#333333]">
                Length (in metres)
              </label>
              <input
                id="pitchLength"
                type="text"
                name="pitchLength"
                placeholder="e.g., 100"
                value={values.pitchLength}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (res === "" || !isNaN(Number(res))) {
                    setFieldValue("pitchLength", res);
                  }
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.pitchLength && touched.pitchLength && (
                <p className="text-8-9 text-red-600 mt-1">{errors.pitchLength as string}</p>
              )}
            </div>

            {/* Width (in meters) */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="width" className="text-12-14 font-semibold text-[#333333]">
                Width (in meters)
              </label>
              <input
                id="width"
                type="text"
                name="width"
                placeholder="e.g., 50"
                value={values.width}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (res === "" || !isNaN(Number(res))) {
                    setFieldValue("width", res);
                  }
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.width && touched.width && (
                <p className="text-8-9 text-red-600 mt-1">{errors.width as string}</p>
              )}
            </div>

            {/* Facilities */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="facilities" className="text-12-14 font-semibold text-[#333333]">
                Facilities
              </label>
              <select
                id="facilities"
                name="facilities"
                value={values.facilities} // Controlled component
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              >
                <option value="" disabled>Select facilities rating</option>
                {facilitiesRatings.map((facility) => (
                  <option key={facility} value={facility}>
                    {facility}
                  </option>
                ))}
              </select>
              {errors.facilities && touched.facilities && (
                <p className="text-8-9 text-red-600 mt-1">{errors.facilities as string}</p>
              )}
            </div>

            {/* Year of Establishment */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="year" className="text-12-14 font-semibold text-[#333333]">
                Year of Establishment
              </label>
              <input
                id="year"
                type="text" // Or "number" with min/max
                name="year"
                placeholder="e.g., 2005"
                value={values.year}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (res === "" || /^\d*$/.test(res)) { // Allow empty or only digits
                    setFieldValue("year", res);
                  }
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.year && touched.year && (
                <p className="text-8-9 text-red-600 mt-1">{errors.year as string}</p>
              )}
            </div>

            {/* Surface */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="surface" className="text-12-14 font-semibold text-[#333333]">
                Surface
              </label>
              <select
                id="surface"
                name="surface"
                value={values.surface} // Controlled component
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              >
                <option value="" disabled>Select surface type</option>
                {surfaceAreas.map((srf) => (
                  <option key={srf} value={srf}>
                    {srf}
                  </option>
                ))}
              </select>
              {errors.surface && touched.surface && (
                <p className="text-8-9 text-red-600 mt-1">{errors.surface as string}</p>
              )}
            </div>

            {/* Rating */}
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="rating" className="text-12-14 font-semibold text-[#333333]">
                Rating (1-5)
              </label>
              <input
                id="rating"
                type="text" // Or "number" with min/max
                name="rating"
                placeholder="e.g., 4"
                value={values.rating}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  // Basic validation for a 1-5 rating or empty
                  if (res === "" || (/^[1-5]$/.test(res) && res.length === 1)) {
                     setFieldValue("rating", res);
                  }
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              {errors.rating && touched.rating && (
                <p className="text-8-9 text-red-600 mt-1">{errors.rating as string}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full grid place-content-center mt-5">
            <button
              type="submit"
              disabled={loading || uploadingLogo} // Disable button when loading
              className="w-[160px] grid place-content-center rounded-md h-10 text-white bg-primary-2 disabled:opacity-50"
            >
              {loading || uploadingLogo ? (
                <Loader color="white" size="sm" /> 
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