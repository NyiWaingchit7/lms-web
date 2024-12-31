import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./route/Routes.tsx";

createRoot(document.getElementById("root")!).render(<Router />);
