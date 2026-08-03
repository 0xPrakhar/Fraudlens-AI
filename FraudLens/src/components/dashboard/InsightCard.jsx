import { motion } from "framer-motion";
import { ArrowRight, Brain, Radar, TrendingUp } from "lucide-react";

const iconMap = {
  insight: Brain,
  risk: Radar,
  forecast: TrendingUp,
};

export default function InsightCard({ title, body, confidence, icon = "insight" }) {
  const Icon = iconMap[icon] || Brain;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-[20px] border border-cyan-400/20 bg-linear-to-br from-slate-900/90 to-slate-800/80 p-5 shadow-[0_20px_70px_-35px_rgba(6,182,212,0.45)]"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-2.5 text-cyan-300">
          <Icon size={18} />
        </div>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {confidence}% confidence
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
      <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
        Suggested action <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}
