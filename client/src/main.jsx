import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UploadContextProvider } from "./contexts/UploadContexs.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UploadContextProvider>
      <App />
    </UploadContextProvider>
  </StrictMode>
);
