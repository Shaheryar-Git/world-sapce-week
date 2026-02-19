import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Download, Copy, Rocket } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const Theme = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const parallaxOffset = scrollY * 0.3;

	const currentTheme = {
		year: "2025",
		title: "Space and Climate Change",
		description:
			"Exploring how space science and technology can help us understand and address climate change on Earth and beyond.",
		hashtags: [
			"#WSW2025",
			"#SpaceClimate",
			"#EarthObservation",
			"#ClimateAction",
		],
	};

	return (
		<div className="min-h-screen bg-[#220536]">
			<Navigation />

			{/* Hero Section */}
			<section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
				{/* BACKFROUND PARTICLES */}
				<ParticlesBackground scrollY={scrollY} count={200} />

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8">
						<Star className="w-5 h-5 text-[#9326E0]" />
						<span className="text-white text-lg font-medium">
							WSW 2025 Theme
						</span>
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							{currentTheme.title}
						</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
						{currentTheme.description}
					</p>

					<div className="flex flex-wrap justify-center gap-3">
						{currentTheme.hashtags.map((hashtag, index) => (
							<span
								key={index}
								className="bg-[#9326E0]/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-[#9326E0]/30"
							>
								{hashtag}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Theme Details */}
			<section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
								About the 2025 Theme
							</h2>
							<div className="space-y-6 text-gray-300">
								<p className="text-lg">
									The 2025 World Space Week theme highlights
									the critical role that space science and
									technology play in understanding and
									addressing climate change. From Earth
									observation satellites monitoring our
									planet's changing systems to space-based
									solar power concepts, space technology
									offers unique perspectives and solutions for
									our climate challenges.
								</p>
								<p>
									This theme encourages events that explore
									how space missions help scientists track
									climate patterns, how satellite data informs
									climate policy, and how space technology
									might provide future solutions to
									environmental challenges.
								</p>
							</div>

							<div className="mt-8 flex flex-wrap gap-4">
								<button className="bg-gradient-to-r from-[#9326E0] to-[#8c38c7] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 flex items-center gap-2">
									<Download className="w-5 h-5" />
									Download Resources
								</button>
								<button className="border-2 border-[#9326E0]/30 bg-white/5 backdrop-blur-md text-white hover:bg-[#9326E0] hover:border-[#9326E0] px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2">
									<Copy className="w-5 h-5" />
									Copy Theme Text
								</button>
							</div>
						</div>

						<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8">
							<h3 className="text-2xl font-bold text-white mb-6">
								Event Ideas
							</h3>
							<ul className="space-y-4 text-gray-300">
								<li className="flex items-start gap-3">
									<Rocket className="w-5 h-5 text-[#9326E0] mt-0.5 flex-shrink-0" />
									<span>
										Earth observation satellite
										demonstrations
									</span>
								</li>
								<li className="flex items-start gap-3">
									<Rocket className="w-5 h-5 text-[#9326E0] mt-0.5 flex-shrink-0" />
									<span>
										Climate data visualization workshops
									</span>
								</li>
								<li className="flex items-start gap-3">
									<Rocket className="w-5 h-5 text-[#9326E0] mt-0.5 flex-shrink-0" />
									<span>
										Space technology for sustainability
										panels
									</span>
								</li>
								<li className="flex items-start gap-3">
									<Rocket className="w-5 h-5 text-[#9326E0] mt-0.5 flex-shrink-0" />
									<span>
										Student climate monitoring projects
									</span>
								</li>
								<li className="flex items-start gap-3">
									<Rocket className="w-5 h-5 text-[#9326E0] mt-0.5 flex-shrink-0" />
									<span>
										Virtual space mission simulations
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Theme;
