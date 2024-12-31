import { Lecture } from "./lecture";
import { Page } from "./page";
import { PaymentAccount } from "./payment";
import { Setting } from "./setting";
import { TagLine } from "./tagline";

export interface AppSlice {
  isLoading: boolean;
  lectures: Lecture[];
  pages: Page[];
  setting: Setting | null;
  tagLines: TagLine[];
  payment: PaymentAccount[];
  error: Error | null;
}
