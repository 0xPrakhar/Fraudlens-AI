import React, { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit3,
  Trash2,
  CheckCircle2,
  Sparkles,
  Lock,
  AlertTriangle,
  X
} from "lucide-react";
import { auth } from "../firebase/firebase";
import { deleteUserAccount } from "../services/api";

export default function ProfilePage() {
  const currentUser = auth.currentUser;

  const userName = currentUser?.displayName || "Aman";
  const userEmail = currentUser?.email || "amanyadav41569@gmail.com";
  const firebaseId = currentUser?.uid;

  const creationDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "August 2026";

  const [alertMessage, setAlertMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleComingSoon = (actionName) => {
    setAlertMessage(`${actionName} feature is coming soon in the next update!`);
    setTimeout(() => setAlertMessage(null), 4000);
  };

  // Real Delete Account Handler
  const handleDeleteAccount = async () => {
    if (!firebaseId) {
      alert("No active session found.");
      return;
    }

    setIsDeleting(true);
    try {
      // 1. Delete from MongoDB via backend
      await deleteUserAccount(firebaseId);

      // 2. Delete from Firebase Auth
      if (currentUser) {
        await currentUser.delete();
      }

      setShowDeleteModal(false);
      window.location.href = "/login";
    } catch (err) {
      console.error("Account deletion failed:", err);

      if (err.code === 'auth/requires-recent-login') {
        alert("For security, please log in again to confirm account deletion.");
        await auth.signOut();
        window.location.href = "/login";
      } else {
        alert(err.message || "Failed to delete account. Please try again later.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-900 dark:text-slate-100 pb-12 relative">
      {/* COMING SOON ALERT BANNER */}
      {alertMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl bg-indigo-600 text-white flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-4">
          <Sparkles size={18} />
          {alertMessage}
        </div>
      )}

      {/* HEADER TITLE */}
      <div>
        <h1 className="text-3xl font-black flex items-center gap-3">
          <User className="text-indigo-600 dark:text-indigo-400" size={32} />
          My Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Manage your account information, security credentials, and preferences.
        </p>
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 relative overflow-hidden">
        {/* Top Profile Info Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-indigo-500/20">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-xl shadow-md border-2 border-white dark:border-slate-900"
              title="Verified Account"
            >
              <CheckCircle2 size={14} />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight">{userName}</h2>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Account Since
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {creationDate}
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge Info */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-3 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
          <Lock size={16} />
          Your account is authenticated via Firebase Security and protected with end-to-end encryption.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => handleComingSoon("Edit Profile")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
          >
            <Edit3 size={16} /> Edit Profile
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-600 dark:text-slate-300 hover:text-red-600 font-bold rounded-2xl text-sm transition-all flex items-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </div>

      {/* CUSTOM MODERN DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Warning Icon & Header */}
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Delete Account
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  This action is permanent and irreversible
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete your account? All your scan histories, preferences, and profile data will be permanently wiped out from our servers.
            </p>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}