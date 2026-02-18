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
  Plus,
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, Variants } from "framer-motion";


const LOCAL_STORAGE_KEY = "wsw_events";

type EventType = {
  id?: string;
  publicContactName: string;
  publicEmail: string;
  publicPhone: string;
  organizationName: string;
  eventWebAddress: string;
  year: string;
  startEndType?: string;
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
  latitude?: number | null;
  longitude?: number | null;
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
  const { user } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
		if (user?.id) {
			fetchEventsByUserId();
		}
	}, [user]);

  const fetchEventsByUserId = async () => {
		if (!user?.id) return;

		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/event/user/${user.id}`,
				{ withCredentials: true },
			);

			console.log("Raw events from backend:", res.data.events);

			// Normalize to the flat shape your UI expects
			const normalizedEvents = res.data.events.map((raw: any) => ({
				id: raw._id,
				publicContactName: raw.contact?.publicContactName || "",
				publicEmail: raw.contact?.publicEmail || "",
				publicPhone: raw.contact?.publicPhone || "",
				organizationName: raw.organization?.organizationName || "",
				eventWebAddress: raw.eventInfo?.eventWebAddress || "",
				year: raw.eventInfo?.year || "",
				eventType: raw.eventInfo?.eventType || "Public Event",
				startEndType: raw.eventInfo?.startEndType || "",
				physicalEvent: raw.eventInfo?.physicalEvent ?? true,
				country: raw.location?.country || "",
				stateProvince: raw.location?.stateProvince || "",
				city: raw.location?.city || "",
				address:
					raw.location?.address?.streetAddress ||
					raw.location?.address ||
					"",
				locationName: raw.location?.locationName || "",
				latitude: raw.location?.latitude || null,
				longitude: raw.location?.longitude || null,
				startDate: raw.date?.startDate || "",
				endDate: raw.date?.endDate || "",
				startTime: raw.date?.startTime || "09:00",
				endTime: raw.date?.endTime || "17:00",
				eventTitle: raw.details?.eventTitle || "",
				eventColor: raw.details?.eventColor || "bg-blue-500",
				eventDescription: raw.details?.eventDescription || "",
				expectedAttendance: raw.details?.expectedAttendance || "",
				promotionalImage: raw.promotionalImage || null,
			}));

			console.log("Normalized events:", normalizedEvents);
			setEvents(normalizedEvents);
		} catch (err) {
			console.error("Failed to fetch user events:", err);
			
		}
	};


//    useEffect(() => {

//   fetchEvents();
// }, []);

  const openDetailsModal = (event: EventType) => {
    setDetailsEvent(event);
    setShowDetailsModal(true);
  };

  const handleDeleteEvent = async () => {
    if (!detailsEvent?.id) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/event/deleteEvent/${detailsEvent.id}`,
        { withCredentials: true },
      );

      setEvents((prev) => {
        const updatedEvents = prev.filter((ev) => ev.id !== detailsEvent.id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
        return updatedEvents;
      });

      toast.success("Event deleted successfully.");
      setShowDetailsModal(false);
      setDetailsEvent(null);
      setShowDeleteConfirm(false);
    } catch (err: any) {
      console.error("Failed to delete event:", err);
      toast.error(
        err?.response?.data?.message || "Failed to delete event",
      );
    }
  };


  const handleEditEvent = () => {
    if (!detailsEvent) return;
    setShowDetailsModal(false);
    navigate("/events/add", { state: { eventToEdit: detailsEvent, scrollToEdit: true } });
  };

  // const parallaxOffset = scrollY * 0.3;
  const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

  const filteredEvents = events.filter((event) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;

    const fieldsToSearch = [
      event.eventTitle,
      event.eventDescription,
      event.organizationName,
      event.city,
      event.country,
      event.locationName,
      event.eventType,
    ];

    return fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(query)
    );
  });

  
    const { scrollYProgress } = useScroll();
    // const parallaxOffset = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

  return (
    <div className="min-h-screen bg-[#220536]">
      <Navigation />
      {/* Hero Section */}
     <motion.section
        className="relative min-h-[70vh] flex items-center py-20 hero-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#170324]/20 to-[#170324]/20"
            // style={{ y: parallaxOffset }}
            transition={{ ease: "easeOut", duration: 1.5 }}
          />
          <ParticlesBackground scrollY={scrollY} count={250} />
          <motion.div
            className="absolute top-16 left-8 w-40 h-40 bg-[#170324]/15 rounded-full blur-2xl"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
          />
          <motion.div
            className="absolute bottom-24 right-12 w-48 h-48 bg-[#170324]/15 rounded-full blur-3xl"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ repeat: Infinity, duration: 4.5, delay: 1.5 }}
          />
        </div>
        <motion.div
          className="relative z-10 container mx-auto px-6"
          style={{ scale: scaleProgress, opacity: opacityProgress }}
        >
          <motion.div
            className="max-w-5xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9326E0] to-[#8c38c7] drop-shadow-lg">
                World Space Week Events
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Discover and participate in thousands of space events happening worldwide during World Space Week.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/events/add"
                className="bg-gradient-to-r from-[#170324] to-[#170324] hover:from-[#2a1a4d] hover:to-[#170324] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-500 flex items-center justify-center gap-3 group hover:shadow-2xl hover:shadow-[#170324]/30 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Add Your Event
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">
              My Events
            </h1>
            <div className="w-full sm:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#9327e0] focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.length === 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20 text-white text-center">
                <p>No events available.</p>
              </div>
            )}
            {events.length > 0 && filteredEvents.length === 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20 text-white text-center">
                <p>No events match your search.</p>
              </div>
            )}
            {filteredEvents.map((event) => (
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
        <button
						type="button"
						onClick={() => setShowDetailsModal(false)}
						className="absolute right-4 top-4  z-50 rounded-sm  hover:opacity-100"
					>
						<X className="h-5 w-5 text-white"  />
					</button>
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
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base sm:text-lg font-semibold">Event Details</h3>
                    </div>
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
                         <div className="flex gap-2">
                        <Button
                          size="sm"
                          // variant="outline"
                          onClick={handleEditEvent}
                        >
                          Edit Event
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 text-white hover:bg-red-700 border-red-600"
                          onClick={() => setShowDeleteConfirm(true)}
                        >
                          Delete
                        </Button>
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

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete this event?"
        description={
          <div className="space-y-1">
            <p>
              This will permanently remove{" "}
              <span className="font-semibold">
                {detailsEvent?.eventTitle || "this event"}
              </span>{" "}
              and it cannot be undone.
            </p>
            {detailsEvent?.startDate && (
              <p className="text-xs text-slate-400">
                {formatDate(detailsEvent.startDate)} •{" "}
                {detailsEvent.locationName}
              </p>
            )}
          </div>
        }
        confirmLabel="Yes, delete event"
        cancelLabel="Keep event"
        onConfirm={handleDeleteEvent}
      />
    </div>
  );
}
