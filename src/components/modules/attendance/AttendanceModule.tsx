import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Save,
  Search,
  Filter,
  Users,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { AttendanceStatus } from '../../../types';

interface RegisterRow {
  id: string;
  name: string;
  roll: string;
  attendance_rate: number;
  status: 'present' | 'absent' | 'leave';
}

const INITIAL_REGISTER: RegisterRow[] = [
  { id: '1', name: 'Ahmed Raza', roll: 'ICS1-026', attendance_rate: 92, status: 'present' },
  { id: '2', name: 'Ayesha Khan', roll: 'ICS1-027', attendance_rate: 96, status: 'present' },
  { id: '3', name: 'Hamza Ali', roll: 'ICS1-028', attendance_rate: 72, status: 'present' },
  { id: '4', name: 'Fatima Noor', roll: 'ICS1-029', attendance_rate: 88, status: 'present' },
];

export const AttendanceModule: React.FC = () => {
  const store = useStore();
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');
  const [register, setRegister] = useState<RegisterRow[]>(INITIAL_REGISTER);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedClass, setSelectedClass] = useState('ICS Part 1 · Section A');
  const [selectedDate, setSelectedDate] = useState('21 Nov 2026');

  const handleStatusChange = (id: string, newStatus: 'present' | 'absent' | 'leave') => {
    setRegister((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleMarkAllPresent = () => {
    setRegister((prev) => prev.map((r) => ({ ...r, status: 'present' })));
  };

  const handleSaveAttendance = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Block */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
          ATTENDANCE
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101c4e] dark:text-white tracking-tight">
          Every day matters.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Mark attendance, spot patterns and help every student stay on track.
        </p>
      </div>

      {/* 2. Top 4 KPI Metric Cards (Exact Mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {/* Card 1: Class & section (Solid Deep Navy Card) */}
        <div className="bg-[#101c4e] text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-semibold text-blue-200 block">
            Class & section
          </span>
          <div>
            <div className="text-lg sm:text-xl font-black text-white mt-1">
              ICS Part 1 · Section A
            </div>
            <div className="text-xs text-blue-200/90 mt-1">
              Class strength 42 · Morning session
            </div>
          </div>
          <span className="text-[11px] text-blue-200/80 mt-2 font-medium block">
            42 enrolled · Sana Iqbal
          </span>
        </div>

        {/* Card 2: Date */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Date
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            21 Nov 2026
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Saturday
          </span>
        </div>

        {/* Card 3: Present */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Present
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            39
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            92.9% of class
          </span>
        </div>

        {/* Card 4: Absent */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Absent
          </span>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
            2
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Follow up required
          </span>
        </div>

        {/* Card 5: On leave */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            On leave
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">
            1
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Approved leave
          </span>
        </div>
      </div>

      {/* 3. Action Row & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'daily'
                ? 'bg-white dark:bg-[#101c4e] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Daily register
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'monthly'
                ? 'bg-white dark:bg-[#101c4e] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Monthly view
          </button>
        </div>

        {/* Actions Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleMarkAllPresent}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Mark all present
          </button>
          <button
            type="button"
            onClick={handleSaveAttendance}
            className="px-5 py-2.5 rounded-xl bg-[#101c4e] hover:bg-[#0c163d] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            {savedSuccess ? 'Attendance saved!' : 'Save attendance'}
          </button>
        </div>
      </div>

      {/* 4. Tab 1: Daily Register */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Daily register
              </span>
              <span>4 of 42 students shown · class totals above</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 font-semibold text-xs">
                    <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      Student
                    </th>
                    <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      Roll number
                    </th>
                    <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      Attendance
                    </th>
                    <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      Mark today
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {register.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {row.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-xs text-slate-600 dark:text-slate-400">
                        {row.roll}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {row.attendance_rate}%
                          </span>
                          {row.attendance_rate < 75 && (
                            <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-700 dark:text-rose-300 text-[10px] font-bold">
                              Below 75%
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl w-fit">
                          {(['present', 'absent', 'leave'] as const).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleStatusChange(row.id, st)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                                row.status === st
                                  ? st === 'present'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : st === 'absent'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'bg-blue-600 text-white shadow-xs'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              Draft not saved • Review the register before saving today's attendance.
            </div>
          </div>

          {/* Alert Card: Help Hamza get back on track */}
          <div className="bg-white dark:bg-[#11182c] border border-rose-200 dark:border-rose-900/60 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                  Below 75%
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Help Hamza get back on track
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hamza Ali · ICS1-028 · 72% attendance is below the 75% minimum. Contact his guardian and agree a catch-up plan.
              </p>
            </div>

            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-[#101c4e] text-white text-xs font-bold hover:bg-[#0c163d] transition-colors cursor-pointer shrink-0"
            >
              View student & support
            </button>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Monthly View */}
      {activeTab === 'monthly' && (
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Ahmed Raza · monthly record
              </h3>
              <p className="text-xs text-slate-400">
                November 2026 · ICS Part 1 · A
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Present (23)
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Absent (2)
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Leave (1)
              </span>
            </div>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs pt-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="font-bold text-slate-400 pb-1">
                {d}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const isAbsent = day === 12 || day === 18;
              const isLeave = day === 26;
              const isFuture = day > 21;
              const isWeekend = day % 7 === 0;

              let bg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              if (isWeekend || isFuture) bg = 'bg-slate-50 text-slate-400 border-slate-200';
              else if (isAbsent) bg = 'bg-rose-50 text-rose-800 border-rose-200 font-bold';
              else if (isLeave) bg = 'bg-blue-50 text-blue-800 border-blue-200 font-bold';

              return (
                <div
                  key={day}
                  className={`p-2 rounded-xl border ${bg} text-xs transition-all`}
                >
                  <div className="font-bold">{day}</div>
                  <div className="text-[10px] mt-0.5">
                    {isWeekend || isFuture ? 'Off' : isAbsent ? 'Absent' : isLeave ? 'Leave' : 'Present'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Footer Note */}
      <div className="text-xs text-slate-400 dark:text-slate-500 pt-2 pb-4 text-center sm:text-left">
        Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore
      </div>
    </div>
  );
};
