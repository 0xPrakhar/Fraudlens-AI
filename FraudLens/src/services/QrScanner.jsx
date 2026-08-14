import React, { useState } from "react";
import { QrCode, Upload, Activity, XCircle, CheckCircle } from "lucide-react";

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

    // FormData banayein kyunki backend multer (upload.single("image")) use kar raha hai
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Apne backend API endpoint par request bhejein
      const response = await fetch("http://localhost:5000/api/v1/qr/scan", {
        method: "POST",
        // Agar aap Firebase auth token bhej rahe hain toh headers mein Authorization add kar sakte hain:
        // headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to scan QR code");
      }

      // Console mein poora response print karein taaki aap structure dekh sakein
      console.log("=== QR SCAN BACKEND RESPONSE ===", data);

      // State mein result set karein (data.data.analysis ke hisaab se)
      setResult(data.data);
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
          Upload a QR code image to inspect its destination before scanning.
          Powered by FraudLens AI Backend.
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
            <Activity className="animate-spin" /> Analyzing QR via Backend &
            AI...
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
            ❌ {error}
          </div>
        )}
      </div>

      {/* RESULT SECTION (Abhi ke liye basic layout, console mein poora data aayega) */}
      {result && !isScanning && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="p-6 rounded-3xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-cyan-600 dark:text-cyan-400">
                  Scan Analysis Result
                </h2>
                <p className="text-xs font-mono opacity-80 mt-1 break-all">
                  Image URL: {result.qrImage?.imageUrl}
                </p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-xs font-bold uppercase">
                  Score: {result.analysis?.riskScore ?? "N/A"}/100
                </span>
              </div>
            </div>

            {/* JSON view taaki aapko aur details pata chalein ki backend kya bhej raha hai */}
            <div className="mt-6 bg-black/5 dark:bg-black/40 p-4 rounded-xl overflow-x-auto">
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                Raw Analysis Data (Check Console for full details):
              </p>
              <pre className="text-xs font-mono text-cyan-300">
                {JSON.stringify(result.analysis, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
