import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Calendar,
	Plus,
	MapPin,
	X,
	User,
	Mail,
	Phone,
	Building,
	Globe,
	Clock,
	ChevronLeft,
	ChevronRight,
	Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ParticlesBackground from "@/components/ParticlesBackground";
import { getLocalDateString } from "../../lib/utils";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { NavigationType } from "react-router-dom";

// Fix for Leaflet default marker icon
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const formSteps = ["Basic Info", "Location", "Details"];

const initialEvent = {
	publicContactName: "",
	publicEmail: "",
	publicPhone: "",
	organizationName: "",
	eventWebAddress: "http://www.",
	year: "2025",
	physicalEvent: true,
	eventType: "Public Event",
	startEndType: "Starts During WSW",
	country: "",
	stateProvince: "",
	city: "",
	address: "",
	streetAddress: "",
	locationName: "",
	startDate: getLocalDateString(new Date()),
	startTime: "09:00",
	endDate: getLocalDateString(new Date()),
	endTime: "17:00",
	eventTitle: "",
	eventDescription: "",
	promotionalImage: null,
	expectedAttendance: "",
	eventColor: "bg-blue-500",
	latitude: null,
	longitude: null,
};

const colorOptions = [
	{ value: "bg-blue-500", label: "Blue" },
	{ value: "bg-green-500", label: "Green" },
	{ value: "bg-rose-500", label: "Rose" },
	{ value: "bg-amber-500", label: "Amber" },
	{ value: "bg-violet-500", label: "Purple" },
	{ value: "bg-teal-500", label: "Teal" },
];

function getEventColor(eventColor) {
	return eventColor || "bg-blue-500";
}

function formatDate(date) {
	return new Date(date).toLocaleDateString();
}

// Helper: get YYYY-MM-DD string in local timezone (what user actually sees as "today")
function getTodayString(): string {
	const now = new Date();
	return now.toISOString().split("T")[0]; // "2026-01-29"
	// OR more explicit local:
	// return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}

function isToday(dateStr: string): boolean {
	return dateStr === getTodayString();
}

function getDaysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}

const LOCAL_STORAGE_KEY = "wsw_events";

interface User {
	id: String;
	name: string;
	email: string;
	password?: string;
	terms?: boolean;
}

