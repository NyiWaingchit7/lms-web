import { BaseOption } from "./auth";

export interface CheckoutSlice {
  error: Error | null;
  isLoading: boolean;
}

export interface CreateCheckout extends BaseOption {
  payment_assetUrl: string;
  lectureId: number;
  total_price: number;
}
