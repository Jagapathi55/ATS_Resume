import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { ResumeProvider } from "./context/ResumeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </AuthProvider>
  </BrowserRouter>
);
