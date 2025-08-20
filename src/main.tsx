// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";   // keep this BEFORE your own CSS
import "./index.css";
import App from "./App";

// Optional: Tailwind color import (works if using ESM)
import colors from "tailwindcss/colors.js";
const PRIMARY = colors?.violet?.[600] ?? "#665F9E"; // or "#722ed1" for AntD purple-6


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#665F9E", // try "#722ed1" first to sanity check
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

