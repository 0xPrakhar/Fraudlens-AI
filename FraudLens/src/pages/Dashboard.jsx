import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  Globe2,
  Link as LinkIcon,
  MessageSquare,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import MetricCard from "../components/dashboard/MetricCard";
import AgentCard from "../components/dashboard/AgentCard";
import ActivityItem from "../components/dashboard/ActivityItem";
import InsightCard from "../components/dashboard/InsightCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";

const trendData = [
  { name: "Mon", value: 24 },
  { name: "Tue", value: 34 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 56 },
  { name: "Fri", value: 48 },
  { name: "Sat", value: 72 },
  { name: "Sun", value: 64 },
];

const agents = [
  { title: "URL Agent", status: "Monitoring live feeds", speed: 91, threats: 248, confidence: 97, icon: "url", accent: "cyan" },
  { title: "Message Agent", status: "Scanning vectors", speed: 88, threats: 138, confidence: 95, icon: "message", accent: "emerald" },
  { title: "Image AI", status: "Detecting fake QR", speed: 84, threats: 64, confidence: 93, icon: "image", accent: "violet" },
  { title: "Threat Intel", status: "OSINT synced", speed: 96, threats: 311, confidence: 99, icon: "intel", accent: "rose" },
];

const quickActions = [
  { title: "Scan URL", description: "Inspect domains and phishing infrastructure", icon: LinkIcon, accent: "cyan", to: "/app/dashboard/url" },
  { title: "Paste Message", description: "Analyze SMS, email, and chat content", icon: MessageSquare, accent: "emerald", to: "/app/dashboard/message" },
  { title: "Upload Screenshot", description: "Detect spoofed UI and QR overlays", icon: Upload, accent: "violet", to: "/app/dashboard/qr" },
  { title: "Generate Report", description: "Export executive protection summary", icon: ScanSearch, accent: "rose", to: "/app/dashboard/report" },
];

const activityFeed = [
  { title: "Blocked phishing website", time: "2 min ago", confidence: 98, severity: "critical", action: "Null routed and IOC added to blocklist", icon: "blocked" },
  { title: "Safe URL verified", time: "7 min ago", confidence: 96, severity: "success", action: "No suspicious markers found in TLS and DNS context", icon: "safe" },
  { title: "Suspicious QR detected", time: "14 min ago", confidence: 94, severity: "warning", action: "Visual spoofing pattern matched an impersonation campaign", icon: "scan" },
  { title: "SMS classified as scam", time: "18 min ago", confidence: 97, severity: "info", action: "Urgency cues and impersonation language detected", icon: "insight" },
];

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-8 text-slate-100">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[32px] border border-white/5 bg-transparent p-6 shadow-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] bg-size-[24px_24px] opacity-40" />
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-500/20 blur-[120px]" />

        <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan-200 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Good Evening Vinayak 👋
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              FraudLens AI is actively protecting your digital ecosystem.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
              Multi-agent intelligence is monitoring trust signals, phishing infrastructure, and suspicious behavior in real time.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm text-slate-400">Protected</p>
                <p className="text-lg font-semibold text-emerald-300">AI Status • Secure</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm text-slate-400">Threat Level</p>
                <p className="text-lg font-semibold text-cyan-300">Low • Active</p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-62.5 items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute h-48 w-48 rounded-full border border-cyan-400/20"
            />
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className="flex h-40 w-40 items-center justify-center rounded-full border border-cyan-400/30 bg-[radial-gradient(circle,rgba(6,182,212,0.28),rgba(2,6,23,0.75))] shadow-[0_0_80px_rgba(6,182,212,0.3)]"
            >
              <div className="text-center">
                <p className="text-5xl font-semibold text-white">94</p>
                <p className="mt-1 text-sm uppercase tracking-[0.25em] text-cyan-300">Security Score</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Scans" value={15420} change={12} icon={ScanSearch} accent="cyan" />
        <MetricCard title="Threats Blocked" value={1248} change={18} icon={ShieldCheck} accent="emerald" />
        <MetricCard title="Safe URLs" value={14890} change={14} icon={Globe2} accent="purple" />
        <MetricCard title="High Risk Alerts" value={84} change={9} icon={AlertTriangle} accent="red" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Live AI Agents</p>
              <h2 className="text-xl font-semibold text-white">Autonomous detection layer</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
              <Zap size={14} />
              Active now
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {agents.map((agent) => (
              <AgentCard key={agent.title} {...agent} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Threat Trend</p>
              <h2 className="text-xl font-semibold text-white">Weekly signal strength</h2>
            </div>
            <div className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-400">Updated now</div>
          </div>
          <div className="mt-5 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="threatGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <Tooltip cursor={{ stroke: "rgba(255,255,255,0.15)" }} contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="url(#threatGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Live Activity Feed</p>
              <h2 className="text-xl font-semibold text-white">Real-time response stream</h2>
            </div>
            <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">Streaming</div>
          </div>
          <ul className="mt-5 space-y-3">
            {activityFeed.map((item) => (
              <ActivityItem key={item.title} {...item} />
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">AI Insights</p>
                <h2 className="text-xl font-semibold text-white">Context-aware recommendations</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-400">Next 24h</div>
            </div>
            <div className="mt-5 grid gap-4">
              <InsightCard title="An unusual increase in phishing attempts has been detected." body="Credential harvesting infrastructure is climbing in targeted sectors with synthetic brand impersonation." confidence={98} icon="insight" />
              <InsightCard title="Users clicking shortened URLs increased by 23%." body="The signal suggests a rise in mobile-first lure campaigns and redirect abuse." confidence={93} icon="risk" />
              <InsightCard title="High probability of banking phishing campaigns during the next 24 hours." body="Recommendations: tighten MFA prompts and notify high-risk segments immediately." confidence={96} icon="forecast" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Quick Actions</p>
                <h2 className="text-xl font-semibold text-white">Escalate in one tap</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <QuickActionCard key={action.title} {...action} onClick={() => navigate(action.to)} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}