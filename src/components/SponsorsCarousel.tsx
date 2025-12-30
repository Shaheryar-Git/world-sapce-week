
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SponsorsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sponsors = [
    { 
      name: "NASA", 
      logo: "🚀", 
      description: "National Aeronautics and Space Administration",
      color: "from-blue-500 to-blue-700"
    },
    { 
      name: "ESA", 
      logo: "🛰️", 
      description: "European Space Agency",
      color: "from-indigo-500 to-indigo-700"
    },
    { 
      name: "SpaceX", 
      logo: "🌌", 
      description: "Space Exploration Technologies",
      color: "from-gray-700 to-gray-900"
    },
    { 
      name: "Boeing", 
      logo: "✈️", 
      description: "Aerospace & Defense",
      color: "from-blue-600 to-blue-800"
    },
    { 
      name: "Lockheed Martin", 
      logo: "🌟", 
      description: "Aerospace & Technology",
      color: "from-red-500 to-red-700"
    },
    { 
      name: "Blue Origin", 
      logo: "🌍", 
      description: "Space Tourism & Technology",
      color: "from-blue-400 to-blue-600"
    },
    { 
      name: "Virgin Galactic", 
      logo: "🚀", 
      description: "Commercial Spaceflight",
      color: "from-red-400 to-red-600"
    },
    { 
      name: "JAXA", 
      logo: "🇯🇵", 
      description: "Japan Aerospace Exploration Agency",
      color: "from-purple-500 to-purple-700"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(sponsors.length / 4));
    }, 4000);

    return () => clearInterval(timer);
  }, [sponsors.length]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Partners & Sponsors</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proud to collaborate with leading organizations in space exploration and technology, working together to inspire the next generation.
            </p>
          </div>

          {/* Sponsors Carousel */}
          <div className="relative overflow-hidden mb-16">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(sponsors.length / 4) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {sponsors.slice(slideIndex * 4, (slideIndex + 1) * 4).map((sponsor, index) => (
                      <div 
                        key={index}
                        className="group relative bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-xl border border-gray-200"
                      >
                        {/* Background Gradient on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                        
                        <div className="relative z-10">
                          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                            {sponsor.logo}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 mb-2 transition-colors duration-300">
                            {sponsor.name}
                          </h3>
                          <p className="text-gray-600 group-hover:text-gray-700 text-sm transition-colors duration-300 leading-relaxed">
                            {sponsor.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: Math.ceil(sponsors.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-purple-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Partnership CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Become a Partner</h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Join leading organizations in supporting World Space Week and help inspire the next generation of space explorers. Partner with us to make a global impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/support/partner"
                className="group bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/support/donate"
                className="group border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Support Our Mission
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsCarousel;
