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

export const compressedDownloadRequest = async (
  eventIdx: number,
  fileIdxs: number[]
): Promise<{ zipKey: string }> => {
  return httpClient
    .get(
      `/v1/events/${eventIdx}/gallery/compressed-download/request?fileIdxs=${fileIdxs.join(
        ","
      )}`
    )
    .then((res) => (res.data as any).data);
};

export const compressedDownloadPresignedUrl = async (
  eventIdx: number,
  zipKey: string
): Promise<{ url: string }> => {
  return httpClient
    .get(
      `/v1/events/${eventIdx}/gallery/compressed-download/presigned-url?zipKey=${zipKey}`
    )
    .then((res) => (res.data as any).data);
};
