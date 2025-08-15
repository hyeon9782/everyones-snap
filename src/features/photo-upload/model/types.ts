export interface UploadPhoto {
  eventIdx: number;
  userIdx: number;
  guestIdx: number;
  mediaType: "image" | "video";
  fileName: string;
  type: string;
  url: string;
  isThumbnail: string;
  fileSize: number;
}

export type UplaodStatus = "uploading" | "s3-completed" | "completed" | "error";
