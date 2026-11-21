-- ========================================================================
-- Smart Campus: Punjab College, Minar-e-Pakistan Campus Lahore
-- Supabase Database Seed File
-- ========================================================================

-- Insert Demo Users into auth.users (if supported) & public.profiles
-- Note: Replace UUIDs or use Supabase Studio SQL runner.
insert into public.classes (id, name, grade_level, section, group_name, room_no)
values 
  ('11111111-1111-1111-1111-111111111101', '11th ICS-A', '11th', 'A', 'ICS', 'Room 101 (CS Block)'),
  ('11111111-1111-1111-1111-111111111102', '11th Pre-Medical', '11th', 'B', 'Pre-Medical', 'Room 104 (Bio Wing)'),
  ('11111111-1111-1111-1111-111111111103', '12th Pre-Engineering', '12th', 'A', 'Pre-Engineering', 'Room 202 (Senior Hall)')
on conflict do nothing;

insert into public.subjects (id, code, name, groups, credit_hours)
values
  ('22222222-2222-2222-2222-222222222201', 'CS-101', 'Computer Science', array['ICS'], 4),
  ('22222222-2222-2222-2222-222222222202', 'MTH-102', 'Mathematics', array['ICS', 'Pre-Engineering'], 4),
  ('22222222-2222-2222-2222-222222222203', 'PHY-103', 'Physics', array['ICS', 'Pre-Engineering', 'Pre-Medical'], 4),
  ('22222222-2222-2222-2222-222222222204', 'CHM-104', 'Chemistry', array['Pre-Engineering', 'Pre-Medical'], 4),
  ('22222222-2222-2222-2222-222222222205', 'BIO-105', 'Biology', array['Pre-Medical'], 4),
  ('22222222-2222-2222-2222-222222222206', 'ENG-106', 'English Compulsory', array['ICS', 'Pre-Medical', 'Pre-Engineering', 'Commerce', 'Arts'], 3),
  ('22222222-2222-2222-2222-222222222207', 'URD-107', 'Urdu Compulsory', array['ICS', 'Pre-Medical', 'Pre-Engineering', 'Commerce', 'Arts'], 3),
  ('22222222-2222-2222-2222-222222222208', 'ISL-108', 'Islamic Education', array['ICS', 'Pre-Medical', 'Pre-Engineering'], 2),
  ('22222222-2222-2222-2222-222222222209', 'PAK-109', 'Pakistan Studies', array['ICS', 'Pre-Medical', 'Pre-Engineering'], 2)
on conflict do nothing;

insert into public.teachers (id, employee_id, full_name, qualification, specialization, phone, email, joining_date, photo_url)
values
  ('33333333-3333-3333-3333-333333333301', 'PCL-TCH-01', 'Prof. Tariq Mahmood', 'M.Phil Computer Science, PU', 'Artificial Intelligence, C++ & Database Systems', '+92 321 4455667', 'teacher@smartcampus.com', '2018-09-01', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
  ('33333333-3333-3333-3333-333333333302', 'PCL-TCH-02', 'Dr. Ayesha Siddiqui', 'Ph.D Physics, Quaid-i-Azam University', 'Electromagnetism & Quantum Physics', '+92 301 8899771', 'ayesha.siddiqui@smartcampus.com', '2019-03-15', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'),
  ('33333333-3333-3333-3333-333333333303', 'PCL-TCH-03', 'Prof. Muhammad Rashid', 'M.Sc Mathematics, GC University Lahore', 'Calculus, Trigonometry & Coordinate Geometry', '+92 300 4422118', 'rashid.math@smartcampus.com', '2017-08-10', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
  ('33333333-3333-3333-3333-333333333304', 'PCL-TCH-04', 'Dr. Nargis Parveen', 'Ph.D Chemistry, Punjab University', 'Organic Chemistry & Thermodynamics', '+92 332 5566778', 'nargis.chem@smartcampus.com', '2019-11-01', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150'),
  ('33333333-3333-3333-3333-333333333305', 'PCL-TCH-05', 'Prof. Zainab Fatima', 'M.Phil Molecular Biology, PU', 'Cell Biology, Genetics & Human Physiology', '+92 345 6677889', 'zainab.bio@smartcampus.com', '2020-02-01', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'),
  ('33333333-3333-3333-3333-333333333306', 'PCL-TCH-06', 'Prof. Hamza Farooq', 'M.A English Literature, Kinnaird/PU', 'Modern English Prose, Grammar & Composition', '+92 312 9900112', 'hamza.eng@smartcampus.com', '2021-01-15', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
  ('33333333-3333-3333-3333-333333333307', 'PCL-TCH-07', 'Prof. Hafiz Bilal', 'M.A Islamic Studies & Gold Medalist', 'Islamic Ethics, Quranic Exegesis & Hadith', '+92 305 1122334', 'bilal.islamiat@smartcampus.com', '2016-09-01', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'),
  ('33333333-3333-3333-3333-333333333308', 'PCL-TCH-08', 'Prof. Rehan Ali', 'M.Sc Computer Systems & Networking', 'Data Communications, Hardware & Python', '+92 323 7788990', 'rehan.cs@smartcampus.com', '2021-08-15', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150'),
  ('33333333-3333-3333-3333-333333333309', 'PCL-TCH-09', 'Prof. Maryam Nawaz', 'M.Phil Chemistry, UET Lahore', 'Inorganic & Industrial Chemistry', '+92 334 3344556', 'maryam.chem@smartcampus.com', '2022-03-01', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150'),
  ('33333333-3333-3333-3333-333333333310', 'PCL-TCH-10', 'Prof. Usman Ghani', 'M.Phil Applied Mathematics, GCUL', 'Differential Equations & Linear Algebra', '+92 308 9988776', 'usman.math@smartcampus.com', '2020-09-01', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150'),
  ('33333333-3333-3333-3333-333333333311', 'PCL-TCH-11', 'Prof. Bushra Rehman', 'M.A Urdu Literature, Punjab University', 'Classical Urdu Poetry & Essay Stylistics', '+92 315 6677881', 'bushra.urdu@smartcampus.com', '2019-10-01', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150')
on conflict do nothing;

insert into public.exams (id, name, exam_type, academic_year, start_date, end_date, total_marks_per_subject, is_published)
values
  ('44444444-4444-4444-4444-444444444401', 'Monthly Test - October 2024', 'monthly', '2024-2025', '2024-10-20', '2024-10-27', 50, true),
  ('44444444-4444-4444-4444-444444444402', 'Mid-Term Examination 2024', 'midterm', '2024-2025', '2024-12-05', '2024-12-16', 100, true)
on conflict do nothing;

