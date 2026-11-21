/**
 * Smart Campus Backend API Client
 * Seamlessly interfaces with Vercel Serverless REST API (/api/...)
 * with graceful fallback to reactive local store when running on static hosts (e.g. GitHub Pages).
 */

const API_BASE = '/api';

export async function checkBackendHealth(): Promise<{ online: boolean; mode: string; details?: any }> {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET', headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      return { online: true, mode: data.supabase_connected ? 'Supabase Database' : 'Serverless REST Memory Store', details: data };
    }
  } catch (e) {
    // Backend API endpoint not reachable (e.g. GitHub Pages static hosting)
  }
  return { online: false, mode: 'Client-side LocalStorage Reactive Store' };
}

export const apiClient = {
  // --- Auth ---
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // --- Students ---
  async getStudents(params?: { class_id?: string; group?: string; search?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/students${query ? `?${query}` : ''}`);
    return res.json();
  },

  async addStudent(studentData: any) {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    return res.json();
  },

  // --- Admissions ---
  async getAdmissions(status?: string) {
    const res = await fetch(`${API_BASE}/admissions${status ? `?status=${status}` : ''}`);
    return res.json();
  },

  async submitAdmission(data: any) {
    const res = await fetch(`${API_BASE}/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async approveAdmission(applicationId: string) {
    const res = await fetch(`${API_BASE}/admissions/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId }),
    });
    return res.json();
  },

  // --- Teachers ---
  async getTeachers(search?: string) {
    const res = await fetch(`${API_BASE}/teachers${search ? `?search=${encodeURIComponent(search)}` : ''}`);
    return res.json();
  },

  // --- Attendance ---
  async getAttendance(params: { class_id?: string; date?: string; student_id?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/attendance${query ? `?${query}` : ''}`);
    return res.json();
  },

  async markAttendanceBatch(date: string, classId: string, records: { student_id: string; status: string }[]) {
    const res = await fetch(`${API_BASE}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, classId, records }),
    });
    return res.json();
  },

  // --- Exams & Marks ---
  async getExams() {
    const res = await fetch(`${API_BASE}/exams`);
    return res.json();
  },

  async getMarks(params: { exam_id?: string; class_id?: string; subject_id?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/marks${query ? `?${query}` : ''}`);
    return res.json();
  },

  async saveMarksBatch(payload: { examId: string; subjectId: string; classId: string; marksList: any[] }) {
    const res = await fetch(`${API_BASE}/marks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  // --- Results ---
  async getResults(examId: string, classId?: string) {
    const res = await fetch(`${API_BASE}/results?exam_id=${examId}${classId ? `&class_id=${classId}` : ''}`);
    return res.json();
  },

  // --- Fees ---
  async getFeeVouchers(params?: { status?: string; class_id?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/fees${query ? `?${query}` : ''}`);
    return res.json();
  },

  async recordFeePayment(voucherId: string, paidAmount: number, paymentMethod: string) {
    const res = await fetch(`${API_BASE}/fees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voucherId, paidAmount, paymentMethod }),
    });
    return res.json();
  },

  // --- Timetable ---
  async getTimetable(params?: { class_id?: string; teacher_id?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/timetable${query ? `?${query}` : ''}`);
    return res.json();
  },

  // --- Study Materials ---
  async getStudyMaterials(params?: { class_id?: string; subject_id?: string }) {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/materials${query ? `?${query}` : ''}`);
    return res.json();
  },

  // --- Notices ---
  async getNotices(target?: string) {
    const res = await fetch(`${API_BASE}/notices${target ? `?target=${target}` : ''}`);
    return res.json();
  },

  // --- AI Analytics Report ---
  async getStudentAnalyticsReport(studentId: string) {
    const res = await fetch(`${API_BASE}/analytics/report?student_id=${studentId}`);
    return res.json();
  },
};

