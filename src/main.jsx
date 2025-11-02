import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Lawyers from "./pages/Lawyers";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import AdminLogin from "./pages/AdminLogin";
import ServiceDetails from "./pages/ServiceDetail";
import AdminDashboard from "./pages/AdminDashboard";
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
