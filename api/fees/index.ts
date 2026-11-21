import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { status, class_id, student_id } = req.query;
    const vouchers = db.getFeeVouchers(
      typeof status === 'string' ? status : undefined,
      typeof class_id === 'string' ? class_id : undefined,
      typeof student_id === 'string' ? student_id : undefined
    );
    const feeStructures = db.getFeeStructures();

    return res.status(200).json({
      success: true,
      count: vouchers.length,
      vouchers,
      structures: feeStructures,
    });
  }

  if (req.method === 'POST') {
    const { voucherId, paidAmount, paymentMethod } = req.body || {};
    if (!voucherId || paidAmount === undefined) {
      return res.status(400).json({ error: 'voucherId and paidAmount are required' });
    }

    try {
      const updated = db.recordFeePayment(voucherId, Number(paidAmount), paymentMethod || 'cash');
      return res.status(200).json({
        success: true,
        message: 'Payment recorded successfully',
        voucher: updated,
      });
    } catch (error: any) {
      return res.status(404).json({ error: error?.message || 'Voucher not found' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
