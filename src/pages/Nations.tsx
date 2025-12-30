import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MapSection from "@/pages/MapSection";
import CoordinatorInfo from "@/pages/CoordinatorInfo";
import InquiryForm from "@/pages/InquiryForm";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

interface Event {
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
}

const Nation = () => {
  const location = useLocation();
  const countryName = (location.state?.countryName as string) || "No Country";
  const [events, setEvents] = useState<Event[]>(location.state?.events || []);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events if not provided in location.state
  useEffect(() => {
    const fetchEvents = async () => {
      if (events.length > 0) {
        setLoading(false);
        return; // Skip fetch if events are already provided
      }
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${countryName}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch events");
        }
        setEvents(data?.data?.events || []);
        setCoordinators(data?.data?.coordinator);
        setError(null);
      } catch (err) {
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
    <div className="mt-6 sm:mt-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Events in {countryName}</h1>
      {loading ? (
        <p className="text-gray-600 text-sm sm:text-base">Loading events...</p>
      ) : error ? (
        <p className="text-red-500 text-sm sm:text-base">{error}</p>
      ) : events.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 hidden sm:table-header-group">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Event Title</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Description</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">City</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Location</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Attendance</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors flex flex-col sm:table-row`}
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-800 flex sm:table-cell">
                    <span className="font-semibold sm:hidden">Title: </span>{event.details.eventTitle}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 flex sm:table-cell">
                    <span className="font-semibold sm:hidden">Description: </span>{event.details.eventDescription}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 flex sm:table-cell">
                    <span className="font-semibold sm:hidden">City: </span>{event.location.city}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 flex sm:table-cell">
                    <span className="font-semibold sm:hidden">Location: </span>{event.location.locationName}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 flex sm:table-cell">
                    <span className="font-semibold sm:hidden">Attendance: </span>{event.details.expectedAttendance}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 flex sm:table-cell">
                    <span className="font-semibold sm:hidden">Date: </span>
                    {event.date.startDate} to {event.date.endDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-sm sm:text-base">No events found for {countryName}</p>
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
            {/* <CoordinatorInfo coordinators={coordinators} /> */}
            <InquiryForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Nation;