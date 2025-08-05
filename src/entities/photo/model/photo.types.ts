export type Photo = {
  fileIdx: number;
  eventIdx: number;
  userIdx: number;
  guestIdx: number;
  mediaType: "image" | "video";
  type: string;
  url: string;
  isThumbnail: "n" | "y";
  fileSize: number;
  targetType: "gallery";
  deleteYn: "n" | "y";
  createDt: string;
  updateDt: string | null;
};
