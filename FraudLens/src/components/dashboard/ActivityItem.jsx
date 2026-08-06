import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { AlertTriangle, ShieldCheck, ScanSearch, Sparkles } from "lucide-react";

const iconMap = {
  blocked: AlertTriangle,
  safe: ShieldCheck,
  scan: ScanSearch,
  insight: Sparkles,
};

export default function ActivityItem({ title, time, confidence, severity, action, icon = "blocked" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const Icon = iconMap[icon] || AlertTriangle;
  const severityClasses = {
    critical: isDark ? "bg-rose-500/15 text-rose-300" : "bg-rose-100 text-rose-700",
    warning: isDark ? "bg-amber-500/15 text-amber-300" : "bg-amber-100 text-amber-700",
    info: isDark ? "bg-cyan-500/15 text-cyan-300" : "bg-cyan-100 text-cyan-700",
    success: isDark ? "bg-emerald-500/15 text-emerald-300" : "bg-emerald-100 text-emerald-700",
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 rounded-[18px] border p-4 ${isDark ? "border-white/10 bg-slate-900/60" : "border-slate-200 bg-white/90 shadow-sm"}`}
    >
      <div className={`mt-0.5 rounded-2xl border p-2 ${isDark ? "border-white/10 bg-slate-800/70 text-cyan-300" : "border-slate-200 bg-slate-100 text-cyan-600"}`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{title}</p>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${severityClasses[severity]}`}>
            {severity}
          </span>
        </div>
        <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{action}</p>
        <div className={`mt-2 flex items-center gap-3 text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>
          <span>{time}</span>
          <span>•</span>
          <span>{confidence}% confidence</span>
        </div>
      </div>
    </motion.li>
  );
}
