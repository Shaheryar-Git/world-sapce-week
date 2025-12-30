import { useState, useEffect, useRef } from "react";
import {
	Calendar,
	Users,
	Globe,
	ArrowRight,
	Play,
	Rocket,
	Star,
	Satellite,
	Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useScroll, useTransform, motion } from "framer-motion";

const generateParticles = (count = 50) => {
	return Array.from({ length: count }).map(() => ({
		left: Math.random() * 100,
		top: Math.random() * 100,
		delay: Math.random() * 10,
		duration: 2 + Math.random() * 3,
	}));
};

const Hero = () => {
	const [currentYear] = useState(new Date().getFullYear());
	const [animatedStats, setAnimatedStats] = useState({
		events: 0,
		Sponsors: 0,
		countries: 0,
	});
	const [particles] = useState(() => generateParticles(50));
	const heroRef = useRef(null);
	const ref = useRef(null);
	const { scrollY } = useScroll();
	const parallaxOffset = useTransform(scrollY, [0, 1000], [0, 150]);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["0 1", "1 1"],
	});
	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

	useEffect(() => {
		const targetStats = {
			events: 15000,
			Sponsors: 20,
			countries: 90,
		};

		const duration = 2000;
		const steps = 60;
		const stepDuration = duration / steps;

		let currentStep = 0;
		const timer = setInterval(() => {
			currentStep++;
			const progress = currentStep / steps;

			setAnimatedStats({
				events: Math.floor(targetStats.events * progress),
				Sponsors: Math.floor(targetStats.Sponsors * progress),
				countries: Math.floor(targetStats.countries * progress),
			});

			if (currentStep >= steps) {
				clearInterval(timer);
				setAnimatedStats(targetStats);
			}
		}, stepDuration);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="relative overflow-hidden bg-[#220536]">
			{/* Hero Section */}
			<motion.section
				ref={heroRef}
				className="relative min-h-[80vh] sm:min-h-screen flex items-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut" }}
				whileInView={{ opacity: 1 }}
			>
				{/* Animated Background */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Gradient Background */}
					<div
						className="absolute inset-0 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118]"
						style={{
							transform: `translateY(${parallaxOffset}px)`,
						}}
					/>

					{/* Animated Particles */}
					<div className="absolute inset-0 pointer-events-none z-0">
						{particles.map((p, i) => (
							<div
								key={i}
								className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
								style={{
									left: `${p.left}%`,
									top: `${p.top}%`,
									animationDelay: `${p.delay}s`,
									animationDuration: `${p.duration}s`,
								}}
							/>
						))}
					</div>

					{/* Floating Elements */}
					<div className="absolute inset-0">
						<div className="absolute top-10 left-4 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 bg-[#9326E0]/10 rounded-full blur-xl animate-pulse" />
						<div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 bg-[#8c38c7]/10 rounded-full blur-xl animate-pulse delay-1000" />
						<div className="absolute bottom-16 sm:bottom-32 left-1/4 w-20 sm:w-40 h-20 sm:h-40 bg-[#9326E0]/5 rounded-full blur-2xl animate-pulse delay-500" />
					</div>
				</div>

				<div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
					<div className="max-w-7xl mx-auto text-center">
						{/* Date Badge */}
						<div className="mb-6 sm:mb-12">
							<div className="inline-flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-3 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-8 hover:bg-white/10 transition-all duration-500 group">
								<Satellite className="w-4 sm:w-5 h-4 sm:h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
								<span className="text-white text-sm sm:text-lg font-medium">
									October 4-10, {currentYear}
								</span>
								<Rocket className="w-4 sm:w-5 h-4 sm:h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
							</div>

							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
								<span className="block relative">
									World Space
									<span className="absolute -inset-1 bg-gradient-to-r from-[#9326E0]/20 to-[#8c38c7]/20 blur-xl -z-10 animate-pulse"></span>
								</span>
								<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] animate-pulse">
									Week
								</span>
							</h1>

							<div className="space-y-3 sm:space-y-4 mb-6 sm:mb-12">
								<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto animate-fade-in">
									The largest annual space event on Earth
								</p>
								<p
									className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in"
									style={{ animationDelay: "0.2s" }}
								>
									Celebrating humanity's achievements in space
									science and technology, and their
									contribution to the betterment of the human
									condition.
								</p>
							</div>

							{/* Call to Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-16">
								<Link
									to="/hold-event"
									className="w-full sm:w-auto bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white px-4 sm:px-8 py-2 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 group hover:shadow-xl hover:shadow-[#9326E0]/25 transform hover:scale-105"
								>
									<Rocket className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
									Hold an Event
									<ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
								</Link>
								<Link
									to="/events"
									className="w-full sm:w-auto border-2 border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-[#220536] px-4 sm:px-8 py-2 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 group hover:shadow-xl transform hover:scale-105"
								>
									<Play className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
									View Events
								</Link>
								<Link
									to="/donate"
									className="w-full sm:w-auto bg-gradient-to-r from-[#8c38c7] to-[#9326E0] hover:from-[#9326E0] hover:to-[#8c38c7] text-white px-4 sm:px-8 py-2 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-[#8c38c7]/25"
								>
									Donate
								</Link>
							</div>
						</div>

						{/* Statistics */}
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16"
							style={{ y: parallaxOffset }}
						>
							<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-4 sm:p-8 text-center group hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#9326E0]/10 transform hover:scale-105">
								<Calendar className="w-12 sm:w-16 h-12 sm:h-16 text-[#9326E0] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
								<div className="text-2xl sm:text-4xl font-bold text-white mb-2">
									{animatedStats.events.toLocaleString()}+
								</div>
								<div className="text-gray-300 text-sm sm:text-base font-semibold">
									Events Worldwide
								</div>
							</div>

							<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-4 sm:p-8 text-center group hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#9326E0]/10 transform hover:scale-105">
								<Handshake className="w-12 sm:w-16 h-12 sm:h-16 text-[#9326E0] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
								<div className="text-2xl sm:text-4xl font-bold text-white mb-2">
									{animatedStats.Sponsors.toLocaleString()}+
								</div>
								<div className="text-gray-300 text-sm sm:text-base font-semibold">
									Global Partners
								</div>
							</div>

							<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-4 sm:p-8 text-center group hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#9326E0]/10 transform hover:scale-105">
								<Globe className="w-12 sm:w-16 h-12 sm:h-16 text-[#9326E0] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
								<div className="text-2xl sm:text-4xl font-bold text-white mb-2">
									{animatedStats.countries}+
								</div>
								<div className="text-gray-300 text-sm sm:text-base font-semibold">
									Countries
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Video Section */}
			<section className="bg-[#1a0429] w-full py-12 sm:py-16 px-4 sm:px-6">
				<div className="max-w-7xl mx-auto">
					<video
						className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
						src="https://www.worldspaceweek.org/wp-content/uploads/WSWA-Video.mp4"
						autoPlay
						muted
						loop
						playsInline
					/>
				</div>
			</section>

			{/* About World Space Week Section */}
			<motion.section className="py-12 sm:py-20 bg-gradient-to-b from-[#1a0429] to-[#0f0118] relative">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-10 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
					<div className="absolute bottom-10 right-4 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 bg-[#8c38c7]/5 rounded-full blur-3xl" />
				</div>

				<div className="container mx-auto px-4 sm:px-6 relative z-10">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-8 sm:mb-16">
							<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
								About World Space Week
							</h2>
							<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-4 sm:mb-8"></div>
							<p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
								An international celebration of science and
								technology, and their contribution to the
								betterment of the human condition.
							</p>
						</div>

						<motion.div
							className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8"
							ref={ref}
							viewport={{ once: true }}
							style={{ scale: scaleProgress, opacity: opacityProgress }}
						>
							<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-4 sm:p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105">
								<div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-[#9326E0] to-[#8c38c7] rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
									<Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
								</div>
								<h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">
									Our Mission
								</h3>
								<p className="text-gray-300 leading-relaxed text-sm sm:text-base">
									Inspiring the next generation of space
									explorers and connecting communities
									worldwide through the wonder of space
									exploration and scientific discovery. We
									ignite curiosity and foster innovation for a
									better future beyond Earth.
								</p>
							</div>

							<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-4 sm:p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105">
								<div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-[#8c38c7] to-[#9326E0] rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
									<Globe className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
								</div>
								<h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">
									Global Impact
								</h3>
								<p className="text-gray-300 leading-relaxed text-sm sm:text-base">
									World Space Week is the largest annual space
									event on Earth, building young minds by
									educating them about space exploration and
									scientific discovery.
								</p>
							</div>

							<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-4 sm:p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105">
								<div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-[#8c38c7] to-[#9326E0] rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
									<Star className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
								</div>
								<h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">
									Space for All
								</h3>
								<p className="text-gray-300 leading-relaxed text-sm sm:text-base">
									Inspiring communities worldwide through the
									wonder of space exploration. We empower
									people to dream bigger and reach further by
									showcasing the impact of space science.
								</p>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>
		</div>
	);
};

export default Hero;