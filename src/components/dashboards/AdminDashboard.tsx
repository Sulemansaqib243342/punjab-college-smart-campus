import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  Calendar,
  ChevronDown,
  Check,
  FileText,
  BarChart3,
  Plus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useStore } from '../../lib/store';

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
  onOpenPerformanceForStudent?: (studentId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const store = useStore();
  const isDarkMode = store.theme === 'dark';
  const [activePage, setActivePage] = useState(1);
  const [monthSelectorOpen, setMonthSelectorOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('November 2026');

  // Fee collection chart data (matching Jun-Nov 2026 mockup)
  const feeMonthlyData = [
    { month: 'Jun', collected: 3.2, pending: 1.6 },
    { month: 'Jul', collected: 3.9, pending: 1.4 },
    { month: 'Aug', collected: 3.5, pending: 1.8 },
    { month: 'Sep', collected: 4.1, pending: 1.2 },
    { month: 'Oct', collected: 4.5, pending: 1.4 },
    { month: 'Nov', collected: 4.82, pending: 1.18 },
  ];

  // Attendance donut data (93% Present, 7% Absent)
  const attendancePieData = [
    { name: 'Present', value: 93 },
    { name: 'Absent', value: 7 },
  ];

  // Recent admissions applications
  const recentAdmissions = [
    {
      name: 'Ayesha Ahmed',
      appNumber: 'PC-2026-0142',
      programme: 'ICS',
      appliedOn: '20 Nov 2026',
      feeStatus: 'Paid' as const,
    },
    {
      name: 'Ali Raza',
      appNumber: 'PC-2026-0141',
      programme: 'FSc Pre-Eng.',
      appliedOn: '20 Nov 2026',
      feeStatus: 'Unpaid' as const,
    },
    {
      name: 'Fatima Noor',
      appNumber: 'PC-2026-0140',
      programme: 'FSc Pre-Med.',
      appliedOn: '19 Nov 2026',
      feeStatus: 'Paid' as const,
    },
    {
      name: 'Hassan Malik',
      appNumber: 'PC-2026-0139',
      programme: 'ICom',
      appliedOn: '19 Nov 2026',
      feeStatus: 'Unpaid' as const,
    },
  ];

  // Campus notices
  const campusNotices = [
    {
      id: '1',
      title: 'Admissions now open',
      subtitle: 'Session 2026–27 • 20 Nov',
      type: 'admissions',
    },
    {
      id: '2',
      title: 'Mid-term date sheet',
      subtitle: 'Academics • 18 Nov',
      type: 'academics',
    },
    {
      id: '3',
      title: 'Science & Innovation Fair',
      subtitle: '28 November • Campus life',
      type: 'campus_life',
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Mobile-Only Search Bar (As seen in mobile mockups) */}
      <div className="md:hidden relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Search campus..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11182c] text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#232766] shadow-2xs"
        />
      </div>

      {/* Breadcrumb & Dashboard Title Header */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          DASHBOARD / OVERVIEW
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              Campus at a glance.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span className="sm:hidden">Your campus, moving forward.</span>
              <span className="hidden sm:inline">
                A clear view of the people, progress and possibilities on campus.
              </span>
            </p>
          </div>

          {/* Month Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMonthSelectorOpen(!monthSelectorOpen)}
              className="px-3.5 py-2 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#11182c] text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between sm:justify-start gap-2 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{selectedMonth}</span>
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {monthSelectorOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-[#11182c] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-30 text-xs font-semibold">
                {['November 2026', 'October 2026', 'September 2026', 'August 2026'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(m);
                      setMonthSelectorOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left transition-colors cursor-pointer ${
                      selectedMonth === m
                        ? 'bg-[#1b224b] text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top 4 Metric Cards (Row on desktop, 2x2 grid on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Students (Deep Navy Primary) */}
        <div
          onClick={() => onNavigate('students')}
          className="bg-[#1b224b] dark:bg-[#172352] text-white rounded-2xl p-4 sm:p-5 border border-[#1b224b] dark:border-blue-900/50 shadow-xs cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-200 font-semibold">Total students</span>
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 shrink-0" />
          </div>
          <div className="my-2 sm:my-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight">2,450</div>
          </div>
          <div className="text-[11px] sm:text-xs text-blue-200/90 font-medium">
            <span className="sm:hidden">+8.2% this month</span>
            <span className="hidden sm:inline">+8.2% vs last month</span>
          </div>
        </div>

        {/* Card 2: Total Teachers */}
        <div
          onClick={() => onNavigate('teachers')}
          className="bg-white dark:bg-[#11182c] rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total teachers</span>
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          </div>
          <div className="my-2 sm:my-3">
            <div className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              120
            </div>
          </div>
          <div className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="sm:hidden">+4 this month</span>
            <span className="hidden sm:inline">+4 joined this month</span>
          </div>
        </div>

        {/* Card 3: Active Classes */}
        <div
          onClick={() => onNavigate('timetable')}
          className="bg-white dark:bg-[#11182c] rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Active classes</span>
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          </div>
          <div className="my-2 sm:my-3">
            <div className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              68
            </div>
          </div>
          <div className="text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold">
            <span className="sm:hidden">4 programmes</span>
            <span className="hidden sm:inline">Across 4 programmes</span>
          </div>
        </div>

        {/* Card 4: Fee Collected */}
        <div
          onClick={() => onNavigate('fees')}
          className="bg-white dark:bg-[#11182c] rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Fee collected</span>
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          </div>
          <div className="my-2 sm:my-3">
            <div className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              Rs 4.82M
            </div>
          </div>
          <div className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="sm:hidden">+12.4% this month</span>
            <span className="hidden sm:inline">+12.4% vs last month</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Fee Collection & Attendance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Fee Collection Dual Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#11182c] rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <h2 className="font-bold text-base text-[#1b224b] dark:text-white leading-tight">
              Fee collection
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Collected vs pending • Jun–Nov 2026
            </p>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              Rs 4.82M
            </div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              80.3% collected
            </div>
          </div>

          {/* Grouped Bar Chart */}
          <div className="h-56 sm:h-64 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={feeMonthlyData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDarkMode ? '#1e293b' : '#f1f5f9'}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: isDarkMode ? '#94a3b8' : '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: isDarkMode ? '#94a3b8' : '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${val}M`}
                  domain={[0, 6]}
                  ticks={[0, 2, 4, 6]}
                />
                <Tooltip
                  cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
                  formatter={(val: any, name: any) => [
                    `Rs ${val}M`,
                    name === 'collected' ? 'Collected' : 'Pending',
                  ]}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: isDarkMode ? '#ffffff' : '#0f172a',
                  }}
                />
                <Bar
                  dataKey="collected"
                  name="collected"
                  fill={isDarkMode ? '#5c7cfa' : '#1b224b'}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={16}
                />
                <Bar
                  dataKey="pending"
                  name="pending"
                  fill={isDarkMode ? '#f87171' : '#ea432a'}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-5 text-xs pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#1b224b] dark:bg-[#5c7cfa]" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">Collected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#ea432a] dark:bg-[#f87171]" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">Pending</span>
            </div>
          </div>
        </div>

        {/* Right: Attendance Overview Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#11182c] rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-base text-[#1b224b] dark:text-white leading-tight">
              Attendance overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Today • Friday, 20 November
            </p>
          </div>

          {/* Radial Donut Ring */}
          <div className="h-52 sm:h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={88}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={isDarkMode ? '#82aaff' : '#1b224b'} />
                  <Cell fill={isDarkMode ? '#7f1d1d' : '#fecdd3'} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl sm:text-4xl font-black text-[#1b224b] dark:text-white tracking-tight">
                93%
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">
                Present today
              </span>
            </div>
          </div>

          {/* Attendance Legend */}
          <div className="flex items-center justify-center gap-6 text-xs pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#1b224b] dark:bg-[#82aaff]" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Present &nbsp;2,279
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#ea432a] dark:bg-[#f87171]" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Absent &nbsp;171
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Admissions & Campus Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Admissions Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#11182c] rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-[#1b224b] dark:text-white leading-tight">
                Recent admissions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The newest faces on campus.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('admissions')}
              className="text-xs font-semibold text-[#1b224b] dark:text-blue-400 hover:underline cursor-pointer"
            >
              View all →
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 dark:text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800/80">
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Programme</th>
                  <th className="pb-3 font-medium">Applied on</th>
                  <th className="pb-3 font-medium text-right">Fee status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {recentAdmissions.map((adm) => (
                  <tr key={adm.appNumber} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 pr-3">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {adm.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {adm.appNumber}
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-slate-700 dark:text-slate-300 font-medium">
                      {adm.programme}
                    </td>
                    <td className="py-3 pr-3 text-slate-500 dark:text-slate-400">
                      {adm.appliedOn}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          adm.feeStatus === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 dark:border dark:border-emerald-800/40'
                            : 'bg-red-50 text-red-700 dark:bg-red-950/70 dark:text-red-400 dark:border dark:border-red-800/40'
                        }`}
                      >
                        {adm.feeStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked List */}
          <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {recentAdmissions.map((adm) => (
              <div key={adm.appNumber} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {adm.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {adm.appNumber} • {adm.programme}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    adm.feeStatus === 'Paid'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 dark:border dark:border-emerald-800/40'
                      : 'bg-red-50 text-red-700 dark:bg-red-950/70 dark:text-red-400 dark:border dark:border-red-800/40'
                  }`}
                >
                  {adm.feeStatus}
                </span>
              </div>
            ))}
          </div>

          {/* Table Pagination / Mobile View All */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="hidden sm:inline">Showing 4 of 12 new applications</span>
            <div className="hidden sm:flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                onClick={() => setActivePage(Math.max(1, activePage - 1))}
                className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                ‹
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActivePage(p)}
                  className={`w-6 h-6 rounded-md flex items-center justify-center font-bold cursor-pointer ${
                    activePage === p
                      ? 'bg-[#1b224b] dark:bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setActivePage(Math.min(3, activePage + 1))}
                className="w-6 h-6 rounded-md border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                ›
              </button>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('admissions')}
              className="sm:hidden w-full text-center py-2 text-xs font-bold text-[#1b224b] dark:text-blue-400 hover:underline cursor-pointer"
            >
              View all 12 applications →
            </button>
          </div>
        </div>

        {/* Right: Campus Notices (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#11182c] rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-[#1b224b] dark:text-white leading-tight">
                Campus notices
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Keep your community in the loop.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('notices')}
              className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Create new announcement"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Notices List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {campusNotices.map((n) => (
              <div
                key={n.id}
                onClick={() => onNavigate('notices')}
                className="py-3 flex items-start gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 rounded-xl px-1.5 transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1b224b] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  {n.type === 'admissions' && <FileText className="w-4 h-4" />}
                  {n.type === 'academics' && <Calendar className="w-4 h-4" />}
                  {n.type === 'campus_life' && <BarChart3 className="w-4 h-4" />}
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {n.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Footer Note */}
      <div className="pt-2 pb-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 gap-2">
        <span>Demo campus data • Updated 20 Nov 2026, 9:41am</span>
        <span>Punjab College • Minar-e-Pakistan Campus, Lahore</span>
      </div>
    </div>
  );
};
