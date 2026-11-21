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
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Check,
  Upload,
  ChevronDown,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { AdmissionApplication, AcademicGroup } from '../../../types';
import { Modal } from '../../common/Modal';
import { CollegeLogo } from '../../common/CollegeLogo';
import confetti from 'canvas-confetti';

interface AdmissionsModuleProps {
  initialTab?: 'apply' | 'queue';
  isPublicPage?: boolean;
  onGoToLogin?: () => void;
  onGoToLanding?: () => void;
}

export const AdmissionsModule: React.FC<AdmissionsModuleProps> = ({
  initialTab = 'queue',
  isPublicPage = false,
  onGoToLogin,
  onGoToLanding,
}) => {
  const store = useStore();
  const currentUser = store.currentUser;
  const role = currentUser?.role || 'admin';

  const [activeTab, setActiveTab] = useState<'apply' | 'queue'>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [groupFilter, setGroupFilter] = useState<string>('all');

  // Wizard Step State (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected application for detail modal
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Online Form Fields (Structured as per mockup)
  const [formData, setFormData] = useState({
    firstName: 'Ayesha',
    lastName: 'Ahmed',
    dob: '14 / 08 / 2009',
    gender: 'Female' as 'Male' | 'Female',
    cnic: '35202-1234567-8',
    phone: '0300 1234567',
    email: 'ayesha@',
    address: 'Shahdara, Lahore',
    fatherName: 'Muhammad Ahmed',
    previousMarks: 980,
    totalMarks: 1100,
    previousBoard: 'BISE Lahore',
    groupName: 'ICS' as AcademicGroup,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  });

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const percentage = Math.round((formData.previousMarks / formData.totalMarks) * 1000) / 10;

  const handleContinueToAcademics = () => {
    if (!formData.firstName || !formData.lastName || !formData.cnic) {
      alert('Please fill in all required personal information fields.');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    store.submitAdmission({
      applicant_name: fullName,
      father_name: formData.fatherName || 'Muhammad Ahmed',
      cnic_bform: formData.cnic,
      dob: formData.dob || '2009-08-14',
      gender: formData.gender,
      contact: formData.phone,
      email: isEmailValid ? formData.email : `${formData.firstName.toLowerCase()}@student.pgc.edu`,
      address: formData.address,
      previous_marks: Number(formData.previousMarks),
      total_marks: Number(formData.totalMarks),
      percentage,
      previous_board: formData.previousBoard,
      group_name: formData.groupName,
      photo_url: formData.photoUrl,
    });

    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    setSuccessToast(`Application for ${fullName} submitted successfully! Status: Under Merit Review.`);
    setTimeout(() => setSuccessToast(null), 6000);

    setCurrentStep(1);
    if (!isPublicPage) {
      setActiveTab('queue');
    }
  };

  const handleApprove = (appId: string) => {
    try {
      const { rollNumber, student } = store.approveAdmission(appId);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setSuccessToast(`Application approved for ${student.full_name}! Roll No: ${rollNumber}`);
      setTimeout(() => setSuccessToast(null), 5000);
      setSelectedApp(null);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleReject = (appId: string) => {
    store.rejectAdmission(appId, 'Seat quota full or marks below merit cutoff.');
    setSuccessToast('Application status updated to rejected.');
    setTimeout(() => setSuccessToast(null), 4000);
    setSelectedApp(null);
  };

  // Filter queue
  const filteredApps = store.admissions.filter((app) => {
    const matchesSearch =
      app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.cnic_bform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.father_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || app.group_name === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const stepLabels = [
    { num: 1, label: 'Personal info' },
    { num: 2, label: 'Academic info' },
    { num: 3, label: 'Group selection' },
    { num: 4, label: 'Photo upload' },
    { num: 5, label: 'Review & submit' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 font-sans">
      {/* Optional Public Page Top Header */}
      {isPublicPage && (
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div onClick={onGoToLanding} className="cursor-pointer">
            <CollegeLogo size="sm" showCampus={true} />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">Already a student?</span>
            <button
              onClick={onGoToLogin}
              className="text-[#232766] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Log in</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Internal Management Header (When logged in as Admin) */}
      {!isPublicPage && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1b224b] tracking-tight">
              Admissions Management
            </h2>
            <p className="text-xs text-slate-500">
              Online applications queue, merit evaluation, and roll number assignment
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'queue'
                  ? 'bg-white text-[#1b224b] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Review Applications ({store.admissions.filter((a) => a.status === 'pending').length} Pending)
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'apply'
                  ? 'bg-white text-[#1b224b] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              + New Admission Form
            </button>
          </div>
        </div>
      )}

      {/* Success Notification Banner */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 1: ONLINE ADMISSION FORM (5-STEP WIZARD MATCHING MOCKUP) */}
      {/* ============================================================== */}
      {(activeTab === 'apply' || isPublicPage) && (
        <div className="space-y-6">
          {/* Page Title & Subtitle */}
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ea432a]">
              ADMISSIONS • SESSION 2026–27
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1b224b] tracking-tight">
              Your future starts here.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Apply to Punjab College, Minar-e-Pakistan Campus, Lahore. Let's get to know you.
            </p>
          </div>

          {/* 5-Step Stepper Bar (Desktop View) */}
          <div className="hidden md:flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
            {stepLabels.map((s, idx) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;
              return (
                <React.Fragment key={s.num}>
                  <div
                    onClick={() => setCurrentStep(s.num)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#1b224b] text-white shadow-xs'
                          : isPast
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                      }`}
                    >
                      {isPast ? <Check className="w-3.5 h-3.5" /> : s.num}
                    </div>
                    <span
                      className={`text-xs ${
                        isActive
                          ? 'font-extrabold text-[#1b224b]'
                          : isPast
                          ? 'font-bold text-slate-700'
                          : 'font-medium text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < stepLabels.length - 1 && (
                    <div className="flex-1 h-px bg-slate-200 mx-4" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* 5-Step Progress Bar (Mobile View) */}
          <div className="md:hidden space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1b224b]">
              <span>
                Step {currentStep} of 5 • {stepLabels[currentStep - 1]?.label}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((st) => (
                <div
                  key={st}
                  className={`h-1.5 rounded-full transition-all ${
                    st <= currentStep ? 'bg-[#1b224b]' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Two-Column Form & Guidance Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Form Card (Left Column - 8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
              {/* STEP 1: PERSONAL INFO (EXACT MOCKUP) */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                      Let's start with you.
                    </h2>
                    <p className="text-xs text-slate-500">
                      Use the details on your official documents.
                    </p>
                  </div>

                  {/* Form Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">First name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Ayesha"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Last name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Ahmed"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Date of birth *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          placeholder="14 / 08 / 2009"
                          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                        />
                        <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Gender *</label>
                      <div className="relative">
                        <select
                          value={formData.gender}
                          onChange={(e: any) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#232766] appearance-none"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* B-form / CNIC */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">B-form / CNIC *</label>
                      <input
                        type="text"
                        value={formData.cnic}
                        onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                        placeholder="35202-1234567-8"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Phone number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0300 1234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>

                    {/* Email Address with Live Validation */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Email address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ayesha@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 focus:outline-hidden ${
                          !isEmailValid && formData.email.length > 0
                            ? 'border-red-500 ring-2 ring-red-100'
                            : 'border-slate-300 focus:ring-2 focus:ring-[#232766]'
                        }`}
                      />
                      {!isEmailValid && formData.email.length > 0 && (
                        <p className="text-[11px] text-red-500 font-medium">Enter a valid email address.</p>
                      )}
                    </div>

                    {/* Home Address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Home address *</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Shahdara, Lahore"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>
                  </div>

                  {/* Form Footer Actions */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (isPublicPage && onGoToLanding) onGoToLanding();
                        else setActiveTab('queue');
                      }}
                      className="order-2 sm:order-1 px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center cursor-pointer"
                    >
                      Save & exit
                    </button>

                    <span className="order-3 sm:order-2 text-center text-xs text-slate-400 font-medium">
                      Draft • Not submitted
                    </span>

                    <button
                      type="button"
                      onClick={handleContinueToAcademics}
                      className="order-1 sm:order-3 px-6 py-2.5 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center cursor-pointer"
                    >
                      Continue to academics
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: ACADEMIC INFO */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                      Academic Background
                    </h2>
                    <p className="text-xs text-slate-500">
                      Enter your matriculation / O-Level result credentials.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Matric Marks Obtained *</label>
                      <input
                        type="number"
                        min={330}
                        max={1100}
                        value={formData.previousMarks}
                        onChange={(e) => setFormData({ ...formData, previousMarks: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 font-mono font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Total Marks</label>
                      <input
                        type="number"
                        disabled
                        value={formData.totalMarks}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs sm:text-sm text-slate-500 font-mono cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Calculated Percentage</label>
                      <div className="px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold font-mono">
                        {percentage}% (Eligible for Merit Scholarship)
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Examination Board *</label>
                      <select
                        value={formData.previousBoard}
                        onChange={(e) => setFormData({ ...formData, previousBoard: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-medium"
                      >
                        <option value="BISE Lahore">BISE Lahore</option>
                        <option value="BISE Gujranwala">BISE Gujranwala</option>
                        <option value="BISE Faisalabad">BISE Faisalabad</option>
                        <option value="BISE Rawalpindi">BISE Rawalpindi</option>
                        <option value="Federal Board (FBISE)">Federal Board (FBISE)</option>
                        <option value="Cambridge O-Level">Cambridge O-Level</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      ← Back to personal info
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                    >
                      Continue to group selection
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: GROUP SELECTION */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                      Choose Academic Discipline
                    </h2>
                    <p className="text-xs text-slate-500">
                      Select your desired intermediate program for session 2026-27.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      {
                        name: 'ICS',
                        title: 'ICS (Computer Science)',
                        desc: 'Math, Physics / Stats, Computer Science',
                      },
                      {
                        name: 'Pre-Medical',
                        title: 'F.Sc Pre-Medical',
                        desc: 'Biology, Chemistry, Physics',
                      },
                      {
                        name: 'Pre-Engineering',
                        title: 'F.Sc Pre-Engineering',
                        desc: 'Mathematics, Physics, Chemistry',
                      },
                      {
                        name: 'Commerce',
                        title: 'I.Com (Commerce)',
                        desc: 'Accounting, Economics, Business Math',
                      },
                      {
                        name: 'Arts',
                        title: 'F.A (General Science / Humanities)',
                        desc: 'Elective Humanities & Social Sciences',
                      },
                    ].map((g) => (
                      <div
                        key={g.name}
                        onClick={() => setFormData({ ...formData, groupName: g.name as AcademicGroup })}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.groupName === g.name
                            ? 'border-[#232766] bg-blue-50/50 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">{g.title}</h4>
                          {formData.groupName === g.name && (
                            <span className="w-5 h-5 rounded-full bg-[#232766] text-white flex items-center justify-center text-xs">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{g.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      ← Back to academic info
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                    >
                      Continue to photo upload
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: PHOTO UPLOAD */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                      Applicant Photograph
                    </h2>
                    <p className="text-xs text-slate-500">
                      Recent passport-size photo with blue or white background for college roll slip.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <img
                      src={formData.photoUrl}
                      alt="Student"
                      className="w-28 h-28 rounded-2xl object-cover ring-4 ring-[#232766]/20 shadow-md"
                    />
                    <div className="space-y-2 text-center sm:text-left">
                      <span className="text-xs font-bold text-slate-800 block">Photo Preview Verified</span>
                      <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm">
                        Passport-size photo meeting BISE Lahore criteria (JPG or PNG, max 2MB).
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
                          })
                        }
                        className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Change Photo Sample
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      ← Back to group selection
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      className="px-6 py-2.5 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                    >
                      Review & Submit
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & SUBMIT */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                      Review Application Particulars
                    </h2>
                    <p className="text-xs text-slate-500">
                      Confirm your details before official submission to the Punjab College admission registry.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-500">Applicant Name</span>
                      <span className="font-extrabold text-slate-900">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-500">B-Form / CNIC</span>
                      <span className="font-mono font-bold text-slate-900">{formData.cnic}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-500">Program Applied</span>
                      <span className="font-bold text-[#ea432a]">{formData.groupName}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-500">Matric Marks & Board</span>
                      <span className="font-mono font-bold text-slate-900">{formData.previousMarks} / {formData.totalMarks} ({percentage}%) • {formData.previousBoard}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-500">Contact / Address</span>
                      <span className="text-slate-800">{formData.phone} • {formData.address}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      ← Back to photo
                    </button>
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="px-7 py-3 rounded-xl bg-[#ea432a] hover:bg-[#d6341d] text-white text-xs sm:text-sm font-extrabold shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                      Submit Official Application
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Guidance Sidebar Cards (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Card 1: A confident first step */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1b224b] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-[#1b224b]" />
                  </div>
                  <h3 className="font-extrabold text-sm text-[#1b224b]">A confident first step.</h3>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs text-slate-500 font-medium">Before you begin, keep these ready:</p>
                  <ul className="space-y-2 pt-1 text-xs text-slate-700 font-semibold">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>Matric result card</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>B-form or CNIC</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>Recent passport-size photo</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                  About 8–10 minutes to complete
                </div>
              </div>

              {/* Card 2: Need a little guidance? */}
              <div className="p-5 rounded-2xl bg-[#f0f4fd] border border-blue-100/90 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1b224b] flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">Need a little guidance?</h4>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  <p>Visit our admissions office.</p>
                  <p className="font-medium text-slate-700">Mon–Sat • 8:00am–4:00pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Confidentiality Footer */}
          <div className="text-center text-[11px] text-slate-400 pt-4">
            Your information is secure and confidential. • © 2026 Punjab College
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: ADMIN QUEUE REVIEW (When Admin visits queue tab)        */}
      {/* ============================================================== */}
      {!isPublicPage && activeTab === 'queue' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search applicant name, CNIC, father..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#232766]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
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
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Applicant Particulars</th>
                  <th className="py-3 px-4">Group Applied</th>
                  <th className="py-3 px-4">Matric Marks</th>
                  <th className="py-3 px-4">%age</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400">
                      No applications match current filters.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {app.applicant_name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          S/O {app.father_name} • B-Form: {app.cnic_bform}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#232766]">{app.group_name}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {app.previous_marks} / {app.total_marks}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-600 font-mono">
                        {app.percentage}%
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            app.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] cursor-pointer"
                        >
                          View Form
                        </button>
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(app.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-[11px] cursor-pointer"
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

      {/* Application Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={Boolean(selectedApp)}
          onClose={() => setSelectedApp(null)}
          title={`Application Details - ${selectedApp.applicant_name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={selectedApp.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={selectedApp.applicant_name}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#232766]"
              />
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{selectedApp.applicant_name}</h3>
                <p className="text-slate-500">Father: {selectedApp.father_name} • B-Form: {selectedApp.cnic_bform}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-[#ea432a]">{selectedApp.group_name}</span>
                  <span>•</span>
                  <span className="font-mono">{selectedApp.previous_marks} / {selectedApp.total_marks} ({selectedApp.percentage}%)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 text-slate-700">
              <div><span className="font-bold">Contact:</span> {selectedApp.contact}</div>
              <div><span className="font-bold">Email:</span> {selectedApp.email}</div>
              <div><span className="font-bold">Address:</span> {selectedApp.address}</div>
              <div><span className="font-bold">Board:</span> {selectedApp.previous_board}</div>
            </div>

            {selectedApp.status === 'pending' && (
              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  onClick={() => handleReject(selectedApp.id)}
                  className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => handleApprove(selectedApp.id)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Approve & Issue Roll Number
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
