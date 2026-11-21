import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { search } = req.query;
    const teachers = db.getTeachers(typeof search === 'string' ? search : undefined);
    return res.status(200).json({
      success: true,
      count: teachers.length,
      teachers,
    });
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

  if (req.method === 'PUT') {
    const { id, ...updates } = req.body || {};
    if (!id) return res.status(400).json({ error: 'Teacher ID required' });
    const updated = db.updateTeacher(id, updates);
    return res.status(200).json({ success: true, teacher: updated });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Teacher ID required' });
    db.deleteTeacher(id);
    return res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
