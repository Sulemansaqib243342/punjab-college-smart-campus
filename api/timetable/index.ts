import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { class_id, teacher_id } = req.query;
    const timetable = db.getTimetable(
      typeof class_id === 'string' ? class_id : undefined,
      typeof teacher_id === 'string' ? teacher_id : undefined
    );
    return res.status(200).json({
      success: true,
      count: timetable.length,
      timetable,
    });
  }

  if (req.method === 'POST') {
    const body = req.body;
    if (!body?.class_id || !body?.subject_id || !body?.day_of_week) {
      return res.status(400).json({ error: 'Missing required timetable slot fields' });
    }

    const slot = db.addTimetableSlot({
      class_id: body.class_id,
      subject_id: body.subject_id,
      teacher_id: body.teacher_id || 'tch-1',
      day_of_week: body.day_of_week,
      start_time: body.start_time || '08:30',
      end_time: body.end_time || '09:15',
      room_no: body.room_no || 'Room 101',
    });

    return res.status(201).json({ success: true, slot });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Slot ID is required' });
    db.deleteTimetableSlot(id);
    return res.status(200).json({ success: true, message: 'Slot deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
