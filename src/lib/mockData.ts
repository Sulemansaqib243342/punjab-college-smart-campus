import {
  ClassRoom,
  Subject,
  Teacher,
  Student,
  AttendanceRecord,
  Exam,
  MarkRecord,
  FeeStructure,
  FeeVoucher,
  TimetableSlot,
  StudyMaterial,
  Notice,
  AdmissionApplication,
  UserProfile,
} from '../types';

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: 'user-admin-1',
    email: 'admin@smartcampus.com',
    full_name: 'Prof. Dr. Muhammad Asif',
    role: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '+92 300 8472911',
    address: 'Campus Director Residence, Lahore',
  },
  {
    id: 'user-teacher-1',
    email: 'teacher@smartcampus.com',
    full_name: 'Sana Iqbal',
    role: 'teacher',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    phone: '+92 321 4455667',
    address: 'Gulshan-e-Ravi, Lahore',
  },
  {
    id: 'user-student-1',
    email: 'student@smartcampus.com',
    full_name: 'Ahmed Raza',
    role: 'student',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    phone: '+92 333 1234567',
    address: 'Shadbagh, Near Minar-e-Pakistan, Lahore',
  },
];

export const CLASSES_DATA: ClassRoom[] = [
  {
    id: 'cls-11-ics-a',
    name: '11th ICS-A',
    grade_level: '11th',
    section: 'A',
    group_name: 'ICS',
    room_no: 'Room 101 (CS Block)',
  },
  {
    id: 'cls-11-med-b',
    name: '11th Pre-Medical',
    grade_level: '11th',
    section: 'B',
    group_name: 'Pre-Medical',
    room_no: 'Room 104 (Bio Wing)',
  },
  {
    id: 'cls-12-eng-a',
    name: '12th Pre-Engineering',
    grade_level: '12th',
    section: 'A',
    group_name: 'Pre-Engineering',
    room_no: 'Room 202 (Senior Hall)',
  },
];

export const SUBJECTS_DATA: Subject[] = [
  { id: 'sub-cs', code: 'CS-101', name: 'Computer Science', groups: ['ICS'], credit_hours: 4 },
  { id: 'sub-math', code: 'MTH-102', name: 'Mathematics', groups: ['ICS', 'Pre-Engineering'], credit_hours: 4 },
  { id: 'sub-phy', code: 'PHY-103', name: 'Physics', groups: ['ICS', 'Pre-Engineering', 'Pre-Medical'], credit_hours: 4 },
  { id: 'sub-chem', code: 'CHM-104', name: 'Chemistry', groups: ['Pre-Engineering', 'Pre-Medical'], credit_hours: 4 },
  { id: 'sub-bio', code: 'BIO-105', name: 'Biology', groups: ['Pre-Medical'], credit_hours: 4 },
  { id: 'sub-eng', code: 'ENG-106', name: 'English Compulsory', groups: ['ICS', 'Pre-Medical', 'Pre-Engineering', 'Commerce', 'Arts'], credit_hours: 3 },
  { id: 'sub-urdu', code: 'URD-107', name: 'Urdu Compulsory', groups: ['ICS', 'Pre-Medical', 'Pre-Engineering', 'Commerce', 'Arts'], credit_hours: 3 },
  { id: 'sub-isl', code: 'ISL-108', name: 'Islamic Education', groups: ['ICS', 'Pre-Medical', 'Pre-Engineering', 'Commerce', 'Arts'], credit_hours: 2 },
  { id: 'sub-pak', code: 'PAK-109', name: 'Pakistan Studies', groups: ['ICS', 'Pre-Medical', 'Pre-Engineering', 'Commerce', 'Arts'], credit_hours: 2 },
];

