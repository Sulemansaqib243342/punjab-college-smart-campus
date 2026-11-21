import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isSupabaseBackendEnabled } from './_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'online',
    institution: 'Punjab Colleges, Minar-e-Pakistan Campus Lahore',
    engine: 'Smart Campus Backend REST Engine',
    supabaseConnected: isSupabaseBackendEnabled,
    timestamp: new Date().toISOString(),
  });
}
