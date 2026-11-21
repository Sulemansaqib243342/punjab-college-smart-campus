import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  X,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
  Building,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Modal } from '../../common/Modal';

interface StudentRecord {
  id: string;
  full_name: string;
  campus: string;
  roll_number: string;
  class_name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  father_name?: string;
  dob?: string;
  gender?: string;
}

const DEFAULT_MOCK_STUDENTS: StudentRecord[] = [
  {
    id: 'std-1',
    full_name: 'Ahmed Raza',
    campus: 'Punjab College · Lahore',
    roll_number: 'ICS1-026',
    class_name: 'ICS Part 1 · A',
    email: 'ahmed.raza@example.com',
    phone: '0300 123 4526',
    status: 'Active',
    father_name: 'Raza Ullah',
    dob: '2008-04-12',
    gender: 'Male',
  },
  {
    id: 'std-2',
    full_name: 'Ayesha Khan',
    campus: 'Punjab College · Lahore',
    roll_number: 'ICS1-027',
    class_name: 'ICS Part 1 · A',
    email: 'ayesha.khan@example.com',
    phone: '0301 123 4527',
    status: 'Active',
    father_name: 'Tariq Khan',
    dob: '2008-06-21',
    gender: 'Female',
  },
  {
    id: 'std-3',
    full_name: 'Hamza Ali',
    campus: 'Punjab College · Lahore',
    roll_number: 'ICS1-028',
    class_name: 'ICS Part 1 · A',
    email: 'hamza.ali@example.com',
    phone: '0302 123 4528',
    status: 'Active',
    father_name: 'Liaquat Ali',
    dob: '2008-01-15',
    gender: 'Male',
  },
  {
    id: 'std-4',
    full_name: 'Fatima Noor',
    campus: 'Punjab College · Lahore',
    roll_number: 'ICS1-029',
    class_name: 'ICS Part 1 · A',
    email: 'fatima.noor@example.com',
    phone: '0303 123 4529',
    status: 'Active',
    father_name: 'Noor Muhammad',
    dob: '2008-09-08',
    gender: 'Female',
  },
  {
    id: 'std-5',
    full_name: 'Zain Hassan',
    campus: 'Punjab College · Lahore',
    roll_number: 'ICS2-014',
    class_name: 'ICS Part 2 · A',
    email: 'zain.hassan@example.com',
    phone: '0304 123 4514',
    status: 'Active',
    father_name: 'Hassan Mir',
    dob: '2007-11-23',
    gender: 'Male',
  },
  {
    id: 'std-6',
    full_name: 'Mahnoor Aslam',
    campus: 'Punjab College · Lahore',
    roll_number: 'ICS2-015',
    class_name: 'ICS Part 2 · B',
    email: 'mahnoor.a@example.com',
    phone: '0305 123 4515',
    status: 'Active',
    father_name: 'Muhammad Aslam',
    dob: '2007-08-19',
    gender: 'Female',
  },
];

