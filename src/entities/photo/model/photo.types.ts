export type Photo = {
  fileIdx: number;
  eventIdx: number;
  userIdx: number;
  guestIdx: number;
  mediaType: string;
  type: string;
  url: string;
  isThumbnail: "n" | "y";
  fileSize: number;
  fileName: string | null;
  targetType: "gallery" | "event";
  deleteYn: "n" | "y";
  createDt: string;
  updateDt: string | null;
  isBookmarked: boolean;
};
