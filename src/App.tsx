import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import AboutWSW from "./pages/AboutWSW";
import Events from "./pages/Events";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import AddEvent from "./pages/events/Add";
import BecomePartner from "./pages/BecomePartner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./Verification/ForgotPassword";
import ProtectedRoutes from "./ProtectedRoutes";

// About WSW Association pages
import Mission from "./pages/about-association/Mission";
// import Leadership from "./pages/about-association/Leadership";
// import Sponsors from "./pages/about-association/Sponsors";
import BecomeSponsor from "./pages/about-association/BecomeSponsor";
import Partners from "./pages/about-association/Partners";
import Positions from "./pages/about-association/Positions";
import SponsorsList from "./pages/about-association/SponsorsList";
import PartnerList from "./pages/about-association/PartnerList";
import HonoraryChair from "./pages/about-association/HonoraryChair";
import BoardDirectors from "./pages/about-association/BoardDirectors";
import BoardAdvisors from "./pages/about-association/BoardAdvisors";
import OfficersStaff from "./pages/about-association/OfficersStaff";

// About WSW pages
import WhatIsWSW from "./pages/about-wsw/WhatIsWSW";
import UNDeclaration from "./pages/about-wsw/UNDeclaration";
import KnowledgeHub from "./pages/about-wsw/KnowledgeHub";
import HoldEvent from "./pages/HoldEvent";
import EventIdeas from "./pages/about-wsw/EventIdeas";
import EducationalResources from "./pages/about-wsw/EducationalResources";
// import CurrentNationalCoordinators from "./pages/about-wsw/CurrentNationalCoordinators";
import Coordinators from "./pages/about-wsw/Coordinators";
import History from "./pages/about-wsw/History";
import PastReportsPosters from "./pages/about-wsw/PastReportsPosters";
import ThemeDetails from "./pages/about-wsw/ThemeDetails";

// Hold Event pages
import Theme from "./pages/hold-event/Theme";
import Poster from "./pages/hold-event/Poster";
import Guidelines from "./pages/hold-event/Guidelines";
import Manage from "./pages/hold-event/Manage";
import MediaKit from "./pages/hold-event/MediaKit";

// Events pages
import Map from "./pages/events/Map";
import AllEvents from "./pages/events/All";

