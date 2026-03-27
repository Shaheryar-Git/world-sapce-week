import React, { useState, useEffect, useMemo } from "react";
import {
	MapContainer,
	TileLayer,
	useMap,
	Marker,
	Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapSectionProps {
	countryName: string;
	events: any[]; // Events data with lat/lng for pinning
}

interface MapEvent {
	id: string;
	eventTitle: string;
	organizationName: string;
	city: string;
	country: string;
	expectedAttendance: string | number;
	latitude: number;
	longitude: number;
}

// Component to update map center and zoom when country changes
const MapUpdater: React.FC<{ countryName: string }> = ({ countryName }) => {
	const map = useMap();

	useEffect(() => {
		if (countryName) {
			fetch(
				`https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(
					countryName
				)}&format=json&limit=1`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data && data[0]) {
						const boundingbox = data[0].boundingbox;
						const minLat = parseFloat(boundingbox[0]);
						const maxLat = parseFloat(boundingbox[1]);
						const minLon = parseFloat(boundingbox[2]);
						const maxLon = parseFloat(boundingbox[3]);
						map.fitBounds([
							[minLat, minLon],
							[maxLat, maxLon],
						]);
					} else {
						console.warn(
							`No data found for country: ${countryName}`
						);
					}
				})
				.catch((err) =>
					console.error("Error fetching country bounds:", err)
				);
			console.log("data...", countryName);
		}
	}, [countryName, map]);

	return null;
};

const MapSection: React.FC<MapSectionProps> = ({ countryName, events }) => {
	const [mapType, setMapType] = useState<"map">("map");
	const [mapEvents, setMapEvents] = useState<MapEvent[]>([]);

	const pinIcon = useMemo(
		() =>
			L.divIcon({
				 className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="#9327e0"/>
    <circle cx="14" cy="14" r="6" fill="white"/>
  </svg>`,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -36],
			}),
		[]
	);

	// Get country name from URL or fallback to prop
	const urlParams = new URLSearchParams(window.location.search);
	const countryFromUrl = urlParams.get("name") || countryName;

	console.log("Country from URL or prop:", countryFromUrl);

	// Tile layer URLs
	const mapTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const satelliteTileUrl =
		"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
	const tileUrl = mapType === "map" ? mapTileUrl : satelliteTileUrl;
	const attribution =
		mapType === "map"
			? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			: "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";

	// Fetch mapped events for the current year using the dedicated API.
	// This is used solely for marker / cluster data and does not interfere
	// with the existing /events/countries logic used elsewhere.
	useEffect(() => {
		const fetchMapEvents = async () => {
			try {
				const currentYear = new Date().getFullYear();
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/event/mappedEvents/true/${currentYear}`
				);
				const data = await response.json();
				const raw: any[] = data?.data || [];

				const mapped: MapEvent[] = raw
					.filter(
						(e) =>
							typeof e?.location?.latitude === "number" &&
							typeof e?.location?.longitude === "number"
					)
					.map((e) => ({
						id: e?._id || e?.id || "",
						eventTitle:
							e?.details?.eventTitle || "Event Information",
						organizationName:
							e?.organization?.organizationName ||
							e?.organizationName ||
							"",
						city: e?.location?.city || e?.city || "",
						country: e?.location?.country || e?.country || "",
						expectedAttendance:
							e?.details?.expectedAttendance ||
							e?.expectedAttendance ||
							"",
						latitude: e.location.latitude,
						longitude: e.location.longitude,
					}));

				setMapEvents(mapped);
			} catch (error) {
				console.error("Failed to fetch mapped events:", error);
			}
		};

		fetchMapEvents();
	}, []);

	return (
		<div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden mt-8">
			{/* Leaflet Map */}
			<MapContainer
				center={[0, 0]} // Initial center (updated by MapUpdater)
				zoom={2}
				style={{ height: "100%", width: "100%" }}
				className="z-0"
			>
				<TileLayer url={tileUrl} attribution={attribution} />
				<MapUpdater countryName={countryFromUrl} />

				{/* Simple markers using /event/mappedEvents/:physicalEvent/:year */}
				{mapEvents.map((event) => (
					<Marker
						key={event.id}
						position={[event.latitude, event.longitude]}
						icon={pinIcon}
					>
						<Popup>
							<div className="space-y-1">
								<div className="font-semibold">
									{event.eventTitle}
								</div>
								{event.organizationName && (
									<div className="text-sm text-muted-foreground">
										{event.organizationName}
									</div>
								)}
								<div className="text-sm">
									{[event.city, event.country]
										.filter(Boolean)
										.join(", ")}
								</div>
								{event.expectedAttendance && (
									<div className="text-xs text-muted-foreground">
										Attendance: {event.expectedAttendance}
									</div>
								)}
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>

		</div>
	);
};

export default MapSection;
