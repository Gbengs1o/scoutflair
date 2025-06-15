"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useCreateAcademy } from "@/hooks/academy";
import { useUploadLogo } from "@/hooks/common";
import { FaImage } from "react-icons/fa6";
import { Loader } from "@mantine/core";

// Reusable Form Field Component
const FormField = ({ label, name, type = "text", value, onChange, onBlur, error, touched, ...props }) => (
    <div className="w-full flex flex-col gap-1">
        <label htmlFor={name} className="text-sm font-semibold text-gray-700">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full rounded-lg border bg-white text-dark text-base border-gray-300 h-11 px-3 outline-none focus:ring-2 focus:ring-primary-2 focus:border-transparent ${error && touched ? 'border-red-500' : ''}`}
            {...props}
        />
        {error && touched && <p className="text-xs text-red-600">{error}</p>}
    </div>
);

const AddAcademy = () => {
  const { loading, create, success } = useCreateAcademy();
  const { upload, data, loading: uploadingLogo, success: uploadedLogo } = useUploadLogo();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileImageData, setFileImageData] = useState<string>("");

  const formik = useFormik({
    initialValues: { /* ... same as original ... */ },
    validate: (values) => { /* ... same as original ... */ },
    onSubmit: () => upload(file!),
  });

  useEffect(() => {
    if (!uploadingLogo && uploadedLogo) {
      create({ /* ... same as original ... */ });
    }
  }, [uploadingLogo, uploadedLogo, create, data, formik.values]);

  useEffect(() => {
    if (!loading && success) {
      window.location.replace("/dashboard/scout/academies");
    }
  }, [loading, success]);

  return (
    <div className="w-full p-4 sm:p-6">
      <form method="POST" onSubmit={formik.handleSubmit}>
        <div className="w-full p-4 sm:p-6 flex flex-col gap-6 bg-white shadow-custom rounded-2xl">
          <h2 className="text-lg text-primary-2 font-semibold">Add New Academy</h2>
          
          <div>
            <label className="text-sm font-semibold text-gray-700">Academy Image</label>
            <div
              onClick={() => fileRef.current?.click()}
              className={`mt-1 w-full h-40 border-2 border-dashed rounded-lg overflow-hidden cursor-pointer flex flex-col justify-center items-center gap-2 transition-colors ${file ? 'border-primary-2' : 'border-gray-300 hover:border-primary-2'}`}
            >
              {file ? (
                <img src={fileImageData} alt="Preview" className="object-cover w-full h-full" />
              ) : (
                <>
                  <FaImage className="text-gray-400 text-3xl" />
                  <p className="text-sm font-medium text-gray-500">Click to upload image</p>
                </>
              )}
              <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      setFile(file);
                      setFileImageData(reader.result as string);
                    };
                  }
              }}/>
            </div>
            {formik.errors.file && formik.touched.name && <p className="text-xs text-red-600 mt-1">{formik.errors.file}</p>}
          </div>

          {/* Responsive Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Example of using the FormField component */}
              <FormField label="Academy Name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.name} touched={formik.touched.name} />
              <FormField label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.address} touched={formik.touched.address} />
              <FormField label="Email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.email} touched={formik.touched.email} />
              <FormField label="Phone Number" name="phone" type="tel" value={formik.values.phone} onChange={(e) => !isNaN(Number(e.target.value)) && formik.setFieldValue("phone", e.target.value)} onBlur={formik.handleBlur} error={formik.errors.phone} touched={formik.touched.phone} />
              <FormField label="State" name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.state} touched={formik.touched.state} />
              <FormField label="LGA" name="lga" value={formik.values.lga} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.lga} touched={formik.touched.lga} />
              <FormField label="Latitude" name="latitude" value={formik.values.latitude} onChange={(e) => !isNaN(Number(e.target.value)) && formik.setFieldValue("latitude", e.target.value)} onBlur={formik.handleBlur} error={formik.errors.latitude} touched={formik.touched.latitude} />
              <FormField label="Longitude" name="longitude" value={formik.values.longitude} onChange={(e) => !isNaN(Number(e.target.value)) && formik.setFieldValue("longitude", e.target.value)} onBlur={formik.handleBlur} error={formik.errors.longitude} touched={formik.touched.longitude} />
              <FormField label="Number Of Players" name="playersCount" value={formik.values.playersCount} onChange={(e) => !isNaN(Number(e.target.value)) && formik.setFieldValue("playersCount", e.target.value)} onBlur={formik.handleBlur} error={formik.errors.playersCount} touched={formik.touched.playersCount} />
              <FormField label="Year Founded" name="founded" value={formik.values.founded} onChange={(e) => !isNaN(Number(e.target.value)) && formik.setFieldValue("founded", e.target.value)} onBlur={formik.handleBlur} error={formik.errors.founded} touched={formik.touched.founded} />
              <FormField label="Coach Name" name="principal" value={formik.values.principal} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.principal} touched={formik.touched.principal} />
              <FormField label="Rating" name="rating" value={formik.values.rating} onChange={(e) => !isNaN(Number(e.target.value)) && formik.setFieldValue("rating", e.target.value)} onBlur={formik.handleBlur} error={formik.errors.rating} touched={formik.touched.rating} />
              {/* ... continue for all other fields ... */}
          </div>

          <div className="w-full flex flex-col gap-1 md:col-span-2">
            <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
            <textarea id="description" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full rounded-lg border bg-white text-dark text-base border-gray-300 h-24 p-3 resize-none outline-none focus:ring-2 focus:ring-primary-2 focus:border-transparent ${formik.errors.description && formik.touched.description ? 'border-red-500' : ''}`}/>
            {formik.errors.description && formik.touched.description && <p className="text-xs text-red-600">{formik.errors.description}</p>}
          </div>

          <div className="w-full flex justify-center mt-4">
            <button type="submit" className="w-48 h-11 grid place-content-center rounded-lg text-white bg-primary-2 font-semibold hover:bg-primary-2/90 transition-colors disabled:bg-gray-400" disabled={loading || uploadingLogo}>
              {loading || uploadingLogo ? <Loader color="white" size="sm" /> : "Add Academy"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAcademy;