import React, { useState } from 'react';
import {
  Bell,
  Sun,
  Moon,
  Menu,
  Shield,
  GraduationCap,
  Briefcase,
  LogOut,
  ChevronDown,
  RotateCcw,
  UserCheck,
  Search,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { UserRole } from '../../types';
import { CollegeLogo } from '../common/CollegeLogo';

interface NavbarProps {
  onToggleSidebar: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onGoToLanding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  setActiveView,
  onGoToLanding,
}) => {
  const store = useStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentUser = store.currentUser;
  const role = currentUser?.role || 'admin';

  const roleColors: Record<UserRole, { badge: string; label: string; icon: React.ReactNode }> = {
    admin: {
      badge: 'bg-red-50 text-[#ea432a] border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900',
      label: 'Campus Admin',
      icon: <Shield className="w-3.5 h-3.5 text-[#ea432a]" />,
    },
    teacher: {
      badge: 'bg-indigo-50 text-[#232766] border-indigo-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900',
      label: 'Faculty Member',
      icon: <Briefcase className="w-3.5 h-3.5 text-[#232766]" />,
    },
    student: {
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900',
      label: 'Enrolled Student',
      icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />,
    },
  };

  const urgentNotices = store.notices.filter((n) => n.category === 'urgent' || n.is_pinned);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex items-center justify-between px-4 lg:px-6 h-18">
        {/* Left: Mobile hamburger & Official Punjab Colleges Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={onGoToLanding}
            className="cursor-pointer group flex items-center"
          >
            <CollegeLogo size="md" showText={true} showCampus={true} />
          </div>
        </div>

        {/* Center: Search Bar & Role Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative w-64 xl:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search students, classes, anything..."
              className="w-full pl-10 pr-12 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-[#11182c] text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#232766]"
            />
            <span className="absolute right-2.5 top-1.5 px-1.5 py-0.2 rounded-md bg-slate-200/60 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-400 border border-slate-300/40 dark:border-slate-700">
              ⌘ K
            </span>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs font-semibold">
            <span className="px-2 text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1 font-bold">
              <UserCheck className="w-3.5 h-3.5 text-[#ea432a]" />
            </span>
            {(['admin', 'teacher', 'student'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => {
                  store.switchRole(r);
                  setActiveView('dashboard');
                }}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer text-xs ${
                  role === r
                    ? 'bg-[#232766] text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#232766] dark:hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => store.toggleTheme()}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={store.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {store.theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-[#232766]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Campus Announcements"
            >
              <Bell className="w-5 h-5" />
              {urgentNotices.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ea432a] rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-[#232766] dark:text-white flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#ea432a]" /> Campus Notices & Alerts
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-[#ea432a] dark:bg-red-950/60 dark:text-red-400">
                    {store.notices.length} Total
                  </span>
                </div>
                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                  {store.notices.slice(0, 4).map((notice) => (
                    <div
                      key={notice.id}
                      onClick={() => {
                        setActiveView('notices');
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {notice.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{notice.date}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 text-[11px]">
                        {notice.content}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setActiveView('notices');
                    setShowNotifications(false);
                  }}
                  className="w-full mt-3 py-2 text-center text-xs font-bold text-[#232766] dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-blue-950/30 rounded-xl transition-colors cursor-pointer"
                >
                  View All Notices & Official Circulars →
                </button>
              </div>
            )}
          </div>

          {/* User Profile Pill Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 pl-2 sm:pl-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#1b224b] dark:text-blue-300 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-[#1b224b] dark:text-blue-400" />
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                  {role === 'teacher' ? 'Sana Iqbal' : role === 'student' ? (currentUser?.full_name || 'Muhammad Hamza') : 'Campus Admin'}
                </span>
                <span className="text-[10px] text-slate-400 block capitalize">
                  {role === 'teacher' ? 'Teacher' : role === 'student' ? 'Student' : 'Administrator'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {showProfileMenu && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2 border-b border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{currentUser?.full_name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser?.email}</p>
                  <p className="text-[11px] text-[#ea432a] font-bold mt-1">
                    Punjab Colleges • Minar-e-Pakistan Campus
                  </p>
                </div>

                <div className="py-2 space-y-1">
                  <div className="px-2 py-1 text-[11px] font-bold uppercase text-slate-400">Switch Account Role</div>
                  {(['admin', 'teacher', 'student'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        store.switchRole(r);
                        setShowProfileMenu(false);
                        setActiveView('dashboard');
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between cursor-pointer ${
                        role === r
                          ? 'bg-slate-100 dark:bg-blue-950/40 text-[#232766] dark:text-blue-400 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="capitalize">{r} Portal</span>
                      {role === r && <span className="w-2 h-2 rounded-full bg-[#ea432a]" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      store.resetToDefaults();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset Demo Data</span>
                  </button>

                  <button
                    onClick={() => {
                      store.logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#ea432a] hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg flex items-center gap-2 font-bold cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
