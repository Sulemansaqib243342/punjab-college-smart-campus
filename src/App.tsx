import React, { useState } from 'react';
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
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
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

          {activeView === 'admissions' && <AdmissionsModule />}
          {activeView === 'students' && <StudentsModule />}
          {activeView === 'teachers' && <TeachersModule />}
          {activeView === 'attendance' && <AttendanceModule />}
          {activeView === 'exams' && <ExamsModule />}
          {activeView === 'results' && <ResultsModule />}
          {activeView === 'fees' && <FeesModule />}
          {activeView === 'timetable' && <TimetableModule />}
          {activeView === 'materials' && <MaterialsModule />}
          {activeView === 'notices' && <NoticesModule />}
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
    </div>
  );
}

export default App;
