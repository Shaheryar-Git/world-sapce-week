import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";



const FeaturedSponsors = () => {
  const sponsors: {
    name: string;
    logo: React.ReactElement<{ src: string; alt: string }> | string;
    url: string;
    description: string;
  }[] = [
    {
      name: "Lockheed Martin",
      logo: (
        <img
          src="https://www.worldspaceweek.org/wp-content/uploads/lockheed-martin-l-1-white.png"
          alt="Lockheed Martin"
          className="h-10 mx-auto"
        />
      ),
      url: "https://lockheedmartin.com",
      description:
        "Global aerospace, defense, arms, security and advanced technologies corporation.A global pioneer in advanced space-based communications"
    },
    {
      name: "Viasat",
      logo: (
        <img
          src="https://www.worldspaceweek.org/wp-content/uploads/viasat-logo.png"
          alt="Viasat"
          className="h-10 mx-auto"
        />
      ),
      url: "https://viasat.com",
      description:
        "Leading global communications company providing broadband services.A leading global communications provider delivering.",
    },
    {
      name: "Eutelsat Group",
      logo: (
        <img
          src="https://www.worldspaceweek.org/wp-content/uploads/Eutelsat_Logo_Horizontal_Blanc.png"
          alt="Eutelsat Group"
          className="h-10 mx-auto"
        />
      ),
      url: "https://eutelsat.com",
      description: "One of the world's leading satellite operators.Among the world’s top satellite service providers.A premier operator in the global satellite industry.",
    },
    {
      name: "General Dynamics Mission Systems",
      logo: (
        <img
          src="https://www.worldspaceweek.org/wp-content/uploads/MS-logoWhite.png"
          alt="General Dynamics Mission Systems"
          className="h-10 mx-auto"
        />
      ),
      url: "https://gdmissionsystems.com",
      description:
        "Advanced technology systems for defense, intelligence and space applications.",
    },
    // {
    //   name: "ESA",
    //   logo: "🌌",
    //   url: "https://esa.int",
    //   description: "European Space Agency",
    // },
    // {
    //   name: "NASA",
    //   logo: "🌟",
    //   url: "https://nasa.gov",
    //   description: "National Aeronautics and Space Administration",
    // },
  ];

  return (
		<>
      <section className="py-20 bg-[#ffffff] border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#204d74] mb-4">
              Our Partners & Sponsors
            </h2>
            <div className="w-24 h-1 bg-[#9327e0] mx-auto mb-6"></div>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Supporting the global celebration of space exploration and
              inspiring the next generation of space enthusiasts
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="group relative border border-[#9327e0]/20 rounded-2xl p-6 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-purple-900/40 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 rounded-2xl border border-[#9327e0]/10 group-hover:border-[#9327e0]/50 transition-all duration-300 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-full h-24 bg-[#9327e0]/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-t-xl" />
                  <div className="flex items-center justify-center mb-4 p-5 bg-[#1a0429] rounded-xl transition-transform duration-300 backdrop-blur-sm shadow-inner">
                    {React.isValidElement(sponsor.logo) &&
                    sponsor.logo.type === "img" ? (
                      (() => {
                        const imgLogo = sponsor.logo as React.ReactElement<{
                          src: string;
                          alt: string;
                        }>;
                        return (
                          <img
                            src={imgLogo.props.src}
                            alt={imgLogo.props.alt}
                            className="h-36  w-auto object-contain drop-shadow-lg"
                          />
                        );
                      })()
                    ) : React.isValidElement(sponsor.logo) ? (
                      sponsor.logo
                    ) : (
                      <span className="text-5xl">{sponsor.logo}</span>
                    )}
                  </div>

                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-[#9327e0]/40 text-white bg-[#2d1240] hover:bg-[#9327e0] hover:text-white transition-all duration-300 shadow-md hover:shadow-[#9327e0]/40"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✨ New Section Added Below With Gap Before Footer ✨ */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#204d74]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Join Our Sponsors
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Support the world's largest annual space event and connect with
            millions of space enthusiasts globally.
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
    </>
  );
};

export default FeaturedSponsors;
