
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Users, Globe, History, Rocket, Star } from "lucide-react";

const AboutWSW = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
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
        
        <div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            opacity: fadeOffset,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
            <Rocket className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">About World Space Week</span>
            <Star className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
              About World Space Week
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The largest annual space event on Earth, celebrating humanity's achievements in space exploration
          </p>
        </div>
      </section>

      {/* What is WSW Section */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8c38c7]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">What is World Space Week?</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  World Space Week is an international celebration of science and technology, and their contribution to the betterment of the human condition. The United Nations General Assembly declared in 1999 that World Space Week will be held each year from October 4-10.
                </p>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  These dates commemorate two events that changed the world forever:
                </p>
                
                <ul className="text-lg text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#9326E0] mr-3">•</span>
                    <span>October 4, 1957: Launch of the first human-made Earth satellite, Sputnik I</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#9326E0] mr-3">•</span>
                    <span>October 10, 1967: Signing of the Treaty on Principles Governing the Activities of States in the Exploration and Peaceful Uses of Outer Space</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#9326E0]/10 to-[#8c38c7]/10 backdrop-blur-md border border-[#9326E0]/20 rounded-3xl p-8">
                <div className="text-center">
                  <div className="text-8xl mb-6">🌍</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Global Celebration</h3>
                  <p className="text-gray-300">Bringing together space enthusiasts from around the world</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-24 bg-gradient-to-b from-[#1a0429] to-[#220536]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Explore More</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dive deeper into World Space Week resources and information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#9326E0]/10">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">UN Declaration</h3>
              <p className="text-gray-300 mb-6 text-center">Read the full UN declaration that established World Space Week</p>
              <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#8c38c7]/10">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Knowledge Hub</h3>
              <p className="text-gray-300 mb-6 text-center">Access educational resources and event planning guides</p>
              <button className="w-full bg-gradient-to-r from-[#8c38c7] to-[#9326E0] hover:from-[#9326E0] hover:to-[#8c38c7] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Explore Hub
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#220536]/25">
              <div className="bg-gradient-to-br from-[#220536] to-[#1a0429] border border-[#9326E0]/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-[#9326E0]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">National Coordinators</h3>
              <p className="text-gray-300 mb-6 text-center">Meet our coordinators from around the world</p>
              <button className="w-full border-2 border-[#9326E0]/30 bg-white/5 backdrop-blur-md text-white hover:bg-[#9326E0] hover:border-[#9326E0] py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                View Coordinators
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#8c38c7]/10">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#220536] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <History className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">History</h3>
              <p className="text-gray-300 mb-6 text-center">Explore past themes, reports, and memorable moments</p>
              <button className="w-full bg-gradient-to-r from-[#8c38c7] to-[#220536] hover:from-[#220536] hover:to-[#8c38c7] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                View History
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutWSW;
