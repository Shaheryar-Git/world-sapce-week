import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface EventType {
  id?: string;
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
}

export const initialEvent: EventType = {
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
};

export function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validateForm(event: EventType) {
  const requiredFields = [
    "publicContactName",
    "publicEmail",
    "publicPhone",
    "organizationName",
    "eventType",
    "startEndType",
    "startDate",
    "endDate",
    "eventTitle",
    "eventDescription",
    "expectedAttendance",
  ];
  if (event.physicalEvent) {
    requiredFields.push("country", "stateProvince", "city", "address", "locationName");
  } else {
    requiredFields.push("locationName");
  }
  return requiredFields.every(
    (field) =>
      event[field as keyof EventType] &&
      (typeof event[field as keyof EventType] !== "string" ||
        (event[field as keyof EventType] as string).trim() !== "")
  );
}
