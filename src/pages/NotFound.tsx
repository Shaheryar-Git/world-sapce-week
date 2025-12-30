
import { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { Rocket, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118]"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#9326E0]/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-[#8c38c7]/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#9326E0] to-[#8c38c7] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Rocket className="w-12 h-12 text-white transform rotate-45" />
          </div>
          
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mb-4 animate-pulse">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Lost in Space
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Oops! The page you're looking for has drifted into the cosmic void. 
            Let's get you back to familiar territory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="group bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-500 transform hover:scale-105 shadow-xl flex items-center gap-3 hover:shadow-[#9326E0]/25"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Return to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="group border-2 border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-[#220536] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-500 flex items-center gap-3 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
