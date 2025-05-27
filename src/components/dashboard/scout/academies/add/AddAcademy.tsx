"use client";

import React, { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import { useCreateAcademy } from "@/hooks/academy";
import { useUploadLogo } from "@/hooks/common";
import { FaImage } from "react-icons/fa6";
import { Loader } from "@mantine/core";

const AddAcademy = () => {
  const { loading, create, success } = useCreateAcademy();
  const {
    upload,
    data,
    loading: uploadingLogo,
    success: uploadedLogo,
  } = useUploadLogo();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileImageData, setFileImageData] = useState<string>("");

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
      address: "",
      description: "",
      email: "",
      founded: "",
      latitude: "",
      lga: "",
      longitude: "",
      name: "",
      phone: "",
      playersCount: "",
      principal: "",
      state: "",
      totalMatches: "",
      winCount: "",
      lostCount: "",
      graduatedCount: "",
      rating: "",
      file: "",
    },
    validate: (values) => {
      const errors: any = {};

      if (file === null) {
        errors.file = "Required";
      }

      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.address) {
        errors.address = "Required";
      }

      if (!values.description) {
        errors.description = "Required";
      }

      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.founded) {
        errors.founded = "Required";
      }

      if (!values.latitude) {
        errors.latitude = "Required";
      }

      if (!values.lga) {
        errors.lga = "Required";
      }

      if (!values.longitude) {
        errors.longitude = "Required";
      }

      if (!values.state) {
        errors.state = "Required";
      }

      if (!values.phone) {
        errors.phone = "Required";
      }

      if (!values.playersCount) {
        errors.playersCount = "Required";
      }

      if (!values.principal) {
        errors.principal = "Required";
      }

      if (!values.rating) {
        errors.rating = "Required";
      }

      if (!values.totalMatches) {
        errors.totalMatches = "Required";
      }

      if (!values.winCount) {
        errors.winCount = "Required";
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
        imageUrl: data,
        description: values.description,
        email: values.email,
        founded: `${values.founded}-01-01`,
        latitude: values.latitude,
        lga: values.lga,
        longitude: values.longitude,
        name: values.name,
        phone: values.phone,
        playersCount: Number.parseInt(values.playersCount),
        principal: values.principal,
        state: values.state,
        totalMatches: Number.parseInt(values.totalMatches),
        winCount: Number.parseInt(values.winCount),
        lostCount: Number.parseInt(values.lostCount),
        graduatedCount: Number.parseInt(values.graduatedCount),
        rating: Number.parseFloat(values.rating),
      });
    }
  }, [uploadingLogo, uploadedLogo]);

  useEffect(() => {
    if (!loading && success) {
      window.location.replace("/dashboard/scout/academies");
    }
  }, [loading, success]);

  return (
    <div className="w-full p-3 sm:p-6">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="w-full p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 bg-white shadow-custom rounded-[1rem]">
          <h2 className="text-18-20 sm:text-16-19 text-primary-2 font-semibold">
            Add Academy
          </h2>
          
          {/* Image Upload Section */}
          <div>
            <div
              onClick={() => fileRef.current?.click()}
              className={`w-full h-32 sm:h-40 ${
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
                  <FaImage className="text-primary-2 text-xl sm:text-2xl" />
                  <p className="text-12-14 sm:text-14-16 font-medium text-primary-2 text-center px-2">
                    Upload academy image
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
              <p className="text-10-12 sm:text-8-9 text-red-600 mt-1">{errors.file}</p>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Academy Name */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Academy Name
              </h2>
              <input
                type="text"
                name="name"
                placeholder=""
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.name && touched.name && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Address */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Address
              </h2>
              <input
                type="text"
                name="address"
                placeholder=""
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.address && touched.address && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Email */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">Email</h2>
              <input
                type="email"
                name="email"
                placeholder=""
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.email && touched.email && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Phone Number
              </h2>
              <input
                type="tel"
                name="phone"
                placeholder=""
                value={values.phone}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("phone", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.phone && touched.phone && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* State */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">State</h2>
              <input
                type="text"
                name="state"
                placeholder=""
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.state && touched.state && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.state}</p>
              )}
            </div>

            {/* LGA */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">LGA</h2>
              <input
                type="text"
                name="lga"
                placeholder=""
                value={values.lga}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.lga && touched.lga && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.lga}</p>
              )}
            </div>

            {/* Latitude */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
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
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.latitude && touched.latitude && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.latitude}</p>
              )}
            </div>

            {/* Longitude */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
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
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.longitude && touched.longitude && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.longitude}</p>
              )}
            </div>

            {/* Number of Players */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Number Of Players
              </h2>
              <input
                type="text"
                name="playersCount"
                placeholder=""
                value={values.playersCount}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("playersCount", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.playersCount && touched.playersCount && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.playersCount}</p>
              )}
            </div>

            {/* Year Founded */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Year Founded
              </h2>
              <input
                type="text"
                name="founded"
                placeholder=""
                value={values.founded}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("founded", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.founded && touched.founded && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.founded}</p>
              )}
            </div>

            {/* Coach Name */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Coach Name
              </h2>
              <input
                type="text"
                name="principal"
                placeholder=""
                value={values.principal}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.principal && touched.principal && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.principal}</p>
              )}
            </div>

            {/* Rating */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
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
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.rating && touched.rating && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.rating}</p>
              )}
            </div>

            {/* Total Matches Played */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Total Matches Played
              </h2>
              <input
                type="text"
                name="totalMatches"
                placeholder=""
                value={values.totalMatches}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("totalMatches", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.totalMatches && touched.totalMatches && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.totalMatches}</p>
              )}
            </div>

            {/* Number of Graduated Players */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Number of Graduated Players
              </h2>
              <input
                type="text"
                name="graduatedCount"
                placeholder=""
                value={values.graduatedCount}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("graduatedCount", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.graduatedCount && touched.graduatedCount && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.graduatedCount}</p>
              )}
            </div>

            {/* Number of Matches Won */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Number of Matches Won
              </h2>
              <input
                type="text"
                name="winCount"
                placeholder=""
                value={values.winCount}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("winCount", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.winCount && touched.winCount && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.winCount}</p>
              )}
            </div>

            {/* Number of Matches Lost */}
            <div className="w-full flex flex-col gap-1 sm:gap-1">
              <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
                Number of Matches Lost
              </h2>
              <input
                type="text"
                name="lostCount"
                placeholder=""
                value={values.lostCount}
                onChange={(e) => {
                  const res = e.target.value.trim();
                  if (isNaN(Number(res))) return;
                  setFieldValue("lostCount", res);
                }}
                onBlur={handleBlur}
                className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-12 sm:h-10 px-3 sm:px-2"
              />
              {errors.lostCount && touched.lostCount && (
                <p className="text-10-12 sm:text-8-9 text-red-600">{errors.lostCount}</p>
              )}
            </div>
          </div>

          {/* Description Field - Full Width */}
          <div className="w-full flex flex-col gap-1 sm:gap-1">
            <h2 className="text-14-16 sm:text-12-14 font-semibold text-[#333333]">
              Description
            </h2>
            <textarea
              name="description"
              placeholder=""
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border bg-white placeholder:text-placeholder text-dark text-16-18 sm:text-14-16 font-semibold placeholder:text-opacity-[0.88] border-border-gray h-24 sm:h-20 resize-none p-3 sm:p-2"
            />
            {errors.description && touched.description && (
              <p className="text-10-12 sm:text-8-9 text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full grid place-content-center mt-3 sm:mt-5">
            <button
              type="submit"
              className="w-[180px] sm:w-[160px] grid place-content-center rounded-md h-12 sm:h-10 text-white bg-primary-2 text-16-18 sm:text-14-16 font-semibold"
            >
              {loading || uploadingLogo ? (
                <Loader color="white.6" />
              ) : (
                "Add Academy"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAcademy;