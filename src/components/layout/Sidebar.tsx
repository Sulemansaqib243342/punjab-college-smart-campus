import React from 'react';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  GraduationCap,
  CalendarCheck,
  FileSpreadsheet,
  Award,
  CreditCard,
  Clock,
  BookOpen,
  Bell,
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { UserRole } from '../../types';
import { CollegeLogo, CollegeLogoIcon } from '../common/CollegeLogo';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onOpenPerformance?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: 'red' | 'blue' | 'emerald';
  roles: UserRole[];
  action?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  isOpen,
  onCloseMobile,
  isCollapsed,
  setIsCollapsed,
  onOpenPerformance,
}) => {
  const store = useStore();
  const currentUser = store.currentUser;
  const role = currentUser?.role || 'admin';

  // Calculate pending admissions count
  const pendingAdmissions = store.admissions.filter((a) => a.status === 'pending').length;

  // Check if student has low attendance
  const student = role === 'student' ? store.students.find((s) => s.email === currentUser?.email) || store.students[0] : null;
  const studentAttendance = student ? store.attendance.filter((a) => a.student_id === student.id) : [];
  const presentCount = studentAttendance.filter((a) => a.status === 'present').length;
  const attPct = studentAttendance.length > 0 ? Math.round((presentCount / studentAttendance.length) * 100) : 85;
  const hasAttWarning = attPct < 75;

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'admissions',
      label: 'Admissions',
      icon: <UserPlus className="w-5 h-5 shrink-0" />,
      badge: pendingAdmissions > 0 ? `${pendingAdmissions} New` : undefined,
      badgeColor: 'red',
      roles: ['admin'],
    },
    {
      id: 'students',
      label: role === 'teacher' ? 'My Students' : 'Students Directory',
      icon: <Users className="w-5 h-5 shrink-0" />,
      badge: role === 'admin' ? store.students.length : undefined,
      badgeColor: 'blue',
      roles: ['admin', 'teacher'],
    },
    {
      id: 'teachers',
      label: 'Faculty & Teachers',
      icon: <GraduationCap className="w-5 h-5 shrink-0" />,
      badge: store.teachers.length,
      badgeColor: 'blue',
      roles: ['admin'],
    },
    {
      id: 'attendance',
      label: role === 'student' ? 'My Attendance' : 'Attendance Register',
      icon: <CalendarCheck className="w-5 h-5 shrink-0" />,
      badge: role === 'student' && hasAttWarning ? 'Alert' : undefined,
      badgeColor: 'red',
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'exams',
      label: role === 'teacher' ? 'Marks Entry' : 'Exams & Marks',
      icon: <FileSpreadsheet className="w-5 h-5 shrink-0" />,
      roles: ['admin', 'teacher'],
    },
    {
      id: 'results',
      label: role === 'student' ? 'My Result Card' : 'Results & Positions',
      icon: <Award className="w-5 h-5 shrink-0" />,
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'fees',
      label: role === 'student' ? 'Fee Vouchers' : 'Fee Management',
      icon: <CreditCard className="w-5 h-5 shrink-0" />,
      roles: ['admin', 'student'],
    },
    {
      id: 'timetable',
      label: role === 'student' ? 'Class Timetable' : 'Weekly Timetable',
      icon: <Clock className="w-5 h-5 shrink-0" />,
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'materials',
      label: 'Study Materials',
      icon: <BookOpen className="w-5 h-5 shrink-0" />,
      badge: store.studyMaterials.length,
      badgeColor: 'emerald',
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'notices',
      label: 'Notice Board',
      icon: <Bell className="w-5 h-5 shrink-0" />,
      badge: store.notices.length,
      badgeColor: 'blue',
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'design-system',
      label: 'UI Kit & Overview',
      icon: <Sparkles className="w-5 h-5 shrink-0" />,
      badge: 'Design',
      badgeColor: 'red',
      roles: ['admin', 'teacher', 'student'],
    },
  ];

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  const handleItemClick = (item: NavItem) => {
    setActiveView(item.id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-18 z-50 lg:z-30 h-screen lg:h-[calc(100vh-4.5rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Mobile Header with Official Logo */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 lg:hidden">
          <CollegeLogo size="sm" showCampus={false} />
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800/80">
          {!isCollapsed ? (
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#232766] dark:text-blue-300">
              Campus Navigation
            </span>
          ) : (
            <div className="mx-auto">
              <CollegeLogoIcon size={24} />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 mx-auto lg:ml-auto cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {filteredItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all relative group cursor-pointer ${
                  isActive
                    ? 'bg-[#232766] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className={isActive ? 'text-[#ea432a]' : 'text-slate-400 group-hover:text-[#232766] dark:group-hover:text-slate-200'}>
                  {item.icon}
                </span>

                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!isCollapsed && item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor === 'red'
                        ? 'bg-[#ea432a] text-white'
                        : item.badgeColor === 'emerald'
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-[#191c4d] text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}

          {/* Special Feature Button for Student: Smart AI Performance Report */}
          {role === 'student' && onOpenPerformance && (
            <div className="pt-2">
              <button
                onClick={onOpenPerformance}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-linear-to-r from-[#ea432a] to-[#232766] text-white shadow-md hover:opacity-95 transition-all cursor-pointer ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title="Open Smart AI Performance Report"
              >
                <Sparkles className="w-5 h-5 shrink-0 text-amber-300 animate-spin" />
                {!isCollapsed && <span>AI Report Card</span>}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-blue-950/30 border border-slate-200 dark:border-blue-900/40 text-[11px]">
                <div className="font-extrabold text-[#232766] dark:text-blue-300">Minar-e-Pakistan Campus</div>
                <div className="text-[#ea432a] font-bold mt-0.5">UAN: (042) 111-742-111</div>
              </div>

              <button
                onClick={() => store.resetToDefaults()}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Restore seeded database"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Database</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => store.resetToDefaults()}
              className="w-full p-2 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              title="Reset Database"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
