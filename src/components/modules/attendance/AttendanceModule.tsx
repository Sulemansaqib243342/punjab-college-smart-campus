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
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { AttendanceStatus } from '../../../types';
import { formatDate } from '../../../lib/utils';

export const AttendanceModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  // For Teacher / Admin: select class and date
  const [selectedClassId, setSelectedClassId] = useState(store.classes[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Active student for student view
  const currentStudent = isStudent
    ? store.students.find((s) => s.email === currentUser?.email) || store.students[0]
    : null;

  // Class students
  const classStudents = store.students.filter((s) => s.class_id === selectedClassId);

  // Local state for attendance marking
  const existingAttendance = store.attendance.filter(
    (a) => a.class_id === selectedClassId && a.date === selectedDate
  );

  const [attendanceState, setAttendanceState] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    classStudents.forEach((std) => {
      const match = existingAttendance.find((a) => a.student_id === std.id);
      map[std.id] = match ? match.status : 'present';
    });
    return map;
  });

  // Sync state when class or date changes
  React.useEffect(() => {
    const existing = store.attendance.filter(
      (a) => a.class_id === selectedClassId && a.date === selectedDate
    );
    const map: Record<string, AttendanceStatus> = {};
    classStudents.forEach((std) => {
      const match = existing.find((a) => a.student_id === std.id);
      map[std.id] = match ? match.status : 'present';
    });
    setAttendanceState(map);
  }, [selectedClassId, selectedDate, store.attendance]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceState((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const map: Record<string, AttendanceStatus> = {};
    classStudents.forEach((std) => {
      map[std.id] = status;
    });
    setAttendanceState(map);
  };

  const handleSaveAttendance = () => {
    const records = Object.entries(attendanceState).map(([student_id, status]) => ({
      student_id,
      status,
    }));
    store.markAttendanceBatch(selectedDate, selectedClassId, records);
    setSaveToast(`Attendance for ${formatDate(selectedDate)} saved successfully!`);
    setTimeout(() => setSaveToast(null), 4000);
  };

  // Student view calculations
  const studentRecords = currentStudent
    ? store.attendance.filter((a) => a.student_id === currentStudent.id)
    : [];
  const presentDays = studentRecords.filter((a) => a.status === 'present').length;
  const absentDays = studentRecords.filter((a) => a.status === 'absent').length;
  const leaveDays = studentRecords.filter((a) => a.status === 'leave').length;
  const totalDays = studentRecords.length || 30;
  const studentAttRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 85;
  const hasWarning = studentAttRate < 75;

  // Class stats for current selection
  const currentTotal = classStudents.length;
  const currentPresents = Object.values(attendanceState).filter((s) => s === 'present').length;
  const currentAbsents = Object.values(attendanceState).filter((s) => s === 'absent').length;
  const currentLeaves = Object.values(attendanceState).filter((s) => s === 'leave').length;
  const currentPct = currentTotal > 0 ? Math.round((currentPresents / currentTotal) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-red-600" />
            <span>Attendance Management & Monitoring</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isStudent
              ? 'View your personal attendance history, percentage, and board eligibility status'
              : 'Mark daily classroom attendance, track leaves and absentees, and manage BISE board compliance'}
          </p>
        </div>
      </div>

      {saveToast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* STUDENT VIEW */}
      {isStudent && currentStudent && (
        <div className="space-y-6">
          {/* Warning Banner if < 75% */}
          {hasWarning && (
            <div className="p-5 rounded-2xl bg-red-600 text-white shadow-lg flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wide">
                  ATTENDANCE SHORTAGE WARNING: {studentAttRate}% ATTENDANCE
                </h4>
                <p className="text-xs text-red-100 mt-1 leading-relaxed">
                  Under BISE Lahore Examination Regulations, candidates must maintain at least 75% attendance during the academic session to qualify for Board Roll Number Slips. Your current attendance is below the mandatory limit. Please contact the Academic Incharge or submit valid medical leave certificates immediately.
                </p>
              </div>
            </div>
          )}

          {/* Student Stats Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Overall Attendance</span>
              <div className="text-2xl font-extrabold text-blue-950 dark:text-white mt-1">
                {studentAttRate}%
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  hasWarning ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {hasWarning ? 'Below Benchmark (< 75%)' : 'Eligible for Exams (>= 75%)'}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Days Present</span>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">{presentDays}</div>
              <span className="text-xs text-slate-500">Out of {totalDays} total days</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Days Absent</span>
              <div className="text-2xl font-extrabold text-red-600 mt-1">{absentDays}</div>
              <span className="text-xs text-slate-500">Unexcused absentees</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Official Leaves</span>
              <div className="text-2xl font-extrabold text-amber-600 mt-1">{leaveDays}</div>
              <span className="text-xs text-slate-500">Authorized medical/personal</span>
            </div>
          </div>

          {/* 30-Day Interactive Calendar Timeline View */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>30-Day Classroom Attendance Calendar</span>
                </h3>
                <p className="text-xs text-slate-500">Green = Present, Red = Absent, Amber = On Leave</p>
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
              {studentRecords.map((rec) => {
                const isP = rec.status === 'present';
                const isA = rec.status === 'absent';
                return (
                  <div
                    key={rec.id}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isP
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                        : isA
                        ? 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-300 ring-1 ring-red-400'
                        : 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                    }`}
                  >
                    <span className="block text-[10px] text-slate-400 font-medium">
                      {rec.date.slice(5)}
                    </span>
                    <span className="block font-bold text-xs uppercase mt-0.5">
                      {isP ? 'P' : isA ? 'A' : 'L'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TEACHER / ADMIN VIEW: Marking Grid */}
      {!isStudent && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Class</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                >
                  {store.classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.group_name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Attendance Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => handleMarkAll('present')}
                className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Mark All Present
              </button>
              <button
                type="button"
                onClick={() => handleMarkAll('absent')}
                className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Mark All Absent
              </button>
              <button
                type="button"
                onClick={handleSaveAttendance}
                className="px-5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Attendance</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics of Current Date */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Enrolled</span>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{currentTotal}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-emerald-600">Present</span>
              <div className="text-xl font-bold text-emerald-600 mt-0.5">{currentPresents} ({currentPct}%)</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-red-600">Absent</span>
              <div className="text-xl font-bold text-red-600 mt-0.5">{currentAbsents}</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-amber-600">On Leave</span>
              <div className="text-xl font-bold text-amber-600 mt-0.5">{currentLeaves}</div>
            </div>
          </div>

          {/* Attendance Sheet Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">Sr#</th>
                    <th className="py-3 px-4 w-28">Roll No</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Father Name</th>
                    <th className="py-3 px-4 text-center">Mark Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {classStudents.map((std, idx) => {
                    const status = attendanceState[std.id] || 'present';
                    return (
                      <tr key={std.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-4 text-center text-slate-400 font-mono">{idx + 1}</td>
                        <td className="py-3 px-4 font-mono font-bold text-blue-900 dark:text-blue-400">
                          {std.roll_number}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">{std.full_name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{std.cnic_bform}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                          {std.father_name}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleStatusChange(std.id, 'present')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                status === 'present'
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(std.id, 'absent')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                status === 'absent'
                                  ? 'bg-red-600 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-red-50'
                              }`}
                            >
                              Absent
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(std.id, 'leave')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                status === 'leave'
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-50'
                              }`}
                            >
                              Leave
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

