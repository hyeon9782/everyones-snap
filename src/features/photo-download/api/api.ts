import { httpClient } from "@/shared/api/base-client";
import { PresignedUrl } from "../model/types";

export const downloadPhotos = async (
  eventIdx: number,
  fileIdxs: number[]
): Promise<PresignedUrl> => {
  return httpClient
    .get(
      `/v1/events/${eventIdx}/gallery/download?fileIdxs=${fileIdxs.join(",")}`
    )
    .then((res) => (res.data as any).data);
};
