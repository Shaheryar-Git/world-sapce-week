import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
	Target,
	Eye,
	Heart,
	Users,
	Globe,
	Lightbulb,
	Rocket,
	Star,
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const Mission = () => {
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

	return (
		<div className="min-h-screen bg-[#220536]">
			<Navigation />

			{/* Hero Section */}
			<section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
				{/* Animated Background */}
				<div className="absolute inset-0">
					<div
						className="absolute inset-0 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118]"
						style={{
							transform: `translateY(${parallaxOffset}px)`,
						}}
					/>

					{/* Animated Particles */}
					<ParticlesBackground scrollY={scrollY} count={200} />

					{/* Floating Elements */}
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
					<div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
						<Rocket className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
						<span className="text-white text-lg font-medium">
							Our Mission
						</span>
						<Star className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
							Mission & Vision
						</span>
					</h1>
					<p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
						Inspiring humanity through space education and global
						collaboration
					</p>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-24 bg-white relative">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div>
							<div className="inline-flex items-center gap-3 bg-[#9326E0]/10 rounded-full px-4 py-2 mb-6">
								<Target className="w-5 h-5 text-[#9326E0]" />
								<span className="text-[#9326E0] font-semibold">
									Our Mission
								</span>
							</div>
							<h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">
								Coordinating Global Space Education
							</h2>
							<p className="text-lg text-gray-700 mb-6 leading-relaxed">
								The World Space Week Association coordinates
								World Space Week globally to maximize its
								benefits for humanity. We inspire students,
								demonstrate public support for the space
								program, educate the public about space
								activities, and foster international cooperation
								in space outreach and education.
							</p>
							<p className="text-gray-700 leading-relaxed">
								Through our global network of coordinators and
								partners, we create opportunities for people of
								all ages to learn about space science and
								technology, encouraging the next generation to
								pursue careers in STEM fields.
							</p>
						</div>
						<div className="relative">
							<div className="bg-gradient-to-br from-[#9326E0]/10 to-[#204d74]/10 rounded-3xl p-8 border border-[#9326E0]/20">
								<div className="text-center">
									<div className="w-20 h-20 bg-gradient-to-br from-[#9326E0] to-[#8c38c7] rounded-full flex items-center justify-center mx-auto mb-6">
										<Globe className="w-10 h-10 text-white" />
									</div>
									<div className="text-4xl font-bold text-[#9326E0] mb-2">
										80+
									</div>
									<p className="text-[#204d74] font-semibold">
										Countries Participating
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Vision Section */}
			<section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-10 right-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
					<div className="absolute bottom-10 left-10 w-80 h-80 bg-[#8c38c7]/5 rounded-full blur-3xl" />
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div className="order-2 lg:order-1">
							<div className="bg-gradient-to-br from-[#8c38c7]/10 to-[#9326E0]/10 backdrop-blur-md border border-[#9326E0]/20 rounded-3xl p-8">
								<div className="text-center">
									<div className="w-20 h-20 bg-gradient-to-br from-[#8c38c7] to-[#9326E0] rounded-full flex items-center justify-center mx-auto mb-6">
										<Lightbulb className="w-10 h-10 text-white" />
									</div>
									<div className="text-4xl font-bold text-white mb-2">
										2024
									</div>
									<p className="text-gray-300 font-semibold">
										Theme: Space & Climate Change
									</p>
								</div>
							</div>
						</div>
						<div className="order-1 lg:order-2">
							<div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
								<Eye className="w-5 h-5 text-[#9326E0]" />
								<span className="text-[#9326E0] font-semibold">
									Our Vision
								</span>
							</div>
							<h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
								The Largest Space Event on Earth
							</h2>
							<p className="text-lg text-gray-300 mb-6 leading-relaxed">
								To make World Space Week the largest public
								space event on Earth, inspiring wonder and
								building support for space exploration and
								science education worldwide.
							</p>
							<p className="text-gray-300 leading-relaxed">
								We envision a future where every person on Earth
								has the opportunity to learn about and be
								inspired by space science and exploration,
								fostering a global community united by our
								shared cosmic heritage.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-3 bg-[#9326E0]/10 rounded-full px-4 py-2 mb-6">
							<Heart className="w-5 h-5 text-[#9326E0]" />
							<span className="text-[#9326E0] font-semibold">
								Our Values
							</span>
						</div>
						<h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">
							What Drives Us Forward
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Our core values guide everything we do in promoting
							space education and international cooperation
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-gradient-to-br to-white border border-[#9326E0]/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
							<div className="w-16 h-16 bg-gradient-to-br from-[#9326E0] to-[#8c38c7] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<Users className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-[#204d74] mb-4 text-center">
								Education & Outreach
							</h3>
							<p className="text-gray-700 text-center">
								Inspiring the next generation through
								comprehensive space education programs and
								resources
							</p>
						</div>

						<div className="bg-gradient-to-br to-white border border-[#8c38c7]/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
							<div className="w-16 h-16 bg-gradient-to-br from-[#8c38c7] to-[#9326E0] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<Globe className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-[#204d74] mb-4 text-center">
								International Cooperation
							</h3>
							<p className="text-gray-700 text-center">
								Fostering peaceful collaboration in space
								exploration and scientific advancement
							</p>
						</div>

						<div className="bg-gradient-to-br to-white border border-[#204d74]/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
							<div className="w-16 h-16 bg-gradient-to-br from-[#204d74] to-[#9326E0] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<Lightbulb className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-[#204d74] mb-4 text-center">
								Innovation & Discovery
							</h3>
							<p className="text-gray-700 text-center">
								Supporting scientific advancement and
								technological innovation in space sciences
							</p>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Mission;
