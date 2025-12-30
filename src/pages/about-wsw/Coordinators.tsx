
import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Globe, Mail, MapPin, Search, Users } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import 'country-flag-icons/react/3x2';


const Coordinators = () => {
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  const coordinators = [
  { country: "United States", name: "Richard Cooper", role: "Space Foundation", email: "rcooper@spacefoundation.org", region: "North America", code: "US", name2: "Robert S. Katz", Role2: "World Innovation Network", email2: "rsk@win.ngo" },
  { country: "United Kingdom", name: "Simon Feast", role: "British Interplanetary Society", email: "worldspaceweek@bis-space.com", region: "Europe", code: "GB", email2: "None" },
  { country: "Germany", name: "Dr. Klaus Mueller", role: "None", email: "germany@worldspaceweek.org", region: "Europe", code: "DE" },
  { country: "France", name: "J.B. JB Desbois", role: "la Cite de l'espace", email: "jb.desbois@semeccel.com", region: "Europe", code: "FR" },
  { country: "Japan", name: "Dr. Hiroshi Tanaka",role:"None", email: "japan@worldspaceweek.org", region: "Asia", code: "JP" },
  { country: "Canada", name: "Dr. Michael Chen",role:"None", email: "canada@worldspaceweek.org", region: "North America", code: "CA" },
  { country: "Brazil", name: "Valmir M. de Morais", role: "Nucleo de Astronomia", email: "valmirmmorais@yahoo.com.br", region: "South America", code: "BR" },
  { country: "India", name: "Dr. Srimathy Kesan", role: "Space Kidz India", email: "ksrimathy@spacekidzindia.in", region: "Asia", code: "IN" },


  // 🌍 Africa
  { country: "South Africa", name: "Sean Jacobs", role: "Future African Space", email: "sean@fasesa.com", region: "Africa", code: "ZA" },
  { country: "Algeria", name: "Hichem Guergouri", role:"Research Unit in Scientific Mediation & Culture", email: "guergouri.hichem.92@gmail.com", region: "Africa", code: "DZ" },
  { country: "Angola", name: "Dr. Lumonansoni Andr",role:"National Space Program Management Office", email: "None", region: "Africa", code: "AO" },
  { country: "Botswana", name: "Nonofo Mogopodi",role:"Stream International", email: " nmogopodi@yahoo.com", region: "Africa", code: "BW" },
  { country: "Ghana", name: "Dunamis Chukwuemeka Uzochukwu", email: "uzochukwudunamis@gmail.com", region: "Africa", code: "GH" },
  { country: "Kenya", name: "Charles Mwangi",role:"Director, Space Applications and Utilization Directorate", email: "charles.mwangi@ksa.go.ke", region: "Africa", code: "KE" },
  { country: "Namibia", name: "Benyamen Nathanael",role:"National Commission on Research, Science and Technology", email: "bnathanael@ncrst.na", region: "Africa", code: "NA" },
  { country: "Nigeria", name: "Florence Ibrahim", role:"SHIELD Girls2Women Initiative", email: "floibrahimm@gmail.com", region: "Africa", code: "NG" },
  { country: "Sudan", name: "Moutaman Mirghani",role:"ISRA", email: " moutaman.mirghani@ncr.gov.sd ", region: "Africa", code: "SD" },
  { country: "Tanzania", name: "Shama Kheraj",role:"UpStudio Africa", email: "shama@upstudio.africa", region: "Africa", code: "TZ" },
  { country: "Zimbabwe", name: "Timothy Kuhamba", role:"Zimbabwe National Geospatial and Space Agency", email: "kuhamba@yahoo.com", region: "Africa", code: "ZW" },
  { country: "Reunion", name: "Willy LAMEYER", role:"Reunion Island Space Initiative", email: "willy.lameyer@ac-reunion.fr", region: "Africa", code: "RE" },

  // 🌏 Asia
  { country: "Afghanistan", name: "Amena Karimyan",role:"Afghanistan Astronomical Private Organization", email: "Amena.karimyan5566@gmail.com", region: "Asia", code: "AF" },
  { country: "Azerbaijan", name: "Natavan Hasanova",role:"Azercosmos Space Agency of the Republic of Azerbaijan", email: " nata1.hasanova@gmail.com", region: "Asia", code: "AZ" },
  { country: "Bahrain", name: "Fatema Mohammed Alhammadi",role:"National Space Science Agency of Bahrain", email: "Fatema.alhammadi@nssa.gov.bh", region: "Asia", code: "BH" },
  { country: "Bangladesh", name: "Reza Sarker",role:"Bangladesh Astronomical Society" ,email: " lrzsarker@gmail.com", region: "Asia", code: "BD" },
  { country: "Hong Kong, China", name: "Li Shui Hong Dennis",role:"LiPC Space Resources Alliances Education and Culture Center", email: "dli@lipchk.org", region: "Asia", code: "HK" },
  { country: "Indonesia", name: "Achmad Zainur Rozzykin",role:"Atmospheric and Planetary Science Department", email: "achmad.rozzykin@sap.itera.ac.id ", region: "Asia", code: "ID" },
  { country: "Iran", name: "Saeed Jafari",role:"World Space Week Iran Coordinating Committee", email: " s.jafari@worldspaceweek.ir", region: "Asia", code: "IR" },
  { country: "Iraq", name: "Eyad Khailany",role:"freelance astronomer", email: "eyadkh2011@hotmail.com", region: "Asia", code: "IQ" },
  { country: "Israel", name: "Tal Inbar",role:"D-Mars, International Space Center", email: "inbarspace@gmail.com", region: "Asia", code: "IL" },
  { country: "Korea, Republic of", name: "Sang Kee Suh",role:"Young Astronauts Korea", email:"kate@yak.or.kr", region: "Asia", code: "KR" },
  { country: "Kuwait", name: "Lama AlOraiman",role:"BluDot", email: " lamaaloraiman@gmail.com", region: "Asia", code: "KW" },
  { country: "Lebanon", name: "Elie Abou Assi",role:"None", email: "elie.abouassi@ul.edu.lb", region: "Asia", code: "LB" },
  { country: "Malaysia", name: "Rooban Arumugam",role:"Inspire Malaysia", email: "rooban.arumugam@gmail.com ", region: "Asia", code: "MY" },
  { country: "Maldives", name: "Moosa Samaau",role:"Space Cat Education", email: "ms@spacecat.mv", region: "Asia", code: "MV" },
  { country: "Mongolia", name: "Munkhtulga Dashzeveg",role:"Dudu Children's Museum", email: "intl@dudu.mn", region: "Asia", code: "MN" },
  { country: "Nepal", name: "Manisha Dwa",role:"Nepal Astronomical Society", email: "manisha.dwa@gmail.com", region: "Asia", code: "NP" },
  { country: "Oman", name: "Ghayadah Al Jabri,",role:"Oman Astronomical Society", email: "ghaidaaljaljabriii@gmail.com", region: "Asia", code: "OM" },
  { country: "Pakistan", name: "Aftab Ahmad Khan Lughmani",role:"Secretary SUPARCO", email: "secretary@suparco.gov.pk", region: "Asia", code: "PK" },
  { country: "Philippines", name: "Rogel Mari D. Sese",role:"Ateneo de Davao University", email: "rmdsese@addu.edu.ph", region: "Asia", code: "PH" },
  { country: "Saudi Arabia", name: "Mohammed Saeed Barziq",role:"Supervisor in the Ministry of Education", email: "alailmi2008@gmail.com", region: "Asia", code: "SA" },
  { country: "Singapore", name: "Aditi Koul",role:"The Physics Society", email: "thephysicsociety@gmail.com", region: "Asia", code: "SG" },
  { country: "Syrian Arab Republic", name: "Dr. Muhammed Alassiry",role:"Syrian Astronomical Association", email: "syastronomy2005@gmail.com", region: "Asia", code: "SY" },
  { country: "Thailand", name: "Peerarust Siriamphan",role:"SPACE GENERATION ADVISORY COUNCIL", email: "peerarust.siriamphan@spacegeneration.org NC", region: "Asia", code: "TH" },
  { country: "Turkiye", name: "Halit Mirahmetoglu",role:"GUHEM Gokmen Space and Aviation Training Center", email: "halit.mirahmetoglu@guhem.org.tr", region: "Asia", code: "TR" },
  { country: "United Arab Emirates", name: "Salem Khalifa Al Marar",role:"UAE Space Agency", email: "S.almarar@space.gov.ae", region: "Asia", code: "AE" },
  { country: "Uzbekistan", name: "Javlonbek Madatov",role:"Uzbekspace Agency", email: " j.madatov@uzspace.uz", region: "Asia", code: "UZ" },

  // 🌍 Europe
  { country: "Belarus", name: "Alexei Belotserkovsky",role:"The National Academy of Sciences of Belarus", email: "ncp4space.by@gmail.com", region: "Europe", code: "BY" },
  { country: "Bosnia and Herzegovina", name: "Amna Dervisagic",role:"physics teacher", email: "amnadervisagic77@gmail.com", region: "Europe", code: "BA" },
  { country: "Bulgaria", name: "Veselka Radeva",role:"Naval Planetarium, Naval Academy, Bulgaria", email: "veselka.radeva@gmail.com", region: "Europe", code: "BG" },
  { country: "Croatia", name: "Danko Kocis",role:"Astronomy society", email: "ured@worldspaceweek.hr", region: "Europe", code: "HR" },
  { country: "Cyprus", name: "George Troullias",role:"Kition Planetarium & Observatory",email: "planetarium@cytanet.com.cy", region: "Europe", code: "CY" },
  { country: "Greece", name: "Maria Polychrou",role:"English Drama Microschool", email: " microschooklamaria@gmail.com ", region: "Europe", code: "GR" },
  { country: "Hungary", name: "Laszlo Bacsardi",role:"Hungarian Astronautical Society", email: "bacsardi@mant.hu", region: "Europe", code: "HU" },
  { country: "Ireland", name: "Rob O' Sullivan",role:"MTU Blackrock Castle Observatory", email: " rob.osullivan@bco.ie", region: "Europe", code: "IE" },
  { country: "Macedonia", name: "Marina. Tanevska",role:"Keitaro Inc.", email: " marina.tanevska@gmail.com ", region: "Europe", code: "MK" },
  { country: "Montenegro", name: "Nikola Perovic",role:"Montenegro space research organization", email: "nikola@spaceresearch.me", region: "Europe", code: "ME" },
  { country: "Poland", name: "Adam Ustynowicz",role:"Spaceweek Poland, Committee on Space Research", email: "office@worldspaceweek.org.pl ", region: "Europe", code: "PL" },
  { country: "Portugal", name: "Cláudio Gomes",role:"Centro de Física do Porto", email: " claudiogomesspace@gmail.com ", region: "Europe", code: "PT" },
  { country: "Romania", name: "Marius-Ioan Piso",role:"Romanian Space Agency", email: "marius.piso@elitemail.org", region: "Europe", code: "RO" },
  { country: "Russia", name: "Victoria Mayorova",role:"Bauman Moscow State Technical University", email: " victoria.mayorova@gmail.com ", region: "Europe", code: "RU" },
  { country: "Serbia", name: "Zoran Tomić",role:"Astronomical Society Eureka Kruševac", email: "Teurekakutak@gmail.comBD", region: "Europe", code: "RS" },
  { country: "Spain", name: "Maria Castells",role:"KIM Barcelona", email: " mcastells@kimbcn.org", region: "Europe", code: "ES" },
  { country: "Sweden", name: "Nikolaos DivinisD",role:"Ensyntropy", email: " ndivinis@ensyntropyedu.com", region: "Europe", code: "SE" },
  { country: "Ukraine", name: "Liudmyla Bashtova",role:"S. Korolev Space Museum", email: "Iyudm.bash@gmail.com", region: "Europe", code: "UA" },

  // 🌎 North America
  { country: "Costa Rica", name: "Mileyca Oporta",role:"Electronic Engineer", email: " mileycaop@gmail.com", region: "North America", code: "CR" },
  { country: "Dominican Republic", name: "Edwin A. Sánchez Camilo",role:"Asociación Aeroespacial Dominicana", email: "edwinsanchez@gmail.com", region: "North America", code: "DO" },
  { country: "Guatemala", name: "Alejandra Barrientos",role:"Asociacion Guatemalteca de Ingenieria y Ciencias Espaciales", email: " bar17336@uvg.edu.gt", region: "North America", code: "GT" },
  { country: "Mexico", name: "Mario Arreola-Santander",role:"AEM", email: "arreola.mario@aem.gob.mx", region: "North America", code: "MX" },

  // 🌎 South America
  { country: "Argentina", name: "Gabriel Caballero",role:"The Mars Society Argentina", email: "gabriel.c@argentina.marssociety.org ", region: "South America", code: "AR" },
  { country: "Colombia", name: "Ivan Luna Castro",role:"Presidencia de la Republica", email: "ivanluna@presidencia.gov.co", region: "South America", code: "CO" },
  { country: "Ecuador", name: "María Paula Urueña",role:"Astralintu", email: " mapaula.uruena@astralintu.com", region: "South America", code: "EC" },
  { country: "Paraguay", name: "Alejandro Roman",role:"Paraguayan Space Agency", email: "romanalejandro2@gmail.com", region: "South America", code: "PY" },
  { country: "Peru", name: "Paola Wong", role:"Mechatronic Engineering Engitronic", email: "pwonghidalgo@gmail.com", region: "South America", code: "PE" },

  // 🌏 Oceania
   { country: "Australia", name: "Kavanna Trewavas", role: "iLAuNCH Trailblazer", email: "kavanna@live.com", region: "Oceania", code: "AU" },
  { country: "New Zealand", name: "Haritina Mogosanu",role:"New Zealand Astrobiology Network", email: "haritina@astrobiology.nz", region: "Oceania", code: "NZ" }
];


const demofilter = coordinators.filter((coordinator)=> coordinator.country.toLowerCase().includes(searchTerm.toLowerCase()))
const namefilter = coordinators.filter((coordinator)=> coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()))

