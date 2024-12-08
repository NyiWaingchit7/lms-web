import { Category } from "./category";

export interface Lecture {
  id?: number;
  title: string;
  description: string;
  price?: number;
  isPremium?: boolean;
  discount_price?: number;
  assetUrl?: string;
  categories: Category[];
}

export interface Lecture {
  items: Lecture[];
  isLoading: boolean;
  page: number;
  has_more_page: boolean;
  error: Error | null;
}
