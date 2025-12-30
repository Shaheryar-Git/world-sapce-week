import React from "react";

import ParticlesBackground from "@/components/ParticlesBackground";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const HonoraryChair = () => {
	const pastChairs = [
		{
			name: "Eren Ozmen",
			title: "Chairwoman and Owner, Sierra Nevada Corporation,",
			image: "/Assets/eren-ozmen (1).jpg",
			achievements: ["WSW 2023 Space and Entrepreneurship"],
		},
		{
			name: "Nobu Okada",
			title: "Nobu Okada, Founder and CEO, Astroscale",
			image: "/Assets/4-1.jpg",
			achievements: ["WSW 2022 Space and Sustainability"],
		},
		{
			name: "Lisa Callahan",
			title: "Vice President and General Manager of Commercial Civil Space, Lockheed Martin Corporation,",
			image: "/Assets/3-2.jpg",
			achievements: ["WSW 2021 Women in Space"],
		},
		{
			name: "Steve Collar",
			title: "CEO, SES",
			image: "/Assets/2-4.jpg",
			achievements: ["WSW 2020 Satellites Improve Life"],
		},
	];

	return (
		<div className="min-h-screen">
			<Navigation />
			{/* HERO SECTION */}
			<section className=" overflow-hidden py-36 bg-gradient-to-br from-[#220536] to-[#1a0429] ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				  	<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							Honorary Chair
						</span>
					</h1>
					<p className="text-xl text-gray-300  mx-auto leading-relaxed">
						Each year, the Honorary Chair is a distinguished leader
						who embodies the spirit of that mission. In 2024, Peter
						Platzer, CEO of Spire Global, takes on this role,
						guiding the global celebration with a vision rooted in
						innovation, climate responsibility, and the
						transformative power of space technology.
					</p>
				</div>
			</section>

			{/* Animated Particles */}
			<ParticlesBackground scrollY={scrollY} count={200} />
			{/* VIDEO AND CONTENT SECTION */}

			<section className="py-20 bg-card/30">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						{/* Section Header */}
						<div className="text-center mb-12">
							<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
								Meet Our Honorary Chair
							</h2>
						</div>

						{/* Video and Info Section */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							{/* Video Player */}
							<div className="relative">
								<Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 ">
									<div className="aspect-video bg-gradient-hero relative group cursor-pointer">
										{/* Video placeholder - you'll need to implement proper video player */}
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
												<video
													className="w-full object-cover shadow-lg"
													src="/Assets/Peter-Platzer-Spire-1.mp4"
													controls
													autoPlay
													loop
													playsInline
												/>
											</div>
										</div>
									</div>
								</Card>
							</div>

							{/* Chair Information */}
							<div className="space-y-6">
								<div>
									<h3 className="text-3xl font-semibold text-[#9327e0] mb-2">
										Peter Platzer
									</h3>
									<div className="flex items-center ">
										<span className="text-xl text-[#9327e0] font-bold">
											CEO of Spire Global
										</span>
									</div>
									<div className="flex items-center text-muted-foreground mb-6 mt-2">
										<span className=" text-[#9327e0] font-bold">
											WSW 2024, Space & Climate Change
											Honorary Chair
										</span>
									</div>
								</div>

								<div className="prose prose-invert max-w-none">
									<p className="text-muted-foreground leading-normal font-bold">
										Peter Platzer is the CEO and co-founder
										of Spire Global, a leading provider of
										space-based data, analytics and space
										services. Prior to founding Spire in
										2012, Platzer trained at CERN and the
										Max Planck Institute before turning to
										business with the Boston Consulting
										Group in Germany, Singapore, and
										Thailand.He spent nearly a decade on Wall Street
										as a quantitative trader before leaving
										finance in 2011 to focus on
										high-frequency and high-accuracy data in
										space. He advised on space
										commercialization at NASA Ames' Space
										Portal while studying at the
										International Space University.
									</p>
								
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Past Chairs */}

			<section className="py-20 bg-background">
				<div className="container mx-auto px-4">
					<div className="max-w-7xl mx-auto">
						{/* Section Header */}
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
								Previous Honorary Chairs
							</h2>
							<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
								Celebrating the visionary leaders who have
								guided World Space Week through the years
							</p>
						</div>

						{/* Past Chairs Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{pastChairs.map((chair, index) => (
								<Card
									key={index}
									className="group hover:shadow-glow transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30"
								>
									<CardContent className="p-6">
										{/* Chair Image */}
										<div className="relative mb-6">
											<div className="aspect-square bg-gradient-hero rounded-lg overflow-hidden border border-primary/20">
												<img
													src={chair.image}
													alt={chair.name}
													className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
												/>
											</div>
										</div>

										{/* Chair Info */}
										<div className="space-y-4">
											<div>
												<h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
													{chair.name}
												</h3>
												<p className="text-sm text-muted-foreground font-medium">
													{chair.title}
												</p>
												<p className="text-xs text-muted-foreground mt-2">
													{chair.achievements}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default HonoraryChair;
