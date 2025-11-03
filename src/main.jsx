import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SubAdminDashboard from "./pages/SubAdminDashboard"; // ✅ import this
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public site routes */}
        <Route path="/*" element={<App />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* ✅ Add this outside App so it doesn’t use public Navbar/Footer */}
        <Route path="/subadmin/dashboard" element={<SubAdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
