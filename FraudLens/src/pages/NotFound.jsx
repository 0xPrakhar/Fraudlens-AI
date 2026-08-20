import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-950 text-center px-4">
      <div className="p-4 rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20 mb-4 shadow-lg shadow-red-500/10">
        <ShieldAlert size={40} />
      </div>
      <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-2">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        Page Not Found
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mb-6">
        Aap jis page ya route ko dhoond rahe hain wo exist nahi karta ya galat
        link hai.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-2"
      >
        <ArrowLeft size={18} /> Back to Login
      </button>
    </div>
  );
}
