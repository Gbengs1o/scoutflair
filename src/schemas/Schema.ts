import * as Yup from "yup";

export const SignUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must be less than 50 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name must be less than 50 characters")
    .required("Last Name is required"),
  position: Yup.string()
    .min(2, "Position must be at least 2 characters")
    .max(50, "Position must be less than 50 characters")
    .optional(),
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  // licenceNumber: Yup.string()
  //   .matches(/^[A-Z0-9]{6,10}$/, "Licence Number must be 6-10 characters and alphanumeric")
  //   .optional(),
  // experience: Yup.number()
  //   .min(0, "Experience must be a positive number")
  //   .max(50, "Experience cannot be more than 50 years")
  //   .optional(),
  currentTeam: Yup.string()
    .max(50, "Current Team must be less than 50 characters")
    .required("Current Team is required"),
  preferredFoot: Yup.string()
    .optional(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required("Confirm Password is required")
});

export const LoginValidationSchema = Yup.object({
  username: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
});

export const PasswordResetValidationSchema = Yup.object({
  newpassword: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newpassword')], 'Passwords must match')
    .required("Confirm Password is required")
})

export const EmailValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
})

export const TokenValidationSchema = Yup.object({
  token: Yup.string()
    .required("Token is required"),
})