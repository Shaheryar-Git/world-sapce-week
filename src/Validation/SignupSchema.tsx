import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.required("Name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]*$/,
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and no spaces"
		)
		.required("Password is required"),
	registerAs: Yup.string().required("Password is required"),
	terms: Yup.bool()
		.oneOf([true], "You must agree to the terms of service")
		.required("You must agree to the terms of service"),
});

export default SignupSchema;
