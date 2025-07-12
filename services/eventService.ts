import { EventStatus } from "@/app/admin/events/interfaces/eventStatus.enum";
import { CreateEventBody } from "@/interfaces/createEventBody";
import { UpdateEventBody } from "@/interfaces/updateEventBody";

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

export const updateEvent = async (eventId: number, body: UpdateEventBody) => {
  const token = localStorage.getItem("accessToken");

  let url = `http://localhost:9000/events/${eventId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update event");
  }
};

export const uploadEventThumbnail = async (
  eventId: number,
  fileList: FileList,
) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");
  if (!fileList.length) throw new Error("No file selected");

  const formData = new FormData();
  formData.append("file", fileList[0]); // Assuming single file for now

  const res = await fetch(`http://localhost:9000/events/${eventId}/poster`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to upload image");
  }
};

export const getOneEvent = async (eventId: number) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await fetch(`http://localhost:9000/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to get event");
  }

  return await res.json();
};

export const deleteEvent = async (eventId: number, password: string) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await fetch(`http://localhost:9000/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete event");
  }
};
