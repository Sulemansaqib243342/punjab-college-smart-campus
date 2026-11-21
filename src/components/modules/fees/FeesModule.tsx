import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Printer,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Filter,
  ArrowRight,
  Info,
  Clock,
  ShieldCheck,
  Building2,
  ChevronRight,
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
  const [selectedClass, setSelectedClass] = useState('ICS Part 1 · A');
  const [selectedMonth, setSelectedMonth] = useState('All months');
  
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

  // Mockup mock dataset matching 11_fee_desktop.png exactly
  const mockTableVouchers = [
    {
      id: 'mock-v-1',
      studentName: 'Ahmed Raza',
      rollNo: 'ICS1-026',
      voucherNo: 'PC-FEE-2611-026',
      month: 'November 2026',
      dueDate: 'Due 25 Nov 2026',
      billed: 10000,
      paid: 6000,
      balance: 4000,
      status: 'partial' as const,
      statusLabel: 'Partial',
      subtext: '4 days left to due date',
      originalVoucherId: 'v-nov-ahmed',
    },
    {
      id: 'mock-v-2',
      studentName: 'Ayesha Khan',
      rollNo: 'ICS1-027',
      voucherNo: 'PC-FEE-2611-027',
      month: 'November 2026',
      dueDate: 'Due 25 Nov 2026',
      billed: 10000,
      paid: 10000,
      balance: 0,
      status: 'paid' as const,
      statusLabel: 'Paid',
      subtext: 'Settled',
      originalVoucherId: 'v-nov-ayesha',
    },
    {
      id: 'mock-v-3',
      studentName: 'Fatima Noor',
      rollNo: 'ICS1-029',
      voucherNo: 'PC-FEE-2611-029',
      month: 'November 2026',
      dueDate: 'Due 25 Nov 2026',
      billed: 10000,
      paid: 0,
      balance: 10000,
      status: 'unpaid' as const,
      statusLabel: 'Unpaid',
      subtext: 'Not yet due',
      originalVoucherId: 'v-nov-fatima',
    },
    {
      id: 'mock-v-4',
      studentName: 'Ahmed Raza',
      rollNo: 'ICS1-026',
      voucherNo: 'PC-FEE-2610-026',
      month: 'October 2026',
      dueDate: 'Due 10 Nov 2026',
      billed: 10000,
      paid: 10000,
      balance: 0,
      status: 'paid' as const,
      statusLabel: 'Paid',
      subtext: 'Settled',
      originalVoucherId: 'v-oct-ahmed',
    },
  ];

  // Overdue balances card matching 11_fee_desktop.png exactly
  const overdueItems = [
    {
      name: 'Hamza Ali',
      rollNo: 'ICS1-028',
      period: 'October 2026',
      amount: 'Rs 10,000',
      due: 'Due 10 Nov 2026',
      status: 'Overdue',
    },
    {
      name: 'Bilal Ahmed',
      rollNo: 'ICS1-034',
      period: 'September 2026',
      amount: 'Rs 10,000',
      due: 'Due 10 Oct 2026',
      status: 'Overdue',
    },
    {
      name: 'Zoya Malik',
      rollNo: 'ICS1-037',
      period: 'October 2026',
      amount: 'Rs 4,000',
      due: 'Due 10 Nov 2026',
      status: 'Overdue',
    },
  ];

  // Filter table
  const filteredRows = mockTableVouchers.filter((row) => {
    const matchesSearch =
      row.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.voucherNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMonth =
      selectedMonth === 'All months' || row.month.toLowerCase().includes(selectedMonth.toLowerCase());

    return matchesSearch && matchesMonth;
  });

  const handleOpenPrint = (voucherNo: string, studentName: string) => {
    const foundVoucher = store.feeVouchers.find((v) => v.voucher_no === voucherNo) || store.feeVouchers[0];
    const foundStudent = store.students.find((s) => s.full_name === studentName) || store.students[0];
    const foundClass = store.classes[0];

    setSelectedVoucherForPrint({
      voucher: {
        ...foundVoucher,
        voucher_no: voucherNo,
      },
      student: foundStudent,
      classRoom: foundClass,
    });
  };

  const handleOpenPay = (mockItem: typeof mockTableVouchers[0]) => {
    const realVoucher = store.feeVouchers.find((v) => v.voucher_no === mockItem.voucherNo) || store.feeVouchers[0];
    setPayingVoucher(realVoucher);
    setPayAmount(mockItem.balance > 0 ? mockItem.balance : mockItem.billed);
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
    <div className="space-y-6 font-sans">
      {/* Module Title Header matching 11_fee_desktop */}
      <div className="space-y-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          FEE MANAGEMENT
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1b224b] dark:text-white tracking-tight">
              Fees, without the friction.
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              A clear picture of payments, balances and campus finances.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{currentUser?.full_name || 'Campus Admin'}</span>
            <span className="text-slate-400 font-mono text-[10px] uppercase">({currentUser?.role || 'Administrator'})</span>
          </div>
        </div>
      </div>

      {payToast && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{payToast}</span>
        </div>
      )}

      {/* 3 KPI Cards matching 11_fee_desktop.png exactly */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Solid Navy Fees Collected */}
        <div className="bg-[#101c4e] dark:bg-[#16205b] text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between border border-[#101c4e]">
          <div>
            <span className="text-xs text-blue-200 font-medium">Fees collected</span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mt-1 text-white">
              Rs 4.82M
            </div>
          </div>
          <div className="text-xs text-blue-200/90 font-medium mt-3">
            November 2026 · Campus total
          </div>
        </div>

        {/* Card 2: Pending collection */}
        <div className="bg-white dark:bg-[#11182c] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pending collection</span>
            <div className="text-3xl sm:text-4xl font-black text-[#1b224b] dark:text-white tracking-tight mt-1">
              Rs 1.18M
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-3">
            Against Rs 6.00M billed
          </div>
        </div>

        {/* Card 3: Collection rate */}
        <div className="bg-white dark:bg-[#11182c] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Collection rate</span>
            <div className="text-3xl sm:text-4xl font-black text-[#1b224b] dark:text-white tracking-tight mt-1">
              80.3%
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-3">
            November billing cycle
          </div>
        </div>
      </div>

      {/* Main Grid: Left Table (8 cols), Right Cards (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Fee Vouchers Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-[#1b224b] dark:text-white">
                Fee vouchers
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Student balances · All amounts in Pakistani rupees
              </p>
            </div>

            {/* Filter toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search name or voucher"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#101c4e]"
                />
              </div>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="ICS Part 1 · A">ICS Part 1 · A</option>
                <option value="ICS Part 1 · B">ICS Part 1 · B</option>
                <option value="ICS Part 2 · A">ICS Part 2 · A</option>
                <option value="FSc Pre-Eng · A">FSc Pre-Eng · A</option>
                <option value="All classes">All classes</option>
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="All months">All months</option>
                <option value="November 2026">November 2026</option>
                <option value="October 2026">October 2026</option>
                <option value="September 2026">September 2026</option>
              </select>
            </div>

            {/* Vouchers Table */}
            <div className="overflow-x-auto -mx-5 sm:mx-0">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold">
                    <th className="py-2.5 px-4 font-normal">Student</th>
                    <th className="py-2.5 px-3 font-normal">Voucher / month</th>
                    <th className="py-2.5 px-3 font-normal">Billed</th>
                    <th className="py-2.5 px-3 font-normal">Paid</th>
                    <th className="py-2.5 px-3 font-normal">Balance</th>
                    <th className="py-2.5 px-3 font-normal">Status</th>
                    <th className="py-2.5 px-4 font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredRows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {row.studentName}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {row.rollNo}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                          {row.voucherNo}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {row.month} · <span className="text-slate-500">{row.dueDate}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {row.billed.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {row.paid.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {row.balance > 0 ? row.balance.toLocaleString() : '—'}
                      </td>

                      <td className="py-3.5 px-3">
                        {row.status === 'paid' && (
                          <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              Paid
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5">Settled</div>
                          </div>
                        )}
                        {row.status === 'partial' && (
                          <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                              Partial
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5">Not overdue</div>
                          </div>
                        )}
                        {row.status === 'unpaid' && (
                          <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                              Unpaid
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5">Not yet due</div>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {row.balance > 0 && !isStudent && (
                            <button
                              onClick={() => handleOpenPay(row)}
                              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                            >
                              Receive
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenPrint(row.voucherNo, row.studentName)}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                          >
                            View receipt
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note banner under table matching mockup */}
            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-300 flex items-start sm:items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  <strong>Ahmed:</strong> Rs 4,000 remains due by 25 Nov. This November balance is not overdue.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fee Structure & Overdue Balances */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Monthly Fee Structure */}
          <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 space-y-4">
            <div>
              <h3 className="font-bold text-sm text-[#1b224b] dark:text-white">
                Monthly fee structure
              </h3>
              <p className="text-[11px] text-slate-400">
                ICS Part 1 · Effective November 2026
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Tuition</span>
                <span className="font-semibold text-slate-900 dark:text-white">Rs 8,000</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Computer lab</span>
                <span className="font-semibold text-slate-900 dark:text-white">Rs 1,500</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Library</span>
                <span className="font-semibold text-slate-900 dark:text-white">Rs 500</span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between font-bold">
                <span className="text-slate-900 dark:text-white">Monthly total</span>
                <span className="text-sm font-extrabold text-[#101c4e] dark:text-blue-300">
                  Rs 10,000
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Overdue Balances */}
          <div className="bg-white dark:bg-[#11182c] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-5 space-y-4">
            <div>
              <h3 className="font-bold text-sm text-[#1b224b] dark:text-white">
                Overdue balances
              </h3>
              <p className="text-[11px] text-slate-400">
                Earlier months only · As of 21 Nov 2026
              </p>
            </div>

            <div className="space-y-3">
              {overdueItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{item.rollNo} · {item.period}</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      {item.amount}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 pt-0.5">
                    {item.due}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pay Voucher Modal */}
      {payingVoucher && (
        <Modal
          isOpen={true}
          onClose={() => setPayingVoucher(null)}
          title={`Receive Fee Payment - ${payingVoucher.voucher_no}`}
          maxWidth="md"
        >
          <form onSubmit={handleConfirmPayment} className="space-y-4 p-4 text-xs font-sans">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Student ID: {payingVoucher.student_id}
              </div>
              <div className="text-slate-500">
                Billed Amount: {formatPKR(payingVoucher.total_amount)}
              </div>
              <div className="text-rose-600 font-bold">
                Balance Due: {formatPKR(payingVoucher.balance > 0 ? payingVoucher.balance : payingVoucher.total_amount)}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Payment Amount (PKR)
              </label>
              <input
                type="number"
                min="100"
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 font-mono text-sm font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                Collection Channel / Bank
              </label>
              <select
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800"
              >
                <option value="Bank of Punjab">Bank of Punjab (BOP)</option>
                <option value="HBL">Habib Bank Limited (HBL)</option>
                <option value="JazzCash">JazzCash / EasyPaisa Online</option>
                <option value="Cash Counter">Campus Accounts Cash Counter</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPayingVoucher(null)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
              >
                Confirm Payment & Issue Receipt
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Printable 3-part bank challan modal */}
      {selectedVoucherForPrint && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedVoucherForPrint(null)}
          title={`3-Part Bank Challan - ${selectedVoucherForPrint.voucher.voucher_no}`}
          maxWidth="2xl"
        >
          <div className="p-4 space-y-4">
            <div className="no-print flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#101c4e] text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Bank Challan</span>
              </button>
            </div>
            <PrintableFeeVoucher
              voucher={selectedVoucherForPrint.voucher}
              student={selectedVoucherForPrint.student}
              classRoom={selectedVoucherForPrint.classRoom}
              onClose={() => setSelectedVoucherForPrint(null)}
            />
          </div>
        </Modal>
      )}

      {/* Footer Note matching mockup */}
      <div className="pt-4 text-center text-xs text-slate-400">
        Demo campus data · Punjab College, Minar-e-Pakistan Campus, Lahore
      </div>
    </div>
  );
};
