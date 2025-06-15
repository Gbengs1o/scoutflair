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
  }, [currentUser, setFieldValue]);

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
  }, [playerData, setFieldValue]);

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
      <div className="flex flex-col gap-6 w-full ">
        <div className="space-y-3">
          <h2 className="text-dark text-12-14 font-semibold pl-4 md:pl-5">
            Personal Information
          </h2>
          <div className="w-full flex flex-col px-4 md:px-5 gap-4">
            {/* --- RESPONSIVE GRID --- */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr_1.5fr] items-start lg:items-center gap-4">
              <h2 className="text-14-16 font-semibold text-placeholder mb-2 lg:mb-0">
                Full Name
              </h2>
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                {errors.firstName && touched.firstName && (
                  <p className="text-8-9 text-red-500">{errors.firstName}</p>
                )}
              </>
              <>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                {errors.lastName && touched.lastName && (
                  <p className="text-8-9 text-red-500">{errors.lastName}</p>
                )}
              </>
            </div>

            {/* --- RESPONSIVE GRID --- */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr_1.5fr] items-start lg:items-center gap-4">
              <h2 className="text-14-16 font-semibold text-placeholder mb-2 lg:mb-0">
                Contact
              </h2>
              <>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={values.email}
                  readOnly
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-neutral-300 placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
              </>

              <>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                {errors.phone && touched.phone && (
                  <p className="text-8-9 text-red-500">{errors.phone}</p>
                )}
              </>
            </div>

            {/* --- RESPONSIVE GRID --- */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr_1.5fr] items-start lg:items-center gap-4">
              <h2 className="text-14-16 font-semibold text-placeholder mb-2 lg:mb-0">
                Avatar
              </h2>
              {/* --- FLEX WRAP FOR BUTTONS --- */}
              <div className="w-full flex flex-wrap gap-3 items-center">
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
                <div
                  onClick={() => fileRef.current?.click()}
                  className="text-primary-2 border border-primary-2 px-3 py-1 rounded-md text-10-12 cursor-pointer font-bold"
                >
                  Change
                </div>
                <div
                  onClick={() => {
                    setFieldValue("image", "");
                    setFileImageData("");
                  }}
                  className="text-error border border-error px-3 py-1 rounded-md text-10-12 cursor-pointer font-bold"
                >
                  Remove
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
              <>
                <input
                  type="date"
                  name="dob"
                  placeholder="Enter Date Of Birth"
                  value={values.dob}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                {errors.dob && touched.dob && (
                  <p className="text-8-9 text-red-500">{errors.dob}</p>
                )}
              </>
            </div>

            {/* --- RESPONSIVE GRID --- */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr_1.5fr] items-start lg:items-center gap-4">
              <h2 className="text-14-16 font-semibold text-placeholder mb-2 lg:mb-0">
                Bio Data
              </h2>
              <>
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
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                {errors.height && touched.height && (
                  <p className="text-8-9 text-red-500">{errors.height}</p>
                )}
              </>
              <>
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
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                {errors.weight && touched.weight && (
                  <p className="text-8-9 text-red-500">{errors.weight}</p>
                )}
              </>
            </div>

            <div className="w-full">
              <textarea
                name="biography"
                placeholder="Enter Biography"
                value={values.biography}
                onChange={handleChange}
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2"
              />
              {errors.biography && touched.biography && (
                <p className="text-8-9 text-red-500">{errors.biography}</p>
              )}
            </div>
            <div className="w-full">
              <textarea
                name="address"
                placeholder="Enter Address"
                value={values.address}
                onChange={handleChange}
                className="w-full rounded-lg border resize-none bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-20 p-2"
              />
              {errors.address && touched.address && (
                <p className="text-8-9 text-red-500">{errors.address}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-dark text-12-14 font-semibold pl-4 md:pl-5">
            Team Information
          </h2>
          <div className="w-full flex flex-col px-4 md:px-5 gap-4">
            {/* --- RESPONSIVE GRID --- */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <>
                <input
                  type="text"
                  name="team"
                  placeholder="Enter Current Team"
                  value={values.team}
                  onChange={handleChange}
                  readOnly
                  className="w-full rounded-lg border bg-neutral-300 placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
              </>
              <>
                <input
                  type="text"
                  name="jersey"
                  placeholder="Enter Jersey Number"
                  value={values.jersey}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                />
                {errors.jersey && touched.jersey && (
                  <p className="text-8-9 text-red-500">{errors.jersey}</p>
                )}
              </>
            </div>

            {/* --- RESPONSIVE GRID --- */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <>
                <select
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                >
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                {errors.position && touched.position && (
                  <p className="text-8-9 text-red-500">{errors.position}</p>
                )}
              </>

              <>
                <select
                  name="foot"
                  value={values.foot}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
                >
                  <option value="">Select Foot</option>
                  {["Left", "Right", "Both"].map((foot) => (
                    <option key={foot} value={foot}>
                      {foot}
                    </option>
                  ))}
                </select>
                {errors.foot && touched.foot && (
                  <p className="text-8-9 text-red-500">{errors.foot}</p>
                )}
              </>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-dark text-12-14 font-semibold pl-4 md:pl-5">
            Social Information
          </h2>
          <div className="w-full flex flex-col px-4 md:px-5 gap-4">
            {/* --- RESPONSIVE GRID --- */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="xUrl"
                placeholder="Enter Twitter URL"
                value={values.xUrl}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              <input
                type="text"
                name="igUrl"
                placeholder="Enter Instagram URL"
                value={values.igUrl}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
            </div>

            {/* --- RESPONSIVE GRID --- */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fbUrl"
                placeholder="Enter Facebook URL"
                value={values.fbUrl}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
              <input
                type="text"
                name="ttUrl"
                placeholder="Enter Tiktok URL"
                value={values.ttUrl}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-10 px-2"
              />
            </div>
          </div>
        </div>

        <div className="w-full px-4 md:px-6 my-10">
          <button
            type="submit"
            className="bg-primary-2 w-full h-12 text-white text-14-16 font-bold rounded-lg py-2"
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