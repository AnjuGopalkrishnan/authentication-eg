import * as yup from "yup";

export const signupUserSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Name must be at most 50 characters"),

  email: yup.string().email().required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must be at least 8 characters and contain at least one letter, one number, and one special character"
    ),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must be at least 8 characters and contain at least one letter, one number, and one special character"
    ),
});
