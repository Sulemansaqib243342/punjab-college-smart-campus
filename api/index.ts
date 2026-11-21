import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isSupabaseBackendEnabled } from './_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: 'online',
    institution: 'Punjab Colleges, Minar-e-Pakistan Campus Lahore',
    engine: 'Unified Serverless REST Engine (Single-Function Router)',
    supabaseConnected: isSupabaseBackendEnabled,
    endpoints: [
      '/api/health',
      '/api/auth/login',
      '/api/admissions',
      '/api/admissions/approve',
      '/api/students',
      '/api/teachers',
      '/api/attendance',
      '/api/exams',
      '/api/marks',
      '/api/results',
      '/api/fees',
      '/api/timetable',
      '/api/materials',
      '/api/notices',
      '/api/analytics/report',
    ],
    timestamp: new Date().toISOString(),
  });
}

