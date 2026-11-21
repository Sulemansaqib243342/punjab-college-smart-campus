import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Check,
  GraduationCap,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Modal } from '../common/Modal';
import { CollegeLogoIcon } from '../common/CollegeLogo';
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
    }, 300);
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-12 font-sans antialiased selection:bg-[#ea432a] selection:text-white">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Side: Deep Navy Campus Card (Exact Mockup) */}
        <div className="hidden lg:flex lg:col-span-6 bg-[#122353] text-white rounded-3xl p-8 sm:p-10 flex-col justify-between min-h-[660px] shadow-xl relative overflow-hidden">
          {/* Top Brand Tag */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <CollegeLogoIcon size={18} />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">Smart Campus</span>
          </div>

          {/* Center Copy & Isometric Illustration */}
          <div className="space-y-5 my-auto">
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200">
                YOUR CAMPUS, CONNECTED.
              </span>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Great futures. <br />
                Smarter beginnings.
              </h2>
              <p className="text-xs text-blue-200/80">
                A simpler way to learn, teach and lead.
              </p>
            </div>

            {/* Embedded Isometric Campus Building Illustration Card with Minar-e-Pakistan */}
            <div className="bg-[#f4f6f9] rounded-2xl p-4 shadow-sm border border-white/10 max-w-md">
              <svg
                viewBox="0 0 500 370"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-2xs"
              >
                {/* Minar-e-Pakistan in Background (Tower Silhouette) */}
                <path
                  d="M 346 220 L 348 85 L 350 40 L 352 85 L 354 220 Z"
                  fill="#cbd5e1"
                  opacity="0.55"
                />
                <ellipse cx="350" cy="85" rx="7" ry="2.5" fill="#94a3b8" opacity="0.6" />
                <ellipse cx="350" cy="135" rx="9" ry="3.5" fill="#94a3b8" opacity="0.6" />
                <ellipse cx="350" cy="185" rx="12" ry="4.5" fill="#94a3b8" opacity="0.6" />
                <path d="M 349.5 40 L 350 18 L 350.5 40 Z" stroke="#64748b" strokeWidth="1.5" opacity="0.7" />

                {/* Courtyard Base */}
                <ellipse cx="250" cy="270" rx="200" ry="80" fill="#f1f5f9" />
                <ellipse cx="250" cy="270" rx="170" ry="65" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />

                {/* Pathway & Grass Patches */}
                <path d="M 230 325 L 250 245 L 270 325 Z" fill="#cbd5e1" />
                <ellipse cx="140" cy="275" rx="30" ry="12" fill="#dcfce7" />
                <ellipse cx="360" cy="275" rx="30" ry="12" fill="#dcfce7" />

                {/* Benches and Courtyard Trees */}
                <circle cx="130" cy="260" r="14" fill="#86efac" />
                <circle cx="145" cy="255" r="16" fill="#4ade80" />
                <rect x="136" y="270" width="4" height="10" fill="#78350f" />

                <circle cx="370" cy="260" r="14" fill="#86efac" />
                <circle cx="355" cy="255" r="16" fill="#4ade80" />
                <rect x="360" y="270" width="4" height="10" fill="#78350f" />

                {/* Main Red-Brick Collegiate Building */}
                {/* Left Wing */}
                <path d="M 120 175 L 210 140 L 210 235 L 120 265 Z" fill="#b91c1c" />
                <path d="M 130 135 L 220 105 L 210 140 L 120 175 Z" fill="#cbd5e1" stroke="#94a3b8" />

                {/* Right Wing */}
                <path d="M 290 140 L 380 175 L 380 265 L 290 235 Z" fill="#991b1b" />
                <path d="M 280 105 L 370 135 L 380 175 L 290 140 Z" fill="#cbd5e1" stroke="#94a3b8" />

                {/* Central Tower */}
                <path d="M 205 125 L 295 125 L 295 240 L 205 240 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <path d="M 225 240 L 225 200 Q 250 185 275 200 L 275 240 Z" fill="#1e293b" />
                <rect x="235" y="210" width="30" height="30" fill="#38bdf8" opacity="0.7" />
                <rect x="245" y="140" width="10" height="35" rx="2" fill="#ea432a" />

                {/* Windows Grid */}
                {[0, 1].map((row) =>
                  [0, 1, 2].map((col) => (
                    <rect
                      key={`w-left-${row}-${col}`}
                      x={135 + col * 24}
                      y={185 + row * 28 - col * 6}
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
                      y={170 + row * 28 + col * 6}
                      width="14"
                      height="18"
                      rx="7"
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                    />
                  ))
                )}

                {/* Clock Tower Pavilion */}
                <path d="M 235 125 L 250 45 L 265 125 Z" fill="#94a3b8" stroke="#64748b" />
                <circle cx="250" cy="95" r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="250" y1="95" x2="250" y2="89" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="250" y1="95" x2="254" y2="95" stroke="#0f172a" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Bottom Campus Identity */}
          <div className="pt-3 border-t border-white/10">
            <h4 className="font-extrabold text-xs text-white">Punjab College</h4>
            <p className="text-[11px] text-blue-200">Minar-e-Pakistan Campus, Lahore</p>
          </div>
        </div>

        {/* Right Side: Login Form Area (Exact Mockup) */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto space-y-6">
          {/* Back to Campus Link (Desktop) */}
          <div className="hidden lg:block">
            <button
              onClick={onGoToLanding}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <span>← Back to campus</span>
            </button>
          </div>

          {/* Mobile Header (Shown on mobile matching media_1795271471732_1ff8572d.png) */}
          <div
            className="lg:hidden flex items-center gap-3 pb-1 pt-1 cursor-pointer select-none"
            onClick={onGoToLanding}
          >
            <GraduationCap className="w-8 h-8 text-[#101c4e] stroke-[2]" />
            <div>
              <div className="font-extrabold text-lg text-[#101c4e] leading-tight tracking-tight">Smart Campus</div>
              <div className="text-[10px] font-bold text-slate-400 tracking-wider">
                PUNJAB COLLEGE · LAHORE
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101c4e] tracking-tight">
              Welcome back.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Sign in to your Smart Campus account.
            </p>
          </div>

          {/* "I am a" Role Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">I am a</label>

            {/* Mobile View: 3 Separate Rounded-2xl Button Cards (Exact Match to media_1795271471732_1ff8572d.png) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:hidden">
              {(['admin', 'teacher', 'student'] as UserRole[]).map((r) => {
                const isSelected = activeRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r)}
                    className={`py-3 px-3 text-center rounded-2xl text-xs sm:text-sm capitalize transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#101c4e] text-white shadow-xs font-bold border border-[#101c4e]'
                        : 'bg-white text-[#101c4e] font-semibold border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>

            {/* Desktop View: Segmented Pill Switcher (Exact Match to media_1795268497139_83bed6d0.jpg) */}
            <div className="hidden lg:flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-semibold">
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
              <label className="text-xs font-semibold text-slate-700 block">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smartcampus.demo"
                className="w-full px-4 py-3 rounded-2xl border border-blue-500 lg:border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] focus:border-[#101c4e] transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-2xl border border-slate-200 lg:border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] focus:border-[#101c4e] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-1.5 cursor-pointer select-none"
              >
                <Check
                  className={`w-4 h-4 stroke-[2.5] transition-colors ${
                    rememberMe ? 'text-[#101c4e]' : 'text-slate-300'
                  }`}
                />
                <span className="font-medium text-slate-600 text-xs">Remember me</span>
              </div>

              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="font-bold text-[#101c4e] hover:underline transition-colors cursor-pointer text-xs"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#101c4e] hover:bg-[#0c163d] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign in to Smart Campus'}
            </button>
          </form>

          {/* Explore with a Demo Account Box (Exact Match to media_1795271471732_1ff8572d.png) */}
          <div className="p-5 rounded-2xl bg-[#f4f7fe] space-y-3 text-left">
            <div className="text-xs sm:text-sm font-bold text-[#101c4e]">
              Explore with a demo account
            </div>

            <div className="space-y-2 text-xs">
              <div
                onClick={() => handleSelectDemoRow('admin')}
                className="flex items-center justify-between sm:justify-start sm:gap-8 cursor-pointer hover:opacity-80 py-0.5"
              >
                <span className="w-16 text-slate-500 font-medium">Admin</span>
                <span className="font-mono text-slate-700 text-xs">
                  admin@smartcampus.demo
                </span>
              </div>
              <div
                onClick={() => handleSelectDemoRow('teacher')}
                className="flex items-center justify-between sm:justify-start sm:gap-8 cursor-pointer hover:opacity-80 py-0.5"
              >
                <span className="w-16 text-slate-500 font-medium">Teacher</span>
                <span className="font-mono text-slate-700 text-xs">
                  teacher@smartcampus.demo
                </span>
              </div>
              <div
                onClick={() => handleSelectDemoRow('student')}
                className="flex items-center justify-between sm:justify-start sm:gap-8 cursor-pointer hover:opacity-80 py-0.5"
              >
                <span className="w-16 text-slate-500 font-medium">Student</span>
                <span className="font-mono text-slate-700 text-xs">
                  student@smartcampus.demo
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-800">
              Password for all roles: <span className="font-bold text-[#101c4e]">Demo@123</span>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="space-y-1.5 text-left text-xs text-slate-500 pt-1">
            <p>Need access? Contact the campus administrator.</p>
            <p className="text-slate-400">Protected access for the Punjab College community.</p>
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
