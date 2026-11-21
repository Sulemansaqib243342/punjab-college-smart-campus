import React from 'react';
import {
  X,
  Printer,
  Sparkles,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Student } from '../../types';
import { useStore } from '../../lib/store';

interface StudentPerformanceModalProps {
  student?: Student;
  onClose: () => void;
}

export const StudentPerformanceModal: React.FC<StudentPerformanceModalProps> = ({
  student,
  onClose,
}) => {
  const store = useStore();
  const currentStudent = student || store.students[0]; // Ahmed Raza default

  const handlePrint = () => {
    window.print();
  };

  // Subject comparison data matching 15_report_desktop.png exactly
  const subjectPerformanceData = [
    { subject: 'Physics', studentScore: 82, classAvg: 74, diff: '+8' },
    { subject: 'Maths', studentScore: 76, classAvg: 70, diff: '+6' },
    { subject: 'Computer Science', studentScore: 92, classAvg: 80, diff: '+12' },
    { subject: 'English', studentScore: 84, classAvg: 76, diff: '+8' },
    { subject: 'Urdu', studentScore: 86, classAvg: 80, diff: '+6' },
  ];

  // Steady progress trend
  const progressTrendData = [
    { exam: 'Monthly Sep', score: 72 },
    { exam: 'Monthly Oct', score: 78 },
    { exam: 'Mid-term Nov', score: 84 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl overflow-hidden my-4 border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="no-print bg-[#101c4e] text-white px-5 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200 block">
                SMART PERFORMANCE REPORT
              </span>
              <h3 className="font-bold text-sm text-white leading-tight">
                {currentStudent.full_name} · {currentStudent.roll_number}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Download report</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-blue-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Report Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Header matching 15_report_desktop */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              SMART PERFORMANCE REPORT
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
                  A clearer path to your potential.
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {currentStudent.full_name} • ICS Part 1 • Roll no. {currentStudent.roll_number} - Mid-term I, November 2026
                </p>
              </div>
              <div className="text-right text-xs text-slate-400 hidden sm:block">
                <span>Published 20 Nov 2026</span>
              </div>
            </div>
          </div>

          {/* Student Overview Card matching 15_report_desktop */}
          <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div>
                <h2 className="text-xl font-black text-[#1b224b] dark:text-white">
                  {currentStudent.full_name}
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  ICS Part 1 · A · Roll no. {currentStudent.roll_number}
                </div>
              </div>

              <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-900 dark:text-blue-300 self-start sm:self-auto font-mono">
                Mid-term I · Nov 2026
              </span>
            </div>

            {/* 4 Stat Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Tile 1: Overall result */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">Overall result</span>
                <div className="text-2xl sm:text-3xl font-black text-[#101c4e] dark:text-blue-300 mt-1">
                  84%
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  420 / 500 marks
                </div>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  Grade A · All 5 subjects passed
                </div>
              </div>

              {/* Tile 2: Class rank */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">Class rank</span>
                <div className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white mt-1">
                  3 / 42
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Class average: 76%
                </div>
                <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1">
                  8 points above class average
                </div>
              </div>

              {/* Tile 3: Steady progress */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">Steady progress</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  +12%
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  72% → 78% → 84%
                </div>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  +12 pts since September
                </div>
              </div>

              {/* Tile 4: Attendance */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 font-medium block">Attendance</span>
                <div className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white mt-1">
                  92%
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  23 / 25 days present
                </div>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  Above the 75% minimum
                </div>
              </div>
            </div>
          </div>

          {/* Subject Performance Comparison Bars matching mockup */}
          <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-base text-[#1b224b] dark:text-white">
                  Subject performance
                </h3>
                <p className="text-xs text-slate-400">
                  Marks out of 100 · Mid-term I, Nov 2026
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <span className="w-3 h-3 rounded-xs bg-[#101c4e]"></span>
                  <span>Ahmed ({currentStudent.full_name.split(' ')[0]})</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-3 rounded-xs bg-slate-300 dark:bg-slate-700"></span>
                  <span>Class average</span>
                </span>
              </div>
            </div>

            {/* Subject Bars */}
            <div className="space-y-4 pt-2">
              {subjectPerformanceData.map((item) => (
                <div key={item.subject} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {item.subject}
                    </span>
                    <span className="font-mono text-xs">
                      <strong className="text-[#101c4e] dark:text-blue-300 font-bold">
                        {item.studentScore}
                      </strong>
                      <span className="text-slate-400"> / {item.classAvg}</span>
                      <span className="text-emerald-600 font-bold ml-1.5">({item.diff})</span>
                    </span>
                  </div>

                  {/* Dual Bar Track */}
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative flex items-center">
                    {/* Class average marker/bar */}
                    <div
                      className="h-full bg-slate-300 dark:bg-slate-700 rounded-full absolute left-0"
                      style={{ width: `${item.classAvg}%` }}
                    ></div>
                    {/* Student Score Bar */}
                    <div
                      className="h-full bg-[#101c4e] dark:bg-blue-600 rounded-full relative z-10 opacity-90"
                      style={{ width: `${item.studentScore}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Callout matching mockup */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-300">
              <strong>Ahmed:</strong> All five subject scores are above their class averages. Largest subject lead:{' '}
              <span className="font-bold">Computer Science (+12 points)</span>.
            </div>
          </div>

          {/* AI-Assisted Insights Section: 3 Structured Cards matching mockup */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-extrabold text-sm text-[#1b224b] dark:text-white uppercase tracking-wider">
                AI-Assisted Insights
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Insight Card 1: Build on your strengths */}
              <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1b224b] dark:text-white">
                    Build on your strengths
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Computer Science leads at 92/100, followed by Urdu at 86/100. Keep using the study habits that support these subjects.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-blue-900 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/40 p-2.5 rounded-xl">
                  Your overall result is 84%, 8 percentage points above the class average of 76%. Scores have risen from 72% to 78% to 84% across the three exams shown.
                </div>
              </div>

              {/* Insight Card 2: Your next revision priority: Maths */}
              <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">
                    A little focus, a bigger step.
                  </div>
                  <h4 className="font-bold text-sm text-[#1b224b] dark:text-white mt-0.5">
                    Your next revision priority: Maths · 76/100
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Maths is your lowest subject score, but remains 6 points above the class average of 70. Focus on improvement, not catching up.
                  </p>
                </div>

                {/* 3-Step Action Checklist matching mockup */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                      01
                    </span>
                    <span>Practise matrices for 20 minutes daily.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                      02
                    </span>
                    <span>Review errors with Hina Rashid.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                      03
                    </span>
                    <span>Retry a timed practice set this week.</span>
                  </div>
                </div>
              </div>

              {/* Insight Card 3: Attendance & marks */}
              <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1b224b] dark:text-white">
                    Attendance & marks
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Independent measures • not a causal relationship
                  </p>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Attendance</span>
                      <span className="font-bold text-slate-900 dark:text-white">23 of 25 days present</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Overall marks</span>
                      <span className="font-bold text-slate-900 dark:text-white">420 of 500 marks</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 italic">
                  Based only on the values shown. Teacher review recommended.
                </div>
              </div>
            </div>
          </div>

          {/* Footer note matching mockup */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 gap-2">
            <span>Results are a guide for your next learning conversation.</span>
            <span>Punjab College · Minar-e-Pakistan Campus, Lahore</span>
          </div>
        </div>
      </div>
    </div>
  );
};
