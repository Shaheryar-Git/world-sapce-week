import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { User, Mail, Phone, Building, Globe } from "lucide-react";
import { EventType } from "@/lib/utils"; // Import EventType
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

interface EventFormProps {
  event: EventType;
  onChange: (event: EventType) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  formStep: number;
  setFormStep: (step: number) => void;
  editMode?: boolean;
}

const formSteps = ["Basic Info", "Location", "Details"];
const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-rose-500", label: "Rose" },
  { value: "bg-amber-500", label: "Amber" },
  { value: "bg-violet-500", label: "Purple" },
  { value: "bg-teal-500", label: "Teal" },
];

export default function EventForm({
  event,
  onChange,
  onSubmit,
  onImageUpload,
  onRemoveImage,
  formStep,
  setFormStep,
  editMode = false,
}: EventFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    onChange({
      ...event,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...event, eventColor: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Stepper */}
      <div className="flex items-start justify-between mb-12 gap-4">
        {formSteps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center relative group">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer 
                ${formStep >= index ? "bg-[#9327e0] text-white" : "bg-slate-200 text-slate-500 hover:scale-105"}`}
              onClick={() => formStep >= index && setFormStep(index)}
            >
              {index + 1}
            </div>
            <div className={`mt-2 text-xs text-center transition-all ${formStep === index ? "text-[#9327e0] font-semibold" : "text-slate-400"}`}>
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {formStep === 0 && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="publicContactName">Public Contact Name</Label>
              <div className="relative">
                <Input
                  id="publicContactName"
                  name="publicContactName"
                  value={event.publicContactName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="publicEmail">Public Email</Label>
              <div className="relative">
                <Input
                  id="publicEmail"
                  name="publicEmail"
                  type="email"
                  value={event.publicEmail}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  required
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="publicPhone">Public Phone</Label>
              <div className="relative">
                <Input
                  id="publicPhone"
                  name="publicPhone"
                  type="tel"
                  value={event.publicPhone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  required
                />
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="organizationName">Organization Name</Label>
              <div className="relative">
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={event.organizationName}
                  onChange={handleChange}
                  placeholder="Company or Organization"
                  required
                />
                <Building className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="eventWebAddress">Event Web Address</Label>
              <div className="relative">
                <Input
                  id="eventWebAddress"
                  name="eventWebAddress"
                  type="url"
                  value={event.eventWebAddress}
                  onChange={handleChange}
                  placeholder="http://www.example.com"
                />
                <Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="year">Year</Label>
              <Select
                value={event.year}
                onValueChange={(val) =>
                  handleChange({
                    target: { name: "year", value: val, type: "select-one" },
                  } as any)
                }
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="eventType">Event Type</Label>
              <Select
                value={event.eventType}
                onValueChange={(val) =>
                  handleChange({
                    target: { name: "eventType", value: val, type: "select-one" },
                  } as any)
                }
              >
                <SelectTrigger id="eventType">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public Event">Public Event</SelectItem>
                  <SelectItem value="Private Event">Private Event</SelectItem>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Webinar">Webinar</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="startEndType">Start/End Type</Label>
              <Select
                value={event.startEndType}
                onValueChange={(val) =>
                  handleChange({
                    target: { name: "startEndType", value: val, type: "select-one" },
                  } as any)
                }
              >
                <SelectTrigger id="startEndType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Starts During WSW">Starts During WSW</SelectItem>
                  <SelectItem value="Single Day">Single Day</SelectItem>
                  <SelectItem value="Multiple Days">Multiple Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 col-span-1 md:col-span-2 mt-2">
              <Label htmlFor="physicalEvent">Physical Event</Label>
              <input
                id="physicalEvent"
                name="physicalEvent"
                type="checkbox"
                checked={event.physicalEvent}
                onChange={handleChange}
                className="h-5 w-5 text-[#9327e0] border-gray-300 rounded focus:ring-[#9327e0] ml-2"
              />
              <span className="text-xs text-slate-500">{event.physicalEvent ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Location */}
      {formStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="country">Country</Label>
              <Input
                name="country"
                value={event.country}
                onChange={handleChange}
                placeholder="Country"
                required={event.physicalEvent}
                disabled={!event.physicalEvent}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="stateProvince">State/Province</Label>
              <Input
                name="stateProvince"
                value={event.stateProvince}
                onChange={handleChange}
                placeholder="State or Province"
                required={event.physicalEvent}
                disabled={!event.physicalEvent}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="city">City</Label>
              <Input
                name="city"
                value={event.city}
                onChange={handleChange}
                placeholder="City"
                required={event.physicalEvent}
                disabled={!event.physicalEvent}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input
                name="address"
                value={event.address}
                onChange={handleChange}
                placeholder="Street Address"
                required={event.physicalEvent}
                disabled={!event.physicalEvent}
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-1">
              <Label htmlFor="locationName">Location Name</Label>
              <Input
                name="locationName"
                value={event.locationName}
                onChange={handleChange}
                placeholder="Convention Center or Virtual Platform"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {formStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="flex gap-2">
                <Input
                  name="startDate"
                  type="date"
                  value={event.startDate}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="startTime"
                  type="time"
                  value={event.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="endDate">End Date</Label>
              <div className="flex gap-2">
                <Input
                  name="endDate"
                  type="date"
                  value={event.endDate}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="endTime"
                  type="time"
                  value={event.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input
                name="eventTitle"
                value={event.eventTitle}
                onChange={handleChange}
                placeholder="Annual Tech Conference 2025"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="eventColor">Event Color</Label>
              <select
                name="eventColor"
                value={event.eventColor}
                onChange={handleColorChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="eventDescription">Event Description</Label>
            <Textarea
              name="eventDescription"
              value={event.eventDescription}
              onChange={handleChange}
              rows={4}
              placeholder="Include details about the event and timing information"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="expectedAttendance">Expected Attendance</Label>
            <Input
              name="expectedAttendance"
              type="number"
              min="1"
              value={event.expectedAttendance}
              onChange={handleChange}
              placeholder="100"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="promotionalImage">Promotional Image</Label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              {!event.promotionalImage ? (
                <div className="space-y-2">
                  <div className="text-4xl text-slate-400 mx-auto w-fit">📷</div>
                  <p className="text-xs text-slate-500">Drag & drop your image here or click to browse</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    className="mx-auto"
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={event.promotionalImage}
                    alt="Event promotional"
                    className="max-h-32 mx-auto rounded"
                  />
                  <Button
                    type="button"
                    onClick={onRemoveImage}
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                  >
                    ✕
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-8">
        {formStep > 0 && (
          <Button type="button" variant="secondary" onClick={() => setFormStep(formStep - 1)}>
            Previous
          </Button>
        )}
        {formStep < 2 && (
          <Button type="button" onClick={() => setFormStep(formStep + 1)} className="ml-auto">
            Next
          </Button>
        )}
        {formStep === 2 && (
          <Button type="submit" className="ml-auto">
            {editMode ? "Update Event" : "Save Event"}
          </Button>
        )}
      </div>
    </form>
  );
}