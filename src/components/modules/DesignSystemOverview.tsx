import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  FileSpreadsheet,
  Award,
  Clock,
  BookOpen,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Check,
  X,
  Printer,
  Download,
  Share2,
  Shield,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { CollegeLogo, CollegeLogoIcon } from '../common/CollegeLogo';

export const DesignSystemOverview: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('ICS - Computer Science');
  const [activeTab, setActiveTab] = useState<'overview' | 'components'>('overview');

  const colorPalette = [
    { name: 'Deep Navy', hex: '#232766', text: 'text-white', bg: 'bg-[#232766]' },
    { name: 'Torch Red', hex: '#ea432a', text: 'text-white', bg: 'bg-[#ea432a]' },
    { name: 'Light Canvas', hex: '#f8fafc', text: 'text-slate-900', bg: 'bg-slate-50 border border-slate-200' },
    { name: 'Pure White', hex: '#ffffff', text: 'text-slate-900', bg: 'bg-white border border-slate-200' },
    { name: 'Dark Navy', hex: '#14173d', text: 'text-white', bg: 'bg-[#14173d]' },
    { name: 'Slate Gray', hex: '#64748b', text: 'text-white', bg: 'bg-slate-500' },
    { name: 'Border Mist', hex: '#e2e8f0', text: 'text-slate-800', bg: 'bg-slate-200' },
    { name: 'Royal Blue', hex: '#2563eb', text: 'text-white', bg: 'bg-blue-600' },
    { name: 'Success Green', hex: '#15803d', text: 'text-white', bg: 'bg-emerald-700' },
    { name: 'Mint Soft', hex: '#dcfce7', text: 'text-emerald-900', bg: 'bg-emerald-100 border border-emerald-300' },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ea432a] bg-red-50 dark:bg-red-950/60 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-900">
            Design Language & UI Architecture
          </span>
          <span className="text-xs text-slate-400">• Version 2.0 Production Ready</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#232766] dark:text-white tracking-tight">
          Built for a brighter campus.
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Punjab Colleges, Minar-e-Pakistan Campus Lahore. A complete, cohesive design system & component architecture engineered for clarity, accessibility, and high performance.
        </p>
      </div>

      {/* 01 / Color & Typography */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            01 / Color & Typography
          </h2>
          <span className="text-xs font-mono text-slate-400">Inter UI Font Family</span>
        </div>

        {/* Color Palette Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
          {colorPalette.map((c) => (
            <div key={c.name} className="flex flex-col">
              <div className={`h-16 rounded-xl ${c.bg} shadow-xs flex items-end p-2 transition-transform hover:scale-105`}>
                <span className={`text-[9px] font-mono font-bold ${c.text}`}>{c.hex}</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-1.5 truncate">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        {/* Typography Showcase Banner */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center gap-6">
          <div className="text-5xl font-black text-[#232766] dark:text-blue-300 font-sans tracking-tighter">
            Aa
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Inter — clear, confident, considered
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Engineered for readability in academic dashboards, transcripts, fee challans, and data tables.
            </p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs">
              <span className="font-extrabold text-slate-900 dark:text-white">Extrabold 800</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Bold 700</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Semibold 600</span>
              <span className="font-medium text-slate-600 dark:text-slate-400">Medium 500</span>
              <span className="font-normal text-slate-500">Regular 400</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 / Reusable Components & States */}
      <section className="space-y-6">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          02 / Reusable Components & States
        </h2>

        {/* Buttons / Actions */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Button Variations & Micro-States</span>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 bg-[#232766] hover:bg-[#1a1d4d] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
              <Check className="w-3.5 h-3.5" />
              Primary Solid
            </button>
            <button className="px-4 py-2 bg-[#ea432a] hover:bg-[#d4371f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
              <Sparkles className="w-3.5 h-3.5" />
              Accent Action
            </button>
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-xs font-semibold rounded-xl transition-colors cursor-pointer">
              Secondary Outline
            </button>
            <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium rounded-xl transition-colors cursor-pointer">
              Ghost Button
            </button>
            <button disabled className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 text-xs font-medium rounded-xl cursor-not-allowed">
              Disabled State
            </button>
          </div>
        </div>

        {/* Form Inputs & States */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Input Field States</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Default</label>
              <input
                type="text"
                placeholder="Enter roll number..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
                readOnly
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#232766] dark:text-blue-400 block mb-1">Focused / Active</label>
              <input
                type="text"
                value="PCL-24-101"
                className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#232766] dark:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden ring-2 ring-[#232766]/20"
                readOnly
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#ea432a] block mb-1">Error State</label>
              <input
                type="text"
                value="Invalid CNIC format"
                className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#ea432a] bg-red-50/50 dark:bg-red-950/20 text-[#ea432a] outline-hidden ring-2 ring-red-500/20"
                readOnly
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Disabled</label>
              <input
                type="text"
                value="Auto-generated"
                disabled
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/40 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Status Badges & Pills */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Indicators & Badges</span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Paid / Present
            </span>
            <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400 text-xs font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Defaulter / Absent
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 text-xs font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending / Leave
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 text-xs font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Partial / Enrolled
            </span>
            <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400 text-xs font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> 1st Position
            </span>
          </div>
        </div>

        {/* Dropdowns & Date Picker Mini-Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dropdown Spec */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Control</span>
            <div className="relative">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-white cursor-pointer">
                <span>{selectedGroup}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
              <div className="mt-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg space-y-1 text-xs">
                {['F.Sc Pre-Engineering', 'F.Sc Pre-Medical', 'ICS - Computer Science'].map((grp) => (
                  <div
                    key={grp}
                    onClick={() => setSelectedGroup(grp)}
                    className={`px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between ${
                      selectedGroup === grp
                        ? 'bg-[#232766] text-white font-bold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{grp}</span>
                    {selectedGroup === grp && <Check className="w-3.5 h-3.5" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mini Calendar Spec */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Calendar Widget</span>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs font-bold text-[#232766] dark:text-white mb-2">
                <span>November 2024</span>
                <span className="text-[11px] font-semibold text-emerald-600">89% Attendance</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="font-bold text-slate-400 py-1">{d}</span>
                ))}
                {Array.from({ length: 28 }).map((_, i) => {
                  const day = i + 1;
                  const isPresent = day % 7 !== 0 && day !== 14;
                  return (
                    <div
                      key={day}
                      className={`py-1 rounded-md font-mono text-[11px] ${
                        day === 21
                          ? 'bg-[#232766] text-white font-bold'
                          : isPresent
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Alert Banners */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Attendance recorded successfully for 11th ICS-A (22 students).</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold uppercase">Live</span>
          </div>

          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-300 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ea432a] shrink-0" />
              <span>Attendance Warning: 4 students below 75% BISE eligibility threshold.</span>
            </div>
            <button className="text-[11px] font-bold text-[#ea432a] underline cursor-pointer">
              Review Defaulters
            </button>
          </div>
        </div>
      </section>

      {/* 03 / Responsive Module Card */}
      <section className="space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          03 / Responsive Module Card
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#232766] dark:text-blue-400 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Student Directory</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Complete profiles, roll numbers, admission logs, and automated result generation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#232766] dark:text-blue-400">
              <span>65 Active Students</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950 text-[#ea432a] flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Examination & Ranks</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                BISE board mark validation, automated grading, position cards, and AI diagnostic reports.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#ea432a]">
              <span>Mid-Term Completed</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-linear-to-br from-[#1b1f52] to-[#232766] text-white shadow-md flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
              alt="Student"
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#ea432a]"
            />
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ea432a] text-white uppercase">
                1st Position • 92.4%
              </span>
              <h4 className="font-extrabold text-sm mt-1">Fatima Noor</h4>
              <p className="text-xs text-blue-200 font-mono">Roll: PCL-24-201 • Pre-Medical</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 / Dashboard Metrics */}
      <section className="space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          04 / Dashboard Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#232766] text-white shadow-md">
            <span className="text-xs text-blue-200">Total Enrolled</span>
            <div className="text-2xl font-black mt-1">2,450</div>
            <div className="mt-2 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <span>+4.5%</span> <span className="text-blue-200">from last session</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400">Faculty Members</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">11</div>
            <div className="mt-2 text-[11px] font-bold text-blue-600 dark:text-blue-400">
              100% Assigned Classes
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400">Fee Recovery Rate</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">94.2%</div>
            <div className="mt-2 text-[11px] font-bold text-emerald-600">
              PKR 1,430,000 Collected
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14173d] text-white border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400">Average Attendance</span>
            <div className="text-2xl font-black mt-1">87.5%</div>
            <div className="mt-2 text-[11px] font-bold text-emerald-400">
              Above Board Benchmark
            </div>
          </div>
        </div>
      </section>

      {/* 05 / Admissions Table Rows — Light & Dark Mode Preview */}
      <section className="space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          05 / Admissions Table Rows — Light & Dark Mode Preview
        </h2>

        {/* Light Row */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#232766] font-extrabold flex items-center justify-center text-xs">
              01
            </div>
            <div>
              <div className="font-bold text-xs">Muhammad Hamza Khan</div>
              <div className="text-[11px] text-slate-500">S/D of Tariq Khan • 35202-1234567-1</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-[#232766] font-bold">ICS - Computer Science</span>
            <span className="font-mono">980 / 1100 (89.1%)</span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Approved
            </span>
          </div>
        </div>

        {/* Dark Row */}
        <div className="p-4 rounded-xl bg-[#14173d] border border-slate-800 text-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#232766] text-white font-extrabold flex items-center justify-center text-xs">
              02
            </div>
            <div>
              <div className="font-bold text-xs">Ayesha Siddiqui</div>
              <div className="text-[11px] text-slate-400">S/D of Muhammad Siddique • 35201-9876543-2</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-blue-300 font-bold">F.Sc Pre-Medical</span>
            <span className="font-mono text-slate-300">1012 / 1100 (92.0%)</span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
              Approved
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
