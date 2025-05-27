"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Scoutflairlogo from "@/public/icons/Scoutflairlogo.svg"; // Make sure this path is correct
import bgImage from "@/public/images/scout-sign-in.png"; // Make sure this path is correct
import Link from "next/link";
import { Urls } from "@/constants/constants";
import { useAxios } from "@/api/base";
import { Form, Formik, Field, FormikHelpers } from "formik";
import { LoginValidationSchema } from "@/schemas/Schema";
import Swal from "sweetalert2";
import Image from "next/image";
import { useToken } from "@/providers/AuthProvider";
import { Loader } from "@mantine/core";
// import { setPlayerData, setScoutData } from "@/providers/UserProvider"; // Not used in this component

const LoginPage = () => {
  return (
    // Suspense for Next.js 13+ App Router if needed for data fetching within Content
    // For simple client components, Suspense around useSearchParams might not be strictly necessary
    // unless Content itself does something suspendable.
    <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center"><Loader /></div>}>
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
        setToken(token); // Assuming setToken handles persistence (localStorage/cookie)
        Swal.fire({
          title: "Logged In successfully!",
          text: "Redirecting to dashboard",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        // Delay redirection slightly to allow Swal to be seen
        setTimeout(() => {
          if (redirect === "true") {
            router.back();
          } else {
            if (response.data.userType === "PLAYER") {
              router.push(Urls.PLAYER_SPOTLIGHT); // Use router.push for client-side nav
            } else if (response.data.userType === "SCOUT") {
              router.push(Urls.SCOUT_OVERVIEW);
            } else if (response.data.userType === "DEMOUSER") {
              router.push(Urls.SCOUT_OVERVIEW);
            } else {
              router.push(Urls.HOME); // Fallback redirect
            }
          }
        }, 2000);

        resetForm();
      } else {
        Swal.fire({
          title: "Oops...",
          text: `${response.data?.response?.data || response.data?.message || 'Login failed. Please check your credentials.'}`,
          icon: "error",
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "An error occurred during submission. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Background Image Section - Hidden on mobile, visible on md+ */}
      <div
        className="hidden md:block md:w-2/5 lg:w-3/5 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      />

      {/* Form Section - Takes full width on mobile, specific width on md+ */}
      <div className="w-full md:w-3/5 lg:w-2/5 bg-[#f4f4f6] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Header with Logo and Sign Up Link (for larger screens) */}
        <div className="w-full max-w-md flex justify-between items-center mb-6 md:mb-8">
          <Link href={Urls.HOME} className="flex items-center gap-2">
            <Image className="w-5 h-5 sm:w-6 sm:h-6" src={Scoutflairlogo} alt="Scoutflair Logo" />
            <p className="text-sm sm:text-base font-semibold text-gray-800">Scoutflair</p>
          </Link>
          <p className="text-xs sm:text-sm text-gray-700 hidden md:block"> {/* Hidden on mobile */}
            Don't have an account?
            <Link href={Urls.SIGNUP} className="font-bold text-[#010e1d] hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xl sm:text-2xl font-bold text-left text-black">
              Sign in to your account
            </p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-left text-black/[0.72]">
              Please enter your details
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginValidationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-4" method="POST">
                <div>
                  <Field
                    type="text"
                    placeholder="Email address or Username"
                    name="username"
                    className={`w-full h-11 px-4 py-2 rounded-lg border ${touched.username && errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#f2a725] focus:border-transparent outline-none text-black bg-white text-sm sm:text-base`}
                    required
                  />
                  {errors.username && touched.username ? (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                  ) : null}
                </div>

                <div>
                  <Field
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={`w-full h-11 px-4 py-2 rounded-lg border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#f2a725] focus:border-transparent outline-none text-black bg-white text-sm sm:text-base`}
                    required
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  ) : null}
                </div>

                <div className="flex justify-end items-center w-full">
                  <Link href={Urls.PASSWORDRESET}>
                    <p className="text-xs sm:text-sm font-medium text-[#010e1d] hover:underline opacity-80">
                      Forgot Password?
                    </p>
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 sm:h-12 flex justify-center items-center gap-2.5 px-6 py-2.5 rounded-lg bg-[#f2a725] text-base sm:text-lg font-semibold text-black shadow-md hover:bg-[#e0981c] transition-colors duration-200 disabled:opacity-70"
                >
                  {loading ? <Loader color="black" size={24} /> : "Sign In"}
                </button>

                {/* Sign Up Link for smaller screens, placed below button */}
                <p className="text-xs sm:text-sm text-center text-gray-700 mt-2 md:hidden"> {/* Hidden on md+ */}
                  Don't have an account?
                  <Link href={Urls.SIGNUP} className="font-bold text-[#010e1d] hover:underline ml-1">
                    Sign Up
                  </Link>
                </p>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col gap-4 mt-6">
            {/* Divider (optional) */}
            <div className="flex items-center my-2">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-3 text-xs text-gray-500">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <Link href={""} aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()} > {/* Disabled Google Sign In for now */}
              <button
                type="button"
                disabled // Disable if not implemented
                className="w-full h-11 sm:h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-50 rounded-lg space-x-3 text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5" // Adjusted size
                  viewBox="0 0 24 24" // Common viewBox for Google icon
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.51H18.08C17.72 15.93 16.83 17.13 15.53 17.94V20.6H19.5C21.47 18.83 22.56 15.81 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C15.14 23 17.74 21.94 19.5 20.6L15.53 17.94C14.49 18.61 13.29 19.02 12 19.02C9.38 19.02 7.12 17.24 6.29 14.91H2.14V17.7C3.9 20.93 7.62 23 12 23Z" fill="#34A853"/>
                  <path d="M6.29 14.91C6.06 14.26 5.94 13.54 5.94 12.8C5.94 12.06 6.06 11.34 6.29 10.69V7.89H2.14C1.39 9.36 1 11.02 1 12.8C1 14.58 1.39 16.24 2.14 17.7L6.29 14.91Z" fill="#FBBC05"/>
                  <path d="M12 5.98C13.66 5.98 15.01 6.56 16.03 7.52L19.59 4.18C17.73 2.47 15.14 1.56 12 1.56C7.62 1.56 3.9 3.67 2.14 7.89L6.29 10.69C7.12 8.36 9.38 5.98 12 5.98Z" fill="#EA4335"/>
                </svg>
                <span className="font-medium text-gray-700">
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