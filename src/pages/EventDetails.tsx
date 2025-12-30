import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

interface Event {
  _id: string;
  location: {
    address: { streetAddress: string };
    country: string;
    stateProvince: string;
    city: string;
    locationName: string;
    longitude: number | null;
    latitude: number | null;
  };
  date: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };
  details: {
    eventTitle: string;
    eventColor: string;
    eventDescription: string;
    expectedAttendance: number;
  };
  contact: {
    publicContactName: string;
    publicEmail: string;
    publicPhone: string;
  };
  organization: {
    organizationName: string;
  };
  eventInfo: {
    eventWebAddress: string;
    year: number;
    eventType: string;
    startEndType: string;
    physicalEvent: boolean;
  };
  promotionalImage: string | null;
}

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [event, setEvent] = useState<Event | null>(state?.event || null);
  const [loading, setLoading] = useState(!state?.event);
  const [error, setError] = useState<string | null>(null);

  // Fetch event by ID if not provided in state
  const fetchEventById = async () => {
    if (!event && eventId) {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getEvent/${eventId}`);
        const fetchedEvent = response.data?.data || response.data.event;
        if (!fetchedEvent) {
          throw new Error("No event data found in response");
        }
        setEvent(fetchedEvent);
        setError(null); // Clear any previous error
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          `No event found for ID ${eventId}`;
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchEventById();
  }, [eventId]);

  // Small reusable block
  const InfoBlock = ({ label, value }: { label: string; value: string | number }) => (
    <div>
      <p className="text-sm font-semibold text-gray-300">{label}</p>
      <p className="mt-1 text-white/90 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
        {value || "Not Specified"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#2a1a4d]">
      <Navigation/>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9327e0]/10 to-[#204d74]/10 opacity-30"></div>

        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Loading Event...</h2>
                  <p className="text-gray-200 mb-6">Please wait while we fetch the event details.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : !event ? (
          <div className="min-h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
                  <p className="text-gray-200 mb-6">{error || "The requested event could not be found."}</p>
                  <Button
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="bg-transparent border-[#9327e0] text-white hover:bg-[#9327e0] hover:text-white transition-all duration-300"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Return to Overview
                  </Button>
                  <Button
                    onClick={fetchEventById}
                    variant="outline"
                    className="bg-transparent border-[#9327e0] text-white hover:bg-[#9327e0] hover:text-white transition-all duration-300 ml-2"
                  >
                    Retry
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          <div className="container mx-auto px-6 py-12 relative">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate(`/event-list/${event.eventInfo.year}`)}
                className="mb-6 text-white hover:bg-white/10 hover:text-[#9327e0] transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to {event.eventInfo.year} Events
              </Button>

              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74] drop-shadow-lg">
                  {event.details.eventTitle}
                </h1>
                <Badge
                  variant="secondary"
                  className="text-lg px-4 py-2 bg-white/10 border border-white/30 text-white"
                >
                  {event.eventInfo.year}
                </Badge>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 lg:grid-cols-2"
            >
              {/* Basic Information */}
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-[#9327e0]" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div variants={itemVariants} className="grid gap-4">
                    <InfoBlock label="Event Name" value={event.details.eventTitle} />
                    <div className="grid grid-cols-2 gap-4">
                      <InfoBlock label="Country" value={event.location.country} />
                      <InfoBlock label="State/Province" value={event.location.stateProvince} />
                    </div>
                    <InfoBlock label="City" value={event.location.city} />
                    <InfoBlock label="Venue" value={event.location.locationName} />
                    <div>
                      <p className="text-sm font-semibold text-gray-300">Description</p>
                      <p className="mt-1 text-white/90 bg-white/5 border border-white/10 rounded-xl px-4 py-3 leading-relaxed">
                        {event.details.eventDescription || "No description available"}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Event Details */}
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <Users className="h-6 w-6 text-[#9327e0]" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div variants={itemVariants} className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <InfoBlock label="Start Date" value={event.date.startDate} />
                      <InfoBlock label="End Date" value={event.date.endDate} />
                    </div>
                    <InfoBlock label="Organizer" value={event.organization.organizationName} />
                    <InfoBlock label="Event Type" value={event.eventInfo.eventType} />
                    <InfoBlock label="Expected Attendance" value={event.details.expectedAttendance} />

                    <div>
                      <p className="text-sm font-semibold text-gray-300">Physical Event</p>
                      <div className="mt-2">
                        <Badge
                          variant={event.eventInfo.physicalEvent ? "default" : "secondary"}
                          className={event.eventInfo.physicalEvent ? "bg-[#9327e0]/20 text-[#9327e0] border-[#9327e0]/50" : "bg-gray-600 text-gray-200 border-gray-500"}
                        >
                          {event.eventInfo.physicalEvent ? "Yes" : "Virtual"}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#9327e0]" />
                        Location Map
                      </p>
                      <div className="mt-2">
                        {event.eventInfo.physicalEvent && event.location.latitude !== null && event.location.longitude !== null ? (
                          <div className="h-[300px] rounded-xl overflow-hidden border border-white/10">
                            <MapContainer
                              center={[event.location.latitude, event.location.longitude]}
                              zoom={13}
                              style={{ height: "100%", width: "100%" }}
                            >
                              <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              />
                              <Marker position={[event.location.latitude, event.location.longitude]}>
                                <Popup>
                                  <strong>{event.details.eventTitle}</strong>
                                  <br />
                                  {event.location.locationName || "Venue not specified"}
                                </Popup>
                              </Marker>
                            </MapContainer>
                          </div>
                        ) : (
                          <p className="text-gray-200">Map not available</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <Globe className="h-6 w-6 text-[#9327e0]" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
                    <InfoBlock label="Contact Email" value={event.contact.publicEmail} />
                    <div>
                      <p className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-[#9327e0]" />
                        Website
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-white/90 bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex-1 truncate">
                          {event.eventInfo.eventWebAddress || "Not Specified"}
                        </p>
                        {event.eventInfo.eventWebAddress && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(event.eventInfo.eventWebAddress, "_blank")}
                            className="bg-transparent border-[#9327e0] text-white hover:bg-[#9327e0] hover:text-white transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default EventDetail;