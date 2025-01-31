import { Profile } from "./auth";
import { Course } from "./course";

export interface Purchase {
  id?: number;
  student?: Profile;
  lecture?: Course;
  studentId?: number;
  lectureId?: number;
  payment_status?: PaymentStatus;
  payment_assetUrl: string;
  created_at?: Date;
}

export interface PurchaseSlice {
  items: Purchase[];
  data: Purchase;
  isLoading: boolean;
  students: Profile[];
  lectures: Course[];
}

export interface CreatePurchase {
  studentId: number;
  lectureId: number;
  total_price: number;
  payment_assetUrl: string;
}

export enum PaymentStatus {
  PENDING,
  CONFIRMED,
  CANCELLED,
}
