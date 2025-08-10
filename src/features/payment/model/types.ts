export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface CreateOrderRequest {
  planIdx: number;
  productName: string;
  amount: number;
  userIdx: number;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  planName: string;
}

export interface PaymentPrepareRequest {
  orderId: string;
  amount: number;
  goodsName: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerTel?: string;
}

export interface PaymentPrepareResponse {
  orderIdx: number;
  userIdx: number;
  status: string;
  order: {
    orderIdx: number;
    orderId: string;
    userIdx: number;
    planIdx: number;
    productName: string;
    amount: number;
    status: string;
    createDt: string;
    updateDt: string;
  };
  tid: string;
  cardName: string;
  cardNumber: string;
  paidAt: string;
  paymentIdx: number;
  createDt: string;
  updateDt: string;
}

export interface PaymentApproveRequest {
  paymentIdx: string;
  tid: string;
  authResultCode: string;
  signature: string;
}

export interface PaymentApproveResponse {
  success: boolean;
  orderId: string;
  paymentIdx: string;
  status: "paid" | "failed";
  message: string;
}

export interface NicepayResponse {
  authResultCode: string;
  authResultMsg: string;
  tid: string;
  clientId: string;
  orderId: string;
  amount: string;
  signature: string;
}
