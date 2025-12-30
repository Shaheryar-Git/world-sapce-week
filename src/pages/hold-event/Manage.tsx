
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Settings, BarChart3, Users, Calendar, Bell, Edit, Trash2, Eye, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";

const Manage = () => {
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

  const events = [
    {
      id: 1,
      title: "Space Science Workshop",
      date: "October 5, 2024",
      attendees: 45,
      status: "Published",
      type: "Workshop"
    },
    {
      id: 2,
      title: "Astronomy Night",
      date: "October 7, 2024", 
      attendees: 120,
      status: "Draft",
      type: "Observatory"
    },
    {
      id: 3,
      title: "Student Space Competition",
      date: "October 9, 2024",
      attendees: 78,
      status: "Published",
      type: "Competition"
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: "Event Scheduling",
      description: "Easily schedule and manage your World Space Week events with our intuitive calendar interface."
    },
    {
      icon: Users,
      title: "Attendee Management",
      description: "Track registrations, manage attendee lists, and communicate with participants effectively."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get detailed insights into your event performance and attendee engagement metrics."
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Stay updated with real-time notifications about registrations and event updates."
    }
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
            <Rocket className="w-5 h-5 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">Event Management</span>
            <Star className="w-5 h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              Manage Events
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
            Comprehensive tools to organize, track, and optimize your World Space Week events
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <Link to="/events/add" className="btn-primary">
              <Calendar className="w-5 h-5 mr-2" />
              Create Event
            </Link>
            <button className="btn-secondary">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Analytics
            </button>
          </div>
        </div>
      </section>

      {/* Management Features - Light */}
      <section className="py-24 section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Management Features</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools to streamline your event management process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-white group animate-scale-in">
                <div className="p-8 text-center">
                  <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Dashboard - Dark */}
      <section className="py-24 section-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Your Events</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Manage all your World Space Week events from one central dashboard
            </p>
          </div>

          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event.id} className="card-glass group animate-scale-in">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          event.status === 'Published' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.attendees} attendees
                        </div>
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          {event.type}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="p-3 bg-[#9327e0]/20 hover:bg-[#9327e0]/30 rounded-xl transition-colors duration-300">
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 bg-[#204d74]/20 hover:bg-[#204d74]/30 rounded-xl transition-colors duration-300">
                        <Edit className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors duration-300">
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/events/add" className="btn-primary flex items-center justify-center ">
              <Calendar className="w-5 h-5 mr-2" />
              Add New Event
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manage;
