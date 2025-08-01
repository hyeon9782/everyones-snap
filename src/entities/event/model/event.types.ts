export type Event = {
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
  isEventDtUpdate: string;
  isGalleryPublic: string;
  mainImageUrl: string;
  planIdx: number | null;
  qrToken: string;
  shortUrl: string;
  qrImageUrl: string;
  createDt: string;
  updateDt: string | null;
};
