"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { iUpdatePlayerPayload, useUpdatePlayer } from "@/hooks/player";
import {
  useCurrentUserStore,
  usePlayerDataStore,
} from "@/stores/userStore";
import { useUploadPicture } from "@/hooks/common";
import { useFormik } from "formik";
import { Loader } from "@mantine/core";
import { positions } from "@/constants/constants";

const Basic = () => {
  const currentUser = useCurrentUserStore((state) => state);
  const playerData = usePlayerDataStore((state) => state);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileImageData, setFileImageData] = useState<string>("");

  const {
    update: updatePlayer,
    loading: loadingUpdatePlayer,
    success: updatedPlayer,
  } = useUpdatePlayer();

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
      biography: "",
      address: "",
      height: "",
      weight: "",
      dob: "",
      jersey: "",
      position: "",
      foot: "",
      team: "",
      xUrl: "",
      igUrl: "",
      fbUrl: "",
      ttUrl: "",
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

      if (!values.dob) {
        errors.dob = "Required";
      }

      if (!values.height) {
        errors.height = "Required";
      }

      if (!values.weight) {
        errors.weight = "Required";
      }

      if (!values.biography) {
        errors.biography = "Required";
      }

      if (!values.address) {
        errors.address = "Required";
      }

      if (!values.position) {
        errors.position = "Required";
      }

      if (!values.foot) {
        errors.foot = "Required";
      }

      if (!values.jersey) {
        errors.jersey = "Required";
      }

      return errors;
    },

    onSubmit: () => {
      if (file) {
        uploadPicture(file!);
      } else {
        updatePlayer(constructPayload());
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (currentUser) {
      const { image, name } = currentUser;
      const names = name.split(" ");
      setFieldValue("firstName", names[0]);
      setFieldValue("lastName", names[1]);
      setFieldValue("image", image);
    }
  }, [currentUser]);

  useEffect(() => {
    if (playerData) {
      const {
        email,
        phone,
        bio,
        dob,
        fbLink,
        foot,
        height,
        igLink,
        jersey,
        ttLink,
        weight,
        xLink,
        role,
      } = playerData;
      setFieldValue("email", email);
      setFieldValue("phone", phone);
      setFieldValue("position", role);
      setFieldValue("biography", bio);
      setFieldValue("dob", new Date(dob));
      setFieldValue("fbUrl", fbLink);
      setFieldValue("foot", foot);
      setFieldValue("height", height);
      setFieldValue("igUrl", igLink);
      setFieldValue("jersey", jersey);
      setFieldValue("ttUrl", ttLink);
      setFieldValue("weight", weight);
      setFieldValue("xUrl", xLink);
    }
  }, [playerData]);

  useEffect(() => {
    if (!uploadingPicture && uploadedPicture) {
      updatePlayer(constructPayload());
    }
  }, [uploadingPicture, uploadedPicture]);

  useEffect(() => {
    if (updatedPlayer && !loadingUpdatePlayer) {
      window.location.reload();
    }
  }, [updatedPlayer, loadingUpdatePlayer]);

  const constructPayload = () => {
    let payload: Partial<iUpdatePlayerPayload> = {};
    payload.fullName = `${values.firstName} ${values.lastName}`;
    payload.phone = values.phone;
    payload.nationality = "Nigerian";
    payload.dob = values.dob;

    payload.address = values.address;
    payload.biography = values.biography;
    payload.weight = values.weight;
    payload.height = values.height;

    payload.jerseyNumber = values.jersey;
    payload.position = values.position;
    payload.preferredFoot = values.foot;
    payload.currentTeam = values.team;
    payload.xurl = values.xUrl;
    payload.igUrl = values.igUrl;
    payload.facebookUrl = values.fbUrl;
    payload.ticTokUrl = values.ttUrl;

    return payload;
  };

  return (
    <form method="POST" onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4 sm:gap-6 w-full">
        {/* Personal Information */}
        <div className="space-y-3">
          <h2 className="text-dark text-xs sm:text-12-14 font-semibold pl-3 sm:pl-5">
            Personal Information
          </h2>
          <div className="w-full flex flex-col px-3 sm:px-5 gap-4">
            {/* Full Name */}
            <div className="w-full flex flex-col lg:grid lg:grid-cols-[0.5fr_1.5fr_1.5fr] lg:place-items-center gap-2 lg:gap-4">
              <h2 className="text-xs sm:text-14-16 font-semibold text-placeholder">
                Full Name
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 lg:contents">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="w-full flex flex-col lg:grid lg:grid-cols-[0.5fr_1.5fr_1.5fr] lg:place-items-center gap-2 lg:gap-4">
              <h2 className="text-xs sm:text-14-16 font-semibold text-placeholder">
                Contact
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 lg:contents">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={values.email}
                  readOnly
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-neutral-300 placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                <div className="flex flex-col">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Avatar */}
            <div className="w-full flex flex-col lg:grid lg:grid-cols-[0.5fr_1.5fr_1.5fr] lg:place-items-center gap-2 lg:gap-4">
              <h2 className="text-xs sm:text-14-16 font-semibold text-placeholder">
                Avatar
              </h2>
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
                <div className="w-full flex gap-3 items-center">
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
                      size="size-11"
                    />
                  )}
                  <div className="flex flex-wrap gap-2">
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="text-primary-2 border border-primary-2 px-3 py-1 rounded-md text-[10px] sm:text-10-12 cursor-pointer font-bold"
                    >
                      Change
                    </div>
                    <div
                      onClick={() => {
                        setFieldValue("image", "");
                        setFileImageData("");
                      }}
                      className="text-error border border-error px-3 py-1 rounded-md text-[10px] sm:text-10-12 cursor-pointer font-bold"
                    >
                      Remove
                    </div>
                  </div>
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
                          setFieldValue("image", file);
                          setFile(file);
                          setFileImageData(reader.result as string);
                        };
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="date"
                    name="dob"
                    placeholder="Enter Date Of Birth"
                    value={values.dob}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.dob && touched.dob && (
                    <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.dob}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Data */}
            <div className="w-full flex flex-col lg:grid lg:grid-cols-[0.5fr_1.5fr_1.5fr] lg:place-items-center gap-2 lg:gap-4">
              <h2 className="text-xs sm:text-14-16 font-semibold text-placeholder">
                Bio Data
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 lg:contents">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="height"
                    placeholder="Enter Height in cm"
                    value={values.height}
                    onChange={(e) => {
                      const res = e.target.value.trim();
                      if (isNaN(Number(res))) return;
                      setFieldValue("height", res);
                    }}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.height && touched.height && (
                    <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.height}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="weight"
                    placeholder="Enter Weight in kg"
                    value={values.weight}
                    onChange={(e) => {
                      const res = e.target.value.trim();
                      if (isNaN(Number(res))) return;
                      setFieldValue("weight", res);
                    }}
                    className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                  />
                  {errors.weight && touched.weight && (
                    <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.weight}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="w-full">
              <textarea
                name="biography"
                placeholder="Enter Biography"
                value={values.biography}
                onChange={handleChange}
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2"
              />
              {errors.biography && touched.biography && (
                <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.biography}</p>
              )}
            </div>

            {/* Address */}
            <div className="w-full">
              <textarea
                name="address"
                placeholder="Enter Address"
                value={values.address}
                onChange={handleChange}
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2"
              />
              {errors.address && touched.address && (
                <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Team Information */}
        <div className="space-y-3">
          <h2 className="text-dark text-xs sm:text-12-14 font-semibold pl-3 sm:pl-5">
            Team Information
          </h2>
          <div className="w-full flex flex-col px-3 sm:px-5 gap-4">
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="text"
                name="team"
                placeholder="Enter Current Team"
                value={values.team}
                onChange={handleChange}
                readOnly
                className="w-full rounded-lg border bg-neutral-300 placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              <div className="flex flex-col">
                <input
                  type="text"
                  name="jersey"
                  placeholder="Enter Jersey Number"
                  value={values.jersey}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                {errors.jersey && touched.jersey && (
                  <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.jersey}</p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex flex-col">
                <select
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                >
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                {errors.position && touched.position && (
                  <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.position}</p>
                )}
              </div>

              <div className="flex flex-col">
                <select
                  name="foot"
                  value={values.foot}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                >
                  <option value="">Select Foot</option>
                  {["Left", "Right", "Both"].map((foot) => (
                    <option key={foot} value={foot}>
                      {foot}
                    </option>
                  ))}
                </select>
                {errors.foot && touched.foot && (
                  <p className="text-[8px] sm:text-8-9 text-red-500 mt-1">{errors.foot}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Information */}
        <div className="space-y-3">
          <h2 className="text-dark text-xs sm:text-12-14 font-semibold pl-3 sm:pl-5">
            Social Information
          </h2>
          <div className="w-full flex flex-col px-3 sm:px-5 gap-4">
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="text"
                name="xUrl"
                placeholder="Enter Twitter URL"
                value={values.xUrl}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              <input
                type="text"
                name="igUrl"
                placeholder="Enter Instagram URL"
                value={values.igUrl}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="text"
                name="fbUrl"
                placeholder="Enter Facebook URL"
                value={values.fbUrl}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              <input
                type="text"
                name="ttUrl"
                placeholder="Enter Tiktok URL"
                value={values.ttUrl}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-xs sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full px-3 sm:px-6 my-6 sm:my-10">
          <button
            type="submit"
            className="bg-primary-2 w-full h-12 text-white text-xs sm:text-14-16 font-bold rounded-lg py-2"
          >
            {loadingUpdatePlayer || uploadingPicture ? (
              <Loader color="white.6" />
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