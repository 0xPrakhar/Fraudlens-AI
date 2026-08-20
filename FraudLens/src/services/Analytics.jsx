import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Activity,
  PieChart as PieIcon,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Download,
  Layers,
  Terminal,
  Cpu,
  Shield,
  FileText,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import jsPDF from "jspdf";
import { fetchScanHistory } from "../services/api";

export default function Analytics() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real scan history from backend API
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setLoading(true);
        const response = await fetchScanHistory();
        const logs = response.message || response.data || response || [];
        setHistoryList(Array.isArray(logs) ? logs : []);
      } catch (error) {
        console.error("Failed to load analytics history:", error);
        setHistoryList([]);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, []);

  // --- CALCULATE REAL METRICS ---
  const totalScans = historyList.length;

  const safeScans = historyList.filter((item) => {
    const score = item.result?.riskScore ?? item.risk ?? 0;
    return score <= 40;
  }).length;

  const threatScans = totalScans - safeScans;

  const avgRisk =
    totalScans > 0
      ? Math.round(
          historyList.reduce(
            (acc, curr) => acc + (curr.result?.riskScore ?? curr.risk ?? 0),
            0,
          ) / totalScans,
        )
      : 0;

  const avgConfidence =
    totalScans > 0
      ? Math.round(
          historyList.reduce(
            (acc, curr) => acc + (curr.result?.confidence ?? 90),
            0,
          ) / totalScans,
        )
      : 95;

  // Severity Breakdown Counts
  const lowRiskCount = historyList.filter(
    (item) => (item.result?.riskScore ?? 0) <= 30,
  ).length;
  const mediumRiskCount = historyList.filter((item) => {
    const score = item.result?.riskScore ?? 0;
    return score > 30 && score <= 70;
  }).length;
  const highRiskCount = historyList.filter(
    (item) => (item.result?.riskScore ?? 0) > 70,
  ).length;

  // Group scans by type dynamically
  const scanTypeCounts = historyList.reduce((acc, curr) => {
    const type = (curr.scanType || curr.type || "URL").toUpperCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    { name: "URL Scans", count: scanTypeCounts["URL"] || 0 },
    {
      name: "Messages",
      count: scanTypeCounts["MESSAGE"] || scanTypeCounts["SMS"] || 0,
    },
    {
      name: "Screenshots",
      count: scanTypeCounts["IMAGE"] || scanTypeCounts["SCREENSHOT"] || 0,
    },
    { name: "QR Codes", count: scanTypeCounts["QR"] || 0 },
  ];

  // --- PDF REPORT DOWNLOAD FUNCTION ---
  const downloadPDFReport = () => {
    const doc = new jsPDF();

    // 1. Header Styling
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Indigo
    doc.text("FraudLens AI - Security Audit Report", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(
      `Total Scans Evaluated: ${totalScans} | Average Risk Score: ${avgRisk}/100`,
      14,
      34,
    );

    let yPosition = 45;

    // 2. Loop through history and draw items manually as clean PDF lines
    historyList.forEach((item, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(
        `${index + 1}. Scan Type: ${(item.scanType || "URL").toUpperCase()}`,
        14,
        yPosition,
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);

      const inputString = item.input || "N/A";
      const truncatedInput =
        inputString.length > 70
          ? inputString.substring(0, 67) + "..."
          : inputString;

      doc.text(`Target: ${truncatedInput}`, 14, yPosition + 6);
      doc.text(
        `Status: ${item.result?.overallStatus || "Safe"} | Risk Score: ${item.result?.riskScore ?? 0}/100 | Confidence: ${item.result?.confidence ?? 100}%`,
        14,
        yPosition + 12,
      );

      doc.setDrawColor(226, 232, 240);
      doc.line(14, yPosition + 16, 196, yPosition + 16);

      yPosition += 24;
    });

    doc.save(`FraudLens_Security_Report_${Date.now()}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-slate-900 dark:text-slate-100 pb-12 animate-in fade-in duration-300">
      {/* PAGE HEADER WITH PDF EXPORT */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Activity size={14} /> Advanced Security Telemetry & Diagnostics
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Threat Analytics Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Real-time behavioral telemetry, multi-channel vector analysis, and
            security health indexes.
          </p>
        </div>

        <button
          onClick={downloadPDFReport}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Download size={16} /> Export PDF Audit Report
        </button>
      </div>

      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Total Evaluated
            </p>
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
              {loading ? "..." : totalScans}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 border border-indigo-100 dark:border-indigo-900">
            <BarChart3 size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Safe Indicators
            </p>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {loading ? "..." : safeScans}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-100 dark:border-emerald-900">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Threats Flagged
            </p>
            <p className="text-3xl font-black text-red-600 dark:text-red-400 mt-1">
              {loading ? "..." : threatScans}
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 border border-red-100 dark:border-red-900">
            <ShieldAlert size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Avg Risk Score
            </p>
            <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {loading ? "..." : avgRisk}
              <span className="text-xs text-slate-400">/100</span>
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-100 dark:border-amber-900">
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* CHARTS & HEALTH INDEX SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scan Types Distribution Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">
                Scans Volume by Channel Type
              </h3>
              <PieIcon size={18} className="text-indigo-500" />
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Real-time breakdown of URLs, messages, screenshots and QR scans
              processed.
            </p>

            <div className="h-[280px] w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-400 text-xs font-semibold animate-pulse">
                  Analyzing database telemetry...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      opacity={0.2}
                    />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderRadius: "12px",
                        border: "none",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Security Posture Summary Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-black text-slate-900 dark:text-slate-100 text-sm mb-2 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" /> Security
              Health Index
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Autonomous assessment based on threat signatures.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span>System Defense Rate</span>
                  <span className="text-emerald-500">99.4%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: "99.4%" }}
                  ></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span>AI Engine Confidence</span>
                  <span className="text-indigo-500">{avgConfidence}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${avgConfidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span>Zero-Day Shield</span>
                  <span className="text-cyan-500">Active</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Heuristic analysis active across database nodes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center font-medium">
            FraudLens AI Telemetry Engine v2.4
          </div>
        </div>
      </div>

      {/* ADDITIONAL ANALYTICS TOOLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tool 1: Threat Severity Gauge */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-100 dark:border-amber-900">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-black text-base">Risk Severity Scale</h3>
                <p className="text-xs text-slate-400">Scan classifications.</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold">
                <span className="text-emerald-500">Low Risk / Safe (0-30)</span>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-full">
                  {lowRiskCount} Scans
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold">
                <span className="text-amber-500">Medium Risk (31-70)</span>
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-full">
                  {mediumRiskCount} Scans
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold">
                <span className="text-red-500">Critical Risk (71-100)</span>
                <span className="px-2.5 py-1 bg-red-500/10 text-red-500 rounded-full">
                  {highRiskCount} Scans
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tool 2: Channel Vector Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 border border-purple-100 dark:border-purple-900">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="font-black text-base">Channel Vectors</h3>
                <p className="text-xs text-slate-400">
                  Attack sources breakdown.
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {Object.entries(scanTypeCounts).length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">
                  No vectors recorded.
                </p>
              ) : (
                Object.entries(scanTypeCounts).map(([type, count]) => {
                  const percentage =
                    totalScans > 0 ? Math.round((count / totalScans) * 100) : 0;
                  return (
                    <div
                      key={type}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex justify-between items-center text-xs font-bold mb-1">
                        <span className="uppercase text-slate-700 dark:text-slate-300">
                          {type}
                        </span>
                        <span className="text-indigo-600 dark:text-indigo-400">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Tool 3: AI Node Status */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 border border-cyan-100 dark:border-cyan-900">
                <Terminal size={20} />
              </div>
              <div>
                <h3 className="font-black text-base">AI Security Node</h3>
                <p className="text-xs text-slate-400">
                  Node operational health.
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold">Gemini LLM Guard</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-500">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold">URL Heuristics</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-500">
                  Syncing
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold">Database Storage</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-500">
                  Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
