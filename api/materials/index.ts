import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { class_id, subject_id } = req.query;
    const materials = db.getStudyMaterials(
      typeof class_id === 'string' ? class_id : undefined,
      typeof subject_id === 'string' ? subject_id : undefined
    );
    return res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  }

  if (req.method === 'POST') {
    const body = req.body;
    if (!body?.title || !body?.class_id || !body?.subject_id) {
      return res.status(400).json({ error: 'Missing required study material fields' });
    }

    const material = db.addStudyMaterial({
      title: body.title,
      description: body.description || '',
      class_id: body.class_id,
      subject_id: body.subject_id,
      uploaded_by_teacher_id: body.uploaded_by_teacher_id || 'tch-1',
      file_url: body.file_url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      file_type: body.file_type || 'pdf',
      file_size_mb: body.file_size_mb || 2.4,
    });

    return res.status(201).json({ success: true, material });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Material ID is required' });
    db.deleteStudyMaterial(id);
    return res.status(200).json({ success: true, message: 'Material deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
