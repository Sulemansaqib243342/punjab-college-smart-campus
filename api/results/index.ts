import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { exam_id, class_id } = req.query;
    if (!exam_id || typeof exam_id !== 'string') {
      return res.status(400).json({ error: 'exam_id query parameter is required' });
    }

    const results = db.calculateResults(
      exam_id,
      typeof class_id === 'string' ? class_id : undefined
    );

    return res.status(200).json({
      success: true,
      examId: exam_id,
      classId: class_id || 'all',
      totalResults: results.length,
      results,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
