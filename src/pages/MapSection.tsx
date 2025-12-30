import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

interface MapSectionProps {
	countryName: string;
	events: any[]; // Events data with lat/lng for pinning
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
	const [mapType, setMapType] = useState<"map" | "satellite">("map");

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

				{/* Pin events on the map using lat/lng from event model */}
				{events.map((event) => {
					const lat = event.location?.latitude;
					const lng = event.location?.longitude;
					// if (lat && lng) {
					//   return (
					//     // <Marker key={event._id} position={[lat, lng]}>
					//     //   <Popup>{event.title || event.name || 'Event'}</Popup>
					//     // </Marker>
					//   );
					// }
					return null;
				})}
			</MapContainer>

		</div>
	);
};

export default MapSection;
