import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { class_id, date, student_id } = req.query;
    const records = db.getAttendance(
      typeof class_id === 'string' ? class_id : undefined,
      typeof date === 'string' ? date : undefined,
      typeof student_id === 'string' ? student_id : undefined
    );
    return res.status(200).json({
      success: true,
      count: records.length,
      attendance: records,
    });
  }

  if (req.method === 'POST') {
    const { date, classId, records } = req.body || {};
    if (!date || !classId || !Array.isArray(records)) {
      return res.status(400).json({ error: 'Missing date, classId, or records array' });
    }

    const saved = db.markAttendanceBatch(date, classId, records);
    return res.status(200).json({
      success: true,
      message: 'Attendance saved successfully',
      count: saved.length,
      records: saved,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
