import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Calendar, Globe2 } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const Highlights = () => {
	return (
		<div className="relative overflow-hidden">
			<Navigation />

			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-[#220536] to-[#1a0429] relative">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8">
						<Star className="w-5 h-5 text-[#9326E0]" />
						<span className="text-white text-lg font-medium">
							World Space Week 2025
						</span>
					</div>

					{/* Animated Particles */}
					<ParticlesBackground count={200} />

					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							 Highlights
						</span>
					</h1>

					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Celebrating creativity, exploration, and innovation —
						see the global highlights from World Space Week 2025.
					</p>
				</div>
			</section>

			{/* Highlights Section */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white rounded-2xl p-8 shadow-lg">
						<div className="flex items-center gap-4 mb-6">
							<div className="w-16 h-16 bg-[#9327e0] rounded-full flex items-center justify-center">
								<Globe2 className="w-8 h-8 text-white" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-[#204d74]">
									World Space Week 2025 Highlights
								</h2>
								<div className="flex items-center gap-2 text-gray-600">
									<Calendar className="w-4 h-4" />
									<span>October 4–10, 2025</span>
								</div>
							</div>
						</div>

						<div className="prose prose-lg max-w-none text-gray-700 space-y-6">
							<p>
								<strong>World Space Week 2025 Artwork Mosaic</strong> will return to 
								Piccadilly Lights in London on October 8 with <em>Space for a Better World!</em> 
								Global participants are invited to submit artwork reflecting the theme 
								“Living in Space,” with selected pieces showcased on the iconic screen.
							</p>

							<p>
								<strong>Crayola</strong> is distributing space “thinking sheets” and videos 
								to inspire young minds about life beyond Earth.
							</p>

							<p>
								<strong>Living on the Moon Online Event</strong> – A global online event on 
								October 8 featuring NASA, Lockheed Martin, UN COPUOS, and other partners, 
								exploring lunar habitats and cooperation beyond Earth. Registrations are open 
								to everyone worldwide.
							</p>

							<p>
								<strong>Arizona State University</strong> will launch the 30-minute film 
								<em> Becoming Interplanetary </em> during World Space Week 2025. The film is 
								available for screenings in classrooms, museums, clubs, and public forums, 
								with a discussion guide to help communities lead their own conversations on 
								the ethical, cultural, and spiritual dimensions of becoming a spacefaring species.
							</p>

							<p>
								<strong>SAASST of UAE</strong> will celebrate with planetarium shows, interactive 
								stations, and workshops on astrobiology, AI, and astronaut life. The program 
								also features lectures on exoplanets, interstellar travel, and cosmic radiation.
							</p>

							<p>
								<strong>Amateur Radio on the International Space Station (ARISS)</strong> will host 
								a special <em>Slow Scan Television (SSTV)</em> event, transmitting six unique images 
								from orbit between October 3–6. Enthusiasts can tune in at 145.800 MHz to receive 
								and decode images directly from the ISS.
							</p>

							<p>
								Directed by retired NASA astronaut <strong>Terry Hart</strong>, 
								<strong> Lehigh University</strong> launched a new master’s in Aerospace & 
								Space Systems Engineering, inviting future engineers to prepare for 
								careers across the global space industry.
							</p>

							<p>
								<strong>Cosmic Girls Foundation</strong> hosted a special discussion based on 
								UNOOSA’s gender equality study, spotlighting progress and ongoing challenges 
								for women in space, promoting equity and opportunity across the field.
							</p>

							<div className="bg-[#9327e0]/10 border-l-4 border-[#9327e0] p-6 rounded-lg mt-10">
								<h4 className="font-bold text-[#204d74] mb-2">Share Your Event!</h4>
								<p>
									Do you have an out-of-this-world World Space Week 2025 event that should 
									appear on the highlights? Share it with us via{" "}
									<a
										href="mailto:contact@worldspaceweek.org"
										className="text-[#9327e0] font-semibold underline hover:text-[#7a20c2]"
									>
										contact@worldspaceweek.org
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Highlights;
