import React from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BoardAdvisors = () => {
	const Advisors = [
		{ name: "Eren Ozmen" },
		{ name: "Nobu Okada" },
		{ name: "Lisa Callahan" },
		{ name: "Steve Collar" },
		{ name: "Ade Abiodun" },
		{ name: "Timiebi Aganaba-Jeanty" },
		{ name: "Ali Al-Mashat" },
		{ name: "Buzz Aldrin" },
		{ name: "Oleg Alifanov" },
		{ name: "Sergio Camacho" },
		{ name: "Sarah Cruddas" },
		{ name: "Jean-Baptiste Desbois" },
		{ name: "Kerrie Dougherty" },
		{ name: "Art Dula" },
		{ name: "Tom Hanks" },
		{ name: "Candace Johnson" },
		{ name: "Michel Laffaiteur" },
		{ name: "Jean-Yves Le Gall" },
		{ name: "Li Guoping" },
		{ name: "Agnieszka Lukaszczyk" },
		{ name: "Victoria Maiorova" },
		{ name: "Francisco Javier Mendieta" },
		{ name: "Amer Nadeem" },
		{ name: "Bill Nye" },
		{ name: "Misuzu Onuki" },
		{ name: "Marius-Ioan Piso" },
		{ name: "Dorin-Dumitru Prunariu" },
		{ name: "F. R. Sarker" },
		{ name: "Kaori Sasaki" },
		{ name: "Courtney Stadd" },
		{ name: "Randy Sweet" },
		{ name: "Fruzsina Tari" },
		{ name: "Bee Thakore" },
		{ name: "Zhang Yao" },
	];

	return (
		<div className="relative overflow-hidden bg-[#220536]">
			<Navigation />
			{/* HERO SECTION */}
			<section className=" py-36">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7]">
							Officers and Staff
						</span>
					</h1>
					<p className="text-xl text-gray-300  mx-auto leading-relaxed">
						The Officers and Staff of the WSW Association play a
						vital role in the organization’s day-to-day operations
						and long-term vision. From executive leadership to
						communications and outreach, their dedication ensures
						the smooth coordination of World Space Week events
						around the globe. Their passion for space advocacy and
						education drives meaningful engagement with diverse
						communities and empowers the next generation of space
						leaders.
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
								Executive Council and WSW Coordinators
							</h2>
						</div>

						{/* Past Chairs Grid */}
						<section className="py-24 bg-gray-50">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="mb-16">
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
										{Advisors.map((coordinator, index) => (
											<div
												key={index}
												className="min-h-[100px] bg-[#2f0a47] text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-[#3a1057]"
											>
												<h4 className="text-center mt-5 text-lg font-semibold text-[#d88eff] mb-2 group-hover:text-white transition">
													{coordinator.name}
												</h4>
											</div>
										))}
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default BoardAdvisors;
