import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { auth } from "./firebase/firebase"; // ✨ Firebase auth import kiya gaya hai

export default function App() {
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL;
    let hasPinged = false;

    // 1. Backend ko wake-up karne ka function
    const wakeUpBackend = () => {
      if (hasPinged) return;
      hasPinged = true;

      console.log("Pinging backend to wake up...");
      fetch(`${API_BASE}/`)
        .then((res) => res.json())
        .then((data) => console.log("Backend is awake:", data))
        .catch((err) => console.log("Wake-up ping error:", err));

      window.removeEventListener("mousemove", wakeUpBackend);
      window.removeEventListener("keydown", wakeUpBackend);
      window.removeEventListener("click", wakeUpBackend);
    };

    window.addEventListener("mousemove", wakeUpBackend, { once: true });
    window.addEventListener("keydown", wakeUpBackend, { once: true });
    window.addEventListener("click", wakeUpBackend, { once: true });

    fetch(`${API_BASE}/`)
      .then((res) => res.json())
      .catch(() => {});

    // // ==========================================
    // // 2. EXTENSION TOKEN SYNCHRONIZATION LISTENER
    // // ==========================================
    // const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     try {
    //       // Firebase se secure ID token fetch karein
    //       const token = await user.getIdToken();

    //       // LocalStorage mein save karein jise extension access karega
    //       localStorage.setItem("fraudlens_token", token);
    //       localStorage.setItem("user_email", user.email);

    //       console.log("FraudLens Auth token synced for browser extension.");
    //     } catch (error) {
    //       console.error("Failed to sync auth token for extension:", error);
    //     }
    //   } else {
    //     // User logout hone par storage clear kar dein
    //     localStorage.removeItem("fraudlens_token");
    //     localStorage.removeItem("user_email");
    //   }
    // });

    // // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("mousemove", wakeUpBackend);
      window.removeEventListener("keydown", wakeUpBackend);
      window.removeEventListener("click", wakeUpBackend);
      // unsubscribeAuth(); // Unsubscribe Firebase auth listener
    };
  }, []);

  return <AppRoutes />;
}