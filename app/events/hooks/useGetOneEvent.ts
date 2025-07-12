'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getOneEvent } from '@/services/eventService';
import { Event } from '@/app/events/interfaces/event.interface';

export function useGetOneEvent() {
  const params = useParams();

  return useQuery<Event>({
    queryKey: ['event', params.id],
    queryFn: () => getOneEvent(Number(params.id)),
    enabled: !!params.id, // only run query if id exists
  });
}
