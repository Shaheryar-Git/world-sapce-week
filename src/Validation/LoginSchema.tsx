import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .transform((value) => value.replace(/\s/g, '')) // Remove all spaces
    .min(8, "Password must be at least 8 characters (no spaces allowed)")
    .matches(
       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number (no spaces allowed)"
    )
    .required("Password is required"),
});

export default LoginSchema;