import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Student,
  Teacher,
  ClassRoom,
  Subject,
  AttendanceRecord,
  Exam,
  MarkRecord,
  FeeVoucher,
  FeeStructure,
  TimetableSlot,
  StudyMaterial,
  Notice,
  AdmissionApplication,
  UserProfile,
} from '../../src/types';
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
} from '../../src/lib/mockData';
import { generateStudentAnalytics } from '../../src/lib/aiAnalytics';

// Supabase Connection (via server environment variables)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseBackendEnabled = Boolean(
  supabaseUrl && supabaseKey && supabaseUrl.startsWith('https://') && supabaseKey.length > 20
);

export const supabaseAdmin: SupabaseClient | null = isSupabaseBackendEnabled
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// In-Memory Database store for Serverless execution
class BackendDatabase {
  profiles: UserProfile[] = [...DEMO_PROFILES];
  classes: ClassRoom[] = [...CLASSES_DATA];
  subjects: Subject[] = [...SUBJECTS_DATA];
  teachers: Teacher[] = [...TEACHERS_DATA];
  students: Student[] = [];
  attendance: AttendanceRecord[] = [];
  exams: Exam[] = [...EXAMS_DATA];
  marks: MarkRecord[] = [];
  feeStructures: FeeStructure[] = [...FEE_STRUCTURES_DATA];
  feeVouchers: FeeVoucher[] = [];
  timetable: TimetableSlot[] = [...TIMETABLE_DATA];
  studyMaterials: StudyMaterial[] = [...STUDY_MATERIALS_DATA];
  notices: Notice[] = [...NOTICES_DATA];
  admissions: AdmissionApplication[] = [...ADMISSIONS_DATA];

  constructor() {
    this.students = generateInitialStudents();
    this.attendance = generateInitialAttendance(this.students);
    this.marks = generateInitialMarks(this.students);
    this.feeVouchers = generateInitialFeeVouchers(this.students);
  }

