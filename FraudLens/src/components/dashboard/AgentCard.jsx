import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Activity, BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";

const iconMap = {
  url: BrainCircuit,
  message: Sparkles,
  image: ShieldCheck,
  intel: Activity,
  behavior: Sparkles,
};

export default function AgentCard({ title, status, speed, threats, confidence, icon = "url", accent = "cyan" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const Icon = iconMap[icon] || BrainCircuit;
  const accentClass = {
    cyan: isDark ? "from-cyan-500/20 to-blue-500/20" : "from-cyan-50 to-blue-50",
    emerald: isDark ? "from-emerald-500/20 to-green-500/20" : "from-emerald-50 to-green-50",
    violet: isDark ? "from-violet-500/20 to-fuchsia-500/20" : "from-violet-50 to-fuchsia-50",
    rose: isDark ? "from-rose-500/20 to-orange-500/20" : "from-rose-50 to-orange-50",
  }[accent];

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      className={`relative overflow-hidden rounded-[20px] border p-4 backdrop-blur-xl ${isDark ? "border-white/10 bg-linear-to-br" : "border-slate-200 bg-linear-to-br shadow-[0_16px_50px_-30px_rgba(15,23,42,0.12)]"} ${accentClass}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-2xl border p-2.5 ${isDark ? "border-white/10 bg-slate-950/60 text-cyan-300" : "border-slate-200 bg-white text-cyan-600"}`}>
            <Icon size={18} />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>{status}</p>
          </div>
        </div>
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.16)]" />
      </div>

      <div className={`mt-4 h-1.5 overflow-hidden rounded-full ${isDark ? "bg-slate-800/70" : "bg-slate-200"}`}>
        <div className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400" style={{ width: `${speed}%` }} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className={`${isDark ? "text-slate-400" : "text-slate-600"}`}>Threats blocked</p>
          <p className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{threats}</p>
        </div>
        <div>
          <p className={`${isDark ? "text-slate-400" : "text-slate-600"}`}>Confidence</p>
          <p className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{confidence}%</p>
        </div>
      </div>
    </motion.article>
  );
}
