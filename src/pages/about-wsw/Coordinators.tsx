
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Globe, Mail, MapPin, Search, Users } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import 'country-flag-icons/react/3x2';
import { Link} from 'react-router-dom';
import coordinatorsData from '@/Data/Coordinators';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Coordinators = () => {
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [countrySearch, setCountrySearch] = useState("");
  const navigate = useNavigate()

// ✅ Get unique countries from coordinatorsData
const countries = [...new Set(coordinatorsData.map(c => c.country))];

// ✅ Filter countries
const filteredCountries = countries.filter(country =>
  country.toLowerCase().includes(countrySearch.toLowerCase())
);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);


const demofilter = coordinatorsData.filter((coordinator)=> coordinator.country.toLowerCase().includes(searchTerm.toLowerCase()))
const namefilter = coordinatorsData.filter((coordinator)=> coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()))



  const filteredCoordinators = coordinatorsData.filter(coordinator =>
    coordinator.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coordinator.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  const regions = [...new Set(coordinatorsData.map(c => c.region))];

  const handlesubmit = async (countryName: string) => {
		try {
			console.error(null); // Reset error state
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/events/${encodeURIComponent(
					countryName
				)}`
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to fetch events");
			}

			// Adjust based on actual API response structure
			const events = data?.data?.events || data?.events || [];

			console.log(
				`Events for ${countryName}:`,
				events,
				"Coordinators : ",
				data
			);

			// Navigate to nation page with country name and events in state
			navigate(`/nation/${encodeURIComponent(countryName)}`, {
				state: { countryName: countryName, events: data.events },
			});
		} catch (error) {
			console.error(`Error fetching events for ${countryName}:`, error);
			console.error(error.message || "Error fetching events");
			toast.error("No Events Found");
		}
	};

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
            <Globe className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">National Coordinators</span>
            <Users className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#204d74] animate-pulse">
              National Coordinators
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Connect with World Space Week coordinators around the globe
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by country, name, or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9326E0] focus:border-transparent text-lg "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coordinators Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regions.map((region, regionIndex) => {
            const regionCoordinators = filteredCoordinators.filter(c => c.region === region);
            if (regionCoordinators.length === 0) return null;

            return (
				<div key={regionIndex} className="mb-16">
					<h2 className="text-3xl font-bold text-[#204d74] mb-8 text-center">
						{region}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {regionCoordinators.map((coordinator) => (
    <Link
      to={`/about-wsw/coordinators/${coordinator.id}`}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 block"
    >
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full mr-4">
          <img
            src={`https://flagsapi.com/${coordinator.code}/flat/64.png`}
            alt={`${coordinator.country} flag`}
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#204d74]">
            {coordinator.country}
          </h3>
          <p className="text-gray-600">{coordinator.region}</p>
        </div>
      </div>

      <h4 className="text-2xl font-bold text-[#204d74] mb-2">Info :</h4>

      <h4 className="text-lg font-semibold text-[#9326E0] mb-2">
        Name: {coordinator.name}
      </h4>

      <h4 className="text-md font-semibold text-[#9326E0] mb-2">
        Role: {coordinator.role || "N/A"}
      </h4>

      <div className="flex items-center text-gray-600">
        <Mail className="w-4 h-4 mr-2" />
        <span className="hover:text-[#9326E0] transition-colors duration-200">
          {coordinator.email}
        </span>
      </div>

      {coordinator.name2 && (
        <h4 className="text-lg font-semibold text-[#9326E0] mt-3">
          {coordinator.name2}
        </h4>
      )}
    </Link>
  ))}
</div>

				</div>
			);
          })}
          <span className="fi fi-gr"></span> <span className="fi fi-gr fis"></span>
        </div>
      </section>

      {/* 🌍 National List Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Title */}
    <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-10 text-center">
      Nation List
    </h2>

    {/* Search */}
    <div className="max-w-xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search countries..."
          value={countrySearch}
          onChange={(e) => setCountrySearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9326E0] text-lg"
        />
      </div>
    </div>

    {/* Countries Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filteredCountries.map((country) => (
        <button
          key={country}
          onClick={() => {
										handlesubmit(country);
									}} // filter coordinators
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 hover:bg-[#9326E0] hover:text-white hover:border-[#9326E0] transition-all duration-300"
        >
          {country}
        </button>
      ))}
    </div>

    {/* Empty State */}
    {filteredCountries.length === 0 && (
      <p className="text-center text-gray-500 mt-6">
        No countries found ❌
      </p>
    )}
  </div>
</section>


      {/* Become Coordinator CTA */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#204d74]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Become a National Coordinator</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our global network of space education advocates and help organize World Space Week events in your country.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lead Events</h3>
              <p className="text-gray-300">Coordinate and promote World Space Week activities in your country</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-[#204d74]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#204d74] to-[#9326E0] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Network</h3>
              <p className="text-gray-300">Connect with coordinators worldwide and share best practices</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Local Impact</h3>
              <p className="text-gray-300">Make a difference in space education within your community</p>
            </div>
          </div>

          
          
          <button className="bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform hover:scale-105">
            Apply to Become a Coordinator
          </button>
        </div>
      </section>
      
      
      <Footer />
    </div>
  );
};

export default Coordinators;
