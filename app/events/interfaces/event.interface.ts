import { EventStatus } from "./eventStatus.enum";

export interface Event {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    location: string,
    posterUrl: string,
    status: EventStatus,
}