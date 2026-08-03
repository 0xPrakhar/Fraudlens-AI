import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function QuickActionCard({ title, description, icon: Icon, accent = "cyan", onClick }) {
  const accentClass = {
    cyan: "from-cyan-500/20 to-blue-500/20",
    emerald: "from-emerald-500/20 to-green-500/20",
    rose: "from-rose-500/20 to-orange-500/20",
    violet: "from-violet-500/20 to-fuchsia-500/20",
  }[accent];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`group rounded-[20px] border border-white/10 bg-linear-to-br ${accentClass} p-4 text-left backdrop-blur-xl`}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-2.5 text-cyan-300">
          <Icon size={18} />
        </div>
        <ArrowUpRight size={16} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
    </motion.button>
  );
}
