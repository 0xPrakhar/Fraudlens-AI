import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL ;
    let hasPinged = false;

    // Backend ko wake-up karne ka function
    const wakeUpBackend = () => {
      if (hasPinged) return;
      hasPinged = true;

      console.log("Pinging backend to wake up...");
      fetch(`${API_BASE}/`)
        .then((res) => res.json())
        .then((data) => console.log("Backend is awake:", data))
        .catch((err) => console.log("Wake-up ping error:", err));

      // Ek baar ping hone ke baad event listeners remove kar dein
      window.removeEventListener("mousemove", wakeUpBackend);
      window.removeEventListener("keydown", wakeUpBackend);
      window.removeEventListener("click", wakeUpBackend);
    };

    // User ke interaction par trigger karein
    window.addEventListener("mousemove", wakeUpBackend, { once: true });
    window.addEventListener("keydown", wakeUpBackend, { once: true });
    window.addEventListener("click", wakeUpBackend, { once: true });

    // App load hote hi ek immediate background ping bhejein
    fetch(`${API_BASE}/`)
      .then((res) => res.json())
      .catch(() => {});

    return () => {
      window.removeEventListener("mousemove", wakeUpBackend);
      window.removeEventListener("keydown", wakeUpBackend);
      window.removeEventListener("click", wakeUpBackend);
    };
  }, []);

  return <AppRoutes />;
}