-- ========================================================================
-- Smart Campus: College Management System
-- Punjab College, Minar-e-Pakistan Campus, Lahore
-- Complete Supabase PostgreSQL Normalized Schema with RLS
-- ========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked with auth.users)
-- Notice: Roles are explicitly NOT stored here per requirement.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  avatar_url text,
  phone text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. USER_ROLES TABLE (RBAC Separation)
create table if not exists public.user_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('admin', 'teacher', 'student')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, role)
);

-- Helper function to check role in RLS
create or replace function public.has_role(user_id uuid, check_role text)
returns boolean as $$
begin
  return exists (
    select 1 from public.user_roles
    where user_roles.user_id = user_id
    and user_roles.role = check_role
  );
end;
$$ language plpgsql security definer;

-- 3. CLASSES TABLE
create table if not exists public.classes (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique, -- e.g. "11th ICS-A"
  grade_level text not null check (grade_level in ('11th', '12th')),
  section text not null,
  group_name text not null check (group_name in ('Pre-Medical', 'Pre-Engineering', 'ICS', 'Commerce', 'Arts')),
  room_no text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SUBJECTS TABLE
create table if not exists public.subjects (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique, -- e.g. "PHY-11"
  name text not null,        -- e.g. "Physics"
  groups text[] not null,    -- ['Pre-Engineering', 'Pre-Medical']
  credit_hours integer default 4,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. TEACHERS TABLE
create table if not exists public.teachers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  employee_id text not null unique, -- e.g. "TCH-201"
  full_name text not null,
  qualification text not null,
  specialization text not null,
  phone text not null,
  email text not null unique,
  joining_date date not null,
  assigned_classes uuid[] default '{}',
  assigned_subjects uuid[] default '{}',
  photo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. STUDENTS TABLE
create table if not exists public.students (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  roll_number text not null unique, -- e.g. "PCL-24-101"
  admission_no text not null unique,
  full_name text not null,
  father_name text not null,
  cnic_bform text not null,
  dob date not null,
  gender text not null check (gender in ('Male', 'Female')),
  blood_group text,
  phone text not null,
  email text not null,
  address text not null,
  class_id uuid not null references public.classes(id) on delete restrict,
  group_name text not null check (group_name in ('Pre-Medical', 'Pre-Engineering', 'ICS', 'Commerce', 'Arts')),
  admission_date date default current_date not null,
  status text not null default 'active' check (status in ('active', 'struck_off', 'graduated')),
  photo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. ADMISSIONS TABLE
create table if not exists public.admissions (
  id uuid primary key default uuid_generate_v4(),
  applicant_name text not null,
  father_name text not null,
  cnic_bform text not null,
  dob date not null,
  gender text not null check (gender in ('Male', 'Female')),
  contact text not null,
  email text not null,
  address text not null,
  previous_marks numeric not null,
  total_marks numeric not null,
  percentage numeric not null,
  previous_board text not null,
  group_name text not null check (group_name in ('Pre-Medical', 'Pre-Engineering', 'ICS', 'Commerce', 'Arts')),
  photo_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  roll_number_assigned text,
  remarks text,
  applied_date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. ATTENDANCE TABLE
create table if not exists public.attendance (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  date date not null default current_date,
  status text not null check (status in ('present', 'absent', 'leave')),
  marked_by uuid references public.teachers(id) on delete set null,
  remarks text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (student_id, date)
);

-- 9. EXAMS TABLE
create table if not exists public.exams (
  id uuid primary key default uuid_generate_v4(),
  name text not null, -- e.g. "Mid-Term Examination 2024"
  exam_type text not null check (exam_type in ('monthly', 'midterm', 'final')),
  academic_year text not null default '2024-2025',
  start_date date not null,
  end_date date not null,
  total_marks_per_subject numeric not null default 100,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. MARKS TABLE
create table if not exists public.marks (
  id uuid primary key default uuid_generate_v4(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  marks_obtained numeric not null check (marks_obtained >= 0),
  total_marks numeric not null check (total_marks > 0),
  remarks text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (exam_id, student_id, subject_id)
);

-- 11. FEE STRUCTURES & FEES TABLE
create table if not exists public.fee_structures (
  id uuid primary key default uuid_generate_v4(),
  class_id uuid not null references public.classes(id) on delete cascade,
  title text not null,
  tuition_fee numeric not null default 15000,
  lab_fee numeric not null default 2500,
  library_fee numeric not null default 1000,
  exam_fee numeric not null default 1500,
  sports_fee numeric not null default 1000,
  total_amount numeric not null default 21000,
  due_day integer default 10
);

create table if not exists public.fees (
  id uuid primary key default uuid_generate_v4(),
  voucher_no text not null unique,
  student_id uuid not null references public.students(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  month_year text not null,
  total_amount numeric not null,
  paid_amount numeric not null default 0,
  balance numeric not null default 0,
  status text not null default 'unpaid' check (status in ('paid', 'unpaid', 'partial')),
  issue_date date not null default current_date,
  due_date date not null,
  paid_date date,
  payment_method text,
  fine numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. TIMETABLE TABLE
create table if not exists public.timetable (
  id uuid primary key default uuid_generate_v4(),
  class_id uuid not null references public.classes(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  day_of_week text not null check (day_of_week in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
  period_number integer not null check (period_number between 1 and 8),
  start_time text not null,
  end_time text not null,
  room_no text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. STUDY MATERIALS TABLE
create table if not exists public.study_materials (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  class_id uuid not null references public.classes(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  teacher_name text not null,
  file_url text not null,
  file_type text not null check (file_type in ('pdf', 'doc', 'slides', 'link')),
  file_size text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. NOTICES TABLE
create table if not exists public.notices (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  category text not null check (category in ('general', 'exam', 'holiday', 'urgent', 'sports')),
  target_audience text not null check (target_audience in ('all', 'teachers', 'students', 'class')),
  class_id uuid references public.classes(id) on delete cascade,
  is_pinned boolean default false,
  posted_by_name text not null,
  date date not null default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.classes enable row level security;
alter table public.subjects enable row level security;
alter table public.teachers enable row level security;
alter table public.students enable row level security;
alter table public.admissions enable row level security;
alter table public.attendance enable row level security;
alter table public.exams enable row level security;
alter table public.marks enable row level security;
alter table public.fee_structures enable row level security;
alter table public.fees enable row level security;
alter table public.timetable enable row level security;
alter table public.study_materials enable row level security;
alter table public.notices enable row level security;

-- Profiles & User Roles
create policy "Allow users to read their own profile" on public.profiles
  for select using (auth.uid() = id or public.has_role(auth.uid(), 'admin'));

create policy "Allow admins full access to user_roles" on public.user_roles
  for all using (public.has_role(auth.uid(), 'admin'));

create policy "Allow users to read their own role" on public.user_roles
  for select using (auth.uid() = user_id);

-- Classes & Subjects: Read for all authenticated, write for admin
create policy "Allow read classes for authenticated users" on public.classes
  for select using (auth.role() = 'authenticated');
create policy "Allow admin write classes" on public.classes
  for all using (public.has_role(auth.uid(), 'admin'));

create policy "Allow read subjects for authenticated users" on public.subjects
  for select using (auth.role() = 'authenticated');
create policy "Allow admin write subjects" on public.subjects
  for all using (public.has_role(auth.uid(), 'admin'));

-- Teachers: read for authenticated, manage for admin
create policy "Allow read teachers" on public.teachers
  for select using (auth.role() = 'authenticated');
create policy "Allow admin manage teachers" on public.teachers
  for all using (public.has_role(auth.uid(), 'admin'));

-- Students:
create policy "Admin full access students" on public.students
  for all using (public.has_role(auth.uid(), 'admin'));
create policy "Teachers read students" on public.students
  for select using (public.has_role(auth.uid(), 'teacher'));
create policy "Student read own profile" on public.students
  for select using (auth.uid() = user_id);

-- Attendance:
create policy "Teachers and Admins mark attendance" on public.attendance
  for all using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'teacher'));
create policy "Students view own attendance" on public.attendance
  for select using (
    exists (
      select 1 from public.students
      where students.id = attendance.student_id
      and students.user_id = auth.uid()
    )
  );

-- Marks:
create policy "Teachers and Admins manage marks" on public.marks
  for all using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'teacher'));
create policy "Students view own marks" on public.marks
  for select using (
    exists (
      select 1 from public.students
      where students.id = marks.student_id
      and students.user_id = auth.uid()
    )
  );

-- Fees:
create policy "Admin manage fees" on public.fees
  for all using (public.has_role(auth.uid(), 'admin'));
create policy "Students read own fees" on public.fees
  for select using (
    exists (
      select 1 from public.students
      where students.id = fees.student_id
      and students.user_id = auth.uid()
    )
  );

-- Notices & Study Materials:
create policy "Read notices" on public.notices
  for select using (auth.role() = 'authenticated');
create policy "Admin and Teacher post notices" on public.notices
  for all using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'teacher'));

create policy "Read study materials" on public.study_materials
  for select using (auth.role() = 'authenticated');
create policy "Teachers and Admin upload materials" on public.study_materials
  for all using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'teacher'));

