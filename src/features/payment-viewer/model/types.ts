export interface Order {
  orderIdx: number;
  orderId: string;
  userIdx: number;
  planIdx: number;
  productName: string;
  amount: number;
  status: string;
  email: string;
  createDt: string;
  updateDt: string;
  tid: string;
  paymentStatus: string;
}
