import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
	BookOpen,
	CheckCircle,
	Users,
	Calendar,
	Globe,
	Rocket,
	Star,
	Download,
	FileText,
	AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";

const Guidelines = () => {
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

	const guidelines = [
		{
			icon: Calendar,
			title: "Event Timing",
			description:
				"World Space Week runs from October 4-10 annually. Plan your events within this timeframe.",
		},
		{
			icon: Users,
			title: "Target Audience",
			description:
				"Design events for all ages and backgrounds. Make space accessible to everyone.",
		},
		{
			icon: Globe,
			title: "Global Participation",
			description:
				"Coordinate with local and international partners to maximize impact.",
		},
		{
			icon: BookOpen,
			title: "Educational Content",
			description:
				"Focus on educational value and inspiring the next generation of space explorers.",
		},
	];

	const steps = [
		{
			number: "01",
			title: "Plan Your Event",
			description:
				"Define objectives, target audience, and format for your World Space Week event.",
		},
		{
			number: "02",
			title: "Register Event",
			description:
				"Submit your event details through our official registration platform.",
		},
		{
			number: "03",
			title: "Promote Activity",
			description:
				"Use our media kit and promotional materials to reach your audience.",
		},
		{
			number: "04",
			title: "Execute & Report",
			description:
				"Run your event and share results with the global WSW community.",
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
							Event Guidelines
						</span>
						<Star className="w-5 h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
							Event Guidelines
						</span>
					</h1>
					<p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
						Everything you need to know to organize a successful
						World Space Week event
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
						<Link to="/hold-event" className="btn-primary">
							<BookOpen className="w-5 h-5 mr-2" />
							Get Started
						</Link>
						<button className="btn-secondary">
							<Download className="w-5 h-5 mr-2" />
							Download Guidelines
						</button>
					</div>
				</div>
			</section>

			{/* Guidelines Overview - Light */}
			<section className="py-24 section-light">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-fade-in-up">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Core Guidelines
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Follow these essential guidelines to ensure your
							event aligns with World Space Week objectives
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{guidelines.map((guideline, index) => (
							<div
								key={index}
								className="card-white group animate-scale-in"
							>
								<div className="p-8 text-center">
									<div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
										<guideline.icon className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										{guideline.title}
									</h3>
									<p className="text-gray-600">
										{guideline.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Step-by-Step Process - Dark */}
			<section className="py-24 section-dark">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-fade-in-up">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
							How to Organize
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Follow these steps to successfully plan and execute
							your World Space Week event
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{steps.map((step, index) => (
							<div
								key={index}
								className="card-glass group animate-scale-in"
							>
								<div className="p-8 text-center">
									<div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
										<span className="text-white font-bold text-lg">
											{step.number}
										</span>
									</div>
									<h3 className="text-xl font-bold text-white mb-4">
										{step.title}
									</h3>
									<p className="text-gray-300">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Resources Section - Light */}
			<section className="py-24 section-light">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-fade-in-up">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Resources & Support
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="card-white group animate-scale-in">
							<div className="p-8 text-center">
								<FileText className="w-12 h-12 text-[#9327e0] mx-auto mb-6" />
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									Planning Templates
								</h3>
								<p className="text-gray-600 mb-6">
									Download event planning templates and
									checklists
								</p>
								<button className="btn-primary w-full flex items-center justify-center">
									<Download className="w-4 h-4 mr-2" />
									Download
								</button>
							</div>
						</div>

						<div className="card-white group animate-scale-in">
							<div className="p-8 text-center">
								<Users className="w-12 h-12 text-[#9327e0] mx-auto mb-6" />
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									Community Support
								</h3>
								<p className="text-gray-600 mb-6">
									Connect with other event organizers
									worldwide
								</p>
								<Link to="/contact">
									<button className="btn-primary w-full flex items-center justify-center">
										<Users className="w-4 h-4 mr-2" />
										Join Community
									</button>
								</Link>
							</div>
						</div>

						<div className="card-white group animate-scale-in">
							<div className="p-8 text-center">
								<AlertCircle className="w-12 h-12 text-[#9327e0] mx-auto mb-6" />
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									Get Help
								</h3>
								<p className="text-gray-600 mb-6">
									Need assistance? Our expert team is ready to
									help
								</p>
								<Link to="/contact">
									<button className="btn-primary w-full flex items-center justify-center">
										<AlertCircle className="w-4 h-4 mr-2" />
										Join Community
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Guidelines;
