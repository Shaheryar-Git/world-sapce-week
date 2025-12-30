import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Event {
	id: string | number;
	name?: string;
	latitude: number;
	longitude: number;
}

const WorldSpaceWeek2013: React.FC = () => {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<L.Map | null>(null);
	const location = useLocation();
	const navigate = useNavigate();

	const state = (location && (location as any).state) || {};
	const year: string | undefined = state?.year;
	const passedEvents: any[] = Array.isArray(state?.events)
		? state.events
		: [];

	const events: Event[] = passedEvents
		.map((e: any) => {
			const lat = e?.location?.latitude;
			const lng = e?.location?.longitude;
			if (typeof lat === "number" && typeof lng === "number") {
				return {
					id: e?._id || e?.id || `${lng},${lat}`,
					name: e?.name || e?.title || "Event",
					latitude: lat,
					longitude: lng,
				} as Event;
			}
			return null;
		})
		.filter(Boolean) as Event[];

	useEffect(() => {
		if (!state || !Array.isArray(passedEvents)) {
			navigate("/events");
		}
	}, [state, passedEvents, navigate]);

	useEffect(() => {
		if (!mapContainerRef.current) return;

		const defaultIcon = L.icon({
			iconUrl: iconUrl as unknown as string,
			iconRetinaUrl: iconRetinaUrl as unknown as string,
			shadowUrl: iconShadowUrl as unknown as string,
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			tooltipAnchor: [16, -28],
			shadowSize: [41, 41],
		});

		const initialCenter: L.LatLngExpression = [20, 0];
		const map = L.map(mapContainerRef.current).setView(initialCenter, 2);
		mapRef.current = map;

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18,
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		const markers: L.Marker[] = [];
		events.forEach((evt) => {
			const marker = L.marker([evt.latitude, evt.longitude], {
				icon: defaultIcon,
			}).addTo(map);
			// const title = evt.name || "Event";
			// marker.bindPopup(`<b>${title}</b>`);
			markers.push(marker);
		});

		if (markers.length > 0) {
			const group = L.featureGroup(markers);
			map.fitBounds(group.getBounds().pad(0.2));
		}

		return () => {
			map.remove();
		};
	}, [year, events]);

	useEffect(() => {
		document.querySelector(".leaflet-control-attribution")?.remove();
	}, []);

	return (
		<div className="relative flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
			<Navigation />

			<main className="flex-grow flex flex-col items-center text-center px-4 md:px-10 mt-10">
				<h2 className="text-3xl md:text-4xl font-bold mt-12 text-blue-700 drop-shadow-sm">
					{year || "World Space Week Events"}
				</h2>

				<p className="text-gray-600 mt-2">
					Displaying <strong>{events.length}</strong>{" "}
					{year ? `mapped events for ${year}` : "events"} around the
					world.
				</p>

				<div className="relative w-full max-w-5xl h-[450px] md:h-[550px] bg-white rounded-2xl shadow-md mt-8 overflow-hidden border border-gray-200">
					<div
						ref={mapContainerRef}
						style={{ height: "100%", width: "120%", zIndex: 1 }}
					></div>
				</div>
			</main>

			<div className="mt-8">
				<Footer />
			</div>
		</div>
	);
};

export default WorldSpaceWeek2013;
