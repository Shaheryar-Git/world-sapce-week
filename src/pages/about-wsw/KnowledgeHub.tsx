import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Book, Download, Video, FileText, Users, Lightbulb, Rocket, Star } from "lucide-react";
import { useScroll,useTransform,motion } from 'framer-motion';
import ParticlesBackground from "@/components/ParticlesBackground";


const KnowledgeHub = () => {

const [scrollY] = useState(0);

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden"
       style={{
    // y: parallaxOffset,    
  }}  >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118]"
            style={{
              // transform: `translateY(${parallaxOffset}px)`,
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
           
       >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
            <Rocket className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">Knowledge Hub</span>
            <Star className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
              Knowledge Hub
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Your comprehensive resource center for space education and event planning
          </p>
        </div>
      </motion.section>

      {/* Resources Categories */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8c38c7]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
         style={{
    // opacity: fadeOffset,
    // y: textOffset
  }}
         >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Educational Resources</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to create engaging space education experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Educational Guides</h3>
              <p className="text-gray-300 text-center mb-6">Comprehensive guides for educators and event organizers</p>
              <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Access Guides
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Video Resources</h3>
              <p className="text-gray-300 text-center mb-6">Educational videos and virtual event recordings</p>
              <button className="w-full bg-gradient-to-r from-[#8c38c7] to-[#9326E0] hover:from-[#9326E0] hover:to-[#8c38c7] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Watch Videos
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Download className="w-8 h-8  text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Downloads</h3>
              <p className="text-gray-300 text-center mb-6">Posters, templates, and promotional materials</p>
              <button className="w-full bg-gradient-to-r from-[#8c38c7] to-[#9326E0] hover:from-[#9326E0] hover:to-[#8c38c7] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                Download Assets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <div className="py-24 bg-gradient-to-b from-[#1a0429] to-[#220536] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Featured Resources</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] rounded-2xl p-8 text-white">
              <FileText className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Event Planning Toolkit</h3>
              <p className="mb-6 opacity-90">Complete guide with templates, checklists, and best practices for organizing successful World Space Week events.</p>
              <button className="bg-white text-[#9326E0] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Download Toolkit
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#8c38c7] to-[#8c38c7] rounded-2xl p-8 text-white">
              <Users className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Educator Resources</h3>
              <p className="mb-6 opacity-90">Lesson plans, activities, and materials designed for different age groups and educational levels.</p>
              <button className="bg-white text-[#8c38c7] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Explore Resources
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default KnowledgeHub;
