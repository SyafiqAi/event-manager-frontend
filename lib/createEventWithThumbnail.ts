import { createEvent, uploadEventThumbnail } from "@/services/eventService";

export interface createEventWithThumbnailData {
  name: string;
  location: string;
  fromDate: Date;
  toDate: Date;
  thumbnail: FileList;
}

export async function createEventWithThumbnail(data: createEventWithThumbnailData) {
  const {id: eventId} = await createEvent({
      name: data.name,
      startDate: data.fromDate.toISOString(),
      endDate: data.toDate.toISOString(),
      location: data.location,
  })

  await uploadEventThumbnail(eventId, data.thumbnail)
}
