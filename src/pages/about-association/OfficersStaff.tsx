import React from 'react'
import ParticlesBackground from "@/components/ParticlesBackground";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const OfficersStaff = () => {


  	const executive = [
  {
    name: "Dennis Stone",
    title: "President and Treasurer",
    image: "/assets/1-1-1.jpg"
  },
  {
    name: "Laura Champion",
    title: "Executive Vice President",
    image: "/assets/10-3.jpg"
  },
  {
    name: "Alma Okpalefe",
    title: "Executive Director",
    image: "/assets/Alma-Bio.jpg"
  },
  {
    name: "Amy Del Prado",
    title: "Treasurer, VP of Development",
    image: "/assets/1718224214961-1.jpg"
  },
  {
    name: "Lauren Payne",
    title: "Secretary and Legal Counsel",
    image: "/assets/1-6.jpg"
  },
  {
    name: "Ilayda Edali",
    title: "Operations and Communications Manager",
    image: "/assets/3-5.jpg"
  },
  {
    name: "Deborah Faboade",
    title: "PR Coordinator",
    image: "/assets/Ricaria_Sutton-1-1.png"
  },
  {
    name: "Rebah Tanvir",
    title: "Communications Coordinator",
    image: "/assets/rebah.jpg"
  },
  {
    name: "Ricaria Jenae Sutton",
    title: "Social Media Coordinator",
    image: "/assets/deborah.jpg"
  }
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
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{executive.map((chair, index) => (
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
}

export default OfficersStaff
