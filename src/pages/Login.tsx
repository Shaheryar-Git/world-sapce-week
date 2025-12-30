import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Formik, Field, ErrorMessage, FormikHelpers, Form } from "formik";
import LoginSchema from "@/Validation/LoginSchema";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

interface FormValues {
	email: string;
	password: string;
}

const Login = () => {
	const { user,login} = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			// Redirect authenticated users to a protected page
			navigate("/");
		}
	}, [user, navigate]);

	 const handleLogin = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const success = await login(values.email, values.password); // Pass email and password
      if (success) {
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error("Failed to login");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Failed to login");
    } finally {
      setSubmitting(false);
    }
  };

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const parallaxOffset = scrollY * 0.3;
	const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

	return (
		<div className="min-h-screen bg-[#220536]">
			<section className="relative py-24 hero-gradient overflow-hidden">
				<div className="hero-particles">
					<div
						className="absolute inset-0 hero-gradient"
						style={{
							transform: `translateY(${parallaxOffset}px)`,
						}}
					/>
					<ParticlesBackground />
					<div className="absolute top-10 left-10 w-24 h-24 bg-[#9327e0]/10 rounded-full blur-xl animate-pulse" />
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
							<div className="inline-flex items-center gap-3 glass rounded-full px-4 py-2 mb-6 hover:bg-white/10 transition-all duration-500 group">
								<Rocket className="w-4 h-4 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
								<span className="text-white text-sm font-medium">
									Member Access
								</span>
								<Star className="w-4 h-4 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
							</div>
							<h1 className="text-3xl font-bold text-white mb-2">
								Welcome Back
							</h1>
							<p className="text-gray-300">
								Sign in to your World Space Week account
							</p>
						</div>

						<Formik
							initialValues={{
								email: "",
								password: "",
							}}
							validationSchema={LoginSchema}
							onSubmit={handleLogin}
						>
							{({ errors, touched, isSubmitting }) => (
								<Form className="space-y-6">
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
									<div>
										<label className="block text-sm font-medium text-white mb-2">
											Password
										</label>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<Field
												name="password"
												type={
													showPassword
														? "text"
														: "password"
												}
												className={`w-full pl-10 pr-12 py-3 bg-[#220536]/50 border ${
													errors.password &&
													touched.password
														? "border-red-500"
														: "border-[#9327e0]/30"
												} rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
												placeholder="Enter your password"
											/>
											<button
												type="button"
												onClick={() =>
													setShowPassword(
														!showPassword
													)
												}
												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#9327e0] transition-colors duration-300"
											>
												{showPassword ? (
													<EyeOff className="w-5 h-5" />
												) : (
													<Eye className="w-5 h-5" />
												)}
											</button>
										</div>
										<ErrorMessage
											name="password"
											component="div"
											className="text-red-500 text-sm mt-1"
										/>
									</div>
									<div className="flex items-center justify-between">
										<label className="flex items-center">
											<Field
												name="rememberMe"
												type="checkbox"
												className="rounded border-[#9327e0]/30 text-[#9327e0] focus:ring-[#9327e0] bg-[#220536]/50"
											/>
											<span className="ml-2 text-sm text-gray-300">
												Remember me
											</span>
										</label>
										<Link
											to="/forgot-password"
											className="text-sm text-[#9327e0] hover:text-[#204d74] transition-colors duration-300"
										>
											Forgot password?
										</Link>
									</div>
									<button
										type="submit"
										className="btn-primary w-full"
										disabled={isSubmitting}
									>
										Sign In
									</button>
								</Form>
							)}
						</Formik>
						<div className="mt-8 text-center">
							<p className="text-gray-300">
								Don't have an account?{" "}
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

export default Login;
