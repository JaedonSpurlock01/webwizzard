import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "my-extension-root";
// rootElement.style.position = "fixed"; // Make it fixed position
// rootElement.style.top = "10"; // Align top
// rootElement.style.right = "10"; // Align to the right
rootElement.style.zIndex = "10000"; // High z-index to ensure it's on top
document.body.appendChild(rootElement);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "./static/css/main.css";
(document.head || document.documentElement).appendChild(styleLink);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
