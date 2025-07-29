import { httpClient } from "@/shared/api/base-client";
import { UploadPhoto } from "../model/types";

export const getPresignedUrl = async ({
  mimetype,
  type,
  extension,
  id,
}: {
  mimetype: string;
  type: string;
  extension: string;
  id: string;
}) => {
  return httpClient.get(
    `/v1/file/presigned-url?mimetype=${mimetype}&type=${type}&extension=${extension}&id=${id}`
  );
};

export const uploadPhotos = async ({
  eventIdx,
  files,
}: {
  eventIdx: number;
  files: UploadPhoto[];
}) => {
  return httpClient.post(`/v1/events/${eventIdx}/gallery/upload`, files);
};
