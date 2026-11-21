import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  AlertTriangle,
  Calendar,
  Pin,
  Trash2,
  Filter,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Notice, NoticeCategory, NoticeAudience } from '../../../types';
import { Modal } from '../../common/Modal';
import { formatDate } from '../../../lib/utils';

export const NoticesModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'general' as NoticeCategory,
    target_audience: 'all' as NoticeAudience,
    class_id: undefined as string | undefined,
    is_pinned: false,
    posted_by_name: currentUser?.full_name || 'Administration Office',
  });

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    store.addNotice({
      ...form,
      posted_by_name: currentUser?.full_name || form.posted_by_name,
    });
    setIsCreateOpen(false);
    setToast(`Announcement "${form.title}" broadcasted successfully!`);
    setTimeout(() => setToast(null), 4000);
  };

  const filteredNotices = store.notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.posted_by_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || n.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const urgentNotices = store.notices.filter((n) => n.category === 'urgent' || n.is_pinned);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-red-600" />
            <span>Campus Notice Board & Official Circulars</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time administrative notices, government smog advisories, exam date sheets, and academic schedules
          </p>
        </div>

        {!isStudent && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Announcement</span>
          </button>
        )}
      </div>

      {toast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Pinned / Urgent Notice Alert Banner */}
      {urgentNotices.length > 0 && (
        <div className="p-5 rounded-2xl bg-linear-to-r from-red-600 to-red-800 text-white shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-red-200">
            <AlertTriangle className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Urgent Campus Notice & Advisory</span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold">{urgentNotices[0].title}</h3>
          <p className="text-xs text-red-100 leading-relaxed font-normal">{urgentNotices[0].content}</p>
          <div className="text-[11px] text-red-200 flex items-center justify-between pt-1 border-t border-red-500/50">
            <span>Posted: {formatDate(urgentNotices[0].date)}</span>
            <span>By: {urgentNotices[0].posted_by_name}</span>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search circular title, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
          >
            <option value="all">All Categories</option>
            <option value="urgent">Urgent</option>
            <option value="exam">Examination</option>
            <option value="general">General</option>
            <option value="holiday">Holiday</option>
            <option value="sports">Sports</option>
          </select>
        </div>
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotices.map((notice) => {
          const categoryColors: Record<NoticeCategory, string> = {
            urgent: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400 border-red-200',
            exam: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200',
            holiday: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200',
            general: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200',
            sports: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200',
          };

          return (
            <div
              key={notice.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${categoryColors[notice.category]}`}
                    >
                      {notice.category}
                    </span>
                    {notice.is_pinned && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-600">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formatDate(notice.date)}
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                  {notice.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1 text-[11px]">
                  <span>Audience:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300 capitalize">
                    {notice.target_audience}
                  </span>
                  <span>•</span>
                  <span>{notice.posted_by_name}</span>
                </div>

                {!isStudent && (
                  <button
                    onClick={() => store.deleteNotice(notice.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-red-600 transition-colors"
                    title="Delete Notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Notice Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Broadcast Campus Announcement"
        maxWidth="md"
      >
        <form onSubmit={handlePostNotice} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notice Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Revised Winter College Timings"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Announcement Content *
            </label>
            <textarea
              required
              rows={4}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Full text of the circular, guidelines, dates, and instructions..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e: any) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              >
                <option value="general">General</option>
                <option value="urgent">Urgent Alert</option>
                <option value="exam">Examination</option>
                <option value="holiday">Holiday</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Audience</label>
              <select
                value={form.target_audience}
                onChange={(e: any) => setForm({ ...form, target_audience: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              >
                <option value="all">Entire Campus (All)</option>
                <option value="students">Students Only</option>
                <option value="teachers">Faculty Only</option>
                <option value="class">Specific Class</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="is_pinned"
              checked={form.is_pinned}
              onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="is_pinned" className="font-semibold text-slate-700 dark:text-slate-300">
              Pin to Top as Priority Alert Banner
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold"
            >
              Publish Circular
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