export const TEACHERS_DATA: Teacher[] = [
  {
    id: 'tch-1',
    user_id: 'user-teacher-1',
    employee_id: 'PCL-TCH-01',
    full_name: 'Sana Iqbal',
    qualification: 'M.Phil Computer Science, PU',
    specialization: 'Artificial Intelligence, C++ & Database Systems',
    phone: '+92 321 4455667',
    email: 'teacher@smartcampus.com',
    joining_date: '2018-09-01',
    assigned_classes: ['cls-11-ics-a', 'cls-12-ics-a', 'cls-11-ics-b'],
    assigned_subjects: ['sub-cs'],
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  },
  {
    id: 'tch-2',
    employee_id: 'PCL-TCH-02',
    full_name: 'Dr. Ayesha Siddiqui',
    qualification: 'Ph.D Physics, Quaid-i-Azam University',
    specialization: 'Electromagnetism & Quantum Physics',
    phone: '+92 301 8899771',
    email: 'ayesha.siddiqui@smartcampus.com',
    joining_date: '2019-03-15',
    assigned_classes: ['cls-11-ics-a', 'cls-11-med-b', 'cls-12-eng-a'],
    assigned_subjects: ['sub-phy'],
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  },
  {
    id: 'tch-3',
    employee_id: 'PCL-TCH-03',
    full_name: 'Prof. Muhammad Rashid',
    qualification: 'M.Sc Mathematics, GC University Lahore',
    specialization: 'Calculus, Trigonometry & Coordinate Geometry',
    phone: '+92 300 4422118',
    email: 'rashid.math@smartcampus.com',
    joining_date: '2017-08-10',
    assigned_classes: ['cls-11-ics-a', 'cls-12-eng-a'],
    assigned_subjects: ['sub-math'],
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
  {
    id: 'tch-4',
    employee_id: 'PCL-TCH-04',
    full_name: 'Dr. Nargis Parveen',
    qualification: 'Ph.D Chemistry, Punjab University',
    specialization: 'Organic Chemistry & Thermodynamics',
    phone: '+92 332 5566778',
    email: 'nargis.chem@smartcampus.com',
    joining_date: '2019-11-01',
    assigned_classes: ['cls-11-med-b', 'cls-12-eng-a'],
    assigned_subjects: ['sub-chem'],
    photo_url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150',
  },
  {
    id: 'tch-5',
    employee_id: 'PCL-TCH-05',
    full_name: 'Prof. Zainab Fatima',
    qualification: 'M.Phil Molecular Biology, PU',
    specialization: 'Cell Biology, Genetics & Human Physiology',
    phone: '+92 345 6677889',
    email: 'zainab.bio@smartcampus.com',
    joining_date: '2020-02-01',
    assigned_classes: ['cls-11-med-b'],
    assigned_subjects: ['sub-bio'],
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
  },
  {
    id: 'tch-6',
    employee_id: 'PCL-TCH-06',
    full_name: 'Prof. Hamza Farooq',
    qualification: 'M.A English Literature, Kinnaird/PU',
    specialization: 'Modern English Prose, Grammar & Composition',
    phone: '+92 312 9900112',
    email: 'hamza.eng@smartcampus.com',
    joining_date: '2021-01-15',
    assigned_classes: ['cls-11-ics-a', 'cls-11-med-b', 'cls-12-eng-a'],
    assigned_subjects: ['sub-eng'],
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
  {
    id: 'tch-7',
    employee_id: 'PCL-TCH-07',
    full_name: 'Prof. Hafiz Bilal',
    qualification: 'M.A Islamic Studies & Gold Medalist',
    specialization: 'Islamic Ethics, Quranic Exegesis & Hadith',
    phone: '+92 305 1122334',
    email: 'bilal.islamiat@smartcampus.com',
    joining_date: '2016-09-01',
    assigned_classes: ['cls-11-ics-a', 'cls-11-med-b'],
    assigned_subjects: ['sub-isl'],
    photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
  },
  {
    id: 'tch-8',
    employee_id: 'PCL-TCH-08',
    full_name: 'Prof. Rehan Ali',
    qualification: 'M.Sc Computer Systems & Networking',
    specialization: 'Data Communications, Hardware & Python',
    phone: '+92 323 7788990',
    email: 'rehan.cs@smartcampus.com',
    joining_date: '2021-08-15',
    assigned_classes: ['cls-11-ics-a'],
    assigned_subjects: ['sub-cs'],
    photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
  },
  {
    id: 'tch-9',
    employee_id: 'PCL-TCH-09',
    full_name: 'Prof. Maryam Nawaz',
    qualification: 'M.Phil Chemistry, UET Lahore',
    specialization: 'Inorganic & Industrial Chemistry',
    phone: '+92 334 3344556',
    email: 'maryam.chem@smartcampus.com',
    joining_date: '2022-03-01',
    assigned_classes: ['cls-11-med-b', 'cls-12-eng-a'],
    assigned_subjects: ['sub-chem'],
    photo_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150',
  },
  {
    id: 'tch-10',
    employee_id: 'PCL-TCH-10',
    full_name: 'Prof. Usman Ghani',
    qualification: 'M.Phil Applied Mathematics, GCUL',
    specialization: 'Differential Equations & Linear Algebra',
    phone: '+92 308 9988776',
    email: 'usman.math@smartcampus.com',
    joining_date: '2020-09-01',
    assigned_classes: ['cls-12-eng-a'],
    assigned_subjects: ['sub-math'],
    photo_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
  },
  {
    id: 'tch-11',
    employee_id: 'PCL-TCH-11',
    full_name: 'Prof. Bushra Rehman',
    qualification: 'M.A Urdu Literature, Punjab University',
    specialization: 'Classical Urdu Poetry & Essay Stylistics',
    phone: '+92 315 6677881',
    email: 'bushra.urdu@smartcampus.com',
    joining_date: '2019-10-01',
    assigned_classes: ['cls-11-ics-a', 'cls-11-med-b', 'cls-12-eng-a'],
    assigned_subjects: ['sub-urdu', 'sub-pak'],
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
];

// Helper to generate 65 realistic Pakistani students
export function generateInitialStudents(): Student[] {
  const students: Student[] = [];

  // Class 1: 11th ICS-A (22 students)
  const icsNames = [
    { name: 'Ahmed Raza', father: 'Raza Ullah', bform: '35201-1234567-1', gender: 'Male' as const, isDemo: true },
    { name: 'Ali Raza', father: 'Raza Ullah', bform: '35201-2345678-3', gender: 'Male' as const },
    { name: 'Bilal Ahmed', father: 'Ahmed Saeed', bform: '35201-3456789-5', gender: 'Male' as const },
    { name: 'Usman Tariq', father: 'Tariq Mehmood', bform: '35201-4567890-7', gender: 'Male' as const },
    { name: 'Zainab Bibi', father: 'Muhammad Aslam', bform: '35201-5678901-2', gender: 'Female' as const },
    { name: 'Fatima Noor', father: 'Noor Muhammad', bform: '35201-6789012-4', gender: 'Female' as const },
    { name: 'Saad Ur Rehman', father: 'Abdul Rehman', bform: '35201-7890123-1', gender: 'Male' as const },
    { name: 'Hassan Ali', father: 'Liaquat Ali', bform: '35201-8901234-3', gender: 'Male' as const },
    { name: 'Omar Farooq', father: 'Farooq Azam', bform: '35201-9012345-5', gender: 'Male' as const },
    { name: 'Abdullah Shahid', father: 'Shahid Nadeem', bform: '35201-0123456-7', gender: 'Male' as const },
    { name: 'Ayesha Malik', father: 'Malik Zafar Iqbal', bform: '35201-1122334-6', gender: 'Female' as const },
    { name: 'Mahnoor Aslam', father: 'Muhammad Aslam', bform: '35201-2233445-8', gender: 'Female' as const },
    { name: 'Talha Zubair', father: 'Zubair Anwar', bform: '35201-3344556-9', gender: 'Male' as const },
    { name: 'Shahzaib Butt', father: 'Naeem Butt', bform: '35201-4455667-1', gender: 'Male' as const },
    { name: 'Daniyal Akram', father: 'Muhammad Akram', bform: '35201-5566778-3', gender: 'Male' as const },
    { name: 'Hamna Jamil', father: 'Jamil Ahmed', bform: '35201-6677889-2', gender: 'Female' as const },
    { name: 'Waleed Nasir', father: 'Nasir Mehmood', bform: '35201-7788990-5', gender: 'Male' as const },
    { name: 'Farhan Qureshi', father: 'Qureshi Ghulam', bform: '35201-8899001-7', gender: 'Male' as const }, // Defaulter / low attendance example
    { name: 'Zeeshan Haider', father: 'Haider Zaman', bform: '35201-9900112-9', gender: 'Male' as const },
    { name: 'Sana Tariq', father: 'Tariq Javed', bform: '35201-1029384-4', gender: 'Female' as const },
    { name: 'Haris Mehmood', father: 'Arshad Mehmood', bform: '35201-2130495-1', gender: 'Male' as const },
    { name: 'Kashif Munir', father: 'Munir Hussain', bform: '35201-3241506-3', gender: 'Male' as const },
  ];

  icsNames.forEach((item, index) => {
    const roll = `PCL-24-${(101 + index).toString().padStart(3, '0')}`;
    students.push({
      id: `std-ics-${index + 1}`,
      user_id: item.isDemo ? 'user-student-1' : undefined,
      roll_number: roll,
      admission_no: `ADM-2024-${(101 + index).toString().padStart(3, '0')}`,
      full_name: item.name,
      father_name: item.father,
      cnic_bform: item.bform,
      dob: '2008-04-12',
      gender: item.gender,
      blood_group: index % 4 === 0 ? 'O+' : index % 3 === 0 ? 'A+' : 'B+',
      phone: `+92 300 ${Math.floor(1000000 + Math.random() * 9000000)}`,
      email: item.isDemo ? 'student@smartcampus.com' : `${item.name.toLowerCase().replace(/[^a-z]/g, '')}@student.pgc.edu`,
      address: 'Minar-e-Pakistan Road, Lahore',
      class_id: 'cls-11-ics-a',
      group_name: 'ICS',
      admission_date: '2024-08-15',
      status: 'active',
      photo_url: item.gender === 'Male'
        ? `https://images.unsplash.com/photo-${1500000000000 + (index * 73921) % 10000000}?w=150`
        : `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150`,
    });
  });

  // Class 2: 11th Pre-Medical (22 students)
  const medNames = [
    { name: 'Aiman Zahra', father: 'Syed Zahid Hussain', bform: '35202-1111111-2', gender: 'Female' as const },
    { name: 'Nimra Tahir', father: 'Tahir Abbas', bform: '35202-2222222-4', gender: 'Female' as const },
    { name: 'Laiba Khalid', father: 'Khalid Mahmood', bform: '35202-3333333-6', gender: 'Female' as const },
    { name: 'Maryam Saeed', father: 'Saeed Anwar', bform: '35202-4444444-8', gender: 'Female' as const },
    { name: 'Moiz Ahmed', father: 'Ahmed Raza', bform: '35202-5555555-1', gender: 'Male' as const },
    { name: 'Subhan Ali', father: 'Muhammad Ali', bform: '35202-6666666-3', gender: 'Male' as const },
    { name: 'Hira Fatima', father: 'Fatima Dad', bform: '35202-7777777-2', gender: 'Female' as const },
    { name: 'Iqra Shafiq', father: 'Shafiq Ur Rehman', bform: '35202-8888888-4', gender: 'Female' as const },
    { name: 'Arham Tariq', father: 'Tariq Butt', bform: '35202-9999999-5', gender: 'Male' as const },
    { name: 'Eshaal Imran', father: 'Imran Khan', bform: '35202-1212121-6', gender: 'Female' as const },
    { name: 'Anum Javed', father: 'Javed Iqbal', bform: '35202-2323232-8', gender: 'Female' as const },
    { name: 'Tayyaba Riaz', father: 'Riaz Ahmed', bform: '35202-3434343-2', gender: 'Female' as const },
    { name: 'Rayan Mustafa', father: 'Ghulam Mustafa', bform: '35202-4545454-7', gender: 'Male' as const },
    { name: 'Khadija Abbas', father: 'Abbas Ali', bform: '35202-5656565-4', gender: 'Female' as const },
    { name: 'Wajiha Shakeel', father: 'Shakeel Ahmed', bform: '35202-6767676-6', gender: 'Female' as const },
    { name: 'Huzaifa Naeem', father: 'Naeem Akhtar', bform: '35202-7878787-9', gender: 'Male' as const },
    { name: 'Bisma Ashraf', father: 'Muhammad Ashraf', bform: '35202-8989898-2', gender: 'Female' as const },
    { name: 'Alishba Siddiqui', father: 'Siddiqui Latif', bform: '35202-9090909-4', gender: 'Female' as const },
    { name: 'Sameer Qasim', father: 'Qasim Ali', bform: '35202-0101010-1', gender: 'Male' as const },
    { name: 'Faryal Gul', father: 'Gul Muhammad', bform: '35202-1313131-8', gender: 'Female' as const },
    { name: 'Zohaib Hassan', father: 'Hassan Mir', bform: '35202-2424242-3', gender: 'Male' as const },
    { name: 'Adeel Akhtar', father: 'Akhtar Hussain', bform: '35202-3535353-5', gender: 'Male' as const },
  ];

  medNames.forEach((item, index) => {
    const roll = `PCL-24-${(201 + index).toString().padStart(3, '0')}`;
    students.push({
      id: `std-med-${index + 1}`,
      roll_number: roll,
      admission_no: `ADM-2024-${(201 + index).toString().padStart(3, '0')}`,
      full_name: item.name,
      father_name: item.father,
      cnic_bform: item.bform,
      dob: '2008-02-18',
      gender: item.gender,
      blood_group: 'B+',
      phone: `+92 313 ${Math.floor(1000000 + Math.random() * 9000000)}`,
      email: `${item.name.toLowerCase().replace(/[^a-z]/g, '')}@student.pgc.edu`,
      address: 'Ravi Road, Lahore',
      class_id: 'cls-11-med-b',
      group_name: 'Pre-Medical',
      admission_date: '2024-08-16',
      status: 'active',
      photo_url: item.gender === 'Male'
        ? `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150`
        : `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150`,
    });
  });

  // Class 3: 12th Pre-Engineering (21 students)
  const engNames = [
    { name: 'Ahmad Hassan', father: 'Hassan Raza', bform: '35203-1000001-1', gender: 'Male' as const },
    { name: 'Hammad Liaquat', father: 'Liaquat Ali Khan', bform: '35203-1000002-3', gender: 'Male' as const },
    { name: 'Taimoor Shah', father: 'Syed Shah Hussain', bform: '35203-1000003-5', gender: 'Male' as const },
    { name: 'Sheraz Afzal', father: 'Afzal Mehmood', bform: '35203-1000004-7', gender: 'Male' as const },
    { name: 'Nouman Bashir', father: 'Bashir Ahmed', bform: '35203-1000005-9', gender: 'Male' as const },
    { name: 'Faizan Cheema', father: 'Iftikhar Cheema', bform: '35203-1000006-1', gender: 'Male' as const },
    { name: 'Jawad Ullah', father: 'Hameed Ullah', bform: '35203-1000007-3', gender: 'Male' as const }, // Low attendance example
    { name: 'Asad Mehmood', father: 'Mehmood Ul Hassan', bform: '35203-1000008-5', gender: 'Male' as const },
    { name: 'Momin Bajwa', father: 'Sajid Bajwa', bform: '35203-1000009-7', gender: 'Male' as const },
    { name: 'Fahad Tanveer', father: 'Tanveer Ahmed', bform: '35203-1000010-9', gender: 'Male' as const },
    { name: 'Sarmad Waseem', father: 'Waseem Akram', bform: '35203-1000011-1', gender: 'Male' as const },
    { name: 'Rohail Anwar', father: 'Anwar Masood', bform: '35203-1000012-3', gender: 'Male' as const },
    { name: 'Affan Butt', father: 'Javed Butt', bform: '35203-1000013-5', gender: 'Male' as const },
    { name: 'Ahsan Bilal', father: 'Bilal Warraich', bform: '35203-1000014-7', gender: 'Male' as const },
    { name: 'Danish Nawaz', father: 'Nawaz Sharif Qureshi', bform: '35203-1000015-9', gender: 'Male' as const },
    { name: 'Shoaib Akhtar', father: 'Akhtar Rasul', bform: '35203-1000016-1', gender: 'Male' as const },
    { name: 'Umair Sohail', father: 'Sohail Tanvir', bform: '35203-1000017-3', gender: 'Male' as const },
    { name: 'Zubair Dar', father: 'Mansoor Dar', bform: '35203-1000018-5', gender: 'Male' as const },
    { name: 'Shahmir Khan', father: 'Jahangir Khan', bform: '35203-1000019-7', gender: 'Male' as const },
    { name: 'Awais Rauf', father: 'Abdul Rauf', bform: '35203-1000020-9', gender: 'Male' as const },
    { name: 'Nabeel Gujjar', father: 'Chaudhry Gujjar', bform: '35203-1000021-1', gender: 'Male' as const },
  ];

  engNames.forEach((item, index) => {
    const roll = `PCL-23-${(301 + index).toString().padStart(3, '0')}`;
    students.push({
      id: `std-eng-${index + 1}`,
      roll_number: roll,
      admission_no: `ADM-2023-${(301 + index).toString().padStart(3, '0')}`,
      full_name: item.name,
      father_name: item.father,
      cnic_bform: item.bform,
      dob: '2007-06-25',
      gender: item.gender,
      blood_group: 'A+',
      phone: `+92 346 ${Math.floor(1000000 + Math.random() * 9000000)}`,
      email: `${item.name.toLowerCase().replace(/[^a-z]/g, '')}@student.pgc.edu`,
      address: 'Shahdara Town, Lahore',
      class_id: 'cls-12-eng-a',
      group_name: 'Pre-Engineering',
      admission_date: '2023-08-20',
      status: 'active',
      photo_url: `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150`,
    });
  });

  return students;
}

// Generate 30 days of attendance
export function generateInitialAttendance(students: Student[]): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const baseDate = new Date();
  
  // Create 30 school days excluding Sundays
  const days: string[] = [];
  let cur = new Date(baseDate);
  cur.setDate(cur.getDate() - 1);
  while (days.length < 30) {
    if (cur.getDay() !== 0) { // Not Sunday
      days.unshift(cur.toISOString().split('T')[0]);
    }
    cur.setDate(cur.getDate() - 1);
  }

  students.forEach((student) => {
    // Determine student's base attendance profile
    // Farhan Qureshi and Jawad Ullah get low attendance (<75%)
    const isLowAttendance = student.full_name.includes('Farhan Qureshi') || student.full_name.includes('Jawad Ullah');
    const isHighAttendance = student.full_name.includes('Muhammad Hamza Khan') || student.full_name.includes('Aiman Zahra');

    days.forEach((dayStr, dIdx) => {
      let status: 'present' | 'absent' | 'leave' = 'present';
      const rand = (student.id.charCodeAt(student.id.length - 1) + dIdx * 7) % 100;

      if (isLowAttendance) {
        // Attendance ~ 68-70%
        if (rand < 25) status = 'absent';
        else if (rand < 32) status = 'leave';
        else status = 'present';
      } else if (isHighAttendance) {
        // Attendance ~ 93%
        if (rand < 5) status = 'absent';
        else if (rand < 8) status = 'leave';
        else status = 'present';
      } else {
        // Normal student attendance ~ 82-88%
        if (rand < 11) status = 'absent';
        else if (rand < 16) status = 'leave';
        else status = 'present';
      }

      records.push({
        id: `att-${student.id}-${dayStr}`,
        student_id: student.id,
        class_id: student.class_id,
        date: dayStr,
        status,
        marked_by: 'tch-1',
      });
    });
  });

  return records;
}

// Exams: 2 Completed Exams
export const EXAMS_DATA: Exam[] = [
  {
    id: 'exam-monthly-oct',
    name: 'Monthly Test - October 2024',
    exam_type: 'monthly',
    academic_year: '2024-2025',
    start_date: '2024-10-20',
    end_date: '2024-10-27',
    total_marks_per_subject: 50,
    is_published: true,
  },
  {
    id: 'exam-midterm-dec',
    name: 'Mid-Term Examination 2024',
    exam_type: 'midterm',
    academic_year: '2024-2025',
    start_date: '2024-12-05',
    end_date: '2024-12-16',
    total_marks_per_subject: 100,
    is_published: true,
  },
];

// Generate marks for all students for both exams
export function generateInitialMarks(students: Student[]): MarkRecord[] {
  const marks: MarkRecord[] = [];

  const classSubjects: Record<string, string[]> = {
    'cls-11-ics-a': ['sub-cs', 'sub-math', 'sub-phy', 'sub-eng', 'sub-urdu', 'sub-isl'],
    'cls-11-med-b': ['sub-bio', 'sub-chem', 'sub-phy', 'sub-eng', 'sub-urdu', 'sub-isl'],
    'cls-12-eng-a': ['sub-math', 'sub-chem', 'sub-phy', 'sub-eng', 'sub-urdu', 'sub-pak'],
  };

  students.forEach((student, sIdx) => {
    const subjects = classSubjects[student.class_id] || [];

    // Exam 1: Monthly Test (out of 50)
    subjects.forEach((subId, subIdx) => {
      // Deterministic realistic score
      const basePerformance = 35 + ((sIdx * 3 + subIdx * 5) % 14); // 35 to 48
      const isHamza = student.roll_number === 'PCL-24-101';
      const score = isHamza 
        ? (subId === 'sub-cs' ? 49 : subId === 'sub-math' ? 47 : subId === 'sub-phy' ? 45 : 43)
        : Math.min(50, Math.max(18, basePerformance));

      marks.push({
        id: `mk-oct-${student.id}-${subId}`,
        exam_id: 'exam-monthly-oct',
        student_id: student.id,
        subject_id: subId,
        class_id: student.class_id,
        marks_obtained: score,
        total_marks: 50,
      });
    });

    // Exam 2: Mid-Term Examination (out of 100)
    subjects.forEach((subId, subIdx) => {
      const basePerformance = 68 + ((sIdx * 7 + subIdx * 11) % 28); // 68 to 95
      const isHamza = student.roll_number === 'PCL-24-101';
      const score = isHamza
        ? (subId === 'sub-cs' ? 96 : subId === 'sub-math' ? 92 : subId === 'sub-phy' ? 88 : subId === 'sub-eng' ? 84 : 89)
        : Math.min(100, Math.max(38, basePerformance));

      marks.push({
        id: `mk-mid-${student.id}-${subId}`,
        exam_id: 'exam-midterm-dec',
        student_id: student.id,
        subject_id: subId,
        class_id: student.class_id,
        marks_obtained: score,
        total_marks: 100,
      });
    });
  });

  return marks;
}

// Fee Structures
export const FEE_STRUCTURES_DATA: FeeStructure[] = [
  {
    id: 'fs-ics',
    class_id: 'cls-11-ics-a',
    title: '11th ICS Fee Structure 2024-25',
    tuition_fee: 15500,
    lab_fee: 3000,
    library_fee: 1000,
    exam_fee: 1500,
    sports_fee: 1000,
    total_amount: 22000,
    due_day: 10,
  },
  {
    id: 'fs-med',
    class_id: 'cls-11-med-b',
    title: '11th Pre-Medical Fee Structure 2024-25',
    tuition_fee: 16000,
    lab_fee: 3500,
    library_fee: 1000,
    exam_fee: 1500,
    sports_fee: 1000,
    total_amount: 23000,
    due_day: 10,
  },
  {
    id: 'fs-eng',
    class_id: 'cls-12-eng-a',
    title: '12th Pre-Engineering Fee Structure 2024-25',
    tuition_fee: 16500,
    lab_fee: 3000,
    library_fee: 1000,
    exam_fee: 1500,
    sports_fee: 1000,
    total_amount: 23000,
    due_day: 10,
  },
];

// Generate Fee Vouchers
export function generateInitialFeeVouchers(students: Student[]): FeeVoucher[] {
  const vouchers: FeeVoucher[] = [];

  students.forEach((student, index) => {
    const isICS = student.class_id === 'cls-11-ics-a';
    const amount = isICS ? 22000 : 23000;
    
    // Status distribution: 70% paid, 18% unpaid, 12% partial
    let status: 'paid' | 'unpaid' | 'partial' = 'paid';
    let paidAmount = amount;
    let balance = 0;

    if (student.full_name.includes('Farhan Qureshi') || index % 7 === 0) {
      status = 'unpaid';
      paidAmount = 0;
      balance = amount;
    } else if (index % 5 === 0) {
      status = 'partial';
      paidAmount = 12000;
      balance = amount - 12000;
    }

    vouchers.push({
      id: `vch-nov-${student.id}`,
      voucher_no: `VCH-2024-11${(100 + index).toString()}`,
      student_id: student.id,
      class_id: student.class_id,
      month_year: 'November 2024',
      total_amount: amount,
      paid_amount: paidAmount,
      balance: balance,
      status: status,
      issue_date: '2024-11-01',
      due_date: '2024-11-15',
      paid_date: status === 'paid' ? '2024-11-08' : status === 'partial' ? '2024-11-09' : undefined,
      payment_method: status !== 'unpaid' ? 'Bank of Punjab' : undefined,
      fine: status === 'unpaid' ? 500 : 0,
    });
  });

  return vouchers;
}

// Timetable for Punjab College
export const TIMETABLE_DATA: TimetableSlot[] = [
  // 11th ICS-A Monday to Friday
  { id: 'tt-1', class_id: 'cls-11-ics-a', subject_id: 'sub-cs', teacher_id: 'tch-1', day_of_week: 'Monday', period_number: 1, start_time: '08:30 AM', end_time: '09:15 AM', room_no: 'CS Lab 1' },
  { id: 'tt-2', class_id: 'cls-11-ics-a', subject_id: 'sub-math', teacher_id: 'tch-3', day_of_week: 'Monday', period_number: 2, start_time: '09:20 AM', end_time: '10:05 AM', room_no: 'Room 101' },
  { id: 'tt-3', class_id: 'cls-11-ics-a', subject_id: 'sub-phy', teacher_id: 'tch-2', day_of_week: 'Monday', period_number: 3, start_time: '10:10 AM', end_time: '10:55 AM', room_no: 'Physics Lab' },
  { id: 'tt-4', class_id: 'cls-11-ics-a', subject_id: 'sub-eng', teacher_id: 'tch-6', day_of_week: 'Monday', period_number: 4, start_time: '11:25 AM', end_time: '12:10 PM', room_no: 'Room 101' },
  { id: 'tt-5', class_id: 'cls-11-ics-a', subject_id: 'sub-urdu', teacher_id: 'tch-11', day_of_week: 'Monday', period_number: 5, start_time: '12:15 PM', end_time: '01:00 PM', room_no: 'Room 101' },
  { id: 'tt-6', class_id: 'cls-11-ics-a', subject_id: 'sub-isl', teacher_id: 'tch-7', day_of_week: 'Monday', period_number: 6, start_time: '01:05 PM', end_time: '01:45 PM', room_no: 'Room 101' },

  { id: 'tt-7', class_id: 'cls-11-ics-a', subject_id: 'sub-math', teacher_id: 'tch-3', day_of_week: 'Tuesday', period_number: 1, start_time: '08:30 AM', end_time: '09:15 AM', room_no: 'Room 101' },
  { id: 'tt-8', class_id: 'cls-11-ics-a', subject_id: 'sub-cs', teacher_id: 'tch-1', day_of_week: 'Tuesday', period_number: 2, start_time: '09:20 AM', end_time: '10:05 AM', room_no: 'CS Lab 1' },
  { id: 'tt-9', class_id: 'cls-11-ics-a', subject_id: 'sub-phy', teacher_id: 'tch-2', day_of_week: 'Tuesday', period_number: 3, start_time: '10:10 AM', end_time: '10:55 AM', room_no: 'Physics Lab' },
  { id: 'tt-10', class_id: 'cls-11-ics-a', subject_id: 'sub-eng', teacher_id: 'tch-6', day_of_week: 'Tuesday', period_number: 4, start_time: '11:25 AM', end_time: '12:10 PM', room_no: 'Room 101' },
  { id: 'tt-11', class_id: 'cls-11-ics-a', subject_id: 'sub-urdu', teacher_id: 'tch-11', day_of_week: 'Tuesday', period_number: 5, start_time: '12:15 PM', end_time: '01:00 PM', room_no: 'Room 101' },

  { id: 'tt-12', class_id: 'cls-11-ics-a', subject_id: 'sub-cs', teacher_id: 'tch-8', day_of_week: 'Wednesday', period_number: 1, start_time: '08:30 AM', end_time: '09:15 AM', room_no: 'CS Lab 2' },
  { id: 'tt-13', class_id: 'cls-11-ics-a', subject_id: 'sub-phy', teacher_id: 'tch-2', day_of_week: 'Wednesday', period_number: 2, start_time: '09:20 AM', end_time: '10:05 AM', room_no: 'Physics Lab' },
  { id: 'tt-14', class_id: 'cls-11-ics-a', subject_id: 'sub-math', teacher_id: 'tch-3', day_of_week: 'Wednesday', period_number: 3, start_time: '10:10 AM', end_time: '10:55 AM', room_no: 'Room 101' },
  { id: 'tt-15', class_id: 'cls-11-ics-a', subject_id: 'sub-eng', teacher_id: 'tch-6', day_of_week: 'Wednesday', period_number: 4, start_time: '11:25 AM', end_time: '12:10 PM', room_no: 'Room 101' },

  // 11th Pre-Medical Monday
  { id: 'tt-16', class_id: 'cls-11-med-b', subject_id: 'sub-bio', teacher_id: 'tch-5', day_of_week: 'Monday', period_number: 1, start_time: '08:30 AM', end_time: '09:15 AM', room_no: 'Biology Lab' },
  { id: 'tt-17', class_id: 'cls-11-med-b', subject_id: 'sub-chem', teacher_id: 'tch-4', day_of_week: 'Monday', period_number: 2, start_time: '09:20 AM', end_time: '10:05 AM', room_no: 'Chemistry Lab' },
  { id: 'tt-18', class_id: 'cls-11-med-b', subject_id: 'sub-phy', teacher_id: 'tch-2', day_of_week: 'Monday', period_number: 3, start_time: '10:10 AM', end_time: '10:55 AM', room_no: 'Room 104' },
  
  // 12th Pre-Engineering Monday
  { id: 'tt-19', class_id: 'cls-12-eng-a', subject_id: 'sub-math', teacher_id: 'tch-10', day_of_week: 'Monday', period_number: 1, start_time: '08:30 AM', end_time: '09:15 AM', room_no: 'Room 202' },
  { id: 'tt-20', class_id: 'cls-12-eng-a', subject_id: 'sub-phy', teacher_id: 'tch-2', day_of_week: 'Monday', period_number: 2, start_time: '09:20 AM', end_time: '10:05 AM', room_no: 'Room 202' },
  { id: 'tt-21', class_id: 'cls-12-eng-a', subject_id: 'sub-chem', teacher_id: 'tch-9', day_of_week: 'Monday', period_number: 3, start_time: '10:10 AM', end_time: '10:55 AM', room_no: 'Room 202' },
];

// Study Materials
export const STUDY_MATERIALS_DATA: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'ICS Part-1 Computer Science: Chapter 1 & 2 Comprehensive Revision Notes',
    description: 'Detailed overview of Hardware, Software, System Bus, and Memory architecture with solved Board exercise questions.',
    class_id: 'cls-11-ics-a',
    subject_id: 'sub-cs',
    teacher_id: 'tch-1',
    teacher_name: 'Prof. Tariq Mahmood',
    file_url: 'https://example.com/materials/ics_cs_ch1_ch2.pdf',
    file_type: 'pdf',
    file_size: '3.4 MB',
    created_at: '2024-11-10',
  },
  {
    id: 'mat-2',
    title: 'Physics 11th: Vectors, Equilibrium & Motion Formulas Cheat Sheet',
    description: 'Complete mathematical formula compilation, derivation tips and short questions for Board Exam preparation.',
    class_id: 'cls-11-ics-a',
    subject_id: 'sub-phy',
    teacher_id: 'tch-2',
    teacher_name: 'Dr. Ayesha Siddiqui',
    file_url: 'https://example.com/materials/physics_ch2_ch3_cheatsheet.pdf',
    file_type: 'pdf',
    file_size: '1.8 MB',
    created_at: '2024-11-12',
  },
  {
    id: 'mat-3',
    title: 'Mathematics 11th: Quadratic Equations & Matrices Board Solved Questions',
    description: 'Selected tricky problems from Exercises 3.3, 4.4 and 4.7 solved step-by-step.',
    class_id: 'cls-11-ics-a',
    subject_id: 'sub-math',
    teacher_id: 'tch-3',
    teacher_name: 'Prof. Muhammad Rashid',
    file_url: 'https://example.com/materials/math_matrices_quadratics.pdf',
    file_type: 'pdf',
    file_size: '4.1 MB',
    created_at: '2024-11-05',
  },
  {
    id: 'mat-4',
    title: 'Biology 11th: Cell Biology & Biomolecules High-Yield Diagram Guide',
    description: 'Hand-drawn labeled diagrams for Endoplasmic Reticulum, Mitochondria, and DNA replication mechanisms.',
    class_id: 'cls-11-med-b',
    subject_id: 'sub-bio',
    teacher_id: 'tch-5',
    teacher_name: 'Prof. Zainab Fatima',
    file_url: 'https://example.com/materials/bio_cell_diagrams.pdf',
    file_type: 'pdf',
    file_size: '5.2 MB',
    created_at: '2024-11-08',
  },
  {
    id: 'mat-5',
    title: 'Chemistry 11th: Chemical Bonding & Gases Law Solved Numericals',
    description: 'Ideal gas equation, Dalton law and VSEPR theory practice worksheets with answer keys.',
    class_id: 'cls-11-med-b',
    subject_id: 'sub-chem',
    teacher_id: 'tch-4',
    teacher_name: 'Dr. Nargis Parveen',
    file_url: 'https://example.com/materials/chem_bonding_numericals.pdf',
    file_type: 'pdf',
    file_size: '2.9 MB',
    created_at: '2024-11-14',
  },
  {
    id: 'mat-6',
    title: 'English 11th: Short Stories & Plays Theme Analysis and Essay Outlines',
    description: 'Button Button, Clearing in the Sky, and Dark They Were with past board references.',
    class_id: 'cls-11-ics-a',
    subject_id: 'sub-eng',
    teacher_id: 'tch-6',
    teacher_name: 'Prof. Hamza Farooq',
    file_url: 'https://example.com/materials/eng_short_stories_essays.pdf',
    file_type: 'pdf',
    file_size: '1.2 MB',
    created_at: '2024-11-15',
  },
];

