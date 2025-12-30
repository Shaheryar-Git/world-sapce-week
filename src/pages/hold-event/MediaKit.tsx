
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Download, Image, Share2, FileText, Palette, Rocket, Star } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const MediaKit = () => {
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

  const logoItems = [
    { name: "WSW Logo - PNG", format: "PNG", size: "High Resolution" },
    { name: "WSW Logo - SVG", format: "SVG", size: "Vector" },
    { name: "WSW Logo - JPG", format: "JPG", size: "Web Optimized" },
  ];

  const socialMediaItems = [
    { name: "Facebook Cover", size: "1200x628px" },
    { name: "Twitter Header", size: "1500x500px" },
    { name: "Instagram Story ", size: "1080x1920px" },
    { name: "LinkedIn Banner", size: "1584x396px" },
  ];

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
          
         {/* BACKFROUND PARTICLES */}
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
            <Palette className="w-5 h-5 text-[#9327e0] group-hover:scale-110 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">Brand Resources</span>
            <Star className="w-5 h-5 text-[#9327e0] group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              Media Kit
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
            Download official World Space Week logos, graphics, and brand guidelines to promote your event
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <button className="btn-primary">
              <Download className="w-5 h-5 mr-2" />
              Download All Assets
            </button>
            <button className="btn-secondary">
              <FileText className="w-5 h-5 mr-2" />
              Brand Guidelines
            </button>
          </div>
        </div>
      </section>
      
      {/* Logos Section - Light */}
      <section className="py-24 section-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 mb-6">
              <Image className="w-8 h-8 text-[#9327e0]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Official Logos</h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-quality logos in various formats for your promotional materials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {logoItems.map((item, index) => (
              <div key={index} className="card-white group animate-scale-in">
                <div className="p-8 text-center">
                  <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Image className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.format} • {item.size}</p>
                  <button className="w-full bg-gradient-to-r from-[#204d74] to-[#9327e0] text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg hover:shadow-[#204d74]/25 transition-all duration-300 flex items-center justify-center group-hover:scale-105 transform">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Toolkit - Dark */}
      <section className="py-24 section-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 mb-6">
              <Share2 className="w-8 h-8 text-[#9327e0]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Social Media Toolkit</h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready-to-use graphics optimized for all major social media platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialMediaItems.map((item, index) => (
              <div key={index} className="card-glass group animate-scale-in">
                <div className="p-6 text-center">
                  <div className="bg-gradient-to-br from-[#204d74] to-[#9327e0] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-300 mb-4">{item.size}</p>
                  <button className="w-full bg-gradient-to-r from-[#9327e0] to-[#204d74] text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg hover:shadow-[#9327e0]/25 transition-all duration-300 flex items-center justify-center group-hover:scale-105 transform">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Guidelines - Light */}
      <section className="py-24 section-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-[#9327e0]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Brand Guidelines</h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            
            <div className="card-white animate-scale-in">
              <div className="p-8 lg:p-12">
                <div className="bg-gradient-to-br from-[#204d74] to-[#9327e0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Complete Brand Guidelines PDF</h3>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  Comprehensive brand guidelines including logo usage, colors, typography, and best practices for maintaining brand consistency across all materials.
                </p>
                <button className="bg-gradient-to-r from-[#204d74] to-[#9327e0] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#204d74]/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                  <Download className="w-5 h-5 mr-2" />
                  Download Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MediaKit;
