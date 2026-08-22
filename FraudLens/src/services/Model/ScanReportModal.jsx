import React from "react";
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Globe,
  ImageIcon,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ListOrdered,
  Lightbulb,
} from "lucide-react";

export default function ScanReportModal({ selectedItem, onClose }) {
  if (!selectedItem) return null;

  const { scanType, input, target, result, createdAt } = selectedItem;
  
  // Handle nested or direct result fields from backend / database records
  const analysisData = result || selectedItem;
  const riskScore = analysisData.riskScore ?? analysisData.risk ?? 0;
  const isCriticalOrHigh = riskScore > 40;
  const status = analysisData.overallStatus || (isCriticalOrHigh ? "High Risk" : "Safe");
  const targetInput = input || target || analysisData.target || "N/A";
  const summaryText = analysisData.summary || analysisData.reason || "No detailed summary provided.";
  const recommendations = analysisData.recommendations || analysisData.tips || [];
  const flags = analysisData.flags || analysisData.detectedThreats || [];

  const getHeaderIcon = () => {
    switch (scanType?.toLowerCase()) {
      case "url":
      case "link":
        return <Globe className="text-blue-500" size={24} />;
      case "image":
      case "screenshot":
        return <ImageIcon className="text-purple-500" size={24} />;
      case "text":
      case "message":
        return <MessageSquare className="text-amber-500" size={24} />;
      default:
        return <ShieldCheck className="text-cyan-500" size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
              {getHeaderIcon()}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-500">
                Security Audit Report ({scanType?.toUpperCase() || "SCAN"})
              </span>
              <h2 className="text-xl font-black capitalize">
                {status}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* METRICS & SCORE CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Calculated Risk Score</span>
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-3xl font-black ${isCriticalOrHigh ? 'text-red-500' : 'text-emerald-500'}`}>
                {riskScore}/100
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${isCriticalOrHigh ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'}`}>
                {isCriticalOrHigh ? 'Threat Flagged' : 'Secure Target'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Timestamp</span>
            <div className="flex items-center gap-2 mt-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
              <Clock size={16} className="text-indigo-500" />
              {createdAt ? new Date(createdAt).toLocaleString() : "Just now"}
            </div>
          </div>
        </div>

        {/* TARGET / INPUT */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Scanned Target / Payload</label>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm break-all text-slate-800 dark:text-slate-200">
            {targetInput}
          </div>
        </div>

        {/* AI SUMMARY */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Threat Analysis Summary</label>
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {summaryText}
          </div>
        </div>

        {/* FLAGS / DETECTED THREATS */}
        {flags.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-amber-500" /> Detected Risk Indicators
            </label>
            <ul className="space-y-1.5">
              {flags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-medium bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-2.5 rounded-xl border border-red-100 dark:border-red-900/30">
                  <span className="font-bold">•</span> {typeof flag === 'string' ? flag : flag.description || JSON.stringify(flag)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Lightbulb size={14} className="text-amber-500" /> Security Recommendations
            </label>
            <ul className="space-y-1.5">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-medium bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" /> {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold text-sm cursor-pointer shadow-lg hover:opacity-90 transition-opacity"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
}