import React, { useState } from "react";
import {
  MessageSquare,
  Activity,
  ArrowRight,
  XCircle,
  CheckCircle,
  ShieldCheck,
  ShieldAlert,
  Info,
  Check,
  Cpu,
} from "lucide-react";
import { scanTarget } from "../services/api";

export default function MessageScanner() {
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleScan = async (e) => {
    e.preventDefault();
    if (!message) return;

    setIsScanning(true);
    setResult(null);
    setError("");

    try {
      const response = await scanTarget("text", { text: message });
      console.log("Full API Response:", response);

      // FIX: response.message poora analysis object hai, use pehle extract karein
      const scanResult = response.message || response.data || response;
      setResult(scanResult);
    } catch (err) {
      console.error("Scan error:", err);
      setError(err.message || "Something went wrong during scanning.");
    } finally {
      setIsScanning(false);
    }
  };

  const isHighRisk =
    result?.overallStatus?.toLowerCase().includes("high") ||
    result?.riskScore > 50;

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-10">
      {/* HEADER */}
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 mb-3 text-indigo-600 dark:text-indigo-400">
          <MessageSquare size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Text / Message Scanner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-lg leading-relaxed">
          Paste your text, SMS, or suspicious email content. Our AI agents will
          inspect it against global threat intelligence.
        </p>
      </div>

      {/* SCANNER BOX */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <form onSubmit={handleScan} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste your message here (e.g., You have an unpaid toll payment...)"
            className="w-full h-40 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm resize-none text-slate-900 dark:text-white placeholder:text-slate-400"
            required
          />
          <button
            type="submit"
            disabled={isScanning || !message}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isScanning ? (
              <>
                <Activity className="animate-spin" size={18} /> Analyzing Threat
                Patterns...
              </>
            ) : (
              <>
                Scan Message <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* RESULT SECTION */}
      {result && !isScanning && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* TOP STATUS CARD */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${isHighRisk ? "bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-500/30" : "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-500/30"}`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-2xl ${isHighRisk ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400" : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"}`}
                >
                  {isHighRisk ? (
                    <XCircle size={32} />
                  ) : (
                    <CheckCircle size={32} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      {result.overallStatus}
                    </h2>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      Confidence: {result.confidence}%
                    </span>
                  </div>

                  {/* Threat Type Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {result.threatType && result.threatType.length > 0 ? (
                      result.threatType.map((type, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        No Threats Detected
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Risk Score Indicator */}
              <div className="sm:ml-auto bg-white/80 dark:bg-slate-900/80 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm w-full sm:w-auto flex sm:flex-col justify-between items-center">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Risk Score
                </p>
                <p
                  className={`text-2xl sm:text-3xl font-black ${isHighRisk ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}
                >
                  {result.riskScore}
                  <span className="text-xs text-slate-400">/100</span>
                </p>
              </div>
            </div>

            {/* Summary */}
            <p className="mt-5 text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
              {result.summary}
            </p>
          </div>

          {/* AI EXPLANATION */}
          {result.aiExplanation && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                <Info size={20} />
                <h3>AI Detailed Breakdown</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {result.aiExplanation}
              </p>
            </div>
          )}

          {/* TECHNICAL ANALYSIS FLAGS (Mapped from your new response structure) */}
          {result.technicalAnalysis && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="text-indigo-500" size={20} />
                Technical Analysis Flags
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Link:</span>
                  <span
                    className={`text-xs font-bold ${result.technicalAnalysis.containsLink ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {result.technicalAnalysis.containsLink ? "Yes" : "None"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">OTP Request:</span>
                  <span
                    className={`text-xs font-bold ${result.technicalAnalysis.containsOTPRequest ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {result.technicalAnalysis.containsOTPRequest ? "Yes" : "No"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Financial:</span>
                  <span
                    className={`text-xs font-bold ${result.technicalAnalysis.containsFinancialRequest ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {result.technicalAnalysis.containsFinancialRequest
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Phone No:</span>
                  <span
                    className={`text-xs font-bold ${result.technicalAnalysis.containsPhoneNumber ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {result.technicalAnalysis.containsPhoneNumber
                      ? "Yes"
                      : "No"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Urgency:</span>
                  <span
                    className={`text-xs font-bold ${result.technicalAnalysis.containsUrgency ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {result.technicalAnalysis.containsUrgency ? "Yes" : "No"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Email:</span>
                  <span
                    className={`text-xs font-bold ${result.technicalAnalysis.containsEmail ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {result.technicalAnalysis.containsEmail ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* REASONS GRID */}
          {result.reasons && result.reasons.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="text-amber-500" size={20} />
                Detected Threat Vectors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.reasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-1.5"
                  >
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      {reason.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECOMMENDATIONS */}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" size={20} />
                Recommended Actions
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800"
                  >
                    <span className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <Check size={14} />
                    </span>
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
