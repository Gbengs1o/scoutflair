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
      if (!values.firstName) errors.firstName = "Required";
      else if (values.firstName.length < 3) errors.firstName = "Must be 3 characters or more";
      if (!values.lastName) errors.lastName = "Required";
      else if (values.lastName.length < 3) errors.lastName = "Must be 3 characters or more";
      if (!values.phone) errors.phone = "Required";
      if (!values.quote) errors.quote = "Required";
      if (!values.address) errors.address = "Required";
      if (!values.license) errors.license = "Required";
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
      const names = name.split(" ");
      setFieldValue("firstName", names[0] || "");
      setFieldValue("lastName", names[1] || "");
      setFieldValue("image", image);
    }
  }, [currentUser, setFieldValue]);

  useEffect(() => {
    if (scoutData) {
      setFieldValue("email", scoutData.email || "");
      setFieldValue("phone", scoutData.phone || "");
      setFieldValue("team", scoutData.currentTeam || "");
      setFieldValue("quote", scoutData.quote || "");
      setFieldValue("address", scoutData.address || "");
      setFieldValue("career", scoutData.career || "");
      setFieldValue("license", scoutData.license || "");
      setFieldValue("coachingEducation", scoutData.coachingEducation || "");
      setFieldValue("coachingStyle", scoutData.coachingStyle || "");
      setFieldValue("experience", scoutData.experience || "");
    }
  }, [scoutData, setFieldValue]);

  useEffect(() => {
    if (!uploadingPicture && uploadedPicture) {
      updateScout(constructPayload());
    }
  }, [uploadingPicture, uploadedPicture]);

  useEffect(() => {
    if (updatedScout && !loadingUpdateScout) {
      window.location.reload();
    }
  }, [updatedScout, loadingUpdateScout]);

  const constructPayload = () => {
    let payload: Partial<iUpdateScoutPayload> = {};
    payload.fullName = `${values.firstName} ${values.lastName}`;
    payload.phone = values.phone;
    payload.nationality = "Nigerian";
    payload.coachingEducation = values.coachingEducation;
    payload.coachingStyle = values.coachingStyle;
    payload.experience = values.experience;
    payload.licenceNumber = values.license;
    payload.quote = values.quote;
    payload.address = values.address;
    payload.currentTeam = values.team;
    return payload;
  };

  return (
    <form method="POST" onSubmit={handleSubmit} className="w-full">
      {/* Main container for form sections */}
      <div className="flex flex-col gap-8 w-full pb-10">

        {/* Personal Information Section */}
        <div className="space-y-3">
          <h2 className="text-dark text-12-14 font-semibold px-4 md:px-5">
            Personal Information
          </h2>
          <div className="w-full flex flex-col px-4 md:px-5 gap-4">
            
            {/* RESPONSIVE FORM ROW: Full Name */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-6 gap-y-2 items-start">
              <label className="text-14-16 font-semibold text-placeholder pt-2">Full Name</label>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-xs text-red-500 mt-1">{errors.firstName as string}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-xs text-red-500 mt-1">{errors.lastName as string}</p>
                  )}
                </div>
              </div>
            </div>

            {/* RESPONSIVE FORM ROW: Contact */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-6 gap-y-2 items-start">
              <label className="text-14-16 font-semibold text-placeholder pt-2">Contact</label>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={values.email}
                  readOnly
                  className="w-full rounded-lg border bg-neutral-200 cursor-not-allowed placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone as string}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* RESPONSIVE FORM ROW: Avatar & License */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-6 gap-y-2 items-start">
              <label className="text-14-16 font-semibold text-placeholder pt-2">Avatar & License</label>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="w-full flex gap-3 items-center flex-wrap">
                  {fileImageData ? (
                    <Image src={fileImageData} alt="user image" className="rounded-full size-11 object-cover" width={44} height={44} />
                  ) : (
                    <ProfileImageOrTextAvatar image={values.image} name={values.firstName} radius="rounded-full" size="size-11" />
                  )}
                  <button type="button" onClick={() => fileRef.current?.click()} className="text-primary-2 border border-primary-2 px-3 py-1 rounded-md text-10-12 cursor-pointer font-bold">Change</button>
                  <button type="button" onClick={() => { setFieldValue("image", ""); setFileImageData(""); }} className="text-error border border-error px-3 py-1 rounded-md text-10-12 cursor-pointer font-bold">Remove</button>
                  <input type="file" accept="image/*" ref={fileRef} style={{ display: "none" }} onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => { setFieldValue("image", file); setFile(file); setFileImageData(reader.result as string); };
                    }
                  }} />
                </div>
                <div>
                  <input
                    type="text"
                    name="license"
                    placeholder="Enter License Number"
                    value={values.license}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.license && touched.license && (
                    <p className="text-xs text-red-500 mt-1">{errors.license as string}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Textareas are already full-width, which is responsive */}
            <div>
              <textarea name="quote" placeholder="Enter Quote" value={values.quote} onChange={handleChange} className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2" />
              {errors.quote && touched.quote && <p className="text-xs text-red-500 mt-1">{errors.quote as string}</p>}
            </div>
            <div>
              <textarea name="address" placeholder="Enter Address" value={values.address} onChange={handleChange} className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2" />
              {errors.address && touched.address && <p className="text-xs text-red-500 mt-1">{errors.address as string}</p>}
            </div>
          </div>
        </div>

        {/* Team Information Section */}
        <div className="space-y-3">
          <h2 className="text-dark text-12-14 font-semibold px-4 md:px-5">
            Team Information
          </h2>
          <div className="w-full flex flex-col px-4 md:px-5 gap-4">
            <input
              type="text"
              name="team"
              placeholder="Enter Current Team"
              value={values.team}
              onChange={handleChange}
              readOnly
              className="w-full rounded-lg border bg-neutral-200 cursor-not-allowed placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
            />
            <textarea name="experience" placeholder="Enter Coaching Experience" value={values.experience} onChange={handleChange} className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2" />
            <textarea name="coachingStyle" placeholder="Enter Coaching Style" value={values.coachingStyle} onChange={handleChange} className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2" />
            <textarea name="coachingEducation" placeholder="Enter Coaching Education" value={values.coachingEducation} onChange={handleChange} className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2" />
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full px-4 md:px-5">
          <button type="submit" className="bg-primary-2 w-full h-12 text-white text-14-16 font-bold rounded-lg flex items-center justify-center">
            {loadingUpdateScout || uploadingPicture ? <Loader color="white" size="sm" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Basic;