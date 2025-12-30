
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Lightbulb, Users, BookOpen, Telescope, Rocket, Star, Globe, Camera } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";


const EventIdeas = () => {
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

  const eventCategories = [
    {
      title: "Educational Activities",
      icon: BookOpen,
      color: "from-[#9326E0] to-[#8c38c7]",
      events: [
        "Space science fair",
        "Astronomy lectures",
        "STEM workshops",
        "Planetarium shows",
        "Space history exhibitions"
      ]
    },
    {
      title: "Public Engagement",
      icon: Users,
      color: "from-[#8c38c7] to-[#9326E0]",
      events: [
        "Star gazing parties",
        "Space movie screenings",
        "Interactive demonstrations",
        "Meet an astronaut events",
        "Space quiz competitions"
      ]
    },
    {
      title: "Creative Expression",
      icon: Camera,
      color: "from-[#204d74] to-[#9326E0]",
      events: [
        "Space art competitions",
        "Astronomy photography contests",
        "Rocket building workshops",
        "Space-themed storytelling",
        "Model satellite construction"
      ]
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
          {/* Animation Particles */}
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
            <Lightbulb className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">Event Ideas</span>
            <Star className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
              Event Ideas
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Inspiring activities to celebrate World Space Week in your community
          </p>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">Event Categories</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from these categories to create engaging World Space Week events
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {eventCategories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#204d74] mb-6 text-center">{category.title}</h3>
                <ul className="space-y-3">
                  {category.events.map((event, eventIndex) => (
                    <li key={eventIndex} className="flex items-start">
                      <span className="text-[#9326E0] mr-3 mt-1">•</span>
                      <span className="text-gray-700">{event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8c38c7]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Most Popular Events</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These events have proven successful across the globe during World Space Week
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Telescope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Astronomy Nights</h3>
              <p className="text-gray-300 mb-6">Public stargazing events with telescopes, perfect for engaging all ages in space observation and learning about constellations, planets, and deep-sky objects.</p>
              <div className="text-[#9326E0] font-semibold">Perfect for: All ages, outdoor venues</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#8c38c7]/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="bg-gradient-to-br from-[#8c38c7] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Rocket Workshops</h3>
              <p className="text-gray-300 mb-6">Hands-on activities where participants build and launch model rockets, learning about propulsion, aerodynamics, and space technology through practical experience.</p>
              <div className="text-[#8c38c7] font-semibold">Perfect for: Students, STEM education</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#204d74]/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="bg-gradient-to-br from-[#204d74] to-[#9326E0] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Space Exhibitions</h3>
              <p className="text-gray-300 mb-6">Interactive displays showcasing space missions, satellites, and exploration achievements, often featuring artifacts, models, and multimedia presentations.</p>
              <div className="text-[#8c38c7] font-semibold">Perfect for: Museums, schools, public spaces</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Student Competitions</h3>
              <p className="text-gray-300 mb-6">Science fairs, essay contests, and design challenges that encourage students to explore space themes while developing critical thinking and creativity skills.</p>
              <div className="text-[#9326E0] font-semibold">Perfect for: Schools, universities</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventIdeas;
