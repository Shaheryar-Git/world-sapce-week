import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "../../src/MapComponent.css";

interface GeoJsonDataContext {
  id: string;
  name: string;
}

const MapComponent: React.FC = () => {
  const chartDivRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
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

    // Hover state
    // polygonSeries.mapPolygons.template.states.create("hover", {
    //   fill: root.interfaceColors.get("primaryButtonHover"),
    // });

    // // Active state
    // polygonSeries.mapPolygons.template.states.create("active", {
    //   fill: root.interfaceColors.get("primaryButtonHover"),
    // });

    // Highlight countries with events
    polygonSeries.mapPolygons.template.states.create("hasEvent", {
      fill: am5.color("#9327E0"),
      fillOpacity: 0.7,
    });

    let selectedPolygon: am5map.MapPolygon | null = null;

    // CLICK HANDLER (UNCHANGED LOGIC)
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

    return () => {
      root.dispose();
    };
  }, [countries, navigate]);

  // FETCH COUNTRIES
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/events/countries`
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="map-container">
      <div ref={chartDivRef} className="chart-div" />
    </div>
  );
};

export default MapComponent;
