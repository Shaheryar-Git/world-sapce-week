
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Video, Newspaper, Users, Mail, Rocket, Star, Play, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";

const Media = () => {
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
      
      {/* Hero Section - Dark */}
      <section className="relative py-32 hero-gradient overflow-hidden">
        <div className="hero-particles">
          <div 
            className="absolute inset-0 hero-gradient"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
            }}
          />
          
        
					{/* Animated Particles */}
					<ParticlesBackground scrollY={scrollY} count={200} />


          <div className="absolute top-20 left-10 w-32 h-32 bg-[#9327e0]/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-[#204d74]/10 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
        
        <div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            opacity: fadeOffset,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
            <Rocket className="w-5 h-5 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">Media Center</span>
            <Star className="w-5 h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              Media Center
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
            Discover interviews, news, workshops, and special projects from World Space Week
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <Link to="/media/interviews" className="btn-primary">
              <Play className="w-5 h-5 mr-2" />
              Watch Interviews
            </Link>
            <Link to="/media/news" className="btn-secondary">
              <Newspaper className="w-5 h-5 mr-2" />
              Latest News
            </Link>
          </div>
        </div>
      </section>

      {/* Media Categories - Light */}
      <section className="py-24 section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explore Our Content</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access exclusive content, educational resources, and stay updated with the latest space news
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-white group animate-scale-in">
              <div className="p-8 text-center">
                <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Interviews</h3>
                <p className="text-gray-600 mb-6">Watch exclusive interviews with space professionals and educators</p>
                <Link to="/media/interviews" className="inline-flex items-center bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform group-hover:scale-105">
                  <Eye className="w-4 h-4 mr-2" />
                  Watch Now
                </Link>
                 
              </div>
            </div>

            <div className="card-white group animate-scale-in">
              <div className="p-8 text-center">
                <div className="bg-gradient-to-br from-[#204d74] to-[#9327e0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">News</h3>
                <p className="text-gray-600 mb-6">Stay updated with the latest World Space Week news and announcements</p>
                <Link to="/media/news" className="inline-flex items-center bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform group-hover:scale-105">
                  <Calendar className="w-4 h-4 mr-2" />
                  Read News
                </Link>
              </div>
            </div>

            <div className="card-white group animate-scale-in">
              <div className="p-8 text-center">
                <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Workshops</h3>
                <p className="text-gray-600 mb-6">Access recordings and materials from educational workshops</p>
                <Link to="/media/workshops" className="inline-flex items-center bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform group-hover:scale-105">
                  <Play className="w-4 h-4 mr-2" />
                  View Workshops
                </Link>
              </div>
            </div>

            <div className="card-white group animate-scale-in">
              <div className="p-8 text-center">
                <div className="bg-gradient-to-br from-[#204d74] to-[#9327e0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Postcards to Space</h3>
                <p className="text-gray-600 mb-6">Explore our special project uniquely connecting Earth to space</p>
                <Link to="/media/postcards" className="inline-flex items-center bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform group-hover:scale-105">
                  <Rocket className="w-4 h-4 mr-2" />
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Media;
