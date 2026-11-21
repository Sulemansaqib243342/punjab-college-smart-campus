import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Download,
  FileText,
  Link,
  Trash2,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { StudyMaterial } from '../../../types';
import { Modal } from '../../common/Modal';
import { formatDate } from '../../../lib/utils';

export const MaterialsModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Upload Form
  const [form, setForm] = useState({
    title: '',
    description: '',
    class_id: store.classes[0]?.id || '',
    subject_id: store.subjects[0]?.id || '',
    teacher_id: store.teachers[0]?.id || '',
    teacher_name: currentUser?.full_name || 'Prof. Tariq Mahmood',
    file_url: 'https://example.com/notes.pdf',
    file_type: 'pdf' as any,
    file_size: '2.5 MB',
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addStudyMaterial({
      ...form,
      teacher_name: currentUser?.full_name || form.teacher_name,
    });
    setIsUploadOpen(false);
    setDownloadToast(`Study material "${form.title}" published for students!`);
    setTimeout(() => setDownloadToast(null), 4000);
  };

  const handleSimulateDownload = (material: StudyMaterial) => {
    // Generate a simple text file blob and download
    const content = `PUNJAB COLLEGE LAHORE\nMINAR-E-PAKISTAN CAMPUS\n=========================================\nTitle: ${material.title}\nSubject: ${store.subjects.find((s) => s.id === material.subject_id)?.name}\nTeacher: ${material.teacher_name}\nDate: ${material.created_at}\n\nNotes & Study Content:\n${material.description}\n\n=========================================\nFor questions, contact the respective department.\nOfficial Portal: Smart Campus PGC`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${material.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloading "${material.title}"...`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const filteredMaterials = store.studyMaterials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.teacher_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || m.class_id === classFilter;
    const matchesSubject = subjectFilter === 'all' || m.subject_id === subjectFilter;
    return matchesSearch && matchesClass && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span>Educational Contents & Study Materials</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Download comprehensive chapter revision notes, numerical formula sheets, and past board papers
          </p>
        </div>

        {!isStudent && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Notes / PDF</span>
          </button>
        )}
      </div>

      {downloadToast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search notes topic, chapter, author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
          >
            <option value="all">All Classes</option>
            {store.classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
          >
            <option value="all">All Subjects</option>
            {store.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((mat) => {
          const subject = store.subjects.find((s) => s.id === mat.subject_id);
          const classRoom = store.classes.find((c) => c.id === mat.class_id);

          return (
            <div
              key={mat.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 uppercase">
                    {subject?.name || 'Subject'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {formatDate(mat.created_at)}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2">
                  {mat.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {mat.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <div>
                    <span className="block font-semibold text-slate-700 dark:text-slate-300">
                      {mat.teacher_name}
                    </span>
                    <span className="text-[10px] text-slate-400">{classRoom?.name}</span>
                  </div>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {mat.file_size || '2.4 MB'}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleSimulateDownload(mat)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Handout</span>
                </button>

                {!isStudent && (
                  <button
                    onClick={() => store.deleteStudyMaterial(mat.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete Material"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Notes or Study Material"
        maxWidth="md"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Chapter 4 Integration Formula Booklet"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description / Instructions *
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief summary of topics covered, board references, solved exercises..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Class</label>
              <select
                value={form.class_id}
                onChange={(e) => setForm({ ...form, class_id: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              >
                {store.classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <select
                value={form.subject_id}
                onChange={(e) => setForm({ ...form, subject_id: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              >
                {store.subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold"
            >
              Publish Material
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

