import { httpClient } from "@/shared/api/base-client";

export const writeGuestbook = async ({
  eventIdx,
  guestName,
  content,
}: {
  eventIdx: number;
  guestName: string;
  content: string;
}) => {
  return httpClient
    .post(`/v1/visitor-notes`, {
      eventIdx,
      guestName,
      content,
    })
    .then((res) => (res.data as any).data);
};

export const updateGuestbook = async ({
  visitorNoteIdx,
  content,
}: {
  visitorNoteIdx: number;
  content: string;
}) => {
  return httpClient
    .put(`/v1/visitor-notes/${visitorNoteIdx}`, {
      content,
    })
    .then((res) => (res.data as any).data);
};

export const deleteGuestbook = async ({
  visitorNoteIdx,
}: {
  visitorNoteIdx: number;
}) => {
  return httpClient
    .delete(`/v1/visitor-notes/${visitorNoteIdx}`)
    .then((res) => (res.data as any).data);
};
