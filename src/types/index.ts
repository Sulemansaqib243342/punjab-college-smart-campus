export type UserRole = 'admin' | 'teacher' | 'student';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  address?: string;
}

export type AcademicGroup = 'Pre-Medical' | 'Pre-Engineering' | 'ICS' | 'Commerce' | 'Arts';

export interface ClassRoom {
  id: string;
  name: string; // e.g. "11th ICS-A"
  grade_level: '11th' | '12th';
  section: string;
  group_name: AcademicGroup;
  room_no: string;
}

export interface Subject {
  id: string;
  code: string; // e.g. "PHY-11"
  name: string; // e.g. "Physics"
  groups: AcademicGroup[];
  credit_hours: number;
}

export interface Student {
  id: string;
  user_id?: string;
  roll_number: string; // e.g. "PCL-24-101"
  admission_no: string; // e.g. "ADM-2024-001"
  full_name: string;
  father_name: string;
  cnic_bform: string;
  dob: string;
  gender: 'Male' | 'Female';
  blood_group?: string;
  phone: string;
  email: string;
  address: string;
  class_id: string;
  group_name: AcademicGroup;
  admission_date: string;
  status: 'active' | 'struck_off' | 'graduated';
  photo_url: string;
}

export interface Teacher {
  id: string;
  user_id?: string;
  employee_id: string; // e.g. "TCH-202"
  full_name: string;
  qualification: string; // e.g. "M.Phil Computer Science, PU"
  specialization: string; // e.g. "Artificial Intelligence & Database Systems"
  phone: string;
  email: string;
  joining_date: string;
  assigned_classes: string[]; // class IDs
  assigned_subjects: string[]; // subject IDs
  photo_url: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'leave';

export interface AttendanceRecord {
  id: string;
  student_id: string;
  class_id: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  marked_by?: string;
  remarks?: string;
}

export type ExamType = 'monthly' | 'midterm' | 'final';

export interface Exam {
  id: string;
  name: string; // e.g. "Mid-Term Examination 2024"
  exam_type: ExamType;
  academic_year: string;
  start_date: string;
  end_date: string;
  total_marks_per_subject: number;
  is_published: boolean;
}

export interface MarkRecord {
  id: string;
  exam_id: string;
  student_id: string;
  subject_id: string;
  class_id: string;
  marks_obtained: number;
  total_marks: number;
  remarks?: string;
}

export interface StudentResultSummary {
  student: Student;
  exam: Exam;
  class_room: ClassRoom;
  marks: {
    subject: Subject;
    marks_obtained: number;
    total_marks: number;
    percentage: number;
    grade: string;
    status: 'Pass' | 'Fail';
  }[];
  total_obtained: number;
  total_maximum: number;
  overall_percentage: number;
  overall_grade: string;
  status: 'Pass' | 'Fail';
  rank: number;
  total_students_in_class: number;
}

export interface FeeStructure {
  id: string;
  class_id: string;
  title: string;
  tuition_fee: number;
  lab_fee: number;
  library_fee: number;
  exam_fee: number;
  sports_fee: number;
  total_amount: number;
  due_day: number;
}

export type FeeStatus = 'paid' | 'unpaid' | 'partial';

export interface FeeVoucher {
  id: string;
  voucher_no: string; // e.g. "VCH-2024-1101"
  student_id: string;
  class_id: string;
  month_year: string; // e.g. "November 2024"
  total_amount: number;
  paid_amount: number;
  balance: number;
  status: FeeStatus;
  issue_date: string;
  due_date: string;
  paid_date?: string;
  payment_method?: 'Bank of Punjab' | 'HBL' | 'JazzCash' | 'Cash Counter';
  fine: number;
}

export interface TimetableSlot {
  id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period_number: number;
  start_time: string; // e.g. "08:30 AM"
  end_time: string;   // e.g. "09:20 AM"
  room_no: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  teacher_name: string;
  file_url: string;
  file_type: 'pdf' | 'doc' | 'slides' | 'link';
  file_size?: string;
  created_at: string;
}

export type NoticeCategory = 'general' | 'exam' | 'holiday' | 'urgent' | 'sports';
export type NoticeAudience = 'all' | 'teachers' | 'students' | 'class';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  target_audience: NoticeAudience;
  class_id?: string;
  is_pinned: boolean;
  posted_by_name: string;
  date: string;
}

export type AdmissionStatus = 'pending' | 'approved' | 'rejected';

export interface AdmissionApplication {
  id: string;
  applicant_name: string;
  father_name: string;
  cnic_bform: string;
  dob: string;
  gender: 'Male' | 'Female';
  contact: string;
  email: string;
  address: string;
  previous_marks: number;
  total_marks: number;
  percentage: number;
  previous_board: string;
  group_name: AcademicGroup;
  photo_url?: string;
  status: AdmissionStatus;
  applied_date: string;
  roll_number_assigned?: string;
  remarks?: string;
}

