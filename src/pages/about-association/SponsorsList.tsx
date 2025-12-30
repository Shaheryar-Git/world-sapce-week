
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Star, Award, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const SponsorsList = () => {
  const platinumSponsors = [
    { name: "NASA", logo: "🚀", url: "https://nasa.gov", description: "Leading space exploration and research" },
    { name: "ESA", logo: "🛰️", url: "https://esa.int", description: "European Space Agency" },
  ];

  const goldSponsors = [
    { name: "SpaceX", logo: "🌟", url: "https://spacex.com", description: "Commercial spaceflight pioneer" },
    { name: "Blue Origin", logo: "🔷", url: "https://blueorigin.com", description: "Space technology company" },
    { name: "Boeing", logo: "✈️", url: "https://boeing.com", description: "Aerospace manufacturer" },
  ];

  const silverSponsors = [
    { name: "Lockheed Martin", logo: "⚡", url: "https://lockheedmartin.com", description: "Defense and aerospace" },
    { name: "Northrop Grumman", logo: "🔺", url: "https://northropgrumman.com", description: "Aerospace technology" },
    { name: "Airbus Defence", logo: "🛡️", url: "https://airbus.com", description: "Defense and space solutions" },
    { name: "Thales Alenia", logo: "📡", url: "https://thalesaleniaspace.com", description: "Satellite systems" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
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
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#204d74]">
              Our Sponsors
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Supporting the world's largest annual space event
          </p>
        </div>
      </section>
      
      {/* Platinum Sponsors */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <Crown className="w-8 h-8 text-[#9326E0]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74]">Platinum Sponsors</h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#204d74] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {platinumSponsors.map((sponsor, index) => (
              <div key={index} className="bg-gradient-to-br from-[#9326E0]/5 to-[#204d74]/5 border-2 border-[#9326E0]/20 rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-300 group">
                <div className="text-8xl mb-6">{sponsor.logo}</div>
                <h3 className="text-3xl font-bold text-[#204d74] mb-4">{sponsor.name}</h3>
                <p className="text-gray-600 mb-8 text-lg">{sponsor.description}</p>
                <a 
                  href={sponsor.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform group-hover:scale-105"
                >
                  Visit Website <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Sponsors */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-[#9326E0]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74]">Gold Sponsors</h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#204d74] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goldSponsors.map((sponsor, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group">
                <div className="text-6xl mb-6">{sponsor.logo}</div>
                <h3 className="text-2xl font-bold text-[#204d74] mb-4">{sponsor.name}</h3>
                <p className="text-gray-600 mb-6">{sponsor.description}</p>
               <a 
                  href={sponsor.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform group-hover:scale-105"
                >
                  Visit Website <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Silver Sponsors */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <Star className="w-8 h-8 text-[#9326E0]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74]">Silver Sponsors</h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#204d74] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {silverSponsors.map((sponsor, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl mb-4">{sponsor.logo}</div>
                <h3 className="text-lg font-bold text-[#204d74] mb-3">{sponsor.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{sponsor.description}</p>
                <a 
                  href={sponsor.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform group-hover:scale-105"
                >
                  Visit Website <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Sponsor CTA */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#204d74]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Join Our Sponsors</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Support the world's largest annual space event and connect with millions of space enthusiasts globally.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <Link 
              to="/contact" 
              className="inline-block bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform hover:scale-105"
            >
              Become a Sponsor
            </Link>
            <Link 
              to="/donate" 
              className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SponsorsList;
