import { Category } from "./category";
export interface PopularLecture {
  title: string;
  id?: number;
  lectureId: string;
  lecture: Course;
}
export interface Course {
  id?: number;
  title: string;
  description: string;
  price?: number;
  isPremium?: boolean;
  discount_price?: number;
  assetUrl?: string;
  categories: Category[];
  Lesson: Lesson[];
}
export interface Lesson {
  id?: number;
  title: string;
  description: string;
  content: string;
  assetImage?: string;
  assetVideo?: string;
  lectureId?: number;
}
export interface CourseSlice {
  items: Course[];
  isLoading: boolean;
  page: number;
  has_more_page: boolean;
  error: Error | null;
  detail: Course | null;
  loadmore_button: boolean;
  links: Object[];
  total: number;
}
