import { fetchEvents } from "@/services/eventService";
import { useQuery } from "@tanstack/react-query";
import { Event } from "../interfaces/event.interface";
import { PaginatedData } from "@/app/interfaces/paginatedData.interface";

export const useEvents = (page: number, pageSize: number) => {
  return useQuery<PaginatedData<Event>>({
    queryKey: ["events", page, pageSize],
    queryFn: () => fetchEvents(page, pageSize),
  });
};
