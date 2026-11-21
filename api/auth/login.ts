import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  // Check demo profiles
  const profile = db.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
  if (profile) {
    return res.status(200).json({
      success: true,
      user: profile,
      role: profile.role,
      token: `jwt_demo_${profile.id}_${Date.now()}`,
    });
  }

  // Check enrolled students
  const std = db.students.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (std) {
    const studentUser = {
      id: std.id,
      email: std.email,
      full_name: std.full_name,
      role: 'student',
      avatar_url: std.photo_url,
      phone: std.phone,
      address: std.address,
    };
    return res.status(200).json({
      success: true,
      user: studentUser,
      role: 'student',
      token: `jwt_std_${std.id}_${Date.now()}`,
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid credentials. Please use demo credentials.',
  });
}
