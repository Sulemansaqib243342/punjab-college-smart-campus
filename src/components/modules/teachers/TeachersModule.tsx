import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Plus,
  ChevronDown,
  Edit,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Building,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Modal } from '../../common/Modal';

interface TeacherItem {
  id: string;
  full_name: string;
  qualification: string;
  staff_id: string;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'On leave';
}

const INITIAL_TEACHERS: TeacherItem[] = [
  {
    id: 'tch-1',
    full_name: 'Sir Yousaf',
    qualification: 'MPhil Urdu',
    staff_id: 'FAC-001',
    department: 'Urdu',
    email: 'sir.yousaf@punjabcollege.edu.pk',
    phone: '0300 555 0101',
    status: 'Active',
  },
  {
    id: 'tch-2',
    full_name: 'Sir Faisal',
    qualification: 'MS Computer Science',
    staff_id: 'FAC-002',
    department: 'Computer Science',
    email: 'sir.faisal@punjabcollege.edu.pk',
    phone: '0301 555 0102',
    status: 'Active',
  },
  {
    id: 'tch-3',
    full_name: 'Sir Asad',
    qualification: 'MA English Literature',
    staff_id: 'FAC-003',
    department: 'English',
    email: 'sir.asad@punjabcollege.edu.pk',
    phone: '0302 555 0103',
    status: 'Active',
  },
  {
    id: 'tch-4',
    full_name: 'Sir Amin',
    qualification: 'MPhil Mathematics',
    staff_id: 'FAC-004',
    department: 'Mathematics',
    email: 'sir.amin@punjabcollege.edu.pk',
    phone: '0303 555 0104',
    status: 'Active',
  },
  {
    id: 'tch-5',
    full_name: 'Sir Hamza',
    qualification: 'MPhil Statistics',
    staff_id: 'FAC-005',
    department: 'Statistics',
    email: 'sir.hamza@punjabcollege.edu.pk',
    phone: '0304 555 0105',
    status: 'Active',
  },
  {
    id: 'tch-6',
    full_name: 'Miss Nomana',
    qualification: 'MA Pakistan Studies',
    staff_id: 'FAC-006',
    department: 'Pakistan Studies',
    email: 'miss.nomana@punjabcollege.edu.pk',
    phone: '0305 555 0106',
    status: 'Active',
  },
  {
    id: 'tch-7',
    full_name: 'Sir Bilal',
    qualification: 'MA Islamic Studies / TQM',
    staff_id: 'FAC-007',
    department: 'T.Q.M',
    email: 'sir.bilal@punjabcollege.edu.pk',
    phone: '0306 555 0107',
    status: 'Active',
  },
];

