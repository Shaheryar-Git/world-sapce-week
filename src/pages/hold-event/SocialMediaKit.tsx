import {
	Book,
	Download,
	Video,
	FileText,
	Users,
	Lightbulb,
	Rocket,
	Star,
  ExternalLink,
} from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SocialMediaKit = () => {
	const worldSpaceCard = [
		{
			image: "/Assets/New-Project-28-1.png",
			title: "I'm Celebrating World Space Week!",
			color: "from-[#9326E0] to-[#8c38c7]",
			change: "Customize it for your event",
		},
		{
			image: "/Assets/New-Project-28-1.png",
			title: "We're Celebrating World Space Week!",
			color: "from-[#8c38c7] to-[#9326E0]",
			change: "Customize it for your event",
		},
	];

	return (
		<div className="min-h-screen bg-[#220536]">
			<Navigation />

			{/* Hero Section */}
			<motion.section
				className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden"
				style={
					{
						// y: parallaxOffset,
					}
				}
			>
				{/* Animated Background */}
				<div className="absolute inset-0">
					<div
						className="absolute inset-0 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118]"
						style={
							{
								// transform: `translateY(${parallaxOffset}px)`,
							}
						}
					/>

					{/* Animated Particles */}
					<ParticlesBackground scrollY={scrollY} count={200} />

					{/* Floating Elements */}
					<div className="absolute top-20 left-10 w-32 h-32 bg-[#9326E0]/10 rounded-full blur-xl animate-pulse" />
					<div className="absolute bottom-32 right-20 w-40 h-40 bg-[#8c38c7]/10 rounded-full blur-2xl animate-pulse delay-1000" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
						<Rocket className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
						<span className="text-white text-lg font-medium">
							Social Media Toolkit
						</span>
						<Star className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
							Social Media Toolkit
						</span>
					</h1>
					<p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
						Use this toolkit to promote your World Space Week event
						with ready-made visuals, templates, and posting tips.
						Tag our accounts and use the official hashtags to get
						noticed, your event might be featured on our channels!
					</p>
				</div>
			</motion.section>

			{/* Resources Categories */}
			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">
							Official WSW 2025 Visual Assets
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Customize and download official graphics for your
							World Space Week events
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{worldSpaceCard.map((category, index) => (
							<div
								key={index}
								className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group "
							>
								<div className="aspect-[4/3] bg-white/5 flex items-center justify-center p-6">
									<img
										src={category.image}
										alt={category.title}
										className="max-h-82 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<h3 className="text-2xl font-bold text-[#204d74] mb-6 text-center">
									{category.title}
								</h3>
								<a
									// href={partner.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center ml-40 bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform group-hover:scale-105"
								>
									Download PDF
									<ExternalLink className="w-4 h-4 ml-2" />
								</a>
								{/* <ul className="space-y-3"></ul> */}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured */}

			<div className="py-24 bg-gradient-to-b from-[#1a0429] to-[#220536] relative">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
							Featured
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Card 1 */}
						<div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] rounded-2xl p-8 text-white">
							<FileText className="w-12 h-12 mb-6" />
							<h3 className="text-2xl sm:text-3xl font-bold mb-4">
								Follow World Space Week
							</h3>
							<p className="text-base sm:text-lg mb-6 opacity-90">
								Stay connected and tag us in your content:
							</p>
							<p className="text-sm sm:text-base mb-4 opacity-90 leading-relaxed space-y-1">
								<span className="block">
									📸 Instagram: @worldspaceweek
								</span>
								<span>🐦 Twitter/X: @worldspaceweek</span>
								<br />
								<span>📘 Facebook: World Space Week</span>
								<br />
								<span>💼 LinkedIn: World Space Week</span>
								<br />
								<span>
									📺 YouTube: World Space Week Association
								</span>
								<br />
								<span>
									📷 Flickr: World Space Week Association
								</span>
							</p>
							<button className="bg-white text-[#9326E0] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
								Visit Our Socials
							</button>
						</div>

						{/* Card 2 */}
						<div className="bg-gradient-to-br from-[#8c38c7] to-[#8c38c7] rounded-2xl p-8 text-white">
							<Users className="w-12 h-12 mb-6" />
							<h3 className="text-2xl sm:text-3xl font-bold mb-4">
								Promote Your Event on Social Media
							</h3>
							<p className="text-sm sm:text-base mb-4 opacity-90 leading-relaxed space-y-1">
								📣 Plan your WSW event (October 4–10)
								<br />
								🗓️ Register it on the WSW Event Calendar
								<br />
								🏷️ Use the official hashtags: <br />
								<span className="font-semibold">
									#WSW2025
								</span>,{" "}
								<span className="font-semibold">
									#WorldSpaceWeek
								</span>
								<br />
								🗣️ Post before, during, and after your event to
								share the experience with the global community.
								<br />
								🔁 Tag our accounts so we can reshare your
								content!
							</p>
							<button className="bg-white text-[#8c38c7] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
								Promote Your Event
							</button>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default SocialMediaKit;
