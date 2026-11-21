import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const exams = db.getExams();
    return res.status(200).json({
      success: true,
      count: exams.length,
      exams,
    });
  }

  if (req.method === 'POST') {
    const body = req.body;
    if (!body?.name || !body?.exam_type) {
      return res.status(400).json({ error: 'Missing required exam fields' });
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

  return res.status(405).json({ error: 'Method not allowed' });
}
