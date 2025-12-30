import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
	Rocket,
	Calendar,
	Globe,
	Target,
	Users,
	BookOpen,
	Star,
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";



const WhatIsWSW = () => {
	const [scrollY, setScrollY] = useState(0);
	const [scrollYy] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const parallaxOffset = scrollY * 0.3;
	const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

	const goals = [
		{
			icon: BookOpen,
			title: "Educate",
			description:
				"Build young minds by educating them about space activities",
		},
		{
			icon: Users,
			title: "Demonstrate",
			description: "Show public support for space programs",
		},
		{
			icon: Star,
			title: "Excite",
			description: "Generate public excitement about the universe",
		},
		{
			icon: Globe,
			title: "Foster",
			description: "Promote international cooperation in space outreach",
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

				{/* Animated Particles */}
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
							About World Space Week
						</span>
						<Star className="w-5 h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
							What is World Space Week?
						</span>
					</h1>
					<p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
						An international celebration of science and technology,
						and their contribution to the betterment of the human
						condition
					</p>
				</div>
			</section>

			{/* Overview Section - Light */}
			<section className="py-24 section-light">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-fade-in-up">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Overview
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
					</div>

					<div className="card-white animate-scale-in">
						<div className="p-8 lg:p-12">
							<p className="text-gray-700 mb-6 text-lg leading-relaxed">
								World Space Week is an international celebration
								of science and technology, and their
								contribution to the betterment of the human
								condition. The United Nations General Assembly
								declared in 1999 that World Space Week will be
								held each year from October 4-10.
							</p>

							<div className="bg-gradient-to-r from-[#9327e0]/10 to-[#204d74]/10 rounded-2xl p-8 mb-8">
								<h3 className="text-2xl font-semibold text-[#9327e0] mb-4 flex items-center gap-3">
									<Calendar className="w-8 h-8" />
									Historical Significance
								</h3>
								<p className="text-gray-700 mb-4">
									These dates commemorate two events that
									changed the world forever:
								</p>
								<ul className="space-y-3 text-gray-700">
									<li className="flex items-start gap-3">
										<div className="w-2 h-2 bg-[#9327e0] rounded-full mt-2 flex-shrink-0"></div>
										<span>
											<strong>October 4, 1957:</strong>{" "}
											Launch of the first human-made Earth
											satellite, Sputnik I
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="w-2 h-2 bg-[#204d74] rounded-full mt-2 flex-shrink-0"></div>
										<span>
											<strong>October 10, 1967:</strong>{" "}
											Signing of the Treaty on Principles
											Governing the Activities of States
											in the Exploration and Peaceful Uses
											of Outer Space
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Goals Section - Dark */}
			<section className="py-24 section-dark">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-fade-in-up">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
							Goals and Objectives
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Four core objectives drive our mission to inspire
							and educate
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{goals.map((goal, index) => (
							<div
								key={index}
								className="card-glass group animate-scale-in"
							>
								<div className="p-8 text-center">
									<div className="bg-gradient-to-br from-[#9327e0] to-[#204d74] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
										<goal.icon className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-xl font-bold text-white mb-4">
										{goal.title}
									</h3>
									<p className="text-gray-300">
										{goal.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Global Impact Section - Light */}
			<section className="py-24 section-light">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16 animate-fade-in-up">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Global Impact
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-8"></div>
					</div>

					<div className="card-white animate-scale-in">
						<div className="p-8 lg:p-12">
							<div className="text-center mb-8">
								<div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#9327e0]/10 to-[#204d74]/10 rounded-full px-6 py-3 mb-6">
									<Globe className="w-6 h-6 text-[#9327e0]" />
									<span className="text-gray-900 font-semibold">
										Largest Annual Space Event
									</span>
								</div>
							</div>

							<p className="text-gray-700 text-lg leading-relaxed text-center">
								World Space Week is the largest annual space
								event on Earth. Each year, thousands of events
								in dozens of countries celebrate the
								contributions of space science and technology to
								the betterment of the human condition.
							</p>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default WhatIsWSW;
