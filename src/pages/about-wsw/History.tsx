
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Download, FileText, Image as ImageIcon, Clock } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";


const History = () => {
  const [scrollY, setScrollY] = useState(0);
  

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  const themes = [
    { year: 2024, theme: "Space and Climate Change Impact", poster: "🌍", report: "available" },
    { year: 2023, theme: "Space and Entrepreneurship", poster: "🚀", report: "available" },
    { year: 2022, theme: "Space and Sustainability Innovation", poster: "♻️", report: "available" },
    { year: 2021, theme: "Women in Space Leadership", poster: "👩‍🚀", report: "available" },
    { year: 2020, theme: "Satellites Improve Everyday Life", poster: "🛰️", report: "available" },
    { year: 2019, theme: "The Moon: Gateway to the Stars", poster: "🌙", report: "available" },
    { year: 2018, theme: "Space Unites the World Peacefully", poster: "🌐", report: "available" },
    { year: 2017, theme: "Exploring New Worlds in  Space", poster: "🪐", report: "available" },
  ];

  const milestones = [
    { year: 1999, event: "UN declares World Space Week", description: "United Nations General Assembly declares October 4-10 as World Space Week" },
    { year: 2001, event: "First official celebration", description: "First coordinated global celebration of World Space Week" },
    { year: 2007, event: "WSW Association founded", description: "World Space Week Association established to coordinate global activities" },
    { year: 2010, event: "50 countries participating", description: "World Space Week celebrated in over 50 countries worldwide" },
    { year: 2020, event: "Virtual events era", description: "Adaptation to virtual events during global pandemic" },
    { year: 2024, theme: "Global expansion", description: "Over 90 countries now participate in World Space Week annually" },
  ];

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118]"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          />
          
         {/* Animated Particles */}
					<ParticlesBackground scrollY={scrollY} count={200} />

          <div className="absolute top-20 left-10 w-32 h-32 bg-[#9326E0]/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-[#204d74]/10 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
        
        <div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            opacity: fadeOffset,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
            <Clock className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">History</span>
            <Calendar className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#204d74] animate-pulse">
              WSW History
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            25 years of celebrating space exploration and education worldwide
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">Key Milestones</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#204d74] mx-auto"></div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#9326E0] to-[#204d74]"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-2xl font-bold text-[#9326E0] mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-[#204d74] mb-4">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#9326E0] to-[#204d74] rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Themes Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">Past Themes & Reports</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the themes and download reports from previous World Space Week celebrations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {themes.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{item.poster}</div>
                  <div className="text-2xl font-bold text-[#9326E0] mb-2">{item.year}</div>
                  <h3 className="text-lg font-bold text-[#204d74] mb-4">{item.theme}</h3>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-[#9326E0] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#9326E0]/90 transition-colors flex items-center justify-center group-hover:scale-105 transform duration-300">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Download Poster
                  </button>
                  
                  {item.report === 'available' && (
                    <button className="w-full bg-[#204d74] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#204d74]/90 transition-colors flex items-center justify-center group-hover:scale-105 transform duration-300">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Report
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#204d74]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Complete Archive</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Access our complete archive of World Space Week materials, including historical documents, statistics, and multimedia content from past celebrations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Reports</h3>
              <p className="text-gray-300">Annual reports and statistics from each World Space Week</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-[#204d74]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#204d74] to-[#9326E0] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Posters</h3>
              <p className="text-gray-300">Official posters from every year in high resolution formats</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Resources</h3>
              <p className="text-gray-300">Educational materials and media kits from past years</p>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform hover:scale-105">
            Browse Complete Archive
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default History;
