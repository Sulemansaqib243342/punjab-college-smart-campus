import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { status } = req.query;
    const apps = db.getAdmissions(typeof status === 'string' ? status : undefined);
    return res.status(200).json({ count: apps.length, applications: apps });
  }

  if (req.method === 'POST') {
    const body = req.body;
    if (!body?.applicant_name || !body?.cnic_bform || !body?.group_name) {
      return res.status(400).json({ error: 'Missing required admission fields' });
    }

    const newApp = db.submitAdmission({
      applicant_name: body.applicant_name,
      father_name: body.father_name,
      cnic_bform: body.cnic_bform,
      dob: body.dob || '2008-05-15',
      gender: body.gender || 'Male',
      contact: body.contact || '+92 300 0000000',
      email: body.email || 'applicant@student.pgc.edu',
      address: body.address || 'Lahore, Pakistan',
      previous_marks: Number(body.previous_marks || 900),
      total_marks: Number(body.total_marks || 1100),
      percentage: Number(body.percentage || 81.8),
      previous_board: body.previous_board || 'BISE Lahore',
      group_name: body.group_name,
      photo_url: body.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    });

    return res.status(201).json({ success: true, application: newApp });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
