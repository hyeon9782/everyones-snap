import { httpClient } from "@/shared/api/base-client";
import { GalleryResponse } from "../model/types";

export const getPhotos = async ({
  qrToken,
  userIdx,
  guestIdx,
  onlyMyFiles,
  fileType,
  sortBy,
  bookmarked,
  sortOrder,
}: {
  qrToken: string;
  userIdx: number;
  guestIdx: number;
  onlyMyFiles: string;
  fileType: string;
  sortBy: string;
  bookmarked: string;
  sortOrder: string;
}): Promise<GalleryResponse> => {
  return httpClient
    .get(
      `/v1/events/gallery/${qrToken}?page=1&limit=10&userIdx=${userIdx}&guestIdx=${guestIdx}&onlyMyFiles=${onlyMyFiles}&fileType=${fileType}&sortBy=${sortBy}&bookmarked=${bookmarked}&sortOrder=${sortOrder}`
    )
    .then((res) => res.data.data);
};
