"use client";

import React, { useEffect, useState } from "react";
import Scoutflairlogo from "../../../public/icons/Scoutflairlogo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Urls } from "../../constants/constants";
import { Field, Form, Formik } from "formik";
import { PasswordResetValidationSchema } from "../../schemas/Schema";
import bgImage from "@/public/images/frame-3404.png";
import { useAxios } from "../../api/base";
import { useToken } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { IResetPasswordPayload } from "@/types/types";
import Image from "next/image";

const PasswordResetForm: React.FC = () => {
  const { requestApi } = useAxios();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only in the browser
    const searchParams = new URLSearchParams(window.location.search);
    setToken(searchParams.get("token"));
  }, []);

  const initialValues: IResetPasswordPayload = {
    newpassword: "",
    confirmpassword: "",
  };

  const handleSubmit = async (values: IResetPasswordPayload) => {
    const newValues = {
      password: values.newpassword,
      token: token,
      username: "",
    };

    try {
      const response = await requestApi(
        "/scoutflair/v1/signup/recover/second",
        "POST",
        newValues
      );
      if (response.status) {
        router.push(Urls.PASSWORDRESETSUCCESS);
      } else {
        Swal.fire({
          title: "Oops...",
          text: response.data.response.data.message,
          icon: "error",
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred during submission. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div
      className="w-full h-screen relative overflow-hidden bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="w-full h-full absolute left-0 top-0 overflow-hidden bg-[#010e1d]/90">
        <p className="absolute left-1/2 transform -translate-x-1/2 top-24 text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white">
          Choose Your Role
        </p>
        <div
          className="w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 md:p-12"
          style={{ boxShadow: "0px 6px 10px 0 rgba(0,0,0,0.14)" }}
        >
          <div className="flex flex-col justify-start items-center gap-10">
            <div className="flex flex-col justify-start items-center gap-6">
              <div className="flex flex-col justify-start items-center relative gap-4">
                <div className="flex justify-start items-center relative gap-6">
                  <Image
                    className="w-14 h-14"
                    src={Scoutflairlogo}
                    alt="logo"
                  />
                </div>
                <p className="w-full text-lg text-center text-black/80">
                  We have received your reset password. Please enter your new
                  password below
                </p>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={PasswordResetValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="flex flex-col justify-start items-start w-full relative gap-6">
                    <div className="w-full">
                      <Field
                        type="password"
                        placeholder="New Password"
                        className="w-full h-12 p-4 rounded-lg border border-black/80 text-black"
                        name="newpassword"
                      />
                      {errors.newpassword && touched.newpassword && (
                        <div className="text-red-500">{errors.newpassword}</div>
                      )}
                    </div>
                    <div className="w-full">
                      <Field
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full h-12 p-4 rounded-lg border border-black/80 text-black"
                        name="confirmpassword"
                      />
                      {errors.confirmpassword && touched.confirmpassword && (
                        <div className="text-red-500">
                          {errors.confirmpassword}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-center w-full gap-6">
                      <button
                        type="submit"
                        className="w-full h-12 flex justify-center items-center gap-2.5 px-6 py-2.5 rounded-[20px] bg-[#f2a725] text-2xl font-medium text-black"
                      >
                        Change Password
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
