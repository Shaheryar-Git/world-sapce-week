
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Rocket, Star, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ParticlesBackground from '@/components/ParticlesBackground';

const Sponsors = () => {
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

  const sponsors = [
    { name: "NASA", logo: "🚀", url: "https://nasa.gov", tier: "Platinum" },
    { name: "ESA", logo: "🛰️", url: "https://esa.int", tier: "Gold" },
    { name: "SpaceX", logo: "🌟", url: "https://spacex.com", tier: "Silver" },
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
            <Heart className="w-5 h-5 text-[#9327e0] group-hover:scale-110 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">Our Supporters</span>
            <Star className="w-5 h-5 text-[#9327e0] group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              Our Sponsors
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
            Supporting the largest annual space event on Earth
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <Link to="/about-association/sponsors-list" className="btn-primary">
              <Users className="w-5 h-5 mr-2" />
              View All Sponsors
            </Link>
            <Link to="/contact" className="btn-secondary">
              <Heart className="w-5 h-5 mr-2" />
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Sponsors Section - Light */}
      <section className="py-24 section-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Sponsors</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading organizations supporting space education worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="card-white group animate-scale-in">
                <div className="p-8 text-center">
                  <div className="text-6xl mb-6">{sponsor.logo}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{sponsor.name}</h3>
                  <p className="text-[#9327e0] mb-6 font-medium">{sponsor.tier} Sponsor</p>
                  {/* <a 
                    href={sponsor.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#204d74] hover:text-[#9327e0] transition-colors duration-300 group-hover:scale-105 transform"
                  >
                    Visit Website <ExternalLink className="w-4 h-4 ml-2" />
                  </a> */}
                   <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-[#9327e0]/40 text-white bg-[#2d1240] hover:bg-[#9327e0] hover:text-white transition-all duration-300 shadow-md hover:shadow-[#9327e0]/40"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor Section - Dark */}
      <section className="py-24 section-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Become a Sponsor</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join our community of sponsors and help support the largest annual space event on Earth, reaching millions of people worldwide.
            </p>
            
            <div className="space-y-6 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link 
                to="/contact" 
                className="inline-block bg-gradient-to-r from-[#9327e0] to-[#204d74] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#9327e0]/25 transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </Link>
              <Link 
                to="/donate" 
                className="inline-block border-2 border-[#204d74] bg-[#204d74] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-transparent hover:text-[#204d74] transition-all duration-300 transform hover:scale-105"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Sponsors;