export default function AddEvent() {
	const [events, setEvents] = useState([]);
	const [showEventModal, setShowEventModal] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [formStep, setFormStep] = useState(0);
	const [currentEvent, setCurrentEvent] = useState(initialEvent);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [detailsEvent, setDetailsEvent] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);
	const [dayEventsOpen, setDayEventsOpen] = useState(false);
	const addEventFormRef = useRef(null);
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [calendarDays, setCalendarDays] = useState([]);
	const [scrollY, setScrollY] = useState(0);
	const [showStartPicker, setShowStartPicker] = useState(false);
	const [showEndPicker, setShowEndPicker] = useState(false);
	const mapRef = useRef(null);
	const mapContainerRef = useRef(null);
	const markerRef = useRef(null);
	const existingMarkersRef = useRef([]);
	const { user } = useAuth();
	const location = useLocation();
	const countryList = [
		"All Countries",
		...Object.values(countries.getNames("en", { select: "official" })),
	];
	countries.registerLocale(enLocale);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const navigationType = useNavigationType();

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const parallaxOffset = scrollY * 0.3;
	const fadeOffset = Math.max(0, 1 - scrollY * 0.001);

	// useEffect(() => {
	// 	const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
	// 	if (stored) {
	// 		try {
	// 			setEvents(JSON.parse(stored));
	// 		} catch (e) {
	// 			setEvents([]);
	// 		}
	// 	} else {
	// 		setEvents([]);
	// 	}
	// }, []);

	
	useEffect(() => {
		// Only enter edit mode when we navigated here via a PUSH
		// (e.g. clicking "Edit Event" in All.tsx), not on page refresh/back.
		if (navigationType !== "PUSH") return;
	  
		const state = location.state as { eventToEdit?: any } | null;
		if (state?.eventToEdit) {
		  setEditMode(true);
		  setSelectedEvent(state.eventToEdit);
		  setCurrentEvent(state.eventToEdit);
		  setFormStep(0);
		}
	  }, [location.state, navigationType]);
	

	useEffect(() => {
		generateCalendar();
	}, [currentMonth, currentYear, events]);

	useEffect(() => {
		if (user?.id) {
			fetchEventsByUserId();
		}
	}, [user]);

	// useEffect(() => {
	// 	const state = location.state as any;
	// 	if (state?.eventToEdit) {
	// 		setEditMode(true);
	// 		setSelectedEvent(state.eventToEdit);
	// 		setCurrentEvent(state.eventToEdit);
	// 		setFormStep(0);
	// 	}
	// }, [location.state]);

	

	const generateCalendar = () => {
		const firstDay = new Date(currentYear, currentMonth, 1);
		const firstDayIndex = firstDay.getDay();
		const lastDate = getDaysInMonth(currentYear, currentMonth);
		const prevLastDate = getDaysInMonth(currentYear, currentMonth - 1);
		const totalCalendarDays = 42;
		const days = [];

		for (let i = firstDayIndex - 1; i >= 0; i--) {
			const date = new Date(
				currentYear,
				currentMonth - 1,
				prevLastDate - i,
			);
			days.push({
				date: date.toISOString().split("T")[0],
				isCurrentMonth: false,
				isToday: isToday(date.toISOString().split("T")[0]),
				events: getEventsForDate(date, events),
			});
		}

		for (let i = 1; i <= lastDate; i++) {
			const date = new Date(currentYear, currentMonth, i);
			days.push({
				date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
				isCurrentMonth: true,
				isToday: isToday(date),
				events: getEventsForDate(date, events),
			});
		}

		const remainingDays = totalCalendarDays - days.length;
		for (let i = 1; i <= remainingDays; i++) {
			const date = new Date(currentYear, currentMonth + 1, i);
			days.push({
				date: date.toISOString().split("T")[0],
				isCurrentMonth: false,
				isToday: isToday(date),
				events: getEventsForDate(date, events),
			});
		}

		setCalendarDays(days);
	};

	const getEventsForDate = (date, allEvents) => {
		return allEvents.filter((event) => {
			const eventStart = new Date(event.startDate);
			const eventEnd = new Date(event.endDate);
			eventStart.setHours(0, 0, 0, 0);
			eventEnd.setHours(0, 0, 0, 0);
			date.setHours(0, 0, 0, 0);
			return date >= eventStart && date <= eventEnd;
		});	
	};
	

	const previousMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	const nextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	};

	const viewToday = () => {
		const today = new Date();
		setCurrentMonth(today.getMonth());
		setCurrentYear(today.getFullYear());
	};
	

	const openAddEventModal = () => {
		setEditMode(false);
		setSelectedEvent(null);
		setCurrentEvent(initialEvent);
		setFormStep(0);
		setShowEventModal(true);
	};

	const openEditEventModal = (event) => {
		setEditMode(true);
		setSelectedEvent(event);
		setCurrentEvent(event);
		setFormStep(0);
		setShowEventModal(true);
	};

	

	const handleSaveEvent = async (e) => {
  e.preventDefault();

  // Validate all required fields
  const allRequiredFields = [
    "publicContactName",
    "publicEmail",
    "publicPhone",
    "organizationName",
    "eventWebAddress",
    "eventType",
    "startEndType",
    ...(currentEvent.physicalEvent
      ? ["country", "stateProvince", "city", "address", "locationName"]
      : []),
    "startDate",
    "endDate",
    "startTime",
    "endTime",
    "eventTitle",
    "eventDescription",
    "expectedAttendance",
  ];

  const missingFields = allRequiredFields.filter(
    (field) =>
      !currentEvent[field] ||
      (typeof currentEvent[field] === "string" && currentEvent[field].trim() === ""),
  );

  if (missingFields.length > 0) {
    toast.error(`Please fill in: ${missingFields.join(", ")}`);
    return;
  }
  try {
    // Fix: nest address properly (from previous discussion)
   const payload = {
  userId: user.id,
  publicContactName: currentEvent.publicContactName,
  publicEmail: currentEvent.publicEmail,
  publicPhone: currentEvent.publicPhone,
  organizationName: currentEvent.organizationName,
  eventWebAddress: currentEvent.eventWebAddress,
  year: Number(currentEvent.year) || undefined,
  eventType: currentEvent.eventType,
  startEndType: currentEvent.startEndType,
  physicalEvent: currentEvent.physicalEvent,
  country: currentEvent.country,
  stateProvince: currentEvent.stateProvince,
  city: currentEvent.city,
  address: typeof currentEvent.address === 'string' 
    ? currentEvent.address.trim() 
    : (currentEvent.address?.streetAddress || "").trim() || "",          // ← plain string!
  locationName: currentEvent.locationName,
  latitude: currentEvent.latitude,
  longitude: currentEvent.longitude,

  startDate: currentEvent.startDate,
  endDate: currentEvent.endDate,
  startTime: currentEvent.startTime,
  endTime: currentEvent.endTime,

  eventTitle: currentEvent.eventTitle,
  eventColor: currentEvent.eventColor,
  eventDescription: currentEvent.eventDescription,
  expectedAttendance: Number(currentEvent.expectedAttendance),

  promotionalImage: currentEvent.promotionalImage,
};

    let response;

    if (editMode && selectedEvent?.id) {
      // Update existing event
	  console.log("Full payload being sent:", payload);
      response = await axios.put(
        `${import.meta.env.VITE_API_URL}/event/updateEvents/${selectedEvent.id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
	 

    } else {
      // Create new event
      response = await axios.post(
        `${import.meta.env.VITE_API_URL}/createEvents`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!response.data.event) {
      console.error("Invalid response format: 'event' field missing");
      toast.error(
        editMode
          ? "Failed to update event: Invalid response from server"
          : "Failed to create event: Invalid response from server"
      );
      return;
    }

    const raw = response.data.event;

    // Map backend response to frontend format
    const mappedEvent = {
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
	  address: raw.location.address.streetAddress || raw.location?.streetAddress || "",
    //   address: raw.location?.address?.streetAddress || "",
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
    };

    // Update events list in state
    setEvents((prev) => {
      let updatedEvents;
      if (editMode && selectedEvent?.id) {
        updatedEvents = prev.map((ev) =>
          ev.id === selectedEvent.id ? mappedEvent : ev
        );
      } else {
        updatedEvents = [...prev, mappedEvent];
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
      return updatedEvents;
    });

    // Show success message
    toast.success(
      editMode ? "Event updated successfully!" : "Event created successfully!"
    );

    // ────────────────────────────────────────────────
    // IMPORTANT: Reset form in BOTH create AND update cases
    // ────────────────────────────────────────────────
    setShowEventModal(false);
    setCurrentEvent(initialEvent);           // ← reset form to empty/initial state
    setFormStep(0);
    setEditMode(false);
    setSelectedEvent(null);

    console.log("Event saved:", mappedEvent);
	
	

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    toast.error(
      err.response?.data?.message ||
        (editMode ? "Failed to update event" : "Failed to create event")
    );
  }
};

	const handleDeleteEvent = async () => {
		if (!detailsEvent?.id) return;

		try {
			await axios.delete(
				`${import.meta.env.VITE_API_URL}/event/deleteEvent/${detailsEvent.id}`,
				{ withCredentials: true },
			);

			setEvents((prev) => {
				const updatedEvents = prev.filter(
					(ev) => ev.id !== detailsEvent.id,
				);
				localStorage.setItem(
					LOCAL_STORAGE_KEY,
					JSON.stringify(updatedEvents),
				);
				return updatedEvents;
			});

			toast.success("Event deleted successfully.");
			setShowDetailsModal(false);
			setDetailsEvent(null);
			setShowDeleteConfirm(false);
		} catch (err) {
			console.error("Failed to delete event:", err);
			toast.error(
				err.response?.data?.message || "Failed to delete event",
			);
		}
	};

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

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		setCurrentEvent((prev) => ({
			...prev,
			[name]: type === "checkbox" ? e.target.checked : value,
		}));
	};

	const handleDateSelect = (date, field) => {
		const formattedDate = date ? date.toISOString().split("T")[0] : "";
		setCurrentEvent((prev) => ({ ...prev, [field]: formattedDate }));
		if (field === "startDate") setShowStartPicker(false);
		if (field === "endDate") setShowEndPicker(false);
	};

	const handleColorChange = (e) => {
		setCurrentEvent((prev) => ({ ...prev, eventColor: e.target.value }));
	};

	const handleImageUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				setCurrentEvent((prev) => ({
					...prev,
					promotionalImage: ev.target?.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		setCurrentEvent((prev) => ({ ...prev, promotionalImage: null }));
	};

	const showDayEvents = (day) => {
		if (day.events.length > 1) {
			setSelectedDay(day);
			setDayEventsOpen(true);
		} else if (day.events.length === 1) {
			openDetailsModal(day.events[0]);
		}
	};

	const handleEventSelect = (event) => {
		setDayEventsOpen(false);
		openDetailsModal(event);
	};

	const openDetailsModal = (event) => {
		setDetailsEvent(event);
		setShowDetailsModal(true);
	};

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const generateTimeOptions = () => {
		const times = [];
		for (let hour = 0; hour < 24; hour++) {
			for (let minute = 0; minute < 60; minute += 30) {
				const time = `${hour.toString().padStart(2, "0")}:${minute
					.toString()
					.padStart(2, "0")}`;
				times.push(time);
			}
		}
		return times;
	};

	const handleNextStep = () => {
		const requiredFields =
			formStep === 0
				? [
						"publicContactName",
						"publicEmail",
						"publicPhone",
						"organizationName",
						"eventType",
						"startEndType",
					]
				: formStep === 1
					? [
							currentEvent.physicalEvent ? "country" : null,
							currentEvent.physicalEvent ? "stateProvince" : null,
							currentEvent.physicalEvent ? "city" : null,
							currentEvent.physicalEvent ? "address" : null,
							currentEvent.physicalEvent ? "locationName" : null,
						].filter(Boolean)
					: [
							"startDate",
							"endDate",
							"eventTitle",
							"eventDescription",
							"expectedAttendance",
						];
		const missingFields = requiredFields.filter(
			(field) =>
				!currentEvent[field] ||
				(typeof currentEvent[field] === "string" &&
					currentEvent[field].trim() === ""),
		);
		if (missingFields.length > 0) {
			toast.error("Please fill in all required fields before proceeding");
			return;
		}
		setFormStep(formStep + 1);
	};

	const handleCancel = () => {
		setShowEventModal(false);
		setCurrentEvent(initialEvent);
		setFormStep(0);
	};

	useEffect(() => {
		if (formStep !== 1 || !mapContainerRef.current) return;

		if (!mapRef.current) {
			mapRef.current = L.map(mapContainerRef.current, {
				center: [50, 0],
				zoom: 2,
				minZoom: 2,
				maxZoom: 18,
				scrollWheelZoom: false,
				attributionControl: false,
			});

			L.Icon.Default.mergeOptions({
				iconUrl: iconUrl as unknown as string,
				iconRetinaUrl: iconRetinaUrl as unknown as string,
				shadowUrl: iconShadowUrl as unknown as string,
			});

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 18,
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(mapRef.current);

			// Custom pin icon matching screenshot (blue pin with white center)
			const pinIcon = L.divIcon({
				className: "wsw-pin-icon",

				iconSize: [36, 48],
				iconAnchor: [18, 28], // tip of the pin
				popupAnchor: [0, -42],
			});

			mapRef.current.on("click", function (e) {
				const { lat, lng } = e.latlng;
				setCurrentEvent((prev) => ({
					...prev,
					latitude: lat,
					longitude: lng,
				}));

				if (markerRef.current) {
					mapRef.current.removeLayer(markerRef.current);
				}

				markerRef.current = L.marker([lat, lng], { icon: pinIcon })
					.addTo(mapRef.current)
					.bindPopup("Event Location")
					.openPopup();

				mapRef.current.setView([lat, lng], 13);
			});
		}

		if (currentEvent.latitude && currentEvent.longitude && mapRef.current) {
			const lat = currentEvent.latitude;
			const lng = currentEvent.longitude;
			mapRef.current.setView([lat, lng], 13);

			if (markerRef.current) {
				mapRef.current.removeLayer(markerRef.current);
			}

			const pinIcon = L.divIcon({
				className: "wsw-pin-icon",
				html:
					'<svg width="30" height="40" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">' +
					'<defs><linearGradient id="g3" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#3ba0ff"/><stop offset="100%" stop-color="#1e73be"/></linearGradient></defs>' +
					'<path d="M12 0C6.477 0 2 4.477 2 10c0 6.627 10 22 10 22s10-15.373 10-22C22 4.477 17.523 0 12 0z" fill="url(#g3)" stroke="#1565c0" stroke-width="0.5"/>' +
					'<circle cx="12" cy="10" r="3.2" fill="#ffffff" stroke="#e3f2fd" stroke-width="0.5"/>' +
					"</svg>",
				iconSize: [36, 48],
				iconAnchor: [18, 48],
				popupAnchor: [0, -42],
			});

			markerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(
				mapRef.current,
			);
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
				markerRef.current = null;
				existingMarkersRef.current = [];
			}
		};
	}, [
		formStep,
		currentEvent.locationName,
		currentEvent.city,
		currentEvent.stateProvince,
		currentEvent.country,
		currentEvent.latitude,
		currentEvent.longitude,
		events,
	]);

	return (
		<div className="relative overflow-hidden">
			<Navigation />
			<section className="relative py-16 sm:py-24 md:py-32 hero-gradient overflow-hidden">
				<div className="hero-particles">
					<div
						className="absolute inset-0 hero-gradient"
						style={{ transform: `translateY(${parallaxOffset}px)` }}
					/>
					<ParticlesBackground scrollY={scrollY} count={200} />
					<div className="absolute top-20 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-[#9327e0]/10 rounded-full blur-xl animate-pulse" />
					<div className="absolute bottom-24 sm:bottom-32 right-10 sm:right-20 w-32 sm:w-40 h-32 sm:h-40 bg-[#204d74]/10 rounded-full blur-2xl animate-pulse delay-1000" />
				</div>
				<div
					className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
					style={{
						opacity: fadeOffset,
						transform: `translateY(${scrollY * 0.1}px)`,
					}}
				>
					<div className="inline-flex items-center gap-3 glass rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 hover:bg-white/10 transition-all duration-500 group">
						<Plus className="w-4 sm:w-5 h-4 sm:h-5 text-[#9327e0] group-hover:rotate-12 transition-transform duration-500" />
						<span className="text-white text-base sm:text-lg font-medium">
							Add Your Event
						</span>
					</div>
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight animate-fade-in-up">
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9327e0] to-[#204d74]">
							World Space Week Events
						</span>
					</h1>
					<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 animate-fade-in-up">
						Discover and participate in thousands of space events
						happening worldwide during World Space Week
					</p>
				</div>
			</section>
			<section className="py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-white/20">
						<h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
							{editMode ? "Edit Event" : "Add Your Event"}
						</h2>
						<form
							ref={addEventFormRef}
							onSubmit={handleSaveEvent}
							className="space-y-6 sm:space-y-8"
						>
							<div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-4">
								{formSteps.map((step, index) => {
									const isActive = formStep === index;
									const isCompleted = formStep > index;
									const isClickable = formStep >= index;
									return (
										<div
											key={index}
											className="flex items-center w-full sm:w-auto sm:flex-1 relative group"
										>
											<div
												className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer 
                          ${
								isCompleted || isActive
									? "bg-[#9327e0] text-white"
									: "bg-slate-200 text-slate-500 hover:scale-105"
							}`}
												onClick={() =>
													isClickable &&
													setFormStep(index)
												}
											>
												{index + 1}
											</div>
											<div
												className={`mt-2 sm:mt-0 sm:ml-3 text-xs text-center sm:text-left transition-all ${
													isActive
														? "text-[#9327e0] font-semibold"
														: "text-slate-400"
												}`}
											>
												{step}
											</div>
										</div>
									);
								})}
							</div>
							{formStep === 0 && (
								<div className="space-y-6 animate-fade-in">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
										<div className="space-y-1">
											<Label htmlFor="publicContactName">
												Public Contact Name{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<div className="relative">
												<Input
													id="publicContactName"
													name="publicContactName"
													value={
														currentEvent.publicContactName
													}
													onChange={handleChange}
													placeholder="John Doe"
													required
													className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												/>
												<User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
											</div>
										</div>
										<div className="space-y-1">
											<Label htmlFor="publicEmail">
												Public Email{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<div className="relative">
												<Input
													id="publicEmail"
													name="publicEmail"
													type="email"
													value={
														currentEvent.publicEmail
													}
													onChange={handleChange}
													placeholder="contact@example.com"
													required
													className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												/>
												<Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
											</div>
										</div>
										<div className="space-y-1">
											<Label htmlFor="publicPhone">
												Public Phone{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<div className="relative">
												<Input
													id="publicPhone"
													name="publicPhone"
													type="tel"
													value={
														currentEvent.publicPhone
													}
													onChange={handleChange}
													placeholder="(123) 456-7890"
													required
													className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												/>
												<Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
											</div>
										</div>
										<div className="space-y-1">
											<Label htmlFor="organizationName">
												Organization Name{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<div className="relative">
												<Input
													id="organizationName"
													name="organizationName"
													value={
														currentEvent.organizationName
													}
													onChange={handleChange}
													placeholder="Company or Organization"
													required
													className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												/>
												<Building className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
											</div>
										</div>
										<div className="space-y-1">
											<Label htmlFor="eventWebAddress">
												Event Web Address{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<div className="relative">
												<Input
													id="eventWebAddress"
													name="eventWebAddress"
													type="url"
													value={
														currentEvent.eventWebAddress
													}
													onChange={handleChange}
													placeholder="http://www.example.com"
													className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												/>
												<Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
											</div>
										</div>
										<div className="space-y-1">
											<Label htmlFor="year">Year</Label>
											<Select
												value={currentEvent.year}
												onValueChange={(val) =>
													handleChange({
														target: {
															name: "year",
															value: val,
															type: "select-one",
														},
													})
												}
											>
												<SelectTrigger
													id="year"
													className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												>
													<SelectValue placeholder="Select year" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="2024">
														2024
													</SelectItem>
													<SelectItem value="2025">
														2025
													</SelectItem>
													<SelectItem value="2026">
														2026
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-1">
											<Label htmlFor="eventType">
												Event Type
											</Label>
											<Select
												value={currentEvent.eventType}
												onValueChange={(val) =>
													handleChange({
														target: {
															name: "eventType",
															value: val,
															type: "select-one",
														},
													})
												}
											>
												<SelectTrigger
													id="eventType"
													className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												>
													<SelectValue placeholder="Select event type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Public Event">
														Public Event
													</SelectItem>
													<SelectItem value="Private Event">
														Private Event
													</SelectItem>
													<SelectItem value="Conference">
														Conference
													</SelectItem>
													<SelectItem value="Workshop">
														Workshop
													</SelectItem>
													<SelectItem value="Webinar">
														Webinar
													</SelectItem>
				
													<SelectItem value="School Activity">
														School Activity
													</SelectItem>
													<SelectItem value="Public Talk / Lecture">
														Public Talk / Lecture
													</SelectItem>
													<SelectItem value="Workshop / Training">
														Workshop / Training
													</SelectItem>
													<SelectItem value="Conference / Symposium">
														Conference / Symposium
													</SelectItem>
													<SelectItem value="Exhibition / Display">
														Exhibition / Display
													</SelectItem>
													<SelectItem value="Outreach / Community Event">
														Outreach / Community Event
													</SelectItem>
													<SelectItem value="Observatory / Stargazing Event">
														Observatory / Stargazing Event
													</SelectItem>
													<SelectItem value="Online Event (webinar, livestream)">
														Online Event (webinar, livestream)
													</SelectItem>
													<SelectItem value="Competition / Challenge">
														Competition / Challenge
													</SelectItem>
													<SelectItem value="Rocket Launch Event or Space Mission">
														Rocket Launch Event or Space Mission
													</SelectItem>
													<SelectItem value="Other">
														Other
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-1">
											<Label htmlFor="startEndType">
												Start/End Type
											</Label>
											<Select
												value={
													currentEvent.startEndType
												}
												onValueChange={(val) =>
													handleChange({
														target: {
															name: "startEndType",
															value: val,
															type: "select-one",
														},
													})
												}
											>
												<SelectTrigger
													id="startEndType"
													className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												>
													<SelectValue placeholder="Select type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Starts During WSW">
														Starts During WSW
													</SelectItem>
													<SelectItem value="Single Day">
														Single Day
													</SelectItem>
													<SelectItem value="Multiple Days">
														Multiple Days
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="flex items-center space-x-2 col-span-1 sm:col-span-2 mt-2">
											<Label htmlFor="physicalEvent">
												Physical Event{" "}
											</Label>
											<input
												id="physicalEvent"
												name="physicalEvent"
												type="checkbox"
												checked={
													currentEvent.physicalEvent
												}
												onChange={handleChange}
												className="h-5 w-5 text-[#9327e0] border-gray-300 rounded focus:ring-[#9327e0] ml-2"
											/>
											<span className="text-xs text-slate-500">
												{currentEvent.physicalEvent
													? "Yes"
													: "No"}{" "}
												<span className="text-red-500">
													*
												</span>{" "}
											</span>
										</div>
									</div>
								</div>
							)}
							{formStep === 1 &&
								(currentEvent.physicalEvent ? (
								<div className="space-y-6 animate-fade-in">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
										<div className="space-y-1">
											<Label htmlFor="country">
												Country
												<span className="text-red-500">
													*
												</span>
											</Label>
											<select
												id="country"
												name="country"
												value={currentEvent.country}
												onChange={handleChange}
												required
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
											>
												<option value="" disabled>
													Select country
												</option>
												{countryList.map((country) => (
													<option
														key={country}
														value={country}
													>
														{country}
													</option>
												))}
											</select>
										</div>
										<div className="space-y-1">
											<Label htmlFor="stateProvince">
												State/Province{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<Input
												id="stateProvince"
												name="stateProvince"
												value={
													currentEvent.stateProvince
												}
												onChange={handleChange}
												placeholder="State or Province"
												required
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
											/>
										</div>
										<div className="space-y-1">
											<Label htmlFor="city">
												City{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<Input
												id="city"
												name="city"
												value={currentEvent.city}
												onChange={handleChange}
												placeholder="City"
												required
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
											/>
										</div>
										<div className="space-y-1">
											<Label htmlFor="address">
												Address{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<Input
												id="address"
												name="address"
												value={currentEvent.address}
												onChange={handleChange}
												placeholder="Street Address"
												required
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
											/>
										</div>
										<div className="col-span-1 sm:col-span-2 space-y-1">
											<Label htmlFor="locationName">
												Location Name{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<Input
												id="locationName"
												name="locationName"
												value={
													currentEvent.locationName
												}
												onChange={handleChange}
												placeholder="Convention Center"
												required
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
											/>
										</div>
									</div>
									<div className="bg-gradient-to-br from-[#9327e0]/5 to-[#204d74]/5 border-2 border-[#9327e0]/20 rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16">
										<h3 className="text-lg sm:text-xl font-bold text-black mb-4">
											Event Location Map (Click to pin
											location)
										</h3>
										<div
											ref={mapContainerRef}
											className="w-full rounded-2xl relative overflow-hidden"
											style={{
												height: "70vh",
												minHeight: "300px",
												maxHeight: "600px",
											}}
										/>
									</div>
								</div>
							) : (
								<div className="space-y-4 animate-fade-in">
									<p className="text-sm text-slate-600">
										This is a virtual event, so no physical
										location details are required.
									</p>
								</div>
							))}
							{formStep === 2 && (
								<div className="space-y-6 animate-fade-in">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
										<div className="space-y-1">
											<Label htmlFor="startDate">
												Start Date{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<div className="relative flex-1">
												<Calendar
													className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
													onClick={() =>
														setShowStartPicker(
															!showStartPicker,
														)
													}
												/>
												<Input
													id="startDate"
													name="startDate"
													type="text"
													value={
														currentEvent.startDate
													}
													onClick={() =>
														setShowStartPicker(
															!showStartPicker,
														)
													}
													readOnly
													className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
													placeholder="Select date"
													required
												/>
												{showStartPicker && (
													<div className="absolute z-10 mt-1 bg-white rounded-lg shadow-[0_10px_38px_-10px_rgba(0,0,0,0.35),0_10px_20px_-15px_rgba(0,0,0,0.2)]">
														<DayPicker
															mode="single"
															selected={
																currentEvent.startDate
																	? new Date(
																			currentEvent.startDate,
																		)
																	: undefined
															}
															onSelect={(date) =>
																handleDateSelect(
																	date,
																	"startDate",
																)
															}
															disabled={(date) =>
																date <
																new Date()
															}
															className="p-4"
															classNames={{
																day: "w-8 h-8  rounded-md text-sm font-normal text-black hover:border hover:border-black data-[selected]:bg-[#9327e0] data-[selected]:text-white data-[today]:before:bg-green-500",
																caption:
																	"flex items-center justify-between text-black font-medium",
																nav_button:
																	"w-8 h-8  rounded-md",
															}}
														/>
													</div>
												)}
											</div>
											<div className="relative">
												<Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
												<Select
													value={
														currentEvent.startTime
													}
													onValueChange={(value) =>
														handleChange({
															target: {
																name: "startTime",
																value,
																type: "select-one",
															},
														})
													}
													required
												>
													<SelectTrigger
														id="startTime"
														className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0] text-left"
													>
														<SelectValue placeholder="Select start time" />
													</SelectTrigger>
													<SelectContent>
														{generateTimeOptions().map(
															(time) => (
																<SelectItem
																	key={time}
																	value={time}
																>
																	{time}
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className="space-y-1">
											<Label htmlFor="endDate">
												End Date{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<div className="relative flex-1">
												<Calendar
													className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
													onClick={() =>
														setShowEndPicker(
															!showEndPicker,
														)
													}
												/>
												<Input
													id="endDate"
													name="endDate"
													type="text"
													value={currentEvent.endDate}
													onClick={() =>
														setShowEndPicker(
															!showEndPicker,
														)
													}
													readOnly
													className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
													placeholder="Select date"
													required
												/>
												{showEndPicker && (
													<div className="absolute z-10 mt-1 bg-white rounded-lg shadow-[0_10px_38px_-10px_rgba(0,0,0,0.35),0_10px_20px_-15px_rgba(0,0,0,0.2)]">
														<DayPicker
															mode="single"
															selected={
																currentEvent.endDate
																	? new Date(
																			currentEvent.endDate,
																		)
																	: undefined
															}
															onSelect={(date) =>
																handleDateSelect(
																	date,
																	"endDate",
																)
															}
															disabled={(date) =>
																date <
																new Date(
																	currentEvent.startDate ||
																		new Date(),
																)
															}
															className="p-4"
															classNames={{
																day: "w-8 h-8  rounded-md text-sm font-normal text-black hover:border hover:border-black data-[selected]:bg-[#9327e0] data-[selected]:text-white data-[today]:before:bg-green-500",
																caption:
																	"flex items-center justify-between text-black font-medium",
																nav_button:
																	"w-8 h-8  rounded-md",
															}}
														/>
													</div>
												)}
											</div>
											<div className="relative">
												<Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
												<Select
													value={currentEvent.endTime}
													onValueChange={(value) =>
														handleChange({
															target: {
																name: "endTime",
																value,
																type: "select-one",
															},
														})
													}
													required
												>
													<SelectTrigger
														id="emdTime"
														className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0] text-left"
													>
														<SelectValue placeholder="Select end time" />
													</SelectTrigger>
													<SelectContent>
														{generateTimeOptions().map(
															(time) => (
																<SelectItem
																	key={time}
																	value={time}
																>
																	{time}
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
										<div className="space-y-1">
											<Label htmlFor="eventTitle">
												Event Title{" "}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<Input
												id="eventTitle"
												name="eventTitle"
												value={currentEvent.eventTitle}
												onChange={handleChange}
												placeholder="Annual Tech Conference 2025"
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
												required
											/>
										</div>
										<div className="space-y-1">
											<Label htmlFor="eventColor">
												Event Color
											</Label>
											<select
												id="eventColor"
												name="eventColor"
												value={currentEvent.eventColor}
												onChange={handleColorChange}
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
											>
												{colorOptions.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className="space-y-1">
										<Label htmlFor="eventDescription">
											Event Description{" "}
											<span className="text-red-500">
												*
											</span>
										</Label>
										<Textarea
											id="eventDescription"
											name="eventDescription"
											value={
												currentEvent.eventDescription
											}
											onChange={handleChange}
											rows={4}
											placeholder="Include details about the event and timing information"
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
											required
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="expectedAttendance">
											Expected Attendance{" "}
											<span className="text-red-500">
												*
											</span>
										</Label>
										<Input
											id="expectedAttendance"
											name="expectedAttendance"
											type="number"
											min="1"
											value={
												currentEvent.expectedAttendance
											}
											onChange={handleChange}
											placeholder="100"
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9327e0]"
											required
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="promotionalImage">
											Promotional Image
										</Label>
										<div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
											{!currentEvent.promotionalImage ? (
												<div className="space-y-2">
													<div className="text-4xl text-slate-400 mx-auto w-fit">
														📷
													</div>
													<p className="text-xs text-slate-500">
														Drag & drop your image
														here or click to browse
													</p>
													<Button
														type="button"
														variant="outline"
														className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
														onClick={() =>
															document
																.getElementById(
																	"promotionalImage",
																)
																.click()
														}
													>
														Choose Image
													</Button>
													<Input
														id="promotionalImage"
														type="file"
														accept="image/*"
														onChange={
															handleImageUpload
														}
														className="hidden"
													/>
												</div>
											) : (
												<div className="relative">
													<img
														src={
															currentEvent.promotionalImage
														}
														alt="Event promotional"
														className="max-h-32 mx-auto rounded"
													/>
													<Button
														type="button"
														onClick={removeImage}
														size="sm"
														variant="outline"
														className="absolute top-2 right-2"
													>
														✕
													</Button>
												</div>
											)}
										</div>
									</div>
								</div>
							)}
							<div className="flex flex-col sm:flex-row justify-between pt-6 sm:pt-8 gap-4">
								{formStep > 0 && (
									<Button
										type="button"
										variant="secondary"
										onClick={() =>
											setFormStep(formStep - 1)
										}
									>
										Previous
									</Button>
								)}
								<Button
									type="button"
									variant="secondary"
									onClick={handleCancel}
								>
									Cancel
								</Button>
								{formStep < 2 && (
									<Button
										type="button"
										onClick={handleNextStep}
										className="sm:ml-auto"
									>
										Next
									</Button>
								)}
								{formStep === 2 && (
									<Button
										type="submit"
										className="sm:ml-auto"
									>
										{editMode
											? "Update Event"
											: "Save Event"}
									</Button>
								)}
							</div>
						</form>
					</div>
				</div>
			</section>
			<section className="py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-[#220536] backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-white/20">
						<div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
							<div className="flex space-x-3 items-center">
								<Button
									variant="ghost"
									size="icon"
									onClick={previousMonth}
									className="p-4 sm:p-6 text-white"
								>
									<ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
								</Button>
								<h2 className="text-xl sm:text-2xl font-bold text-white">
									{monthNames[currentMonth]} {currentYear}
								</h2>
								<Button
									variant="ghost"
									size="icon"
									onClick={nextMonth}
									className="p-4 sm:p-6 text-white"
								>
									<ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
								</Button>
							</div>
							<Button
								variant="outline"
								// onClick={viewToday}
								className="px-4 py-2 rounded-full font-medium border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-black-700"
							>
								Today
							</Button>
						</div>
						<div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
							{[
								"Sun",
								"Mon",
								"Tue",
								"Wed",
								"Thu",
								"Fri",
								"Sat",
							].map((day) => (
								<div
									key={day}
									className="text-center text-xs sm:text-sm font-medium text-white/70 py-1 sm:py-2"
								>
									{day}
								</div>
							))}
						</div>
						<div className="grid grid-cols-7 gap-1 sm:gap-2">
							{calendarDays.map((day) => (
								<div
									key={day.date}
									onClick={() =>
										day.isCurrentMonth && showDayEvents(day)
									}
									className={`
                    border rounded-lg p-2 h-20 sm:h-24 md:h-28 lg:h-32 cursor-pointer calendar-day
                    ${
						!day.isCurrentMonth
							? "opacity-40 calendar-day-disabled"
							: ""
					}
                    ${day.isToday ? "border-primary/50" : ""}
                    ${
						day.events.length > 0 && day.isCurrentMonth
							? "bg-primary/5"
							: ""
					}
                    transition-transform hover:translate-y-[-2px] hover:shadow-lg
                  `}
								>
									<div className="flex justify-between">
										<span
											className={`
                        ${day.isToday ? "font-bold text-primary" : ""}
                        ${!day.isCurrentMonth ? "text-white/40" : "text-white"}
                      `}
										>
											{new Date(day.date).getDate()}
											
										</span>
										{day.isToday && (
											<div className="bg-primary w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full"></div>
										)}
									</div>
									<div className="mt-1 space-y-0.5 sm:space-y-1 overflow-hidden">
										{day.events
											.slice(0, 2)
											.map((event, index) => (
												<div
													key={index}
													className={`${
														event.eventColor ||
														getEventColor(
															event.eventType,
														)
													} text-white text-[10px] sm:text-xs rounded px-1 py-0.5`}
												>
													<div className="flex justify-between items-center">
														<span className="truncate">
															{event.eventTitle}
														</span>
														{event.startTime && (
															<span className="text-white/80 text-[9px] sm:text-[10px] ml-1 whitespace-nowrap">
																{/* {
																	event.startTime
																} */}
															</span>
														)}
													</div>
												</div>
											))}
										{day.events.length > 2 && (
											<div className="text-[10px] sm:text-xs text-white/60">
												+ {day.events.length - 2} more
											</div>
										)}
									</div>
								</div>
							))}
						</div>
						<Dialog
							open={dayEventsOpen}
							onOpenChange={setDayEventsOpen}
						>
							<DialogContent
								className="max-w-[90vw] sm:max-w-lg rounded-xl"
								aria-describedby="day-events-description"
							>
								<DialogTitle className="relative flex items-center mb-4">
									{selectedDay && (
										<div className="flex flex-col">
											<h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
												Events on {formatDate(selectedDay.date)}
											</h3>
											<p className="text-xs sm:text-sm text-slate-500">
												Select an event to view details
											</p>
										</div>
									)}
								</DialogTitle>
								<div className="space-y-3 py-2 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
									{selectedDay?.events.map((event, index) => (
										<div
											key={index}
											onClick={() =>
												handleEventSelect(event)
											}
											className={`
                        p-3 sm:p-4 rounded-lg shadow-sm border border-slate-100 
                        ${
							event.eventColor || getEventColor(event.eventType)
						} bg-opacity-10 hover:bg-opacity-20
                        flex items-start cursor-pointer transition-all hover:shadow-md 
                      `}
										>
											<div className="flex-1">
												<div
													className={`text-sm sm:text-base font-medium text-slate-900 flex items-center`}
												>
													<div
														className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full mr-2 ${
															event.eventColor ||
															getEventColor(
																event.eventType,
															)
														}`}
													></div>
													{event.eventTitle}
												</div>
												<div className="mt-1 flex items-center text-xs sm:text-sm text-slate-600">
													<Clock className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
													<span>
														{event.startTime || "09:00"} 
														-{" "}
														{event.endTime || "17:00"} 
													</span>
												</div>
												<div className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-1">
													{event.eventDescription}
												</div>
											</div>
										</div>
									))}
								</div>
								<div className="mt-4 flex justify-end">
									<Button
										onClick={() => setDayEventsOpen(false)}
										variant="outline"
										className="rounded-full"
									>
										Close
									</Button>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</section>
			<Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
				<DialogContent className="max-w-[90vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
					{detailsEvent && (
						<>
							<div className="relative h-48 sm:h-64">
								<img
									src={
										detailsEvent.promotionalImage ||
										"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400"
									}
									alt={detailsEvent.eventTitle}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
								<div className="absolute bottom-4 left-4 sm:left-6 text-white">
									<span
										className={`inline-block px-2 py-0.5 rounded text-xs sm:text-sm ${
											detailsEvent.eventColor ||
											getEventColor(
												detailsEvent.eventType,
											)
										}`}
									>
										{detailsEvent.eventType}
									</span>
									<h2 className="text-xl sm:text-2xl font-bold">
										{detailsEvent.eventTitle}
									</h2>
									
								</div>
							</div>
							<div className="p-4 sm:p-6">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
									<div className="col-span-1 md:col-span-2">
										<div className="flex items-center justify-between mb-2">
											<h3 className="text-base sm:text-lg font-semibold">
												Event Details
											</h3>
											
										</div>
										<p className="mb-4 text-slate-700 text-sm sm:text-base">
											{detailsEvent.eventDescription}
										</p>
										<h3 className="text-base sm:text-lg font-semibold mb-2">
											Contact Information
										</h3>
										<div className="space-y-2 mb-4">
											<div className="flex items-center">
												<User className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
												<span className="text-slate-700 text-sm sm:text-base">
													{
														detailsEvent.publicContactName
													}
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
													{
														detailsEvent.organizationName
													}
												</span>
											</div>
											<div className="flex items-center">
												<Users className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
												<div className="text-slate-700 text-sm sm:text-base">
													<span>
														{
															detailsEvent.expectedAttendance
														}
													</span>{" "}
													Expected Attendees
												</div>
											</div>
											{detailsEvent.eventWebAddress && (
												<div className="flex items-center">
													<Globe className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
													<a
														href={
															detailsEvent.eventWebAddress
														}
														target="_blank"
														rel="noopener noreferrer"
														className="text-primary hover:underline text-sm sm:text-base"
													>
														{
															detailsEvent.eventWebAddress
														}
													</a>
												</div>
											)}
										</div>
										</div>
									<div className="space-y-4">
										<div className="bg-slate-50 rounded-lg p-4">
											<h3 className="text-base sm:text-lg font-semibold mb-2">
												Event Info
											</h3>
											<div className="space-y-2">
												<div className="flex items-center">
													<Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
													<div>
														<div className="text-slate-7 text-sm sm:text-base">
															<span>
																{formatDate(
																	detailsEvent.startDate,
																)}
															</span>
															{detailsEvent.startTime && (
																<span className="ml-1">
																	at{" "}
																	{
																		detailsEvent.startTime
																	}
																</span>
															)}
															<span> - </span>
															<span>
																{formatDate(
																	detailsEvent.endDate,
																)}
															</span>
															{detailsEvent.endTime && (
																<span className="ml-1">
																	at{" "}
																	{
																		detailsEvent.endTime
																	}
																</span>
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
															{
																detailsEvent.locationName
															}
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
			
												<div className="flex gap-4">
													<Button
												className="mt-4"
												size="default"
												// variant="outline"
												onClick={() => {
													setShowDetailsModal(false);
													openEditEventModal(
														detailsEvent,
													);
												}}
											>
												Edit Event
											</Button>

											<Button
										className="mt-4 bg-red-600 text-white hover:bg-red-700 border-red-600"
										size="default"
										onClick={() => setShowDeleteConfirm(true)}
									>
										Delete Event
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
							from your calendar and cannot be undone.
						</p>
						
					</div>
				}
				confirmLabel="Yes, delete event"
				cancelLabel="Keep event"
				onConfirm={handleDeleteEvent}
			/>
			<Footer />
		</div>
	);
}
