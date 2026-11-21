import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { student_id } = req.query;
  if (!student_id || typeof student_id !== 'string') {
    return res.status(400).json({ error: 'student_id query parameter is required' });
  }

  const report = db.getStudentAnalytics(student_id);
  if (!report) {
    return res.status(404).json({ error: `Student not found with ID: ${student_id}` });
  }

  return res.status(200).json({
    success: true,
    report,
  });
}
