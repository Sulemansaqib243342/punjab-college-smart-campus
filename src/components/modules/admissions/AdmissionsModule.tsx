import React, { useState, useRef } from 'react';
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
  FileText,
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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedAppNumber, setSubmittedAppNumber] = useState<string>('PC-2026-0142');

  // Selected application for detail modal
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Online Form Fields (Structured as per mockup)
  const [formData, setFormData] = useState({
    firstName: 'Ayesha',
    lastName: 'Ahmed',
    dob: '14 / 08 / 2009',
    gender: 'Female' as 'Male' | 'Female',
    cnic: '35202-1234567-8',
    phone: '0300 1234567',
    email: 'ayesha@example.com',
    address: 'Shahdara, Lahore',
    fatherName: 'Muhammad Ahmed',
    educationBoard: 'BISE Lahore',
    institution: 'Govt. Girls High School, Lahore',
    passingYear: '2026',
    matricRollNo: '2026-08421',
    previousMarks: 1024,
    totalMarks: 1100,
    previousBoard: 'BISE Lahore',
    groupName: 'ICS' as AcademicGroup,
    shift: 'Morning • 8:00am – 1:30pm',
    photoUrl: '/ayesha-student.jpg',
    photoFileName: 'ayesha-ahmed.jpg',
    photoFileSize: '248 KB',
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

    if (!termsAgreed) {
      alert('Please confirm that the information provided is accurate and agree to the admission terms.');
      return;
    }

    const appNumber = 'PC-2026-0142';
    setSubmittedAppNumber(appNumber);
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

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    if (isPublicPage && onGoToLanding) {
      onGoToLanding();
    } else {
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
        <>
          {isSubmitted ? (
            <div className="max-w-2xl mx-auto py-4 sm:py-6 animate-in fade-in duration-300 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-12 shadow-xs text-center space-y-7 sm:space-y-8">
                {/* Top Success Circle */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
                </div>

                {/* Heading & Subheading */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-black text-[#1b224b] tracking-tight">
                    You’re one step closer.
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm sm:max-w-md mx-auto">
                    Your application has been submitted to<br />
                    Punjab College, Minar-e-Pakistan Campus, Lahore.
                  </p>
                </div>

                {/* Application Number Box */}
                <div className="bg-[#f0f4fd] rounded-2xl p-5 sm:p-6 text-center space-y-1.5 border border-blue-100/60 max-w-md mx-auto">
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    YOUR APPLICATION NUMBER
                  </span>
                  <div className="font-mono font-black text-2xl sm:text-3xl text-[#1b224b] tracking-wider">
                    {submittedAppNumber}
                  </div>
                </div>

                {/* What happens next? */}
                <div className="space-y-4 text-left max-w-md mx-auto pt-1 sm:pt-2">
                  <h3 className="font-black text-base sm:text-lg text-[#1b224b]">
                    What happens next?
                  </h3>

                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1b224b]">
                          Application received
                        </h4>
                        <p className="text-xs text-slate-400">
                          A confirmation is on its way to your email.
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        2
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1b224b]">
                          Admissions team review
                        </h4>
                        <p className="text-xs text-slate-400">
                          Allow 2–3 working days for an update.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        3
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1b224b]">
                          Your next steps
                        </h4>
                        <p className="text-xs text-slate-400">
                          We'll contact you about your campus visit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="order-1 sm:order-1 flex-1 py-3 px-6 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center cursor-pointer"
                  >
                    Download application
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToHome}
                    className="order-2 sm:order-2 flex-1 py-3 px-6 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors text-center cursor-pointer"
                  >
                    Back to home
                  </button>
                </div>

                {/* Footer Question */}
                <p className="text-xs text-slate-400 pt-1 text-center">
                  Questions? Visit our campus admissions office.
                </p>
              </div>

              {/* Confidentiality Footer */}
              <div className="text-center text-[11px] text-slate-400 pt-2">
                <span className="sm:hidden">Your information is secure and confidential.</span>
                <span className="hidden sm:inline">Your information is secure and confidential. • © 2026 Punjab College</span>
              </div>
            </div>
          ) : (
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
              <span className="sm:hidden">A few details. A world of possibility.</span>
              <span className="hidden sm:inline">Apply to Punjab College, Minar-e-Pakistan Campus, Lahore. Let's get to know you.</span>
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
                          ? 'bg-[#1b224b] text-white'
                          : 'bg-white border border-slate-300 text-slate-400 group-hover:border-slate-400'
                      }`}
                    >
                      {isPast ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.num}
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

              {/* STEP 2: ACADEMIC INFO (EXACT MOCKUP) */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                      Your academic journey.
                    </h2>
                    <p className="text-xs text-slate-500">
                      Tell us about your matriculation results.
                    </p>
                  </div>

                  {/* Form Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Education board */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Education board *</label>
                      <div className="relative">
                        <select
                          value={formData.educationBoard}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              educationBoard: e.target.value,
                              previousBoard: e.target.value,
                            })
                          }
                          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#232766] appearance-none"
                        >
                          <option value="BISE Lahore">BISE Lahore</option>
                          <option value="BISE Gujranwala">BISE Gujranwala</option>
                          <option value="BISE Faisalabad">BISE Faisalabad</option>
                          <option value="BISE Rawalpindi">BISE Rawalpindi</option>
                          <option value="BISE Multan">BISE Multan</option>
                          <option value="Federal Board (FBISE)">Federal Board (FBISE)</option>
                          <option value="Cambridge O-Level">Cambridge O-Level</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* School / institution */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">School / institution *</label>
                      <input
                        type="text"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        placeholder="Govt. Girls High School, Lahore"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>

                    {/* Passing year */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Passing year *</label>
                      <div className="relative">
                        <select
                          value={formData.passingYear}
                          onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#232766] appearance-none"
                        >
                          <option value="2026">2026</option>
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Matric roll number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Matric roll number *</label>
                      <input
                        type="text"
                        value={formData.matricRollNo}
                        onChange={(e) => setFormData({ ...formData, matricRollNo: e.target.value })}
                        placeholder="2026-08421"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>

                    {/* Marks obtained */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Marks obtained *</label>
                      <input
                        type="number"
                        min={330}
                        max={formData.totalMarks}
                        value={formData.previousMarks}
                        onChange={(e) => setFormData({ ...formData, previousMarks: Number(e.target.value) })}
                        placeholder="1024"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>

                    {/* Total marks */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Total marks *</label>
                      <input
                        type="number"
                        value={formData.totalMarks}
                        onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                        placeholder="1100"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
                      />
                    </div>
                  </div>

                  {/* Calculated Percentage Card */}
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-900">
                        {percentage}% &nbsp;•&nbsp; {percentage >= 80 ? 'Excellent work!' : 'Good standing!'}
                      </div>
                      <div className="text-[11px] text-emerald-700">Calculated from your marks.</div>
                    </div>
                  </div>

                  {/* Form Footer Actions */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="order-2 sm:order-1 px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center cursor-pointer"
                    >
                      Back
                    </button>

                    <span className="order-3 sm:order-2 text-center text-xs text-slate-400 font-medium">
                      Draft • Not submitted
                    </span>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="order-1 sm:order-3 px-6 py-2.5 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center cursor-pointer"
                    >
                      Continue to groups
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: GROUP SELECTION (EXACT MOCKUP) */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                      Choose your direction.
                    </h2>
                    <p className="text-xs text-slate-500">
                      Big ambitions begin with the right programme.
                    </p>
                  </div>

                  {/* 4 Program Selection Cards (2x2 on desktop, 1 col on mobile) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        key: 'ICS',
                        title: 'ICS',
                        desc: 'Computer Science • Physics • Mathematics',
                      },
                      {
                        key: 'Pre-Medical',
                        title: 'FSc Pre-Medical',
                        desc: 'Biology • Chemistry • Physics',
                      },
                      {
                        key: 'Pre-Engineering',
                        title: 'FSc Pre-Engineering',
                        desc: 'Mathematics • Chemistry • Physics',
                      },
                      {
                        key: 'Commerce',
                        title: 'ICom',
                        desc: 'Accounting • Commerce • Economics',
                      },
                    ].map((prog) => {
                      const isSelected = formData.groupName === prog.key;
                      return (
                        <div
                          key={prog.key}
                          onClick={() => setFormData({ ...formData, groupName: prog.key as AcademicGroup })}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-[#f0f4fd] border-[#1b224b] shadow-xs'
                              : 'bg-white border-slate-200/90 hover:border-slate-300'
                          }`}
                        >
                          {/* Radio Icon Indicator */}
                          <div className="pt-0.5 shrink-0">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'border-2 border-[#1b224b] bg-[#1b224b]'
                                  : 'border-2 border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-1">
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                              {prog.title}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">{prog.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Preferred Shift Row */}
                  <div className="pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div className="space-y-1.5 w-full sm:max-w-xs">
                        <label className="text-xs font-bold text-slate-700 block">Preferred shift *</label>
                        <div className="relative">
                          <select
                            value={formData.shift}
                            onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                            className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-[#232766] appearance-none"
                          >
                            <option value="Morning • 8:00am – 1:30pm">Morning • 8:00am – 1:30pm</option>
                            <option value="Evening • 1:45pm – 6:30pm">Evening • 1:45pm – 6:30pm</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 sm:pb-3">
                        <span className="sm:hidden">Placement is subject to merit and availability.</span>
                        <span className="hidden sm:inline">Final placement is subject to merit and seat availability.</span>
                      </p>
                    </div>
                  </div>

                  {/* Form Footer Actions */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="order-2 sm:order-1 px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="order-1 sm:order-2 px-6 py-2.5 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center cursor-pointer"
                    >
                      Continue to photo
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: PHOTO UPLOAD (EXACT MOCKUP) */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                      Put a face to your future.
                    </h2>
                    <p className="text-xs text-slate-500">
                      Upload a recent, clear passport-size photograph.
                    </p>
                  </div>

                  {/* Hidden File Input for Real Photo Uploads */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({
                            ...formData,
                            photoUrl: reader.result as string,
                            photoFileName: file.name,
                            photoFileSize: `${Math.round(file.size / 1024)} KB`,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />

                  {/* Dashed Upload Box Container */}
                  <div className="border-2 border-dashed border-slate-200/90 rounded-2xl p-5 sm:p-7 bg-[#fafcff]/60">
                    {/* Desktop View: Horizontal Flex */}
                    <div className="hidden sm:flex items-center gap-6">
                      <img
                        src={formData.photoUrl}
                        alt="Applicant photograph"
                        className="w-24 h-32 rounded-2xl object-cover shadow-xs border border-slate-200/90 shrink-0"
                      />
                      <div className="space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100/90 flex items-center justify-center text-slate-700">
                          <Upload className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                            A clear photo. A great first impression.
                          </h3>
                          <p className="text-xs text-slate-500">
                            Use a plain background with your face clearly visible.
                          </p>
                          <p className="text-xs text-slate-400">
                            JPG or PNG • Maximum 2 MB • Recommended 600 × 800px
                          </p>
                        </div>
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                          >
                            Choose a different photo
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile View: Centered Vertical Stack */}
                    <div className="sm:hidden flex flex-col items-center text-center space-y-3.5 py-2">
                      <img
                        src={formData.photoUrl}
                        alt="Applicant photograph"
                        className="w-28 h-36 rounded-2xl object-cover shadow-xs border border-slate-200/90"
                      />
                      <div className="space-y-1">
                        <h3 className="font-extrabold text-sm text-slate-900">
                          Looking good, {formData.firstName || 'Ayesha'}.
                        </h3>
                        <p className="text-xs text-slate-400">
                          JPG or PNG • Maximum 2 MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2.5 px-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                      >
                        Choose a different photo
                      </button>
                    </div>
                  </div>

                  {/* Uploaded File Status Row */}
                  <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-800">
                          {formData.photoFileName || 'ayesha-ahmed.jpg'}
                        </div>
                        <div className="text-[11px] text-emerald-600 font-medium">
                          {formData.photoFileSize || '248 KB'} • Upload complete
                        </div>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Photo Purpose Disclaimer */}
                  <p className="text-xs text-slate-400">
                    Your photo is used only for your admission record and student identification.
                  </p>

                  {/* Form Footer Actions */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="order-2 sm:order-1 px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      className="order-1 sm:order-2 px-6 py-2.5 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center cursor-pointer"
                    >
                      Review application
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & SUBMIT (EXACT MOCKUP) */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {/* Step Header with Desktop Photo at Top-Right */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-black text-[#1b224b] tracking-tight">
                        One last look.
                      </h2>
                      <p className="text-xs text-slate-500">
                        Check your details before you submit.
                      </p>
                    </div>

                    {/* Desktop Portrait Photo */}
                    <img
                      src={formData.photoUrl}
                      alt="Applicant photograph"
                      className="hidden sm:block w-12 h-14 sm:w-14 sm:h-16 rounded-xl object-cover border border-slate-200/90 shadow-2xs shrink-0"
                    />
                  </div>

                  {/* Mobile Profile Row */}
                  <div className="sm:hidden flex items-center gap-3.5 pt-1 pb-1">
                    <img
                      src={formData.photoUrl}
                      alt="Applicant photograph"
                      className="w-14 h-16 rounded-xl object-cover border border-slate-200/90 shadow-2xs shrink-0"
                    />
                    <div className="space-y-0.5">
                      <h3 className="font-extrabold text-base text-[#1b224b]">
                        {formData.firstName} {formData.lastName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Session 2026–27
                      </p>
                    </div>
                  </div>

                  {/* Two Sub-Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Sub-Card 1: Personal Information */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#f8faff] border border-slate-200/70 space-y-3.5">
                      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                        <h3 className="font-bold text-xs sm:text-sm text-[#1b224b]">
                          Personal information
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-xs font-semibold text-[#1b224b] hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Full name</span>
                          <span className="font-bold text-slate-800 text-right">
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Date of birth</span>
                          <span className="font-bold text-slate-800 text-right">
                            {formData.dob.includes('14') && formData.dob.includes('2009') ? '14 August 2009' : formData.dob}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Gender</span>
                          <span className="font-bold text-slate-800 text-right">{formData.gender}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Phone</span>
                          <span className="font-mono font-bold text-slate-800 text-right">{formData.phone}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Email</span>
                          <span className="font-bold text-slate-800 text-right truncate max-w-[160px] sm:max-w-none">
                            {formData.email}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">B-form</span>
                          <span className="font-mono font-bold text-slate-800 text-right">{formData.cnic}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Address</span>
                          <span className="font-bold text-slate-800 text-right">{formData.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sub-Card 2: Academic Information */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#f8faff] border border-slate-200/70 space-y-3.5">
                      <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                        <h3 className="font-bold text-xs sm:text-sm text-[#1b224b]">
                          Academic information
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-xs font-semibold text-[#1b224b] hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Board</span>
                          <span className="font-bold text-slate-800 text-right">{formData.educationBoard}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">School</span>
                          <span className="font-bold text-slate-800 text-right truncate max-w-[160px] sm:max-w-none">
                            {formData.institution}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Passing year</span>
                          <span className="font-bold text-slate-800 text-right">{formData.passingYear}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Roll number</span>
                          <span className="font-mono font-bold text-slate-800 text-right">{formData.matricRollNo}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Matric marks</span>
                          <span className="font-mono font-bold text-slate-800 text-right">
                            {formData.previousMarks} / {formData.totalMarks}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-slate-400 font-medium w-24 shrink-0">Percentage</span>
                          <span className="font-mono font-bold text-slate-800 text-right">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Group & Shift Banner */}
                  <div className="p-4 rounded-2xl bg-[#edf2fe] border border-blue-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                    <div className="font-extrabold text-xs sm:text-sm text-[#1b224b]">
                      {formData.groupName === 'Pre-Medical'
                        ? 'FSc Pre-Medical'
                        : formData.groupName === 'Pre-Engineering'
                        ? 'FSc Pre-Engineering'
                        : formData.groupName === 'Commerce'
                        ? 'ICom'
                        : formData.groupName} • {formData.shift.includes('Evening') ? 'Evening shift' : 'Morning shift'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formData.groupName === 'Pre-Medical'
                        ? 'Biology • Chemistry • Physics'
                        : formData.groupName === 'Pre-Engineering'
                        ? 'Mathematics • Chemistry • Physics'
                        : formData.groupName === 'Commerce'
                        ? 'Accounting • Commerce • Economics'
                        : 'Computer Science • Physics • Mathematics'}
                    </div>
                  </div>

                  {/* Confirmation Checkbox */}
                  <div
                    onClick={() => setTermsAgreed(!termsAgreed)}
                    className="flex items-start gap-2.5 cursor-pointer pt-1"
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                        termsAgreed
                          ? 'bg-[#1b224b] text-white shadow-xs'
                          : 'border-2 border-slate-300 bg-white'
                      }`}
                    >
                      {termsAgreed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>
                    <span className="text-xs text-slate-600 leading-snug select-none">
                      I confirm that the information provided is accurate and agree to the admission terms.
                    </span>
                  </div>

                  {/* Form Footer Actions */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="order-2 sm:order-1 px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="order-1 sm:order-2 px-7 py-2.5 rounded-xl bg-[#1b224b] hover:bg-[#121633] text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center cursor-pointer"
                    >
                      Submit application
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
        </>
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
