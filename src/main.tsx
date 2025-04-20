import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import LoginForm from "./pages/LoginForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginForm />
    <App />
  </StrictMode>
);
