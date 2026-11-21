import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const studentId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';

  if (!studentId) {
    return res.status(400).json({ error: 'Student ID is required' });
  }

  if (req.method === 'GET') {
    const student = db.getStudentById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    return res.status(200).json({ success: true, student });
  }

  if (req.method === 'PUT') {
    const updates = req.body || {};
    const updated = db.updateStudent(studentId, updates);
    if (!updated) return res.status(404).json({ error: 'Student not found' });
    return res.status(200).json({ success: true, student: updated });
  }

  if (req.method === 'DELETE') {
    db.deleteStudent(studentId);
    return res.status(200).json({ success: true, message: 'Student deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
