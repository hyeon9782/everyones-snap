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
  planIdx: number | null;
  qrToken: string;
  shortUrl: string;
  qrImageUrl: string;
  createDt: string;
  updateDt: string | null;
  eventStat: {
    eventStatIdx: number;
    eventIdx: number;
    guestCount: number;
    photoCount: number;
    videoCount: number;
    visitorNoteCount: number;
    photoStorage: number;
    videoStorage: number;
    createDt: string;
    updateDt: string | null;
  };
  eventCategory: {
    eventCategoryIdx: number;
    eventCategoryName: string;
  };
}

export interface PlanUsage {
  userPlanIdx: number;
  status: string;
  eventLimit: number;
  remainingEvents: number;
}
