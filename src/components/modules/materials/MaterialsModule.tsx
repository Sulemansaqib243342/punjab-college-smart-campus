import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Download,
  FileText,
  ExternalLink,
  CheckCircle2,
  Filter,
  User,
  GraduationCap,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Modal } from '../../common/Modal';

interface StudyItem {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  fileType: 'PDF' | 'DOCX' | 'External URL';
  description: string;
  fileSize: string;
  date: string;
  sharedBy: string;
  url?: string;
}

export const MaterialsModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest first');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Exact 6 study materials matching 13_materials_desktop.png
  const studyMaterialsList: StudyItem[] = [
    {
      id: 'mat-1',
      title: 'Programming Fundamentals.pdf',
      subject: 'Computer Science',
      subjectCode: 'CS',
      fileType: 'PDF',
      description: 'Chapter 3 · Variables, data types & operators',
      fileSize: '1.8 MB',
      date: '20 Nov 2026',
      sharedBy: 'Sana Iqbal',
    },
    {
      id: 'mat-2',
      title: 'Vectors & Scalars.pdf',
      subject: 'Physics',
      subjectCode: 'Physics',
      fileType: 'PDF',
      description: 'Chapter 2 · Worked examples and key concepts',
      fileSize: '2.4 MB',
      date: '19 Nov 2026',
      sharedBy: 'Bilal Ahmed',
    },
    {
      id: 'mat-3',
      title: 'English Essay Writing Guide.docx',
      subject: 'English',
      subjectCode: 'English',
      fileType: 'DOCX',
      description: 'Structure stronger arguments in your next essay',
      fileSize: '640 KB',
      date: '18 Nov 2026',
      sharedBy: 'Mariam Khan',
    },
    {
      id: 'mat-4',
      title: 'Urdu Adab Notes.pdf',
      subject: 'Urdu',
      subjectCode: 'Urdu',
      fileType: 'PDF',
      description: 'Selected prose · Revision notes and questions',
      fileSize: '1.2 MB',
      date: '18 Nov 2026',
      sharedBy: 'Farah Saeed',
    },
    {
      id: 'mat-5',
      title: 'Maths Matrices Practice.pdf',
      subject: 'Maths',
      subjectCode: 'Maths',
      fileType: 'PDF',
      description: 'Exercise 3.1 · Practice problems with answers',
      fileSize: '980 KB',
      date: '17 Nov 2026',
      sharedBy: 'Hina Rashid',
    },
    {
      id: 'mat-6',
      title: 'Physics Lab Reference',
      subject: 'Physics',
      subjectCode: 'Physics',
      fileType: 'External URL',
      description: 'phet.colorado.edu · Interactive physics resources',
      fileSize: 'External URL',
      date: '16 Nov 2026',
      sharedBy: 'Bilal Ahmed',
      url: 'https://phet.colorado.edu/',
    },
  ];

  // Upload Form State
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: 'Computer Science',
    fileType: 'PDF' as const,
    sharedBy: currentUser?.full_name || 'Sana Iqbal',
  });

  const handleDownload = (item: StudyItem) => {
    if (item.fileType === 'External URL') {
      window.open(item.url || 'https://phet.colorado.edu/', '_blank');
      return;
    }

    const content = `PUNJAB COLLEGE, MINAR-E-PAKISTAN CAMPUS, LAHORE\n=========================================\nTitle: ${item.title}\nSubject: ${item.subject}\nFaculty: ${item.sharedBy}\nDate Published: ${item.date}\nFile Size: ${item.fileSize}\n\nContents & Curriculum Notes:\n${item.description}\n\nKey Concepts for Examination Revision:\n1. Master the standard definitions and board exam formulas.\n2. Complete all textbook questions and exercise numericals.\n3. Verify doubts with subject professors during weekly clinic hours.\n=========================================\nOfficial Student Portal · Smart Campus PGC`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = item.title;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded "${item.title}" successfully!`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadOpen(false);
    setDownloadToast(`Study material "${form.title}" published for ICS Part 1!`);
    setTimeout(() => setDownloadToast(null), 4000);
  };

  const filteredMaterials = studyMaterialsList.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.sharedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject =
      selectedSubject === 'All' ||
      m.subject.toLowerCase() === selectedSubject.toLowerCase() ||
      m.subjectCode.toLowerCase() === selectedSubject.toLowerCase();

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Module Title Header matching 13_materials_desktop */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          STUDY MATERIALS
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              A little knowledge goes a long way.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Notes, resources and references. Ready when you are.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{currentUser?.full_name || 'Sana Iqbal'}</span>
            <span className="text-slate-400 font-mono text-[10px] uppercase">({currentUser?.role || 'Teacher'})</span>
          </div>
        </div>
      </div>

      {downloadToast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Banner Card matching 13_materials_desktop.png */}
      <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1b224b] dark:text-white">
              Your learning, all in one place.
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {filteredMaterials.length} resources available
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            6 resources · ICS Part 1, Section A
          </p>
        </div>

        {!isStudent && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#101c4e] hover:bg-blue-950 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload material</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar: Subject Pills, Sort & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Subject Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {['All', 'Physics', 'Computer Science', 'Maths', 'English', 'Urdu'].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSubject === sub
                  ? 'bg-[#101c4e] text-white shadow-xs'
                  : 'bg-white dark:bg-[#11182c] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {sub === 'Computer Science' ? 'CS' : sub}
            </button>
          ))}
        </div>

        {/* Sort & Search */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11182c] text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            <option value="Newest first">Newest first</option>
            <option value="Subject">By Subject</option>
            <option value="File size">By File Size</option>
          </select>

          <div className="relative w-48 sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search study materials"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11182c] text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e]"
            />
          </div>
        </div>
      </div>

      {/* 6 Study Materials Cards Grid matching 13_materials_desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-900/60 transition-all space-y-4"
          >
            <div>
              {/* Badges row */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {item.subjectCode}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.fileType === 'External URL'
                    ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                }`}>
                  {item.fileType}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-sm text-[#1b224b] dark:text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              {/* Meta row */}
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>{item.fileSize} · {item.date}</span>
                <span className="text-slate-500 font-medium">{item.sharedBy}</span>
              </div>

              {/* Action Button */}
              {item.fileType === 'External URL' ? (
                <button
                  onClick={() => handleDownload(item)}
                  className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open resource</span>
                </button>
              ) : (
                <button
                  onClick={() => handleDownload(item)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download file</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Material Modal */}
      {isUploadOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsUploadOpen(false)}
          title="Upload Study Material / PDF"
          maxWidth="md"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-4 p-4 text-xs font-sans">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Document Title
              </label>
              <input
                type="text"
                placeholder="e.g. Physics Chapter 4 Revision Notes.pdf"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Subject
              </label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 text-xs font-semibold"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Physics">Physics</option>
                <option value="Maths">Maths</option>
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Curriculum Topic / Description
              </label>
              <textarea
                rows={3}
                placeholder="Chapter 3 · Variables, data types & practice numericals"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 text-xs"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#101c4e] text-white font-bold rounded-xl"
              >
                Publish for Students
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Footer Notes matching 13_materials_desktop */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-2 gap-2">
        <span>Teacher-shared resources - Download files for offline revision.</span>
        <span>Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore</span>
      </div>
    </div>
  );
};