export const TeachersModule: React.FC = () => {
  const store = useStore();
  const [teachers, setTeachers] = useState<TeacherItem[]>(INITIAL_TEACHERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All departments');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [profileTeacher, setProfileTeacher] = useState<TeacherItem | null>(null);
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherItem | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formQual, setFormQual] = useState('MS / MPhil');
  const [formId, setFormId] = useState('');
  const [formDept, setFormDept] = useState('Computer Science');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'On leave'>('Active');

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All departments' || t.department === selectedDept;
    const matchesStatus = selectedStatus === 'All statuses' || t.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredTeachers.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormName('');
    setFormQual('MS / MPhil');
    setFormId(`FAC-00${teachers.length + 1}`);
    setFormDept('Computer Science');
    setFormEmail('');
    setFormPhone('0300 555 0106');
    setFormStatus('Active');
    setAddEditModalOpen(true);
  };

  const handleOpenEdit = (teacher: TeacherItem) => {
    setEditingTeacher(teacher);
    setFormName(teacher.full_name);
    setFormQual(teacher.qualification);
    setFormId(teacher.staff_id);
    setFormDept(teacher.department);
    setFormEmail(teacher.email);
    setFormPhone(teacher.phone);
    setFormStatus(teacher.status);
    setAddEditModalOpen(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === editingTeacher.id
            ? {
                ...t,
                full_name: formName,
                qualification: formQual,
                staff_id: formId,
                department: formDept,
                email: formEmail,
                phone: formPhone,
                status: formStatus,
              }
            : t
        )
      );
    } else {
      const newTch: TeacherItem = {
        id: `tch-${Date.now()}`,
        full_name: formName,
        qualification: formQual,
        staff_id: formId,
        department: formDept,
        email: formEmail,
        phone: formPhone,
        status: formStatus,
      };
      setTeachers((prev) => [newTch, ...prev]);
    }
    setAddEditModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Block */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
          TEACHERS MANAGEMENT
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101c4e] dark:text-white tracking-tight">
          Teachers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Support the people who make learning possible.
        </p>
      </div>

      {/* 2. Top 4 KPI Metric Cards (Exact Mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total faculty (Solid Deep Navy Card) */}
        <div className="bg-[#101c4e] text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-blue-200 block">
            Total faculty
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white mt-1">
            120
          </div>
          <span className="text-xs text-blue-200/90 mt-2 font-medium block">
            Across all departments
          </span>
        </div>

        {/* Card 2: Active faculty */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Active faculty
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            116
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            96.7% of faculty
          </span>
        </div>

        {/* Card 3: Departments */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Departments
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            8
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Academic departments
          </span>
        </div>

        {/* Card 4: On leave */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            On leave
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            4
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Today 21 Nov
          </span>
        </div>
      </div>

      {/* 3. "All teachers" Table Section */}
      <div className="space-y-4">
        {/* Title & "Add teacher" Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
            All teachers
          </h3>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-[#101c4e] hover:bg-[#0c163d] text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer self-start sm:self-auto"
          >
            Add teacher
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            {/* Search Input */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Search name or staff ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e]"
              />
            </div>

            {/* Department Dropdown */}
            <div className="relative">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] cursor-pointer"
              >
                <option value="All departments">All departments</option>
                <option value="Urdu">Urdu</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English">English</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Statistics">Statistics</option>
                <option value="Pakistan Studies">Pakistan Studies</option>
                <option value="T.Q.M">T.Q.M</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] cursor-pointer"
              >
                <option value="All statuses">All statuses</option>
                <option value="Active">Active</option>
                <option value="On leave">On leave</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Records count note */}
          <span className="text-xs text-slate-400 shrink-0">
            {filteredTeachers.length} records shown
          </span>
        </div>

        {/* Teachers Table Card */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs">
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={
                        filteredTeachers.length > 0 &&
                        selectedIds.length === filteredTeachers.length
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded-sm border-slate-300 text-[#101c4e] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Teacher
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Staff ID
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Department
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Contact
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Status
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      No teacher records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map((tch) => {
                    const isSelected = selectedIds.includes(tch.id);
                    return (
                      <tr
                        key={tch.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(tch.id)}
                            className="rounded-sm border-slate-300 text-[#101c4e] focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {tch.full_name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {tch.qualification}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium text-xs text-slate-700 dark:text-slate-300">
                          {tch.staff_id}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                          {tch.department}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-600 dark:text-slate-300">
                            {tch.email}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {tch.phone}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${
                              tch.status === 'Active'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                                : 'bg-amber-50 dark:bg-amber-950/60 border-amber-200/80 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                            }`}
                          >
                            {tch.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              setProfileTeacher(tch);
                            }}
                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline mr-3 cursor-pointer"
                          >
                            View profile
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(tch)}
                            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Row */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">
              Showing 1–5 of 120 teachers
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white"
              >
                1
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 font-semibold cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Footer Note */}
      <div className="text-xs text-slate-400 dark:text-slate-500 pt-2 pb-4 text-center sm:text-left">
        Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={!!profileTeacher}
        onClose={() => setProfileTeacher(null)}
        title="Faculty Member Profile"
        maxWidth="md"
      >
        {profileTeacher && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f4f7fe] dark:bg-slate-800/50">
              <div className="w-14 h-14 rounded-2xl bg-[#101c4e] text-white flex items-center justify-center font-bold text-lg">
                {profileTeacher.full_name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white">
                  {profileTeacher.full_name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {profileTeacher.qualification} · Department of {profileTeacher.department}
                </p>
                <div className="text-[11px] font-bold text-[#101c4e] dark:text-blue-400 mt-1">
                  Staff ID: {profileTeacher.staff_id} · Punjab College Lahore
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Official College Email:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {profileTeacher.email}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {profileTeacher.phone}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Academic Department:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {profileTeacher.department}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Faculty Status:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {profileTeacher.status}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Campus:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Minar-e-Pakistan Campus, Lahore
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setProfileTeacher(null)}
                className="px-4 py-2 rounded-xl bg-[#101c4e] text-white text-xs font-bold cursor-pointer hover:bg-[#0c163d]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add / Edit Teacher Modal */}
      <Modal
        isOpen={addEditModalOpen}
        onClose={() => setAddEditModalOpen(false)}
        title={editingTeacher ? 'Edit Teacher Details' : 'Add New Teacher'}
        maxWidth="md"
      >
        <form onSubmit={handleSaveTeacher} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Sir Yousaf"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Staff ID
              </label>
              <input
                type="text"
                required
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                placeholder="FAC-001"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono focus:ring-2 focus:ring-[#101c4e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Department
              </label>
              <select
                value={formDept}
                onChange={(e) => setFormDept(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="teacher@example.com"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone
              </label>
              <input
                type="text"
                required
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="0300 555 0101"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Qualification
              </label>
              <input
                type="text"
                value={formQual}
                onChange={(e) => setFormQual(e.target.value)}
                placeholder="MS / MPhil"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as 'Active' | 'On leave')}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
              >
                <option value="Active">Active</option>
                <option value="On leave">On leave</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setAddEditModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#101c4e] text-white text-xs font-bold hover:bg-[#0c163d] cursor-pointer"
            >
              {editingTeacher ? 'Save Changes' : 'Add Teacher'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
