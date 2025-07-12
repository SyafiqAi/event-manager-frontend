"use client"
import { useGetOneEvent } from "@/app/admin/events/hooks/useGetOneEvent";

export default function showEventPage() {
    const {data: event} = useGetOneEvent();

    if(!event) {
        return <div></div>
    }
    
    return <div>
        {event.name}
        {event.status}
        {event.startDate}
        {event.location}
        {event.endDate}
        <img src={`http://localhost:9000${event.posterUrl}`} alt={event.name} />
    </div>
}