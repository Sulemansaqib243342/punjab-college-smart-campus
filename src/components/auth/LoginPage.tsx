import React, { useState } from 'react';
import {
  Shield,
  Briefcase,
  GraduationCap,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  School,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Modal } from '../common/Modal';
import { CollegeLogo } from '../common/CollegeLogo';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onGoToLanding: () => void;
  onGoToAdmission: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onGoToLanding,
  onGoToAdmission,
}) => {
  const store = useStore();
  const [email, setEmail] = useState('admin@smartcampus.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Forgot password state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const demoAccounts = [
    {
      role: 'admin',
      label: 'Campus Admin',
      email: 'admin@smartcampus.com',
      pass: 'Admin@123',
      name: 'Prof. Dr. Muhammad Asif',
      icon: <Shield className="w-4 h-4 text-[#ea432a]" />,
      bg: 'border-red-200 dark:border-red-900/50 hover:bg-red-50/50 dark:hover:bg-red-950/20',
    },
    {
      role: 'teacher',
      label: 'Faculty / Teacher',
      email: 'teacher@smartcampus.com',
      pass: 'Teacher@123',
      name: 'Prof. Tariq Mahmood (Head CS)',
      icon: <Briefcase className="w-4 h-4 text-[#232766]" />,
      bg: 'border-blue-200 dark:border-blue-900/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
    },
    {
      role: 'student',
      label: 'Student Portal',
      email: 'student@smartcampus.com',
      pass: 'Student@123',
      name: 'Muhammad Hamza Khan (11th ICS)',
      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />,
      bg: 'border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20',
    },
  ];

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = store.loginWithEmailPassword(email, password);
      setLoading(false);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Please use one of the demo credentials below.');
      }
    }, 400);
  };

  const fillDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
    store.loginWithEmailPassword(demoEmail, demoPass);
    onLoginSuccess();
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotModalOpen(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#191c4d] via-[#232766] to-[#0f1133] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar with Official Logo */}
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto">
        <button
          onClick={onGoToLanding}
          className="cursor-pointer bg-white/95 px-4 py-2 rounded-2xl shadow-lg border border-white/30 hover:scale-102 transition-transform"
        >
          <CollegeLogo size="sm" showText={true} showCampus={true} />
        </button>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={onGoToLanding}
            className="text-slate-200 hover:text-white transition-colors hidden sm:block cursor-pointer font-semibold"
          >
            ← Back to Campus Home
          </button>
          <button
            onClick={onGoToAdmission}
            className="px-4 py-2 rounded-xl bg-[#ea432a] hover:bg-[#d6341d] text-white font-bold shadow-md transition-colors cursor-pointer"
          >
            Online Admission 2024-25
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Banner with Official Punjab Colleges Header */}
        <div className="bg-[#232766] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#ea432a]/20 blur-xl"></div>
          <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-blue-400/20 blur-xl"></div>

          <div className="inline-flex p-3 rounded-2xl bg-white mb-3 shadow-md">
            <img
              src="/punjab-colleges-logo.png"
              alt="Punjab Colleges Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Smart Campus Portal</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
            Punjab Colleges, Minar-e-Pakistan Campus, Lahore
          </p>
          <div className="mt-3 inline-block px-3 py-0.5 rounded-full bg-[#ea432a] text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs">
            Role-Based Access Control System
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center gap-2.5 text-xs text-[#ea432a]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Portal Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smartcampus.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs font-semibold text-[#ea432a] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#232766] hover:bg-[#1a1d4d] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Smart Campus</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 1-Click Demo Accounts Section */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ⚡ 1-Click Demo Logins:
              </span>
              <span className="text-[10px] text-[#ea432a] font-bold">
                Click any role to test
              </span>
            </div>

            <div className="space-y-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => fillDemoAccount(acc.email, acc.pass)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${acc.bg}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-xs">
                      {acc.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{acc.label}</span>
                        <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
                          ({acc.email})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {acc.name} • <span className="font-mono text-[10px]">{acc.pass}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#232766] dark:text-blue-400">
                    Log in →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Portal Password"
        maxWidth="md"
      >
        {forgotSent ? (
          <div className="text-center py-4 space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Password Reset Link Sent</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A temporary password recovery link has been dispatched to <span className="font-semibold">{forgotEmail}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Enter your registered college email address. Our campus authentication system will send a secure password reset token.
            </p>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                College Email
              </label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="e.g. admin@smartcampus.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-[#232766] hover:bg-[#191c4d] rounded-lg shadow-sm cursor-pointer"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 py-2">
        <p>© {new Date().getFullYear()} Punjab Group of Colleges. Minar-e-Pakistan Campus Lahore. All rights reserved.</p>
      </div>
    </div>
  );
};
