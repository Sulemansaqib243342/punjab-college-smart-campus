import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Building,
  CreditCard,
  CalendarCheck,
  UserPlus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
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
  Legend,
} from 'recharts';
import { useStore } from '../../lib/store';
import { StatsCard } from '../common/StatsCard';
import { formatPKR, formatDate } from '../../lib/utils';
import confetti from 'canvas-confetti';

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
  onOpenPerformanceForStudent?: (studentId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const store = useStore();
  const [approvalFeedback, setApprovalFeedback] = useState<string | null>(null);

  // KPIs
  const totalStudents = store.students.length;
  const totalTeachers = store.teachers.length;
  const totalClasses = store.classes.length;

  const totalFeeExpected = store.feeVouchers.reduce((acc, curr) => acc + curr.total_amount, 0);
  const totalFeeCollected = store.feeVouchers.reduce((acc, curr) => acc + curr.paid_amount, 0);
  const totalFeePending = totalFeeExpected - totalFeeCollected;

  // Attendance rate across all records
  const presentAttendance = store.attendance.filter((a) => a.status === 'present').length;
  const totalAttRecords = store.attendance.length;
  const avgAttendance = totalAttRecords > 0 ? Math.round((presentAttendance / totalAttRecords) * 100) : 85;

  // Pie chart data: Students per group
  const groupCounts: Record<string, number> = {};
  store.students.forEach((s) => {
    groupCounts[s.group_name] = (groupCounts[s.group_name] || 0) + 1;
  });
  const pieData = Object.entries(groupCounts).map(([name, value]) => ({ name, value }));
  const COLORS = ['#232766', '#ea432a', '#3b82f6', '#10b981', '#f59e0b'];

  // Bar chart: Class-wise Attendance
  const classAttData = store.classes.map((cls) => {
    const clsRecords = store.attendance.filter((a) => a.class_id === cls.id);
    const clsPresent = clsRecords.filter((a) => a.status === 'present').length;
    const rate = clsRecords.length > 0 ? Math.round((clsPresent / clsRecords.length) * 100) : 85;
    return {
      name: cls.name,
      attendance: rate,
    };
  });

  const pendingAdmissions = store.admissions.filter((a) => a.status === 'pending');

  const handleApprove = (appId: string) => {
    try {
      const { rollNumber, student } = store.approveAdmission(appId);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setApprovalFeedback(`Successfully approved ${student.full_name}! Assigned Roll No: ${rollNumber}`);
      setTimeout(() => setApprovalFeedback(null), 4000);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleReject = (appId: string) => {
    store.rejectAdmission(appId, 'Rejected on merit / missing documentation.');
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-r from-[#191c4d] via-[#232766] to-[#14163d] text-white p-6 rounded-2xl shadow-lg border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#ea432a] text-white uppercase tracking-wider">
              Administration Portal
            </span>
            <span className="text-xs text-blue-200">Session 2024-2025</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Welcome, Prof. Dr. Muhammad Asif
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Campus Director & Principal | Punjab Colleges, Minar-e-Pakistan Campus Lahore
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('admissions')}
            className="px-4 py-2 bg-[#ea432a] hover:bg-[#d6341d] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Review Admissions ({pendingAdmissions.length})</span>
          </button>
        </div>
      </div>

      {approvalFeedback && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{approvalFeedback}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Enrolled Students"
          value={totalStudents}
          subtitle="Across 3 academic groups"
          icon={<Users className="w-5 h-5" />}
          color="blue"
          onClick={() => onNavigate('students')}
        />
        <StatsCard
          title="Faculty Members"
          value={totalTeachers}
          subtitle="M.Phil & Ph.D Professors"
          icon={<GraduationCap className="w-5 h-5" />}
          color="purple"
          onClick={() => onNavigate('teachers')}
        />
        <StatsCard
          title="Fee Collected (Nov)"
          value={formatPKR(totalFeeCollected)}
          subtitle={`Pending: ${formatPKR(totalFeePending)}`}
          icon={<CreditCard className="w-5 h-5" />}
          color="emerald"
          onClick={() => onNavigate('fees')}
        />
        <StatsCard
          title="Overall Attendance Rate"
          value={`${avgAttendance}%`}
          subtitle="Campus 30-day average"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="red"
          onClick={() => onNavigate('attendance')}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Group Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
            Student Enrollment by Academic Discipline
          </h3>
          <p className="text-xs text-slate-500 mb-4">Breakdown of students across F.Sc & ICS</p>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value} Students`, 'Enrolled']} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Class Attendance Comparison */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Class-wise Attendance Ratio (%)
              </h3>
              <p className="text-xs text-slate-500">Board mandatory requirement: 75% minimum attendance</p>
            </div>
            <button
              onClick={() => onNavigate('attendance')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Full Register →
            </button>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classAttData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'Attendance Rate']} />
                <Bar dataKey="attendance" name="Attendance Rate (%)" fill="#232766" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pending Admissions Review Table & Urgent Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Admissions (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-red-600" />
                <span>Pending Online Admissions Queue</span>
              </h3>
              <p className="text-xs text-slate-500">Review matriculation marks & approve unique roll number</p>
            </div>
            <button
              onClick={() => onNavigate('admissions')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All ({store.admissions.length}) →
            </button>
          </div>

          {pendingAdmissions.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No pending applications in queue. All online forms reviewed.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Applicant</th>
                    <th className="py-2.5 px-3">Group</th>
                    <th className="py-2.5 px-3">Matric Marks</th>
                    <th className="py-2.5 px-3">%age</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pendingAdmissions.slice(0, 4).map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900 dark:text-white">{app.applicant_name}</div>
                        <div className="text-[11px] text-slate-500">S/D of {app.father_name}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-blue-900 dark:text-blue-400">{app.group_name}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">
                        {app.previous_marks} / {app.total_marks}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-emerald-600">{app.percentage}%</span>
                      </td>
                      <td className="py-2.5 px-3 text-right space-x-1.5">
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-red-100 hover:text-red-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Operations Actions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              Admin Quick Shortcuts
            </h3>
            <p className="text-xs text-slate-500 mb-4">Direct workflow execution</p>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('students')}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between"
              >
                <span>Add / Manage Student Records</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('fees')}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between"
              >
                <span>Generate Fee Vouchers & Defaulters List</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('results')}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between"
              >
                <span>Calculate Grades & Print Result Cards</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigate('notices')}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between"
              >
                <span>Broadcast Campus Announcement</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            Smart Campus Supabase Normalized Architecture • Role: Administrator
          </div>
        </div>
      </div>
    </div>
  );
};

