import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowRight, Brain, Radar, TrendingUp } from "lucide-react";

const iconMap = {
  insight: Brain,
  risk: Radar,
  forecast: TrendingUp,
};

export default function InsightCard({ title, body, confidence, icon = "insight" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const Icon = iconMap[icon] || Brain;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className={`rounded-[20px] border p-5 ${isDark ? "border-cyan-400/20 bg-linear-to-br from-slate-900/90 to-slate-800/80 shadow-[0_20px_70px_-35px_rgba(6,182,212,0.45)]" : "border-slate-200 bg-white/90 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.16)]"}`}
    >
      <div className="flex items-center justify-between">
        <div className={`rounded-2xl border p-2.5 ${isDark ? "border-white/10 bg-slate-950/70 text-cyan-300" : "border-slate-200 bg-slate-50 text-cyan-600"}`}>
          <Icon size={18} />
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${isDark ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-300" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>
          {confidence}% confidence
        </span>
      </div>
      <h3 className={`mt-4 text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{body}</p>
      <button className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition ${isDark ? "text-cyan-300 hover:text-cyan-200" : "text-cyan-700 hover:text-cyan-600"}`}>
        Suggested action <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}
