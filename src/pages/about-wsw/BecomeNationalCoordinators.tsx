import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	BookOpen,
	Calendar,
	FileText,
	Globe,
	HeadphonesIcon,
	Rocket,
	Sparkles,
	Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ParticlesBackground from "@/components/ParticlesBackground";
import {
	Heart,
	Megaphone,
	Camera,
	Users,
	GraduationCap,
	Mail,
	Earth,
} from "lucide-react";
import { Link } from "react-router-dom";

const BecomeNationalCoordinators = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const missionItems = [
		{
			icon: Heart,
			title: "Engage & Inspire",
			description:
				"Throughout the year, inspire entities across your nation, including space agencies, educational institutions, science museums, and the media, to partake in World Space Week. Utilize our template letter for outreach and explore event ideas to fuel creativity.",
		},
		{
			icon: Megaphone,
			title: "Promote & Unify",
			description:
				'Guide participants to incorporate the "World Space Week" name and logos in their event promotions, fostering a cohesive global identity that captivates media and public attention.',
		},
		{
			icon: Camera,
			title: "Document & Celebrate Success",
			description:
				"After World Space Week, ensure that you have collected highlight events and photos of the WSW events in your country. These contributions enrich the WSW Annual Report and celebrate our collective achievements.",
		},
	];

	const popularEvents = [
		{
			title: "Rocket Launch Demos",
			description:
				"Experience awe-inspiring activities that spark curiosity.",
			icon: <Rocket className="w-8 h-8 text-white" />,
		},
		{
			title: "Planetarium Shows",
			description: "Journey through the stars in immersive environments.",
			icon: <Earth className="w-8 h-8 text-white" />,
		},
		{
			title: "Astronomy Nights",
			description:
				"Gaze into the cosmos with guided stargazing sessions.",
			icon: <Star className="w-8 h-8 text-white" />,
		},
	];


	// const facilitationItems = [
	// 	{
	// 		icon: Users,
	// 		title: "Advise Organizations",
	// 		description:
	// 			"Help organizations integrate WSW themes into existing or planned activities for October 4-10.",
	// 	},
	// 	{
	// 		icon: GraduationCap,
	// 		title: "Encourage Education",
	// 		description:
	// 			"Encourage schools and educators to include space-themed lessons in their curriculum during WSW, providing them with free resources to ignite students' passion for space.",
	// 	},
	// 	{
	// 		icon: Mail,
	// 		title: "Spread the Message",
	// 		description:
	// 			"Reach out to as many schools and teachers as possible about WSW through websites, email, direct mail, school districts, or even the ministry of education.",
	// 	},
	// ];

	return (
		<div className="min-h-screen bg-[#220536] text-white">
			<Navigation />

			{/* Hero Section */}
			<section className="py-24 bg-gradient-to-br from-[#220536] to-[#1a0429]">
				<div className="absolute 60"></div>

				<div className="relative z-10 text-center max-w-4xl mx-auto px-4">
					<div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8">
						<FileText className="w-5 h-5 text-[#9326E0]" />
						<span className="text-white text-lg font-medium">
							National Coordinator Program
						</span>
					</div>

					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							Become a National Coordinator
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
						Empower Your Community with Space Education and
						Awareness
					</p>

					<Link to="/nationalcoordinatorform">
					<Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3 shadow-lg text-white">
						Start Your Journey
					</Button>
					</Link>
				</div>
			</section>
			{/* Animated Particles */}
			<ParticlesBackground scrollY={scrollY} count={200} />

			{/* Info Section */}
			{/* bg-[#fdfdfe] */}
			<section className="py-16 px-4 ">
				<div className="container mx-auto max-w-6xl ">
					<div className="text-center mb-12">
						<p className=" text-white text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
							As a National Coordinator for World Space Week,
							you'll play a critical role in amplifying the
							importance of space education and awareness in your
							country. Our mission extends across numerous
							nations, yet we aspire to connect with every corner
							of the globe. If your country is not listed here, we
							invite you to bring the universe closer to your
							community by becoming a WSW National Coordinator.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6 mb-16 ">
						<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#9326E0]/10">
							<div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<Globe className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-4 text-center">
								Global Reach
							</h3>
							<p className="text-gray-300 text-center mb-6">
								Connect with over 80 nations in the largest
								space celebration on Earth
							</p>
						</div>

						<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#9326E0]/10">
							<div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<Users className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-4 text-center">
								Community Impact
							</h3>
							<p className="text-gray-300 text-center mb-6">
								Inspire and engage thousands of participants in
								your nation
							</p>
						</div>

						<div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#9326E0]/10">
							<div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<Calendar className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-xl font-bold text-white mb-4 text-center">
								UN Proclaimed
							</h3>
							<p className="text-gray-300 text-center mb-6">
								Part of the official UN celebration since 1999
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-24 bg-white ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-[#204d74] mb-6">
							Your Role
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-8"></div>
						<h2 className="text-4xl font-bold mb-6 text-foreground">
							Your Role as a National Coordinator
						</h2>
						<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
							Proclaimed by the UN General Assembly in 1999, World
							Space Week (WSW) has become the largest celebration
							of space on Earth, engaging participants from over
							80 nations. As a National Coordinator, you're at the
							heart of this celebration.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
						{missionItems.map((item, index) => (
							<Card
								key={index}
								className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#9326E0]/10"
							>
								<CardHeader className="text-center">
									<div className="w-16 h-16 bg-gradient-to-br from-[#7a26c1] to-[#a259e6] rounded-full flex items-center justify-center mx-auto mb-4">
										<item.icon className="w-8 h-8 text-white" />
									</div>
									<CardTitle className="text-xl">
										{item.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-1000 text-center mb-6">
										{item.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Popular Events */}
			<section className="py-16 px-4 bg-gradient-to-b from-[#0f0118] to-[#1a0429] text-white relative">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/10 rounded-full blur-3xl" />
					<div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8c38c7]/10 rounded-full blur-3xl" />
				</div>

				<div className="container ">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold mb-6">
							Most Popular Events
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#8c38c7] mx-auto mb-6" />
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							These events have proven successful across the globe
							during World Space Week
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6 mb-16">
						{popularEvents.map((event, i) => (
							<div
								key={i}
								className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-8 hover:bg-white/10 hover:border-[#9326E0]/40 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl hover:shadow-[#9326E0]/10"
							>
								<div className="bg-gradient-to-br from-[#9326E0] to-[#8c38c7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
									{event.icon}
								</div>
								<h3 className="text-xl font-bold text-white mb-4 text-center">
									{event.title}
								</h3>
								<p className="text-gray-300 text-center mb-6">
									{event.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default BecomeNationalCoordinators;
