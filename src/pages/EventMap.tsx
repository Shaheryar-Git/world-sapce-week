import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Mock GeoJSON data (replace with actual am5geodata_worldLow or fetch it)
const worldGeoJSON = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Afghanistan", id: "AF" }, geometry: { type: "Polygon", coordinates: [[[60, 40], [65, 40], [65, 35], [60, 35], [60, 40]]] } },
    { type: "Feature", properties: { name: "Antarctica", id: "AN" }, geometry: { type: "Polygon", coordinates: [[[0, -80], [10, -80], [10, -90], [0, -90], [0, -80]]] } },
    { type: "Feature", properties: { name: "Pakistan", id: "PK" }, geometry: { type: "Polygon", coordinates: [[[60.5, 37], [75, 37], [75, 23.5], [60.5, 23.5], [60.5, 37]]] } },
    // Add more features as needed; this is a simplified example
  ],
};

const continents = {
  "AF": 0,
  "AN": 1,
  "AS": 2,
  "EU": 3,
  "NA": 4,
  "OC": 5,
  "SA": 6,
};

const EventMap = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [highlightedCountry, setHighlightedCountry] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Default map center and zoom
  const defaultPosition: [number, number] = [50, 0];
  const zoomLevel = 2;

  useEffect(() => {
    document.querySelector('.leaflet-control-attribution')?.remove();
  }, []);

  // Custom hook to manage GeoJSON layer and interactions
  const MapController = () => {
    const map = useMap();

    useEffect(() => {
      // Define color set (simulating amCharts ColorSet)
      const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff"];
      const geoJsonLayer = L.geoJSON(worldGeoJSON, {
        style: (feature) => {
          const continentIndex = continents[feature.properties.id as keyof typeof continents] || 0;
          return {
            fillColor: colors[continentIndex % colors.length],
            fillOpacity: highlightedCountry === feature.properties.id ? 0.7 : 0.3,
            weight: 1,
            color: "#666",
            dashArray: "",
          };
        },
        onEachFeature: (feature, layer) => {
          const eventCount = Math.floor(Math.random() * 100); // Mock data
          layer.bindTooltip(`${feature.properties.name}<br>Events: ${eventCount}`, { sticky: true });

          layer.on("click", (e) => {
            setHighlightedCountry(feature.properties.id);
            setIsZoomed(true);
            map.fitBounds(e.target.getBounds());
            // Redirect to a country detail page (e.g., /country/US)
            window.location.href = `/country/${feature.properties.id}`;
          });
        },
      }).addTo(map);

      // Back button control
      const backControl = L.control({ position: "topright" });
      backControl.onAdd = () => {
        const div = L.DomUtil.create("div", "back-button");
        div.innerHTML = '<button style="background-color: rgba(255, 255, 255, 0.2); color: #555; padding: 5px 10px; border: none; cursor: pointer;">Back to World</button>';
        div.style.display = isZoomed ? "block" : "none";
        return div;
      };
      backControl.addTo(map);

      // Handle back button click
      map.on("zoomend", () => {
        if (map.getZoom() <= zoomLevel) {
          setIsZoomed(false);
          setHighlightedCountry(null);
        }
      });
      L.DomEvent.on(backControl.getContainer().querySelector("button"), "click", () => {
        map.setView(defaultPosition, zoomLevel);
        setIsZoomed(false);
        setHighlightedCountry(null);
      });

      return () => {
        map.removeLayer(geoJsonLayer);
        map.removeControl(backControl);
      };
    }, [map, highlightedCountry, isZoomed]);

    return null;
  };

  return (
    <div className="bg-gradient-to-br from-[#9327e0]/5 to-[#204d74]/5 border-2 border-[#9327e0]/20 rounded-3xl p-6 sm:p-8 lg:p-12">
      <div className="w-full rounded-2xl relative overflow-hidden" style={{ height: "100vh", minHeight: "200px", maxHeight: "600px" }}>
        <MapContainer
          center={defaultPosition}
          zoom={zoomLevel}
          minZoom={2}
          maxZoom={18}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          className="rounded-2xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapController />
          {events.map((event) =>
            event.location.latitude && event.location.longitude ? (
              <Marker
                key={event._id}
                position={[event.location.latitude, event.location.longitude]}
              >
                <Popup>
                  <b>{event.details.eventTitle}</b>
                  <br />
                  {event.location.city}, {event.location.country}
                  <br />
                  {event.date.startDate}
                  <br />
                  {event.details.expectedAttendance} attendees
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default EventMap;