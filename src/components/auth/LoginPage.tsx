import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Modal } from '../common/Modal';
import { CollegeLogo, CollegeLogoIcon } from '../common/CollegeLogo';
import { UserRole } from '../../types';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onGoToLanding: () => void;
  onGoToAdmission: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onGoToLanding,
}) => {
  const store = useStore();

  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@smartcampus.demo');
  const [password, setPassword] = useState('Demo@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const roleCredentials: Record<UserRole, { email: string; pass: string }> = {
    admin: { email: 'admin@smartcampus.demo', pass: 'Demo@123' },
    teacher: { email: 'teacher@smartcampus.demo', pass: 'Demo@123' },
    student: { email: 'student@smartcampus.demo', pass: 'Demo@123' },
  };

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    setEmail(roleCredentials[role].email);
    setPassword(roleCredentials[role].pass);
    setError(null);
  };

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
        setError('Invalid credentials. Please use demo credentials provided below.');
      }
    }, 350);
  };

  const handleSelectDemoRow = (role: UserRole) => {
    handleRoleChange(role);
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans antialiased selection:bg-[#ea432a] selection:text-white">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Deep Navy Campus Card (Visible on Desktop) */}
        <div className="hidden lg:flex lg:col-span-6 bg-[#16224f] text-white rounded-3xl p-10 flex-col justify-between min-h-[640px] shadow-xl relative overflow-hidden">
          {/* Top Brand Tag */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <CollegeLogoIcon size={18} />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">Smart Campus</span>
          </div>

          {/* Center Copy & Isometric Illustration */}
          <div className="space-y-6 my-auto">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200">
                Your campus, connected.
              </span>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Great futures. <br />
                Smarter beginnings.
              </h2>
              <p className="text-xs text-slate-300">
                A simpler way to learn, teach and lead.
              </p>
            </div>

            {/* Embedded Isometric Campus Building Illustration Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/10 max-w-md">
              <svg
                viewBox="0 0 500 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-2xs"
              >
                {/* Courtyard Base */}
                <ellipse cx="250" cy="265" rx="200" ry="80" fill="#f1f5f9" />
                <ellipse cx="250" cy="265" rx="170" ry="65" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                
                {/* Pathway */}
                <path d="M 230 320 L 250 240 L 270 320 Z" fill="#cbd5e1" />
                <ellipse cx="140" cy="270" rx="30" ry="12" fill="#dcfce7" />
                <ellipse cx="360" cy="270" rx="30" ry="12" fill="#dcfce7" />

                {/* Trees */}
                <circle cx="130" cy="255" r="14" fill="#86efac" />
                <circle cx="145" cy="250" r="16" fill="#4ade80" />
                <rect x="136" y="265" width="4" height="10" fill="#78350f" />

                <circle cx="370" cy="255" r="14" fill="#86efac" />
                <circle cx="355" cy="250" r="16" fill="#4ade80" />
                <rect x="360" y="265" width="4" height="10" fill="#78350f" />

                {/* Main Red-Brick Collegiate Building */}
                {/* Left Wing */}
                <path d="M 120 170 L 210 135 L 210 230 L 120 260 Z" fill="#b91c1c" />
                <path d="M 130 130 L 220 100 L 210 135 L 120 170 Z" fill="#cbd5e1" stroke="#94a3b8" />

                {/* Right Wing */}
                <path d="M 290 135 L 380 170 L 380 260 L 290 230 Z" fill="#991b1b" />
                <path d="M 280 100 L 370 130 L 380 170 L 290 135 Z" fill="#cbd5e1" stroke="#94a3b8" />

                {/* Central Tower */}
                <path d="M 205 120 L 295 120 L 295 235 L 205 235 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <path d="M 225 235 L 225 195 Q 250 180 275 195 L 275 235 Z" fill="#1e293b" />
                <rect x="235" y="205" width="30" height="30" fill="#38bdf8" opacity="0.7" />
                <rect x="245" y="135" width="10" height="35" rx="2" fill="#ea432a" />

                {/* Windows Grid */}
                {[0, 1].map((row) =>
                  [0, 1, 2].map((col) => (
                    <rect
                      key={`w-left-${row}-${col}`}
                      x={135 + col * 24}
                      y={180 + row * 28 - col * 6}
                      width="14"
                      height="18"
                      rx="7"
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                    />
                  ))
                )}
                {[0, 1].map((row) =>
                  [0, 1, 2].map((col) => (
                    <rect
                      key={`w-right-${row}-${col}`}
                      x={305 + col * 24}
                      y={165 + row * 28 + col * 6}
                      width="14"
                      height="18"
                      rx="7"
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                    />
                  ))
                )}

                {/* Clock Tower Spire */}
                <path d="M 235 120 L 250 40 L 265 120 Z" fill="#94a3b8" stroke="#64748b" />
                <circle cx="250" cy="90" r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="250" y1="90" x2="250" y2="84" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="250" y1="90" x2="254" y2="90" stroke="#0f172a" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Bottom Campus Identity */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="font-extrabold text-xs text-white">Punjab College</h4>
            <p className="text-[11px] text-blue-200">Minar-e-Pakistan Campus, Lahore</p>
          </div>
        </div>

        {/* Right Side: Login Form Area (Desktop & Mobile) */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto space-y-6">
          {/* Back to Campus Link */}
          <div>
            <button
              onClick={onGoToLanding}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to campus</span>
            </button>
          </div>

          {/* Mobile Header (Shown on mobile when left banner is hidden) */}
          <div className="lg:hidden flex items-center gap-3 pb-2">
            <div className="w-10 h-10 rounded-2xl bg-[#1b224b] text-white flex items-center justify-center shadow-xs">
              <CollegeLogoIcon size={20} />
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 leading-tight">Smart Campus</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                PUNJAB COLLEGE • LAHORE
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-[#1b224b] tracking-tight">
              Welcome back.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Sign in to your Smart Campus account.
            </p>
          </div>

          {/* "I am a" Role Segmented Switcher */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">I am a</label>
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 text-xs font-semibold">
              {(['admin', 'teacher', 'student'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleChange(r)}
                  className={`flex-1 py-2 text-center rounded-lg capitalize transition-all cursor-pointer ${
                    activeRole === r
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#ea432a] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smartcampus.demo"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#232766] focus:border-[#232766] transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#232766] focus:border-[#232766] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#232766] focus:ring-[#232766] border-slate-300 cursor-pointer accent-[#232766]"
                />
                <span className="font-medium text-slate-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="font-bold text-[#1b224b] hover:text-[#ea432a] transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign in to Smart Campus'}
            </button>
          </form>

          {/* Explore with a Demo Account Box */}
          <div className="p-4 rounded-2xl bg-[#f0f4fd] border border-blue-100/90 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Explore with a demo account</span>
            </div>

            <div className="space-y-1.5 text-xs">
              {(
                [
                  { role: 'admin', label: 'Admin', email: 'admin@smartcampus.demo' },
                  { role: 'teacher', label: 'Teacher', email: 'teacher@smartcampus.demo' },
                  { role: 'student', label: 'Student', email: 'student@smartcampus.demo' },
                ] as { role: UserRole; label: string; email: string }[]
              ).map((acc) => (
                <div
                  key={acc.role}
                  onClick={() => handleSelectDemoRow(acc.role)}
                  className={`flex items-center justify-between py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                    activeRole === acc.role
                      ? 'bg-white shadow-2xs font-bold text-slate-900'
                      : 'hover:bg-white/60 text-slate-600'
                  }`}
                >
                  <span className="w-16 font-semibold text-slate-800">{acc.label}</span>
                  <span className="font-mono text-[11px] text-slate-600 truncate">{acc.email}</span>
                </div>
              ))}
            </div>

            <div className="pt-1.5 border-t border-blue-200/50 text-[11px] font-bold text-slate-800">
              Password for all roles: <span className="font-mono text-[#ea432a]">Demo@123</span>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="space-y-1 text-center text-[11px] text-slate-400 pt-2">
            <p>Need access? Contact the campus administrator.</p>
            <p className="text-[10px] text-slate-400">Protected access for the Punjab College community.</p>
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
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Password Reset Link Sent</h4>
            <p className="text-xs text-slate-600">
              A temporary password recovery link has been dispatched to <span className="font-semibold">{forgotEmail}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your registered college email address. Our campus authentication system will send a secure password reset token.
            </p>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                College Email
              </label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="admin@smartcampus.demo"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-[#232766] hover:bg-[#191c4d] rounded-lg shadow-xs cursor-pointer"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