// Media pages
import Interviews from "./pages/media/Interviews";
import News from "./pages/media/News";
import Workshops from "./pages/media/Workshops";
import ScrollToTop from "./components/ScrollToTop";
import BecomeNationalCoordinators from "./pages/about-wsw/BecomeNationalCoordinators";
import CoordinatorDetails  from "./pages/about-wsw/CoordinatorDetailsPage";
import Logos from "./pages/hold-event/Logos";
import SocialMediaKit from "./pages/hold-event/SocialMediaKit";
import BrandGuidelines from "./pages/hold-event/Brand-Guidelines";
import OtpPage from "./Verification/OtpPage";
import ConfrrmpasswordPage from "./Verification/ConfrrmpasswordPage";
import { AuthProvider } from "./context/AuthProvider";
import EventDetails from "./pages/EventDetails";
import NationalCoordinatorForm from "./components/NationalCoordinatorForm";
import Nation from "./pages/Nations";
import EventsList from "./pages/EventsList";
import MappedEvents from "./pages/MappedEvents";
import Highlights from "./pages/Highlights";
import Press from "./pages/Press";
// import CookiePopup from "./components/CookiePopup";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route path="/event-list/:year" element={<EventsList />} />
					<Route path="/" element={<Index />} />
					<Route path="/nationalcoordinatorform" element={<NationalCoordinatorForm />}/>
					<Route path="/nation/:nationId" element={<Nation />} />
					<Route path="/event/:eventId" element={<EventDetails />} />
					<Route path="/event/mappedEvents" element={<MappedEvents />} />

					{/*///  */}
					{/* About WSW Association Routes */}
					<Route path="/about-association" element={<About />} />
					<Route path="/about-association/mission" element={<Mission />}/>
					{/* <Route path="/about-association/leadership"element={<Leadership />}  /> */}
					<Route path="/about-association/leadership/honorary-chair" element={<HonoraryChair />}/>
					<Route path="/about-association/leadership/Board-Directors" element={<BoardDirectors />}/>
					<Route path="/about-association/leadership/Board-Advisors" element={<BoardAdvisors />}/>
					<Route path="/about-association/leadership/Officers-Staff" element={<OfficersStaff />}/>
					<Route path="/about-association/sponsors-list" element={<SponsorsList />}/>
					<Route path="/about-association/Become-Sponsor" element={<BecomeSponsor />}/>
					<Route path="/about-association/Donate" element={<Donate />}/>
					<Route path="/about-association/partners" element={<Partners />}/>
					<Route path="/about-association/partner-list" element={<PartnerList />}/>
					<Route path="/about-association/positions" element={<Positions />}/>

					{/* About WSW Routes */}
					<Route path="/about-wsw" element={<AboutWSW />} />
					<Route path="/about-wsw/what-is-wsw" element={<WhatIsWSW />}/>
					<Route path="/about-wsw/un-declaration"	element={<UNDeclaration />}/>
					<Route path="/about-wsw/knowledge-hub" element={<KnowledgeHub />}/>
					<Route path="/about-wsw/Hold-Event" element={<HoldEvent />}/>
					<Route path="/about-wsw/event-ideas" element={<EventIdeas />}/>
					<Route path="/about-wsw/educational-resources" element={<EducationalResources />}/>
					<Route path="/about-wsw/coordinators" element={<Coordinators />}/>
					<Route path="/about-wsw/coordinators/:id" element={<CoordinatorDetails />}/>
					<Route path="/about-wsw/Become-National-Coordinators" element={<BecomeNationalCoordinators />}/>
					<Route path="/about-wsw/history" element={<History />} />
					<Route path="/about-wsw/Past-Theme-Reports-Posters" element={<PastReportsPosters />}/>
					<Route path="/about-wsw/Past-Theme-Reports-Posters/:id" element={<ThemeDetails />} />

					{/* Hold Event Routes */}
					<Route path="/hold-event" element={<HoldEvent />} />
					<Route path="/hold-event/theme" element={<Theme />} />
					<Route path="/hold-event/poster" element={<Poster />} />
					<Route path="/hold-event/guidelines" element={<Guidelines />}/>
					<Route path="/hold-event/manage" element={<Manage />} />
					<Route path="/hold-event/media-kit" element={<MediaKit />}/>
					<Route path="/hold-event/media-kit/logos" element={<Logos />}/>
					<Route path="/hold-event/media-kit/social-media-kit" element={<SocialMediaKit />}/>
					<Route path="/hold-event/media-kit/brand-guideliness" element={<BrandGuidelines />}/>

					{/* Events Routes */}
					<Route path="/events" element={<Events />} />
                    {/* <Route path="/events/add" element={<AddEvent />} /> */}
					{/* ProtectedRoute */}
					<Route element={<ProtectedRoutes />}> <Route path="/events/add" element={<AddEvent />} /></Route>
					<Route path="/events/all" element={<AllEvents />} />
					<Route path="/events/highlights" element={<Highlights />} />
					<Route path="/events/map" element={<Map />} />
					<Route path="/events/search" element={<Events />} />

					{/* Media Routes */}
					<Route path="/media" element={<Media />} />
					<Route path="/media/interviews" element={<Interviews />} />
					<Route path="/media/news" element={<News />} />
					<Route path="/media/workshops" element={<Workshops />} />
					<Route path="/media/postcards" element={<Media />} />
					<Route path="/press" element={<Press />} />

					{/* Other Routes */}
					<Route path="/contact" element={<Contact />} />
					<Route path="/become-partner" element={<BecomePartner />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					{/* Route To be Authorized */}
					<Route path="/otppage" element={<OtpPage />} />
					{/* / / */}
					<Route
						path="/verify-password"
						element={<ConfrrmpasswordPage />}
					/>
					<Route path="/donate" element={<Donate />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</QueryClientProvider>
);

export default App;
