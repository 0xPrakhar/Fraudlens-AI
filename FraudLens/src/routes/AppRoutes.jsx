import Extension from "../services/Extension";

import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Login from "../pages/LOgin";
import Signup from "../pages/Signup";
import Landing from "../pages/Landing";

// Layout & Protection
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

// Dashboard Pages
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import ScanCenter from "../services/ScanCenter";
import UrlScanner from "../services/UrlScanner";
import MessageScanner from "../services/MessageScanner";
import QrScanner from "../services/QrScanner";
import History from "../services/History";
import ScreenshotScanner from "../services/ScreenshotScanner";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC PAGES ================= */}
      <Route path="/" element={<Landing />} />
      <Route path="/About" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ================= DASHBOARD SYSTEM WITH USER ID ================= */}
      <Route
        path="/app/dashboard/:userId"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Jab path sirf "/app/dashboard/USER_ID" ho */}
        <Route index element={<Dashboard />} />
        
        {/* Sub-pages jinke URL mein aage /USER_ID/hoga */}
        <Route path="scan" element={<ScanCenter />} />
        <Route path="url" element={<UrlScanner />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="message" element={<MessageScanner />} />
        <Route path="qr" element={<QrScanner />} />
        <Route path="History" element={<History />} />
        <Route path="image" element={<ScreenshotScanner />} />
        <Route path="extension" element={<Extension />} />
      </Route>
    </Routes>
  );
}