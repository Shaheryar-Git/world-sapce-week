import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ParticlesBackground from '@/components/ParticlesBackground'
import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'

const BrandGuidelines = () => {

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

    const images = [
      { title: "Signage", image: "/assets/WSW_banner.jpg" },
      { title: "Social Media", image: "/assets/WSW_twitter.png" },
      { title: "Business Cards", image: "/assets/WSW_businesscard.jpg" },
      { title: "Apparel", image: "/assets/WSW_shirt.jpg" },
    ]

  return (
     <div className="min-h-screen ">
      <Navigation/>
      {/* Hero Section */}
    <section className="relative py-32 hero-gradient overflow-hidden mb-10">
        <div className="hero-particles">
          <div 
            className="absolute inset-0 hero-gradient"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
            }}
          />
          
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
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
             Brand Guidelines
            </span>
          </h1>
         <p className="text-lg md:text-xl leading-relaxed  text-white">
            This is the home of the World Space Week Brand Guidelines. Here you will find the resources needed to keep all extensions of our brand looking and feeling cohesive.
          </p>
          <p className="text-lg md:text-xl mt-4 leading-relaxed  text-white">
            Consistency is paramount within strong brands because it enforces memorability and builds trust within our global network of participants. Stay within these guidelines when generating new assets, whether visual or written, and World Space Week’s brand will continue to shine.
          </p>
          
          
        </div>
      </section>
      {/* What do we stand for? */}
     <section className="px-6 max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#210035] mb-10">What do we stand for?</h2>
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
            <h3 className="text-xl font-semibold text-[#9327e0] mb-4">Inclusivity</h3>
            <p>All ages, nationalities, genders and backgrounds should feel included, from students in developing countries to heads of space agencies.</p>
            <p className="mt-2">All types of space events are welcome, from protests to star-gazing parties.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
            <h3 className="text-xl font-semibold text-[#9327e0] mb-4">Synergy</h3>
            <p>The true power of WSW is in thousands of events being held simultaneously all over the world.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
            <h3 className="text-xl font-semibold text-[#9327e0] mb-4">Linking space and humanity</h3>
            <p>Humans are inherently connected to space. Space is “useful for humankind”.</p>
            <p className="mt-2 font-semibold italic">– Max Grimard, Chairman</p>
            <p className="mt-2">We inspire and excite the world about space science.</p>
          </div>
        </div>
      </section>

      {/* Communication Style */}
      <section className="px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#210035] mb-12">In what ways should we communicate?</h2>
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
        <div className="space-y-10 text-left">
          <div className='shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] p-8 '>
            <h3 className="text-2xl font-semibold text-[#9327e0] mb-2">Powerful</h3>
            <p>Our identity should reinforce the powerful experience that participating in a global space event provides our participants.</p>
          </div>
          <div className='shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] p-8 '>
            <h3 className="text-2xl font-semibold text-[#9327e0] mb-2">Sophisticated</h3>
            <p>For WSW to grow we need to build trust in our event. We should appear seasoned and sophisticated when participants new and old engage with our brand.</p>
          </div>
          <div className='shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] p-8 '>
            <h3 className="text-2xl font-semibold text-[#9327e0] mb-2">Inspirational</h3>
            <p>Our identity should leave attendees feeling bright, open, inspired to engage in a life of science – and to continue looking up.</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="px-6 max-w-5xl mx-auto text-center mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#210035] mb-12">Typography</h2>
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
        <p className="mb-6 text-lg">Our primary typeface is <strong>Roboto</strong>. A simple, familiar yet bold sans serif to provide maximum accessibility to our audience.</p>
        <a href="#" className="inline-block bg-[#9327e0] text-white px-6 py-3 rounded-lg font-medium mb-12">Download Fonts</a>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className='shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] p-8 '>
            <h3 className="text-xl font-semibold mb-2">Roboto Bold</h3>
            <p className="mb-2">ABC123<br />ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789+-/&$%#?!</p>
            <p className="text-sm text-gray-600">Roboto Bold is our display font. Use it for titles and headings and large exclamations.</p>
          </div>

          <div className='shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] p-8 '>
            <h3 className="text-xl font-semibold mb-2">Roboto Light</h3>
            <p className="mb-2">ABC123<br />ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789+-/&$%#?!</p>
            <p className="text-sm text-gray-600">Roboto Light is our secondary heading font. Use it to add in additional messages, sub-headers or notes.</p>
          </div>

          <div className='shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] p-8 '>
            <h3 className="text-xl font-semibold mb-2">Roboto Regular</h3>
            <p className="mb-2">ABC123<br />ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789+-/&$%#?!</p>
            <p className="text-sm text-gray-600">Roboto Regular is our body font. Use it for paragraphs or big chunks of text.</p>
          </div>
        </div>
      </section>
      <section className="px-6 max-w-6xl mx-auto text-center mb-28">
        <h2 className="text-3xl md:text-4xl font-bold text-[#210035] mt-12">Brand Applications</h2>
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-24 mt-6"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((imag, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={imag.image}
                alt={imag.title}
                className="w-full h-[35vh] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#9327e0]">{imag.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
<Footer/>
    </div>
  )
}

export default BrandGuidelines
