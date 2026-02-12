import React, { useEffect } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import cardsDetails from "@/Data/ThemesData";
import { Link } from "react-router-dom";

const PastReportsPosters = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  	

  return (
		<div className="min-h-screen text-white relative bg-gradient-to-br from-[#1b002a] via-[#25063e] to-[#12021c] ">
			<Navigation />

			{/* Hero Section */}

			<section className=" overflow-hidden py-36 bg-gradient-to-br from-[#220536] to-[#1a0429] ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							PAST THEMES, REPORTS AND POSTERS
						</span>
					</h1>
					<p className="text-xl text-gray-300  mx-auto leading-relaxed">
						Explore a rich archive of World Space Week themes,
						official reports, and promotional posters from past
						years — a source of inspiration for your future events.
					</p>
				</div>
			</section>
			<ParticlesBackground count={150} />

			{/* Posters Grid */}
			<section className="max-w-7xl mx-auto px-4 py-16 z-20 relative">
				<div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{cardsDetails.map((card, index) => (
						<div
							key={index}
							data-aos="fade-up"
							className="group bg-white/5 backdrop-blur-md border border-purple-600/20 rounded-3xl p-4 flex flex-col hover:shadow-purple-500/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
						>
							<div className="relative overflow-hidden rounded-xl">
								<img
									src={card.Image}
									alt={card.Theme || `Poster ${index + 1}`}
									className="w-full h-64 object-cover rounded-xl border border-[#3e0f61] transform group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
									<p className="text-sm text-gray-200">
										Click to enlarge
									</p>
								</div>
							</div>

							<div className="flex flex-col justify-between text-center px-2 mt-5">
								<div>
									<h3 className="text-purple-400 font-semibold text-lg">
										Year: {card.year}
									</h3>
									<h4 className="text-white font-light text-base mt-1">
										Theme:{" "}
										<span className="italic text-[#e0cfff]">
											{card.Theme}
										</span>
									</h4>
								</div>
								<Link to={card.link} className="mt-6 bg-gradient-to-r from-[#9326E0] to-[#5f2092] hover:from-[#a647ff] hover:to-[#7539bd] transition-all duration-300 text-white py-2 px-5 rounded-full font-medium shadow-md hover:shadow-purple-500/50">
									View Report
								</Link>
								<Link to={`/about-wsw/Past-Theme-Reports-Posters/${card.id}`} className="mt-6 bg-gradient-to-r from-[#9326E0] to-[#5f2092] hover:from-[#a647ff] hover:to-[#7539bd] transition-all duration-300 text-white py-2 px-5 rounded-full font-medium shadow-md hover:shadow-purple-500/50">
									View Theme
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>

			<Footer />
		</div>
  );

};

export default PastReportsPosters;
