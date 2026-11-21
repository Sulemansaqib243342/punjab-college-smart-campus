import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateGrade(percentage: number): { grade: string; remarks: string; color: string } {
  if (percentage >= 80) return { grade: 'A+', remarks: 'Exceptional', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  if (percentage >= 70) return { grade: 'A', remarks: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  if (percentage >= 60) return { grade: 'B', remarks: 'Very Good', color: 'text-blue-600 bg-blue-50 border-blue-200' };
  if (percentage >= 50) return { grade: 'C', remarks: 'Good', color: 'text-amber-600 bg-amber-50 border-amber-200' };
  if (percentage >= 40) return { grade: 'D', remarks: 'Satisfactory', color: 'text-orange-600 bg-orange-50 border-orange-200' };
  return { grade: 'F', remarks: 'Needs Improvement', color: 'text-red-600 bg-red-50 border-red-200' };
}

export function formatPKR(amount: number): string {
  return 'PKR ' + amount.toLocaleString('en-PK');
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getAttendanceColor(status: 'present' | 'absent' | 'leave'): { bg: string; text: string; label: string } {
  switch (status) {
    case 'present':
      return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', text: 'text-emerald-700', label: 'Present' };
    case 'absent':
      return { bg: 'bg-red-100 text-red-800 border-red-300', text: 'text-red-700', label: 'Absent' };
    case 'leave':
      return { bg: 'bg-amber-100 text-amber-800 border-amber-300', text: 'text-amber-700', label: 'On Leave' };
  }
}

