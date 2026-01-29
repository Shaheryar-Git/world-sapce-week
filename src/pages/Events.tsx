import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Plus, Search, Globe } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Register English locale for country names
countries.registerLocale(enLocale);

// Define animation variants with explicit typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const SearchInput = ({
  name,
  value,
  onChange,
  placeholder,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <motion.div
    className="relative"
    variants={itemVariants}
    initial="hidden"
    animate="visible"
  >
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#170324] focus:border-transparent transition-all duration-300 text-sm shadow-sm hover:shadow-md"
    />
  </motion.div>
);

const Events = () => {
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Generate country list from i18n-iso-countries
  const countryList = [
    "All Countries",
    ...Object.values(countries.getNames("en", { select: "official" })),
  ];
  const countryNames = Object.keys(countries.getNames("en")).map((code) =>
    countries.getName(code, "en")
  );

  // Filter countries based on searchTerm
  const filteredCountries = countryNames.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate years from 2025 to 2007 descending
  const years = [
    ...Array.from({ length: 2026 - 2007 + 1 }, (_, i) => (2026 - i).toString()),
  ];

  const { scrollYProgress } = useScroll();
  const parallaxOffset = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const handleCountrySubmit = async (countryName: string) => {

  try {
    setLoading(true);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/events/${encodeURIComponent(countryName)}`);
    const events = response.data?.data?.events || [];

    console.log(`Events for ${countryName}:`, events);
    // Navigate with corrected state structure
    navigate(`/nation/${encodeURIComponent(countryName)}`, {
      state: { countryName, events }, // Pass both countryName and events
    });
  } catch (error: any) { // Explicitly type error as any or use a custom error type
    console.error(`Error fetching events for ${countryName}:`, error);
    // Improved error message handling
    toast.error(
      error.response?.data?.message || 
      error.message || 
      `No events found for ${countryName}`
    );
  } finally {
    setLoading(false);
  }
  
};

  const handleYearSubmit = async (year: string) => {
  
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.get(`${apiUrl}/event/${year}`);
      const events = response.data?.data?.event || [];
      

      console.log(`Events for year ${year}:`, events);
      navigate(`/event-list/${year}`, {
        state: { year, events },
      });
    } catch (error) {
      console.error(`Error fetching events for year ${year}:`, error);
      toast.error(error.response?.data?.message || error.message || `No events found for year ${year}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMappedEvents = async (year: string, physicalEvent: boolean = true) => {
  try {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    // Construct the URL with longitude and latitude
    const response = await axios.get(
      `${apiUrl}/event/mappedEvents/${physicalEvent}/${year}`
    );

    // Adjust response depending on API
    const events = response.data?.data || [];

    console.log(`${physicalEvent ? "Physical" : "Non-physical"} events for year ${year}:`, events);

    // Navigate with all relevant data in state
    navigate(`/event/mappedEvents`, {
      state: { physicalEvent, year, events },
    });
  } catch (error: any) {
    console.error(
      `${physicalEvent ? "Physical" : "Non-physical"} events error for year ${year}:`,
      error
    );
    toast.error(
      error.response?.data?.message ||
        error.message ||
        `No ${physicalEvent ? "physical" : "non-physical"} events found for year ${year}`
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#170324] to-[#2a1a4d] min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[70vh] flex items-center py-20 hero-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#170324]/20 to-[#170324]/20"
            style={{ y: parallaxOffset }}
            transition={{ ease: "easeOut", duration: 1.5 }}
          />
          <ParticlesBackground scrollY={scrollY} count={250} />
          <motion.div
            className="absolute top-16 left-8 w-40 h-40 bg-[#170324]/15 rounded-full blur-2xl"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
          />
          <motion.div
            className="absolute bottom-24 right-12 w-48 h-48 bg-[#170324]/15 rounded-full blur-3xl"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ repeat: Infinity, duration: 4.5, delay: 1.5 }}
          />
        </div>
        <motion.div
          className="relative z-10 container mx-auto px-6"
          style={{ scale: scaleProgress, opacity: opacityProgress }}
        >
          <motion.div
            className="max-w-5xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] drop-shadow-lg">
                World Space Week Events
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Discover and participate in thousands of space events happening worldwide during World Space Week.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/events/add"
                className="bg-gradient-to-r from-[#170324] to-[#170324] hover:from-[#2a1a4d] hover:to-[#170324] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-500 flex items-center justify-center gap-3 group hover:shadow-2xl hover:shadow-[#170324]/30 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Add Your Event
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Events List */}
      <motion.section
        className="py-16 bg-gradient-to-b from-[#170324] to-[#2a1a4d] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            World Space Week Events Overview
          </motion.h1>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-6 italic text-gray-200"
            >
              Explore a rich tapestry of space events spanning the globe! Click a year to view events for that year.
            </motion.p>
            {/* YEARS & MAPPED EVENTS */}
<section className="py-20 bg-[#1b0833]">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12">
      Events Timeline Overview
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      {/* LEFT COLUMN — YEARS */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Events by Year
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[420px] overflow-y-auto">
          {years.map((year) => (
            <motion.div
              key={year}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleYearSubmit(year)}
              className="cursor-pointer bg-[#9326E0]/30 hover:bg-[#9326E0]/50 rounded-xl p-4 text-center transition"
            >
              <p className="text-xl font-bold">{year}</p>
              <p className="text-xs text-gray-200 mt-1">View Events</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN — MAPPED EVENTS */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Mapped Events
        </h3>

        <div className="space-y-4 max-h-[420px] overflow-y-auto">
          {years.map((year) => (
            <motion.div
              key={year}
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-between bg-[#170324]/60 hover:bg-[#170324]/80 p-4 rounded-xl transition"
            >
              <span className="font-semibold">{year}</span>

              <button
                onClick={() => handleMappedEvents(year, true)}
                className="px-4 py-2 rounded-lg bg-[#9326E0] hover:bg-[#7b1fa2] text-sm font-semibold transition"
              >
                View on Map
              </button>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>

          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-6 text-center text-white"
            >
              Global Participation
            </motion.h2>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#170324] focus:border-transparent transition-all duration-300 text-sm shadow-sm hover:shadow-md"
              />
            </div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-h-[450px] overflow-y-auto"
              variants={containerVariants}
            >
              <AnimatePresence>
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <motion.div
                      key={country}
                      className="bg-[#2a1a4d]/70 p-4 rounded-xl hover:bg-[#170324]/40 transition-colors duration-300 shadow-sm hover:shadow-md"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => handleCountrySubmit(country)}
                    >
                      <span className="text-sm text-white">{loading ? "Loading..." : country}</span>
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    className="text-gray-400 text-center col-span-full"
                    variants={itemVariants}
                  >
                    No countries found.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              className="text-center space-y-3"
              variants={containerVariants}
            ></motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Event Tools Section */}
      <motion.section
        className="py-24 bg-gradient-to-b from-[#f5f7fa] to-[#e2e8f0]"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            >
              Event Tools & Resources
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-[#170324] to-[#170324] mx-auto mb-8"
            ></motion.div>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Everything you need to organize, find, and participate in World Space Week events.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Plus,
                title: "Add Your Event",
                description:
                  "Submit your World Space Week event to be featured in our global directory and reach thousands of space enthusiasts.",
                link: "/events/add",
                linkText: "Add Event",
              },
              {
                icon: Search,
                title: "Find Events",
                description:
                  "Discover World Space Week events happening near you. Filter by location, date, and event type to find the perfect celebration.",
                link: "/events/search",
                linkText: "Find Events",
              },
              {
                icon: Globe,
                title: "Calendar View",
                description:
                  "View all World Space Week events in an interactive calendar format. Plan your space week journey with ease.",
                link: "/events/calendar",
                linkText: "View Calendar",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
              >
                <div className="p-8 text-center">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#170324] to-[#170324] rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  <Link
                    to={card.link}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-[#170324] to-[#170324] hover:from-[#2a1a4d] hover:to-[#170324] text-white px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    <card.icon className="w-5 h-5 mr-2" />
                    {card.linkText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Events;