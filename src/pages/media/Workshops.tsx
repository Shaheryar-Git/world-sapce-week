
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Calendar, Clock, Download, Play, BookOpen } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";


const Workshops = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const workshops = [
    {
      id: 1,
      title: "Space Education for Educators",
      instructor: "Dr. Lisa Chen",
      duration: "2 hours",
      date: "June 15, 2024",
      participants: "150+",
      level: "Beginner",
      description: "Learn how to integrate space science into your curriculum with practical activities and resources.",
      topics: ["Curriculum Integration", "Hands-on Activities", "Assessment Strategies", "Resource Management"],
      recording: true,
      materials: true
    },
    {
      id: 2,
      title: "Earth Observation Data Analysis",
      instructor: "Prof. Carlos Rodriguez",
      duration: "3 hours",
      date: "May 28, 2024",
      participants: "85+",
      level: "Intermediate",
      description: "Dive into satellite data analysis and learn to interpret Earth observation imagery for climate research.",
      topics: ["Satellite Data", "Image Processing", "Climate Analysis", "Data Visualization"],
      recording: true,
      materials: true
    },
    {
      id: 3,
      title: "Rocket Science Fundamentals",
      instructor: "Dr. Ahmed Hassan",
      duration: "1.5 hours",
      date: "May 10, 2024",
      participants: "200+",
      level: "Beginner",
      description: "Understanding the basic principles of rocket propulsion and space mission design.",
      topics: ["Physics Principles", "Propulsion Systems", "Mission Planning", "Safety Protocols"],
      recording: true,
      materials: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
      
         {/* Animated Particles */}
					<ParticlesBackground scrollY={scrollY} count={200} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8">
            <Users className="w-5 h-5 text-[#9326E0]" />
            <span className="text-white text-lg font-medium">Educational Workshops</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
              Space Workshops
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Access recordings and materials from our educational workshops led by space experts
          </p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        workshop.level === 'Beginner' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {workshop.level}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {workshop.duration}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#9326E0] transition-colors duration-300">
                      {workshop.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {workshop.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-[#9326E0]" />
                      <span className="text-white font-medium">Instructor</span>
                    </div>
                    <p className="text-gray-300 text-sm">{workshop.instructor}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-[#8c38c7]" />
                      <span className="text-white font-medium">Participants</span>
                    </div>
                    <p className="text-gray-300 text-sm">{workshop.participants}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {workshop.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="bg-[#9326E0]/20 text-[#9326E0] px-3 py-1 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {workshop.date}
                  </div>
                  <div className="flex gap-3">
                    {workshop.recording && (
                      <button className="bg-gradient-to-r from-[#9326E0] to-[#8c38c7] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#9326E0]/25 flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Watch
                      </button>
                    )}
                    {workshop.materials && (
                      <button className="border-2 border-[#9326E0]/30 bg-white/5 backdrop-blur-md text-white hover:bg-[#9326E0] hover:border-[#9326E0] px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Materials
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Workshops;
