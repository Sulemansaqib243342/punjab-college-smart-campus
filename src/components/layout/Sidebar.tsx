import React from 'react';
import {
  LayoutGrid,
  Users,
  GraduationCap,
  CalendarCheck,
  Award,
  CreditCard,
  Clock,
  BookOpen,
  Bell,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserPlus,
  HelpCircle,
  Settings,
  LogOut,
  BarChart3,
  FileText,
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

  // Unified Navigation Items Matching Exact Mockup
  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: <LayoutGrid className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'teacher-dashboard',
      label: 'Teacher dashboard',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'student-dashboard',
      label: 'Student dashboard',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'students',
      label: 'Students',
      icon: <Users className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'teachers',
      label: 'Teachers',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <CalendarCheck className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'exams',
      label: 'Examinations',
      icon: <FileText className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'results',
      label: 'Results',
      icon: <BarChart3 className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'fees',
      label: 'Fees & finance',
      icon: <CreditCard className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'timetable',
      label: 'Timetable',
      icon: <Clock className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'materials',
      label: 'Study materials',
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'notices',
      label: 'Campus notices',
      icon: <Bell className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: <BarChart3 className="w-4 h-4 shrink-0" />,
    },
  ];

  const isItemActive = (id: string) => {
    if (id === 'teacher-dashboard') {
      return activeView === 'teacher-dashboard' || (role === 'teacher' && activeView === 'dashboard');
    }
    if (id === 'student-dashboard') {
      return activeView === 'student-dashboard' || (role === 'student' && activeView === 'dashboard');
    }
    if (id === 'dashboard') {
      return activeView === 'dashboard' && role === 'admin';
    }
    return activeView === id;
  };

  const handleItemClick = (id: string) => {
    if (id === 'performance') {
      if (onOpenPerformance) onOpenPerformance();
      else setActiveView('results');
    } else {
      setActiveView(id);
    }
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
        className={`fixed lg:sticky top-0 lg:top-18 z-50 lg:z-30 h-screen lg:h-[calc(100vh-4.5rem)] bg-[#0d1326] text-slate-300 border-r border-slate-800/80 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Mobile Header with Official Logo */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <CollegeLogo size="sm" showCampus={false} />
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Campus Switcher Card (Exact Mockup) */}
        {!isCollapsed && (
          <div className="p-3">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-800/80 transition-colors">
              <div className="space-y-0.5">
                <div className="font-bold text-white leading-tight">Minar-e-Pakistan</div>
                <div className="text-[10px] text-slate-400">Lahore campus</div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                  }}
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                  title="Collapse sidebar"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="p-3 flex items-center justify-center border-b border-slate-800">
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              title="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Items List (Matches Exact Mockup) */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                  active
                    ? 'bg-[#2563eb] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className={active ? 'text-white' : 'text-slate-400'}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Sidebar Bottom Footer Section */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          {!isCollapsed && (
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Here to help.</span>
              </div>
              <button
                type="button"
                onClick={() => handleItemClick('notices')}
                className="text-[11px] text-slate-400 hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Visit the help center</span>
                <span>→</span>
              </button>
            </div>
          )}

          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => handleItemClick('design-system')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </button>

            <button
              type="button"
              onClick={() => store.logout()}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors cursor-pointer ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="Log out"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Log out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
