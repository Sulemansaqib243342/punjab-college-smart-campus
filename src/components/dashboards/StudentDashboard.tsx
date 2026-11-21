import React from 'react';
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
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { StatsCard } from '../common/StatsCard';
import { formatPKR, formatDate } from '../../lib/utils';

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

  // Find student record (Muhammad Hamza Khan by default)
  const student = store.students.find((s) => s.email === currentUser?.email) || store.students[0];
  const classRoom = store.classes.find((c) => c.id === student.class_id) || store.classes[0];

  // Attendance stats for this student
  const studentAtt = store.attendance.filter((a) => a.student_id === student.id);
  const totalDays = studentAtt.length || 30;
  const presentDays = studentAtt.filter((a) => a.status === 'present').length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 88;
  const hasAttendanceWarning = attendanceRate < 75;

  // Latest marks & result
  const midtermMarks = store.marks.filter((m) => m.student_id === student.id && m.exam_id === 'exam-midterm-dec');
  const totalObtained = midtermMarks.reduce((acc, curr) => acc + curr.marks_obtained, 0);
  const totalMax = midtermMarks.reduce((acc, curr) => acc + curr.total_marks, 0);
  const scorePct = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 91;

  // Fee voucher
  const myVoucher = store.feeVouchers.find((v) => v.student_id === student.id) || store.feeVouchers[0];

  // Today's timetable
  const todayTimetable = store.timetable.filter((t) => t.class_id === classRoom.id && t.day_of_week === 'Monday');

  // Study materials for this class
  const classMaterials = store.studyMaterials.filter((m) => m.class_id === classRoom.id);

  return (
    <div className="space-y-6">
      {/* Attendance Warning Alert (if < 75%) */}
      {hasAttendanceWarning && (
        <div className="p-4 rounded-2xl bg-[#ea432a] text-white shadow-lg flex items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-200 shrink-0" />
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-wide">
                Critical Attendance Warning ({attendanceRate}%)
              </h4>
              <p className="text-xs text-red-100 mt-0.5">
                Your attendance has fallen below the BISE Lahore mandatory 75% benchmark. Please contact the Student Affairs Desk immediately to avoid examination slip blockage.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('attendance')}
            className="px-3.5 py-1.5 rounded-xl bg-white text-[#ea432a] font-extrabold text-xs shrink-0 shadow-sm hover:bg-red-50 transition-colors cursor-pointer"
          >
            Review Attendance
          </button>
        </div>
      )}

      {/* Student Welcome Header */}
      <div className="bg-linear-to-r from-[#191c4d] via-[#232766] to-[#14163d] text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={student.photo_url}
            alt={student.full_name}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#ea432a] shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ea432a] text-white uppercase tracking-wider">
                Student Portal
              </span>
              <span className="text-xs font-mono font-bold text-blue-300">{student.roll_number}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {student.full_name}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {classRoom.name} • {student.group_name} • S/O {student.father_name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPerformance}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-[#ea432a] to-[#232766] hover:opacity-95 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Smart AI Performance Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Attendance Record"
          value={`${attendanceRate}%`}
          subtitle={hasAttendanceWarning ? 'Below 75% threshold' : `${presentDays} days attended`}
          icon={<CalendarCheck className="w-5 h-5" />}
          color={hasAttendanceWarning ? 'red' : 'emerald'}
          onClick={() => onNavigate('attendance')}
        />
        <StatsCard
          title="Mid-Term Aggregate"
          value={`${scorePct}%`}
          subtitle="Rank #1 (Topper in 11th ICS-A)"
          icon={<Award className="w-5 h-5" />}
          color="blue"
          onClick={onOpenResultCard}
        />
        <StatsCard
          title="Fee Voucher (Nov)"
          value={myVoucher ? formatPKR(myVoucher.total_amount) : 'PKR 22,000'}
          subtitle={`Status: ${myVoucher?.status.toUpperCase() || 'PAID'}`}
          icon={<CreditCard className="w-5 h-5" />}
          color={myVoucher?.status === 'paid' ? 'emerald' : 'amber'}
          onClick={onOpenFeeVoucher}
        />
        <StatsCard
          title="Today's Classes"
          value={todayTimetable.length || 6}
          subtitle="Regular periods 08:30 - 01:45"
          icon={<Clock className="w-5 h-5" />}
          color="purple"
          onClick={() => onNavigate('timetable')}
        />
      </div>

      {/* Examinations & Performance Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Result Card Snippet */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Mid-Term Examination Result Summary
                </h3>
              </div>
              <p className="text-xs text-slate-500">Board Session 2024-2025 • Published by Controller of Exams</p>
            </div>
            <button
              onClick={onOpenResultCard}
              className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Result Card</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs mb-4">
            <div>
              <span className="text-slate-500 block text-[11px]">Marks Obtained</span>
              <span className="text-base font-extrabold text-blue-950 dark:text-blue-400 font-mono">
                {totalObtained} / {totalMax}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Percentage</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">{scorePct}%</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Grade</span>
              <span className="text-base font-extrabold text-emerald-600">A+ (Exceptional)</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Class Standing</span>
              <span className="text-base font-extrabold text-amber-600">#1 (First Position)</span>
            </div>
          </div>

          {/* Subject mini-table */}
          <div className="space-y-2">
            {midtermMarks.slice(0, 4).map((mk) => {
              const sub = store.subjects.find((s) => s.id === mk.subject_id);
              const pct = Math.round((mk.marks_obtained / mk.total_marks) * 100);
              return (
                <div
                  key={mk.id}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs"
                >
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{sub?.name || 'Subject'}</div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-slate-500">
                      {mk.marks_obtained} / {mk.total_marks}
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 w-10 text-right">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Want deeper subject comparisons & AI recommendations?</span>
            <button
              onClick={onOpenPerformance}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View Full AI Diagnostic Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Fee & Timetable Quick View */}
        <div className="space-y-6">
          {/* Fee Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Monthly Fee Voucher</span>
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  myVoucher?.status === 'paid'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {myVoucher?.status || 'PAID'}
              </span>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Voucher No:</span>
                <span className="font-mono font-bold">{myVoucher?.voucher_no}</span>
              </div>
              <div className="flex justify-between">
                <span>Month:</span>
                <span>{myVoucher?.month_year}</span>
              </div>
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span className="text-red-600 font-semibold">{formatDate(myVoucher?.due_date || '')}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white">
                <span>Total Amount:</span>
                <span>{formatPKR(myVoucher?.total_amount || 22000)}</span>
              </div>
            </div>

            <button
              onClick={onOpenFeeVoucher}
              className="mt-4 w-full py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print 3-Part Bank Challan</span>
            </button>
          </div>

          {/* Study Materials snippet */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Study Materials & Handouts</span>
              </h3>
              <button
                onClick={() => onNavigate('materials')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                All ({classMaterials.length}) →
              </button>
            </div>

            <div className="space-y-2">
              {classMaterials.slice(0, 2).map((mat) => (
                <div
                  key={mat.id}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs flex items-center justify-between"
                >
                  <div className="truncate mr-2">
                    <div className="font-semibold text-slate-900 dark:text-white truncate">{mat.title}</div>
                    <div className="text-[11px] text-slate-500">{mat.teacher_name}</div>
                  </div>
                  <button
                    onClick={() => onNavigate('materials')}
                    className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition-colors shrink-0"
                    title="Download material"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

