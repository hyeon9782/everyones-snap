import { httpClient } from "@/shared/api/base-client";
import { Guestbook } from "../model/types";

export const getGuestbook = async (eventIdx: number) => {
  return httpClient
    .get(`/v1/visitor-notes/events/${eventIdx}`)
    .then((res) => (res.data as any).data as Guestbook[]);
};

export const getGuestbookById = async (visitorNoteIdx: number) => {
  return httpClient
    .get(`/v1/visitor-notes/${visitorNoteIdx}`)
    .then((res) => (res.data as any).data as Guestbook);
};
