"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import signUpImage from "@/public/images/3d-rendering-of-cartoon-like-man-working-on-computer.png";
import stars from "@/public/images/close-up-view-of-christmas-balls-concept.png";
import Scoutflairlogo from "@/public/icons/Scoutflairlogo.svg";
import { Field, Form, Formik } from "formik";
import { SignUpValidationSchema } from "../../../schemas/Schema";
import { useAxios } from "../../../api/base";
import { useSearchParams } from "next/navigation";
import { Urls, positions } from "../../../constants/constants";
import Swal from "sweetalert2";
import Image from "next/image";

const PlayerSignUp: React.FC = () => {
  const { requestApi } = useAxios();
  const pathname = usePathname();
  const router = useRouter();
  const urlParts = pathname.split("/").filter(Boolean);
  const type = urlParts[1];
  console.log(type);
  const [teams, setTeams] = useState<[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await requestApi("/api/v1/est/namesList", "GET");
        setTeams(response.data);
      } catch (error: any) {
        console.error("Submission error:", error.response.data);
        alert("An error occurred during submission. Please try again.");
      }
    };
    fetchTeams();
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    position: "",
    dob: "",
    licenceNumber: "",
    experience: "",
    currentTeam: "",
    email: "",
    password: "",
    confirmPassword: "",
    preferredFoot: "",
    usertype: type || "",
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    console.log("Submission Block", values);
    const newValues = {
      ...values,
      fullName: values.firstName + " " + values.lastName,
    };
    const { confirmPassword, firstName, lastName, ...rest } = newValues;
    console.log("Submission Block", rest);
    try {
      const response = await requestApi("/scoutflair/v1/signup", "POST", rest);
      console.log(response.data);

      if (response.status) {
        router.push("/auth/sign-up/success");
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#041931] flex flex-col md:flex-row">
      <div className="xs:hidden md:block w-full md:w-1/2 flex flex-col justify-center items-center md:h-screen bg-[#041931] px-10 md:p-0">
        <div className="flex flex-col text-white text-center md:text-left px-20 mt-14">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Unlock Your Football Potentials With Scoutflair
          </h1>
          <Link href={Urls.HOME}>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Image className="w-8 h-8" src={Scoutflairlogo} alt="" />
              <span className="text-xl font-bold">Scout</span>
              <span className="text-xl">Flair</span>
            </div>
          </Link>
        </div>
        <div className="flex z-20">
          <Image src={signUpImage} className="w-[720px]" alt="" />
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full flex justify-center items-center bg-[#f8f8ff] p-4 md:p-8">
        <div className="w-full max-w-md md:max-w-lg bg-white rounded-lg p-6 shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-sm text-gray-600">Please enter your details</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => {
              // console.log(errors)
              return (
                <Form className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Field
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      className="flex-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div>
                        <p style={{ color: "red" }}>{errors.firstName}</p>
                      </div>
                    ) : null}
                    <Field
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      className="flex-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div>
                        <p style={{ color: "red" }}>{errors.lastName}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Field
                      as="select"
                      placeholder="Position"
                      name="position"
                      className="flex-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="" label="Select a position" />
                      {positions.map((position: any) => (
                        <option
                          className="text-black"
                          key={position}
                          value={position}
                        >
                          {position}
                        </option>
                      ))}
                    </Field>
                    {errors.position && touched.position ? (
                      <div>
                        <p style={{ color: "red" }}>{errors.position}</p>
                      </div>
                    ) : null}
                    <Field
                      type="date"
                      placeholder="Date of Birth"
                      name="dob"
                      className="flex-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.dob && touched.dob ? (
                      <div>
                        <p style={{ color: "red" }}>{errors.dob}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Field
                      as="select"
                      placeholder="Current Team"
                      name="currentTeam"
                      className="flex-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="" label="Select a team" />
                      {teams.map((team: any) => (
                        <option className="text-black" key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </Field>
                    {errors.currentTeam && touched.currentTeam ? (
                      <div>
                        <p style={{ color: "red" }}>{errors.currentTeam}</p>
                      </div>
                    ) : null}
                    <Field
                      type="text"
                      placeholder="Preferred Foot"
                      name="preferredFoot"
                      className="flex-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.preferredFoot && touched.preferredFoot ? (
                      <div>
                        <p style={{ color: "red" }}>{errors.preferredFoot}</p>
                      </div>
                    ) : null}
                  </div>
                  <Field
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.email && touched.email ? (
                    <div>
                      <p style={{ color: "red" }}>{errors.email}</p>
                    </div>
                  ) : null}
                  <Field
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.password && touched.password ? (
                    <div>
                      <p style={{ color: "red" }}>{errors.password}</p>
                    </div>
                  ) : null}
                  <Field
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div>
                      <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                    </div>
                  ) : null}
                  <div className="flex items-center space-x-2">
                    <label className="text-gray-700 text-sm">
                      By creating an account, you are agreeing to our{" "}
                      <span className="font-bold italic">Terms of Service</span>{" "}
                      and{" "}
                      <span className="font-bold italic">Privacy Policy</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#f2a725] text-black font-bold rounded-md hover:bg-yellow-500 transition"
                    // disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                  </button>
                </Form>
              );
            }}
          </Formik>
          <div className="text-center my-4">
            <p className="text-gray-600 font-bold">Or</p>
          </div>
          <div className="space-y-2">
            <button className="w-full py-2 border border-black rounded-md flex items-center justify-center space-x-2">
              <span>Sign up with Google</span>
            </button>
            <button className="w-full py-2 border border-black rounded-md flex items-center justify-center space-x-2">
              <span>Sign up with Apple</span>
            </button>
            <button className="w-full py-2 border border-black rounded-md flex items-center justify-center space-x-2">
              <span>Sign up with Facebook</span>
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Already have an account?
              <Link href={Urls.LOGIN}>
                <span className="font-bold text-[#010e1d]"> Sign In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSignUp;
