"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { iUpdateScoutPayload, useUpdateScout } from "@/hooks/scout";
import { useCurrentUserStore, useScoutDataStore } from "@/stores/userStore";
import { useUploadPicture } from "@/hooks/common";
import { useFormik } from "formik";
import { Loader } from "@mantine/core";

const Basic = () => {
  const currentUser = useCurrentUserStore((state) => state);
  const scoutData = useScoutDataStore((state) => state);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileImageData, setFileImageData] = useState<string>("");

  const {
    update: updateScout,
    loading: loadingUpdateScout,
    success: updatedScout,
  } = useUpdateScout();

  const {
    upload: uploadPicture,
    data: uploadedUrl,
    loading: uploadingPicture,
    success: uploadedPicture,
  } = useUploadPicture();

  const {
    errors,
    touched,
    handleSubmit,
    handleChange,
    values,
    setSubmitting,
    setFieldValue,
    // It's good practice to also get handleBlur for touched state
    handleBlur,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      image: "",
      quote: "",
      address: "",
      license: "",
      team: "",
      career: "",
      coachingEducation: "",
      coachingStyle: "",
      experience: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.firstName) {
        errors.firstName = "Required";
      } else if (values.firstName.length < 3) {
        errors.firstName = "Must be 3 characters or more";
      }

      if (!values.lastName) {
        errors.lastName = "Required";
      } else if (values.lastName.length < 3) {
        errors.lastName = "Must be 3 characters or more";
      }

      if (!values.phone) {
        errors.phone = "Required";
      }

      if (!values.quote) {
        errors.quote = "Required";
      }

      if (!values.address) {
        errors.address = "Required";
      }

      if (!values.license) {
        errors.license = "Required";
      }
      return errors;
    },

    onSubmit: () => {
      if (file) {
        uploadPicture(file!);
      } else {
        updateScout(constructPayload());
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (currentUser) {
      const { image, name } = currentUser;
      const names = name?.split(" ") || ["", ""]; // Handle cases where name might be null/undefined
      setFieldValue("firstName", names[0]);
      setFieldValue("lastName", names[1]);
      setFieldValue("image", image);
    }
  }, [currentUser, setFieldValue]); // Added setFieldValue to dependency array

  useEffect(() => {
    if (scoutData) {
      const {
        email,
        phone,
        quote,
        address,
        currentTeam,
        career,
        coachingEducation,
        coachingStyle,
        license,
        experience,
      } = scoutData;
      setFieldValue("email", email || "");
      setFieldValue("phone", phone || "");
      setFieldValue("team", currentTeam || "");
      setFieldValue("quote", quote || "");
      setFieldValue("address", address || "");
      setFieldValue("career", career || "");
      setFieldValue("license", license || "");
      setFieldValue("coachingEducation", coachingEducation || "");
      setFieldValue("coachingStyle", coachingStyle || "");
      setFieldValue("experience", experience || "");
    }
  }, [scoutData, setFieldValue]); // Added setFieldValue to dependency array

  useEffect(() => {
    if (!uploadingPicture && uploadedPicture && uploadedUrl) { // Check uploadedUrl
      // Make sure to set the new image URL to the form state if it's used in constructPayload
      setFieldValue("image", uploadedUrl);
      updateScout(constructPayload(uploadedUrl)); // Pass new URL if needed
    }
  }, [uploadingPicture, uploadedPicture, uploadedUrl, updateScout, setFieldValue]); // Added dependencies

  useEffect(() => {
    if (updatedScout && !loadingUpdateScout) {
      // Consider using Next.js router for navigation instead of window.location.reload()
      // import { useRouter } from 'next/navigation'; // or 'next/router' for pages dir
      // const router = useRouter();
      // router.refresh(); // or router.reload() or router.push(router.asPath)
      window.location.reload();
    }
  }, [updatedScout, loadingUpdateScout]);

  const constructPayload = (newImageUrl?: string) => {
    let payload: Partial<iUpdateScoutPayload> = {
      fullName: `${values.firstName} ${values.lastName}`,
      phone: values.phone,
      nationality: "Nigerian", // Assuming this is fixed or comes from elsewhere
      coachingEducation: values.coachingEducation,
      coachingStyle: values.coachingStyle,
      experience: values.experience,
      licenceNumber: values.license,
      quote: values.quote,
      address: values.address,
      currentTeam: values.team,
      // Use the new image URL if provided (from upload), otherwise fallback to existing value
      profilePicture: newImageUrl || values.image || undefined,
    };
    return payload;
  };

  // Helper function for input classes for DRYness
  const getInputClasses = (isReadOnly = false) =>
    `w-full rounded-lg border ${
      isReadOnly ? "bg-neutral-300" : "bg-white"
    } placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-3 focus:ring-primary-2 focus:border-primary-2`;

  // Helper for error messages
  const renderError = (field: keyof typeof errors) =>
    errors[field] &&
    touched[field] && (
      <p className="text-xs text-red-500 mt-1">{errors[field] as string}</p>
    );

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-4 sm:p-6" // Added max-width and centered for better viewing
    >
      <div className="flex flex-col gap-8 md:gap-10 w-full ">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h2 className="text-dark text-base sm:text-lg font-semibold ">
            Personal Information
          </h2>
          <div className="w-full flex flex-col gap-4 md:gap-6">
            {/* Full Name Row */}
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[theme(spacing.32)_1fr_1fr] lg:items-center lg:gap-x-4">
              <label
                htmlFor="firstName"
                className="text-sm sm:text-base font-semibold text-placeholder lg:text-right"
              >
                Full Name
              </label>
              <div className="lg:col-span-1">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses()}
                />
                {renderError("firstName")}
              </div>
              <div className="lg:col-span-1">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses()}
                />
                {renderError("lastName")}
              </div>
            </div>

            {/* Contact Row */}
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[theme(spacing.32)_1fr_1fr] lg:items-center lg:gap-x-4">
              <label
                htmlFor="email"
                className="text-sm sm:text-base font-semibold text-placeholder lg:text-right"
              >
                Contact
              </label>
              <div className="lg:col-span-1">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={values.email}
                  readOnly
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses(true)}
                />
                {/* No error for readOnly field typically */}
              </div>
              <div className="lg:col-span-1">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses()}
                />
                {renderError("phone")}
              </div>
            </div>

            {/* Avatar & License Row */}
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[theme(spacing.32)_1fr_1fr] lg:items-center lg:gap-x-4">
              <h2 className="text-sm sm:text-base font-semibold text-placeholder lg:text-right">
                Avatar & License
              </h2>
              <div className="w-full flex flex-wrap gap-3 items-center lg:col-span-1">
                {fileImageData ? (
                  <Image
                    src={fileImageData}
                    alt="user image"
                    className="rounded-full size-11 object-cover"
                    width={44}
                    height={44}
                  />
                ) : (
                  <ProfileImageOrTextAvatar
                    image={values.image}
                    name={values.firstName}
                    radius="rounded-full"
                    size="size-11" // Ensure this class provides width and height
                  />
                )}
                <button // Changed to button for better semantics
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="text-primary-2 border border-primary-2 px-3 py-1.5 rounded-md text-xs sm:text-sm cursor-pointer font-bold hover:bg-primary-2 hover:text-white transition-colors"
                >
                  Change
                </button>
                <button // Changed to button
                  type="button"
                  onClick={() => {
                    setFieldValue("image", "");
                    setFileImageData("");
                    setFile(null); // Also clear the file state
                  }}
                  className="text-error border border-error px-3 py-1.5 rounded-md text-xs sm:text-sm cursor-pointer font-bold hover:bg-error hover:text-white transition-colors"
                >
                  Remove
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      const reader = new FileReader();
                      reader.readAsDataURL(selectedFile);
                      reader.onload = () => {
                        // No need to setFieldValue("image", selectedFile) here,
                        // as 'image' in formik is for the URL.
                        // We'll set it after successful upload.
                        setFile(selectedFile);
                        setFileImageData(reader.result as string);
                      };
                    }
                    e.target.value = ""; // Allow re-selecting the same file
                  }}
                />
              </div>
              <div className="lg:col-span-1">
                <input
                  id="license"
                  type="text"
                  name="license"
                  placeholder="Enter License Number"
                  value={values.license}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses()}
                />
                {renderError("license")}
              </div>
            </div>

            {/* Quote Textarea */}
            <div className="w-full">
              <label htmlFor="quote" className="block text-sm sm:text-base font-semibold text-placeholder mb-1">
                Quote
              </label>
              <textarea
                id="quote"
                name="quote"
                placeholder="Enter Quote"
                value={values.quote}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3} // Use rows attribute for initial height
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray p-3 focus:ring-primary-2 focus:border-primary-2"
              />
              {renderError("quote")}
            </div>

            {/* Address Textarea */}
            <div className="w-full">
               <label htmlFor="address" className="block text-sm sm:text-base font-semibold text-placeholder mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray p-3 focus:ring-primary-2 focus:border-primary-2"
              />
              {renderError("address")}
            </div>
          </div>
        </div>

        {/* Team Information Section */}
        <div className="space-y-4">
          <h2 className="text-dark text-base sm:text-lg font-semibold">
            Team Information
          </h2>
          <div className="w-full flex flex-col gap-4 md:gap-6">
            <div>
              <label htmlFor="team" className="block text-sm sm:text-base font-semibold text-placeholder mb-1">
                Current Team
              </label>
              <input
                id="team"
                type="text"
                name="team"
                placeholder="Enter Current Team"
                value={values.team}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly // Assuming this might be set elsewhere or not user-editable directly
                className={getInputClasses(true)}
              />
              {/* No error for readOnly field */}
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm sm:text-base font-semibold text-placeholder mb-1">
                Coaching Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                placeholder="Enter Coaching Experience"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray p-3 focus:ring-primary-2 focus:border-primary-2"
              />
              {renderError("experience")}
            </div>
            <div>
              <label htmlFor="coachingStyle" className="block text-sm sm:text-base font-semibold text-placeholder mb-1">
                Coaching Style
              </label>
              <textarea
                id="coachingStyle"
                name="coachingStyle"
                placeholder="Enter Coaching Style"
                value={values.coachingStyle}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray p-3 focus:ring-primary-2 focus:border-primary-2"
              />
              {renderError("coachingStyle")}
            </div>
            <div>
              <label htmlFor="coachingEducation" className="block text-sm sm:text-base font-semibold text-placeholder mb-1">
                Coaching Education
              </label>
              <textarea
                id="coachingEducation"
                name="coachingEducation"
                placeholder="Enter Coaching Education"
                value={values.coachingEducation}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-sm sm:text-base font-semibold placeholder:text-opacity-[0.88] border-border-gray p-3 focus:ring-primary-2 focus:border-primary-2"
              />
              {renderError("coachingEducation")}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full mt-6 md:mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loadingUpdateScout || uploadingPicture}
            className="bg-primary-2 w-full sm:w-auto text-white text-sm sm:text-base font-bold rounded-lg py-2.5 px-6 hover:bg-primary-2/90 focus:ring-2 focus:ring-primary-2 focus:ring-opacity-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loadingUpdateScout || uploadingPicture ? (
              <div className="flex items-center justify-center">
                <Loader color="white" size="sm" className="mr-2" />
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Basic;