// 8 Notices
export const NOTICES_DATA: Notice[] = [
  {
    id: 'not-1',
    title: '🚨 Urgent: Smog Advisory & Revised Campus Timings',
    content: 'In compliance with Government of the Punjab Environmental Department orders, morning assembly timings are revised to 08:30 AM. All students and faculty are strictly instructed to wear face masks inside campus premises.',
    category: 'urgent',
    target_audience: 'all',
    is_pinned: true,
    posted_by_name: 'Prof. Dr. Muhammad Asif (Director)',
    date: '2024-11-18',
  },
  {
    id: 'not-2',
    title: 'Mid-Term Examinations 2024 Date Sheet & Roll Number Slips',
    content: 'Mid-Term Examinations will commence from 5th December 2024. Detailed subject-wise date sheets and roll number slips are now available on the Smart Campus student portal and notice boards.',
    category: 'exam',
    target_audience: 'students',
    is_pinned: true,
    posted_by_name: 'Controller of Examinations',
    date: '2024-11-16',
  },
  {
    id: 'not-3',
    title: 'Tuition Fee Due Date Notice - November 2024',
    content: 'Students are advised to deposit their monthly tuition fee vouchers by 15th November at designated branches of Bank of Punjab or through mobile banking. Late fine will apply after due date.',
    category: 'general',
    target_audience: 'students',
    is_pinned: false,
    posted_by_name: 'Accounts Office',
    date: '2024-11-10',
  },
  {
    id: 'not-4',
    title: 'Annual Punjab College Sports Gala 2024 Registrations',
    content: 'Inter-house cricket, badminton, football, and table tennis trials will begin on Monday. Interested students can register with their respective physical education directors by Friday.',
    category: 'sports',
    target_audience: 'students',
    is_pinned: false,
    posted_by_name: 'Director Physical Education',
    date: '2024-11-14',
  },
  {
    id: 'not-5',
    title: 'BISE Lahore Board Intermediate Registration Deadline',
    content: 'All 11th class students must submit their B-Form photocopies, father CNIC, and 4 passport size blue-background photographs to the Student Affairs Desk for official Board Registration.',
    category: 'general',
    target_audience: 'class',
    class_id: 'cls-11-ics-a',
    is_pinned: false,
    posted_by_name: 'Student Affairs Department',
    date: '2024-11-12',
  },
  {
    id: 'not-6',
    title: 'Artificial Intelligence & Python Hands-on Workshop',
    content: 'Department of Computer Science is hosting a weekend coding workshop on Modern Python and AI prompt engineering on Saturday at 11:00 AM in Computer Lab 1. Certificates will be awarded.',
    category: 'general',
    target_audience: 'students',
    is_pinned: false,
    posted_by_name: 'Prof. Tariq Mahmood (Head CS)',
    date: '2024-11-13',
  },
  {
    id: 'not-7',
    title: 'Iqbal Day Holiday Notice (9th November)',
    content: 'Punjab College Minar-e-Pakistan Campus will remain closed on Saturday, 9th November on the occasion of Iqbal Day. Regular classes will resume on Monday.',
    category: 'holiday',
    target_audience: 'all',
    is_pinned: false,
    posted_by_name: 'Administration Office',
    date: '2024-11-07',
  },
  {
    id: 'not-8',
    title: 'New Scientific Reference Books in Main College Library',
    content: 'The library has added latest editions of Resnick Halliday Physics, Thomas Calculus, and Campbell Biology. Students may borrow them using their smart college ID cards.',
    category: 'general',
    target_audience: 'all',
    is_pinned: false,
    posted_by_name: 'Chief Librarian',
    date: '2024-11-04',
  },
];

