import React, { useState } from 'react';
import {
  CalendarCheck,
  Award,
  CreditCard,
  Clock,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Printer,
  ArrowRight,
  CheckCircle2,
  Bell,
  Download,
  FileText,
  User,
  Shield,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Modal } from '../common/Modal';

interface StudentDashboardProps {
  onNavigate: (view: string) => void;
  onOpenPerformance: () => void;
  onOpenResultCard: () => void;
  onOpenFeeVoucher: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigate,
  onOpenPerformance,
  onOpenResultCard,
  onOpenFeeVoucher,
}) => {
  const store = useStore();
  const currentUser = store.currentUser;
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Block */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
          STUDENT DASHBOARD
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101c4e] dark:text-white tracking-tight">
          Keep moving forward, Abdul Rehman.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Your progress, your plans and everything you need for a great college day.
        </p>
      </div>

      {/* 2. Dark Navy Hero Banner (Exact Mockup) */}
      <div className="bg-[#101c4e] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-blue-200 uppercase">
            SATURDAY, 21 NOVEMBER 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Keep going, Abdul Rehman.
          </h2>
          <p className="text-xs sm:text-sm text-blue-200/90 font-medium">
            ICS Part 1 · A / Roll no. ICS1-026
          </p>
        </div>

        {/* Profile Button: Stacks on mobile, inline pill on desktop */}
        <div className="w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setProfileModalOpen(true)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl sm:rounded-full bg-white text-[#101c4e] font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all cursor-pointer shadow-xs text-center"
          >
            My profile
          </button>
        </div>
      </div>

      {/* 3. Top 3 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: Attendance */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Attendance
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Last 25 teaching days
              </p>
            </div>

            {/* Circular Donut Gauge & Stat */}
            <div className="flex items-center gap-4 mt-3 py-1">
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 dark:text-slate-800"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#059669]"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray="92, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-black text-xs text-slate-900 dark:text-white">
                  92%
                </span>
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  23 / 25 days
                </div>
                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Above the 75% minimum
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('attendance')}
            className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            View attendance
          </button>
        </div>

        {/* Card 2: Latest result */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Latest result
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Mid-term I · November 2026
              </p>
            </div>

            {/* Score & Pass Badge */}
            <div className="flex items-center gap-2.5 mt-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                84%
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                Pass
              </span>
            </div>

            <div className="mt-2 space-y-0.5">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                420 / 500 marks · Grade A
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Rank 3 / 42 · Class average 76%
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-0.5">
                Published 20 Nov · Completed 18 Nov
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenResultCard}
            className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            View result
          </button>
        </div>

        {/* Card 3: November fees */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                November fees
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Due 25 November 2026
              </p>
            </div>

            {/* Fee Amount & Partial Badge */}
            <div className="flex items-center gap-2.5 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-500">
                Rs 4,000
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold">
                Partial
              </span>
            </div>

            <div className="mt-2 space-y-0.5">
              <div className="text-xs text-slate-400 dark:text-slate-500">
                Balance remaining
              </div>
              <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Voucher Rs 10,000 · Paid Rs 6,000
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                4 days left to clear your balance
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenFeeVoucher}
            className="w-full mt-4 py-3 rounded-xl bg-[#101c4e] hover:bg-[#0c163d] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer text-center"
          >
            View fee voucher
          </button>
        </div>
      </div>

      {/* 4. Middle Grid: Today's Timetable & Campus Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Today's Timetable (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Today's timetable
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Saturday, 21 Nov · ICS Part 1 · A
              </p>
            </div>

            {/* 4 Lecture Slots */}
            <div className="space-y-3.5 my-4">
              {/* Slot 1: English */}
              <div className="flex items-center justify-between py-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white w-28 shrink-0">
                  08:00 – 08:45
                </span>
                <div className="flex-1 px-3">
                  <div className="font-bold text-slate-900 dark:text-white">
                    English
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Sir Asad
                  </div>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-right shrink-0">
                  Q-203
                </span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Slot 2: Urdu */}
              <div className="flex items-center justify-between py-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white w-28 shrink-0">
                  08:45 – 09:30
                </span>
                <div className="flex-1 px-3">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Urdu
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Sir Yousaf
                  </div>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-right shrink-0">
                  Q-202
                </span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Slot 3: Computer Science */}
              <div className="flex items-center justify-between py-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white w-28 shrink-0">
                  09:45 – 10:30
                </span>
                <div className="flex-1 px-3">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Computer Science
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Sir Faisal
                  </div>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-right shrink-0">
                  CS Lab 1
                </span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Slot 4: Mathematics */}
              <div className="flex items-center justify-between py-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white w-28 shrink-0">
                  10:30 – 11:15
                </span>
                <div className="flex-1 px-3">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Mathematics
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Sir Amin
                  </div>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-right shrink-0">
                  Q-204
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('timetable')}
            className="w-full mt-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            View full timetable
          </button>
        </div>

        {/* Right Column: Campus Notices (5 cols on desktop) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Campus notices
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Important updates for your week
              </p>
            </div>

            {/* 3 Notices */}
            <div className="space-y-3.5">
              {/* Notice 1 */}
              <div
                onClick={() => onNavigate('notices')}
                className="space-y-1 cursor-pointer group"
              >
                <span className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                  Exam
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Mid-term I results are live
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  Published 20 Nov · Open your subject-wise result and teacher feedback.
                </p>
              </div>

              {/* Notice 2 */}
              <div
                onClick={() => onNavigate('notices')}
                className="space-y-1 cursor-pointer group"
              >
                <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  General
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Library hours extended
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  21 Nov · Study spaces remain open until 5:00 PM during assessment week.
                </p>
              </div>

              {/* Notice 3 */}
              <div
                onClick={() => onNavigate('notices')}
                className="space-y-1 cursor-pointer group"
              >
                <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                  General
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  November fee reminder
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  21 Nov · Clear the remaining balance by 25 Nov to avoid a late fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Study Resources */}
      <div className="space-y-3">
        <div className="space-y-0.5">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Study resources
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Your latest class materials, ready when you are
          </p>
        </div>

        {/* 3 Material Cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Resource 1 */}
          <div
            onClick={() => onNavigate('materials')}
            className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
          >
            <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400 mb-2.5 stroke-[1.8]" />
            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
              Programming Fundamentals.pdf
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Sir Faisal · 1.8 MB
            </div>
          </div>

          {/* Resource 2 */}
          <div
            onClick={() => onNavigate('materials')}
            className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
          >
            <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400 mb-2.5 stroke-[1.8]" />
            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
              Urdu Adab & Qawaid Notes.pdf
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Sir Yousaf · 1.2 MB
            </div>
          </div>

          {/* Resource 3 */}
          <div
            onClick={() => onNavigate('materials')}
            className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
          >
            <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400 mb-2.5 stroke-[1.8]" />
            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
              Essay Writing Guide.docx
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Sir Asad · 640 KB
            </div>
          </div>
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={() => onNavigate('materials')}
            className="py-2.5 px-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            All study materials
          </button>
        </div>
      </div>

      {/* 6. Footer Note (Exact Mockup) */}
      <div className="text-xs text-slate-400 dark:text-slate-500 pt-2 pb-4 text-center sm:text-left">
        Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore
      </div>

      {/* Student Profile Modal */}
      <Modal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Student Profile"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f4f7fe] dark:bg-slate-800/50">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
              alt="Abdul Rehman"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#101c4e]"
            />
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Abdul Rehman
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                ICS Part 1 · Section A · Computer Science Group
              </p>
              <div className="text-[11px] font-bold text-[#101c4e] dark:text-blue-400 mt-1">
                Roll No: ICS1-026 · Punjab College Lahore
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Father's Name:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Raza Ullah
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Student Portal Email:</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                student@smartcampus.demo
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Attendance Benchmark:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                92% (Above 75% BISE requirement)
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Mid-term Standing:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Rank 3 in Class (84% · Grade A)
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Campus:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Minar-e-Pakistan Campus, Lahore
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setProfileModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#101c4e] text-white text-xs font-bold cursor-pointer hover:bg-[#0c163d]"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
