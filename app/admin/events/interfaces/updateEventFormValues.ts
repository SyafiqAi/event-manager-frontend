import { EventStatus } from "./eventStatus.enum";

export interface UpdateEventFormValues {
  name: string;
  location: string;
  fromDate: Date | null;
  toDate: Date | null;
  thumbnail: FileList | null;
  status: EventStatus;
}
