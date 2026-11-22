import React, { useState } from 'react';
import {
  Laptop,
  Users,
  Clock,
  ChevronRight,
  ChevronDown,
  FileText,
  CalendarCheck,
  CheckCircle2,
  X,
  BookOpen,
  ArrowRight,
  Shield,
  User,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { Modal } from '../common/Modal';

interface TeacherDashboardProps {
  onNavigate: (view: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const store = useStore();
  const currentUser = store.currentUser;

  // Selected class for Quick Attendance
  const [selectedClass, setSelectedClass] = useState<'ICS Part 1 · A' | 'ICS Part 2 · A' | 'ICS Part 1 · B'>(
    'ICS Part 1 · A'
  );
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [attendanceSuccess, setAttendanceSuccess] = useState(false);

  // Quick attendance dataset based on selection
  const attendanceStats: Record<
    string,
    { present: number; absent: number; leave: number; learners: number; lastMarked: string }
  > = {
    'ICS Part 1 · A': { present: 39, absent: 2, leave: 1, learners: 42, lastMarked: '20 Nov' },
    'ICS Part 2 · A': { present: 36, absent: 1, leave: 1, learners: 38, lastMarked: '20 Nov' },
    'ICS Part 1 · B': { present: 38, absent: 2, leave: 0, learners: 40, lastMarked: '20 Nov' },
  };

  const currentStat = attendanceStats[selectedClass] || attendanceStats['ICS Part 1 · A'];

  const handleQuickMarkAttendance = () => {
    setAttendanceSuccess(true);
    setTimeout(() => {
      setAttendanceSuccess(false);
      onNavigate('attendance');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Block */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
          TEACHER DASHBOARD
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101c4e] dark:text-white tracking-tight">
          Your teaching day, simplified.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Your classes, today's schedule and the tools to keep learning moving.
        </p>
      </div>

      {/* 2. Dark Navy Hero Banner (Exact Mockup) */}
      <div className="bg-[#101c4e] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-blue-200 uppercase">
            SATURDAY, 21 NOVEMBER 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Good morning, Sir Yousaf.
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 font-medium">
            3 classes today. A little preparation, a lasting impact.
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
        {/* Card 1: My classes */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            My classes
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              3
            </span>
            <Laptop className="w-5 h-5 text-slate-600 dark:text-slate-400 stroke-[1.8]" />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
            ICS Part 1 & Part 2
          </p>
        </div>

        {/* Card 2: Total learners */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Total learners
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              120
            </span>
            <Users className="w-5 h-5 text-slate-600 dark:text-slate-400 stroke-[1.8]" />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
            Across your teaching groups
          </p>
        </div>

        {/* Card 3: Today's lessons */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Today's lessons
          </span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              3
            </span>
            <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400 stroke-[1.8]" />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
            Next class at 09:45 AM
          </p>
        </div>
      </div>

      {/* 4. "My classes" Section */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
          My classes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Class 1: ICS Part 1 · A */}
          <div
            onClick={() => onNavigate('students')}
            className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-slate-600 dark:text-slate-400 stroke-[1.8]" />
                <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  ICS Part 1 · A
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Computer Science
            </p>
            <div className="border-t border-slate-100 dark:border-slate-800 my-3" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              42 learners · Programming fundamentals
            </p>
          </div>

          {/* Class 2: ICS Part 2 · A */}
          <div
            onClick={() => onNavigate('students')}
            className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-slate-600 dark:text-slate-400 stroke-[1.8]" />
                <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  ICS Part 2 · A
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Computer Science
            </p>
            <div className="border-t border-slate-100 dark:border-slate-800 my-3" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              38 learners · Database management
            </p>
          </div>

          {/* Class 3: ICS Part 1 · B */}
          <div
            onClick={() => onNavigate('students')}
            className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-slate-600 dark:text-slate-400 stroke-[1.8]" />
                <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  ICS Part 1 · B
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Computer Science
            </p>
            <div className="border-t border-slate-100 dark:border-slate-800 my-3" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              40 learners · Programming fundamentals
            </p>
          </div>
        </div>
      </div>

      {/* 5. Middle Row: Today's Timetable & Quick Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Today's Timetable (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Today's timetable
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Saturday, 21 Nov · 3 scheduled lessons
              </p>
            </div>

            {/* Timetable Rows */}
            <div className="space-y-3.5 my-4">
              {/* Row 1 */}
              <div className="flex items-center justify-between py-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white w-28 shrink-0">
                  08:45 – 09:30
                </span>
                <div className="flex-1 px-3">
                  <div className="font-bold text-slate-900 dark:text-white">
                    ICS Part 1 · A
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Urdu Adab & Ghazaliat
                  </div>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-right shrink-0">
                  Q-202
                </span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Row 2 */}
              <div className="flex items-center justify-between py-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white w-28 shrink-0">
                  10:30 – 11:15
                </span>
                <div className="flex-1 px-3">
                  <div className="font-bold text-slate-900 dark:text-white">
                    ICS Part 2 · A
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Urdu Qawaid & Insha
                  </div>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-right shrink-0">
                  Q-202
                </span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Row 3 */}
              <div className="flex items-center justify-between py-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white w-28 shrink-0">
                  11:15 – 12:00
                </span>
                <div className="flex-1 px-3">
                  <div className="font-bold text-slate-900 dark:text-white">
                    ICS Part 1 · B
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Urdu Mazmoon Nigari
                  </div>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-right shrink-0">
                  Q-202
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

        {/* Right Column: Quick Attendance (5 cols on desktop) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Quick attendance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Urdu · Today, 21 Nov
              </p>
            </div>

            {/* Select Class Dropdown */}
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Select class
              </label>
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) =>
                    setSelectedClass(e.target.value as 'ICS Part 1 · A' | 'ICS Part 2 · A' | 'ICS Part 1 · B')
                  }
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] cursor-pointer"
                >
                  <option value="ICS Part 1 · A">ICS Part 1 · A</option>
                  <option value="ICS Part 2 · A">ICS Part 2 · A</option>
                  <option value="ICS Part 1 · B">ICS Part 1 · B</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* 3 Metric Stat Boxes */}
            <div className="grid grid-cols-3 gap-2 mt-4 bg-[#f4f7fe] dark:bg-slate-800/40 p-3 rounded-xl text-center">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 block">
                  {currentStat.present}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Present
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 block">
                  {currentStat.absent}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Absent
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 block">
                  {currentStat.leave}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Leave
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2.5 font-medium">
              {currentStat.learners} learners · Last marked {currentStat.lastMarked}
            </p>
          </div>

          <button
            type="button"
            onClick={handleQuickMarkAttendance}
            className="w-full mt-4 py-3 rounded-xl bg-[#101c4e] hover:bg-[#0c163d] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            {attendanceSuccess ? 'Attendance recorded! Redirecting...' : 'Mark attendance'}
          </button>
        </div>
      </div>

      {/* 6. Bottom Row: Assessments & Uploaded Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Card: Assessments */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Assessments
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mid-term I · November 2026
              </p>
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold">
                Exam
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Results are published
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Completed 18 Nov · Published 20 Nov. Review class marks or prepare your next assessment.
              </p>
            </div>
          </div>

          <div className="space-y-2 mt-5">
            <button
              type="button"
              onClick={() => onNavigate('exams')}
              className="w-full py-3 rounded-xl bg-[#101c4e] hover:bg-[#0c163d] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              Open marks entry
            </button>
            <button
              type="button"
              onClick={() => onNavigate('results')}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              View class performance
            </button>
          </div>
        </div>

        {/* Right Card: Uploaded Materials */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Uploaded materials
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Keep your learners ready for the next lesson
              </p>
            </div>

            {/* List of 3 files */}
            <div className="space-y-3.5 my-4">
              {/* File 1 */}
              <div
                onClick={() => onNavigate('materials')}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0 mt-0.5 stroke-[1.8]" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                    Urdu Adab & Qawaid Notes.pdf
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    ICS Part 1 · A & B · Sir Yousaf · 1.8 MB
                  </div>
                </div>
              </div>

              {/* File 2 */}
              <div
                onClick={() => onNavigate('materials')}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0 mt-0.5 stroke-[1.8]" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                    Urdu Essay Writing Guide.pdf
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    ICS Part 2 · A · Sir Yousaf · 1.1 MB
                  </div>
                </div>
              </div>

              {/* File 3 */}
              <div
                onClick={() => onNavigate('materials')}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0 mt-0.5 stroke-[1.8]" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                    Urdu Ghazaliat Tashreeh.pdf
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    ICS Part 1 · A & B · Sir Yousaf · 840 KB
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('materials')}
            className="w-full mt-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            Manage materials
          </button>
        </div>
      </div>

      {/* 7. Footer Note (Exact Mockup) */}
      <div className="text-xs text-slate-400 dark:text-slate-500 pt-2 pb-4 text-center sm:text-left">
        Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Faculty Profile"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f4f7fe] dark:bg-slate-800/50">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
              alt="Sir Yousaf"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#101c4e]"
            />
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Sir Yousaf
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Senior Lecturer · Department of Urdu
              </p>
              <div className="text-[11px] font-bold text-[#101c4e] dark:text-blue-400 mt-1">
                PCL-TCH-01 · Punjab College Lahore
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Official Email:</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                teacher@smartcampus.demo
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Assigned Classes:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ICS Part 1 (A & B), ICS Part 2 (A)
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Total Enrolled Learners:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                120 Students
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Campus Location:</span>
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
