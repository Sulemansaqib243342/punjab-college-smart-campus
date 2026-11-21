import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const teacherId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';

  if (!teacherId) {
    return res.status(400).json({ error: 'Teacher ID is required' });
  }

  if (req.method === 'GET') {
    const teacher = db.getTeacherById(teacherId);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    return res.status(200).json({ success: true, teacher });
  }

  if (req.method === 'PUT') {
    const updates = req.body || {};
    const updated = db.updateTeacher(teacherId, updates);
    if (!updated) return res.status(404).json({ error: 'Teacher not found' });
    return res.status(200).json({ success: true, teacher: updated });
  }

  if (req.method === 'DELETE') {
    db.deleteTeacher(teacherId);
    return res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
