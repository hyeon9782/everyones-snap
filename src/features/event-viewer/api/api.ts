import { httpClient } from "@/shared/api/base-client";

export const getEventByQrToken = async (qrToken: string) => {
  return httpClient
    .get(`/v1/events/qr/${qrToken}`)
    .then((res) => res.data.data);
};
