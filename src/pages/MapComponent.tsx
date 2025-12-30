import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "../../src/MapComponent.css";
import { toast } from "sonner";

interface GeoJsonDataContext {
	id: string;
	name: string;
}

const MapComponent: React.FC = () => {
	const chartDivRef = useRef<HTMLDivElement>(null);
	const rootRef = useRef<am5.Root | null>(null);
	const [countries, setCountries] = useState<string[]>([]);
	const navigate = useNavigate();

	// Effect for initializing the map
	useEffect(() => {
		if (!chartDivRef.current) return;

		// Initialize amCharts root
		const root = am5.Root.new(chartDivRef.current);
		rootRef.current = root;

		// Set themes
		root.setThemes([am5themes_Animated.new(root)]);

		// Create map chart
		const chart = root.container.children.push(
			am5map.MapChart.new(root, {
				panX: "rotateX",
				projection: am5map.geoNaturalEarth1(),
			})
		);

		// Create polygon series
		const polygonSeries = chart.series.push(
			am5map.MapPolygonSeries.new(root, {
				geoJSON: am5geodata_worldLow,
				exclude: ["AQ"], // Exclude Antarctica
			})
		);

		// Configure polygons
		polygonSeries.mapPolygons.template.setAll({
			tooltipText: "{name}",
			fillOpacity: 1,
			strokeWidth: 1,
			strokeOpacity: 1,
		});

		// Click state for persistent highlight
		const selectedState = polygonSeries.mapPolygons.template.states.create(
			"selected",
			{
				fill: am5.color("#aaaaaa"),
				fillOpacity: 0.3,
				strokeWidth: 6,
			}
		);

		// State for countries with events
		polygonSeries.mapPolygons.template.states.create("hasEvent", {
			fill: am5.color("#9327E0"),
			fillOpacity: 0.7,
		});

		let selectedPolygon: am5map.MapPolygon | null = null;

		// Handle click events
		polygonSeries.mapPolygons.template.events.on("click", async (ev) => {
			const polygon = ev.target;
			const dataItem = ev.target
				.dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>;
			const dataContext = dataItem.dataContext as
				| GeoJsonDataContext
				| undefined;
			const id = dataContext?.id;
			const name = dataContext?.name;

			const fetchEvents = async (countryName: string) => {
				try {
					const response = await fetch(
						`${import.meta.env.VITE_API_URL}/events/${countryName}`
					);

					const data = await response.json();
					console.log("data...", data);
					if (!response.ok) {
						throw new Error(
							data.message || "Failed to fetch events"
						);
					}
					
					if (data.events) {
						console.log(`Events for ${countryName}:`, data.events);
						return data.events;
					}
					return [];
				} catch (error) {
					console.error(
						`Error fetching events for ${countryName}:`,
						error
					);
					return [];
				}
			};


			if (id && name) {
				// Fetch events for the selected country
				const events = await fetchEvents(name);
				

				// Reset previous selection
				if (selectedPolygon) {
					selectedPolygon.states.apply("default");
				}

				// Apply selected state
				polygon.states.apply("selected");
				selectedPolygon = polygon;

				// Navigate to nation page with country name and events in state
				navigate(`/nation/${encodeURIComponent(name)}`, {
					state: { countryName: name, events },
				});
			}
		});

		// Apply country highlights after data is validated
		polygonSeries.events.on("datavalidated", () => {
			const countrySet = new Set(countries.map((c: string) => c.trim()));
			polygonSeries.mapPolygons.each((polygon) => {
				const dataContext = polygon.dataItem?.dataContext as
					| GeoJsonDataContext
					| undefined;
				if (dataContext && countrySet.has(dataContext.name)) {
					polygon.states.apply("hasEvent");
				}
			});
		});

		// Cleanup on component unmount
		return () => {
			root.dispose();
		};
	}, [countries, navigate]);

	// Effect for fetching countries
	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/events/countries`
				);
				const data = await response.json();
				setCountries(data);
			} catch (error) {
				console.error("Error fetching countries with events:", error);
			}
		};

		fetchCountries();
	}, []);

	return (
		<div className="map-container">
			<div ref={chartDivRef} className="chart-div"></div>
		</div>
	);
};

export default MapComponent;
