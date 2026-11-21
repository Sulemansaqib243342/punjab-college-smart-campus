import React, { useState } from 'react';
import { LayoutGrid, Users, CreditCard, Menu, CalendarCheck, Clock } from 'lucide-react';
import { useStore } from './lib/store';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { AdmissionsModule } from './components/modules/admissions/AdmissionsModule';
import { StudentsModule } from './components/modules/students/StudentsModule';
import { TeachersModule } from './components/modules/teachers/TeachersModule';
import { AttendanceModule } from './components/modules/attendance/AttendanceModule';
import { ExamsModule } from './components/modules/exams/ExamsModule';
import { ResultsModule } from './components/modules/results/ResultsModule';
import { FeesModule } from './components/modules/fees/FeesModule';
import { TimetableModule } from './components/modules/timetable/TimetableModule';
import { MaterialsModule } from './components/modules/materials/MaterialsModule';
import { NoticesModule } from './components/modules/notices/NoticesModule';
import { DesignSystemOverview } from './components/modules/DesignSystemOverview';
import { StudentPerformanceModal } from './components/common/StudentPerformanceModal';
import { PrintableResultCard } from './components/common/PrintableResultCard';
import { PrintableFeeVoucher } from './components/common/PrintableFeeVoucher';
import { CollegeLogo } from './components/common/CollegeLogo';
import { StudentResultSummary } from './types';

