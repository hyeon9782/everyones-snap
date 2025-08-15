import { httpClient } from "@/shared/api/base-client";
import { GuestRegistRequest, GuestResponse } from "../model/types";

export const registGuest = async (
  eventIdx: number,
  request: GuestRegistRequest
) => {
  return httpClient
    .post(`/v1/events/${eventIdx}/guests`, {
      name: request.name,
      deviceId: request.deviceId,
    })
    .then((res) => (res.data as any).data as GuestResponse);
};
