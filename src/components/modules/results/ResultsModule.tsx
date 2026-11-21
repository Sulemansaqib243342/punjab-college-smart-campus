import React, { useState } from 'react';
import {
  Award,
  Search,
  Printer,
  Sparkles,
  Medal,
  TrendingUp,
  FileText,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { StudentResultSummary, Student } from '../../../types';
import { PrintableResultCard } from '../../common/PrintableResultCard';
import { StudentPerformanceModal } from '../../common/StudentPerformanceModal';

export const ResultsModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  const [selectedExamId, setSelectedExamId] = useState(store.exams[1]?.id || store.exams[0]?.id || '');
  const [selectedClassId, setSelectedClassId] = useState(store.classes[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [selectedResultForPrint, setSelectedResultForPrint] = useState<StudentResultSummary | null>(null);
  const [performanceStudent, setPerformanceStudent] = useState<Student | null>(null);

  // Compute full class results with automatic rankings
  const results = store.getResultsSummaryForClass(selectedExamId, selectedClassId);

  // Top 3 toppers
  const top1 = results.find((r) => r.rank === 1);
  const top2 = results.find((r) => r.rank === 2);
  const top3 = results.find((r) => r.rank === 3);

  // Filtered
  const filteredResults = results.filter((r) => {
    return (
      r.student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.student.roll_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.student.father_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>Automatic Results, Position Rankings & Transcripts</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Auto-calculated totals, percentages, letter grades (A+ to F), class positions, and print-ready BISE result cards
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Examination</label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
            >
              {store.exams.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Class & Group</label>
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
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search student or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
          />
        </div>
      </div>

      {/* Position Holders Podium Card */}
      <div className="bg-linear-to-r from-amber-500/10 via-yellow-500/10 to-transparent dark:from-amber-950/30 dark:via-yellow-950/20 p-5 rounded-2xl border border-amber-300/60 dark:border-amber-900/60">
        <div className="flex items-center gap-2 mb-4">
          <Medal className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
            Class Position Holders (Top Merit Batch)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1st position */}
          {top1 && (
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border-2 border-amber-400 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-blue-950 font-black flex items-center justify-center text-sm shadow-xs">
                  1st
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{top1.student.full_name}</h4>
                  <span className="font-mono text-[10px] text-blue-600 font-bold">{top1.student.roll_number}</span>
                  <div className="text-[11px] text-emerald-600 font-extrabold mt-0.5">
                    {top1.total_obtained} / {top1.total_maximum} ({top1.overall_percentage}%)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedResultForPrint(top1)}
                className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs"
                title="Print Result Card"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 2nd position */}
          {top2 && (
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 font-black flex items-center justify-center text-sm">
                  2nd
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{top2.student.full_name}</h4>
                  <span className="font-mono text-[10px] text-blue-600 font-bold">{top2.student.roll_number}</span>
                  <div className="text-[11px] text-emerald-600 font-extrabold mt-0.5">
                    {top2.total_obtained} / {top2.total_maximum} ({top2.overall_percentage}%)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedResultForPrint(top2)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs"
                title="Print Result Card"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 3rd position */}
          {top3 && (
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-700/30 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-900 font-black flex items-center justify-center text-sm">
                  3rd
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{top3.student.full_name}</h4>
                  <span className="font-mono text-[10px] text-blue-600 font-bold">{top3.student.roll_number}</span>
                  <div className="text-[11px] text-emerald-600 font-extrabold mt-0.5">
                    {top3.total_obtained} / {top3.total_maximum} ({top3.overall_percentage}%)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedResultForPrint(top3)}
                className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs"
                title="Print Result Card"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Class Rankings Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4 w-28">Roll No</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Father Name</th>
                <th className="py-3 px-4 text-center">Aggregate Marks</th>
                <th className="py-3 px-4 text-center">%age</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Result</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredResults.map((r) => (
                <tr key={r.student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-center font-bold">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-black ${
                        r.rank === 1
                          ? 'bg-amber-400 text-blue-950 shadow-xs'
                          : r.rank === 2
                          ? 'bg-slate-200 text-slate-800'
                          : r.rank === 3
                          ? 'bg-amber-700/20 text-amber-900'
                          : 'text-slate-500'
                      }`}
                    >
                      #{r.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-900 dark:text-blue-400">
                    {r.student.roll_number}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {r.student.full_name}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {r.student.father_name}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">
                    {r.total_obtained} / {r.total_maximum}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400">
                    {r.overall_percentage}%
                  </td>
                  <td className="py-3 px-4 text-center font-extrabold text-slate-900 dark:text-white">
                    {r.overall_grade}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        r.status === 'Pass'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    {/* Print Result Card */}
                    <button
                      onClick={() => setSelectedResultForPrint(r)}
                      className="px-2.5 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-bold text-[11px] shadow-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Result Card</span>
                    </button>

                    {/* AI Diagnostic Report */}
                    <button
                      onClick={() => setPerformanceStudent(r.student)}
                      className="px-2.5 py-1 rounded-lg bg-linear-to-r from-red-600 to-blue-700 hover:opacity-90 text-white font-bold text-[11px] shadow-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>AI Report</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Result Card Modal */}
      {selectedResultForPrint && (
        <PrintableResultCard
          result={selectedResultForPrint}
          onClose={() => setSelectedResultForPrint(null)}
        />
      )}

      {/* Performance Modal */}
      {performanceStudent && (
        <StudentPerformanceModal
          student={performanceStudent}
          onClose={() => setPerformanceStudent(null)}
        />
      )}
    </div>
  );
};

