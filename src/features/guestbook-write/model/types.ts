export interface GuestbookWriteRequest {
  eventIdx: number;
  guestName: string;
  content: string;
  fontColor: string;
  backgroundColor: string;
  font: string;
}

export interface GuestbookWriteResponse {
  visitorNoteIdx: number;
  eventIdx: number;
  guestName: string;
  content: string;
  fontColor: string;
  backgroundColor: string;
  font: string;
  createDt: string;
  updateDt: string;
}

export interface GuestbookUpdateRequest {
  content: string;
  font: string;
  backgroundColor: string;
  fontColor: string;
}

export interface GuestbookUpdateResponse extends GuestbookWriteResponse {}

export interface GuestbookDeleteRequest {
  visitorNoteIdx: number;
}

export interface GuestbookDeleteResponse {
  success: boolean;
}
