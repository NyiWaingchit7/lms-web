export interface PaymentBank {
  id?: number;
  name: string;
  assetUrl?: string;
}
export interface PaymentAccount {
  id?: number;
  name: string;
  phone_number: string;
  payment_bank_id?: number;
  payment_bank: PaymentBank;
}
