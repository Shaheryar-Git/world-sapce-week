
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, CreditCard, Building, Users, Rocket, Star, Check } from "lucide-react";
import ParticlesBackground from '@/components/ParticlesBackground';

const Donate = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(50);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  const donationAmounts = [25, 50, 100, 250, 500, 1000];
  
  const impactItems = [
    {
      icon: Users,
      title: "Educational Outreach",
      description: "Support educational programs reaching millions of students worldwide"
    },
    {
      icon: Rocket,
      title: "Event Coordination",
      description: "Help organize and support thousands of events globally"
    },
    {
      icon: Building,
      title: "Resource Development",
      description: "Create and distribute educational materials and resources"
    },
    {
      icon: Heart,
      title: "Community Building",
      description: "Foster international cooperation and space enthusiasm"
    }
  ];

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />

      {/* Hero Section - Dark */}
      <section className="relative py-32 hero-gradient overflow-hidden">
        <div className="hero-particles">
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
            <Heart className="w-5 h-5 text-[#9327e0] group-hover:scale-110 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">Support Our Mission</span>
            <Star className="w-5 h-5 text-[#9327e0] group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              Support Space Education
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
            Help us inspire the next generation of space explorers and make World Space Week accessible to everyone
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <button className="btn-primary">
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </button>
            <button className="btn-secondary">
              <Users className="w-5 h-5 mr-2" />
              Learn More
            </button>
          </div>
        </div>
      </section>

{/* Content Section */}

<section className="py-24 section-dark">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
      Ignite the Future of STEM with Your Support
    </h2>
    <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-10"></div>
    
    <div className="text-lg sm:text-xl text-gray-300 space-y-6 max-w-4xl mx-auto">
      <p>
        Imagine a world where every child has the inspiration and opportunity to pursue a career in STEM,
        helping to solve our planet’s most pressing challenges. Unfortunately, we face a significant gap in the global STEM workforce,
        with a projected shortfall of over <strong>1.2 million jobs in the U.S. alone by 2025</strong> (U.S. Department of Education, 2023).
        This gap threatens innovation and our ability to tackle critical issues like climate change.
      </p>
      <p>
        <strong>World Space Week (WSW)</strong> plays a crucial role in addressing the STEM gap. As the largest space event on Earth,
        WSW inspires youth globally from October 4–10 each year. In 2023, over <strong>16,000 events in 83 countries</strong>
        engaged future engineers, scientists, and explorers.
      </p>
      <p>
        Your donation can help us reach more passionate individuals all around the world.
      </p>
      <p className="font-semibold text-white">
        Join us in igniting the passions of future STEM leaders by sponsoring World Space Week!
      </p>
    </div>
  </div>
</section>


      {/* Donation Form - Light */}
      <section className="py-24 section-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Make a Donation</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your contribution helps us reach millions of people worldwide with space education and inspiration
            </p>
          </div>

          <div className="card-white animate-scale-in">
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Donation Amount</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedAmount === amount
                          ? 'border-[#9327e0] bg-[#9327e0]/10 text-[#9327e0]'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-[#9327e0]/50'
                      }`}
                    >
                      <span className="text-2xl font-bold">${amount}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Custom amount "
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent"
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9327e0] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="flex gap-4">
                    <button className="flex-1 p-4 border-2 border-[#9327e0] bg-[#9327e0]/10 rounded-xl flex items-center justify-center gap-2 text-[#9327e0]">
                      <CreditCard className="w-5 h-5" />
                      Credit Card
                    </button>
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full mt-8">
                Donate ${selectedAmount}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section - Dark */}
      <section className="py-24 section-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Your Impact</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how your donation helps advance space education and outreach worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactItems.map((item, index) => (
              <div key={index} className="card-glass group animate-scale-in">
                <div className="p-8 text-center">
                  <div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
