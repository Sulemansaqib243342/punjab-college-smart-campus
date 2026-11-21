import React from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Building,
  CheckCircle2,
  ArrowRight,
  Bell,
  Calendar,
  Sparkles,
  Shield,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../../lib/store';
import { CollegeLogo } from '../common/CollegeLogo';

interface LandingPageProps {
  onGoToLogin: () => void;
  onGoToAdmission: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGoToLogin,
  onGoToAdmission,
}) => {
  const store = useStore();

  const academicPrograms = [
    {
      title: 'F.Sc Pre-Medical',
      desc: 'Pathway to King Edward, AIMC and leading medical universities in Pakistan with intensive Biology and Chemistry practicals.',
      badge: 'High Merit',
      subjects: ['Biology', 'Physics', 'Chemistry', 'English', 'Urdu', 'Islamiat'],
    },
    {
      title: 'F.Sc Pre-Engineering',
      desc: 'Rigorous mathematical and physical science curriculum preparing future engineers for UET, NUST, and GIKI.',
      badge: 'Popular',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Urdu', 'Islamiat'],
    },
    {
      title: 'ICS (Computer Science)',
      desc: 'Cutting-edge modern computing, software fundamentals, database systems, and AI essentials in state-of-the-art labs.',
      badge: 'Top Rated',
      subjects: ['Computer Science', 'Mathematics', 'Physics/Stats', 'English', 'Urdu'],
    },
    {
      title: 'I.Com (Commerce)',
      desc: 'Comprehensive training in Accounting, Banking, Commercial Geography, and Economics for future corporate leaders.',
      badge: 'Business',
      subjects: ['Principles of Accounting', 'Economics', 'Business Math', 'Commerce'],
    },
  ];

  const stats = [
    { label: 'Board Top Positions', value: '45+', icon: <Award className="w-6 h-6 text-amber-400" /> },
    { label: 'Overall Pass Rate', value: '98.4%', icon: <GraduationCap className="w-6 h-6 text-blue-300" /> },
    { label: 'Active Students', value: '2,800+', icon: <Users className="w-6 h-6 text-emerald-300" /> },
    { label: 'M.Phil & Ph.D Faculty', value: '100%', icon: <Sparkles className="w-6 h-6 text-[#ea432a]" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Notice Banner */}
      <div className="bg-[#ea432a] text-white text-xs font-semibold py-2.5 px-4 text-center flex items-center justify-center gap-2 shadow-xs">
        <Bell className="w-4 h-4 shrink-0 animate-bounce" />
        <span>
          Admissions Open for Session 2024-2025! Online registration forms & merit evaluation are active.
        </span>
        <button
          onClick={onGoToAdmission}
          className="underline ml-2 hover:text-amber-200 transition-colors cursor-pointer font-bold"
        >
          Apply Online Now →
        </button>
      </div>

      {/* Navigation Header with Official Logo */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <CollegeLogo size="md" showText={true} showCampus={true} />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onGoToAdmission}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-[#ea432a] text-[#ea432a] hover:bg-red-50 dark:hover:bg-red-950/30 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Online Admission Form
            </button>
            <button
              onClick={onGoToLogin}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#232766] hover:bg-[#1a1d4d] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <span>Portal Login</span>
              <ArrowRight className="w-4 h-4 text-[#ea432a]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Official Theme */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#1a1c4d] via-[#232766] to-[#121438] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#ea432a_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-red-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Shield className="w-4 h-4 text-[#ea432a]" /> Punjab Group of Colleges • Established 1985
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            The Step to Success at <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-amber-300 to-blue-200">
              Punjab Colleges Lahore
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            Minar-e-Pakistan Campus provides unmatched academic excellence, BISE Lahore certified faculty, state-of-the-art computer and science laboratories, and our Smart Campus digital management ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onGoToAdmission}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ea432a] hover:bg-[#d6341d] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply for Admission (2024-25)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm sm:text-base backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Staff & Student Portal</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl text-center hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-slate-300 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#ea432a] uppercase tracking-widest block mb-2">
            Academic Disciplines
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#232766] dark:text-white">
            Intermediate Academic Programs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Affiliated with the Board of Intermediate and Secondary Education (BISE) Lahore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {academicPrograms.map((prog, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-[#ea432a] border border-red-200 dark:bg-red-950/40 dark:text-red-400">
                    {prog.badge}
                  </span>
                  <BookOpen className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{prog.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {prog.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Core Subjects
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {prog.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={onGoToAdmission}
                className="mt-6 w-full py-2 text-xs font-bold text-center text-[#232766] dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-blue-950/40 rounded-xl transition-colors cursor-pointer"
              >
                Apply for {prog.title} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Principal Welcome Section */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=350"
              alt="Campus Director"
              className="w-48 h-48 rounded-2xl object-cover mx-auto md:mx-0 shadow-lg ring-4 ring-[#232766]"
            />
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white mt-3">
              Prof. Dr. Muhammad Asif
            </h4>
            <p className="text-xs text-[#ea432a] font-bold">
              Director & Principal, Minar-e-Pakistan Campus
            </p>
            <p className="text-[11px] text-slate-400">Ph.D, 25+ Years in Academic Administration</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-bold text-[#ea432a] uppercase tracking-widest block">
              Director's Address
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#232766] dark:text-white">
              Nurturing Intellect, Character, and Innovation
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              "At Punjab Colleges Minar-e-Pakistan Campus Lahore, our philosophy goes beyond textbook memorization. We inspire students to think critically, solve real-world problems, and prepare for entrance examinations like MDCAT and ECAT with supreme confidence. Our digital Smart Campus portal ensures seamless communication between teachers, parents, and students with real-time attendance alerts, automated marks tracking, and AI diagnostic reports."
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> BISE Lahore Certified Examiners
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dedicated MDCAT / ECAT Classes
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Punjab Group Merit Scholarships
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Notices Teaser */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#ea432a] uppercase tracking-widest block">
              Official Bulletins
            </span>
            <h2 className="text-2xl font-extrabold text-[#232766] dark:text-white">
              Latest Campus Announcements
            </h2>
          </div>
          <button
            onClick={onGoToLogin}
            className="text-xs font-bold text-[#ea432a] hover:underline cursor-pointer"
          >
            Access All Notices on Portal →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {store.notices.slice(0, 3).map((notice) => (
            <div
              key={notice.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="uppercase font-bold tracking-wider text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#232766] dark:text-slate-300">
                    {notice.category}
                  </span>
                  <span>{notice.date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 line-clamp-1">
                  {notice.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {notice.content}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                Posted by: <span className="font-semibold text-slate-600 dark:text-slate-300">{notice.posted_by_name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <footer className="mt-auto bg-[#191c4d] text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="bg-white p-2.5 rounded-xl inline-block mb-3">
              <img
                src="/punjab-colleges-logo.png"
                alt="Punjab Colleges Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Minar-e-Pakistan Campus Lahore. Dedicated to cultivating Pakistan's brightest intermediate scholars since 1985.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Campus Contact</h5>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ea432a] shrink-0 mt-0.5" />
                <span>Circular Road, Near Minar-e-Pakistan, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ea432a] shrink-0" />
                <span>UAN: (042) 111-742-111</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ea432a] shrink-0" />
                <span>info@smartcampus.com</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Quick Links</h5>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onGoToAdmission} className="hover:text-white transition-colors cursor-pointer">
                  Online Admission Application
                </button>
              </li>
              <li>
                <button onClick={onGoToLogin} className="hover:text-white transition-colors cursor-pointer">
                  Student & Faculty Portal Login
                </button>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Academic Disciplines (F.Sc / ICS)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-3">Demo Credentials</h5>
            <div className="bg-[#121438] p-3 rounded-xl border border-white/10 text-[11px] space-y-1">
              <div><span className="text-[#ea432a] font-bold">Admin:</span> admin@smartcampus.com / Admin@123</div>
              <div><span className="text-blue-300 font-bold">Teacher:</span> teacher@smartcampus.com / Teacher@123</div>
              <div><span className="text-emerald-400 font-bold">Student:</span> student@smartcampus.com / Student@123</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} Punjab Group of Colleges. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
