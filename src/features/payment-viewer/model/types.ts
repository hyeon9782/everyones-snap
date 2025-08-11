export interface Order {
  orderIdx: number;
  orderId: string;
  userIdx: number;
  planIdx: number;
  productName: string;
  amount: number;
  status: string;
  createDt: string;
  updateDt: string;
}
