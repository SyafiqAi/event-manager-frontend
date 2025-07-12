import { EventStatus } from "@/app/events/interfaces/eventStatus.enum";
import {
  createEvent,
  updateEvent,
  uploadEventThumbnail,
} from "@/services/eventService";

export interface updateEvent {
  name: string;
  location: string;
  fromDate: Date;
  toDate: Date;
  status: EventStatus;
  thumbnail?: FileList | null;
}

export async function updateEventWithThumbnail(
  eventId: number,
  data: updateEvent,
) {
  console.log("Submitted data:", data);
  await updateEvent(eventId, {
    name: data.name,
    startDate: data.fromDate.toISOString(),
    endDate: data.toDate.toISOString(),
    location: data.location,
    status: data.status,
  });

  if (data.thumbnail) {
    await uploadEventThumbnail(eventId, data.thumbnail);
  }
}
