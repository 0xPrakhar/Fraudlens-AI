import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const accentClasses = {
  cyan: "from-cyan-500/25 to-blue-500/20 text-cyan-300",
  emerald: "from-emerald-500/25 to-green-500/20 text-emerald-300",
  red: "from-rose-500/25 to-red-500/20 text-rose-300",
  purple: "from-violet-500/25 to-fuchsia-500/20 text-violet-300",
};

export default function MetricCard({ title, value, change, icon: Icon, accent = "cyan" }) {
  const points = "0,24 8,16 16,18 24,10 32,14 40,6 48,8 56,2 64,10 72,4 80,12";

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="relative overflow-hidden rounded-[20px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_25px_90px_-35px_rgba(59,130,246,0.35)] backdrop-blur-xl"
    >
      <div className={`absolute inset-0 bg-linear-to-br ${accentClasses[accent]} opacity-60`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {value.toLocaleString()}
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-emerald-400">
            <ArrowUpRight size={14} />
            <span>{change}% this week</span>
          </div>
        </div>
        <div className={`rounded-2xl border border-white/10 bg-linear-to-br ${accentClasses[accent]} p-3`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="relative mt-5 h-10 rounded-xl border border-white/10 bg-slate-950/50 p-2">
        <svg viewBox="0 0 80 24" className="h-full w-full">
          <path d={`M0 20 C8 16, 16 18, 24 14 S40 8, 48 10 S64 8, 80 4`} stroke="currentColor" strokeWidth="2.5" fill="none" className="text-cyan-400" />
          <polyline points={points} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}