// Sample Online Admission Applications
export const ADMISSIONS_DATA: AdmissionApplication[] = [
  {
    id: 'adm-app-1',
    applicant_name: 'Zainab Rauf',
    father_name: 'Abdul Rauf Chaudhry',
    cnic_bform: '35201-9876543-2',
    dob: '2008-05-14',
    gender: 'Female',
    contact: '+92 301 7766554',
    email: 'zainab.rauf@gmail.com',
    address: 'Near Minar-e-Pakistan Circular Road, Lahore',
    previous_marks: 1024,
    total_marks: 1100,
    percentage: 93.1,
    previous_board: 'BISE Lahore',
    group_name: 'Pre-Medical',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    status: 'pending',
    applied_date: '2024-11-15',
  },
  {
    id: 'adm-app-2',
    applicant_name: 'Shahzaib Khan',
    father_name: 'Muhammad Tariq Khan',
    cnic_bform: '35202-8765432-1',
    dob: '2008-09-21',
    gender: 'Male',
    contact: '+92 322 4433221',
    email: 'shahzaib.khan@gmail.com',
    address: 'Baghbanpura, GT Road, Lahore',
    previous_marks: 968,
    total_marks: 1100,
    percentage: 88.0,
    previous_board: 'BISE Lahore',
    group_name: 'ICS',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'pending',
    applied_date: '2024-11-16',
  },
  {
    id: 'adm-app-3',
    applicant_name: 'Bilal Tariq',
    father_name: 'Tariq Javed',
    cnic_bform: '35201-3456781-3',
    dob: '2008-01-10',
    gender: 'Male',
    contact: '+92 300 8877665',
    email: 'bilal.tariq@gmail.com',
    address: 'Gulshan-e-Ravi, Lahore',
    previous_marks: 995,
    total_marks: 1100,
    percentage: 90.45,
    previous_board: 'BISE Gujranwala',
    group_name: 'Pre-Engineering',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'approved',
    applied_date: '2024-11-12',
    roll_number_assigned: 'PCL-24-123',
    remarks: 'Approved on merit. Fee voucher generated.',
  },
  {
    id: 'adm-app-4',
    applicant_name: 'Mahnoor Farooq',
    father_name: 'Farooq Azam',
    cnic_bform: '35201-6543210-4',
    dob: '2008-07-30',
    gender: 'Female',
    contact: '+92 333 5544332',
    email: 'mahnoor.farooq@outlook.com',
    address: 'Misri Shah, Lahore',
    previous_marks: 890,
    total_marks: 1100,
    percentage: 80.9,
    previous_board: 'BISE Lahore',
    group_name: 'ICS',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'pending',
    applied_date: '2024-11-17',
  },
  {
    id: 'adm-app-5',
    applicant_name: 'Hamza Butt',
    father_name: 'Naeem Butt',
    cnic_bform: '35201-1122998-1',
    dob: '2007-11-05',
    gender: 'Male',
    contact: '+92 312 3322114',
    email: 'hamza.butt@gmail.com',
    address: 'Badami Bagh, Lahore',
    previous_marks: 540,
    total_marks: 1100,
    percentage: 49.09,
    previous_board: 'BISE Rawalpindi',
    group_name: 'Commerce',
    status: 'rejected',
    applied_date: '2024-11-10',
    remarks: 'Does not meet minimum 60% eligibility criteria for intermediate admission.',
  },
];

