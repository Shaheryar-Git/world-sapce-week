
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Video, Play, Calendar, User, Clock } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const Interviews = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const interviews = [
    {
      id: 1,
      title: "The Exciting Future of Space Exploration",
      guest: "Dr. Sarah Chen",
      role: "NASA Astrophysicist",
      duration: "45:23",
      date: "June 15, 2024",
      thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
      description: "An in-depth discussion about upcoming space missions and their potential impact on humanity."
    },
    {
      id: 2,
      title: "Space Education in the 21st Century",
      guest: "Prof. Michael Torres",
      role: "Space Education Director",
      duration: "38:17",
      date: "May 28, 2024",
      thumbnail: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=300&fit=crop",
      description: "Exploring innovative approaches to space education and inspiring the next generation."
    },
    {
      id: 3,
      title: "Climate Change and Earth Observation",
      guest: "Dr. Emma Rodriguez",
      role: "ESA Climate Scientist",
      duration: "52:45",
      date: "May 10, 2024",
      thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
      description: "How satellite technology is revolutionizing our understanding of climate change."
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
            <Video className="w-5 h-5 text-[#9326E0]" />
            <span className="text-white text-lg font-medium">Exclusive Interviews</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
              Space Conversations
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            In-depth interviews with leading space professionals, scientists, and educators
          </p>
        </div>
      </section>

      {/* Interviews Grid */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interviews.map((interview) => (
              <div key={interview.id} className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group">
                <div className="relative">
                  <img 
                    src={interview.thumbnail} 
                    alt={interview.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center hover:bg-[#8c38c7] transition-colors duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {interview.duration}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9326E0] transition-colors duration-300">
                    {interview.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-[#9326E0]" />
                    <span className="text-gray-300 text-sm">
                      <span className="font-medium">{interview.guest}</span> - {interview.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-[#8c38c7]" />
                    <span className="text-gray-400 text-sm">{interview.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    {interview.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                    Watch Interview
                  </button>
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

export default Interviews;
