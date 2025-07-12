import { EventStatus } from "@/app/admin/events/interfaces/eventStatus.enum";
import { CreateEventBody } from "./createEventBody";

export interface UpdateEventBody extends CreateEventBody {
    status: EventStatus
}