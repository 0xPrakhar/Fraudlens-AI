import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, ScanSearch, Sparkles } from "lucide-react";

const iconMap = {
  blocked: AlertTriangle,
  safe: ShieldCheck,
  scan: ScanSearch,
  insight: Sparkles,
};

export default function ActivityItem({ title, time, confidence, severity, action, icon = "blocked" }) {
  const Icon = iconMap[icon] || AlertTriangle;
  const severityClasses = {
    critical: "bg-rose-500/15 text-rose-300",
    warning: "bg-amber-500/15 text-amber-300",
    info: "bg-cyan-500/15 text-cyan-300",
    success: "bg-emerald-500/15 text-emerald-300",
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-slate-900/60 p-4"
    >
      <div className="mt-0.5 rounded-2xl border border-white/10 bg-slate-800/70 p-2 text-cyan-300">
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-white">{title}</p>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${severityClasses[severity]}`}>
            {severity}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">{action}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span>{time}</span>
          <span>•</span>
          <span>{confidence}% confidence</span>
        </div>
      </div>
    </motion.li>
  );
}
