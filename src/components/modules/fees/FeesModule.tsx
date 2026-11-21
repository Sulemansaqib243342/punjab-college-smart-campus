import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Printer,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../../lib/store';
import { FeeVoucher, Student, ClassRoom } from '../../../types';
import { PrintableFeeVoucher } from '../../common/PrintableFeeVoucher';
import { Modal } from '../../common/Modal';
import { formatPKR, formatDate } from '../../../lib/utils';

export const FeesModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'unpaid' | 'partial' | 'defaulters'>('all');
  const [selectedVoucherForPrint, setSelectedVoucherForPrint] = useState<{
    voucher: FeeVoucher;
    student: Student;
    classRoom: ClassRoom;
  } | null>(null);

  // Pay modal
  const [payingVoucher, setPayingVoucher] = useState<FeeVoucher | null>(null);
  const [payAmount, setPayAmount] = useState(0);
  const [payMethod, setPayMethod] = useState<'Bank of Punjab' | 'HBL' | 'JazzCash' | 'Cash Counter'>('Bank of Punjab');
  const [payToast, setPayToast] = useState<string | null>(null);

  // If student role, restrict view to student's vouchers
  const activeStudent = isStudent
    ? store.students.find((s) => s.email === currentUser?.email) || store.students[0]
    : null;

  const allVouchers = isStudent
    ? store.feeVouchers.filter((v) => v.student_id === activeStudent?.id)
    : store.feeVouchers;

  // KPIs
  const totalBilled = allVouchers.reduce((acc, curr) => acc + curr.total_amount, 0);
  const totalCollected = allVouchers.reduce((acc, curr) => acc + curr.paid_amount, 0);
  const totalPending = totalBilled - totalCollected;
  const defaultersCount = allVouchers.filter((v) => v.status === 'unpaid').length;

  // Filter
  const filteredVouchers = allVouchers.filter((v) => {
    const student = store.students.find((s) => s.id === v.student_id);
    const matchesSearch =
      v.voucher_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student && student.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student && student.roll_number.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesStatus = true;
    if (statusFilter === 'defaulters') {
      matchesStatus = v.status === 'unpaid';
    } else if (statusFilter !== 'all') {
      matchesStatus = v.status === statusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  const handleOpenPay = (voucher: FeeVoucher) => {
    setPayingVoucher(voucher);
    setPayAmount(voucher.balance > 0 ? voucher.balance : voucher.total_amount);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingVoucher) return;
    store.updateFeePayment(payingVoucher.id, Number(payAmount), payMethod);
    setPayToast(`Payment of ${formatPKR(Number(payAmount))} recorded successfully via ${payMethod}!`);
    setTimeout(() => setPayToast(null), 4000);
    setPayingVoucher(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-600" />
            <span>Fee Management & 3-Part Bank Challans</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tuition fee structures, voucher generation, BOP/HBL online reconciliation, and defaulter tracking
          </p>
        </div>
      </div>

      {payToast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{payToast}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Billed</span>
          <div className="text-xl font-extrabold text-blue-950 dark:text-white mt-1">
            {formatPKR(totalBilled)}
          </div>
          <span className="text-[11px] text-slate-500">{allVouchers.length} Vouchers Issued</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Total Collected</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">
            {formatPKR(totalCollected)}
          </div>
          <span className="text-[11px] text-slate-500">Deposited in Bank of Punjab</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-red-600 uppercase">Outstanding Balance</span>
          <div className="text-xl font-extrabold text-red-600 mt-1">
            {formatPKR(totalPending)}
          </div>
          <span className="text-[11px] text-slate-500">Uncollected fees</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-amber-600 uppercase">Defaulters Count</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">
            {defaultersCount}
          </div>
          <span className="text-[11px] text-slate-500">Late fee fine applies</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search voucher #, roll #, student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
          >
            <option value="all">All Vouchers</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial Payment</option>
            <option value="unpaid">Unpaid</option>
            <option value="defaulters">Defaulters List (Unpaid)</option>
          </select>
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Voucher No</th>
                <th className="py-3 px-4">Student & Roll No</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Month / Session</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Paid Amount</th>
                <th className="py-3 px-4">Balance</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-10 text-slate-400">
                    No fee vouchers found.
                  </td>
                </tr>
              ) : (
                filteredVouchers.map((vch) => {
                  const student = store.students.find((s) => s.id === vch.student_id);
                  const classRoom = store.classes.find((c) => c.id === vch.class_id);
                  const isPaid = vch.status === 'paid';
                  const isPartial = vch.status === 'partial';

                  return (
                    <tr key={vch.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {vch.voucher_no}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {student?.full_name || 'Student'}
                        </div>
                        <div className="text-[11px] font-mono text-blue-600 font-bold">
                          {student?.roll_number}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        {classRoom?.name || '11th ICS-A'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {vch.month_year}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {formatPKR(vch.total_amount)}
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-600 font-semibold">
                        {formatPKR(vch.paid_amount)}
                      </td>
                      <td className="py-3 px-4 font-mono text-red-600 font-semibold">
                        {formatPKR(vch.balance)}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {formatDate(vch.due_date)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isPaid
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : isPartial
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          }`}
                        >
                          {vch.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        {/* Print 3-Part Bank Challan */}
                        <button
                          onClick={() => {
                            if (student && classRoom) {
                              setSelectedVoucherForPrint({
                                voucher: vch,
                                student,
                                classRoom,
                              });
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-bold text-[11px] shadow-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Challan</span>
                        </button>

                        {/* Pay Button (For admin or counter) */}
                        {!isPaid && !isStudent && (
                          <button
                            onClick={() => handleOpenPay(vch)}
                            className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Mark Paid</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Voucher Modal */}
      {payingVoucher && (
        <Modal
          isOpen={Boolean(payingVoucher)}
          onClose={() => setPayingVoucher(null)}
          title={`Record Fee Payment: ${payingVoucher.voucher_no}`}
          maxWidth="md"
        >
          <form onSubmit={handleConfirmPayment} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Voucher Fee:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {formatPKR(payingVoucher.total_amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Balance Remaining:</span>
                <span className="font-mono font-bold text-red-600">
                  {formatPKR(payingVoucher.balance)}
                </span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Payment Amount (PKR) *
              </label>
              <input
                type="number"
                required
                min={100}
                max={payingVoucher.balance > 0 ? payingVoucher.balance : payingVoucher.total_amount}
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Receiving Bank / Payment Channel *
              </label>
              <select
                value={payMethod}
                onChange={(e: any) => setPayMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              >
                <option value="Bank of Punjab">Bank of Punjab (BOP Branch Deposit)</option>
                <option value="HBL">Habib Bank Limited (HBL Online)</option>
                <option value="JazzCash">JazzCash / EasyPaisa Mobile Gateway</option>
                <option value="Cash Counter">College Main Accounts Cash Counter</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPayingVoucher(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
              >
                Confirm Payment Receipt
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Printable 3-Part Bank Voucher */}
      {selectedVoucherForPrint && (
        <PrintableFeeVoucher
          voucher={selectedVoucherForPrint.voucher}
          student={selectedVoucherForPrint.student}
          classRoom={selectedVoucherForPrint.classRoom}
          onClose={() => setSelectedVoucherForPrint(null)}
        />
      )}
    </div>
  );
};

