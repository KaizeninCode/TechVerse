import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string()
    .label("Please enter your username")
    .min(2, "Too short")
    .max(70, "Too long")
    .required("Please enter your username"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min("Password must be atleast 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "password must match")
    .required("please confirm your password"),
});

export const signinValidationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Please enter a valid email address ")
    .required("Email is required"),
  password: Yup.string().required("Please enter your password"),
});
