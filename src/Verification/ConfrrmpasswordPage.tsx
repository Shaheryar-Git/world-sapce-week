import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Lock, Eye, EyeOff, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import ConfirmPasswordSchema from "@/Validation/ConfirmPassword";
import axios from "axios";


interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const ConfirmPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword,setNewpassword]=useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const handleConfirmPassword = async (
  values: FormValues,
  { setSubmitting }: FormikHelpers<FormValues>
) => {
  try {
    // ✅ Get email from URL
    const queryParams = new URLSearchParams(window.location.search);
    const emailFromURL = queryParams.get("email");
    if (emailFromURL) {
      setEmail(emailFromURL);
    }

    // ✅ Use Formik values instead of local newPassword state
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/reset-password`,
      {
        email: emailFromURL,
        newPassword: values.newPassword,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    toast.success(response.data.message || "Password reset successfully!");
    navigate("/login");
  } catch (error: any) {
    console.error("Reset Password Error:", error);
    toast.error(error.response?.data?.error || "Something went wrong");
  } finally {
    setSubmitting(false);
  }
};

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  return (
    <div className="min-h-screen ">
      
      <section className="relative py-32 hero-gradient overflow-hidden">
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
                  Password Reset
                </span>
                <Star className="w-4 h-4 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Set New Password
              </h1>
              <p className="text-gray-300">
                Enter your new password to complete the reset
              </p>
            </div>

            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={ConfirmPasswordSchema}
              onSubmit={handleConfirmPassword}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Field
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        className={`w-full pl-10 pr-12 py-3 bg-[#220536]/50 border ${
                          errors.newPassword && touched.newPassword
                            ? "border-red-500"
                            : "border-[#9327e0]/30"
                        } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Field
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className={`w-full pl-10 pr-12 py-3 bg-[#220536]/50 border ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "border-red-500"
                            : "border-[#9327e0]/30"
                        } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#9327e0] transition-colors duration-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    Reset Password
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Back to Login?{" "}
                <Link
                  to="/login"
                  className="text-[#9327e0] hover:text-[#204d74] transition-colors duration-300 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmPassword;