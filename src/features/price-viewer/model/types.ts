export interface Plan {
  planIdx: number;
  code: string;
  name: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  eventLimit: number;
  photoLimit: number;
  videoLimit: number;
  guestLimit: number | null;
  storageGb: number | null;
}
