import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Paintbrush,
  Megaphone,
  Users,
  Mic,
  Camera,
  Globe,
  Handshake,
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const Positions = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  const opportunities = [
    {
      title: "Graphic Design",
      icon: <Paintbrush className="w-10 h-10 text-white" />,
      description:
        "Create stunning visuals for promotions, social media, and more!",
    },
    {
      title: "Social Media",
      icon: <Megaphone className="w-10 h-10 text-white" />,
      description:
        "Engage online communities by creating and scheduling posts.",
    },
    {
      title: "National Coordinators Manager",
      icon: <Users className="w-10 h-10 text-white" />,
      description:
        "Organize communications with coordinators and manage reports.",
    },
    {
      title: "Podcast",
      icon: <Mic className="w-10 h-10 text-white" />,
      description:
        "Help produce and promote podcast episodes with inspiring stories.",
    },
    {
      title: "Media",
      icon: <Camera className="w-10 h-10 text-white" />,
      description:
        "Capture and share compelling stories from World Space Week.",
    },
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
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8">
            <Handshake className="w-5 h-5 text-[#9326E0]" />
            <span className="text-white text-lg font-medium">
              Get Involved
            </span>
            <Globe className="w-5 h-5 text-[#9326E0]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
              Ways to Join World Space Week
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Be part of the largest space celebration on Earth by volunteering or organizing events
          </p>
        </div>
      </section>

      {/* Volunteer Roles Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">
              Volunteer Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the different roles you can take to contribute to World Space Week
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="bg-gradient-to-br to-white border border-[#9326E0]/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#9326E0] to-[#8c38c7] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {opportunity.icon}
                </div>
                <h3 className="text-xl font-bold text-[#204d74] mb-4 text-center">
                  {opportunity.title}
                </h3>
                <p className="text-gray-700 text-center">
                  {opportunity.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-[#204d74] mb-4">
              Other Ways to Get Involved
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Organize an event, volunteer your skills, or apply to be a National Coordinator.
              If there’s already a coordinator in your country, assist them as a Local Coordinator.
            </p>
            <p className="text-lg text-gray-700">
              Contact us via <a href="mailto:recruitment@worldspaceweek.org" className="text-[#9326E0] underline">recruitment@worldspaceweek.org</a> to join the mission!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};  

export default Positions;
