import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";

export default function QuickActionCard({ title, description, icon: Icon, accent = "cyan", onClick }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const accentClass = {
    cyan: isDark ? "from-cyan-500/20 to-blue-500/20" : "from-cyan-50 to-blue-50",
    emerald: isDark ? "from-emerald-500/20 to-green-500/20" : "from-emerald-50 to-green-50",
    rose: isDark ? "from-rose-500/20 to-orange-500/20" : "from-rose-50 to-orange-50",
    violet: isDark ? "from-violet-500/20 to-fuchsia-500/20" : "from-violet-50 to-fuchsia-50",
  }[accent];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`group rounded-[20px] border p-4 text-left backdrop-blur-xl ${isDark ? "border-white/10 bg-linear-to-br" : "border-slate-200 bg-linear-to-br shadow-sm"} ${accentClass}`}
    >
      <div className="flex items-start justify-between">
        <div className={`rounded-2xl border p-2.5 ${isDark ? "border-white/10 bg-slate-950/70 text-cyan-300" : "border-slate-200 bg-white text-cyan-600"}`}>
          <Icon size={18} />
        </div>
        <ArrowUpRight size={16} className={`transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
      </div>
      <h3 className={`mt-4 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
      <p className={`mt-1 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{description}</p>
    </motion.button>
  );
}
