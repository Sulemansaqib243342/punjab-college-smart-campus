import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  FileCheck,
  Award,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { AdmissionApplication, AcademicGroup } from '../../../types';
import { Modal } from '../../common/Modal';
import confetti from 'canvas-confetti';

interface AdmissionsModuleProps {
  initialTab?: 'apply' | 'queue';
}

export const AdmissionsModule: React.FC<AdmissionsModuleProps> = ({ initialTab = 'queue' }) => {
  const store = useStore();
  const [activeTab, setActiveTab] = useState<'apply' | 'queue'>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [groupFilter, setGroupFilter] = useState<string>('all');

  // Selected application for detail modal
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Online form fields
  const [formData, setFormData] = useState({
    applicant_name: '',
    father_name: '',
    cnic_bform: '',
    dob: '2008-05-15',
    gender: 'Male' as 'Male' | 'Female',
    contact: '',
    email: '',
    address: '',
    previous_marks: 950,
    total_marks: 1100,
    previous_board: 'BISE Lahore',
    group_name: 'ICS' as AcademicGroup,
    photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
  });

  const percentage = Math.round((formData.previous_marks / formData.total_marks) * 1000) / 10;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.submitAdmission({
      applicant_name: formData.applicant_name,
      father_name: formData.father_name,
      cnic_bform: formData.cnic_bform,
      dob: formData.dob,
      gender: formData.gender,
      contact: formData.contact,
      email: formData.email,
      address: formData.address,
      previous_marks: Number(formData.previous_marks),
      total_marks: Number(formData.total_marks),
      percentage,
      previous_board: formData.previous_board,
      group_name: formData.group_name,
      photo_url: formData.photo_url,
    });

    confetti({ particleCount: 50, spread: 60 });
    setSuccessToast(`Application for ${formData.applicant_name} submitted successfully! Your tracking application is in review.`);
    setTimeout(() => setSuccessToast(null), 5000);

    // Reset form
    setFormData({
      applicant_name: '',
      father_name: '',
      cnic_bform: '',
      dob: '2008-05-15',
      gender: 'Male',
      contact: '',
      email: '',
      address: '',
      previous_marks: 950,
      total_marks: 1100,
      previous_board: 'BISE Lahore',
      group_name: 'ICS',
      photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    });

    setActiveTab('queue');
  };

  const handleApprove = (appId: string) => {
    try {
      const { student, rollNumber } = store.approveAdmission(appId);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setSuccessToast(`Approved! Enrolled ${student.full_name} in ${student.group_name} with Roll No: ${rollNumber}`);
      setTimeout(() => setSuccessToast(null), 5000);
      setSelectedApp(null);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleReject = (appId: string) => {
    store.rejectAdmission(appId, 'Does not meet minimum merit threshold for selected academic group.');
    setSuccessToast('Application marked as rejected.');
    setTimeout(() => setSuccessToast(null), 3000);
    setSelectedApp(null);
  };

  // Filtered applications
  const filteredApps = store.admissions.filter((app) => {
    const matchesSearch =
      app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.cnic_bform.includes(searchTerm) ||
      app.father_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || app.group_name === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-red-600" />
            <span>Student Admission & Registration Portal</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Online intermediate admission registration, merit verification, and auto-roll number generation
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'queue'
                ? 'bg-white dark:bg-slate-900 text-blue-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Review Applications ({store.admissions.filter((a) => a.status === 'pending').length} Pending)
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'apply'
                ? 'bg-white dark:bg-slate-900 text-blue-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            + New Admission Form
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Tab 1: Applications Queue */}
      {activeTab === 'queue' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search applicant name, CNIC, father..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
              >
                <option value="all">All Groups</option>
                <option value="Pre-Medical">Pre-Medical</option>
                <option value="Pre-Engineering">Pre-Engineering</option>
                <option value="ICS">ICS</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Applicant Particulars</th>
                  <th className="py-3 px-4">Group Applied</th>
                  <th className="py-3 px-4">Matric Marks</th>
                  <th className="py-3 px-4">%age</th>
                  <th className="py-3 px-4">Previous Board</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400">
                      No admission applications match your current filters.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {app.applicant_name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          S/O {app.father_name} • B-Form: {app.cnic_bform}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-blue-900 dark:text-blue-400">
                          {app.group_name}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {app.previous_marks} / {app.total_marks}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold ${
                            app.percentage >= 80
                              ? 'text-emerald-600'
                              : app.percentage >= 60
                              ? 'text-blue-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {app.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {app.previous_board}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            app.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : app.status === 'rejected'
                              ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {app.status}
                          {app.roll_number_assigned ? ` (${app.roll_number_assigned})` : ''}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(app.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-red-100 hover:text-red-700 text-slate-700 dark:text-slate-300 font-medium text-[11px] transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: New Online Admission Form */}
      {activeTab === 'apply' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Punjab College Online Intermediate Admission Form
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Please enter accurate matriculation credentials as per BISE result card. All approved students will be assigned a permanent college roll number.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Section 1: Candidate particulars */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-3">
                1. Personal Particulars
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Applicant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicant_name}
                    onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                    placeholder="e.g. Usman Ali"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.father_name}
                    onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                    placeholder="e.g. Tariq Mahmood"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    B-Form / CNIC Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cnic_bform}
                    onChange={(e) => setFormData({ ...formData, cnic_bform: e.target.value })}
                    placeholder="35201-XXXXXXX-X"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e: any) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Residential Address (Lahore / Outstation) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House #, Street, Area, City"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Academic Prior Records & Group Selection */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-3">
                2. Academic Background & Discipline
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Matric Marks Obtained *
                  </label>
                  <input
                    type="number"
                    required
                    min={330}
                    max={1100}
                    value={formData.previous_marks}
                    onChange={(e) => setFormData({ ...formData, previous_marks: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Matric Marks
                  </label>
                  <input
                    type="number"
                    disabled
                    value={formData.total_marks}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Calculated Percentage
                  </label>
                  <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-emerald-600 font-mono">
                    {percentage}%
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Previous Examination Board
                  </label>
                  <select
                    value={formData.previous_board}
                    onChange={(e) => setFormData({ ...formData, previous_board: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                  >
                    <option value="BISE Lahore">BISE Lahore</option>
                    <option value="BISE Gujranwala">BISE Gujranwala</option>
                    <option value="BISE Faisalabad">BISE Faisalabad</option>
                    <option value="BISE Rawalpindi">BISE Rawalpindi</option>
                    <option value="Federal Board (FBISE)">Federal Board (FBISE)</option>
                    <option value="O-Levels / Cambridge">O-Levels / Cambridge</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Intermediate Group / Discipline *
                  </label>
                  <select
                    value={formData.group_name}
                    onChange={(e: any) => setFormData({ ...formData, group_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-blue-400 bg-blue-50/50 dark:bg-blue-950/30 text-blue-950 dark:text-blue-300 text-xs font-bold"
                  >
                    <option value="ICS">ICS (Computer Science, Mathematics, Physics)</option>
                    <option value="Pre-Medical">F.Sc Pre-Medical (Biology, Physics, Chemistry)</option>
                    <option value="Pre-Engineering">F.Sc Pre-Engineering (Maths, Physics, Chemistry)</option>
                    <option value="Commerce">I.Com (Commerce & Accounting)</option>
                    <option value="Arts">F.A (Humanities & Arts)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submission buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('queue')}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Submit Admission Application</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={Boolean(selectedApp)}
          onClose={() => setSelectedApp(null)}
          title={`Admission Dossier: ${selectedApp.applicant_name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img
                src={selectedApp.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
                alt={selectedApp.applicant_name}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-900"
              />
              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {selectedApp.applicant_name}
                </h4>
                <p className="text-slate-500">Father: {selectedApp.father_name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-blue-600">{selectedApp.group_name}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-600">{selectedApp.cnic_bform}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <div>
                <span className="text-slate-500 block text-[11px]">Matric Marks</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedApp.previous_marks} / {selectedApp.total_marks} ({selectedApp.percentage}%)
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Board of Examination</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedApp.previous_board}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Phone Contact</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedApp.contact}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Email</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {selectedApp.email}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[11px]">Home Address</span>
                <span className="text-slate-800 dark:text-slate-200">{selectedApp.address}</span>
              </div>
            </div>

            {selectedApp.remarks && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-300">
                <span className="font-bold block">Office Remarks:</span>
                <p className="mt-0.5">{selectedApp.remarks}</p>
              </div>
            )}

            {selectedApp.status === 'pending' && (
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => handleReject(selectedApp.id)}
                  className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 font-bold transition-colors"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => handleApprove(selectedApp.id)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Generate Roll Number</span>
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

