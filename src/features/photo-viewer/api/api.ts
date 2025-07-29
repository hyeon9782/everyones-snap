import { httpClient } from "@/shared/api/base-client";
import { GalleryResponse } from "../model/types";

export const getPhotos = async (qrToken: string): Promise<GalleryResponse> => {
  return httpClient
    .get(`/v1/events/gallery?qrToken=${qrToken}&page=1&limit=20`)
    .then((res) => res.data.data);
};
