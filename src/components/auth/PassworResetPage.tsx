"use client";

import React from "react";
import Scoutflairlogo from "../../../public/icons/Scoutflairlogo.svg";
import { Formik, Form, Field } from "formik";
import { EmailValidationSchema } from "../../schemas/Schema";
import bgImage from "@/public/images/frame-3404.png";
import { useAxios } from "../../api/base";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { IEmailPayload } from "../../types/types";
import { Urls } from "@/constants/constants";
import Image from "next/image";

const PasswordResetPage: React.FC = () => {
  const { requestApi } = useAxios();
  const router = useRouter();

  const initialValues: IEmailPayload = {
    email: "",
  };

  const handleSubmit = async (values: IEmailPayload) => {
    console.log("Submission Block", values);
    try {
      const response = await requestApi(
        `/scoutflair/v1/signup/recover/first/${values.email}/`,
        "GET"
      );
      console.log(response.data);
      if (response.status) {
        // startRecover(values.email);
        Swal.fire({
          title: "Password Reset Link Sent!",
          text: "",
          icon: "success",
        });
        router.push(Urls.PASSWORDRESETTOKEN);
      } else {
        Swal.fire({
          title: "Oops...",
          text: `${response.data.response.data.message}`,
          icon: "error",
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error.response.data);
      alert("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 overflow-hidden bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="absolute inset-0 overflow-hidden bg-[#010e1d]/90">
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-2xl bg-white p-8 md:p-12"
            style={{ boxShadow: "0px 6px 10px 0 rgba(0,0,0,0.14)" }}
          >
            <div className="flex flex-col justify-start items-center gap-8">
              <div className="flex flex-col justify-start items-center gap-6">
                <div className="flex flex-col justify-start items-center gap-8">
                  <div className="flex flex-col justify-start items-center relative gap-4">
                    <div className="flex justify-start items-center relative gap-6">
                      <Image
                        className="w-14 h-14"
                        src={Scoutflairlogo}
                        alt="logo"
                      />
                    </div>
                    <p className="w-full text-lg text-center text-black/80">
                      Enter your registered email address to receive a password
                      reset link.
                    </p>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={EmailValidationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form className="flex flex-col justify-start items-start w-full relative gap-6">
                        <div className="w-full">
                          <Field
                            type="text"
                            placeholder="Email address or Username"
                            className="w-full h-12 p-4 rounded-lg border border-black/80 text-black"
                            name="email"
                          />
                          {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                          ) : null}
                        </div>
                        <div className="flex flex-col justify-center items-center w-full gap-6">
                          <button
                            type="submit"
                            className="w-full h-12 flex justify-center items-center gap-2.5 px-6 py-2.5 rounded-[20px] bg-[#f2a725] text-2xl font-medium text-black"
                          >
                            Continue
                          </button>
                          <p className="w-full text-base font-semibold text-center text-[#f00] cursor-pointer">
                            Cancel
                          </p>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
