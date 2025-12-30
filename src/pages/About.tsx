
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Globe, Users, Target, Award, Heart, Rocket, Star } from "lucide-react";

const About = () => {
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
          
          {[...Array(20)].map((_, i) => (
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
            <span className="text-white text-lg font-medium">About Us</span>
            <Star className="w-5 h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              About World Space Week
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
            The largest annual space event on Earth, celebrating humanity's greatest achievements in space exploration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <button className="btn-primary">
              <Globe className="w-5 h-5 mr-2" />
              Explore Our Mission
            </button>
            <button className="btn-secondary">
              <Users className="w-5 h-5 mr-2" />
              Meet Our Team
            </button>
          </div>
        </div>
      </section>

      {/* What is WSW Section - Light */}
      <section className="py-24 section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">What is World Space Week?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An international celebration of science and technology's contribution to humanity
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="prose max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  World Space Week is an international celebration of science and technology, and their contribution to the betterment of the human condition. The United Nations General Assembly declared in 1999 that World Space Week will be held each year from October 4-10.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  These dates commemorate two events that changed the world forever:
                </p>
                
                <ul className="text-lg text-gray-600 space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#9327e0] w-2 h-2 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span>October 4, 1957: Launch of the first human-made Earth satellite, Sputnik I</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#204d74] w-2 h-2 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span>October 10, 1967: Signing of the Treaty on Principles Governing the Activities of States in the Exploration and Peaceful Uses of Outer Space</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-br from-[#9327e0]/10 to-[#204d74]/10 rounded-3xl p-8 border border-[#9327e0]/20">
                <div className="text-center">
                  <div className="text-8xl mb-6 animate-float">🌍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Celebration</h3>
                  <p className="text-gray-600 mb-6">Bringing together space enthusiasts from around the world</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#9327e0]">95+</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#204d74]">5,000+</div>
                      <div className="text-sm text-gray-600">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#9327e0]">2M+</div>
                      <div className="text-sm text-gray-600">Participants</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section - Gray */}
      <section className="py-24 section-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Goals</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              World Space Week aims to inspire and educate people around the world about space activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-white group animate-scale-in">
              <div className="p-8 text-center">
                <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Educate Youth</h3>
                <p className="text-gray-600">Build young minds by educating them about space activities and inspiring the next generation of explorers</p>
              </div>
            </div>
            
            <div className="card-white group animate-scale-in">
              <div className="p-8 text-center">
                <div className="bg-gradient-to-br from-[#204d74] to-[#9327e0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Public Support</h3>
                <p className="text-gray-600">Demonstrate public support for space programs and their importance to humanity</p>
              </div>
            </div>
            
            <div className="card-white group animate-scale-in">
              <div className="p-8 text-center">
                <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Foster Cooperation</h3>
                <p className="text-gray-600">Foster international cooperation in space outreach and education globally</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Section - Light */}
      <section className="py-24 section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">World Space Week Association</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The global coordinator of World Space Week, connecting space enthusiasts worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="animate-slide-in-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The World Space Week Association (WSWA) is the global coordinator of World Space Week. We work with space agencies, aerospace companies, schools, planetaria, museums, and astronomy clubs to organize events and activities that celebrate space.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Founded to coordinate the United Nations-declared World Space Week, WSWA has grown into a global network of space enthusiasts, educators, and professionals working together to inspire and educate people about space activities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#9327e0]/10 to-[#204d74]/10 rounded-xl p-6 border border-[#9327e0]/20">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-[#9327e0] mr-3" />
                    <span className="font-semibold text-gray-900">Annual Coordination</span>
                  </div>
                  <p className="text-gray-600">Coordinating global activities and events every October</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#204d74]/10 to-[#9327e0]/10 rounded-xl p-6 border border-[#204d74]/20">
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-[#204d74] mr-3" />
                    <span className="font-semibold text-gray-900">Global Network</span>
                  </div>
                  <p className="text-gray-600">Connecting space enthusiasts and professionals worldwide</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] rounded-3xl p-1">
                <div className="bg-white rounded-2xl p-8 h-full">
                  <div className="text-center">
                    <div className="text-6xl mb-6 animate-float">🌟</div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">Global Impact</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Events Worldwide</span>
                        <span className="font-bold text-3xl text-[#9327e0]">5,000+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Participating Countries</span>
                        <span className="font-bold text-3xl text-[#204d74]">95+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Annual Participants</span>
                        <span className="font-bold text-3xl text-[#9327e0]">2M+</span>
                      </div>
                    </div>
                    <button className="btn-primary mt-8 w-full">
                      <Award className="w-5 h-5 mr-2" />
                      Join Our Mission
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
