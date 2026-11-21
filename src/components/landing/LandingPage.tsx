import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  BarChart3,
  Clock,
  BookOpen,
  Bell,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  School,
  ExternalLink,
} from 'lucide-react';
import { CollegeLogo } from '../common/CollegeLogo';

interface LandingPageProps {
  onGoToLogin: () => void;
  onGoToAdmission: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGoToLogin,
  onGoToAdmission,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const modules = [
    {
      title: 'Students',
      desc: 'Records, profiles & progress',
      icon: <Users className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Admissions',
      desc: 'A smooth start to campus life',
      icon: <UserPlus className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Teachers',
      desc: 'Faculty & staff, connected',
      icon: <GraduationCap className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Classes',
      desc: 'Organized learning spaces',
      icon: <School className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Attendance',
      desc: 'Every day accounted for',
      icon: <CalendarCheck className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Fees & finance',
      desc: 'Simple, transparent payments',
      icon: <CreditCard className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Examinations',
      desc: 'Assessments & results',
      icon: <BarChart3 className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Timetable',
      desc: 'A well-planned college day',
      icon: <Clock className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Library',
      desc: 'A world of knowledge',
      icon: <BookOpen className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
    {
      title: 'Notices',
      desc: 'Stay in the campus loop',
      icon: <Bell className="w-5 h-5 text-[#232766] dark:text-blue-400" />,
    },
  ];

  const notices = [
    {
      date: '20',
      month: 'NOV',
      category: 'ADMISSIONS',
      title: 'Intermediate admissions are now open',
      desc: 'Apply for the 2026-27 session. Your next chapter starts here.',
    },
    {
      date: '18',
      month: 'NOV',
      category: 'ACADEMICS',
      title: 'Mid-term examination schedule released',
      desc: 'View your date sheet and prepare with confidence.',
    },
    {
      date: '16',
      month: 'NOV',
      category: 'CAMPUS LIFE',
      title: 'Science & Innovation Fair 2026',
      desc: 'Ideas worth sharing. Join us on 26 November.',
    },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-[#ea432a] selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <CollegeLogo size="md" showText={true} showCampus={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#232766] font-bold hover:text-[#232766] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('modules')}
              className="hover:text-[#232766] transition-colors cursor-pointer"
            >
              Modules
            </button>
            <button
              onClick={() => scrollToSection('notices')}
              className="hover:text-[#232766] transition-colors cursor-pointer"
            >
              Notices
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="hover:text-[#232766] transition-colors cursor-pointer"
            >
              About us
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onGoToLogin}
              className="text-xs font-bold text-slate-700 hover:text-[#232766] transition-colors cursor-pointer px-3 py-2"
            >
              Log in
            </button>
            <button
              onClick={onGoToAdmission}
              className="px-4 py-2.5 rounded-xl bg-[#232766] hover:bg-[#1a1d4d] text-white text-xs font-bold shadow-xs transition-all hover:shadow-md cursor-pointer"
            >
              Apply for admission
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-[#232766] font-bold"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('modules')}
                className="text-left py-2 hover:text-[#232766]"
              >
                Modules
              </button>
              <button
                onClick={() => scrollToSection('notices')}
                className="text-left py-2 hover:text-[#232766]"
              >
                Notices
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="text-left py-2 hover:text-[#232766]"
              >
                About us
              </button>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={onGoToLogin}
                className="w-full py-2.5 text-center text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Log in to Portal
              </button>
              <button
                onClick={onGoToAdmission}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#232766] hover:bg-[#1a1d4d] rounded-xl shadow-xs cursor-pointer"
              >
                Apply for admission
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-10 pb-16 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 text-[11px] font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#232766]" />
              <span>ADMISSIONS OPEN • 2026-27</span>
            </div>

            {/* Main Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1b224b] tracking-tight leading-[1.08]">
              Think. Build. <br />
              Innovate.
            </h1>

            {/* Red Accent Bar */}
            <div className="w-16 h-1.5 bg-[#ea432a] rounded-full" />

            {/* Sub-headline & Description */}
            <div className="space-y-2 pt-1">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Your ambition. Our campus. One smarter future.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
                Welcome to Punjab College, Minar-e-Pakistan Campus, Lahore. A connected campus where learning and possibility come together.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={onGoToAdmission}
                className="px-6 py-3.5 rounded-xl bg-[#232766] hover:bg-[#1a1d4d] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] text-center cursor-pointer"
              >
                Start your admission
              </button>
              <button
                onClick={() => scrollToSection('modules')}
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold shadow-2xs transition-all text-center cursor-pointer"
              >
                Explore Smart Campus
              </button>
            </div>
          </div>

          {/* Right Column: Isometric Campus Illustration */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Isometric Campus Building SVG Illustration */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-50/80 to-slate-100/60 p-4 sm:p-6 border border-slate-200/60 shadow-xs">
                <svg
                  viewBox="0 0 500 380"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto drop-shadow-sm"
                >
                  {/* Courtyard Ground Plane */}
                  <ellipse cx="250" cy="275" rx="210" ry="85" fill="#f1f5f9" />
                  <ellipse cx="250" cy="275" rx="180" ry="70" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                  
                  {/* Pathway & Grass Patches */}
                  <path d="M 230 330 L 250 250 L 270 330 Z" fill="#cbd5e1" />
                  <ellipse cx="140" cy="280" rx="35" ry="14" fill="#dcfce7" />
                  <ellipse cx="360" cy="280" rx="35" ry="14" fill="#dcfce7" />

                  {/* Benches and Courtyard Trees */}
                  <circle cx="130" cy="265" r="14" fill="#86efac" />
                  <circle cx="145" cy="260" r="16" fill="#4ade80" />
                  <rect x="136" y="275" width="4" height="10" fill="#78350f" />

                  <circle cx="370" cy="265" r="14" fill="#86efac" />
                  <circle cx="355" cy="260" r="16" fill="#4ade80" />
                  <rect x="360" y="275" width="4" height="10" fill="#78350f" />

                  {/* Main Red-Brick Collegiate Building Body */}
                  {/* Left Wing */}
                  <path d="M 120 180 L 210 145 L 210 240 L 120 270 Z" fill="#b91c1c" />
                  <path d="M 120 180 L 130 140 L 220 110 L 210 145 Z" fill="#e2e8f0" />
                  {/* Left Roof */}
                  <path d="M 130 140 L 220 110 L 210 145 L 120 180 Z" fill="#cbd5e1" stroke="#94a3b8" />

                  {/* Right Wing */}
                  <path d="M 290 145 L 380 180 L 380 270 L 290 240 Z" fill="#991b1b" />
                  {/* Right Roof */}
                  <path d="M 280 110 L 370 140 L 380 180 L 290 145 Z" fill="#cbd5e1" stroke="#94a3b8" />

                  {/* Central Main Entrance & Clock Tower Pavilion */}
                  <path d="M 205 130 L 295 130 L 295 245 L 205 245 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                  {/* Portico Entrance Arch */}
                  <path d="M 225 245 L 225 205 Q 250 190 275 205 L 275 245 Z" fill="#1e293b" />
                  {/* Glass Door / Steps */}
                  <rect x="235" y="215" width="30" height="30" fill="#38bdf8" opacity="0.7" />
                  <line x1="250" y1="215" x2="250" y2="245" stroke="#0f172a" strokeWidth="2" />
                  <rect x="220" y="243" width="60" height="5" rx="2" fill="#94a3b8" />

                  {/* Red Academic Banner on Central Pavilion */}
                  <rect x="245" y="145" width="10" height="35" rx="2" fill="#ea432a" />

                  {/* Windows Grid - Left Wing */}
                  {[0, 1].map((row) =>
                    [0, 1, 2].map((col) => (
                      <rect
                        key={`lw-${row}-${col}`}
                        x={135 + col * 24}
                        y={190 + row * 30 - col * 6}
                        width="14"
                        height="20"
                        rx="7"
                        fill="#f8fafc"
                        stroke="#cbd5e1"
                      />
                    ))
                  )}

                  {/* Windows Grid - Right Wing */}
                  {[0, 1].map((row) =>
                    [0, 1, 2].map((col) => (
                      <rect
                        key={`rw-${row}-${col}`}
                        x={305 + col * 24}
                        y={175 + row * 30 + col * 6}
                        width="14"
                        height="20"
                        rx="7"
                        fill="#f8fafc"
                        stroke="#cbd5e1"
                      />
                    ))
                  )}

                  {/* Spire / Academic Clock Tower */}
                  <path d="M 235 130 L 250 50 L 265 130 Z" fill="#94a3b8" stroke="#64748b" />
                  <circle cx="250" cy="100" r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="250" y1="100" x2="250" y2="94" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="250" y1="100" x2="254" y2="100" stroke="#0f172a" strokeWidth="1.5" />
                </svg>

                {/* Floating Bottom Card */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white rounded-xl p-3.5 shadow-lg border border-slate-200/80 max-w-[210px] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>A campus built around you</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Learning. Community. Opportunity.
                  </p>
                  <button
                    onClick={() => scrollToSection('community')}
                    className="text-[11px] font-bold text-[#232766] hover:underline flex items-center gap-1 pt-0.5 cursor-pointer"
                  >
                    <span>Discover what comes next</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navy Stats Band */}
      <section className="bg-[#1b224b] text-white py-9 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-black tracking-tight">2,450+</div>
            <div className="text-xs text-blue-200 font-medium">Students learning</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-black tracking-tight">120+</div>
            <div className="text-xs text-blue-200 font-medium">Dedicated teachers</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-black tracking-tight">68</div>
            <div className="text-xs text-blue-200 font-medium">Active classes</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-black tracking-tight">10</div>
            <div className="text-xs text-blue-200 font-medium">Connected modules</div>
          </div>
        </div>
      </section>

      {/* 10 Connected Modules Section */}
      <section id="modules" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-1 mb-10">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ea432a]">
            One campus. Every possibility.
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b224b] tracking-tight">
            Everything your campus needs.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Ten connected modules. One seamless experience for students, teachers and administrators.
          </p>
        </div>

        {/* 10 Module Cards Grid (2 rows of 5 on desktop, 2 cols on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {modules.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  {m.icon}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{m.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* "What's happening" / Campus Pulse Section */}
      <section id="notices" className="py-16 bg-slate-100/60 border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ea432a]">
              The campus pulse
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b224b] tracking-tight">
              What's happening
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              The latest news, important dates and opportunities to get involved.
            </p>
            <div className="pt-2">
              <button
                onClick={onGoToLogin}
                className="text-xs font-bold text-[#232766] hover:text-[#ea432a] hover:underline flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>View all notices</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Notice Items */}
          <div className="lg:col-span-7 space-y-3.5">
            {notices.map((n, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex items-start gap-4"
              >
                {/* Date Box */}
                <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 leading-none">{n.month}</span>
                  <span className="text-lg font-black text-slate-800 leading-tight">{n.date}</span>
                </div>

                {/* Content */}
                <div className="space-y-0.5 flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ea432a]">
                    {n.category}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                    {n.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Testimonials Section */}
      <section id="community" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1b224b] tracking-tight">
            A community that moves you forward.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Quote Card 1: Student */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
            <blockquote className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
              "Everything I need for college, finally in one place."
            </blockquote>
            <div className="pt-2 border-t border-slate-100">
              <div className="font-extrabold text-xs text-slate-900">Ayesha Ahmed</div>
              <div className="text-[11px] text-slate-500">ICS student • Class of 2026</div>
            </div>
          </div>

          {/* Quote Card 2: Faculty */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
            <blockquote className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
              "More time teaching. Less time on paperwork."
            </blockquote>
            <div className="pt-2 border-t border-slate-100">
              <div className="font-extrabold text-xs text-slate-900">Muhammad Hassan</div>
              <div className="text-[11px] text-slate-500">Faculty • Department of Physics</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer Red & Navy Banner */}
      <section className="bg-[#1b224b] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="w-10 h-1 bg-[#ea432a] rounded-full mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Your next chapter starts here.
            </h2>
            <p className="text-xs sm:text-sm text-blue-200">
              Join Punjab College. Build a future that's yours.
            </p>
          </div>

          <button
            onClick={onGoToAdmission}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#ea432a] hover:bg-[#d6341d] text-white font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.02] cursor-pointer text-center"
          >
            Apply for admission
          </button>
        </div>
      </section>

      {/* Clean Modern Footer */}
      <footer className="bg-[#121633] text-slate-300 py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-2">
            <div className="font-black text-base text-white tracking-tight">Smart Campus</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Punjab College
            </div>
            <p className="text-xs text-slate-400">Minar-e-Pakistan Campus, Lahore</p>
            <p className="text-xs text-[#ea432a] font-semibold pt-1">Think. Build. Innovate.</p>
          </div>

          {/* Discover Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Discover</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => scrollToSection('modules')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Campus modules
                </button>
              </li>
              <li>
                <button
                  onClick={onGoToAdmission}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Admissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('notices')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Campus notices
                </button>
              </li>
            </ul>
          </div>

          {/* Help Contact */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              We're here to help
            </h4>
            <p className="text-slate-400">Admissions office</p>
            <p className="text-slate-400">Monday – Saturday • 8am – 4pm</p>
            <p className="text-slate-400">Visit our campus in Lahore</p>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} Punjab Colleges. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of use</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
