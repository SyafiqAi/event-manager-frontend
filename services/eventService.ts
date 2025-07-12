import { EventStatus } from "@/app/events/interfaces/eventStatus.enum";
import { CreateEventBody } from "@/interfaces/createEventBody";

export interface FetchEventsParams {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  fromDate?: Date;
  toDate?: Date;
  status?: EventStatus;
  page?: number;
  pageSize?: number;
}

export const fetchEvents = async ({
  search,
  sortBy,
  sortOrder,
  fromDate,
  toDate,
  status,
  page = 1,
  pageSize = 10,
}: FetchEventsParams) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", pageSize.toString());

  if (search) params.append("search", search);
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (fromDate) params.append("fromDate", fromDate.toISOString());
  if (toDate) params.append("toDate", toDate.toISOString());
  if (status) params.append("status", status);

  let url = `http://localhost:9000/events?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch events");
  }

  const js = await res.json();
  console.log({ js });
  return js;
};

export const createEvent = async (body: CreateEventBody) => {
  const token = localStorage.getItem("accessToken");

  let url = `http://localhost:9000/events`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create event");
  }

  const js = await res.json();
  console.log({ js });
  return js;
};
