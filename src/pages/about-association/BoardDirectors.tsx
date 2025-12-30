import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const BoardDirectors = () => {
	const Directors = [
		{
			name: "Stan Crow",
			title: "Stan Crow Enterprises, LLC,",
			Position: "Chair",
			image: "/Assets/stan-crow-1.jpeg",
		},
		{
			name: "Candace Johnson",
			title: "SES, Loral Teleport Europe, Europe Online, OWNSAT, VATM, GTWN",
			Position: "Vice-Chair",
			image: "/Assets/6-3.jpg",
		},
		{
			name: "Alex Soucek",
			title: "European Space Agency",
			Position: "",
			image: "/Assets/4-3.jpg",
		},
		{
			name: "Ali Asghar",
			title: "Honeywell Space",
			Position: "",
			image: "/Assets/3-4.jpg",
		},
		{
			name: "Catherine Doldirina",
			title: "D-Orbit",
			Position: "",
			image: "/Assets/1516349133731.jpeg",
		},
		{
			name: "John Reeves",
			title: "Viasat",
			Position: "",
			image: "/Assets/1539718967071-1.jpeg",
		},
		{
			name: "Maria-Antonietta Perino",
			title: "Thales Alenia Space",
			Position: "",
			image: "/Assets/2-6.jpg",
		},
		{
			name: "Masayoshi Ohashi",
			title: "JAXA",
			Position: "",
			image: "/Assets/Masayoshi.jpg",
		},
		{
			name: "Mary Walmsley",
			title: "Airbus",
			Position: "",
			image: "/Assets/mary.jpg",
		},
		{
			name: "Niklas Hedman",
			title: "UNOOSA",
			Position: "",
			image: "/Assets/Niklas.jpg",
		},
		{
			name: "Susan Murabana",
			title: "Universe Awareness & The Travelling Telescope Africa",
			Position: "",
			image: "/Assets/10-1.jpg",
		},
		{
			name: "Tracy Lamm",
			title: "Lockheed Martin ",
			Position: "",
			image: "/Assets/11-min.jpg",
		},
	];

	return (
		<div className="relative overflow-hidden bg-[#220536]">
			<Navigation />
			{/* HERO SECTION */}
			<section className=" py-36">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							WSW Association Board of Directors
						</span>
					</h1>
					<p className="text-xl text-gray-300  mx-auto leading-relaxed">
						The WSW Association Board of Directors is composed of
						visionary leaders and dedicated professionals who guide
						the strategic direction of World Space Week. Their
						expertise and commitment drive global collaboration,
						foster space education and outreach, and ensure the
						continued success of the world's largest annual space
						event.
					</p>
				</div>
			</section>

			{/* Animated Particles */}
			<ParticlesBackground scrollY={scrollY} count={200} />
			

			{/* Past Chairs */}
			<section className="py-20 bg-background">
				<div className="container mx-auto px-4">
					<div className="max-w-7xl mx-auto">
						{/* Section Header */}
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
								Board of Directors
							</h2>
							
						</div>

						{/* Past Chairs Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{Directors.map((chair, index) => (
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

export default BoardDirectors;
