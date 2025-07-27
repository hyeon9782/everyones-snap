import { httpClient } from "@/shared/api/base-client";

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
