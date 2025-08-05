export interface UploadPhoto {
  eventIdx: number;
  userIdx: number;
  guestIdx: number;
  mediaType: "image" | "video";
  type: string;
  url: string;
  isThumbnail: string;
  fileSize: number;
}
