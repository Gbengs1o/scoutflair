"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Scoutflairlogo from "@/public/icons/Scoutflairlogo.svg";
import bgImage from "@/public/images/scout-sign-in.png";
import Link from "next/link";
import { Urls } from "@/constants/constants";
import { useAxios } from "@/api/base";
import { Form, Formik, Field, FormikHelpers } from "formik";
import { LoginValidationSchema } from "@/schemas/Schema";
import Swal from "sweetalert2";
import Image from "next/image";
import { useToken } from "@/providers/AuthProvider";
import { Loader } from "@mantine/core";
import { setPlayerData, setScoutData } from "@/providers/UserProvider";

const LoginPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  );
};

const Content: React.FC = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const router = useRouter();
  const { requestApi } = useAxios();
  const { setToken } = useToken();

  const [loading, setLoading] = useState<boolean>(false);

  interface ILoginPayload {
    username: string;
    password: string;
  }

  const initialValues: ILoginPayload = {
    password: "",
    username: "",
  };

  const onSubmit = async (
    values: ILoginPayload,
    { resetForm }: FormikHelpers<ILoginPayload>
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await requestApi(
        "/scoutflair/v1/signin",
        "POST",
        values
      );

      setLoading(false);

      if (response.status) {
        const token = response.data.jwtToken;
        setToken(token);
        Swal.fire({
          title: "Logged In successfully!",
          text: "Redirecting to dashboard",
          icon: "success",
        });
        if (redirect === "true") {
          router.back();
        } else {
          if (response.data.userType === "PLAYER") {
            window.location.assign(Urls.PLAYER_SPOTLIGHT);
          } else if (response.data.userType === "SCOUT") {
            window.location.assign(Urls.SCOUT_OVERVIEW);
          } else if (response.data.userType === "DEMOUSER") {
            window.location.assign(Urls.SCOUT_OVERVIEW);
          }
        }

        resetForm();
      } else {
        Swal.fire({
          title: "Oops...",
          text: `${response.data.response.data}`,
          icon: "error",
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error.response.data);
      alert("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="flex flex-col absolute right-0 items-center justify-center w-full md:w-3/5 p-4 h-screen bg-[#f4f4f6] md:rounded-tl-2xl md:rounded-bl-2xl">
        <div className="flex flex-row xs:gap-5 md:gap-40 pt-4">
          <Link href={Urls.HOME}>
            <span className="flex flex-row gap-3">
              <Image className="w-4 h-4" src={Scoutflairlogo} alt="" />
              <p className="">Scoutflair</p>
            </span>
          </Link>
          <p className="w-56 opacity-80 text-base text-left">
            <span className="w-56 opacity-80 text-base font-light text-left text-black">
              Don&apos;t have an account?
            </span>
            <span className="w-56 opacity-80 text-base font-semibold text-left text-black">
              {" "}
            </span>
            <Link href={Urls.SIGNUP}>
              <span className="w-56 opacity-80 text-base font-bold text-left text-[#010e1d]">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
        <div className="md:w-1/2 max-w-md h-fit p-6 bg-white rounded-2xl shadow-lg my-10 md:mx-32">
          <div className="mt-6 mb-6">
            <p className="text-2xl font-bold text-left text-black">
              Sign in to your account
            </p>
            <p className="text-xs font-bold text-left text-black/[0.72] opacity-88">
              Please enter your details
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginValidationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form
                className="flex flex-col justify-start items-start w-full gap-4"
                method="POST"
              >
                <div className="w-full">
                  <Field
                    type="text"
                    placeholder="Email address or Username"
                    name="username"
                    className="w-full h-10 p-4 rounded-lg border border-black/80 text-black bg-white"
                    // value={username}
                    // onChange={(e: any) => setUsername(e.target.value)}
                    required
                  />
                  {errors.username && touched.username ? (
                    <div>
                      <p style={{ color: "red" }}>{errors.username}</p>
                    </div>
                  ) : null}
                </div>
                <div className="w-full">
                  <Field
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="w-full h-10 p-4 rounded-lg border border-black/80 text-black bg-white"
                    // value={password}
                    // onChange={(e: any) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && touched.password ? (
                    <div>
                      <p style={{ color: "red" }}>{errors.password}</p>
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-end items-center w-full gap-4">
                  <div className="flex items-center gap-2">
                    <Link href={Urls.PASSWORDRESET}>
                      <p className="text-bold opacity-72">Forgot Password</p>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 flex justify-center items-center gap-2.5 px-6 py-2.5 rounded-lg bg-[#f2a725] text-2xl font-semibold text-black shadow-lg"
                  >
                    {loading ? <Loader color="black.6" size={26} /> : "Sign In"}
                  </button>
                  <p className="opacity-80 text-base text-left">
                    <span className="text-black">
                      Don&apos;t have an account?
                    </span>
                    <Link href={Urls.HOME} className="font-bold text-[#010e1d]">
                      {" "}
                      Sign Up
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex flex-col gap-4 mt-6">
            <Link href={""}>
              <button
                type="button"
                className="w-full h-10 flex items-center justify-center border border-black/[0.56] rounded-xl space-x-4"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <!-- SVG path for Google Icon --> */}
                </svg>
                <span className="text-xl font-medium text-black">
                  Sign in with Google
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
