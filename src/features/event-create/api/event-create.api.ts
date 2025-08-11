import { httpClient } from "@/shared/api/base-client";
import { Event } from "@/features/event-viewer/model/types";
export type CreateEvent = {
  eventTitle: string;
  eventCategoryIdx: number;
  hostUserIdx: number;
  eventDt: string;
  location: string;
  eventIntro: string;
  mainImageUrl: string;
  isGalleryPublic: "y" | "n";
};

export type UpdateEvent = CreateEvent & {
  planIdx: number;
  qrToken: string;
  shortUrl: string;
  qrImageUrl: string;
};

export const createEvent = async (event: CreateEvent) => {
  return httpClient.post("/v1/events", event);
};

export const updateEvent = async (event: UpdateEvent, eventIdx: number) => {
  return httpClient.put(`/v1/events/${eventIdx}`, event);
};

export const deleteEvent = async (eventIdx: number) => {
  return httpClient.delete(`/v1/events/${eventIdx}`);
};

export const getEventList = async (userIdx: number) => {
  return httpClient
    .get(`/v1/users/${userIdx}/events`)
    .then((res) => (res.data as any).data.events as Event[]);
};
