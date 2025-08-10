import { httpClient } from "@/shared/api/base-client";

export const getGuestbook = async (eventIdx: number) => {
  return httpClient
    .get(`/v1/visitor-notes/${eventIdx}`)
    .then((res) => (res.data as any).data);
};
