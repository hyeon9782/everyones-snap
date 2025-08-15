export interface GuestRegistRequest {
  name: string;
  deviceId: string;
}
export interface GuestResponse {
  guestIdx: number;
  eventIdx: number;
  name: string;
  deviceId: string;
  createDt: string;
  updateDt: string;
}
