import { Student, Exam, MarkRecord, Subject, AttendanceRecord, ClassRoom } from '../types';

export interface SubjectPerformance {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  classAverage: number;
  grade: string;
}

export interface ProgressTrendPoint {
  examName: string;
  examType: string;
  percentage: number;
  totalObtained: number;
  totalMax: number;
}

export interface StudentAnalyticsReport {
  student: Student;
  classRoom: ClassRoom;
  subjectPerformances: SubjectPerformance[];
  progressTrend: ProgressTrendPoint[];
  overallPercentage: number;
  overallGrade: string;
  classRank: number;
  totalStudentsInClass: number;
  attendanceRate: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  attendanceWarning: boolean;
  strengths: string[];
  weaknesses: string[];
  aiRemarks: string;
  recommendations: string[];
}

export function generateStudentAnalytics(
  student: Student,
  allStudents: Student[],
  classes: ClassRoom[],
  subjects: Subject[],
  exams: Exam[],
  allMarks: MarkRecord[],
  allAttendance: AttendanceRecord[]
): StudentAnalyticsReport {
  const classRoom = classes.find((c) => c.id === student.class_id) || {
    id: student.class_id,
    name: 'Class',
    grade_level: '11th',
    section: 'A',
    group_name: student.group_name,
    room_no: '101',
  };

  // 1. Attendance analytics
  const studentAtt = allAttendance.filter((a) => a.student_id === student.id);
  const totalDays = studentAtt.length || 30;
  const presentDays = studentAtt.filter((a) => a.status === 'present').length;
  const absentDays = studentAtt.filter((a) => a.status === 'absent').length;
  const leaveDays = studentAtt.filter((a) => a.status === 'leave').length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 85;
  const attendanceWarning = attendanceRate < 75;

  // 2. Latest Exam performance (e.g. Mid-Term)
  const latestExam = exams.find((e) => e.exam_type === 'midterm') || exams[exams.length - 1];
  const latestMarks = allMarks.filter((m) => m.student_id === student.id && m.exam_id === latestExam?.id);

  // Class students
  const classStudents = allStudents.filter((s) => s.class_id === student.class_id);

  // Subject Performances for latest exam
  const subjectPerformances: SubjectPerformance[] = [];
  let totalObtained = 0;
  let totalMax = 0;

  latestMarks.forEach((m) => {
    const sub = subjects.find((s) => s.id === m.subject_id);
    const subName = sub ? sub.name : 'Subject';
    const subCode = sub ? sub.code : 'SUB';
    const pct = Math.round((m.marks_obtained / m.total_marks) * 100);

    // Compute class average for this subject
    const allSubMarks = allMarks.filter((mk) => mk.exam_id === latestExam.id && mk.subject_id === m.subject_id && mk.class_id === student.class_id);
    const classAvg = allSubMarks.length > 0
      ? Math.round(allSubMarks.reduce((acc, curr) => acc + (curr.marks_obtained / curr.total_marks) * 100, 0) / allSubMarks.length)
      : 70;

    let grade = 'B';
    if (pct >= 80) grade = 'A+';
    else if (pct >= 70) grade = 'A';
    else if (pct >= 60) grade = 'B';
    else if (pct >= 50) grade = 'C';
    else if (pct >= 40) grade = 'D';
    else grade = 'F';

    totalObtained += m.marks_obtained;
    totalMax += m.total_marks;

    subjectPerformances.push({
      subjectId: m.subject_id,
      subjectCode: subCode,
      subjectName: subName,
      marksObtained: m.marks_obtained,
      totalMarks: m.total_marks,
      percentage: pct,
      classAverage: classAvg,
      grade,
    });
  });

  const overallPercentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
  let overallGrade = 'B';
  if (overallPercentage >= 80) overallGrade = 'A+';
  else if (overallPercentage >= 70) overallGrade = 'A';
  else if (overallPercentage >= 60) overallGrade = 'B';
  else if (overallPercentage >= 50) overallGrade = 'C';
  else if (overallPercentage >= 40) overallGrade = 'D';
  else overallGrade = 'F';

  // 3. Compute Class Rank in latest exam
  const classScores = classStudents.map((cs) => {
    const csMarks = allMarks.filter((m) => m.student_id === cs.id && m.exam_id === latestExam.id);
    const csObtained = csMarks.reduce((acc, curr) => acc + curr.marks_obtained, 0);
    const csMax = csMarks.reduce((acc, curr) => acc + curr.total_marks, 0);
    return {
      studentId: cs.id,
      pct: csMax > 0 ? (csObtained / csMax) * 100 : 0,
    };
  });
  classScores.sort((a, b) => b.pct - a.pct);
  const rankIndex = classScores.findIndex((cs) => cs.studentId === student.id);
  const classRank = rankIndex !== -1 ? rankIndex + 1 : 1;

  // 4. Progress Trend Across Exams
  const progressTrend: ProgressTrendPoint[] = exams.map((exam) => {
    const eMarks = allMarks.filter((m) => m.student_id === student.id && m.exam_id === exam.id);
    const eObt = eMarks.reduce((acc, curr) => acc + curr.marks_obtained, 0);
    const eMax = eMarks.reduce((acc, curr) => acc + curr.total_marks, 0);
    const pct = eMax > 0 ? Math.round((eObt / eMax) * 100) : 0;
    return {
      examName: exam.name.replace('Examination', 'Exam'),
      examType: exam.exam_type,
      percentage: pct,
      totalObtained: eObt,
      totalMax: eMax,
    };
  });

  // 5. Strengths & Weaknesses
  const sortedSubjects = [...subjectPerformances].sort((a, b) => b.percentage - a.percentage);
  const strengths = sortedSubjects
    .filter((s) => s.percentage >= 75)
    .map((s) => `${s.subjectName} (${s.percentage}%)`);
  
  if (strengths.length === 0 && sortedSubjects.length > 0) {
    strengths.push(`${sortedSubjects[0].subjectName} (${sortedSubjects[0].percentage}%)`);
  }

  const weaknesses = sortedSubjects
    .filter((s) => s.percentage < 65)
    .map((s) => `${s.subjectName} (${s.percentage}%)`);

  if (weaknesses.length === 0 && sortedSubjects.length > 1) {
    const lowest = sortedSubjects[sortedSubjects.length - 1];
    weaknesses.push(`${lowest.subjectName} (${lowest.percentage}%)`);
  }

  // 6. AI-style Remarks Engine
  let aiRemarks = '';
  const recommendations: string[] = [];

  const topSubject = sortedSubjects[0]?.subjectName || 'Core subjects';
  const lowestSubject = sortedSubjects[sortedSubjects.length - 1]?.subjectName || 'Subsidiary subjects';

  if (overallPercentage >= 85) {
    aiRemarks = `Outstanding academic prowess demonstrated across both theoretical and numerical coursework. Demonstrated exceptional mastery in ${topSubject}. Classroom engagement and conceptual clarity are exemplary. Highly capable of securing a top position in BISE Lahore Board examinations.`;
    recommendations.push(`Continue challenging yourself with advanced past-paper model papers.`);
    recommendations.push(`Participate in Punjab College inter-campus academic Olympiads and mentoring peers.`);
  } else if (overallPercentage >= 70) {
    aiRemarks = `Solid and commendable academic standing with commendable capability in ${topSubject}. Performance is consistently above class average, though focused reinforcement in ${lowestSubject} is required to elevate aggregate standing into the A+ tier.`;
    recommendations.push(`Allocate an additional 45 minutes daily to problem sets in ${lowestSubject}.`);
    recommendations.push(`Utilize faculty office hours and weekend remedial review lectures.`);
  } else if (overallPercentage >= 50) {
    aiRemarks = `Moderate academic performance. Exhibits foundational understanding in ${topSubject}, but struggles with depth in ${lowestSubject}. Regular homework completion and consistent study schedules are strongly advised.`;
    recommendations.push(`Mandatory attendance in after-college remedial coaching clinics.`);
    recommendations.push(`Maintain strict revision logs signed weekly by subject teachers.`);
  } else {
    aiRemarks = `Academic warning: Overall aggregate is below college benchmark. Immediate parent-teacher consultation is imperative. Gaps in fundamental concepts across multiple subjects need urgent intervention.`;
    recommendations.push(`Daily mandatory supervised study hall attendance.`);
    recommendations.push(`One-on-one diagnostic assessment with academic counselor.`);
  }

  if (attendanceWarning) {
    aiRemarks += ` Note: Critical attendance deficit detected (${attendanceRate}%). Under Punjab Board bylaws, students below 75% are ineligible for board roll number slips.`;
    recommendations.push(`Urgent: Submit leave regularization and attend Saturday makeup classes to cover the attendance deficit.`);
  } else if (attendanceRate >= 90) {
    aiRemarks += ` Excellent attendance record (${attendanceRate}%) reflects laudable self-discipline and consistency.`;
  }

  return {
    student,
    classRoom,
    subjectPerformances,
    progressTrend,
    overallPercentage,
    overallGrade,
    classRank,
    totalStudentsInClass: classStudents.length,
    attendanceRate,
    totalDays,
    presentDays,
    absentDays,
    leaveDays,
    attendanceWarning,
    strengths,
    weaknesses,
    aiRemarks,
    recommendations,
  };
}