export function App() {
  const store = useStore();
  const currentUser = store.currentUser;

  // View state
  const [screen, setScreen] = useState<'app' | 'landing' | 'login' | 'public_admission'>(
    currentUser ? 'app' : 'landing'
  );
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Global modals
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [showResultCardModal, setShowResultCardModal] = useState(false);
  const [showFeeVoucherModal, setShowFeeVoucherModal] = useState(false);

  // Current active student for student modal previews
  const activeStudent = store.students.find((s) => s.email === currentUser?.email) || store.students[0];
  const activeClass = store.classes.find((c) => c.id === activeStudent?.class_id) || store.classes[0];
  const activeVoucher = store.feeVouchers.find((v) => v.student_id === activeStudent?.id) || store.feeVouchers[0];

  // If user logs in or switches
  const handleLoginSuccess = () => {
    setScreen('app');
    setActiveView('dashboard');
  };

  // 1. Landing Screen
  if (screen === 'landing') {
    return (
      <LandingPage
        onGoToLogin={() => setScreen('login')}
        onGoToAdmission={() => setScreen('public_admission')}
      />
    );
  }

  // 2. Login Screen
  if (screen === 'login' || (!currentUser && screen === 'app')) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onGoToLanding={() => setScreen('landing')}
        onGoToAdmission={() => setScreen('public_admission')}
      />
    );
  }

  // 3. Public Admission Form Screen (Accessible without login)
  if (screen === 'public_admission') {
    return (
      <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-10">
        <AdmissionsModule
          initialTab="apply"
          isPublicPage={true}
          onGoToLogin={() => setScreen('login')}
          onGoToLanding={() => setScreen('landing')}
        />
      </div>
    );
  }

  // 4. Main App Layout (Authenticated)
  const role = currentUser?.role || 'admin';

  return (
    <div className="min-h-screen bg-[#f8faff] dark:bg-[#0c1120] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeView={activeView}
        setActiveView={setActiveView}
        onGoToLanding={() => setScreen('landing')}
      />

      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          onOpenPerformance={() => setShowPerformanceModal(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 min-w-0 overflow-y-auto">
          {activeView === 'dashboard' && (
            <>
              {role === 'admin' && (
                <AdminDashboard
                  onNavigate={setActiveView}
                  onOpenPerformanceForStudent={(stdId) => {
                    const std = store.students.find((s) => s.id === stdId);
                    if (std) setShowPerformanceModal(true);
                  }}
                />
              )}
              {role === 'teacher' && <TeacherDashboard onNavigate={setActiveView} />}
              {role === 'student' && (
                <StudentDashboard
                  onNavigate={setActiveView}
                  onOpenPerformance={() => setShowPerformanceModal(true)}
                  onOpenResultCard={() => setShowResultCardModal(true)}
                  onOpenFeeVoucher={() => setShowFeeVoucherModal(true)}
                />
              )}
            </>
          )}

          {activeView === 'teacher-dashboard' && (
            <TeacherDashboard onNavigate={setActiveView} />
          )}

          {activeView === 'student-dashboard' && (
            <StudentDashboard
              onNavigate={setActiveView}
              onOpenPerformance={() => setShowPerformanceModal(true)}
              onOpenResultCard={() => setShowResultCardModal(true)}
              onOpenFeeVoucher={() => setShowFeeVoucherModal(true)}
            />
          )}

          {activeView === 'admissions' && <AdmissionsModule />}
          {activeView === 'students' && <StudentsModule />}
          {activeView === 'teachers' && <TeachersModule />}
          {activeView === 'attendance' && <AttendanceModule />}
          {activeView === 'exams' && <ExamsModule />}
          {activeView === 'results' && <ResultsModule />}
          {activeView === 'fees' && <FeesModule />}
          {activeView === 'timetable' && <TimetableModule />}
          {activeView === 'materials' && <MaterialsModule />}
          {activeView === 'notices' && (
            <NoticesModule onNavigateToResults={() => setActiveView('results')} />
          )}
          {activeView === 'performance' && (
            <div className="py-2">
              <StudentPerformanceModal
                student={activeStudent}
                onClose={() => setActiveView('dashboard')}
              />
            </div>
          )}
          {activeView === 'design-system' && <DesignSystemOverview />}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Performance Modal */}
      {showPerformanceModal && activeStudent && (
        <StudentPerformanceModal
          student={activeStudent}
          onClose={() => setShowPerformanceModal(false)}
        />
      )}

      {/* Global Result Card Modal */}
      {showResultCardModal && activeStudent && (
        <PrintableResultCard
          result={
            store.getResultsSummaryForClass('exam-midterm-dec', activeStudent.class_id).find(
              (r) => r.student.id === activeStudent.id
            ) || {
              student: activeStudent,
              exam: store.exams[1] || store.exams[0],
              class_room: activeClass,
              marks: [],
              total_obtained: 544,
              total_maximum: 600,
              overall_percentage: 90.6,
              overall_grade: 'A+',
              status: 'Pass',
              rank: 1,
              total_students_in_class: 22,
            }
          }
          onClose={() => setShowResultCardModal(false)}
        />
      )}

      {/* Global Fee Voucher Modal */}
      {showFeeVoucherModal && activeVoucher && activeStudent && (
        <PrintableFeeVoucher
          voucher={activeVoucher}
          student={activeStudent}
          classRoom={activeClass}
          onClose={() => setShowFeeVoucherModal(false)}
        />
      )}

      {/* Mobile Bottom Navigation Bar (Matches Exact Role Mockup) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0d1326]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800/80 py-2 px-3 flex items-center justify-around md:hidden shadow-lg">
        {role === 'teacher' || role === 'student' ? (
          <>
            <button
              type="button"
              onClick={() => setActiveView('dashboard')}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'dashboard' || activeView === 'teacher-dashboard' || activeView === 'student-dashboard'
                  ? 'text-[#101c4e] dark:text-blue-400 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('attendance')}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'attendance'
                  ? 'text-[#101c4e] dark:text-blue-400 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <span>Attendance</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('timetable')}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'timetable'
                  ? 'text-[#101c4e] dark:text-blue-400 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span>Timetable</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Menu className="w-4 h-4" />
              </div>
              <span>More</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setActiveView('dashboard')}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'dashboard'
                  ? 'text-[#1b224b] dark:text-white'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <span>Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('students')}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'students'
                  ? 'text-[#1b224b] dark:text-white'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span>Students</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('fees')}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'fees'
                  ? 'text-[#1b224b] dark:text-white'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <span>Fees</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Menu className="w-4 h-4" />
              </div>
              <span>More</span>
            </button>
          </>
        )}
      </nav>
    </div>
  );
}

export default App;
