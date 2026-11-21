import React from 'react';
import { Printer, X, CreditCard } from 'lucide-react';
import { FeeVoucher, Student, ClassRoom } from '../../types';
import { formatPKR, formatDate } from '../../lib/utils';

interface PrintableFeeVoucherProps {
  voucher: FeeVoucher;
  student: Student;
  classRoom: ClassRoom;
  onClose: () => void;
}

export const PrintableFeeVoucher: React.FC<PrintableFeeVoucherProps> = ({
  voucher,
  student,
  classRoom,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const tuitionFee = voucher.total_amount - 6500;
  const labFee = 3000;
  const libraryFee = 1000;
  const examFee = 1500;
  const sportsFee = 1000;
  const totalWithinDue = voucher.total_amount;
  const lateFine = 500;
  const totalAfterDue = totalWithinDue + lateFine;

  const renderChallanSlip = (slipTitle: string, isRightBorder = true) => (
    <div
      className={`p-4 text-[10px] md:text-[11px] leading-tight font-sans ${
        isRightBorder ? 'md:border-r border-dashed border-slate-400' : ''
      }`}
    >
      {/* Slip Header */}
      <div className="text-center pb-2 border-b border-slate-300">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <img
            src="/punjab-colleges-logo.png"
            alt="Punjab Colleges Logo"
            className="h-7 w-auto object-contain"
          />
        </div>
        <span className="inline-block px-2 py-0.5 bg-[#232766] text-white font-bold text-[9px] uppercase tracking-wider rounded">
          {slipTitle}
        </span>
        <h4 className="font-black text-[#232766] text-xs mt-1 uppercase">PUNJAB COLLEGES LAHORE</h4>
        <p className="text-[9px] text-[#ea432a] font-bold">Minar-e-Pakistan Campus</p>
        <p className="text-[8px] text-slate-700 font-bold uppercase mt-0.5">The Bank of Punjab (BOP) - A/C # 65800291884</p>
      </div>

      {/* Meta Info */}
      <div className="mt-2 space-y-1 border-b border-slate-200 pb-2">
        <div className="flex justify-between">
          <span className="text-slate-500">Challan No:</span>
          <span className="font-mono font-bold text-slate-900">{voucher.voucher_no}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Month / Year:</span>
          <span className="font-semibold text-slate-800">{voucher.month_year}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Issue Date:</span>
          <span className="text-slate-800">{formatDate(voucher.issue_date)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-red-700 font-bold">Due Date:</span>
          <span className="font-bold text-red-700">{formatDate(voucher.due_date)}</span>
        </div>
      </div>

      {/* Student Details */}
      <div className="mt-2 space-y-1 border-b border-slate-200 pb-2">
        <div className="flex justify-between">
          <span className="text-slate-500">Roll No:</span>
          <span className="font-mono font-bold text-blue-900">{student.roll_number}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Student:</span>
          <span className="font-bold text-slate-900 truncate max-w-[140px]">{student.full_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Father Name:</span>
          <span className="text-slate-800 truncate max-w-[140px]">{student.father_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Class:</span>
          <span className="font-semibold text-slate-800">{classRoom.name}</span>
        </div>
      </div>

      {/* Breakdown */}
      <table className="w-full mt-2 border-collapse text-[10px]">
        <thead>
          <tr className="border-b border-slate-300 text-slate-600">
            <th className="text-left py-1 font-semibold">Description</th>
            <th className="text-right py-1 font-semibold">Amount (PKR)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-800">
          <tr>
            <td className="py-0.5">Tuition Fee</td>
            <td className="text-right py-0.5 font-mono">{tuitionFee.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="py-0.5">Science / IT Lab Charges</td>
            <td className="text-right py-0.5 font-mono">{labFee.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="py-0.5">College Library Fund</td>
            <td className="text-right py-0.5 font-mono">{libraryFee.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="py-0.5">Examination & Stationery</td>
            <td className="text-right py-0.5 font-mono">{examFee.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="py-0.5">Sports & Gala Fund</td>
            <td className="text-right py-0.5 font-mono">{sportsFee.toLocaleString()}</td>
          </tr>
        </tbody>
        <tfoot className="border-t-2 border-slate-400 font-bold">
          <tr>
            <td className="py-1 text-slate-900">Total Within Due Date:</td>
            <td className="py-1 text-right text-blue-950 font-mono text-xs">{formatPKR(totalWithinDue)}</td>
          </tr>
          <tr className="text-red-700">
            <td className="py-0.5">Late Fee Fine:</td>
            <td className="py-0.5 text-right font-mono">+ {formatPKR(lateFine)}</td>
          </tr>
          <tr className="text-slate-900">
            <td className="py-1">After Due Date:</td>
            <td className="py-1 text-right font-mono text-xs">{formatPKR(totalAfterDue)}</td>
          </tr>
        </tfoot>
      </table>

      {/* Status Badge */}
      <div className="mt-3 text-center">
        <span
          className={`inline-block px-3 py-0.5 text-[9px] font-bold uppercase rounded ${
            voucher.status === 'paid'
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : voucher.status === 'partial'
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          Status: {voucher.status.toUpperCase()}
          {voucher.paid_amount > 0 ? ` (${formatPKR(voucher.paid_amount)})` : ''}
        </span>
      </div>

      {/* Signatures */}
      <div className="mt-6 pt-4 border-t border-slate-300 flex justify-between text-[8px] text-slate-500">
        <div className="text-center">
          <div className="w-16 border-b border-slate-400 mb-1"></div>
          <span>Accounts Officer</span>
        </div>
        <div className="text-center">
          <div className="w-16 border-b border-slate-400 mb-1"></div>
          <span>Bank Officer Stamp</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Action Bar (Hidden in print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm">Official 3-Part Bank Fee Voucher Challan</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Voucher</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Slip Voucher Layout */}
        <div className="p-6 md:p-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-slate-800 rounded-xl overflow-hidden bg-white">
            {renderChallanSlip('1. Bank Copy')}
            {renderChallanSlip('2. College Accounts Copy')}
            {renderChallanSlip('3. Student Copy', false)}
          </div>
          <p className="no-print text-center text-xs text-slate-500 mt-4">
            Notice: Please deposit fee at any online branch of The Bank of Punjab (BOP) or Habib Bank Limited (HBL).
          </p>
        </div>
      </div>
    </div>
  );
};

