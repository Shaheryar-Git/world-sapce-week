import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  X,
  User,
  Mail,
  Phone,
  Building,
  Globe,
  Users,
  Rocket,
  Star,
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import { toast } from "sonner";
import axios from "axios";


const LOCAL_STORAGE_KEY = "wsw_events";

type EventType = {
  id?: string;
  publicContactName: string;
  publicEmail: string;
  publicPhone: string;
  organizationName: string;
  eventWebAddress: string;
  year: string;
  physicalEvent: boolean;
  eventTitle: string;
  eventDescription: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  locationName: string;
  address: string;
  city: string;
  stateProvince: string;
  country: string;
  eventType: string;
  eventColor: string;
  promotionalImage: string | null;
  expectedAttendance: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function getEventColor(eventColor: string) {
  return eventColor || "bg-blue-500";
}

export default function AllEvents() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsEvent, setDetailsEvent] = useState<EventType | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
      } else {
        setEvents([]);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to load events");
      // Fallback to localStorage
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          setEvents(JSON.parse(stored));
        } catch (e) {
          setEvents([]);
        }
      }
    }
  };

  fetchEvents();
}, []);

  const openDetailsModal = (event: EventType) => {
    setDetailsEvent(event);
    setShowDetailsModal(true);
  };

  const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-32 hero-gradient overflow-hidden">
        <div className="hero-particles">
          <div
            className="absolute inset-0 hero-gradient"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          />
          <ParticlesBackground scrollY={scrollY} count={100} /> {/* Reduced count for mobile */}
          <div className="absolute top-4 left-4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-[#9327e0]/10 rounded-full blur-md sm:blur-xl animate-pulse" />
          <div className="absolute bottom-8 right-4 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[#204d74]/10 rounded-full blur-lg sm:blur-2xl animate-pulse delay-1000" />
        </div>

        <div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity: fadeOffset, transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 glass rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 hover:bg-white/10 transition-all duration-500 group">
            <Rocket className="w-4 sm:w-5 h-4 sm:h-5 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-white text-sm sm:text-lg font-medium">Explore All Events</span>
            <Star className="w-4 sm:w-5 h-4 sm:h-5 text-[#9327e0] group-hover:-rotate-12 transition-transform duration-500" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight animate-fade-in-up">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
              World Space Week Events
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 animate-fade-in-up">
            Discover and participate in thousands of space events happening worldwide during World Space Week
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
            We Events
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.length === 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20 text-white text-center">
                <p>No events available.</p>
              </div>
            )}
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white/10 backdrop-blur-md rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-white/20"
                onClick={() => openDetailsModal(event)}
              >
                <div className="min-h-[12rem] sm:min-h-[16rem] overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
                  <div
                    className={`absolute top-0 right-0 text-xs sm:text-sm text-white px-1 sm:px-2 py-0.5 rounded-bl-lg ${event.eventColor}`}
                  >
                    {event.eventType}
                  </div>
                  {event.promotionalImage ? (
                    <img
                      src={event.promotionalImage}
                      alt={event.eventTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/60">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-2 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 truncate text-white">
                    {event.eventTitle}
                  </h3>
                  <div className="flex items-center text-xs sm:text-sm text-white/80 mb-1 sm:mb-2">
                    <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                    <span>{formatDate(event.startDate)}</span>
                    <span className="mx-0.5 sm:mx-1">-</span>
                    <span>{formatDate(event.endDate)}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-white/80 mb-1 sm:mb-2">
                    <MapPin className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                    <span className="truncate">{event.country}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                    organization: {event.organizationName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Event Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-[90%] sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 sm:p-2">
          {detailsEvent && (
            <>
              <div className="relative h-40 sm:h-64">
                <img
                  src={
                    detailsEvent.promotionalImage ||
                    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400"
                  }
                  alt={detailsEvent.eventTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-6 text-white">
                  <span
                    className={`inline-block px-1 sm:px-2 py-0.5 rounded text-xs sm:text-sm mb-1 ${
                      detailsEvent.eventColor || getEventColor(detailsEvent.eventType)
                    }`}
                  >
                    {detailsEvent.eventType}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {detailsEvent.eventTitle}
                  </h2>
                </div>
              </div>
              <div className="p-2 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="col-span-2">
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Event Details</h3>
                    <p className="mb-4 text-slate-700 text-sm sm:text-base">
                      {detailsEvent.eventDescription}
                    </p>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <User className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                        <span className="text-slate-700 text-sm sm:text-base">
                          {detailsEvent.publicContactName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                        <span className="text-slate-700 text-sm sm:text-base">
                          {detailsEvent.publicEmail}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                        <span className="text-slate-700 text-sm sm:text-base">
                          {detailsEvent.publicPhone}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                        <span className="text-slate-700 text-sm sm:text-base">
                          {detailsEvent.organizationName}
                        </span>
                      </div>
                      {detailsEvent.eventWebAddress && (
                        <div className="flex items-center">
                          <Globe className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                          <a
                            href={detailsEvent.eventWebAddress}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm sm:text-base"
                          >
                            {detailsEvent.eventWebAddress}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-2 sm:p-4">
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Event Info</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                          <div>
                            <div className="text-slate-700 text-sm sm:text-base">
                              <span>{formatDate(detailsEvent.startDate)}</span>
                              {detailsEvent.startTime && (
                                <span className="ml-1">at {detailsEvent.startTime}</span>
                              )}
                              <span> - </span>
                              <span>{formatDate(detailsEvent.endDate)}</span>
                              {detailsEvent.endTime && (
                                <span className="ml-1">at {detailsEvent.endTime}</span>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-500">
                              {detailsEvent.year}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                          <div>
                            <div className="text-slate-700 text-sm sm:text-base">
                              {detailsEvent.locationName}
                            </div>
                            {detailsEvent.physicalEvent ? (
                              <div className="text-xs sm:text-sm text-slate-500">
                                {`${detailsEvent.address}, ${detailsEvent.city}, ${detailsEvent.stateProvince}, ${detailsEvent.country}`}
                              </div>
                            ) : (
                              <div className="text-xs sm:text-sm text-slate-500">
                                Virtual Event
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                          <div className="text-slate-700 text-sm sm:text-base">
                            <span>{detailsEvent.expectedAttendance}</span> Expected Attendees
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
