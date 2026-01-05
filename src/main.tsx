import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Main.tsx loading...");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  try {
    console.log("Creating root...");
    const root = createRoot(rootElement);
    console.log("Rendering App...");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Error rendering app:", error);
    rootElement.innerHTML = `<div style="color: red; padding: 20px;">Error: ${error}</div>`;
  }
} else {
  console.error("Root element not found!");
}