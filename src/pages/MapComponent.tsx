import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "../../src/MapComponent.css";
import axios from "axios";

interface GeoJsonDataContext {
  id: string;
  name: string;
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

const MapComponent: React.FC = () => {
  const chartDivRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [mapEvents, setMapEvents] = useState<MapEvent[]>([]);
  const navigate = useNavigate();

  // Initialize Map
  useEffect(() => {
    
    
    if (!chartDivRef.current) return;
    const root = am5.Root.new(chartDivRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    // ────────────────────────────────────────────────
    // ADD ZOOM CONTROLS (+ / − buttons + Home button)
    // ────────────────────────────────────────────────
    const zoomControl = chart.set(
      "zoomControl",
      am5map.ZoomControl.new(root, {
        x: am5.percent(100),
        centerX: am5.percent(100),
        y: am5.percent(50),
        centerY: am5.percent(50),
        marginRight: 15,
        marginTop: 15,
      })
    );

    // Optional: show Home button (globe icon → reset to world view)
    zoomControl.homeButton.set("visible", true);

    // WORLD POLYGON SERIES
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      toggleKey: "active",
      strokeWidth: 1,
    });

    // Highlight countries with events
    polygonSeries.mapPolygons.template.states.create("hasEvent", {
      fill: am5.color("#9327E0"),
      fillOpacity: 0.7,
    });

    let selectedPolygon: am5map.MapPolygon | null = null;

    // CLICK HANDLER
    polygonSeries.mapPolygons.template.events.on("click", async (ev) => {
      const polygon = ev.target;
      const dataItem =
        polygon.dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>;
      const dataContext = dataItem?.dataContext as GeoJsonDataContext | undefined;

      if (!dataContext?.name) return;

      const fetchEvents = async (countryName: string) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/events/${countryName}`
          );
          const data = await response.json();
          return response.ok ? data.events || [] : [];
        } catch {
          return [];
        }
      };

      const events = await fetchEvents(dataContext.name);

      if (selectedPolygon) {
        selectedPolygon.states.apply("default");
      }

      polygon.states.apply("active");
      selectedPolygon = polygon;

      navigate(`/nation/${encodeURIComponent(dataContext.name)}`, {
        state: { countryName: dataContext.name, events },
      });
    });

    // Apply highlights AFTER countries are fetched
    polygonSeries.events.on("datavalidated", () => {
      const countrySet = new Set(countries.map((c) => c.trim()));
      polygonSeries.mapPolygons.each((polygon) => {
        const dataContext = polygon.dataItem?.dataContext as
          | GeoJsonDataContext
          | undefined;

        if (dataContext && countrySet.has(dataContext.name)) {
          polygon.states.apply("hasEvent");
        }
      });
    });

    // PULSATING BULLETS FOR EVENT LOCATIONS
    if (mapEvents.length > 0) {
      const pointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
      );

      pointSeries.bullets.push(() => {
        const container = am5.Container.new(root, {});

        // Outer pulsating ring
        const outerCircle = container.children.push(
          am5.Circle.new(root, {
            radius: 7,
            fill: am5.color("#bc35ff"),
            fillOpacity: 0.5,
            strokeOpacity: 0,
          })
        );

        outerCircle.animate({
          key: "radius",
          from: 7,
          to: 22,
          duration: 1600,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        });

        outerCircle.animate({
          key: "fillOpacity",
          from: 0.5,
          to: 0,
          duration: 1600,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        });

        // Inner solid dot with tooltip
        const innerCircle = container.children.push(
          am5.Circle.new(root, {
            radius: 6,
            fill: am5.color("#4700b1"),
            strokeOpacity: 0,
            tooltipText: "[bold]{eventTitle}[/]\n{organizationName}[/]\n{city}, {country}[/]\nAttendance: {expectedAttendance}[/]",
            cursorOverStyle: "pointer",
          })
        );

        innerCircle.events.on("click", (ev) => {
          const dataItem = ev.target.dataItem as any;
          const eventId = dataItem?.dataContext?.id;
          if (eventId) {
            fetchEventById(eventId).then((data) => {
              console.log("Event data:", data);
            });
          }
        });

        return am5.Bullet.new(root, { sprite: container });
      });

      pointSeries.data.setAll(
        mapEvents.map((e) => ({
          geometry: {
            type: "Point" as const,
            coordinates: [e.longitude, e.latitude] as [number, number],
          },
          id: e.id,
          eventTitle: e.eventTitle,
          organizationName: e.organizationName,
          city: e.city,
          country: e.country,
          expectedAttendance: e.expectedAttendance,
        }))
      );
    }

    return () => {
      root.dispose();
    };
  }, [countries, mapEvents, navigate]);

  // FETCH COUNTRIES WITH EVENTS
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/events/countries`
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // FETCH ALL MAPPED EVENTS FOR PULSATING BULLETS
  useEffect(() => {
    const fetchMapEvents = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/event/mappedEvents/true/${currentYear}`
        );
        const data = await response.json();
        console.log("data", data);
        const raw: any[] = data?.data || [];

        const events: MapEvent[] = raw
          .filter(
            (e) =>
              typeof e?.location?.latitude === "number" &&
              typeof e?.location?.longitude === "number"
          )
          .map((e) => ({
            id: e?._id || e?.id || "",
            // Try multiple possible shapes for title & org name
            eventTitle:
              e?.details?.eventTitle ||
              "Event Information",
            organizationName:
              e?.organization?.organizationName ||
              e?.organizationName ||
              "",
            // City / country may be nested under location or flat on the object
            city: e?.location?.city || e?.city || "",
            country: e?.location?.country || e?.country || "",
            // Attendance can be nested in details or flat
            expectedAttendance:
              e?.details?.expectedAttendance ||
              e?.expectedAttendance ||
              "",
            latitude: e.location.latitude,
            longitude: e.location.longitude,
          }));

        setMapEvents(events);

        console.log("Mapped events:", events);
        

      } catch (error) {
        console.error("Failed to fetch map events:", error);
      }
    };

    fetchMapEvents();
  }, []);

  const fetchEventById = async (eventId: string) => {
  try {
   const response = await axios.get(`${import.meta.env.VITE_API_URL}/getEvent/${eventId}`);
      const event = response.data?.data;
      console.log("event", event);
      navigate(`/event/${eventId}`, {
        state: { event },
      });
    
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
};


  return (
    <div className="map-container">
      <div ref={chartDivRef} className="chart-div" />
    </div>
  );
};

export default MapComponent;