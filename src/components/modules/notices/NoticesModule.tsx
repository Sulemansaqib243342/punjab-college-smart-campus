import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  AlertTriangle,
  Calendar,
  Building,
  Pin,
  CheckCircle2,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Modal } from '../../common/Modal';

interface CampusNoticeItem {
  id: string;
  title: string;
  badges: Array<{ label: string; bg: string; text: string; border: string }>;
  description: string;
  metaBadge: string;
  office: string;
  date: string;
  campus: string;
  hasViewResult?: boolean;
}

export const NoticesModule: React.FC<{ onNavigateToResults?: () => void }> = ({
  onNavigateToResults,
}) => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest first');
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Exact 5 campus notices matching 14_notices_desktop.png
  const noticesList: CampusNoticeItem[] = [
    {
      id: 'not-1',
      title: 'Mid-term I results are published',
      badges: [
        {
          label: 'Urgent',
          bg: 'bg-rose-50 dark:bg-rose-950/60',
          text: 'text-rose-700 dark:text-rose-300',
          border: 'border-rose-200 dark:border-rose-800',
        },
        {
          label: 'Exam',
          bg: 'bg-blue-50 dark:bg-blue-950/60',
          text: 'text-blue-700 dark:text-blue-300',
          border: 'border-blue-200 dark:border-blue-800',
        },
      ],
      description:
        'Mid-term I · November 2026 results were published on 20 November. Review your subject marks and speak to your teacher about your revision priorities.',
      metaBadge: 'Published 20 Nov',
      office: 'Examination Office',
      date: '20 Nov 2026',
      campus: 'Minar-e-Pakistan campus',
      hasViewResult: true,
    },
    {
      id: 'not-2',
      title: 'Library books: return by 24 November',
      badges: [
        {
          label: 'Urgent',
          bg: 'bg-rose-50 dark:bg-rose-950/60',
          text: 'text-rose-700 dark:text-rose-300',
          border: 'border-rose-200 dark:border-rose-800',
        },
        {
          label: 'Students',
          bg: 'bg-purple-50 dark:bg-purple-950/60',
          text: 'text-purple-700 dark:text-purple-300',
          border: 'border-purple-200 dark:border-purple-800',
        },
      ],
      description:
        'Please return or renew all borrowed library books by Tuesday, 24 November. Visit the library desk before 2:00 PM to avoid overdue charges.',
      metaBadge: 'Deadline 24 Nov',
      office: 'Campus Library',
      date: '21 Nov 2026',
      campus: 'Minar-e-Pakistan campus',
    },
    {
      id: 'not-3',
      title: 'Prepare for Mid-term II · 15 December',
      badges: [
        {
          label: 'Exam',
          bg: 'bg-blue-50 dark:bg-blue-950/60',
          text: 'text-blue-700 dark:text-blue-300',
          border: 'border-blue-200 dark:border-blue-800',
        },
        {
          label: 'Students & Teachers',
          bg: 'bg-slate-100 dark:bg-slate-800',
          text: 'text-slate-700 dark:text-slate-300',
          border: 'border-slate-200 dark:border-slate-700',
        },
      ],
      description:
        'Mid-term II begins on 15 December 2026. Revise the covered syllabus, complete practice papers and ask your subject teachers about topics that need attention.',
      metaBadge: 'Starts 15 Dec',
      office: 'Academic Office',
      date: '21 Nov 2026',
      campus: 'Minar-e-Pakistan campus',
    },
    {
      id: 'not-4',
      title: 'Science & Innovation Fair 2026',
      badges: [
        {
          label: 'General',
          bg: 'bg-emerald-50 dark:bg-emerald-950/60',
          text: 'text-emerald-700 dark:text-emerald-300',
          border: 'border-emerald-200 dark:border-emerald-800',
        },
        {
          label: 'Students & Teachers',
          bg: 'bg-slate-100 dark:bg-slate-800',
          text: 'text-slate-700 dark:text-slate-300',
          border: 'border-slate-200 dark:border-slate-700',
        },
      ],
      description:
        'Join us on 28 November in the main courtyard, 9:00 AM—1:00 PM. Register your project with Sana Iqbal by 25 November; teams of up to three are welcome.',
      metaBadge: 'Event 28 Nov',
      office: 'Student Affairs',
      date: '21 Nov 2026',
      campus: 'Minar-e-Pakistan campus',
    },
    {
      id: 'not-5',
      title: 'Quaid-e-Azam Day · 25 December',
      badges: [
        {
          label: 'Holiday',
          bg: 'bg-amber-50 dark:bg-amber-950/60',
          text: 'text-amber-700 dark:text-amber-300',
          border: 'border-amber-200 dark:border-amber-800',
        },
        {
          label: 'Students & Teachers',
          bg: 'bg-slate-100 dark:bg-slate-800',
          text: 'text-slate-700 dark:text-slate-300',
          border: 'border-slate-200 dark:border-slate-700',
        },
      ],
      description:
        'The campus will remain closed on Friday, 25 December for Quaid-e-Azam Day. Regular classes resume on Saturday, 26 December according to the timetable.',
      metaBadge: 'Holiday 25 Dec',
      office: 'Campus Administration',
      date: '21 Nov 2026',
      campus: 'Minar-e-Pakistan campus',
    },
  ];

  // Post Notice State
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'General',
    target: 'Students & Teachers',
    office: 'Campus Administration',
  });

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostOpen(false);
    setToast(`Notice "${form.title}" published successfully!`);
    setTimeout(() => setToast(null), 4000);
  };

  const filteredNotices = noticesList.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.office.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      n.badges.some((b) => b.label.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Module Title Header matching 14_notices_desktop */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          CAMPUS NOTICES
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              Stay in the campus loop.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Important updates, opportunities and dates for your diary.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">{currentUser?.full_name || 'Campus Admin'}</span>
            <span className="text-slate-400 font-mono text-[10px] uppercase">
              ({currentUser?.role || 'Administrator'}) · Minar-e-Pakistan Campus
            </span>
          </div>
        </div>
      </div>

      {toast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Banner Card matching 14_notices_desktop.png */}
      <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1b224b] dark:text-white">
              Keep up with campus.
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {noticesList.length} notices
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            5 notices · Updated 21 November 2026
          </p>
        </div>

        {!isStudent && (
          <button
            onClick={() => setIsPostOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#101c4e] hover:bg-blue-950 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post announcement</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar: Categories, Sort & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills matching mockup */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {['All', 'Students', 'General', 'Exam', 'Students & Teachers', 'Teachers', 'Holiday'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#101c4e] text-white shadow-xs'
                  : 'bg-white dark:bg-[#11182c] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {cat}
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
            <option value="Priority">Priority</option>
          </select>

          <div className="relative w-48 sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search campus notices"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11182c] text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e]"
            />
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-400">
        Showing all {filteredNotices.length} notices
      </div>

      {/* 5 Notices Cards List matching 14_notices_desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 sm:p-6 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-900/60 transition-all space-y-4"
          >
            <div>
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                {notice.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${b.bg} ${b.text} ${b.border}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-sm sm:text-base text-[#1b224b] dark:text-white leading-snug">
                {notice.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {notice.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Meta row */}
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {notice.metaBadge}
                </div>
                <div className="text-[11px] text-slate-400">
                  {notice.office} · {notice.date} · {notice.campus}
                </div>
              </div>

              {/* Action Button */}
              {notice.hasViewResult && (
                <button
                  onClick={() => {
                    if (onNavigateToResults) {
                      onNavigateToResults();
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto shrink-0 border border-blue-200 dark:border-blue-800"
                >
                  View result
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Post Announcement Modal */}
      {isPostOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsPostOpen(false)}
          title="Post Campus Announcement"
          maxWidth="md"
        >
          <form onSubmit={handlePostNotice} className="space-y-4 p-4 text-xs font-sans">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Notice Title
              </label>
              <input
                type="text"
                placeholder="e.g. Winter Break Schedule 2026"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 text-xs font-semibold"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="Exam">Exam</option>
                  <option value="General">General</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Target Audience
                </label>
                <select
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 text-xs font-semibold"
                >
                  <option value="Students">Students</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Students & Teachers">Students & Teachers</option>
                  <option value="All Campus">All Campus</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Circular Content / Advisory
              </label>
              <textarea
                rows={3}
                placeholder="Write full circular details..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 text-xs"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPostOpen(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#101c4e] text-white font-bold rounded-xl"
              >
                Broadcast Announcement
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Footer Notes matching 14_notices_desktop */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-2 gap-2">
        <span>Official campus announcements - Please contact the relevant office with questions.</span>
        <span>Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore</span>
      </div>
    </div>
  );
};
