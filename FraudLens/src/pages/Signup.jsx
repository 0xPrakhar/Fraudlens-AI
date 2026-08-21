import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for Email Verification Popup Modal
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const syncUserWithBackend = async (user) => {
    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.displayName || name,
        email: user.email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server sync failed with status: ${response.status}`);
    }

    return await response.json();
  };

  const isValidRealEmail = (rawEmail) => {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) return false;

    const blockedKeywords = [
      "test",
      "exam",
      "fake",
      "dummy",
      "abc",
      "xyz",
      "asdf",
      "temp",
      "sample",
      "qwerty",
      "foo",
      "bar",
      "admin",
    ];

    const usernamePart = cleanEmail.split("@")[0];
    for (let word of blockedKeywords) {
      if (usernamePart === word || usernamePart.includes(word)) {
        return false;
      }
    }
    return true;
  };

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (!isValidRealEmail(email)) {
      setError(
        "Please enter a valid, active email address. Test or fake emails are not allowed.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      await sendEmailVerification(res.user);
      await syncUserWithBackend(res.user);

      await signOut(auth);
      setShowVerificationModal(true); // Show matching modal popup
    } catch (err) {
      console.error("❌ Signup failed:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      
      // ✨ Yeh line add karni hai taaki hamesha account selection prompt aaye
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const res = await signInWithPopup(auth, provider);
      await syncUserWithBackend(res.user);
      
      navigate(`/app/dashboard/${res.user.uid}`);
    } catch (err) {
      console.error("❌ Google Signup failed:", err);
      setError(err.message || "Google Signup Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-4 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md max-h-[95dvh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Shield size={28} />
              </div>
            </div>

            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              FraudLens
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
              Create Your Protected Account 🚀
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="XYZ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full py-3 pl-10 pr-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-all text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full py-3 pl-10 pr-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-all text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-3 pl-10 pr-12 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-all text-sm font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full py-3 pl-10 pr-12 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-all text-sm font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl text-xs font-semibold bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-70 cursor-pointer text-sm"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Get Protected <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                OR
              </span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold shadow-sm transition-all disabled:opacity-70 cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>

      {/* 📧 MATCHING MODERN MODAL POPUP FOR EMAIL VERIFICATION */}
      <AnimatePresence>
        {showVerificationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => navigate("/login")}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-2xl border border-cyan-500/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Verify Your Email
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Action required before signing in
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We've sent a verification link to your email inbox. Please
                verify your email address to activate your account. Check your{" "}
                <strong>Spam or Junk folder</strong> if you don't find it.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3.5 px-4 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  OK, Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
