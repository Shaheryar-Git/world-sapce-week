import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import SignupSchema from "../Validation/SignupSchema";
import { Mail, Lock, User, Eye, EyeOff, Rocket, Star } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useAuth } from "@/context/AuthProvider";

interface FormValues {
  name: string;
  email: string;
  password: string;
  terms: boolean;
  registerAs: string;
}

interface SignupFormProps {
  scrollY: number;
  fadeOffset: number;
}

const SignupForm: React.FC<SignupFormProps> = ({ scrollY, fadeOffset }) => {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
    navigate("/")
    }
  }, [user, navigate]);

  const handleSignup = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
  try {
    const r = await signup(values.name, values.email, values.password, values.registerAs);

    if (r.state) {
      toast.success("Signup successful!");
      navigate("/"); // Redirect to Home after signup
    } else {
      toast.error(r.backendMsg || r.message || "Failed to create account");
    }
  } catch (err: any) {
    console.error("Error:", err);
    toast.error(err.message || "Failed to create account");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <section className="relative py-20 hero-gradient overflow-hidden">
      <div className="hero-particles">
        <div
          className="absolute inset-0 hero-gradient"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
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
                Create Account
              </span>
              <Star className="w-4 h-4 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Join World Space Week
            </h1>
            <p className="text-gray-300">
              Create your account to start adding events
            </p>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              terms: false,
              registerAs:""
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Field
                      name="name"
                      type="text"
                      className={`w-full pl-10 pr-4 py-3 bg-[#220536]/50 border ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-[#9327e0]/30"
                      } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
                      placeholder="Your full name"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

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
                        errors.email && touched.email
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
                      type={showPassword ? "text" : "password"}
                      className={`w-full pl-10 pr-12 py-3 bg-[#220536]/50 border ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-[#9327e0]/30"
                      } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
                      placeholder="Create a password"
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
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                 <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    I'm registering as:
                  </label>
                  <Field
                    as="select"
                    name="registerAs"
                    className={`w-full pl-4 pr-4 py-3 bg-[#220536]/50 border ${
                      errors.registerAs && touched.registerAs
                        ? "border-red-500"
                        : "border-[#9327e0]/30"
                    } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
                  >
                    <option value="">Please select...</option>
                    <option value="Teacher/Educator">Teacher / Educator</option>
                    <option value="Student">Student</option>
                    <option value="Space Agency">Space Agency</option>
                    <option value="Space/Astronomy Club">Space / Astronomy Club</option>
                    <option value="Museum">Museum</option>
                    <option value="Planetarium">Planetarium</option>
                    <option value="Library">Library</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="registerAs"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex items-center">
                  <Field
                    name="terms"
                    type="checkbox"
                    className={`rounded border-[#9327e0]/30 text-[#9327e0] focus:ring-[#9327e0] bg-[#220536]/50`}
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-[#9327e0] hover:text-[#204d74] transition-colors duration-300"
                    >
                      Terms of Service
                    </Link>
                  </span>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
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
  );
};

export default SignupForm;