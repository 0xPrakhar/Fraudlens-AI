import React, { useState } from "react";
import {
  QrCode,
  Upload,
  Activity,
  XCircle,
  CheckCircle,
  AlertTriangle,
  ShieldAlert
} from "lucide-react";
import { scanTarget } from "../services/api";

export default function QrScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await scanTarget("qr", formData);
      console.log("=== QR SCAN API RESPONSE ===", response);
      
      setResult(response.data || response);
    } catch (err) {
      console.error("QR Scan Error:", err);
      setError(err.message || "Something went wrong during QR scanning.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-10">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <QrCode className="text-cyan-600 dark:text-cyan-400" size={32} />
          QR Code Scanner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm max-w-lg">
          Upload a QR code image to inspect its destination before scanning and prevent malicious redirects.
        </p>
      </div>

      {/* SCANNER AREA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center shadow-sm">
        <label className="w-full h-64 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-500 transition-all group bg-slate-50 dark:bg-slate-950/50">
          <Upload
            size={40}
            className="text-slate-400 mb-4 group-hover:text-cyan-500"
          />
          <span className="font-bold text-slate-600 dark:text-slate-300">
            Click to upload QR Code image
          </span>
          <span className="text-xs text-slate-400 mt-1">
            PNG, JPG or JPEG allowed
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*"
          />
        </label>

        {isScanning && (
          <div className="mt-8 flex items-center gap-3 text-cyan-600 dark:text-cyan-400 font-bold">
            <Activity className="animate-spin" /> Analyzing QR Code via AI...
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium w-full text-center">
            ❌ {error}
          </div>
        )}
      </div>

      {/* RESULT SECTION */}
      {result?.analysis && !isScanning && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="p-6 rounded-3xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-cyan-600 dark:text-cyan-400">
                  Scan Analysis Complete
                </h2>
                <p className="text-xs font-mono opacity-80 mt-1 break-all">
                  Status: {result.analysis?.overallStatus}
                </p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-xs font-bold uppercase">
                  Risk Score: {result.analysis?.riskScore ?? "N/A"}/100
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-black/5 dark:bg-black/40 p-4 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Summary</p>
                <p className="text-sm font-semibold">{result.analysis?.summary}</p>
              </div>

              <div className="bg-black/5 dark:bg-black/40 p-4 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">AI Explanation</p>
                <p className="text-sm opacity-90">{result.analysis?.aiExplanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}