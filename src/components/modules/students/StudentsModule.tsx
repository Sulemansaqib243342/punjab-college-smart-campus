import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { Student, AcademicGroup } from '../../../types';
import { Modal } from '../../common/Modal';
import { ConfirmDialog } from '../../common/ConfirmDialog';
import { StudentPerformanceModal } from '../../common/StudentPerformanceModal';
import { PrintableResultCard } from '../../common/PrintableResultCard';
import { formatDate } from '../../../lib/utils';

export const StudentsModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudentRole = currentUser?.role === 'student';

  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');

  // Modals state
  const [performanceStudent, setPerformanceStudent] = useState<Student | null>(null);
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student | null>(null);
  const [profileStudent, setProfileStudent] = useState<Student | null>(null);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    roll_number: '',
    full_name: '',
    father_name: '',
    cnic_bform: '',
    dob: '2008-04-12',
    gender: 'Male' as 'Male' | 'Female',
    blood_group: 'B+',
    phone: '',
    email: '',
    address: '',
    class_id: store.classes[0]?.id || '',
    group_name: 'ICS' as AcademicGroup,
    photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    admission_date: new Date().toISOString().split('T')[0],
    status: 'active' as 'active' | 'struck_off' | 'graduated',
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      roll_number: `PCL-24-${(150 + store.students.length).toString()}`,
      full_name: '',
      father_name: '',
      cnic_bform: '35201-1234567-1',
      dob: '2008-04-12',
      gender: 'Male',
      blood_group: 'B+',
      phone: '+92 300 1234567',
      email: '',
      address: 'Lahore, Pakistan',
      class_id: store.classes[0]?.id || '',
      group_name: 'ICS',
      photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      admission_date: new Date().toISOString().split('T')[0],
      status: 'active',
    });
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      roll_number: student.roll_number,
      full_name: student.full_name,
      father_name: student.father_name,
      cnic_bform: student.cnic_bform,
      dob: student.dob,
      gender: student.gender,
      blood_group: student.blood_group || 'B+',
      phone: student.phone,
      email: student.email,
      address: student.address,
      class_id: student.class_id,
      group_name: student.group_name,
      photo_url: student.photo_url,
      admission_date: student.admission_date,
      status: student.status,
    });
    setIsAddEditOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      store.updateStudent(editingStudent.id, formData);
    } else {
      store.addStudent(formData);
    }
    setIsAddEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingStudentId) {
      store.deleteStudent(deletingStudentId);
      setDeletingStudentId(null);
    }
  };

  // Filtered Students
  const filteredStudents = store.students.filter((s) => {
    const matchesSearch =
      s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.father_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || s.class_id === classFilter;
    const matchesGroup = groupFilter === 'all' || s.group_name === groupFilter;
    return matchesSearch && matchesClass && matchesGroup;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            <span>Students Directory & Profile Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse, search, edit, and access smart AI academic reports for {store.students.length} enrolled students
          </p>
        </div>

        {!isStudentRole && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search roll #, student name, father name..."
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
            <option value="all">All Classes ({store.classes.length})</option>
            {store.classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>

          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
          >
            <option value="all">All Groups</option>
            <option value="ICS">ICS</option>
            <option value="Pre-Medical">Pre-Medical</option>
            <option value="Pre-Engineering">Pre-Engineering</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Student Particulars</th>
                <th className="py-3 px-4">Class & Group</th>
                <th className="py-3 px-4">B-Form / CNIC</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Academic Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No students found matching your search.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((std) => {
                  const classRoom = store.classes.find((c) => c.id === std.class_id);
                  return (
                    <tr key={std.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-blue-900 dark:text-blue-400">
                        {std.roll_number}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={std.photo_url}
                            alt={std.full_name}
                            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{std.full_name}</div>
                            <div className="text-[11px] text-slate-500">S/O {std.father_name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {classRoom?.name || 'Class'}
                        </div>
                        <div className="text-[11px] text-slate-500">{std.group_name}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">
                        {std.cnic_bform}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {std.phone}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {std.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                        {/* AI Performance Report Button */}
                        <button
                          onClick={() => setPerformanceStudent(std)}
                          className="px-2 py-1 rounded-lg bg-linear-to-r from-red-600 to-blue-900 text-white font-bold text-[10px] shadow-xs hover:opacity-90 transition-all inline-flex items-center gap-1"
                          title="Open Smart AI Performance Report"
                        >
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>AI Report</span>
                        </button>

                        {/* Official Result Card button */}
                        <button
                          onClick={() => setSelectedStudentForCard(std)}
                          className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40 transition-colors"
                          title="Print Examination Result Card"
                        >
                          <Award className="w-4 h-4" />
                        </button>

                        {/* View Profile */}
                        <button
                          onClick={() => setProfileStudent(std)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="View Profile Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {!isStudentRole && (
                          <>
                            {/* Edit */}
                            <button
                              onClick={() => handleOpenEdit(std)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Edit Student"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => setDeletingStudentId(std.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Delete Student"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={editingStudent ? `Edit Student: ${editingStudent.full_name}` : 'Add New Student Record'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Roll Number *</label>
              <input
                type="text"
                required
                value={formData.roll_number}
                onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Student Full Name *</label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Father's Name *</label>
              <input
                type="text"
                required
                value={formData.father_name}
                onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">B-Form / CNIC *</label>
              <input
                type="text"
                required
                value={formData.cnic_bform}
                onChange={(e) => setFormData({ ...formData, cnic_bform: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Class Section *</label>
              <select
                value={formData.class_id}
                onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
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
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Academic Group *</label>
              <select
                value={formData.group_name}
                onChange={(e: any) => setFormData({ ...formData, group_name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              >
                <option value="ICS">ICS</option>
                <option value="Pre-Medical">Pre-Medical</option>
                <option value="Pre-Engineering">Pre-Engineering</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
              <select
                value={formData.blood_group}
                onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
              Save Student Record
            </button>
          </div>
        </form>
      </Modal>

      {/* Profile Detail Modal */}
      {profileStudent && (
        <Modal
          isOpen={Boolean(profileStudent)}
          onClose={() => setProfileStudent(null)}
          title={`Student Profile: ${profileStudent.full_name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <img
                src={profileStudent.photo_url}
                alt={profileStudent.full_name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-950"
              />
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                  {profileStudent.roll_number}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {profileStudent.full_name}
                </h4>
                <p className="text-slate-500">Father: {profileStudent.father_name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-950 text-white rounded text-[10px] font-bold">
                    {store.classes.find((c) => c.id === profileStudent.class_id)?.name}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-blue-600 font-semibold">{profileStudent.group_name}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <div>
                <span className="text-slate-500 block text-[11px]">B-Form / CNIC</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{profileStudent.cnic_bform}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Admission No</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{profileStudent.admission_no}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Date of Birth</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{formatDate(profileStudent.dob)}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Blood Group</span>
                <span className="font-bold text-red-600">{profileStudent.blood_group || 'O+'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Phone Contact</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{profileStudent.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Email</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{profileStudent.email}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[11px]">Residential Address</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{profileStudent.address}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setPerformanceStudent(profileStudent);
                  setProfileStudent(null);
                }}
                className="px-4 py-2 rounded-xl bg-linear-to-r from-red-600 to-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Open AI Performance Report</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Performance Modal */}
      {performanceStudent && (
        <StudentPerformanceModal
          student={performanceStudent}
          onClose={() => setPerformanceStudent(null)}
        />
      )}

      {/* Result Card Modal */}
      {selectedStudentForCard && (
        <PrintableResultCard
          result={
            store.getResultsSummaryForClass('exam-midterm-dec', selectedStudentForCard.class_id).find(
              (r) => r.student.id === selectedStudentForCard.id
            ) || {
              student: selectedStudentForCard,
              exam: store.exams[1] || store.exams[0],
              class_room: store.classes.find((c) => c.id === selectedStudentForCard.class_id) || store.classes[0],
              marks: [],
              total_obtained: 490,
              total_maximum: 600,
              overall_percentage: 82,
              overall_grade: 'A+',
              status: 'Pass',
              rank: 1,
              total_students_in_class: 22,
            }
          }
          onClose={() => setSelectedStudentForCard(null)}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingStudentId)}
        onClose={() => setDeletingStudentId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student Record"
        message="Are you sure you want to permanently delete this student record? This action will also purge associated attendance logs, examination marks, and fee vouchers."
        isDestructive={true}
        confirmLabel="Delete Student"
      />
    </div>
  );
};

