import React, { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import axios from "axios";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "../../src/MapComponent.css";

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

const WorldSpaceWeek2013: React.FC = () => {
	const chartDivRef = useRef<HTMLDivElement>(null);
	const location = useLocation();
	const navigate = useNavigate();

	const state = (location && (location as any).state) || {};
	const year: string | undefined = state?.year;
	const passedEvents: any[] = Array.isArray(state?.events) ? state.events : [];

	const mapEvents: MapEvent[] = useMemo(
		() =>
			passedEvents
				.map((e: any) => {
					const lat = e?.location?.latitude;
					const lng = e?.location?.longitude;
					if (typeof lat === "number" && typeof lng === "number") {
						return {
							id: e?._id || e?.id || `${lng},${lat}`,
							eventTitle:
								e?.details?.eventTitle ||
								e?.name ||
								e?.title ||
								"Event Information",
							organizationName:
								e?.organization?.organizationName || "",
							city: e?.location?.city || e?.city || "",
							country: e?.location?.country || e?.country || "",
							expectedAttendance:
								e?.details?.expectedAttendance ||
								e?.expectedAttendance ||
								"",
							latitude: lat,
							longitude: lng,
						} as MapEvent;
					}
					return null;
				})
				.filter(Boolean) as MapEvent[],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state]
	);

	const eventCountries = useMemo(
		() => [...new Set(mapEvents.map((e) => e.country).filter(Boolean))],
		[mapEvents]
	);

	useEffect(() => {
		if (!state || !Array.isArray(passedEvents)) {
			navigate("/events");
		}
	}, [state, passedEvents, navigate]);

	const fetchEventById = async (eventId: string) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/getEvent/${eventId}`
			);
			const event = response.data?.data;
			navigate(`/event/${eventId}`, { state: { event } });
		} catch (error) {
			console.error("Failed to fetch event:", error);
		}
	};

	useEffect(() => {
		if (!chartDivRef.current) return;

		const root = am5.Root.new(chartDivRef.current);

		root.setThemes([am5themes_Animated.new(root)]);

		const chart = root.container.children.push(
			am5map.MapChart.new(root, {
				panX: "translateX",
				panY: "translateY",
				projection: am5map.geoMercator(),
			})
		);

		// Zoom controls
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
		zoomControl.homeButton.set("visible", true);

		// World polygon series
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

		polygonSeries.mapPolygons.template.states.create("hasEvent", {
			fill: am5.color("#9327E0"),
			fillOpacity: 0.7,
		});

		let selectedPolygon: am5map.MapPolygon | null = null;

		// Country click handler
		polygonSeries.mapPolygons.template.events.on("click", async (ev) => {
			const polygon = ev.target;
			const dataItem =
				polygon.dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>;
			const dataContext = dataItem?.dataContext as
				| GeoJsonDataContext
				| undefined;
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

		// Highlight countries that have events
		polygonSeries.events.on("datavalidated", () => {
			const countrySet = new Set(eventCountries.map((c) => c.trim()));
			polygonSeries.mapPolygons.each((polygon) => {
				const dataContext = polygon.dataItem?.dataContext as
					| GeoJsonDataContext
					| undefined;
				if (dataContext && countrySet.has(dataContext.name)) {
					polygon.states.apply("hasEvent");
				}
			});
		});

		// Pulsating bullets for event locations
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
						tooltipText:
							"[bold]{eventTitle}[/]\n{organizationName}[/]\n{city}, {country}[/]\nAttendance: {expectedAttendance}[/]",
						cursorOverStyle: "pointer",
					})
				);

				innerCircle.events.on("click", (ev) => {
					const dataItem = ev.target.dataItem as any;
					const eventId = dataItem?.dataContext?.id;
					if (eventId) {
						fetchEventById(eventId);
					}
				});

				return am5.Bullet.new(root, { sprite: container });
			});

			pointSeries.data.setAll(
				mapEvents.map((e) => ({
					geometry: {
						type: "Point" as const,
						coordinates: [e.longitude, e.latitude] as [
							number,
							number,
						],
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
	}, [mapEvents, eventCountries, navigate]);

	return (
		<div className="relative flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
			<Navigation />

			<main className="flex-grow flex flex-col items-center text-center px-4 md:px-10 mt-10">
				<h2 className="text-3xl md:text-4xl font-bold mt-12 text-blue-700 drop-shadow-sm">
					{year || "World Space Week Events"}
				</h2>

				<p className="text-gray-600 mt-2">
					Displaying <strong>{mapEvents.length}</strong>{" "}
					{year ? `mapped events for ${year}` : "events"} around the
					world.
				</p>
			</main>

			<div className="map-container">
				<div ref={chartDivRef} className="chart-div" />
			</div>

			<div className="mt-8">
				<Footer />
			</div>
		</div>
	);
};

export default WorldSpaceWeek2013;
