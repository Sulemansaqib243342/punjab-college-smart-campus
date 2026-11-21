import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { target } = req.query;
    const notices = db.getNotices(typeof target === 'string' ? target : undefined);
    return res.status(200).json({
      success: true,
      count: notices.length,
      notices,
    });
  }

  if (req.method === 'POST') {
    const body = req.body;
    if (!body?.title || !body?.content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const notice = db.addNotice({
      title: body.title,
      content: body.content,
      category: body.category || 'general',
      target_audience: body.target_audience || 'all',
      is_pinned: body.is_pinned ?? false,
      posted_by: body.posted_by || 'Admin Office',
    });

    return res.status(201).json({ success: true, notice });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Notice ID is required' });
    db.deleteNotice(id);
    return res.status(200).json({ success: true, message: 'Notice deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
