import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import moment from "moment";



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

const EventsList = () => {
  const { year } = useParams<{ year: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(state?.events || []);
  const [loading, setLoading] = useState(!state?.events);
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 25; // Number of events per page

  // Calculate total pages
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  // Get events for the current page
  const indexOfLastEvent = currentPage * EVENTS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - EVENTS_PER_PAGE;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Fetch events if not provided in state
  const fetchEvents = async () => {
    if (!events.length && year) {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/${year}`);
        const fetchedEvents = response.data?.data || [];
        setEvents(fetchedEvents);
        console.log("response..", fetchedEvents);
      } catch (error: any) {
        console.error(`Error fetching events for year ${year}:`, error);
        toast.error(
          error.response?.data?.message ||
            error.message ||
            `No events found for year ${year}`
        );
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  },[]);

  const handleEventClick = async (eventId: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getEvent/${eventId}`);
      const event = response.data?.data;
      console.log("event", event);
      navigate(`/event/${eventId}`, {
        state: { event },
      });
    } catch (error) {
      console.error(`Error fetching event for ID ${eventId}:`, error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          `Failed to fetch event details for ID ${eventId}`
      );
    }
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#170324] to-[#2a1a4d]">
      <Navigation/>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#170324]/10 to-[#170324]/10 opacity-30"></div>
        <div className="container mx-auto px-6 py-12 relative">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-6 text-white hover:bg-white/10 hover:text-[#170324] transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Overview
            </Button>

            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-[#170324] to-[#170324] drop-shadow-lg">
                Space Events {year || "Unknown"}
              </h1>
              <Badge
                variant="secondary"
                className="text-lg px-4 py-2 bg-white/10 border border-white/30 text-white"
              >
                {events.length} Events
              </Badge>
            </div>

            <p className="text-gray-200 text-lg max-w-2xl leading-relaxed">
              Explore all the amazing space events happening in {year || "Unknown"}. Click on "Details" to learn more about each event.
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white">Events for {year || "Unknown"}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-white text-lg">Loading events...</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b border-gray-600 bg-white/5">
                          <th className="text-left py-4 px-6 font-semibold text-white">Country</th>
                          <th className="text-left py-4 px-6 font-semibold text-white">State/Province</th>
                          <th className="text-left py-4 px-6 font-semibold text-white">City</th>
                          <th className="text-left py-4 px-6 font-semibold text-white">Event Name</th>
                          <th className="text-left py-4 px-6 font-semibold text-white">Date</th>
                          <th className="text-left py-4 px-6 font-semibold text-white">Event Type</th>
                          <th className="text-left py-4 px-6 font-semibold text-white">Virtual</th>
                          <th className="text-left py-4 px-6 font-semibold text-white">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEvents.map((event) => (
                          <tr
                            // key={index}
                            className="border-b border-gray-700 hover:bg-white/15 transition-colors duration-300"
                          >
                            <td className="py-4 px-6 text-gray-200">{event.location.country || "Not Specified"}</td>
                            <td className="py-4 px-6 text-gray-200">{event.location.stateProvince || "Not Specified"}</td>
                            <td className="py-4 px-6 flex items-center gap-2 text-gray-200">
                              <MapPin className="h-4 w-4 text-[#170324]" />
                              {event.location.city || "Not Specified"}
                            </td>
                            <td className="py-4 px-6 font-medium text-white">{event.details.eventTitle}</td>
                            <td className="py-4 px-10 text-gray-200">{moment(event.date.startDate).format("MMMM DD, YYYY")}</td>
                            <td className="py-4 px-6 text-gray-200">{event.eventInfo.eventType}</td>
                            <td className="py-4 px-6">
                              {event.eventInfo.physicalEvent ? (
                                <Badge
                                  variant="secondary"
                                  className="bg-white text-[#170324] border-[#170324]/50"
                                >
                                  Y
                                </Badge>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent border-[#170324] text-white hover:bg-[#170324] hover:text-white transition-all duration-300"
                                onClick={() => handleEventClick(event._id)}
                              >
                                Event Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {events.length === 0 && (
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <Calendar className="h-16 w-16 text-gray-400" />
                        <h3 className="text-xl font-semibold text-white">No Events Found</h3>
                        <p className="text-gray-200">No space events were recorded for {year || "this year"}.</p>
                      </div>
                    </div>
                  )}

                  {/* Pagination Controls */}
                  {events.length > 0 && (
                    <div className="flex justify-between items-center mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-[#170324] text-white hover:bg-[#170324] hover:text-white transition-all duration-300"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>

                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className={`${
                              currentPage === page
                                ? "bg-[#170324] text-white"
                                : "bg-transparent border-[#170324] text-white hover:bg-[#170324] hover:text-white"
                            } transition-all duration-300`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-[#170324] text-white hover:bg-[#170324] hover:text-white transition-all duration-300"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default EventsList;