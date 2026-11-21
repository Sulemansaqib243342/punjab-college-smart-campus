import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { class_id, group, search } = req.query;
    const students = db.getStudents(
      typeof class_id === 'string' ? class_id : undefined,
      typeof group === 'string' ? group : undefined,
      typeof search === 'string' ? search : undefined
    );
    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  }

  if (req.method === 'POST') {
    const body = req.body;
    if (!body?.full_name || !body?.class_id || !body?.group_name) {
      return res.status(400).json({ error: 'Missing required student fields' });
    }

    const groupCount = db.students.filter((s) => s.group_name === body.group_name).length;
    const prefix = body.group_name === 'ICS' ? '1' : body.group_name === 'Pre-Medical' ? '2' : '3';
    const rollNumber = body.roll_number || `PCL-24-${prefix}${(groupCount + 60).toString().padStart(2, '0')}`;

    const newStudent = db.addStudent({
      roll_number: rollNumber,
      full_name: body.full_name,
      father_name: body.father_name || 'Father Name',
      cnic_bform: body.cnic_bform || '35202-0000000-1',
      dob: body.dob || '2007-01-01',
      gender: body.gender || 'Male',
      blood_group: body.blood_group || 'O+',
      phone: body.phone || '+92 300 1234567',
      email: body.email || `std.${Date.now()}@student.pgc.edu`,
      address: body.address || 'Lahore, Pakistan',
      class_id: body.class_id,
      group_name: body.group_name,
      admission_date: body.admission_date || new Date().toISOString().split('T')[0],
      status: body.status || 'active',
      photo_url: body.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    });

    return res.status(201).json({ success: true, student: newStudent });
  }

  if (req.method === 'PUT') {
    const { id, ...updates } = req.body || {};
    if (!id) return res.status(400).json({ error: 'Student ID required' });
    const updated = db.updateStudent(id, updates);
    return res.status(200).json({ success: true, student: updated });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Student ID required' });
    db.deleteStudent(id);
    return res.status(200).json({ success: true, message: 'Student deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
