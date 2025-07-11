import { EventStatus } from "@/app/events/interfaces/eventStatus.enum";

enum SortBy {
  NAME = "name",
  START_DATE = "startDate",
  END_DATE = "endDate",
  LOCATION = "location",
}

export interface FetchEventsParams {
  search?: string;
  sortBy?: SortBy;
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
