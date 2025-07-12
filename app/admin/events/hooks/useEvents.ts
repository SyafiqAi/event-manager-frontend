import { fetchEvents, FetchEventsParams } from "@/services/eventService";
import { useQuery } from "@tanstack/react-query";
import { Event } from "./../interfaces/event.interface";
import { PaginatedData } from "@/app/interfaces/paginatedData.interface";

export const useEvents = (params: FetchEventsParams) => {
  return useQuery<PaginatedData<Event>>({
    queryKey: ["events", params],
    queryFn: () => fetchEvents(params),
  });
};
