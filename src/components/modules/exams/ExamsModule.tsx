import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Save,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BookOpen,
  Award,
  ChevronDown,
  ArrowRight,
  Printer,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Modal } from '../../common/Modal';

interface ExamScheduleItem {
  id: string;
  title: string;
  date_range: string;
  scope: string;
  status: 'Published' | 'Upcoming';
  status_detail: string;
  action_label: string;
}

const EXAM_SCHEDULE: ExamScheduleItem[] = [
  {
    id: 'exam-1',
    title: 'Mid-term I · November 2026',
    date_range: '09-18 Nov 2026',
    scope: '6 classes · 30 subject sessions',
    status: 'Published',
    status_detail: 'Completed 18 Nov · Published 20 Nov',
    action_label: 'View result',
  },
  {
    id: 'exam-2',
    title: 'Mid-term II · December 2026',
    date_range: '15-23 Dec 2026',
    scope: '6 classes · 30 subject sessions',
    status: 'Upcoming',
    status_detail: 'Schedule confirmed',
    action_label: 'Exam schedule',
  },
  {
    id: 'exam-3',
    title: 'Monthly test · October 2026',
    date_range: '19-23 Oct 2026',
    scope: '6 classes · 18 subject sessions',
    status: 'Published',
    status_detail: 'Completed 23 Oct · Published 26 Oct',
    action_label: 'View result',
  },
];

export const ExamsModule: React.FC = () => {
  const store = useStore();
  const [selectedClass, setSelectedClass] = useState('All classes');
  const [selectedType, setSelectedType] = useState('All exam types');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');

  // Marks entry state
  const [marksModalOpen, setMarksModalOpen] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [activeExam, setActiveExam] = useState<ExamScheduleItem | null>(null);

  const [studentMarks, setStudentMarks] = useState([
    { id: '1', name: 'Abdul Rehman', roll: 'ICS1-026', marks: 92, max: 100 },
    { id: '2', name: 'Ayesha Khan', roll: 'ICS1-027', marks: 88, max: 100 },
    { id: '3', name: 'Hamza Ali', roll: 'ICS1-028', marks: 74, max: 100 },
    { id: '4', name: 'Fatima Noor', roll: 'ICS1-029', marks: 86, max: 100 },
    { id: '5', name: 'Zain Hassan', roll: 'ICS2-014', marks: 80, max: 100 },
    { id: '6', name: 'Mahnoor Aslam', roll: 'ICS2-015', marks: 78, max: 100 },
  ]);

  const handleMarkChange = (id: string, val: number) => {
    setStudentMarks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, marks: Math.min(100, Math.max(0, val)) } : s))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Block */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
          EXAMINATIONS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101c4e] dark:text-white tracking-tight">
          Examinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Plan assessments, track marks and publish results with confidence.
        </p>
      </div>

      {/* 2. Top 4 KPI Metric Cards (Exact Mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Exams this term (Solid Deep Navy Card) */}
        <div className="bg-[#101c4e] text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-blue-200 block">
            Exams this term
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white mt-1">
            3
          </div>
          <span className="text-xs text-blue-200/90 mt-2 font-medium block">
            2 published · 1 upcoming
          </span>
        </div>

        {/* Card 2: Students assessed */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Students assessed
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            252
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Across 6 active classes
          </span>
        </div>

        {/* Card 3: Next examination */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Next examination
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            15 Dec
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Mid-term II · Morning session
          </span>
        </div>

        {/* Card 4: Published results */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Published results
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            3
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Schedule confirmed
          </span>
        </div>
      </div>

      {/* 3. Examination Schedule Section */}
      <div className="space-y-4">
        <div className="space-y-0.5">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
            Examination schedule
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Academic session 2026-27 · Morning shift
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] cursor-pointer"
            >
              <option value="All classes">All classes</option>
              <option value="ICS Part 1 · A">ICS Part 1 · A</option>
              <option value="ICS Part 2 · A">ICS Part 2 · A</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] cursor-pointer"
            >
              <option value="All exam types">All exam types</option>
              <option value="Mid-term">Mid-term</option>
              <option value="Monthly test">Monthly test</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] cursor-pointer"
            >
              <option value="All statuses">All statuses</option>
              <option value="Published">Published</option>
              <option value="Upcoming">Upcoming</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* 3 Exam Rows Container */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
          {EXAM_SCHEDULE.map((exam) => (
            <div
              key={exam.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {exam.title}
                  </h4>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                      exam.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    {exam.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {exam.date_range} · {exam.scope}
                </p>
                <p className="text-[11px] text-slate-400">
                  {exam.status_detail}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveExam(exam);
                    setResultModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  {exam.action_label}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Continue Marks Entry Section (Exact Mockup) */}
      <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
            Continue marks entry
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Computer Science · ICS Part 1 · A · Mid-term I
          </p>
          <p className="text-[11px] text-slate-400">
            6 demo entries saved · 1 mark requires correction before publishing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMarksModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#101c4e] hover:bg-[#0c163d] text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
        >
          Enter marks
        </button>
      </div>

      <div className="text-[11px] text-slate-400">
        Published results are available to students and guardians.
      </div>

      {/* 5. Footer Note */}
      <div className="text-xs text-slate-400 dark:text-slate-500 pt-2 pb-4 text-center sm:text-left">
        Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore
      </div>

      {/* Enter Marks Modal */}
      <Modal
        isOpen={marksModalOpen}
        onClose={() => setMarksModalOpen(false)}
        title="Enter Subject Marks — Computer Science (ICS Part 1 · A)"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-900 text-xs font-medium">
            Mid-term I · Total Marks: 100 · Passing Threshold: 40 marks
          </div>

          <div className="space-y-3">
            {studentMarks.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {s.name}
                  </div>
                  <div className="text-slate-400 font-mono text-[11px]">
                    {s.roll}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={s.marks}
                    onChange={(e) => handleMarkChange(s.id, parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-center font-bold text-xs"
                  />
                  <span className="text-slate-400 text-xs">/ 100</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setMarksModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setMarksModalOpen(false);
              }}
              className="px-5 py-2 rounded-xl bg-[#101c4e] text-white text-xs font-bold hover:bg-[#0c163d] cursor-pointer"
            >
              Save Marks
            </button>
          </div>
        </div>
      </Modal>

      {/* Result Details Modal */}
      <Modal
        isOpen={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
        title={activeExam ? activeExam.title : 'Examination Result'}
        maxWidth="md"
      >
        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            Official class standings and scorecards for {activeExam?.title} have been validated by the Examination Controller.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Classes Assessed:</span>
              <span className="font-bold text-slate-900 dark:text-white">6 Classes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Overall Class Average:</span>
              <span className="font-bold text-slate-900 dark:text-white">76.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Passing Rate:</span>
              <span className="font-bold text-emerald-600">94.2%</span>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setResultModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#101c4e] text-white text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
