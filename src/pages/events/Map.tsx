import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
	MapPin,
	Globe,
	Users,
	Calendar,
	Filter,
	Search,
	Rocket,
	Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapComponent from "../MapComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Map = () => {
	const [scrollY, setScrollY] = useState(0);
	const mapRef = useRef(null);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		// Handle scroll for parallax effect
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		// Initialize Leaflet map

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, []);

	const parallaxOffset = scrollY * 0.3;
	const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

	// Countries list (example data)
	const countries = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"Andorra",
		"Angola",
		"Antigua and Barbuda",
		"Argentina",
		"Armenia",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bhutan",
		"Bolivia",
		"Bosnia and Herzegovina",
		"Botswana",
		"Brazil",
		"Brunei",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Cabo Verde",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Central African Republic",
		"Chad",
		"Chile",
		"China",
		"Colombia",
		"Comoros",
		"Congo (Congo-Brazzaville)",
		"Costa Rica",
		"Croatia",
		"Cuba",
		"Cyprus",
		"Czechia (Czech Republic)",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"East Timor (Timor-Leste)",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Eswatini",
		"Ethiopia",
		"Fiji",
		"Finland",
		"France",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Greece",
		"Grenada",
		"Guatemala",
		"Guinea",
		"Guinea-Bissau",
		"Guyana",
		"Haiti",
		"Honduras",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Korea, North",
		"Korea, South",
		"Kosovo",
		"Kuwait",
		"Kyrgyzstan",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Marshall Islands",
		"Mauritania",
		"Mauritius",
		"Mexico",
		"Micronesia",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Morocco",
		"Mozambique",
		"Myanmar (Burma)",
		"Namibia",
		"Nauru",
		"Nepal",
		"Netherlands",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"North Macedonia",
		"Norway",
		"Oman",
		"Pakistan",
		"Palau",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Poland",
		"Portugal",
		"Qatar",
		"Romania",
		"Russia",
		"Rwanda",
		"Saint Kitts and Nevis",
		"Saint Lucia",
		"Saint Vincent and the Grenadines",
		"Samoa",
		"San Marino",
		"Sao Tome and Principe",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"South Sudan",
		"Spain",
		"Sri Lanka",
		"Sudan",
		"Suriname",
		"Sweden",
		"Switzerland",
		"Syria",
		"Taiwan",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Togo",
		"Tonga",
		"Trinidad and Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Tuvalu",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"United Kingdom",
		"United States",
		"Uruguay",
		"Uzbekistan",
		"Vanuatu",
		"Vatican City",
		"Venezuela",
		"Vietnam",
		"Yemen",
		"Zambia",
		"Zimbabwe",
	];

	// Filter countries based on search term
	const filteredCountries = countries.filter((country) =>
		country.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handlesubmit = async (countryName: string) => {
		try {
			console.error(null); // Reset error state
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/events/${encodeURIComponent(
					countryName
				)}`
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to fetch events");
			}

			// Adjust based on actual API response structure
			const events = data?.data?.events || data?.events || [];

			console.log(
				`Events for ${countryName}:`,
				events,
				"Coordinators : ",
				data
			);

			// Navigate to nation page with country name and events in state
			navigate(`/nation/${encodeURIComponent(countryName)}`, {
				state: { countryName: countryName, events: data.events },
			});
		} catch (error) {
			console.error(`Error fetching events for ${countryName}:`, error);
			console.error(error.message || "Error fetching events");
			toast.error("No Events Found");
		}
	};

	return (
		<div className="min-h-screen bg-[#220536]">
			<Navigation />

			{/* Hero Section - Dark */}
			<section className="relative py-16 sm:py-24 md:py-32 hero-gradient overflow-hidden">
				<div className="hero-particles">
					<div
						className="absolute inset-0 hero-gradient"
						style={{ transform: `translateY(${parallaxOffset}px)` }}
					/>

					<ParticlesBackground scrollY={scrollY} count={200} />

					<div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-[#9327e0]/10 rounded-full blur-xl animate-pulse" />
					<div className="absolute bottom-16 sm:bottom-32 right-10 sm:right-20 w-32 sm:w-40 h-32 sm:h-40 bg-[#204d74]/10 rounded-full blur-2xl animate-pulse delay-1000" />
				</div>

				<div
					className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
					style={{
						opacity: fadeOffset,
						transform: `translateY(${scrollY * 0.1}px)`,
					}}
				>
					<div className="inline-flex items-center gap-3 glass rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 hover:bg-white/10 transition-all duration-500 group">
						<Rocket className="w-4 sm:w-5 h-4 sm:h-5 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
						<span className="text-white text-base sm:text-lg font-medium">
							Global Events
						</span>
						<Star className="w-4 sm:w-5 h-4 sm:h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
					</div>

					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight animate-fade-in-up">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
							Events Map
						</span>
					</h1>
					<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 animate-fade-in-up">
						Explore World Space Week events happening around the
						globe
					</p>

					<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-scale-in">
						<button className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
							<Search className="w-4 sm:w-5 h-4 sm:h-5 mr-2 inline-block" />
							Search Events
						</button>
						<button className="btn-secondary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
							<Filter className="w-4 sm:w-5 h-4 sm:h-5 mr-2 inline-block" />
							Filter by Region
						</button>
					</div>
				</div>
			</section>

			{/* Map Section - Light */}
			<section className="py-16 sm:py-24 section-light">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
						<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
							Interactive World Map
						</h2>
						<div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#9327e0] to-[#204d74] mx-auto mb-6 sm:mb-8"></div>
						<p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
							Click on any region to explore World Space Week
							events in that area
						</p>
					</div>

					<MapComponent />

					{/* Countries List with Search Filter */}
					<div className="mt-12">
						<div className="relative mb-6">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Search countries..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-[#9327e0]/30 rounded-lg bg-white/5 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9327e0] transition-all duration-300"
							/>
						</div>
						<h4 className="text-2xl sm:text-3xl md:text-6xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
							National List
						</h4>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{filteredCountries.map((country) => (
								<div
									key={country}
									className="bg-white/10 border border-[#9327e0]/20 rounded-lg p-4 hover:bg-[#9327e0]/20 transition-all duration-300 cursor-pointer"
									onClick={() => {
										handlesubmit(country);
									}}
								>
									<h3 className="text-black font-medium">
										{country}
									</h3>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Map;