console.log("demofilter...",demofilter);
console.log("namefilter...",namefilter);



  const filteredCoordinators = coordinators.filter(coordinator =>
    coordinator.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coordinator.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  const regions = [...new Set(coordinators.map(c => c.region))];

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118]"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          />
          
         {/* Animated Particles */}
					<ParticlesBackground scrollY={scrollY} count={200} />

          <div className="absolute top-20 left-10 w-32 h-32 bg-[#9326E0]/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-[#204d74]/10 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
        
        <div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            opacity: fadeOffset,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-[#9326E0]/30 rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
            <Globe className="w-5 h-5 text-[#9326E0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-lg font-medium">National Coordinators</span>
            <Users className="w-5 h-5 text-[#9326E0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#204d74] animate-pulse">
              National Coordinators
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Connect with World Space Week coordinators around the globe
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by country, name, or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9326E0] focus:border-transparent text-lg "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coordinators Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regions.map((region, regionIndex) => {
            const regionCoordinators = filteredCoordinators.filter(c => c.region === region);
            if (regionCoordinators.length === 0) return null;

            return (
				<div key={regionIndex} className="mb-16">
					<h2 className="text-3xl font-bold text-[#204d74] mb-8 text-center">
						{region}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{regionCoordinators.map((coordinator, index) => (
							<div
								key={index}
								className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
							>
								<div className="flex items-center mb-6">
									<div className="w-16 h-16  rounded-full  mr-4 ">
										<img
											src={`https://flagsapi.com/${coordinator.code}/flat/64.png`}
											alt={`${coordinator.country} flag`}
											className="w-full h-full object-cover rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
										/>
									</div>
									<div>
										<h3 className="text-xl font-bold text-[#204d74]">
											{coordinator.country}
										</h3>
										<p className="text-gray-600">
											{coordinator.region}
										</p>
									</div>
								</div>
								<h4 className="text-2xl font-bold text-[#204d74]">
									Info :
								</h4>
								<h4 className="text-lg font-semibold text-[#9326E0] mb-2">
									Name: {coordinator.name}
								</h4>
								<h4 className="text-md font-semibold text-[#9326E0] mb-2">
									Role: {coordinator.role}
								</h4>
								<div className="flex items-center text-gray-600">
									<Mail className="w-4 h-4 mr-2" />
									<a
										href={`mailto:${coordinator.email}`}
										className="hover:text-[#9326E0] transition-colors duration-200"
									>
										{coordinator.email}
									</a>
								</div>
								<h4 className="text-lg font-semibold text-[#9326E0] mb-2">
									{coordinator.name2}
								</h4>
							</div>
						))}
					</div>
				</div>
			);
          })}
          <span className="fi fi-gr"></span> <span className="fi fi-gr fis"></span>
        </div>
      </section>

      {/* Become Coordinator CTA */}
      <section className="py-24 bg-gradient-to-b from-[#0f0118] to-[#1a0429] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#9326E0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#204d74]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Become a National Coordinator</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our global network of space education advocates and help organize World Space Week events in your country.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lead Events</h3>
              <p className="text-gray-300">Coordinate and promote World Space Week activities in your country</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-[#204d74]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#204d74] to-[#9326E0] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Network</h3>
              <p className="text-gray-300">Connect with coordinators worldwide and share best practices</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-[#9326E0]/20 rounded-2xl p-6">
              <div className="bg-gradient-to-br from-[#9326E0] to-[#204d74] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Local Impact</h3>
              <p className="text-gray-300">Make a difference in space education within your community</p>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-[#9326E0] to-[#204d74] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform hover:scale-105">
            Apply to Become a Coordinator
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Coordinators;
