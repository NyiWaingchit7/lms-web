import { Category } from "./category";
import { Course, PopularLecture } from "./course";
import { Page } from "./page";
import { PaymentAccount } from "./payment";
import { Setting } from "./setting";
import { TagLine } from "./tagline";

export interface AppSlice {
  isLoading: boolean;
  lectures: Course[];
  free_lectures: Course[];
  pages: Page[];
  setting: Setting | null;
  tagLines: TagLine[];
  payment: PaymentAccount[];
  error: Error | null;
  category: Category[];
  popular_lectures: PopularLecture[];
  counts: { [key: string]: string | null } | null;
  faq: { question: string; answer: string }[];
}
