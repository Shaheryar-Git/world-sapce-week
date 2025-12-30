
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, FileImage, Book, Plus, Package, Edit, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";


const HoldEvent = () => {
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
					<ParticlesBackground scrollY={scrollY} count={200} />

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
            <span className="text-white text-lg font-medium">Event Organizers</span>
            <Star className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
              Hold a WSW Event
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Join thousands of organizers worldwide in celebrating World Space Week
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/events/add" 
              className="group bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-500 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 hover:shadow-[#9326E0]/25"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Add Your Event
            </Link>
          </div>
        </div>
      </section>

      {/* Event Resources */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8c38c7]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Event Resources</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to organize a successful World Space Week event
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#9326E0]/10">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">2025 Theme</h3>
              <p className="text-gray-300 text-center mb-6">Discover this year's official World Space Week theme and how to incorporate it into your event</p>
              <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                View Theme
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#8c38c7]/10">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileImage className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Official Poster</h3>
              <p className="text-gray-300 text-center mb-6">Download high-resolution versions of the official World Space Week poster for your event</p>
              <button className="w-full bg-gradient-to-r from-[#8c38c7] to-[#9326E0] hover:from-[#9326E0] hover:to-[#8c38c7] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Download Poster
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#220536]/25">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Book className="w-8 h-8  text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Guidelines</h3>
              <p className="text-gray-300 text-center mb-6">Read our comprehensive guidelines for organizing successful World Space Week events</p>
              <button className="w-full bg-gradient-to-r from-[#8c38c7] to-[#9326E0] hover:from-[#9326E0] hover:to-[#8c38c7] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Read Guidelines
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#8c38c7]/10">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#8c38c7]  w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Add Event</h3>
              <p className="text-gray-300 text-center mb-6">Submit your event details to be featured in our global directory</p>
              <button className="w-full bg-gradient-to-r from-[#8c38c7] to-[#9326E0] hover:from-[#9326E0] hover:to-[#8c38c7] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Add Your Event
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#9326E0]/10">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Edit className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Manage Events</h3>
              <p className="text-gray-300 text-center mb-6">View, edit, or delete your submitted events (login required)</p>
              <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Manage Events
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#8c38c7]/10">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Media Kit</h3>
              <p className="text-gray-300 text-center mb-6">Access logos, social media graphics, and brand guidelines for your event promotion</p>
              <button className="w-full bg-gradient-to-r from-[#8c38c7] to-[#9326E0] hover:from-[#9326E0] hover:to-[#8c38c7] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Download Kit
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HoldEvent;
