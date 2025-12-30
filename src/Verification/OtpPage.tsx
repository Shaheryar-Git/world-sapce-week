import React, { useState, useEffect, useRef } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ForgotPassword = () => {
  const [scrollY, setScrollY] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const[email,setEmail] = useState("")
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  
  useEffect(() => {
  const keyValues = window.location.search;
  const urlParams = new URLSearchParams(keyValues);
  const emailFromURL = urlParams.get("email");
  if (emailFromURL) {
    setEmail(emailFromURL);
  }
}, []);

console.log("Email from URL:", email);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOTPChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
    
      // Move to next input if value is entered
      if (value && index <= 5) {
        const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
        inputRefs.current[index + 1].focus();
      }

      if (index === 5 && value) {
        handleOTPSubmit(new Event('submit'));
      }
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/verify-otp`,{
        email, otp: otp.join("")
      }, {
        headers: { "Content-Type": "application/json" },
      });
        // success response
        toast.success(response.data.message || "CORRECT OTP!");
        // navigate to verify-password
        navigate(`/verify-password?email=${encodeURIComponent(email)}`);
      } catch (error: any) {
        console.error("Forgot Password Error:", error);
    
        if (error.response) {
          toast.error(error.response.data.error || "Failed to send OTP.");
        } else {
          toast.error("Network error. Please try again later.");
        }
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
                OTP Verification
              </h1>
              <h6 className='text-white'>We hve send code to {email}</h6>
              <p className="text-gray-300">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleOTPSubmit}>
              <div className="flex justify-between gap-2">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="w-12">
                    <input
                      type="text"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className={`w-full text-center py-3 bg-[#220536]/50 border 
                    
                        rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300`}
                    />
                   
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Verify OTP
              </button>
            </form>

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