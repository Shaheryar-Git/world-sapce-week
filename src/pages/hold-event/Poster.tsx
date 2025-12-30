import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
	Image,
	Download,
	Palette,
	Share2,
	FileImage,
	Rocket,
	Star,
	Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";

const Poster = () => {
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

	const posterTypes = [
		{
			title: "Official WSW Poster",
			description:
				"The official World Space Week poster featuring this year's theme",
			format: "PDF, PNG",
			sizes: "A4, A3, A2, A1",
		},
		{
			title: "Custom Event Poster",
			description: "Customizable template for your specific WSW event",
			format: "PSD, AI, PDF",
			sizes: "Various sizes",
		},
		{
			title: "Social Media Graphics",
			description: "Ready-to-use graphics for social media promotion",
			format: "PNG, JPG",
			sizes: "Facebook, Instagram, Twitter",
		},
		{
			title: "Educational Posters",
			description: "Educational content posters about space exploration",
			format: "PDF, PNG",
			sizes: "A4, A3",
		},
	];

	const features = [
		{
			icon: Palette,
			title: "Multiple Designs",
			description:
				"Choose from various poster designs that match the World Space Week branding.",
		},
		{
			icon: FileImage,
			title: "High Resolution",
			description:
				"Download high-quality posters suitable for both digital and print use.",
		},
		{
			icon: Download,
			title: "Easy Download",
			description:
				"Simple one-click download in multiple formats and sizes.",
		},
		{
			icon: Share2,
			title: "Share Ready",
			description:
				"Optimized graphics ready for social media and digital sharing.",
		},
	];

	return (
		<div className="min-h-screen bg-[#220536]">
			<Navigation />

			{/* Hero Section - Dark */}
			<section className="relative py-32 hero-gradient overflow-hidden">
				<div className="hero-particles">
					<div
						className="absolute inset-0 hero-gradient"
						style={{
							transform: `translateY(${parallaxOffset}px)`,
						}}
					/>
					{/* BACKFROUND PARTICLES */}
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
						<Rocket className="w-5 h-5 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
						<span className="text-white text-lg font-medium">
							Official Posters
						</span>
						<Star className="w-5 h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
							WSW Posters
						</span>
					</h1>
					<p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
						Download official World Space Week posters and
						promotional materials
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
						<button className="btn-primary">
							<Download className="w-5 h-5 mr-2" />
							Download All
						</button>
						<Link
							to="/hold-event/media-kit"
							className="btn-secondary"
						>
							<FileImage className="w-5 h-5 mr-2" />
							Media Kit
						</Link>
					</div>
				</div>
			</section>

			{/* Features - Light */}
			<section className="py-24 section-light">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-fade-in-up">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Poster Features
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Professional-quality posters designed to promote
							your World Space Week events
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="card-white group animate-scale-in"
							>
								<div className="p-8 text-center">
									<div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
										<feature.icon className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										{feature.title}
									</h3>
									<p className="text-gray-600">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Poster Gallery - Dark */}
			<section className="py-24 section-dark">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-fade-in-up">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
							Available Posters
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Browse and download from our collection of World
							Space Week promotional materials
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{posterTypes.map((poster, index) => (
							<div
								key={index}
								className="card-glass group animate-scale-in"
							>
								<div className="p-8">
									<div className="bg-gradient-to-br from-[#9327e0]/20 to-[#204d74]/20 h-48 rounded-xl mb-6 flex items-center justify-center">
										<Image className="w-16 h-16 text-white/50" />
									</div>

									<h3 className="text-2xl font-bold text-white mb-4">
										{poster.title}
									</h3>
									<p className="text-gray-300 mb-6">
										{poster.description}
									</p>

									<div className="grid grid-cols-2 gap-4 mb-6 text-sm">
										<div>
											<span className="text-gray-400">
												Format:
											</span>
											<p className="text-white">
												{poster.format}
											</p>
										</div>
										<div>
											<span className="text-gray-400">
												Sizes:
											</span>
											<p className="text-white">
												{poster.sizes}
											</p>
										</div>
									</div>

									<div className="flex gap-3">
										<button className="btn-primary flex-1">
											<Download className="w-4 h-4 mr-2" />
											Download
										</button>
										<button className="p-3 bg-[#204d74]/20 hover:bg-[#204d74]/30 rounded-xl transition-colors duration-300">
											<Eye className="w-5 h-5 text-white" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action - Light */}
			<section className="py-24 section-light">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
						Need Custom Designs?
					</h2>
					<p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
						Our team can help create custom promotional materials
						for your specific World Space Week event. Contact us to
						discuss your requirements.
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						<Link to="/contact" className="btn-primary">
							<Share2 className="w-5 h-5 mr-2" />
							Request Custom Design
						</Link>
						<Link
							to="/hold-event/media-kit"
							className="btn-secondary"
						>
							<FileImage className="w-5 h-5 mr-2" />
							Browse Media Kit
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Poster;
