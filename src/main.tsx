// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import App from "./App";
import "antd/dist/reset.css";  // AntD v5 reset
import "./index.css";          // Tailwind output (from your v4 CLI watcher/build)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: theme.defaultSeed.purple, // resolves to cyan-6
          borderRadius: 4,
          fontSize: 14,
        },
         components: {
      Menu: {
        subMenuItemBg: "#fff", // override submenu item container
      },},
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

