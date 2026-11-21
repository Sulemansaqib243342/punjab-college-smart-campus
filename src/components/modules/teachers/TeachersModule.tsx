import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Building,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Teacher } from '../../../types';
import { Modal } from '../../common/Modal';
import { ConfirmDialog } from '../../common/ConfirmDialog';
import { formatDate } from '../../../lib/utils';

export const TeachersModule: React.FC = () => {
  const store = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState<string | null>(null);
  const [selectedTeacherProfile, setSelectedTeacherProfile] = useState<Teacher | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    qualification: '',
    specialization: '',
    phone: '',
    email: '',
    joining_date: '2021-08-15',
    assigned_classes: ['cls-11-ics-a'],
    assigned_subjects: ['sub-cs'],
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  });

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      employee_id: `PCL-TCH-${(store.teachers.length + 1).toString().padStart(2, '0')}`,
      full_name: '',
      qualification: 'M.Phil / M.Sc, Punjab University',
      specialization: '',
      phone: '+92 300 0000000',
      email: '',
      joining_date: new Date().toISOString().split('T')[0],
      assigned_classes: [store.classes[0]?.id || ''],
      assigned_subjects: [store.subjects[0]?.id || ''],
      photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    });
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      employee_id: teacher.employee_id,
      full_name: teacher.full_name,
      qualification: teacher.qualification,
      specialization: teacher.specialization,
      phone: teacher.phone,
      email: teacher.email,
      joining_date: teacher.joining_date,
      assigned_classes: teacher.assigned_classes,
      assigned_subjects: teacher.assigned_subjects,
      photo_url: teacher.photo_url,
    });
    setIsAddEditOpen(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      store.updateTeacher(editingTeacher.id, formData);
    } else {
      store.addTeacher(formData);
    }
    setIsAddEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingTeacherId) {
      store.deleteTeacher(deletingTeacherId);
      setDeletingTeacherId(null);
    }
  };

  const filteredTeachers = store.teachers.filter((t) => {
    return (
      t.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.qualification.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <span>Faculty & Teacher Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage academic appointments, subject specializations, qualifications, and class assignments
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search faculty name, ID, qualification, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs font-bold text-slate-500">
          Total Faculty: <span className="text-blue-600">{store.teachers.length}</span>
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeachers.map((teacher) => {
          const assignedClassNames = teacher.assigned_classes
            .map((cid) => store.classes.find((c) => c.id === cid)?.name)
            .filter(Boolean);

          const assignedSubNames = teacher.assigned_subjects
            .map((sid) => store.subjects.find((s) => s.id === sid)?.name)
            .filter(Boolean);

          return (
            <div
              key={teacher.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={teacher.photo_url}
                      alt={teacher.full_name}
                      className="w-14 h-14 rounded-xl object-cover ring-2 ring-red-600/30 shadow-xs"
                    />
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 block">
                        {teacher.employee_id}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                        {teacher.full_name}
                      </h4>
                      <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 mt-0.5">
                        {teacher.qualification}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Specialization / Domain
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {teacher.specialization}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Assigned Subjects & Classes
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {assignedSubNames.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-900/60"
                        >
                          {s}
                        </span>
                      ))}
                      {assignedClassNames.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 text-[10px] font-semibold border border-red-200 dark:border-red-900/60"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-1.5">
                <button
                  onClick={() => handleOpenEdit(teacher)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeletingTeacherId(teacher.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Remove Faculty Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Faculty Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={editingTeacher ? `Edit Faculty: ${editingTeacher.full_name}` : 'Register New Faculty Member'}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Employee ID *
              </label>
              <input
                type="text"
                required
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name with Title *
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="e.g. Prof. Tariq Mahmood"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Highest Qualification *
              </label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g. M.Phil Computer Science, PU"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Specialization / Field *
              </label>
              <input
                type="text"
                required
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g. Artificial Intelligence, C++"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddEditOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold"
            >
              Save Faculty Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingTeacherId)}
        onClose={() => setDeletingTeacherId(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove Faculty Member"
        message="Are you sure you want to delete this faculty member record?"
        isDestructive={true}
        confirmLabel="Remove"
      />
    </div>
  );
};

