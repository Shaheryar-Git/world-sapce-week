import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Calendar,
  MapPin,
  Users,
  Globe,
  Upload,
  Save,
  Rocket,
  Star,
} from "lucide-react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

const AddEvent = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    country: "",
    eventType: "",
    targetAudience: "",
    contactName: "",
    contactEmail: "",
    website: "",
  });
  const countryList = [
    "All Countries",
    ...Object.values(countries.getNames("en", { select: "official" })),
  ];
  countries.registerLocale(enLocale);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event submitted:", formData);
    // Here you would typically submit to a backend
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />

      {/* Hero Section - Dark */}
      <section className="relative py-20 hero-gradient overflow-hidden">
        <div className="hero-particles">
          <div
            className="absolute inset-0 hero-gradient"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
            }}
          />

          {[...Array(20)].map((_, i) => (
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

          <div className="absolute top-10 left-10 w-32 h-32 bg-[#9327e0]/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-[#204d74]/10 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        <div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            opacity: fadeOffset,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
            <Rocket className="w-5 h-5 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">
              Event Submission
            </span>
            <Star className="w-5 h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              Add Your Event
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Join thousands of organizations worldwide in celebrating World Space
            Week. Submit your event to our global directory.
          </p>
        </div>
      </section>

      {/* Form Section - Light */}
      <section className="py-16 section-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-scale-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Event Details
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Event Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select event type</option>
                    <option value="educational">Educational</option>
                    <option value="public">Public Event</option>
                    <option value="conference">Conference</option>
                    <option value="exhibition">Exhibition</option>
                    <option value="competition">Competition</option>
                    <option value="online">Online Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                  placeholder="Describe your event in detail..."
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2 text-[#9327e0]" />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min="2025-10-04"
                    max="2025-10-10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2 text-[#204d74]" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                    placeholder="City, State/Province"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2 text-[#9327e0]" />
                    Country *
                  </label>
                 <option value="" disabled>
                          Select country
                        </option>
                        {countryList.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-[#204d74]" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website (optional)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent transition-all duration-200"
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="btn-primary w-full text-lg py-4"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Submit Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AddEvent;
