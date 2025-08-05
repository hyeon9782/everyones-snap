import { httpClient } from "@/shared/api/base-client";

export const downloadPhotos = async (eventIdx: number, fileIdxs: number[]) => {
  return httpClient.get(
    `/v1/events/${eventIdx}/gallery/download?fileIdxs=${fileIdxs.join(",")}`
  );
};
