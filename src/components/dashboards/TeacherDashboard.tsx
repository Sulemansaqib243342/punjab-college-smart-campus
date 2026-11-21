import React from 'react';
import {
  Users,
  CalendarCheck,
  FileSpreadsheet,
  BookOpen,
  Clock,
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { StatsCard } from '../common/StatsCard';

interface TeacherDashboardProps {
  onNavigate: (view: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const store = useStore();
  const currentUser = store.currentUser;
  
  // Find teacher profile (defaults to Prof. Tariq Mahmood)
  const teacher = store.teachers.find((t) => t.email === currentUser?.email) || store.teachers[0];

  // My classes
  const myClasses = store.classes.filter((c) => teacher.assigned_classes.includes(c.id));
  const primaryClass = myClasses[0] || store.classes[0];

  // Students in my class
  const myStudents = store.students.filter((s) => s.class_id === primaryClass.id);

  // My timetable slots for today (e.g. Monday)
  const myTimetable = store.timetable.filter((t) => t.teacher_id === teacher.id || t.subject_id === 'sub-cs');

  // Study materials uploaded by this teacher
  const myMaterials = store.studyMaterials.filter((m) => m.teacher_id === teacher.id);

  return (
    <div className="space-y-6">
      {/* Teacher Welcome Header */}
      <div className="bg-linear-to-r from-[#191c4d] to-[#232766] text-white p-6 rounded-2xl shadow-lg border border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={teacher.photo_url}
            alt={teacher.full_name}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#ea432a] shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ea432a] text-white uppercase tracking-wider">
                Faculty Portal
              </span>
              <span className="text-xs text-blue-200">{teacher.employee_id}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {teacher.full_name}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {teacher.qualification} • {teacher.specialization}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('attendance')}
            className="px-4 py-2 rounded-xl bg-[#ea432a] hover:bg-[#d6341d] text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Mark Today's Attendance</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Assigned Students"
          value={myStudents.length}
          subtitle={`Class: ${primaryClass.name}`}
          icon={<Users className="w-5 h-5" />}
          color="blue"
          onClick={() => onNavigate('students')}
        />
        <StatsCard
          title="Today's Lectures"
          value={myTimetable.length || 3}
          subtitle="Periods scheduled today"
          icon={<Clock className="w-5 h-5" />}
          color="purple"
          onClick={() => onNavigate('timetable')}
        />
        <StatsCard
          title="Marks Evaluation"
          value="Mid-Term Active"
          subtitle="All subjects open"
          icon={<FileSpreadsheet className="w-5 h-5" />}
          color="emerald"
          onClick={() => onNavigate('exams')}
        />
        <StatsCard
          title="Study Notes Uploaded"
          value={myMaterials.length}
          subtitle="PDFs & past papers"
          icon={<BookOpen className="w-5 h-5" />}
          color="red"
          onClick={() => onNavigate('materials')}
        />
      </div>

      {/* Today's Schedule & Quick Attendance Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Today's Academic Teaching Schedule</span>
              </h3>
              <p className="text-xs text-slate-500">Scheduled classroom lectures and laboratory sessions</p>
            </div>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Full Timetable →
            </button>
          </div>

          <div className="space-y-3">
            {myTimetable.slice(0, 3).map((slot, idx) => {
              const sub = store.subjects.find((s) => s.id === slot.subject_id);
              const cls = store.classes.find((c) => c.id === slot.class_id);
              return (
                <div
                  key={slot.id || idx}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold flex items-center justify-center text-xs">
                      P-{slot.period_number}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {sub?.name || 'Computer Science'} ({cls?.name || '11th ICS-A'})
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {slot.start_time} - {slot.end_time} • Room: {slot.room_no}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('attendance')}
                    className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold transition-colors"
                  >
                    Attendance
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              Faculty Quick Tasks
            </h3>
            <p className="text-xs text-slate-500 mb-4">Direct classroom tools</p>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('attendance')}
                className="w-full p-3 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50 text-left text-xs font-bold text-blue-950 dark:text-blue-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-blue-600" />
                  <span>Mark Daily Attendance</span>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>

              <button
                onClick={() => onNavigate('exams')}
                className="w-full p-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/40 dark:bg-red-950/20 hover:bg-red-50 text-left text-xs font-bold text-red-950 dark:text-red-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-red-600" />
                  <span>Enter Student Marks</span>
                </div>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </button>

              <button
                onClick={() => onNavigate('materials')}
                className="w-full p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50 text-left text-xs font-bold text-emerald-950 dark:text-emerald-300 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Upload Notes / Past Papers</span>
                </div>
                <Plus className="w-4 h-4 text-emerald-500" />
              </button>

              <button
                onClick={() => onNavigate('notices')}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <span>Post Class Announcement</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            Assigned Section: {primaryClass.name} • Room 101 CS Block
          </div>
        </div>
      </div>
    </div>
  );
};

