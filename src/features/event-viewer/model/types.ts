export interface Event {
  eventIdx: number;
  eventTitle: string;
  eventCategoryIdx: number;
  hostUserIdx: number;
  eventDt: string;
  location: string;
  eventIntro: string;
  uploadAvailableFrom: string;
  uploadAvailableUntil: string;
  downloadAvailableFrom: string;
  downloadAvailableUntil: string;
  isEventDtUpdate: "n" | "y";
  isGalleryPublic: "y" | "n";
  mainImageUrl: string;
  planIdx: number;
  qrToken: string;
  shortUrl: string;
  qrImageUrl: string;
  createDt: string;
  updateDt: string;
}