  // --- Students ---
  getStudents(classId?: string, group?: string, search?: string) {
    let list = this.students;
    if (classId) list = list.filter((s) => s.class_id === classId);
    if (group) list = list.filter((s) => s.group_name === group);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.full_name.toLowerCase().includes(q) ||
          s.roll_number.toLowerCase().includes(q) ||
          s.father_name.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getStudentById(id: string) {
    return this.students.find((s) => s.id === id);
  }

  addStudent(data: Omit<Student, 'id' | 'admission_no'>) {
    const admissionNo = `ADM-2024-${Date.now().toString().slice(-4)}`;
    const newStudent: Student = {
      ...data,
      id: `std-${Date.now()}`,
      admission_no: admissionNo,
    };
    this.students = [newStudent, ...this.students];
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>) {
    this.students = this.students.map((s) => (s.id === id ? { ...s, ...updates } : s));
    return this.getStudentById(id);
  }

  deleteStudent(id: string) {
    this.students = this.students.filter((s) => s.id !== id);
    this.attendance = this.attendance.filter((a) => a.student_id !== id);
    this.marks = this.marks.filter((m) => m.student_id !== id);
    this.feeVouchers = this.feeVouchers.filter((f) => f.student_id !== id);
    return true;
  }

  // --- Teachers ---
  getTeachers(search?: string) {
    let list = this.teachers;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.full_name.toLowerCase().includes(q) ||
          t.employee_id.toLowerCase().includes(q) ||
          t.subject_specialization.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getTeacherById(id: string) {
    return this.teachers.find((t) => t.id === id);
  }

  addTeacher(data: Omit<Teacher, 'id' | 'employee_id'>) {
    const employeeId = `PGC-FAC-${Date.now().toString().slice(-4)}`;
    const newTeacher: Teacher = {
      ...data,
      id: `tch-${Date.now()}`,
      employee_id: employeeId,
    };
    this.teachers = [newTeacher, ...this.teachers];
    return newTeacher;
  }

  updateTeacher(id: string, updates: Partial<Teacher>) {
    this.teachers = this.teachers.map((t) => (t.id === id ? { ...t, ...updates } : t));
    return this.getTeacherById(id);
  }

  deleteTeacher(id: string) {
    this.teachers = this.teachers.filter((t) => t.id !== id);
    return true;
  }

  // --- Classes & Subjects ---
  getClasses() {
    return this.classes;
  }

  getSubjects() {
    return this.subjects;
  }

  // --- Admissions ---
  getAdmissions(status?: string) {
    if (status && status !== 'all') {
      return this.admissions.filter((a) => a.status === status);
    }
    return this.admissions;
  }

  submitAdmission(data: Omit<AdmissionApplication, 'id' | 'applied_date' | 'status'>) {
    const newApp: AdmissionApplication = {
      ...data,
      id: `adm-app-${Date.now()}`,
      applied_date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    this.admissions = [newApp, ...this.admissions];
    return newApp;
  }

  approveAdmission(appId: string) {
    const app = this.admissions.find((a) => a.id === appId);
    if (!app) throw new Error('Application not found');

    const targetClass =
      this.classes.find((c) => c.group_name === app.group_name) || this.classes[0];
    const groupCount = this.students.filter((s) => s.group_name === app.group_name).length;
    const prefix = app.group_name === 'ICS' ? '1' : app.group_name === 'Pre-Medical' ? '2' : '3';
    const rollNumber = `PCL-24-${prefix}${(groupCount + 51).toString().padStart(2, '0')}`;
    const admissionNo = `ADM-2024-${Date.now().toString().slice(-4)}`;

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
      photo_url: app.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    };

    app.status = 'approved';
    app.roll_number_assigned = rollNumber;
    app.remarks = `Approved. Enrolled in ${targetClass.name}`;

    this.students = [newStudent, ...this.students];

    // Create Fee Voucher
    const feeStructure = this.feeStructures.find((fs) => fs.class_id === targetClass.id);
    const amount = feeStructure ? feeStructure.total_amount : 22000;
    const voucher: FeeVoucher = {
      id: `vch-${Date.now()}`,
      voucher_no: `VCH-2024-${Date.now().toString().slice(-6)}`,
      student_id: newStudent.id,
      class_id: targetClass.id,
      month_year: 'November 2024',
      total_amount: amount,
      paid_amount: 0,
      balance: amount,
      status: 'unpaid',
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
      fine: 0,
    };
    this.feeVouchers = [voucher, ...this.feeVouchers];

    return { student: newStudent, rollNumber, voucher };
  }

  // --- Attendance ---
  getAttendance(classId?: string, date?: string, studentId?: string) {
    let list = this.attendance;
    if (classId) list = list.filter((a) => a.class_id === classId);
    if (date) list = list.filter((a) => a.date === date);
    if (studentId) list = list.filter((a) => a.student_id === studentId);
    return list;
  }

  markAttendanceBatch(date: string, classId: string, records: { student_id: string; status: any }[]) {
    const studentIds = new Set(records.map((r) => r.student_id));
    this.attendance = this.attendance.filter(
      (a) => !(a.date === date && a.class_id === classId && studentIds.has(a.student_id))
    );

    const newRecords: AttendanceRecord[] = records.map((r) => ({
      id: `att-${r.student_id}-${date}-${Date.now()}`,
      student_id: r.student_id,
      class_id: classId,
      date,
      status: r.status,
    }));

    this.attendance = [...this.attendance, ...newRecords];
    return newRecords;
  }

  // --- Exams & Marks ---
  getExams() {
    return this.exams;
  }

  addExam(data: Omit<Exam, 'id'>) {
    const newExam: Exam = {
      ...data,
      id: `exam-${Date.now()}`,
    };
    this.exams = [newExam, ...this.exams];
    return newExam;
  }

  getMarks(examId?: string, classId?: string, subjectId?: string, studentId?: string) {
    let list = this.marks;
    if (examId) list = list.filter((m) => m.exam_id === examId);
    if (classId) list = list.filter((m) => m.class_id === classId);
    if (subjectId) list = list.filter((m) => m.subject_id === subjectId);
    if (studentId) list = list.filter((m) => m.student_id === studentId);
    return list;
  }

  saveMarksBatch(
    examId: string,
    subjectId: string,
    classId: string,
    marksList: { studentId: string; marksObtained: number; totalMarks: number }[]
  ) {
    const studentIds = new Set(marksList.map((m) => m.studentId));
    this.marks = this.marks.filter(
      (m) => !(m.exam_id === examId && m.subject_id === subjectId && studentIds.has(m.student_id))
    );

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
    return newMarks;
  }

  // --- Results Calculation ---
  calculateResults(examId: string, classId?: string) {
    const exam = this.exams.find((e) => e.id === examId) || this.exams[0];
    let classList = classId ? this.students.filter((s) => s.class_id === classId) : this.students;

    const results = classList.map((std) => {
      const stdMarks = this.marks.filter((m) => m.exam_id === exam.id && m.student_id === std.id);
      const totalObtained = stdMarks.reduce((sum, m) => sum + m.marks_obtained, 0);
      const totalMax = stdMarks.reduce((sum, m) => sum + m.total_marks, 0);
      const percentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100 * 10) / 10 : 0;

      let grade = 'F';
      if (percentage >= 80) grade = 'A+';
      else if (percentage >= 70) grade = 'A';
      else if (percentage >= 60) grade = 'B';
      else if (percentage >= 50) grade = 'C';
      else if (percentage >= 40) grade = 'D';

      const status = percentage >= 40 ? 'Pass' : 'Fail';

      return {
        student: std,
        exam,
        marks: stdMarks,
        totalObtained,
        totalMax,
        percentage,
        grade,
        status,
        rank: 0,
      };
    });

    // Calculate class positions/ranks
    results.sort((a, b) => b.percentage - a.percentage);
    results.forEach((r, idx) => {
      r.rank = idx + 1;
    });

    return results;
  }

  // --- Fees ---
  getFeeVouchers(status?: string, classId?: string, studentId?: string) {
    let list = this.feeVouchers;
    if (status && status !== 'all') list = list.filter((v) => v.status === status);
    if (classId) list = list.filter((v) => v.class_id === classId);
    if (studentId) list = list.filter((v) => v.student_id === studentId);
    return list;
  }

  getFeeStructures() {
    return this.feeStructures;
  }

  recordFeePayment(voucherId: string, paidAmount: number, method: any) {
    const voucher = this.feeVouchers.find((v) => v.id === voucherId);
    if (!voucher) throw new Error('Voucher not found');

    const newPaid = voucher.paid_amount + paidAmount;
    const newBalance = Math.max(0, voucher.total_amount - newPaid);
    voucher.paid_amount = newPaid;
    voucher.balance = newBalance;
    voucher.status = newBalance === 0 ? 'paid' : newPaid > 0 ? 'partial' : 'unpaid';
    voucher.paid_date = new Date().toISOString().split('T')[0];
    voucher.payment_method = method;
    return voucher;
  }

  // --- Timetable ---
  getTimetable(classId?: string, teacherId?: string) {
    let list = this.timetable;
    if (classId) list = list.filter((t) => t.class_id === classId);
    if (teacherId) list = list.filter((t) => t.teacher_id === teacherId);
    return list;
  }

  addTimetableSlot(data: Omit<TimetableSlot, 'id'>) {
    const newSlot: TimetableSlot = {
      ...data,
      id: `tt-${Date.now()}`,
    };
    this.timetable.push(newSlot);
    return newSlot;
  }

  deleteTimetableSlot(id: string) {
    this.timetable = this.timetable.filter((t) => t.id !== id);
    return true;
  }

  // --- Study Materials ---
  getStudyMaterials(classId?: string, subjectId?: string) {
    let list = this.studyMaterials;
    if (classId) list = list.filter((m) => m.class_id === classId);
    if (subjectId) list = list.filter((m) => m.subject_id === subjectId);
    return list;
  }

  addStudyMaterial(data: Omit<StudyMaterial, 'id' | 'uploaded_at'>) {
    const newMaterial: StudyMaterial = {
      ...data,
      id: `mat-${Date.now()}`,
      uploaded_at: new Date().toISOString().split('T')[0],
    };
    this.studyMaterials = [newMaterial, ...this.studyMaterials];
    return newMaterial;
  }

  deleteStudyMaterial(id: string) {
    this.studyMaterials = this.studyMaterials.filter((m) => m.id !== id);
    return true;
  }

  // --- Notices ---
  getNotices(targetAudience?: string) {
    let list = this.notices;
    if (targetAudience && targetAudience !== 'all') {
      list = list.filter((n) => n.target_audience === 'all' || n.target_audience === targetAudience);
    }
    return list;
  }

  addNotice(data: Omit<Notice, 'id' | 'created_at'>) {
    const newNotice: Notice = {
      ...data,
      id: `not-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
    };
    this.notices = [newNotice, ...this.notices];
    return newNotice;
  }

  deleteNotice(id: string) {
    this.notices = this.notices.filter((n) => n.id !== id);
    return true;
  }

  // --- Analytics ---
  getStudentAnalytics(studentId: string) {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) return null;
    return generateStudentAnalytics(
      student,
      this.students,
      this.classes,
      this.subjects,
      this.exams,
      this.marks,
      this.attendance
    );
  }
}

// Global singleton for serverless runtime
export const db = new BackendDatabase();
