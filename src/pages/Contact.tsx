
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Rocket, Star } from "lucide-react";

const Contact = () => {
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
            <span className="text-white text-lg font-medium">Get in Touch</span>
            <Star className="w-5 h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              Contact Us
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
            Get in touch with the World Space Week Association team
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <button className="btn-primary">
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </button>
            <button className="btn-secondary">
              <MessageCircle className="w-5 h-5 mr-2" />
              Live Chat
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section - Light */}
      <section className="py-24 section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 shadow-xl border border-gray-100">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300" 
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300" 
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300" 
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization (Optional)</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300" 
                      placeholder="Your organization or company"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300">
                      <option>General Inquiry</option>
                      <option>Event Submission</option>
                      <option>Partnership Opportunity</option>
                      <option>Media Request</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={6} 
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-300 resize-none" 
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn-primary w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-slide-in-right">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">Get in Touch</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  The World Space Week Association is here to help with your questions, event submissions, and partnership opportunities. We're committed to making World Space Week a global success.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="card-white hover-lift">
                  <div className="p-8">
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mr-6 mt-1">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600 mb-3">Send us an email and we'll get back to you within 24 hours</p>
                        <a href="mailto:info@worldspaceweek.org" className="text-[#9327e0] hover:text-[#204d74] font-medium transition-colors duration-300">
                          info@worldspaceweek.org
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-white hover-lift">
                  <div className="p-8">
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-[#204d74] to-[#9327e0] w-12 h-12 rounded-full flex items-center justify-center mr-6 mt-1">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Headquarters</h3>
                        <p className="text-gray-600 mb-3">World Space Week Association International Office</p>
                        <p className="text-gray-700">
                          Paris, France<br />
                          International Space Community
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-white hover-lift">
                  <div className="p-8">
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mr-6 mt-1">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Response</h3>
                        <p className="text-gray-600 mb-3">For urgent inquiries during World Space Week</p>
                        <p className="text-gray-700">
                          Follow us on social media for real-time updates and quick responses
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-white hover-lift">
                  <div className="p-8">
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-[#204d74] to-[#9327e0] w-12 h-12 rounded-full flex items-center justify-center mr-6 mt-1">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Response Time</h3>
                        <p className="text-gray-600 mb-3">We typically respond to inquiries within:</p>
                        <ul className="text-gray-700 space-y-1">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-[#9327e0] rounded-full mr-3"></div>
                            General inquiries: 24-48 hours
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-[#204d74] rounded-full mr-3"></div>
                            Event submissions: 3-5 business days
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-[#9327e0] rounded-full mr-3"></div>
                            Partnership requests: 1 week
                          </li>
                        </ul>
                      </div>
                    </div>
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

export default Contact;
