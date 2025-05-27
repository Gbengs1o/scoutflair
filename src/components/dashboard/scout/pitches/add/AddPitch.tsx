"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { useFormik } from "formik";
import { useCreateLocalPitch } from "@/hooks/pitch"; // Ensure path is correct
import { useUploadLogo } from "@/hooks/common"; // Ensure path is correct
import { Loader } from "@mantine/core";
import { facilitiesRatings, surfaceAreas } from "@/constants/constants"; // Ensure path is correct

const AddPitch = () => {
  const { loading, create, success } = useCreateLocalPitch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileImageData, setFileImageData] = useState<string>("");

  const {
    upload,
    data: uploadedImageUrl, // Renamed for clarity
    loading: uploadingLogo,
    success: uploadedLogo,
  } = useUploadLogo();

  const formik = useFormik({
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
      // 'file' is not directly used by Formik for submission data here,
      // but its presence in initialValues means Formik tracks it if you use setFieldValue for it.
      // The error logic `errors.file` relies on custom `file` state.
    },
    validate: (values) => {
      const errors: any = {}; // Consider a typed errors object

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
    onSubmit: (values) => {
      if (file) {
        upload(file);
      } else {
        // This case should ideally be caught by validation, but good to have a fallback.
        console.error("No file selected for upload.");
        // Optionally, set a form-level error if needed
        // formik.setStatus({ error: 'Please select an image to upload.' });
      }
    },
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (!uploadingLogo && uploadedLogo && uploadedImageUrl) {
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
        imageUrl: uploadedImageUrl,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadingLogo, uploadedLogo, uploadedImageUrl, create, values]); // Added dependencies

  useEffect(() => {
    if (!loading && success) {
      // Consider using Next.js router for navigation if this is a Next.js app page
      // import { useRouter } from 'next/navigation';
      // const router = useRouter();
      // router.push("/dashboard/scout/pitches");
      window.location.replace("/dashboard/scout/pitches");
    }
  }, [loading, success]);

  // Common input/select classes
  const inputClasses = "w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-3 focus:ring-1 focus:ring-primary-2 focus:border-primary-2 focus:outline-none";
  const labelClasses = "text-xs sm:text-sm font-semibold text-[#333333] block mb-1"; // Added block and mb-1
  const errorClasses = "text-[10px] sm:text-xs text-red-600 mt-0.5"; // Added mt-0.5

  return (
    // Responsive page padding
    <div className="w-full p-3 sm:p-4 md:p-6">
      <form method="POST" onSubmit={handleSubmit}>
        {/* Form container: responsive padding, gap, rounded corners */}
        <div className="w-full p-3 sm:p-4 md:p-6 flex flex-col gap-4 sm:gap-5 md:gap-6 bg-white shadow-custom rounded-lg md:rounded-xl">
          <h2 className="text-base sm:text-lg md:text-xl text-primary-2 font-semibold">
            Add Local Pitch
          </h2>

          {/* Image Upload Section */}
          <div>
            <div
              onClick={() => fileRef.current?.click()}
              className={`w-full h-32 sm:h-40 ${
                file !== null
                  ? "bg-cover bg-center" // Applied if file is selected
                  : "border-2 border-primary-2 border-dashed" // Applied if no file
              } rounded-lg overflow-hidden cursor-pointer flex flex-col justify-center items-center gap-2 group hover:bg-primary-2/10 transition-colors`}
              style={file !== null ? { backgroundImage: `url(${fileImageData})` } : {}}
            >
              {file === null && ( // Only show placeholder if no file
                <>
                  <FaImage className="text-primary-2 text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                  <p className="text-sm sm:text-base font-medium text-primary-2">
                    Upload pitch image
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                className="hidden" // Using Tailwind's hidden class
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    const reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onload = () => {
                      setFile(selectedFile);
                      setFileImageData(reader.result as string);
                      // Optionally, if you want Formik to track the file for its own validation
                      // setFieldValue("file", selectedFile);
                    };
                  }
                }}
                onBlur={handleBlur} // Add onBlur for touched state if validating 'file' with Formik
                name="file" // Add name for Formik
              />
            </div>
            {/*
              To make errors.file work correctly with Formik's touched state for the input:
              1. Add `name="file"` to the input.
              2. Call `handleBlur` on the input's `onBlur` event.
              3. Call `setFieldValue("file", selectedFile)` when a file is chosen.
              However, the current custom error check `if (file === null)` is simpler and effective.
              To show this error only after attempting submit or if the field was "touched" (e.g., clicked):
              You might need form-level submission attempt flag or specific logic for the file input "touched" state.
              For simplicity, showing error if present:
            */}
            {errors.file && <p className={errorClasses}>{errors.file}</p>}
          </div>

          {/* Input Fields Grid: 1 col on mobile, 2 cols on md+ */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {/* Pitch Name */}
            <div>
              <label htmlFor="name" className={labelClasses}>Pitch Name</label>
              <input id="name" type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={inputClasses} />
              {errors.name && touched.name && (<p className={errorClasses}>{errors.name}</p>)}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className={labelClasses}>Address</label>
              <input id="address" type="text" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} className={inputClasses}/>
              {errors.address && touched.address && (<p className={errorClasses}>{errors.address}</p>)}
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className={labelClasses}>State</label>
              <input id="state" type="text" name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} className={inputClasses}/>
              {errors.state && touched.state && (<p className={errorClasses}>{errors.state}</p>)}
            </div>

            {/* LGA */}
            <div>
              <label htmlFor="lga" className={labelClasses}>LGA</label>
              <input id="lga" type="text" name="lga" value={values.lga} onChange={handleChange} onBlur={handleBlur} className={inputClasses}/>
              {errors.lga && touched.lga && (<p className={errorClasses}>{errors.lga}</p>)}
            </div>

            {/* Latitude */}
            <div>
              <label htmlFor="latitude" className={labelClasses}>Latitude</label>
              <input id="latitude" type="text" name="latitude" value={values.latitude}
                onChange={(e) => { const res = e.target.value.trim(); if (!isNaN(Number(res)) || res === "" || res === "-") setFieldValue("latitude", res);}}
                onBlur={handleBlur} className={inputClasses} inputMode="decimal"
              />
              {errors.latitude && touched.latitude && (<p className={errorClasses}>{errors.latitude}</p>)}
            </div>

            {/* Longitude */}
            <div>
              <label htmlFor="longitude" className={labelClasses}>Longitude</label>
              <input id="longitude" type="text" name="longitude" value={values.longitude}
                onChange={(e) => { const res = e.target.value.trim(); if (!isNaN(Number(res)) || res === "" || res === "-") setFieldValue("longitude", res);}}
                onBlur={handleBlur} className={inputClasses} inputMode="decimal"
              />
              {errors.longitude && touched.longitude && (<p className={errorClasses}>{errors.longitude}</p>)}
            </div>

            {/* Length */}
            <div>
              <label htmlFor="pitchLength" className={labelClasses}>Length (in metres)</label>
              <input id="pitchLength" type="text" name="pitchLength" value={values.pitchLength}
                onChange={(e) => { const res = e.target.value.trim(); if (!isNaN(Number(res)) || res === "") setFieldValue("pitchLength", res);}}
                onBlur={handleBlur} className={inputClasses} inputMode="numeric"
              />
              {errors.pitchLength && touched.pitchLength && (<p className={errorClasses}>{errors.pitchLength}</p>)}
            </div>

            {/* Width */}
            <div>
              <label htmlFor="width" className={labelClasses}>Width (in meters)</label>
              <input id="width" type="text" name="width" value={values.width}
                onChange={(e) => { const res = e.target.value.trim(); if (!isNaN(Number(res)) || res === "") setFieldValue("width", res);}}
                onBlur={handleBlur} className={inputClasses} inputMode="numeric"
              />
              {errors.width && touched.width && (<p className={errorClasses}>{errors.width}</p>)}
            </div>

            {/* Facilities */}
            <div>
              <label htmlFor="facilities" className={labelClasses}>Facilities</label>
              <select id="facilities" name="facilities" value={values.facilities} onChange={handleChange} onBlur={handleBlur} className={inputClasses}>
                <option value="">Select Facility Rating</option>
                {facilitiesRatings.map((facility) => (
                  <option key={facility} value={facility}> {facility} </option>
                ))}
              </select>
              {errors.facilities && touched.facilities && (<p className={errorClasses}>{errors.facilities}</p>)}
            </div>

            {/* Year of Establishment */}
            <div>
              <label htmlFor="year" className={labelClasses}>Year of Establishment</label>
              <input id="year" type="text" name="year" value={values.year}
                onChange={(e) => { const res = e.target.value.trim(); if ((!isNaN(Number(res)) && res.length <= 4) || res === "") setFieldValue("year", res);}}
                onBlur={handleBlur} className={inputClasses} inputMode="numeric" maxLength={4}
              />
              {errors.year && touched.year && (<p className={errorClasses}>{errors.year}</p>)}
            </div>

            {/* Surface */}
            <div>
              <label htmlFor="surface" className={labelClasses}>Surface</label>
              <select id="surface" name="surface" value={values.surface} onChange={handleChange} onBlur={handleBlur} className={inputClasses}>
                <option value="">Select Surface Type</option>
                {surfaceAreas.map((srf) => (
                  <option key={srf} value={srf}> {srf} </option>
                ))}
              </select>
              {errors.surface && touched.surface && (<p className={errorClasses}>{errors.surface}</p>)}
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className={labelClasses}>Rating (1-5)</label>
              <input id="rating" type="text" name="rating" value={values.rating}
                onChange={(e) => { const res = e.target.value.trim(); if ((!isNaN(Number(res)) && Number(res) >= 1 && Number(res) <= 5 && res.length === 1) || res === "") setFieldValue("rating", res);}}
                onBlur={handleBlur} className={inputClasses} inputMode="numeric" maxLength={1}
              />
              {errors.rating && touched.rating && (<p className={errorClasses}>{errors.rating}</p>)}
            </div>
          </div>

          {/* Submit Button Section */}
          <div className="w-full flex justify-center mt-3 sm:mt-5">
            <button
              type="submit"
              disabled={loading || uploadingLogo}
              className="w-full sm:w-auto sm:min-w-[160px] flex justify-center items-center rounded-md h-10 px-6 py-2 text-white bg-primary-2 hover:bg-primary-2/90 focus:outline-none focus:ring-2 focus:ring-primary-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || uploadingLogo ? (
                <Loader color="white" size="sm" /> {/* Mantine Loader */}
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