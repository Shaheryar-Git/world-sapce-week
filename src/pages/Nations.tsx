import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MapSection from "@/pages/MapSection";
import CoordinatorInfo from "@/pages/CoordinatorInfo";
import InquiryForm from "@/pages/InquiryForm";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  location: {
    country: string;
    city: string;
    locationName: string;
    latitude?: number;
    longitude?: number;
  };
  details: {
    eventTitle: string;
    eventDescription: string;
    expectedAttendance: number;
  };
  date: {
    startDate: string;
    endDate: string;
  };
  eventInfo:{
	eventType: string;
	startEndType: string;
	physicalEvent: boolean;
	year: number;
  }
  
}

const Nation = () => {
  const location = useLocation();
  const countryName = (location.state?.countryName as string) || "No Country";
  const [events, setEvents] = useState<Event[]>(location.state?.events || []);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const navigate = useNavigate();

  const sortEventsNewestFirst = (list: Event[]) => {
    return [...list].sort((a, b) => {
      const yearA = a.eventInfo?.year ?? 0;
      const yearB = b.eventInfo?.year ?? 0;

      // Primary: year (descending)
      if (yearA !== yearB) return yearB - yearA;

      // Secondary: start date (descending within same year)
      const dateA = a.date?.startDate
        ? new Date(a.date.startDate).getTime()
        : 0;
      const dateB = b.date?.startDate
        ? new Date(b.date.startDate).getTime()
        : 0;
      return dateB - dateA;
    });
  };
  
  const formatDateWithOrdinal = (value: unknown): string => {
    if (value === null || value === undefined || value === "") return "—";
  
    const d = value instanceof Date ? value : new Date(value as any);
    if (Number.isNaN(d.getTime())) return "—";
  
    const day = d.getDate();
    const year = d.getFullYear();
  
    const month = d.toLocaleString("en-US", { month: "short" }); // Feb
  
    // ordinal suffix
    const getOrdinal = (n: number) => {
      if (n >= 11 && n <= 13) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
  
    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  };

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
  

  const visibleEvents = showAllEvents ? events : events.slice(0, 4);


  // Fetch events if not provided in location.state
  useEffect(() => {
    const fetchEvents = async () => {
      if (events.length > 0) {
        // If events already present from navigation, ensure they are sorted
        setEvents((prev) => sortEventsNewestFirst(prev));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/events/${countryName}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch events");
        }

        const fetchedEvents = data?.data?.events || [];
        const sortedEvents = sortEventsNewestFirst(fetchedEvents);

        setEvents(sortedEvents);
        setCoordinators(data?.data?.coordinator || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error fetching events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [countryName, events.length]);

  // Remove Leaflet attribution (if using Leaflet in MapSection)
  useEffect(() => {
    const attribution = document.querySelector(".leaflet-control-attribution");
    if (attribution) attribution.remove();
  }, []);

  const EventsSection = () => (
  <div className="mt-8 sm:mt-10">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
      Events in <span className="text-[#9326E0]">{countryName}</span>
    </h1>

    {loading ? (
      <p className="text-gray-600 text-base font-medium text-center py-8">
        Loading events...
      </p>
    ) : error ? (
      <p className="text-red-600 text-base font-medium text-center py-8">{error}</p>
    ) : events.length > 0 ? (
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-[#9326E0]/10 to-[#204d74]/10">
            <tr className="hidden sm:table-row">
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-800">
                Event Title
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-800">
                Description
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-800">
                City
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-800">
                Location
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-800">
                Attendance
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-800">
                Year
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-800">
                View Details
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {visibleEvents.map((event, index) => (
              <tr
                key={index}
                className={`hover:bg-[#9326E0]/5 transition-colors duration-200 flex flex-col sm:table-row ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {/* Title */}
                <td className="px-4 py-4 text-sm text-gray-900 font-medium flex sm:table-cell">
                  <span className="font-bold sm:hidden mr-2">Title:</span>
                  {event.details.eventTitle}
                </td>

                {/* Description */}
                <td className="px-4 py-4 text-sm text-gray-600 flex sm:table-cell">
                  <span className="font-bold sm:hidden mr-2">Description:</span>
                  {event.details.eventDescription?.substring(0, 120)}
                  {event.details.eventDescription?.length > 120 ? "..." : ""}
                </td>

                {/* City */}
                <td className="px-4 py-4 text-sm text-gray-700 flex sm:table-cell">
                  <span className="font-bold sm:hidden mr-2">City:</span>
                  {event.location.city || "—"}
                </td>

                {/* Location */}
                <td className="px-4 py-4 text-sm text-gray-700 flex sm:table-cell">
                  <span className="font-bold sm:hidden mr-2">Location:</span>
                  {event.location.locationName || "—"}
                </td>

                {/* Attendance */}
                <td className="px-4 py-4 text-sm text-gray-700 flex sm:table-cell">
                  <span className="font-bold sm:hidden mr-2">Attendance:</span>
                  {event.details.expectedAttendance?.toLocaleString() || "—"}
                </td>

                {/* Year */}
                <td className="px-4 py-4 text-sm font-medium text-[#9326E0] flex sm:table-cell">
                  <span className="font-bold sm:hidden mr-2">Year:</span>
                  {/* {formatDateWithOrdinal(event.eventInfo?.year)} */}
                  {event.eventInfo?.year || "—"}
                  
                </td>

                <button onClick={() => handleEventClick(event._id)} className="px-4 py-4 text-sm font-medium text-[#9326E0] flex sm:table-cell">
                  View Event
                 </button>
              </tr>
            ))}
          </tbody>
        </table>

        {/* See More Button */}
        {events.length > 4 && !showAllEvents && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllEvents(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#9326E0] text-white font-semibold rounded-lg shadow-md hover:bg-[#7e1ed9] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              See More Events
             
            </button>
          </div>
        )}
      </div>
    ) : (
      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-700 text-lg font-medium">
          No events found for {countryName}
        </p>
        <p className="text-gray-500 mt-2 text-base">
          Check back later or explore other countries!
        </p>
      </div>
    )}
  </div>
);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6 sm:space-y-8">
            <MapSection countryName={countryName} events={events} />
            <EventsSection />
          </div>
          <div className="space-y-8 sm:space-y-8">
            <CoordinatorInfo coordinators={coordinators} />
            <InquiryForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Nation;