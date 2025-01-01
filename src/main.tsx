import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./route/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
