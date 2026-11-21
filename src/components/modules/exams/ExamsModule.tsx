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
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Exam, ExamType } from '../../../types';
import { Modal } from '../../common/Modal';
import { calculateGrade, formatDate } from '../../../lib/utils';

export const ExamsModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isTeacher = currentUser?.role === 'teacher';

  // Selection states
  const [selectedExamId, setSelectedExamId] = useState(store.exams[1]?.id || store.exams[0]?.id || '');
  const [selectedClassId, setSelectedClassId] = useState(store.classes[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState(store.subjects[0]?.id || '');

  // Add exam modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [examForm, setExamForm] = useState({
    name: '',
    exam_type: 'midterm' as ExamType,
    academic_year: '2024-2025',
    start_date: '2024-12-05',
    end_date: '2024-12-16',
    total_marks_per_subject: 100,
    is_published: true,
  });

  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Current selected exam
  const currentExam = store.exams.find((e) => e.id === selectedExamId) || store.exams[0];
  const maxMarks = currentExam?.total_marks_per_subject || 100;

  // Students in selected class
  const classStudents = store.students.filter((s) => s.class_id === selectedClassId);

  // Marks state: Map of student_id -> marksObtained
  const [marksState, setMarksState] = useState<Record<string, number>>({});

  // Sync marks state when exam, class or subject changes
  React.useEffect(() => {
    const existing = store.marks.filter(
      (m) =>
        m.exam_id === selectedExamId &&
        m.class_id === selectedClassId &&
        m.subject_id === selectedSubjectId
    );
    const map: Record<string, number> = {};
    classStudents.forEach((std) => {
      const match = existing.find((m) => m.student_id === std.id);
      map[std.id] = match ? match.marks_obtained : Math.round(maxMarks * 0.75);
    });
    setMarksState(map);
  }, [selectedExamId, selectedClassId, selectedSubjectId, store.marks]);

  const handleMarkChange = (studentId: string, val: number) => {
    setMarksState((prev) => ({ ...prev, [studentId]: val }));
  };

  const handleSaveMarks = () => {
    const list = Object.entries(marksState).map(([studentId, marksObtained]) => ({
      studentId,
      marksObtained: Math.min(maxMarks, Math.max(0, marksObtained)),
      totalMarks: maxMarks,
    }));

    store.saveMarksBatch(selectedExamId, selectedSubjectId, selectedClassId, list);
    const sub = store.subjects.find((s) => s.id === selectedSubjectId);
    setSaveToast(`Marks for ${sub?.name || 'Subject'} saved and validated successfully!`);
    setTimeout(() => setSaveToast(null), 4000);
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    store.addExam(examForm);
    setIsCreateModalOpen(false);
    setSaveToast(`New examination "${examForm.name}" created!`);
    setTimeout(() => setSaveToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-blue-600" />
            <span>Examinations & Subject Marks Entry</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create academic exams, enter subject-wise student marks with live bounds validation, and grade calculations
          </p>
        </div>

        {!isTeacher && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Exam</span>
          </button>
        )}
      </div>

      {saveToast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Selector Ribbon */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
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
                  {ex.name} (Max: {ex.total_marks_per_subject})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
            >
              {store.classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Select Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
            >
              {store.subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button
            onClick={handleSaveMarks}
            className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Validate Marks</span>
          </button>
        </div>
      </div>

      {/* Marks Entry Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-xs text-slate-900 dark:text-white">
              Marks Sheet: {store.subjects.find((s) => s.id === selectedSubjectId)?.name} (Max Marks: {maxMarks})
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {classStudents.length} Students in {store.classes.find((c) => c.id === selectedClassId)?.name}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Sr#</th>
                <th className="py-3 px-4 w-28">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Father Name</th>
                <th className="py-3 px-4 w-40">Marks Obtained</th>
                <th className="py-3 px-4 w-24 text-center">%age</th>
                <th className="py-3 px-4 w-24 text-center">Grade</th>
                <th className="py-3 px-4 w-24 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {classStudents.map((std, idx) => {
                const mark = marksState[std.id] !== undefined ? marksState[std.id] : 0;
                const isOutOfBounds = mark < 0 || mark > maxMarks;
                const pct = maxMarks > 0 ? Math.round((mark / maxMarks) * 100) : 0;
                const gradeInfo = calculateGrade(pct);
                const isPass = pct >= 40;

                return (
                  <tr key={std.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-900 dark:text-blue-400">
                      {std.roll_number}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{std.full_name}</td>
                    <td className="py-3 px-4 text-slate-500">{std.father_name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={maxMarks}
                          value={mark}
                          onChange={(e) => handleMarkChange(std.id, Number(e.target.value))}
                          className={`w-24 px-3 py-1.5 rounded-lg border font-mono font-bold text-center text-xs focus:ring-2 focus:ring-blue-600 ${
                            isOutOfBounds
                              ? 'border-red-500 bg-red-50 text-red-900'
                              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                          }`}
                        />
                        <span className="text-slate-400 font-mono text-[11px]">/ {maxMarks}</span>
                      </div>
                      {isOutOfBounds && (
                        <span className="text-[10px] text-red-600 font-bold block mt-0.5">
                          Must be between 0 and {maxMarks}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 dark:text-white">
                      {pct}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-blue-950 dark:text-blue-300">{gradeInfo.grade}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                          isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isPass ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Exam Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Schedule New Examination"
        maxWidth="md"
      >
        <form onSubmit={handleCreateExam} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Examination Title *
            </label>
            <input
              type="text"
              required
              value={examForm.name}
              onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
              placeholder="e.g. Final Pre-Board Examination 2025"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Exam Type
              </label>
              <select
                value={examForm.exam_type}
                onChange={(e: any) => setExamForm({ ...examForm, exam_type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              >
                <option value="monthly">Monthly Test</option>
                <option value="midterm">Mid-Term Exam</option>
                <option value="final">Final / Pre-Board</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Total Marks / Subject
              </label>
              <input
                type="number"
                min={20}
                max={200}
                value={examForm.total_marks_per_subject}
                onChange={(e) => setExamForm({ ...examForm, total_marks_per_subject: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={examForm.start_date}
                onChange={(e) => setExamForm({ ...examForm, start_date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={examForm.end_date}
                onChange={(e) => setExamForm({ ...examForm, end_date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold"
            >
              Create Exam
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

