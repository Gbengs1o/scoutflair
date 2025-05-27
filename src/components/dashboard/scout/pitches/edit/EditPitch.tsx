"use client";

import React, { useEffect, useState, Suspense, useRef } from "react";
import { useFormik } from "formik";
import { FaImage, FaRedoAlt } from "react-icons/fa"; // Added FaRedoAlt for "change image"
import { iLocalPitchResponse, useUpdateLocalPitch } from "@/hooks/pitch"; // Ensure path is correct
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import { useUploadLogo } from "@/hooks/common"; // Ensure path is correct
import { facilitiesRatings, surfaceAreas } from "@/constants/constants"; // Ensure path is correct

const EditPitch = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center"> {/* Full screen loader */}
          <Loader color="primary.6" /> {/* Corrected color */}
        </div>
      }
    >
      <EditPitchContent />
    </Suspense>
  );
};

const EditPitchContent = () => {
  const { loading, update, success } = useUpdateLocalPitch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(""); // Stores the original or newly uploaded image URL for display
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);


  const {
    upload,
    data: uploadedLogoUrl, // Renamed for clarity
    loading: uploadingLogo,
    success: uploadedLogo,
  } = useUploadLogo();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pitchDataString = searchParams.get("data"); // Renamed for clarity

  const formik = useFormik({
    initialValues: {
      id: "", // Assuming your pitch has an ID, crucial for updates
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
      // No 'file' here, managed by component state
    },
    validate: (values) => {
      const errors: any = {};
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
      return errors;
    },
    onSubmit: (values) => {
      if (file) { // If a new file was selected
        upload(file);
      } else { // No new file, update with existing image URL
        update({
          id: values.id, // Pass the ID for the update
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
          imageUrl: currentImageUrl, // Use the current image URL (original or previously uploaded)
        });
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
    setValues, // Useful for setting multiple fields at once
  } = formik;


  // Effect to load initial data from search params
  useEffect(() => {
    if (pitchDataString) {
      try {
        const payload: iLocalPitchResponse = JSON.parse(
          Buffer.from(pitchDataString, "base64").toString("utf-8")
        );
        setValues({ // Use setValues for initializing the form
          id: payload.localPitchId || payload.id || "", // Ensure you have an ID
          name: payload.name || "",
          address: payload.address || "",
          longitude: String(payload.longitude) || "",
          latitude: String(payload.latitude) || "",
          facilities: payload.facilities || "",
          pitchLength: String(payload.length) || "",
          width: String(payload.width) || "",
          year: String(payload.estYear) || "",
          surface: payload.surface || "",
          rating: String(payload.rating) || "",
          state: payload.state || "",
          lga: payload.lga || "",
        });
        setCurrentImageUrl(payload.imageUrl || "");
        setIsInitialDataLoaded(true);
      } catch (error) {
        console.error("Failed to parse pitch data:", error);
        router.back(); // Or redirect to an error page/pitches list
      }
    } else if (!isInitialDataLoaded) { // Only redirect if data was never loaded and not just missing on re-renders
        // router.back(); // Or redirect to pitches list
        // This might be too aggressive on fast refreshes, consider disabling or adding a delay/flag
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pitchDataString, router, setValues]); // setValues is stable, pitchDataString is key


  // Effect to handle pitch update after new logo is uploaded
  useEffect(() => {
    if (!uploadingLogo && uploadedLogo && uploadedLogoUrl) {
      update({
        id: values.id, // Pass ID
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
        imageUrl: uploadedLogoUrl, // Use the newly uploaded image URL
      });
      setCurrentImageUrl(uploadedLogoUrl); // Update the displayed image to the new one
      setFile(null); // Reset file state
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadingLogo, uploadedLogo, uploadedLogoUrl, update, values]); // Dependencies

  // Effect to redirect on successful update
  useEffect(() => {
    if (!loading && success) {
      // Consider using Next.js router for navigation
      router.push("/dashboard/scout/pitches");
      // window.location.replace("/dashboard/scout/pitches"); // Less ideal in Next.js
    }
  }, [loading, success, router]);


  // Common input/select classes (same as AddPitch)
  const inputClasses = "w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-3 focus:ring-1 focus:ring-primary-2 focus:border-primary-2 focus:outline-none";
  const labelClasses = "text-xs sm:text-sm font-semibold text-[#333333] block mb-1";
  const errorClasses = "text-[10px] sm:text-xs text-red-600 mt-0.5";

  // Render a loader if initial data isn't loaded yet from params
  if (!isInitialDataLoaded && pitchDataString) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader color="primary.6" />
      </div>
    );
  }
  // If no data string and not loaded, could show "No data" or redirect (handled by useEffect)
  if (!pitchDataString && !isInitialDataLoaded) {
      return (
          <div className="w-full h-screen flex flex-col justify-center items-center text-placeholder">
              <p>Pitch data not found or invalid.</p>
              <button onClick={() => router.back()} className="mt-4 text-primary-2 underline">Go Back</button>
          </div>
      )
  }


  return (
    <div className="w-full p-3 sm:p-4 md:p-6">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="w-full p-3 sm:p-4 md:p-6 flex flex-col gap-4 sm:gap-5 md:gap-6 bg-white shadow-custom rounded-lg md:rounded-xl">
          <h2 className="text-base sm:text-lg md:text-xl text-primary-2 font-semibold">
            Update Local Pitch
          </h2>

          {/* Image Upload/Display Section */}
          <div>
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full h-32 sm:h-40 rounded-lg overflow-hidden cursor-pointer flex flex-col justify-center items-center gap-2 group relative bg-gray-100 hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300"
            >
              {currentImageUrl ? (
                <>
                  <img
                    src={currentImageUrl} // Display current image (original or newly selected preview)
                    alt="Pitch"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center bg-black bg-opacity-50 p-2 rounded group-hover:bg-opacity-70 transition-opacity">
                    <FaRedoAlt className="text-white text-xl sm:text-2xl mb-1" />
                    <p className="text-xs sm:text-sm font-medium text-white">
                      Change Image
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <FaImage className="text-gray-400 text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                  <p className="text-sm sm:text-base font-medium text-gray-500">
                    Upload pitch image
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    const reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onload = () => {
                      setFile(selectedFile); // Set the new file for upload
                      setCurrentImageUrl(reader.result as string); // Update preview to new file
                    };
                  }
                }}
              />
            </div>
            {/* You might want an error message specific to file upload if needed */}
          </div>


          {/* Input Fields Grid */}
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
              disabled={loading || uploadingLogo || !isInitialDataLoaded} // Disable if initial data not loaded
              className="w-full sm:w-auto sm:min-w-[160px] flex justify-center items-center rounded-md h-10 px-6 py-2 text-white bg-primary-2 hover:bg-primary-2/90 focus:outline-none focus:ring-2 focus:ring-primary-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || uploadingLogo ? (
                <Loader color="white" size="sm" />
              ) : (
                "Update Pitch"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPitch;