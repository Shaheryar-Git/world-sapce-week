import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedEvents from "@/components/FeaturedEvents";
import EventsCallToAction from "@/components/EventsCallToAction";
import FeaturedSponsors from "@/components/FeaturedSponsors";
import Footer from "@/components/Footer";
import EventMap from "./EventMap";
import MapComponent from "./MapComponent";
import CookiePopup from "@/components/CookiePopup";

const Index = () => {
  return (
    <div className="min-h-screen mt-4">
       <CookiePopup /> 
      <Navigation />
      <Hero />
      {/* <FeaturedEvents /> */}
      {/* <EventMap/> */}
      <h1 className="text-center text-5xl font-bold text-gray-900 mb-10 mt-10">Global Events</h1>
      <MapComponent/>
      <EventsCallToAction />
      {/* <FeaturedSponsors /> */}
      <Footer />
    </div>
  );
};

export default Index;
