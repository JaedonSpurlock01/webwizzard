import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


const rootElement = document.createElement("div");
rootElement.id = "my-extension-root";
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App x="67" y="90"></App>
   
    
  </React.StrictMode>
);