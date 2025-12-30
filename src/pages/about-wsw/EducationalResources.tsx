
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, Download, Video, FileText, Users, Lightbulb, Rocket, Star, GraduationCap, Target } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";


const EducationalResources = () => {
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

  const resourceCategories = [
    {
      title: "Lesson Plans",
      icon: BookOpen,
      color: "from-[#9326E0] to-[#8c38c7]",
      description: "Ready-to-use lesson plans for different age groups",
      items: ["Elementary Space Science", "Middle School Astronomy", "High School Physics", "University Level Research"]
    },
    {
      title: "Activity Guides",
      icon: Target,
      color: "from-[#8c38c7] to-[#9326E0]",
      description: "Hands-on activities and experiments",
      items: ["Rocket Building Guide", "Solar System Models", "Satellite Tracking", "Space Mission Planning"]
    },
    {
      title: "Video Resources",
      icon: Video,
      color: "from-[#204d74] to-[#9326E0]",
      description: "Educational videos and documentaries",
      items: ["Space Exploration History", "Astronaut Interviews", "Mission Documentaries", "Virtual Space Tours"]
    },
    {
      title: "Presentation Materials",
      icon: FileText,
      color: "from-[#9326E0] to-[#204d74]",
      description: "PowerPoint presentations and visual aids",
      items: ["Solar System Overview", "Space Technology", "Career in Space", "International Space Station"]
    }
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
            <GraduationCap className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">Educational Resources</span>
            <Star className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
              Educational Resources
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive materials to bring space education to your classroom and community
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">Resource Categories</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access a comprehensive library of educational materials designed for all learning levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#204d74] mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <ul className="space-y-2 mb-6">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-[#9326E0] mr-3 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                  Access Resources
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age-Based Resources */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8c38c7]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Resources by Age Group</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tailored educational content for every learning stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Elementary (Ages 5-11)</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Solar system coloring books</li>
                <li>• Simple space facts</li>
                <li>• Interactive games</li>
                <li>• Picture books about space</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Elementary Resources
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#8c38c7]/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Middle School (Ages 12-14)</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Astronomy lab experiments</li>
                <li>• Space mission case studies</li>
                <li>• STEM project guides</li>
                <li>• Career exploration materials</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Middle School Resources
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#204d74]/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-[#204d74] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">High School+ (Ages 15+)</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Advanced physics concepts</li>
                <li>• Research project templates</li>
                <li>• University preparation guides</li>
                <li>• Industry partnership info</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Advanced Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Download Center */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">Download Center</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick access to our most popular educational materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-[#9326E0]/5 to-white border border-[#9326E0]/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#204d74] mb-2">Teacher's Guide</h3>
              <p className="text-gray-600 text-sm mb-4">Complete guide for educators</p>
              <button className="text-[#9326E0] hover:text-[#8c38c7] font-medium">Download PDF</button>
            </div>

            <div className="bg-gradient-to-br from-[#8c38c7]/5 to-white border border-[#8c38c7]/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#9326E0] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#204d74] mb-2">Activity Pack</h3>
              <p className="text-gray-600 text-sm mb-4">Hands-on activities collection</p>
              <button className="text-[#8c38c7] hover:text-[#9326E0] font-medium">Download ZIP</button>
            </div>

            <div className="bg-gradient-to-br from-[#9326E0]/5 to-white border border-[#9326E0]/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#204d74] to-[#9326E0] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#204d74] mb-2">Video Library</h3>
              <p className="text-gray-600 text-sm mb-4">Educational video collection</p>
              <button className="text-[#8c38c7] hover:text-[#9326E0] font-medium">Access Videos</button>
            </div>

            <div className="bg-gradient-to-br from-[#9326E0]/5 to-white border border-[#9326E0]/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#204d74] mb-2">Poster Set</h3>
              <p className="text-gray-600 text-sm mb-4">Educational posters & infographics</p>
              <button className="text-[#9326E0] hover:text-[#204d74] font-medium">Download All</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EducationalResources;
