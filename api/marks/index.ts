import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { exam_id, class_id, subject_id, student_id } = req.query;
    const marks = db.getMarks(
      typeof exam_id === 'string' ? exam_id : undefined,
      typeof class_id === 'string' ? class_id : undefined,
      typeof subject_id === 'string' ? subject_id : undefined,
      typeof student_id === 'string' ? student_id : undefined
    );
    return res.status(200).json({
      success: true,
      count: marks.length,
      marks,
    });
  }

  if (req.method === 'POST') {
    const { examId, subjectId, classId, marksList } = req.body || {};
    if (!examId || !subjectId || !classId || !Array.isArray(marksList)) {
      return res.status(400).json({ error: 'Missing required marks entry parameters' });
    }

    // Validation: marksObtained must be between 0 and totalMarks
    for (const item of marksList) {
      if (item.marksObtained < 0 || item.marksObtained > item.totalMarks) {
        return res.status(400).json({
          error: `Invalid marks for student ${item.studentId}: Marks obtained (${item.marksObtained}) exceeds total marks (${item.totalMarks})`,
        });
      }
    }

    const saved = db.saveMarksBatch(examId, subjectId, classId, marksList);
    return res.status(200).json({
      success: true,
      message: 'Marks updated and validated successfully',
      count: saved.length,
      marks: saved,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