export const StudentsModule: React.FC = () => {
  const store = useStore();
  const [students, setStudents] = useState<StudentRecord[]>(DEFAULT_MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All classes');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState<StudentRecord | null>(null);
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRoll, setFormRoll] = useState('');
  const [formClass, setFormClass] = useState('ICS Part 1 · A');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formFather, setFormFather] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All classes' || s.class_name === selectedClass;
    const matchesStatus = selectedStatus === 'All statuses' || s.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredStudents.map((s) => s.id));
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
    setEditingStudent(null);
    setFormName('');
    setFormRoll(`ICS1-0${30 + students.length}`);
    setFormClass('ICS Part 1 · A');
    setFormEmail('');
    setFormPhone('0300 123 4567');
    setFormFather('');
    setFormStatus('Active');
    setAddEditModalOpen(true);
  };

  const handleOpenEdit = (student: StudentRecord) => {
    setEditingStudent(student);
    setFormName(student.full_name);
    setFormRoll(student.roll_number);
    setFormClass(student.class_name);
    setFormEmail(student.email);
    setFormPhone(student.phone);
    setFormFather(student.father_name || '');
    setFormStatus(student.status);
    setAddEditModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? {
                ...s,
                full_name: formName,
                roll_number: formRoll,
                class_name: formClass,
                email: formEmail,
                phone: formPhone,
                father_name: formFather,
                status: formStatus,
              }
            : s
        )
      );
    } else {
      const newStd: StudentRecord = {
        id: `std-${Date.now()}`,
        full_name: formName,
        campus: 'Punjab College · Lahore',
        roll_number: formRoll,
        class_name: formClass,
        email: formEmail,
        phone: formPhone,
        father_name: formFather,
        status: formStatus,
      };
      setStudents((prev) => [newStd, ...prev]);
    }
    setAddEditModalOpen(false);
  };

  const handleViewProfile = (student: StudentRecord) => {
    setActiveProfile(student);
    setProfileModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Block */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
          STUDENTS MANAGEMENT
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101c4e] dark:text-white tracking-tight">
          Students
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          One place for every student, every detail and every next step.
        </p>
      </div>

      {/* 2. Top 4 KPI Metric Cards (Exact Mockup) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total students (Solid Deep Navy Card) */}
        <div className="bg-[#101c4e] text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-blue-200 block">
            Total students
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white mt-1">
            2,450
          </div>
          <span className="text-xs text-blue-200/90 mt-2 font-medium block">
            Enrolled this session
          </span>
        </div>

        {/* Card 2: Active students */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Active students
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            2,412
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            98.4% of all students
          </span>
        </div>

        {/* Card 3: ICS students */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            ICS students
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            684
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            Part 1 & Part 2
          </span>
        </div>

        {/* Card 4: New admissions */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            New admissions
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            128
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium block">
            This month
          </span>
        </div>
      </div>

      {/* 3. "All students" Table Section */}
      <div className="space-y-4">
        {/* Title & "Add student" Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
            All students
          </h3>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-[#101c4e] hover:bg-[#0c163d] text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer self-start sm:self-auto"
          >
            Add student
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            {/* Search Input */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Search name or roll number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e]"
              />
            </div>

            {/* Class Dropdown */}
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e] cursor-pointer"
              >
                <option value="All classes">All classes</option>
                <option value="ICS Part 1 · A">ICS Part 1 · A</option>
                <option value="ICS Part 1 · B">ICS Part 1 · B</option>
                <option value="ICS Part 2 · A">ICS Part 2 · A</option>
                <option value="ICS Part 2 · B">ICS Part 2 · B</option>
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
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Records count note */}
          <span className="text-xs text-slate-400 shrink-0">
            {filteredStudents.length} records shown
          </span>
        </div>

        {/* Students Table Card */}
        <div className="bg-white dark:bg-[#11182c] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs">
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={
                        filteredStudents.length > 0 &&
                        selectedIds.length === filteredStudents.length
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded-sm border-slate-300 text-[#101c4e] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Student
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Roll number
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    Class
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
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      No student records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((std) => {
                    const isSelected = selectedIds.includes(std.id);
                    return (
                      <tr
                        key={std.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(std.id)}
                            className="rounded-sm border-slate-300 text-[#101c4e] focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {std.full_name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {std.campus}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium text-xs text-slate-700 dark:text-slate-300">
                          {std.roll_number}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                          {std.class_name}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-600 dark:text-slate-300">
                            {std.email}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {std.phone}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                            {std.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleViewProfile(std)}
                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline mr-3 cursor-pointer"
                          >
                            View profile
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(std)}
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
              Showing 1-6 of 2,450 students
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

      {/* View Profile Modal */}
      <Modal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Student Profile Details"
        maxWidth="md"
      >
        {activeProfile && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f4f7fe] dark:bg-slate-800/50">
              <div className="w-14 h-14 rounded-2xl bg-[#101c4e] text-white flex items-center justify-center font-bold text-lg">
                {activeProfile.full_name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white">
                  {activeProfile.full_name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {activeProfile.class_name} · Roll No: {activeProfile.roll_number}
                </p>
                <div className="text-[11px] font-bold text-[#101c4e] dark:text-blue-400 mt-1">
                  Punjab College · Minar-e-Pakistan Campus
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Father's Name:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {activeProfile.father_name || 'Raza Ullah'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Official College Email:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {activeProfile.email}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {activeProfile.phone}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Enrollment Status:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {activeProfile.status}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Campus Location:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Minar-e-Pakistan Campus, Lahore
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#101c4e] text-white text-xs font-bold cursor-pointer hover:bg-[#0c163d]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={addEditModalOpen}
        onClose={() => setAddEditModalOpen(false)}
        title={editingStudent ? 'Edit Student Details' : 'Add New Student'}
        maxWidth="md"
      >
        <form onSubmit={handleSaveStudent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Student full name"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                required
                value={formRoll}
                onChange={(e) => setFormRoll(e.target.value)}
                placeholder="ICS1-026"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono focus:ring-2 focus:ring-[#101c4e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Class
              </label>
              <select
                value={formClass}
                onChange={(e) => setFormClass(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
              >
                <option value="ICS Part 1 · A">ICS Part 1 · A</option>
                <option value="ICS Part 1 · B">ICS Part 1 · B</option>
                <option value="ICS Part 2 · A">ICS Part 2 · A</option>
                <option value="ICS Part 2 · B">ICS Part 2 · B</option>
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
                placeholder="student@example.com"
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
                placeholder="0300 123 4567"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Father's Name
            </label>
            <input
              type="text"
              value={formFather}
              onChange={(e) => setFormFather(e.target.value)}
              placeholder="Father's full name"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value as 'Active' | 'Inactive')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#101c4e]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              {editingStudent ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
