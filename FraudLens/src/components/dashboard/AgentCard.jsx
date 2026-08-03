import { motion } from "framer-motion";
import { Activity, BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";

const iconMap = {
  url: BrainCircuit,
  message: Sparkles,
  image: ShieldCheck,
  intel: Activity,
  behavior: Sparkles,
};

export default function AgentCard({ title, status, speed, threats, confidence, icon = "url", accent = "cyan" }) {
  const Icon = iconMap[icon] || BrainCircuit;
  const accentClass = {
    cyan: "from-cyan-500/20 to-blue-500/20",
    emerald: "from-emerald-500/20 to-green-500/20",
    violet: "from-violet-500/20 to-fuchsia-500/20",
    rose: "from-rose-500/20 to-orange-500/20",
  }[accent];

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      className={`relative overflow-hidden rounded-[20px] border border-white/10 bg-linear-to-br ${accentClass} p-4 backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-2.5 text-cyan-300">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="text-xs text-slate-400">{status}</p>
          </div>
        </div>
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.16)]" />
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800/70">
        <div className="h-full rounded-full bg-linear-to-r from-cyan-400 to-emerald-400" style={{ width: `${speed}%` }} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-400">Threats blocked</p>
          <p className="font-semibold text-white">{threats}</p>
        </div>
        <div>
          <p className="text-slate-400">Confidence</p>
          <p className="font-semibold text-white">{confidence}%</p>
        </div>
      </div>
    </motion.article>
  );
}
