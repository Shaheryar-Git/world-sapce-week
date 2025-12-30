import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Globe, Users, Building } from "lucide-react";
import { Link } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Card, CardContent } from "@/components/ui/card";
const PartnerList = () => {
	const partners = [
		{
			name: "Asteroid Day",
			logo: "/Assets/AD_LOGO-1 (1).png",
			url: "https://www.asteroidday.org",
		},
		{
			name: "Astronomers Without Borders",
			logo: "/Assets/AWB-1.png",
			url: "https://astronomerswithoutborders.org",
		},
		{
			name: "The Astronomical Society of the Pacific",
			logo: "/Assets/ASP-logo-stacked-2-C-1.png",
			url: "https://astrosociety.org",
		},
		{
			name: "ExploreMars",
			logo: "/Assets/ExM-Logo-Flare-1.jpg",
			url: "https://exploremars.org",
		},
		{
			name: "IAF",
			logo: "/Assets/Logo_IAF_latin-1.jpg",
			url: "https://iafastro.org",
		},
		{
			name: "International Observe the Moon Night",
			logo: "/Assets/observe-the-moon-night-1-1.png",
			url: "https://observethemoonnight.org",
		},
		{
			name: "Phoenix Space",
			logo: "/Assets/PhoenixSpaceLogo-1.jpg",
			url: "https://phoenix-space.com",
		},
		{
			name: "The Satellite Industry Association (SIA)",
			logo: "/Assets/Partner_SIA-1.jpg",
			url: "https://sia.org",
		},
		{
			name: "Space Foundation",
			logo: "/Assets/space_foundation_-logo-1.png",
			url: "https://spacefoundation.org",
		},
		{
			name: "Space Generation Advisory Council",
			logo: "/Assets/SGAC-logo-1.png",
			url: "https://spacegeneration.org",
		},
		{
			name: "SpaceRef",
			logo: "/Assets/space_ref-1.png",
			url: "https://spaceref.com",
		},
		{
			name: "Space for Humanity",
			logo: "/Assets/SFH-1.png",
			url: "https://spaceforhumanity.org",
		},
		{
			name: "Space in Africa",
			logo: "/Assets/Space-in-Africa-Full-1.png",
			url: "https://africanews.space",
		},
		{
			name: "SpaceWatch.Global",
			logo: "/Assets/SpaceWatch-Logo-old.png",
			url: "https://spacewatch.global",
		},
		{
			name: "The Planetary Society",
			logo: "/Assets/TPS_Blue_l-1-1.png",
			url: "https://planetary.org",
		},
		{
			name: "WIA-Europe",
			logo: "/Assets/WIA-logo-with-white-background-1.jpg",
			url: "https://wia-europe.org",
		},
		{
			name: "Yuri’s Night",
			logo: "/Assets/Logo-Shiny-YurisNight-1.png",
			url: "https://yurisnight.net",
		},
		// Regional Partners
		{
			name: "School of Astronauts",
			logo: "/Assets/Partner_LOGO_COLOR_300dpi-scaled-1.jpg",
			url: "https://schoolofastronauts.org",
		},
		{
			name: "Serbian Case for Space",
			logo: "/Assets/Serbian-Case-for-Space-logo.jpg",
			url: "https://serbianspace.rs",
		},
		{
			name: "Stellar Lab",
			logo: "/Assets/stellar-lab.jpg",
			url: "https://stellarlab.io",
		},
		{
			name: "Exploration: Cosmos to Classroom",
			logo: "/Assets/exploration.jpg",
			url: "https://cosmostoclassroom.org",
		},
	];

	return (
		<div className="relative overflow-hidden">
			<Navigation />

			{/* Hero Section */}
			<section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#204d74]">
							Our Partners
						</span>
					</h1>
					<p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
						Collaborating with leading organizations to advance
						space education
					</p>
				</div>
			</section>

			{/* Animation particles */}
			<ParticlesBackground scrollY={scrollY} count={200} />

			{/* Institutional Partners */}
			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <Building className="w-8 h-8 text-[#9326E0]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-[#204d74]">Institutional Partners</h2>
            </div>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9326E0] to-[#204d74] mx-auto"></div>
          </div> */}

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
						{partners.map((partner, index) => (
							<div
								key={index}
								className="group  flex flex-col justify-between"
							>
								{/* Image */}
								<div className="aspect-[4/3] bg-white/5 flex items-center justify-center p-6">
									<img
										src={partner.logo}
										alt={partner.name}
										className="max-h-34 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
									/>
								</div>

								{/* Content */}
								<div className="p-6 text-center space-y-4 flex flex-col justify-between grow">
									<h3 className="text-xl font-semibold group-hover:text-purple-800 transition">
										{partner.name}
									</h3>
									<a
										href={partner.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white font-semibold hover:shadow-lg hover:shadow-[#9326E0]/30 transition-all duration-300"
									>
										Visit Website{" "}
										<ExternalLink className="w-4 h-4" />
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default PartnerList;
