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
  ExternalLink,
  Cpu,
  Clock,
  ListOrdered,
  Lightbulb,
} from "lucide-react";

export default function ScanReportModal({ selectedItem, onClose }) {
  if (!selectedItem) return null;

  const { scanType, input, image, result, createdAt } = selectedItem;
  const riskScore = result?.riskScore ?? 0;
  const isCriticalOrHigh = riskScore > 40;
  const isSafe = !isCriticalOrHigh;

  const getHeaderIcon = () => {
    switch (scanType?.toLowerCase()) {
      case "url":
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
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
              {getHeaderIcon()}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-500">
                Security Audit Report ({scanType?.toUpperCase()})
              </span>
              <h2 className="text-xl font-black capitalize">
                {result?.overallStatus || (isSafe ? "Safe Analysis" : "Threat Detected")}
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

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold text-sm cursor-pointer shadow-lg"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
}