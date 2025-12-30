
import { ArrowRight, Calendar, Globe, Rocket, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useRef } from 'react';

const EventsCallToAction = () => {

  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <motion.section className="relative py-24 overflow-hidden"
    ref={heroRef}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut" }}
				whileInView={{ opacity: 1 }}
    >
      {/* Purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#180325] via-[#4c1d95] to-[#6b27df]"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-[#FEC53A] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-[#FEC53A]/60 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
              <Star className="w-4 h-4 text-[#FEC53A]" />
              <span className="text-white/90 text-sm font-medium">Join the Movement</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Join the Global
              <span className="block text-[#FEC53A]">Celebration</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Be part of the world's largest space event. Connect with millions of space enthusiasts, 
              educators, and professionals celebrating humanity's greatest adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/5 transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Host an Event</h3>
              <p className="text-white/80 mb-6">
                Organize your own World Space Week event and inspire your community with the wonders of space exploration.
              </p>
              <Link 
                to="/hold-event" 
                className="inline-flex items-center bg-white text-[#9327e0] px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/5 transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Find Events</h3>
              <p className="text-white/80 mb-6">
                Discover amazing space events happening in your area and around the world during World Space Week.
              </p>
              <Link 
                to="/events" 
                className="inline-flex items-center bg-white text-[#9327e0] px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300"
              >
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/5 transition-all duration-500 transform hover:scale-105">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-white/80 mb-6">
                Get the latest news, updates, and resources to make your World Space Week celebration unforgettable.
              </p>
              <Link 
                to="/media" 
                className="inline-flex items-center bg-white text-[#9327e0] px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Latest News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/donate" 
              className="inline-flex items-center bg-[#FEC53A] hover:bg-[#FEC53A]/90 text-[#204d74] px-8 py-4 rounded-xl text-lg font-semibol

0d transition-all duration-300 transform hover:scale-105"
            >
              Support Our Mission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default EventsCallToAction;
