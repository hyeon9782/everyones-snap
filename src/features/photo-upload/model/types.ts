export interface UploadPhoto {
  eventIdx: number;
  userIdx: number;
  guestIdx: number;
  type: string;
  url: string;
  isThumbnail: string;
  duration: string | null;
}
