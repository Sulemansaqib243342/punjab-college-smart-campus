import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Calendar,
  Building,
  BookOpen,
  Filter,
  CheckCircle2,
  ChevronRight,
  Info,
  User,
} from 'lucide-react';
import { useStore } from '../../../lib/store';

interface TimetableSlotInfo {
  subject: string;
  teacher: string;
  room: string;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export const TimetableModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  const [selectedClass, setSelectedClass] = useState('ICS Part 1 · Section A');
  const [selectedDayTab, setSelectedDayTab] = useState<'All' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT'>('All');

  // Subjects configuration matching 12_timetable_desktop.png exactly
  const subjectsMap: Record<string, { teacher: string; room: string; color: string; badgeBg: string; badgeText: string }> = {
    Physics: {
      teacher: 'Bilal Ahmed',
      room: 'Q-201',
      color: '#2563eb',
      badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
      badgeText: 'text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    },
    Maths: {
      teacher: 'Hina Rashid',
      room: 'Q-204',
      color: '#7c3aed',
      badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
      badgeText: 'text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    },
    'Computer Science': {
      teacher: 'Sana Iqbal',
      room: 'CS Lab 1',
      color: '#101c4e',
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
      badgeText: 'text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    },
    English: {
      teacher: 'Mariam Khan',
      room: 'Q-203',
      color: '#e11d48',
      badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
      badgeText: 'text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    },
    Urdu: {
      teacher: 'Farah Saeed',
      room: 'Q-202',
      color: '#0d9488',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      badgeText: 'text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    },
  };

  // Schedule matrix matching 12_timetable_desktop.png
  const weeklySchedule = [
    {
      dayCode: 'MON',
      dayLabel: 'MON 16 NOV',
      p1: 'Physics',
      p2: 'Maths',
      breakText: 'Morning break · Recharge before the next class',
      p3: 'Computer Science',
      p4: 'English',
      p5: 'Urdu',
    },
    {
      dayCode: 'TUE',
      dayLabel: 'TUE 17 NOV',
      p1: 'Maths',
      p2: 'Computer Science',
      breakText: 'Morning break · Recharge before the next class',
      p3: 'English',
      p4: 'Urdu',
      p5: 'Physics',
    },
    {
      dayCode: 'WED',
      dayLabel: 'WED 18 NOV',
      p1: 'Computer Science',
      p2: 'English',
      breakText: 'Morning break · Recharge before the next class',
      p3: 'Urdu',
      p4: 'Physics',
      p5: 'Maths',
    },
    {
      dayCode: 'THU',
      dayLabel: 'THU 19 NOV',
      p1: 'English',
      p2: 'Urdu',
      breakText: 'Morning break · Recharge before the next class',
      p3: 'Physics',
      p4: 'Maths',
      p5: 'Computer Science',
    },
    {
      dayCode: 'FRI',
      dayLabel: 'FRI 20 NOV',
      p1: 'Urdu',
      p2: 'Physics',
      breakText: 'Morning break · Recharge before the next class',
      p3: 'Maths',
      p4: 'Computer Science',
      p5: 'English',
    },
    {
      dayCode: 'SAT',
      dayLabel: 'SAT 21 NOV',
      p1: 'Physics',
      p2: 'Maths',
      breakText: 'Morning break · Recharge before the next class',
      p3: 'Computer Science',
      p4: 'English',
      p5: 'Urdu',
    },
  ];

  const displayedDays = selectedDayTab === 'All'
    ? weeklySchedule
    : weeklySchedule.filter((d) => d.dayCode === selectedDayTab);

  return (
    <div className="space-y-6 font-sans">
      {/* Module Title Header matching 12_timetable_desktop */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          TIMETABLE
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              Make room for learning.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Your week at a glance • Monday-Saturday • 16-21 November 2026
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <User className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Ahmed Raza</span>
            <span className="text-slate-400 font-mono text-[10px]">ICS Part 1 · A</span>
          </div>
        </div>
      </div>

      {/* Published Timetable Banner Card matching mockup */}
      <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#1b224b] dark:text-white">
                Published timetable · ICS Part 1 · Section A
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              A focused week of learning · 30 periods · 5 subjects · 6 days
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-900 dark:text-blue-300 font-mono">
              08:00 - 12:00
            </span>
          </div>
        </div>

        {/* Subjects Legend Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
          <span className="text-slate-400 uppercase text-[10px] font-bold">Subjects:</span>
          <span className="inline-flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Physics</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-purple-700 dark:text-purple-300">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <span>Maths</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300">
            <span className="w-2.5 h-2.5 rounded-full bg-[#101c4e]"></span>
            <span>Computer Science</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
            <span>English</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>Urdu</span>
          </span>
        </div>
      </div>

      {/* Day Filter Selector Pills for Mobile / Tablet */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {(['All', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDayTab(day)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedDayTab === day
                ? 'bg-[#101c4e] text-white shadow-xs'
                : 'bg-white dark:bg-[#11182c] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {day === 'All' ? 'Full Week' : day}
          </button>
        ))}
      </div>

      {/* Timetable Schedule Matrix - Desktop Table Layout */}
      <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 font-bold uppercase text-[10px] w-28">Day</th>
                <th className="py-3 px-3 font-bold uppercase text-[10px]">
                  <div>Period 1</div>
                  <span className="text-[10px] font-normal text-slate-400">45 min · 08:00–08:45</span>
                </th>
                <th className="py-3 px-3 font-bold uppercase text-[10px]">
                  <div>Period 2</div>
                  <span className="text-[10px] font-normal text-slate-400">45 min · 08:45–09:30</span>
                </th>
                <th className="py-3 px-3 font-bold uppercase text-[10px] bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 w-36 text-center">
                  <div>Break</div>
                  <span className="text-[10px] font-normal text-amber-600/80">15 min · 09:30–09:45</span>
                </th>
                <th className="py-3 px-3 font-bold uppercase text-[10px]">
                  <div>Period 3</div>
                  <span className="text-[10px] font-normal text-slate-400">45 min · 09:45–10:30</span>
                </th>
                <th className="py-3 px-3 font-bold uppercase text-[10px]">
                  <div>Period 4</div>
                  <span className="text-[10px] font-normal text-slate-400">45 min · 10:30–11:15</span>
                </th>
                <th className="py-3 px-3 font-bold uppercase text-[10px]">
                  <div>Period 5</div>
                  <span className="text-[10px] font-normal text-slate-400">45 min · 11:15–12:00</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedDays.map((row) => {
                const s1 = subjectsMap[row.p1];
                const s2 = subjectsMap[row.p2];
                const s3 = subjectsMap[row.p3];
                const s4 = subjectsMap[row.p4];
                const s5 = subjectsMap[row.p5];

                return (
                  <tr key={row.dayCode} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Day Column */}
                    <td className="py-4 px-4 font-black text-slate-900 dark:text-white align-top">
                      <div className="text-xs">{row.dayLabel.split(' ')[0]}</div>
                      <div className="text-[10px] font-mono font-medium text-slate-400">
                        {row.dayLabel.split(' ').slice(1).join(' ')}
                      </div>
                    </td>

                    {/* Period 1 */}
                    <td className="py-3 px-3 align-top">
                      <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                        <div className="font-bold text-xs text-slate-900 dark:text-white">
                          {row.p1}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {s1.teacher}
                        </div>
                        <div className="text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400">
                          {s1.room}
                        </div>
                      </div>
                    </td>

                    {/* Period 2 */}
                    <td className="py-3 px-3 align-top">
                      <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                        <div className="font-bold text-xs text-slate-900 dark:text-white">
                          {row.p2}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {s2.teacher}
                        </div>
                        <div className="text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-400">
                          {s2.room}
                        </div>
                      </div>
                    </td>

                    {/* Break */}
                    <td className="py-3 px-3 align-top bg-amber-50/20 dark:bg-amber-950/10 text-center">
                      <div className="py-3 px-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-[10px] text-amber-800 dark:text-amber-300 font-semibold leading-tight">
                        Morning break
                      </div>
                    </td>

                    {/* Period 3 */}
                    <td className="py-3 px-3 align-top">
                      <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                        <div className="font-bold text-xs text-slate-900 dark:text-white">
                          {row.p3}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {s3.teacher}
                        </div>
                        <div className="text-[10px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                          {s3.room}
                        </div>
                      </div>
                    </td>

                    {/* Period 4 */}
                    <td className="py-3 px-3 align-top">
                      <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                        <div className="font-bold text-xs text-slate-900 dark:text-white">
                          {row.p4}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {s4.teacher}
                        </div>
                        <div className="text-[10px] font-mono font-semibold text-rose-600 dark:text-rose-400">
                          {s4.room}
                        </div>
                      </div>
                    </td>

                    {/* Period 5 */}
                    <td className="py-3 px-3 align-top">
                      <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                        <div className="font-bold text-xs text-slate-900 dark:text-white">
                          {row.p5}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {s5.teacher}
                        </div>
                        <div className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          {s5.room}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Notes matching 12_timetable_desktop */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-2 gap-2">
        <span>Schedule updated 20 Nov 2026 - All times PKT (UTC+5)</span>
        <span>Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore</span>
      </div>
    </div>
  );
};
