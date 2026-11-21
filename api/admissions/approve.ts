import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { applicationId } = req.body || {};
  if (!applicationId) {
    return res.status(400).json({ error: 'applicationId is required' });
  }

  try {
    const result = db.approveAdmission(applicationId);
    return res.status(200).json({
      success: true,
      message: 'Admission approved and student enrolled successfully',
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({ error: error?.message || 'Application not found' });
  }
}
