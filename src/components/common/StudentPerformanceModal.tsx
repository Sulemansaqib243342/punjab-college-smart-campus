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
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { Student } from '../../types';
import { useStore } from '../../lib/store';
import { generateStudentAnalytics } from '../../lib/aiAnalytics';
import { formatDate } from '../../lib/utils';

interface StudentPerformanceModalProps {
  student: Student;
  onClose: () => void;
}

export const StudentPerformanceModal: React.FC<StudentPerformanceModalProps> = ({
  student,
  onClose,
}) => {
  const store = useStore();
  const report = generateStudentAnalytics(
    student,
    store.students,
    store.classes,
    store.subjects,
    store.exams,
    store.marks,
    store.attendance
  );

  const handlePrint = () => {
    window.print();
  };

  // Bar chart data for subjects vs class average
  const barChartData = report.subjectPerformances.map((sp) => ({
    subject: sp.subjectCode,
    name: sp.subjectName,
    studentScore: sp.percentage,
    classAverage: sp.classAverage,
  }));

  // Line chart data for exam progression
  const lineChartData = report.progressTrend.map((pt) => ({
    name: pt.examName,
    percentage: pt.percentage,
  }));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200 dark:border-slate-800">
        {/* Modal Top Bar */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm md:text-base">Smart AI Student Performance Analytics</h3>
              <p className="text-xs text-slate-400">{student.full_name} ({student.roll_number}) - {report.classRoom.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Download / Print Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Print Letterhead */}
          <div className="border-b-2 border-[#ea432a] pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/punjab-colleges-logo.png"
                alt="Punjab Colleges Logo"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h2 className="text-lg md:text-xl font-black text-[#232766] dark:text-blue-300 uppercase tracking-wide">
                  Punjab Colleges, Minar-e-Pakistan Campus Lahore
                </h2>
                <p className="text-xs text-[#ea432a] font-bold">
                  Department of Academic Diagnostics & Student Analytics
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-400 hidden sm:block">
              <span>Academic Session 2024-25</span>
            </div>
          </div>

          {/* Student Overview Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Student Name</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{student.full_name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Roll Number</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">{student.roll_number}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Class & Section</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{report.classRoom.name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Class Standing</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                Rank #{report.classRank} of {report.totalStudentsInClass}
              </span>
            </div>
          </div>

          {/* 3 Core Metric Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wider">Exam Aggregate</span>
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-blue-950 dark:text-white">{report.overallPercentage}%</span>
                <span className="text-sm font-bold px-2 py-0.5 rounded bg-blue-600 text-white">Grade {report.overallGrade}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Based on latest Mid-Term Examination</p>
            </div>

            <div
              className={`border rounded-xl p-4 ${
                report.attendanceWarning
                  ? 'bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-900'
                  : 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    report.attendanceWarning ? 'text-red-900 dark:text-red-400' : 'text-emerald-900 dark:text-emerald-400'
                  }`}
                >
                  Attendance Ratio
                </span>
                <Calendar
                  className={`w-5 h-5 ${
                    report.attendanceWarning ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className={`text-3xl font-extrabold ${
                    report.attendanceWarning ? 'text-red-700 dark:text-red-400' : 'text-emerald-950 dark:text-white'
                  }`}
                >
                  {report.attendanceRate}%
                </span>
                {report.attendanceWarning && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                    &lt; 75% Warning
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {report.presentDays} Present, {report.absentDays} Absent, {report.leaveDays} Leaves in 30 days
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Exam Progress</span>
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {report.progressTrend[1]?.percentage || report.overallPercentage}%
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  +{(report.progressTrend[1]?.percentage || 0) - (report.progressTrend[0]?.percentage || 0)}% vs Oct Test
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Consistent upward trajectory</p>
            </div>
          </div>

          {/* AI Automated Remarks Engine */}
          <div className="bg-linear-to-r from-blue-900/10 via-red-900/10 to-transparent dark:from-blue-950/40 dark:via-red-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-900/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-blue-950 dark:text-blue-300">
                AI Academic Diagnostic Evaluation & Remarks
              </h4>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              "{report.aiRemarks}"
            </p>

            {/* Actionable recommendations */}
            <div className="mt-4 pt-3 border-t border-blue-200/50 dark:border-blue-900/40">
              <h5 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-2">
                Targeted Interventions & Recommendations:
              </h5>
              <div className="space-y-1.5">
                {report.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses Pill Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                  Academic Strengths (Top Mastery)
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {report.strengths.map((str, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                  >
                    ★ {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Areas Requiring Focus & Tutoring
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {report.weaknesses.map((wk, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                  >
                    ⚠ {wk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="space-y-6 pt-2">
            {/* Chart 1: Subject Performance vs Class Average */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Subject Performance vs Class Average (%)
                  </h4>
                  <p className="text-xs text-slate-500">Benchmark comparison against {report.classRoom.name} cohort</p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(val: any, name: any) => [
                        `${val}%`,
                        name === 'studentScore' ? 'Student Score' : 'Class Average',
                      ]}
                      labelFormatter={(label) => {
                        const item = barChartData.find((b) => b.subject === label);
                        return item ? `${item.name} (${label})` : label;
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                    <Bar dataKey="studentScore" name="Student Score" fill="#232766" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="classAverage" name="Class Average" fill="#ea432a" opacity={0.8} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Progress Trend Across Exams */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Progress Trend Across Academic Examinations
                  </h4>
                  <p className="text-xs text-slate-500">Percentage trajectory from Monthly Test to Mid-Term</p>
                </div>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData} margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val: any) => [`${val}%`, 'Aggregate Score']} />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      name="Aggregate Score"
                      stroke="#232766"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#ea432a' }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Footer & Signature Stamp */}
          <div className="pt-6 border-t border-slate-300 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <div>
              <span>Generated on: {formatDate(new Date().toISOString())}</span>
              <p className="text-[10px] text-slate-400">Smart Campus Analytics Engine - Punjab College Lahore</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-800 dark:text-slate-200">Prof. Dr. Muhammad Asif</span>
              <p className="text-[10px]">Director & Principal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

