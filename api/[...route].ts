import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db, isSupabaseBackendEnabled } from './_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { route } = req.query;
  const segments = Array.isArray(route) ? route : typeof route === 'string' ? [route] : [];
  const endpoint = segments[0]?.toLowerCase() || '';
  const sub = segments[1] || '';

  try {
    // 1. HEALTH CHECK: /api/health
    if (endpoint === 'health') {
      return res.status(200).json({
        status: 'online',
        institution: 'Punjab Colleges, Minar-e-Pakistan Campus Lahore',
        engine: 'Unified Serverless REST Engine',
        supabaseConnected: isSupabaseBackendEnabled,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. AUTH: /api/auth/login
    if (endpoint === 'auth') {
      if (sub === 'login' && req.method === 'POST') {
        const { email, password } = req.body || {};
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password required' });
        }

        const cleanEmail = email.toLowerCase().trim();
        const normalized = cleanEmail.replace('@smartcampus.demo', '@smartcampus.com');

        const profile = db.profiles.find(
          (p) => p.email.toLowerCase() === cleanEmail || p.email.toLowerCase() === normalized
        );
        if (profile) {
          return res.status(200).json({
            success: true,
            user: profile,
            role: profile.role,
            token: `jwt_demo_${profile.id}_${Date.now()}`,
          });
        }

        const std = db.students.find((s) => s.email.toLowerCase() === email.toLowerCase());
        if (std) {
          return res.status(200).json({
            success: true,
            user: {
              id: std.id,
              email: std.email,
              full_name: std.full_name,
              role: 'student',
              avatar_url: std.photo_url,
              phone: std.phone,
              address: std.address,
            },
            role: 'student',
            token: `jwt_std_${std.id}_${Date.now()}`,
          });
        }

        return res.status(401).json({
          success: false,
          error: 'Invalid credentials. Please use demo credentials.',
        });
      }
      return res.status(404).json({ error: 'Auth route not found' });
    }

    // 3. ADMISSIONS: /api/admissions & /api/admissions/approve
    if (endpoint === 'admissions') {
      if (sub === 'approve' && req.method === 'POST') {
        const { applicationId } = req.body || {};
        if (!applicationId) return res.status(400).json({ error: 'applicationId is required' });
        const result = db.approveAdmission(applicationId);
        return res.status(200).json({ success: true, message: 'Admission approved', data: result });
      }

      if (req.method === 'GET') {
        const { status } = req.query;
        const apps = db.getAdmissions(typeof status === 'string' ? status : undefined);
        return res.status(200).json({ success: true, count: apps.length, applications: apps });
      }

      if (req.method === 'POST') {
        const body = req.body;
        if (!body?.applicant_name || !body?.cnic_bform || !body?.group_name) {
          return res.status(400).json({ error: 'Missing required admission fields' });
        }
        const newApp = db.submitAdmission({
          applicant_name: body.applicant_name,
          father_name: body.father_name || 'Father Name',
          cnic_bform: body.cnic_bform,
          dob: body.dob || '2008-05-15',
          gender: body.gender || 'Male',
          contact: body.contact || '+92 300 0000000',
          email: body.email || 'applicant@student.pgc.edu',
          address: body.address || 'Lahore, Pakistan',
          previous_marks: Number(body.previous_marks || 900),
          total_marks: Number(body.total_marks || 1100),
          percentage: Number(body.percentage || 81.8),
          previous_board: body.previous_board || 'BISE Lahore',
          group_name: body.group_name,
          photo_url: body.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        });
        return res.status(201).json({ success: true, application: newApp });
      }
    }

    // 4. STUDENTS: /api/students & /api/students/:id
    if (endpoint === 'students') {
      const studentId = sub || (typeof req.query.id === 'string' ? req.query.id : '');

      if (studentId) {
        if (req.method === 'GET') {
          const student = db.getStudentById(studentId);
          if (!student) return res.status(404).json({ error: 'Student not found' });
          return res.status(200).json({ success: true, student });
        }
        if (req.method === 'PUT') {
          const updated = db.updateStudent(studentId, req.body || {});
          return res.status(200).json({ success: true, student: updated });
        }
        if (req.method === 'DELETE') {
          db.deleteStudent(studentId);
          return res.status(200).json({ success: true, message: 'Student deleted' });
        }
      }

      if (req.method === 'GET') {
        const { class_id, group, search } = req.query;
        const students = db.getStudents(
          typeof class_id === 'string' ? class_id : undefined,
          typeof group === 'string' ? group : undefined,
          typeof search === 'string' ? search : undefined
        );
        return res.status(200).json({ success: true, count: students.length, students });
      }

      if (req.method === 'POST') {
        const body = req.body;
        if (!body?.full_name || !body?.class_id || !body?.group_name) {
          return res.status(400).json({ error: 'Missing required student fields' });
        }
        const groupCount = db.students.filter((s) => s.group_name === body.group_name).length;
        const prefix = body.group_name === 'ICS' ? '1' : body.group_name === 'Pre-Medical' ? '2' : '3';
        const rollNumber = body.roll_number || `PCL-24-${prefix}${(groupCount + 60).toString().padStart(2, '0')}`;

        const newStudent = db.addStudent({
          roll_number: rollNumber,
          full_name: body.full_name,
          father_name: body.father_name || 'Father Name',
          cnic_bform: body.cnic_bform || '35202-0000000-1',
          dob: body.dob || '2007-01-01',
          gender: body.gender || 'Male',
          blood_group: body.blood_group || 'O+',
          phone: body.phone || '+92 300 1234567',
          email: body.email || `std.${Date.now()}@student.pgc.edu`,
          address: body.address || 'Lahore, Pakistan',
          class_id: body.class_id,
          group_name: body.group_name,
          admission_date: body.admission_date || new Date().toISOString().split('T')[0],
          status: body.status || 'active',
          photo_url: body.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        });
        return res.status(201).json({ success: true, student: newStudent });
      }

      if (req.method === 'PUT') {
        const { id, ...updates } = req.body || {};
        if (!id) return res.status(400).json({ error: 'Student ID required' });
        const updated = db.updateStudent(id, updates);
        return res.status(200).json({ success: true, student: updated });
      }
    }

    // 5. TEACHERS: /api/teachers & /api/teachers/:id
    if (endpoint === 'teachers') {
      const teacherId = sub || (typeof req.query.id === 'string' ? req.query.id : '');

      if (teacherId) {
        if (req.method === 'GET') {
          const teacher = db.getTeacherById(teacherId);
          if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
          return res.status(200).json({ success: true, teacher });
        }
        if (req.method === 'PUT') {
          const updated = db.updateTeacher(teacherId, req.body || {});
          return res.status(200).json({ success: true, teacher: updated });
        }
        if (req.method === 'DELETE') {
          db.deleteTeacher(teacherId);
          return res.status(200).json({ success: true, message: 'Teacher deleted' });
        }
      }

      if (req.method === 'GET') {
        const { search } = req.query;
        const teachers = db.getTeachers(typeof search === 'string' ? search : undefined);
        return res.status(200).json({ success: true, count: teachers.length, teachers });
      }

      if (req.method === 'POST') {
        const body = req.body;
        if (!body?.full_name || !body?.subject_specialization) {
          return res.status(400).json({ error: 'Missing required teacher fields' });
        }
        const newTeacher = db.addTeacher({
          full_name: body.full_name,
          subject_specialization: body.subject_specialization,
          qualification: body.qualification || 'M.Phil / M.Sc',
          phone: body.phone || '+92 300 0000000',
          email: body.email || `faculty.${Date.now()}@pgc.edu`,
          joining_date: body.joining_date || new Date().toISOString().split('T')[0],
          assigned_classes: body.assigned_classes || ['cls-11-ics-a'],
          avatar_url: body.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        });
        return res.status(201).json({ success: true, teacher: newTeacher });
      }
    }

    // 6. ATTENDANCE: /api/attendance
    if (endpoint === 'attendance') {
      if (req.method === 'GET') {
        const { class_id, date, student_id } = req.query;
        const records = db.getAttendance(
          typeof class_id === 'string' ? class_id : undefined,
          typeof date === 'string' ? date : undefined,
          typeof student_id === 'string' ? student_id : undefined
        );
        return res.status(200).json({ success: true, count: records.length, attendance: records });
      }

      if (req.method === 'POST') {
        const { date, classId, records } = req.body || {};
        if (!date || !classId || !Array.isArray(records)) {
          return res.status(400).json({ error: 'Missing date, classId, or records array' });
        }
        const saved = db.markAttendanceBatch(date, classId, records);
        return res.status(200).json({ success: true, message: 'Attendance saved', records: saved });
      }
    }

    // 7. EXAMS: /api/exams
    if (endpoint === 'exams') {
      if (req.method === 'GET') {
        const exams = db.getExams();
        return res.status(200).json({ success: true, count: exams.length, exams });
      }
      if (req.method === 'POST') {
        const body = req.body;
        if (!body?.name || !body?.exam_type) {
          return res.status(400).json({ error: 'Missing exam name or type' });
        }
        const newExam = db.addExam({
          name: body.name,
          exam_type: body.exam_type,
          start_date: body.start_date || new Date().toISOString().split('T')[0],
          end_date: body.end_date || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
          is_active: body.is_active ?? true,
        });
        return res.status(201).json({ success: true, exam: newExam });
      }
    }

    // 8. MARKS: /api/marks
    if (endpoint === 'marks') {
      if (req.method === 'GET') {
        const { exam_id, class_id, subject_id, student_id } = req.query;
        const marks = db.getMarks(
          typeof exam_id === 'string' ? exam_id : undefined,
          typeof class_id === 'string' ? class_id : undefined,
          typeof subject_id === 'string' ? subject_id : undefined,
          typeof student_id === 'string' ? student_id : undefined
        );
        return res.status(200).json({ success: true, count: marks.length, marks });
      }
      if (req.method === 'POST') {
        const { examId, subjectId, classId, marksList } = req.body || {};
        if (!examId || !subjectId || !classId || !Array.isArray(marksList)) {
          return res.status(400).json({ error: 'Missing required marks entry parameters' });
        }
        for (const item of marksList) {
          if (item.marksObtained < 0 || item.marksObtained > item.totalMarks) {
            return res.status(400).json({
              error: `Invalid marks: ${item.marksObtained} exceeds total marks ${item.totalMarks}`,
            });
          }
        }
        const saved = db.saveMarksBatch(examId, subjectId, classId, marksList);
        return res.status(200).json({ success: true, count: saved.length, marks: saved });
      }
    }

    // 9. RESULTS: /api/results
    if (endpoint === 'results') {
      if (req.method === 'GET') {
        const { exam_id, class_id } = req.query;
        if (!exam_id || typeof exam_id !== 'string') {
          return res.status(400).json({ error: 'exam_id is required' });
        }
        const results = db.calculateResults(exam_id, typeof class_id === 'string' ? class_id : undefined);
        return res.status(200).json({
          success: true,
          examId: exam_id,
          classId: class_id || 'all',
          totalResults: results.length,
          results,
        });
      }
    }

    // 10. FEES: /api/fees
    if (endpoint === 'fees') {
      if (req.method === 'GET') {
        const { status, class_id, student_id } = req.query;
        const vouchers = db.getFeeVouchers(
          typeof status === 'string' ? status : undefined,
          typeof class_id === 'string' ? class_id : undefined,
          typeof student_id === 'string' ? student_id : undefined
        );
        const structures = db.getFeeStructures();
        return res.status(200).json({ success: true, count: vouchers.length, vouchers, structures });
      }
      if (req.method === 'POST') {
        const { voucherId, paidAmount, paymentMethod } = req.body || {};
        if (!voucherId || paidAmount === undefined) {
          return res.status(400).json({ error: 'voucherId and paidAmount required' });
        }
        const updated = db.recordFeePayment(voucherId, Number(paidAmount), paymentMethod || 'cash');
        return res.status(200).json({ success: true, voucher: updated });
      }
    }

    // 11. TIMETABLE: /api/timetable
    if (endpoint === 'timetable') {
      if (req.method === 'GET') {
        const { class_id, teacher_id } = req.query;
        const timetable = db.getTimetable(
          typeof class_id === 'string' ? class_id : undefined,
          typeof teacher_id === 'string' ? teacher_id : undefined
        );
        return res.status(200).json({ success: true, count: timetable.length, timetable });
      }
      if (req.method === 'POST') {
        const slot = db.addTimetableSlot(req.body);
        return res.status(201).json({ success: true, slot });
      }
      if (req.method === 'DELETE') {
        const { id } = req.query;
        if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Slot ID required' });
        db.deleteTimetableSlot(id);
        return res.status(200).json({ success: true, message: 'Slot deleted' });
      }
    }

    // 12. MATERIALS: /api/materials
    if (endpoint === 'materials') {
      if (req.method === 'GET') {
        const { class_id, subject_id } = req.query;
        const materials = db.getStudyMaterials(
          typeof class_id === 'string' ? class_id : undefined,
          typeof subject_id === 'string' ? subject_id : undefined
        );
        return res.status(200).json({ success: true, count: materials.length, materials });
      }
      if (req.method === 'POST') {
        const material = db.addStudyMaterial(req.body);
        return res.status(201).json({ success: true, material });
      }
      if (req.method === 'DELETE') {
        const { id } = req.query;
        if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Material ID required' });
        db.deleteStudyMaterial(id);
        return res.status(200).json({ success: true, message: 'Material deleted' });
      }
    }

    // 13. NOTICES: /api/notices
    if (endpoint === 'notices') {
      if (req.method === 'GET') {
        const { target } = req.query;
        const notices = db.getNotices(typeof target === 'string' ? target : undefined);
        return res.status(200).json({ success: true, count: notices.length, notices });
      }
      if (req.method === 'POST') {
        const notice = db.addNotice(req.body);
        return res.status(201).json({ success: true, notice });
      }
      if (req.method === 'DELETE') {
        const { id } = req.query;
        if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Notice ID required' });
        db.deleteNotice(id);
        return res.status(200).json({ success: true, message: 'Notice deleted' });
      }
    }

    // 14. ANALYTICS: /api/analytics/report
    if (endpoint === 'analytics' && sub === 'report') {
      const { student_id } = req.query;
      if (!student_id || typeof student_id !== 'string') {
        return res.status(400).json({ error: 'student_id required' });
      }
      const report = db.getStudentAnalytics(student_id);
      if (!report) return res.status(404).json({ error: 'Student not found' });
      return res.status(200).json({ success: true, report });
    }

    return res.status(404).json({ error: `Endpoint /api/${segments.join('/')} not found` });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Internal server error' });
  }
}

