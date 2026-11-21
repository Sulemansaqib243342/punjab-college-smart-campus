import React from 'react';
import { Printer, Download, Award, X } from 'lucide-react';
import { StudentResultSummary } from '../../types';
import { formatDate } from '../../lib/utils';

interface PrintableResultCardProps {
  result: StudentResultSummary;
  onClose: () => void;
}

export const PrintableResultCard: React.FC<PrintableResultCardProps> = ({ result, onClose }) => {
  const { student, exam, class_room, marks, total_obtained, total_maximum, overall_percentage, overall_grade, status, rank, total_students_in_class } = result;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Action Bar (Hidden in print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm">Official Examination Transcript / Result Card</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div id="printable-result-sheet" className="p-8 md:p-12 bg-white text-slate-900 font-serif">
          {/* Header */}
          <div className="border-b-4 border-double border-[#ea432a] pb-6 text-center">
            <div className="flex items-center justify-center gap-5 mb-2">
              <img
                src="/punjab-colleges-logo.png"
                alt="Punjab Colleges Logo"
                className="h-16 w-auto object-contain"
              />
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-[#232766] font-sans">
                  Punjab Colleges
                </h1>
                <h2 className="text-sm md:text-base font-bold text-[#ea432a] uppercase tracking-widest mt-0.5">
                  Minar-e-Pakistan Campus, Lahore
                </h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">
                  Affiliated with Board of Intermediate & Secondary Education (BISE) Lahore | Est. 1985
                </p>
              </div>
            </div>

            <div className="mt-4 inline-block px-6 py-1 bg-[#232766] text-white font-sans font-bold text-sm tracking-wider uppercase rounded-full">
              {exam.name.toUpperCase()} (ACADEMIC SESSION {exam.academic_year})
            </div>
          </div>

          {/* Student Bio Grid */}
          <div className="mt-6 border border-slate-300 rounded-lg p-4 font-sans text-xs md:text-sm bg-slate-50/70">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4">
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold uppercase">Roll Number</span>
                <span className="font-bold text-slate-900 text-sm md:text-base font-mono">{student.roll_number}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold uppercase">Candidate Name</span>
                <span className="font-bold text-slate-900">{student.full_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold uppercase">Father's Name</span>
                <span className="font-semibold text-slate-800">{student.father_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold uppercase">Class & Section</span>
                <span className="font-semibold text-slate-800">{class_room.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold uppercase">Academic Group</span>
                <span className="font-semibold text-blue-900">{student.group_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold uppercase">B-Form / CNIC</span>
                <span className="font-mono text-slate-800">{student.cnic_bform}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold uppercase">Admission No</span>
                <span className="font-mono text-slate-800">{student.admission_no}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-semibold uppercase">Issue Date</span>
                <span className="text-slate-800">{formatDate(new Date().toISOString())}</span>
              </div>
            </div>
          </div>

          {/* Subject Marks Table */}
          <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden font-sans">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead className="bg-blue-950 text-white font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3 border-r border-blue-900 w-12 text-center">Sr#</th>
                  <th className="py-2.5 px-3 border-r border-blue-900 w-24">Code</th>
                  <th className="py-2.5 px-3 border-r border-blue-900">Subject Title</th>
                  <th className="py-2.5 px-3 border-r border-blue-900 text-center w-24">Max Marks</th>
                  <th className="py-2.5 px-3 border-r border-blue-900 text-center w-24">Pass Marks</th>
                  <th className="py-2.5 px-3 border-r border-blue-900 text-center w-28">Obtained</th>
                  <th className="py-2.5 px-3 border-r border-blue-900 text-center w-20">%age</th>
                  <th className="py-2.5 px-3 border-r border-blue-900 text-center w-20">Grade</th>
                  <th className="py-2.5 px-3 text-center w-20">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {marks.map((m, idx) => {
                  const passMarks = Math.round(m.total_marks * 0.4);
                  const isPassed = m.marks_obtained >= passMarks;
                  return (
                    <tr key={m.subject.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 border-r border-slate-200 text-center text-slate-500">{idx + 1}</td>
                      <td className="py-2 px-3 border-r border-slate-200 font-mono text-slate-700">{m.subject.code}</td>
                      <td className="py-2 px-3 border-r border-slate-200 font-medium text-slate-900">{m.subject.name}</td>
                      <td className="py-2 px-3 border-r border-slate-200 text-center">{m.total_marks}</td>
                      <td className="py-2 px-3 border-r border-slate-200 text-center text-slate-500">{passMarks}</td>
                      <td className="py-2 px-3 border-r border-slate-200 text-center font-bold text-slate-900">{m.marks_obtained}</td>
                      <td className="py-2 px-3 border-r border-slate-200 text-center">{m.percentage}%</td>
                      <td className="py-2 px-3 border-r border-slate-200 text-center font-semibold text-blue-900">{m.grade}</td>
                      <td className="py-2 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 text-[11px] font-bold rounded ${
                            isPassed ? 'text-emerald-800 bg-emerald-100' : 'text-red-800 bg-red-100'
                          }`}
                        >
                          {isPassed ? 'PASS' : 'FAIL'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300">
                <tr>
                  <td colSpan={3} className="py-3 px-3 text-right uppercase text-xs tracking-wider border-r border-slate-200">
                    Grand Total
                  </td>
                  <td className="py-3 px-3 text-center border-r border-slate-200 text-slate-700">{total_maximum}</td>
                  <td className="py-3 px-3 text-center border-r border-slate-200 text-slate-500">-</td>
                  <td className="py-3 px-3 text-center border-r border-slate-200 text-blue-950 text-base">{total_obtained}</td>
                  <td className="py-3 px-3 text-center border-r border-slate-200 text-slate-900">{overall_percentage}%</td>
                  <td className="py-3 px-3 text-center border-r border-slate-200 text-blue-900 text-base">{overall_grade}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-extrabold uppercase rounded ${
                        status === 'Pass' ? 'text-emerald-900 bg-emerald-200' : 'text-red-900 bg-red-200'
                      }`}
                    >
                      {status === 'Pass' ? 'PASSED' : 'FAILED'}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Performance & Position Card */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="border border-amber-300 bg-amber-50/70 p-3.5 rounded-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-lg shrink-0">
                #{rank}
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-amber-900 block">Class Position / Rank</span>
                <span className="text-sm font-extrabold text-slate-900">
                  {rank === 1 ? '1st Position (Class Topper)' : rank === 2 ? '2nd Position' : rank === 3 ? '3rd Position' : `${rank}th Position`}
                </span>
                <span className="text-[10px] text-slate-600 block mt-0.5">Out of {total_students_in_class} students in {class_room.name}</span>
              </div>
            </div>

            <div className="border border-blue-200 bg-blue-50/70 p-3.5 rounded-lg">
              <span className="text-[11px] uppercase font-bold text-blue-950 block">Grading Benchmark</span>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                A+ (80% and above): Exceptional | A (70-79%): Excellent | B (60-69%): Very Good | C (50-59%): Good | D (40-49%): Pass
              </p>
            </div>

            <div className="border border-slate-300 bg-slate-50/70 p-3.5 rounded-lg">
              <span className="text-[11px] uppercase font-bold text-slate-700 block">Board Eligibility Check</span>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {overall_percentage >= 40
                  ? 'Eligible to appear in Board Annual Examination subject to 75% mandatory class attendance.'
                  : 'Notice: Remedial coaching classes mandatory prior to board registration approval.'}
              </p>
            </div>
          </div>

          {/* Signatures & Official Stamp */}
          <div className="mt-14 pt-8 border-t border-slate-300 grid grid-cols-3 text-center font-sans text-xs">
            <div>
              <div className="w-32 border-b border-slate-800 mx-auto mb-2"></div>
              <span className="font-bold text-slate-900 block">Class Incharge</span>
              <span className="text-[11px] text-slate-500">Punjab College Lahore</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-red-700/60 flex items-center justify-center -mt-6 rotate-12 text-red-700 font-bold text-[9px] uppercase tracking-wider text-center p-1">
                Official Campus Seal<br/>Punjab College Lahore
              </div>
              <span className="font-bold text-slate-900 block mt-1">Official Seal</span>
            </div>

            <div>
              <div className="w-32 border-b border-slate-800 mx-auto mb-2"></div>
              <span className="font-bold text-slate-900 block">Campus Director / Principal</span>
              <span className="text-[11px] text-slate-500">Minar-e-Pakistan Campus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

