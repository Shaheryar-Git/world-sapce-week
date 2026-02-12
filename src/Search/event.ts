import { getLocalDateString } from "@/lib/utils";

export interface EventData {
  id: string;
  publicContactName: string;
  publicEmail: string;
  publicPhone: string;
  organizationName: string;
  eventWebAddress: string;
  year: string;
  physicalEvent: boolean;
  eventType: string;
  startEndType: string;
  country: string;
  stateProvince: string;
  city: string;
  address: string;
  locationName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  eventTitle: string;
  eventDescription: string;
  promotionalImage: string | null;
  expectedAttendance: string;
  eventColor: string;
  latitude: number | null;
  longitude: number | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  terms?: boolean;
}

export interface CalendarDay {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: EventData[];
}

export interface ColorOption {
  value: string;
  label: string;
}

export const formSteps = ["Basic Info", "Location", "Details"];

export const initialEvent: EventData = {
  id: "",
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

export const colorOptions: ColorOption[] = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-rose-500", label: "Rose" },
  { value: "bg-amber-500", label: "Amber" },
  { value: "bg-violet-500", label: "Purple" },
  { value: "bg-teal-500", label: "Teal" },
];

export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];