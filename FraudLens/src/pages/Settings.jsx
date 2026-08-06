import React, { useState } from "react";
import { Bell, Lock, Eye, Globe, Moon, Save, ChevronRight, Sparkles, ShieldCheck, MonitorSmartphone, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    privacy: {
      profileVisible: true,
      allowMessages: true,
      shareAnalytics: false,
    },
  });
  const [saved, setSaved] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setActiveAction("saved");
    window.setTimeout(() => setActiveAction(null), 1800);
  };

  const handleAction = (label) => {
    setActiveAction(label);
    window.setTimeout(() => setActiveAction(null), 1400);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setActiveAction("fill all password fields");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setActiveAction("use at least 8 characters");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setActiveAction("passwords do not match");
      return;
    }

    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswordModal(false);
    setSaved(true);
    setActiveAction("password changed successfully");
  };

  const SettingToggle = ({
    label,
    icon: Icon,
    value,
    onChange,
    description,
  }) => (
    <div
      className={`flex items-start justify-between rounded-2xl border p-4 transition-all ${isDark ? "border-slate-800 bg-slate-900/60 hover:bg-slate-800/80" : "border-slate-200 bg-white/90 hover:bg-slate-50"}`}
    >
      <div className="flex items-start gap-3 flex-1">
        <div className={`rounded-xl p-2 ${isDark ? "bg-slate-800 text-cyan-400" : "bg-cyan-50 text-cyan-600"}`}>
          <Icon size={16} />
        </div>
        <div>
          <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
            {label}
          </p>
          {description && (
            <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-600"}`}>
              {description}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onChange}
        aria-pressed={value}
        className={`relative h-6 w-11 rounded-full transition-all ${value ? "bg-blue-600" : isDark ? "bg-slate-700" : "bg-slate-300"}`}
      >
        <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${value ? "translate-x-5" : "translate-x-1"}`} />
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen px-4 py-6 transition-colors duration-300 sm:px-6 lg:px-8 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="mx-auto max-w-5xl">
        <div className={`mb-8 rounded-[28px] border p-6 shadow-sm backdrop-blur-xl ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white/80"}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${isDark ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-300" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>
                <Sparkles size={14} />
                Control Center
              </div>
              <h1 className={`mt-4 text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Settings</h1>
              <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Tune your experience, security, and notification preferences in one place.
              </p>
            </div>
            <div className={`rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-slate-800 bg-slate-950/70 text-slate-300" : "border-slate-200 bg-slate-50 text-slate-700"}`}>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" />
                Protection status: Active
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-[28px] border p-6 transition-colors duration-300 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white/80"}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Appearance</h2>
                <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Switch between light and dark themes instantly.</p>
              </div>
              <div className={`rounded-full border px-3 py-1 text-sm ${isDark ? "border-slate-700 bg-slate-800 text-slate-300" : "border-slate-200 bg-slate-100 text-slate-700"}`}>
                {mounted && theme === "dark" ? "Dark mode" : "Light mode"}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {['light', 'dark'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setTheme(mode);
                    handleAction(`${mode} theme`);
                  }}
                  className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${mounted && theme === mode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
                </button>
              ))}
            </div>
          </div>

          <div className={`rounded-[28px] border p-6 transition-colors duration-300 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white/80"}`}>
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-blue-500" />
              <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Notifications</h2>
            </div>
            <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Stay updated without overwhelming your workflow.</p>
            <div className="mt-5 space-y-3">
              <SettingToggle label="Email Notifications" icon={Bell} value={settings.notifications.email} onChange={() => handleToggle("notifications", "email")} description="Receive email alerts for important events" />
              <SettingToggle label="SMS Notifications" icon={MonitorSmartphone} value={settings.notifications.sms} onChange={() => handleToggle("notifications", "sms")} description="Get text message notifications" />
              <SettingToggle label="Push Notifications" icon={Bell} value={settings.notifications.push} onChange={() => handleToggle("notifications", "push")} description="Enable browser push notifications" />
            </div>
          </div>

          <div className={`rounded-[28px] border p-6 transition-colors duration-300 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white/80"}`}>
            <div className="flex items-center gap-2">
              <Lock size={18} className="text-emerald-500" />
              <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Privacy & Security</h2>
            </div>
            <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Control how your data is shared and protected.</p>
            <div className="mt-5 space-y-3">
              <SettingToggle label="Public Profile" icon={Eye} value={settings.privacy.profileVisible} onChange={() => handleToggle("privacy", "profileVisible")} description="Allow others to view your profile" />
              <SettingToggle label="Allow Messages" icon={Globe} value={settings.privacy.allowMessages} onChange={() => handleToggle("privacy", "allowMessages")} description="Let others send you messages" />
              <SettingToggle label="Share Analytics" icon={Globe} value={settings.privacy.shareAnalytics} onChange={() => handleToggle("privacy", "shareAnalytics")} description="Help us improve by sharing usage data" />
            </div>
          </div>

          <div className={`rounded-[28px] border p-6 transition-colors duration-300 ${isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white/80"}`}>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-rose-500" />
              <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Account Protection</h2>
            </div>
            <div className="mt-5 space-y-3">
              <button type="button" onClick={() => setShowPasswordModal(true)} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${isDark ? "border-slate-800 bg-slate-950/70 text-slate-300 hover:bg-slate-800" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>
                <span className="flex items-center gap-2"><Lock size={16} /> Change Password</span>
                <ChevronRight size={16} />
              </button>
              <button type="button" onClick={() => handleAction("2FA setup")} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${isDark ? "border-slate-800 bg-slate-950/70 text-slate-300 hover:bg-slate-800" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>
                <span className="flex items-center gap-2"><ShieldCheck size={16} /> Two-Factor Authentication</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-dashed border-slate-300/70 bg-transparent px-4 py-4 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              {saved ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Save size={16} />}
              <span>{saved ? "Preferences saved successfully" : "Changes apply instantly and can be saved anytime"}</span>
            </div>
            <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
              <Save size={16} />
              Save Changes
            </button>
          </div>

          {activeAction && (
            <div className={`rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-300" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>
              <div className="flex items-center gap-2">
                <ArrowRight size={16} />
                {activeAction.charAt(0).toUpperCase() + activeAction.slice(1)}.
              </div>
            </div>
          )}

          {showPasswordModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
              <div className={`w-full max-w-md rounded-[28px] border p-6 shadow-2xl ${isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Change Password</h3>
                    <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Update your password securely.</p>
                  </div>
                  <button type="button" onClick={() => setShowPasswordModal(false)} className={`rounded-full px-2 py-1 text-sm ${isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"}`}>
                    ✕
                  </button>
                </div>

                <form className="mt-5 space-y-3" onSubmit={handlePasswordSubmit}>
                  <label className="block text-sm">
                    <span className={`mb-1 block ${isDark ? "text-slate-300" : "text-slate-700"}`}>Current password</span>
                    <input type="password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))} className={`w-full rounded-2xl border px-3 py-2.5 text-sm outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />
                  </label>
                  <label className="block text-sm">
                    <span className={`mb-1 block ${isDark ? "text-slate-300" : "text-slate-700"}`}>New password</span>
                    <input type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))} className={`w-full rounded-2xl border px-3 py-2.5 text-sm outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />
                  </label>
                  <label className="block text-sm">
                    <span className={`mb-1 block ${isDark ? "text-slate-300" : "text-slate-700"}`}>Confirm password</span>
                    <input type="password" value={passwordForm.confirmPassword} onChange={(event) => setPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))} className={`w-full rounded-2xl border px-3 py-2.5 text-sm outline-none ${isDark ? "border-slate-700 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} />
                  </label>

                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setShowPasswordModal(false)} className={`rounded-2xl px-4 py-2 text-sm font-semibold ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                      Cancel
                    </button>
                    <button type="submit" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
