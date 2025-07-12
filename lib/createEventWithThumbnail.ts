import CreateNewEvent from "@/app/events/create/page";
import { createEvent } from "@/services/eventService";

export interface createEventWithThumbnailData {
  name: string;
  location: string;
  fromDate: Date;
  toDate: Date;
  thumbnail: FileList;
}

export async function createEventWithThumbnail(data: createEventWithThumbnailData) {
  console.log("Submitted data:", data);
  await createEvent({
      name: data.name,
      startDate: data.fromDate.toISOString(),
      endDate: data.toDate.toISOString(),
      location: data.location,
  })
}
