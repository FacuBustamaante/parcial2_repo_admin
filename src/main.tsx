import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./router/appRouter";
import { InitApp } from "./shared/InitApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InitApp>
      <AppRouter />
    </InitApp>
  </StrictMode>,
);
