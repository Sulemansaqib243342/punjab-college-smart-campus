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

  // Navigation Items Categorized
  const academicItems = [
    {
      id: 'students',
      label: 'Students',
      icon: <Users className="w-4 h-4 shrink-0" />,
      roles: ['admin', 'teacher'],
    },
    {
      id: 'teachers',
      label: 'Teachers',
      icon: <GraduationCap className="w-4 h-4 shrink-0" />,
      roles: ['admin'],
    },
    {
      id: 'timetable',
      label: 'Classes',
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <CalendarCheck className="w-4 h-4 shrink-0" />,
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'exams',
      label: 'Examinations',
      icon: <FileText className="w-4 h-4 shrink-0" />,
      roles: ['admin', 'teacher'],
    },
  ];

  const adminItems = [
    {
      id: 'admissions',
      label: 'Admissions',
      icon: <UserPlus className="w-4 h-4 shrink-0" />,
      badge: '12',
      roles: ['admin'],
    },
    {
      id: 'fees',
      label: 'Fees & finance',
      icon: <CreditCard className="w-4 h-4 shrink-0" />,
      roles: ['admin', 'student'],
    },
    {
      id: 'notices',
      label: 'Campus notices',
      icon: <Bell className="w-4 h-4 shrink-0" />,
      roles: ['admin', 'teacher', 'student'],
    },
    {
      id: 'results',
      label: 'Reports',
      icon: <BarChart3 className="w-4 h-4 shrink-0" />,
      roles: ['admin', 'teacher', 'student'],
    },
  ];

  const handleItemClick = (id: string) => {
    setActiveView(id);
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

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {/* Top: Overview (Dashboard) */}
          <div>
            <button
              onClick={() => handleItemClick('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? 'Overview' : undefined}
            >
              <LayoutGrid className={`w-4 h-4 shrink-0 ${activeView === 'dashboard' ? 'text-slate-900' : 'text-slate-400'}`} />
              {!isCollapsed && <span>Overview</span>}
            </button>
          </div>

          {/* Section: ACADEMICS */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 pb-1">
                ACADEMICS
              </div>
            )}
            {academicItems
              .filter((item) => item.roles.includes(role))
              .map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className={isActive ? 'text-slate-900' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    {!isCollapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
                  </button>
                );
              })}
          </div>

          {/* Section: ADMINISTRATION */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 pb-1">
                ADMINISTRATION
              </div>
            )}
            {adminItems
              .filter((item) => item.roles.includes(role))
              .map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className={isActive ? 'text-slate-900' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    {!isCollapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
                    {!isCollapsed && item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white font-bold text-[10px]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>

          {/* Student Special Feature */}
          {role === 'student' && onOpenPerformance && (
            <div className="pt-2">
              <button
                onClick={onOpenPerformance}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold bg-linear-to-r from-[#ea432a] to-[#232766] text-white shadow-md hover:opacity-95 transition-all cursor-pointer ${
                  isCollapsed ? 'justify-center' : ''
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />
                {!isCollapsed && <span>AI Report Card</span>}
              </button>
            </div>
          )}
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
