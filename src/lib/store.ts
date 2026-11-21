import { useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Student,
  Teacher,
  ClassRoom,
  Subject,
  AttendanceRecord,
  Exam,
  MarkRecord,
  FeeStructure,
  FeeVoucher,
  TimetableSlot,
  StudyMaterial,
  Notice,
  AdmissionApplication,
  StudentResultSummary,
} from '../types';
import {
  DEMO_PROFILES,
  CLASSES_DATA,
  SUBJECTS_DATA,
  TEACHERS_DATA,
  generateInitialStudents,
  generateInitialAttendance,
  EXAMS_DATA,
  generateInitialMarks,
  FEE_STRUCTURES_DATA,
  generateInitialFeeVouchers,
  TIMETABLE_DATA,
  STUDY_MATERIALS_DATA,
  NOTICES_DATA,
  ADMISSIONS_DATA,
} from './mockData';
import { calculateGrade } from './utils';

const STORAGE_KEY_PREFIX = 'smart_campus_v1_';

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading localStorage for key', key, e);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing localStorage for key', key, e);
  }
}

// Global state container
class AppStore {
  currentUser: UserProfile | null = null;
  theme: 'light' | 'dark' = 'light';

  classes: ClassRoom[] = [];
  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  students: Student[] = [];
  attendance: AttendanceRecord[] = [];
  exams: Exam[] = [];
  marks: MarkRecord[] = [];
  feeStructures: FeeStructure[] = [];
  feeVouchers: FeeVoucher[] = [];
  timetable: TimetableSlot[] = [];
  studyMaterials: StudyMaterial[] = [];
  notices: Notice[] = [];
  admissions: AdmissionApplication[] = [];

  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
  }

  init() {
    // Check if initial data exists
    const hasInitialized = localStorage.getItem(STORAGE_KEY_PREFIX + 'initialized');

    if (!hasInitialized) {
      this.resetToDefaults();
    } else {
      this.theme = getStoredItem<'light' | 'dark'>('theme', 'light');
      this.currentUser = getStoredItem<UserProfile | null>('currentUser', DEMO_PROFILES[0]);
      this.classes = getStoredItem('classes', CLASSES_DATA);
      this.subjects = getStoredItem('subjects', SUBJECTS_DATA);
      this.teachers = getStoredItem('teachers', TEACHERS_DATA);
      this.students = getStoredItem('students', []);
      this.attendance = getStoredItem('attendance', []);
      this.exams = getStoredItem('exams', EXAMS_DATA);
      this.marks = getStoredItem('marks', []);
      this.feeStructures = getStoredItem('feeStructures', FEE_STRUCTURES_DATA);
      this.feeVouchers = getStoredItem('feeVouchers', []);
      this.timetable = getStoredItem('timetable', TIMETABLE_DATA);
      this.studyMaterials = getStoredItem('studyMaterials', STUDY_MATERIALS_DATA);
      this.notices = getStoredItem('notices', NOTICES_DATA);
      this.admissions = getStoredItem('admissions', ADMISSIONS_DATA);

      // If students list was empty, re-seed
      if (this.students.length === 0) {
        this.resetToDefaults();
      }
    }

    this.applyTheme(this.theme);
  }

  resetToDefaults() {
    const initialStudents = generateInitialStudents();
    const initialAttendance = generateInitialAttendance(initialStudents);
    const initialMarks = generateInitialMarks(initialStudents);
    const initialFeeVouchers = generateInitialFeeVouchers(initialStudents);

    this.theme = 'light';
    this.currentUser = DEMO_PROFILES[0]; // Admin by default
    this.classes = CLASSES_DATA;
    this.subjects = SUBJECTS_DATA;
    this.teachers = TEACHERS_DATA;
    this.students = initialStudents;
    this.attendance = initialAttendance;
    this.exams = EXAMS_DATA;
    this.marks = initialMarks;
    this.feeStructures = FEE_STRUCTURES_DATA;
    this.feeVouchers = initialFeeVouchers;
    this.timetable = TIMETABLE_DATA;
    this.studyMaterials = STUDY_MATERIALS_DATA;
    this.notices = NOTICES_DATA;
    this.admissions = ADMISSIONS_DATA;

    this.saveAll();
    localStorage.setItem(STORAGE_KEY_PREFIX + 'initialized', 'true');
    this.applyTheme(this.theme);
    this.notify();
  }

  private saveAll() {
    setStoredItem('theme', this.theme);
    setStoredItem('currentUser', this.currentUser);
    setStoredItem('classes', this.classes);
    setStoredItem('subjects', this.subjects);
    setStoredItem('teachers', this.teachers);
    setStoredItem('students', this.students);
    setStoredItem('attendance', this.attendance);
    setStoredItem('exams', this.exams);
    setStoredItem('marks', this.marks);
    setStoredItem('feeStructures', this.feeStructures);
    setStoredItem('feeVouchers', this.feeVouchers);
    setStoredItem('timetable', this.timetable);
    setStoredItem('studyMaterials', this.studyMaterials);
    setStoredItem('notices', this.notices);
    setStoredItem('admissions', this.admissions);
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- Auth & Role Switching ---
  setCurrentUser(user: UserProfile | null) {
    this.currentUser = user;
    setStoredItem('currentUser', user);
    this.notify();
  }

  switchRole(role: UserRole) {
    const demo = DEMO_PROFILES.find((p) => p.role === role);
    if (demo) {
      this.setCurrentUser(demo);
    }
  }

  loginWithEmailPassword(email: string, _password: string): { success: boolean; message: string } {
    const cleanEmail = email.toLowerCase().trim();
    const normalized = cleanEmail.replace('@smartcampus.demo', '@smartcampus.com');
    const profile = DEMO_PROFILES.find(
      (p) => p.email.toLowerCase() === cleanEmail || p.email.toLowerCase() === normalized
    );
    if (profile) {
      this.setCurrentUser(profile);
      return { success: true, message: 'Logged in successfully' };
    }
    
    // Check if it's a student email from registered students
    const std = this.students.find(
      (s) => s.email.toLowerCase() === cleanEmail || s.email.toLowerCase() === normalized
    );
    if (std) {
      const studentProfile: UserProfile = {
        id: std.id,
        email: std.email,
        full_name: std.full_name,
        role: 'student',
        avatar_url: std.photo_url,
        phone: std.phone,
        address: std.address,
      };
      this.setCurrentUser(studentProfile);
      return { success: true, message: 'Logged in successfully' };
    }

    return { success: false, message: 'Invalid email or password' };
  }

  logout() {
    this.setCurrentUser(null);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    setStoredItem('theme', this.theme);
    this.applyTheme(this.theme);
    this.notify();
  }

  private applyTheme(theme: 'light' | 'dark') {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  // --- Admissions Management ---
  submitAdmission(application: Omit<AdmissionApplication, 'id' | 'applied_date' | 'status'>) {
    const newApp: AdmissionApplication = {
      ...application,
      id: `adm-app-${Date.now()}`,
      applied_date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    this.admissions = [newApp, ...this.admissions];
    setStoredItem('admissions', this.admissions);
    this.notify();
    return newApp;
  }

  approveAdmission(applicationId: string, assignedClassId?: string): { student: Student; rollNumber: string } {
    const app = this.admissions.find((a) => a.id === applicationId);
    if (!app) throw new Error('Application not found');

    // Auto-generate roll number: e.g. PCL-24-150
    const targetClass = this.classes.find((c) => c.id === assignedClassId) ||
      this.classes.find((c) => c.group_name === app.group_name) ||
      this.classes[0];

    const currentStudentsInGroup = this.students.filter((s) => s.group_name === app.group_name).length;
    const groupPrefix = app.group_name === 'ICS' ? '1' : app.group_name === 'Pre-Medical' ? '2' : '3';
    const rollNumber = `PCL-24-${groupPrefix}${(currentStudentsInGroup + 51).toString().padStart(2, '0')}`;
    const admissionNo = `ADM-2024-${Date.now().toString().slice(-4)}`;

    // Create Student
    const newStudent: Student = {
      id: `std-new-${Date.now()}`,
      roll_number: rollNumber,
      admission_no: admissionNo,
      full_name: app.applicant_name,
      father_name: app.father_name,
      cnic_bform: app.cnic_bform,
      dob: app.dob,
      gender: app.gender,
      blood_group: 'B+',
      phone: app.contact,
      email: app.email,
      address: app.address,
      class_id: targetClass.id,
      group_name: app.group_name,
      admission_date: new Date().toISOString().split('T')[0],
      status: 'active',
      photo_url: app.photo_url || (app.gender === 'Female' ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
    };

    // Create Fee Voucher for the new student
    const feeStructure = this.feeStructures.find((fs) => fs.class_id === targetClass.id);
    const feeAmount = feeStructure ? feeStructure.total_amount : 22000;
    const newVoucher: FeeVoucher = {
      id: `vch-new-${Date.now()}`,
      voucher_no: `VCH-2024-${Date.now().toString().slice(-6)}`,
      student_id: newStudent.id,
      class_id: targetClass.id,
      month_year: 'November 2024',
      total_amount: feeAmount,
      paid_amount: 0,
      balance: feeAmount,
      status: 'unpaid',
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      fine: 0,
    };

    // Update Application
    app.status = 'approved';
    app.roll_number_assigned = rollNumber;
    app.remarks = `Approved. Assigned Roll No ${rollNumber} in ${targetClass.name}`;

    this.students = [newStudent, ...this.students];
    this.feeVouchers = [newVoucher, ...this.feeVouchers];
    setStoredItem('admissions', this.admissions);
    setStoredItem('students', this.students);
    setStoredItem('feeVouchers', this.feeVouchers);
    this.notify();

    return { student: newStudent, rollNumber };
  }

  rejectAdmission(applicationId: string, remarks: string) {
    const app = this.admissions.find((a) => a.id === applicationId);
    if (!app) return;
    app.status = 'rejected';
    app.remarks = remarks || 'Does not meet eligibility criteria.';
    setStoredItem('admissions', this.admissions);
    this.notify();
  }

  // --- Students CRUD ---
  addStudent(studentData: Omit<Student, 'id' | 'admission_no'>) {
    const admissionNo = `ADM-2024-${Date.now().toString().slice(-4)}`;
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`,
      admission_no: admissionNo,
    };
    this.students = [newStudent, ...this.students];
    setStoredItem('students', this.students);
    this.notify();
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>) {
    this.students = this.students.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setStoredItem('students', this.students);
    this.notify();
  }

  deleteStudent(id: string) {
    this.students = this.students.filter((s) => s.id !== id);
    this.attendance = this.attendance.filter((a) => a.student_id !== id);
    this.marks = this.marks.filter((m) => m.student_id !== id);
    this.feeVouchers = this.feeVouchers.filter((f) => f.student_id !== id);
    setStoredItem('students', this.students);
    setStoredItem('attendance', this.attendance);
    setStoredItem('marks', this.marks);
    setStoredItem('feeVouchers', this.feeVouchers);
    this.notify();
  }

  // --- Teachers CRUD ---
  addTeacher(teacherData: Omit<Teacher, 'id'>) {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Date.now()}`,
    };
    this.teachers = [newTeacher, ...this.teachers];
    setStoredItem('teachers', this.teachers);
    this.notify();
    return newTeacher;
  }

  updateTeacher(id: string, updates: Partial<Teacher>) {
    this.teachers = this.teachers.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setStoredItem('teachers', this.teachers);
    this.notify();
  }

  deleteTeacher(id: string) {
    this.teachers = this.teachers.filter((t) => t.id !== id);
    setStoredItem('teachers', this.teachers);
    this.notify();
  }

  // --- Attendance ---
  markAttendanceBatch(date: string, classId: string, records: { student_id: string; status: 'present' | 'absent' | 'leave'; remarks?: string }[]) {
    // Remove existing for this date & class
    const studentIds = new Set(records.map((r) => r.student_id));
    this.attendance = this.attendance.filter((a) => !(a.date === date && studentIds.has(a.student_id)));

    const newRecords: AttendanceRecord[] = records.map((r) => ({
      id: `att-${r.student_id}-${date}-${Date.now()}`,
      student_id: r.student_id,
      class_id: classId,
      date: date,
      status: r.status,
      remarks: r.remarks,
      marked_by: this.currentUser?.id,
    }));

    this.attendance = [...this.attendance, ...newRecords];
    setStoredItem('attendance', this.attendance);
    this.notify();
  }

  // --- Exams & Marks ---
  addExam(examData: Omit<Exam, 'id'>) {
    const newExam: Exam = {
      ...examData,
      id: `exam-${Date.now()}`,
    };
    this.exams = [newExam, ...this.exams];
    setStoredItem('exams', this.exams);
    this.notify();
    return newExam;
  }

  saveMarksBatch(examId: string, subjectId: string, classId: string, marksList: { studentId: string; marksObtained: number; totalMarks: number }[]) {
    // Filter out existing entries for this exam, subject and student
    const studentIdSet = new Set(marksList.map((m) => m.studentId));
    this.marks = this.marks.filter((m) => !(m.exam_id === examId && m.subject_id === subjectId && studentIdSet.has(m.student_id)));

    const newMarks: MarkRecord[] = marksList.map((m) => ({
      id: `mk-${examId}-${m.studentId}-${subjectId}`,
      exam_id: examId,
      student_id: m.studentId,
      subject_id: subjectId,
      class_id: classId,
      marks_obtained: m.marksObtained,
      total_marks: m.totalMarks,
    }));

    this.marks = [...this.marks, ...newMarks];
    setStoredItem('marks', this.marks);
    this.notify();
  }

  // Results & Positions calculation
  getResultsSummaryForClass(examId: string, classId: string): StudentResultSummary[] {
    const exam = this.exams.find((e) => e.id === examId);
    const classRoom = this.classes.find((c) => c.id === classId);
    if (!exam || !classRoom) return [];

    const students = this.students.filter((s) => s.class_id === classId);

    const summaries: StudentResultSummary[] = students.map((student) => {
      const studentMarks = this.marks.filter((m) => m.student_id === student.id && m.exam_id === examId);

      const markDetails = studentMarks.map((m) => {
        const subject = this.subjects.find((s) => s.id === m.subject_id) || {
          id: m.subject_id,
          code: 'SUB',
          name: 'Subject',
          groups: [classRoom.group_name],
          credit_hours: 3,
        };
        const percentage = m.total_marks > 0 ? (m.marks_obtained / m.total_marks) * 100 : 0;
        const gradeInfo = calculateGrade(percentage);

        return {
          subject,
          marks_obtained: m.marks_obtained,
          total_marks: m.total_marks,
          percentage: Math.round(percentage),
          grade: gradeInfo.grade,
          status: (percentage >= 40 ? 'Pass' : 'Fail') as 'Pass' | 'Fail',
        };
      });

      const totalObtained = markDetails.reduce((acc, curr) => acc + curr.marks_obtained, 0);
      const totalMaximum = markDetails.reduce((acc, curr) => acc + curr.total_marks, 0);
      const overallPercentage = totalMaximum > 0 ? Math.round((totalObtained / totalMaximum) * 100) : 0;
      const overallGrade = calculateGrade(overallPercentage).grade;
      const hasFailedSubject = markDetails.some((m) => m.status === 'Fail');

      return {
        student,
        exam,
        class_room: classRoom,
        marks: markDetails,
        total_obtained: totalObtained,
        total_maximum: totalMaximum,
        overall_percentage: overallPercentage,
        overall_grade: overallGrade,
        status: (hasFailedSubject || overallPercentage < 40 ? 'Fail' : 'Pass') as 'Pass' | 'Fail',
        rank: 1, // calculated below
        total_students_in_class: students.length,
      };
    });

    // Calculate ranks
    summaries.sort((a, b) => b.total_obtained - a.total_obtained);
    summaries.forEach((s, idx) => {
      s.rank = idx + 1;
    });

    return summaries;
  }

  // --- Fee Management ---
  createFeeVoucher(voucher: Omit<FeeVoucher, 'id' | 'voucher_no'>) {
    const voucherNo = `VCH-2024-${Date.now().toString().slice(-6)}`;
    const newVoucher: FeeVoucher = {
      ...voucher,
      id: `vch-${Date.now()}`,
      voucher_no: voucherNo,
    };
    this.feeVouchers = [newVoucher, ...this.feeVouchers];
    setStoredItem('feeVouchers', this.feeVouchers);
    this.notify();
    return newVoucher;
  }

  updateFeePayment(voucherId: string, paidAmount: number, method: 'Bank of Punjab' | 'HBL' | 'JazzCash' | 'Cash Counter') {
    this.feeVouchers = this.feeVouchers.map((v) => {
      if (v.id === voucherId) {
        const newPaid = v.paid_amount + paidAmount;
        const newBalance = Math.max(0, v.total_amount - newPaid);
        const status = newBalance === 0 ? 'paid' : newPaid > 0 ? 'partial' : 'unpaid';
        return {
          ...v,
          paid_amount: newPaid,
          balance: newBalance,
          status,
          paid_date: new Date().toISOString().split('T')[0],
          payment_method: method,
        };
      }
      return v;
    });
    setStoredItem('feeVouchers', this.feeVouchers);
    this.notify();
  }

  // --- Timetable ---
  addTimetableSlot(slot: Omit<TimetableSlot, 'id'>) {
    const newSlot: TimetableSlot = {
      ...slot,
      id: `tt-${Date.now()}`,
    };
    this.timetable = [...this.timetable, newSlot];
    setStoredItem('timetable', this.timetable);
    this.notify();
    return newSlot;
  }

  deleteTimetableSlot(id: string) {
    this.timetable = this.timetable.filter((t) => t.id !== id);
    setStoredItem('timetable', this.timetable);
    this.notify();
  }

  // --- Study Materials ---
  addStudyMaterial(material: Omit<StudyMaterial, 'id' | 'created_at'>) {
    const newMat: StudyMaterial = {
      ...material,
      id: `mat-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
    };
    this.studyMaterials = [newMat, ...this.studyMaterials];
    setStoredItem('studyMaterials', this.studyMaterials);
    this.notify();
    return newMat;
  }

  deleteStudyMaterial(id: string) {
    this.studyMaterials = this.studyMaterials.filter((m) => m.id !== id);
    setStoredItem('studyMaterials', this.studyMaterials);
    this.notify();
  }

  // --- Notices ---
  addNotice(notice: Omit<Notice, 'id' | 'date'>) {
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    this.notices = [newNotice, ...this.notices];
    setStoredItem('notices', this.notices);
    this.notify();
    return newNotice;
  }

  deleteNotice(id: string) {
    this.notices = this.notices.filter((n) => n.id !== id);
    setStoredItem('notices', this.notices);
    this.notify();
  }
}

export const store = new AppStore();

// React hook for observing store
export function useStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick((t) => t + 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return store;
}
