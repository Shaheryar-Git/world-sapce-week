import React, { useState } from "react";
import { useEffect } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Link } from "react-router-dom";
import {
	Formik,
	Field,
	ErrorMessage,
	FormikHelpers,
	Form,
	useFormik,
} from "formik";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { ForgotPasswordSchema } from "@/Validation/ForgotPasswordSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ForgotPasswordValues {
	email: string;
}
const USERS_STORAGE_KEY = "wsw_users";

const ForgotPassword = () => {
	const [scrollY, setScrollY] = useState(0);

	const navigate = useNavigate();
	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleForgotPassword = async (
	values: ForgotPasswordValues,
	{ setSubmitting }: FormikHelpers<ForgotPasswordValues>
) => {
	try {
		const response = await axios.post(
			 `${import.meta.env.VITE_API_URL}/forgot-password`,
			{ email: values.email }, // request body
			// {
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// }
		);

		// success response
		toast.success(response.data.message || "OTP sent successfully!");
	
		console.log("response..", values.email);
		
		// navigate to OTP page
		navigate(`/otppage?email=${encodeURIComponent(values.email)}`);
	} catch (error: any) {
		console.error("Forgot Password Error:", error);

		if (error.response) {
			toast.error(error.response.data.error || "Failed to send OTP.");
		} else {
			toast.error("Network error. Please try again later.");
		}
	} finally {
		setSubmitting(false);
	}
};


	const parallaxOffset = scrollY * 0.3;
	const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

	return (
		<div className="min-h-screen bg-[#220536]">
			<section className="relative py-56 hero-gradient overflow-hidden">
				<div className="hero-particles">
					<div
						className="absolute inset-0 hero-gradient"
						style={{
							transform: `translateY(${parallaxOffset}px)`,
						}}
					/>
					<ParticlesBackground />
					<div className="absolute top-10 left-10 w-28 h-24 bg-[#9327e0]/10 rounded-full blur-xl animate-pulse" />
					<div className="absolute bottom-10 right-10 w-32 h-32 bg-[#204d74]/10 rounded-full blur-2xl animate-pulse delay-1000" />
				</div>
				<div
					className="relative z-10 max-w-md mx-auto px-4"
					style={{
						opacity: fadeOffset,
						transform: `translateY(${scrollY * 0.1}px)`,
					}}
				>
					<div className="glass-dark rounded-2xl p-8 shadow-2xl animate-scale-in">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold text-white mb-2">
								Password Verification
							</h1>
						</div>

						<Formik
							initialValues={{
								email: "",
							}}
							validationSchema={ForgotPasswordSchema}
							onSubmit={handleForgotPassword}
						>
							{({ errors, touched, isSubmitting }) => (
								<Form className="space-y-6 ">
									<div>
										<label className="block text-sm font-medium text-white mb-2">
											Email Address
										</label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="email"
												type="email"
												className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
													errors.email &&
													touched.email
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
												placeholder="your.email@example.com"
											/>
										</div>
										<ErrorMessage
											name="email"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>
									<button
										type="submit"
										className="btn-primary w-full flex justify-center items-center"
										disabled={isSubmitting}
									>
										{isSubmitting
											? "Sending..."
											: "Send OTP"}
									</button>
								</Form>
							)}
						</Formik>

						<div className="mt-8 text-center">
							<p className="text-gray-300">
								Back to Login?{" "}
								<Link
									to="/signup"
									className="text-[#9327e0] hover:text-[#204d74] transition-colors duration-300 font-medium"
								>
									Sign up here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ForgotPassword;
