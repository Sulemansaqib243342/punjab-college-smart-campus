# Smart Campus - College Management System
### Punjab College, Minar-e-Pakistan Campus, Lahore

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sulemansaqib243342/punjab-college-smart-campus)
[![Live on GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-232766?logo=github&style=flat-square)](https://sulemansaqib243342.github.io/punjab-college-smart-campus/)
[![License: MIT](https://img.shields.io/badge/License-MIT-ea432a?style=flat-square)](LICENSE)

A complete, production-grade College Management System built with **React, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons, Recharts, Vercel Serverless REST API, and Supabase (PostgreSQL with RLS)**.

---

## 🌐 Live Deployments & Instant Setup

- **GitHub Repository**: [https://github.com/Sulemansaqib243342/punjab-college-smart-campus](https://github.com/Sulemansaqib243342/punjab-college-smart-campus)
- **Live Demo (GitHub Pages)**: [https://sulemansaqib243342.github.io/punjab-college-smart-campus/](https://sulemansaqib243342.github.io/punjab-college-smart-campus/)
- **Deploy to Vercel in 1-Click**:
  Click the button below to deploy this repository to Vercel instantly with zero configuration needed:

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sulemansaqib243342/punjab-college-smart-campus)

---

## 🏛️ Campus Identity & Official Branding

- **Institution**: Punjab College, Minar-e-Pakistan Campus, Lahore (Affiliated with BISE Lahore)
- **Official Brand Colors**:
  - **Deep Navy**: `#232766` (Primary Identity, Sidebar, Navigation, Transcripts)
  - **Torch Red-Orange**: `#ea432a` (Accents, CTA, Badges, Alert notices)
  - **Supporting Colors**: Crisp White, Slate, Emerald Green
- **Official Insignia**: Nested geometric book leaves with ascending torch flame and typography.

---

## 🔑 Demo Accounts & Role-Based Access Control (RBAC)

The login screen provides **1-click quick-fill demo cards** for each role, as well as a quick role switcher in the navbar:

| Role | Email | Password | Name & Title |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@smartcampus.com` | `Admin@123` | Prof. Dr. Muhammad Asif (Campus Director & Principal) |
| **Teacher** | `teacher@smartcampus.com` | `Teacher@123` | Prof. Tariq Mahmood (Head of Computer Science) |
| **Student** | `student@smartcampus.com` | `Student@123` | Muhammad Hamza Khan (Roll: `PCL-24-101`, Class: 11th ICS-A) |

---

## ⚡ Serverless REST API Backend (`/api/*`)

The project features a full **Vercel Serverless REST API** architecture with typed endpoints:

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Health check and backend connection status |
| `/api/auth/login` | `POST` | Authenticate user, verify credentials & return session |
| `/api/admissions` | `GET, POST` | List admission applications or submit new online application |
| `/api/admissions/approve` | `POST` | Approve application, generate roll number & fee voucher |
| `/api/students` | `GET, POST, PUT, DELETE` | Full CRUD for student directory with filters & search |
| `/api/students/:id` | `GET, PUT, DELETE` | Direct individual student record management |
| `/api/teachers` | `GET, POST, PUT, DELETE` | Full CRUD for faculty directory and class assignments |
| `/api/teachers/:id` | `GET, PUT, DELETE` | Direct individual teacher profile management |
| `/api/attendance` | `GET, POST` | Retrieve attendance registers or batch mark class attendance |
| `/api/exams` | `GET, POST` | List academic exams or schedule new exam series |
| `/api/marks` | `GET, POST` | Retrieve marks or batch enter subject marks with validation |
| `/api/results` | `GET` | Calculate exam results, grades (A+ to F), and positions/ranks |
| `/api/fees` | `GET, POST` | Fee vouchers, defaulters list, and record fee payments |
| `/api/timetable` | `GET, POST, DELETE` | Weekly schedule matrix by class or faculty member |
| `/api/materials` | `GET, POST, DELETE` | Upload and download study resources and notes |
| `/api/notices` | `GET, POST, DELETE` | Campus broadcast circulars and priority advisories |
| `/api/analytics/report` | `GET` | Generate AI-driven performance diagnostic report for a student |

---

## 🚀 Key Modules & Functional Features

1. **Student Admission & Registration**:
   - Public & internal online admission form (Name, Father Name, CNIC/B-Form, DOB, Gender, Phone, Email, Address, Matric marks, Board, Group: Pre-Medical / Pre-Engineering / ICS / Commerce / Arts, Photo upload).
   - Admin review queue with 1-click Approve / Reject.
   - Upon approval, automatically assigns a unique roll number (e.g., `PCL-24-151`), enrols student into class, and creates a fee voucher. Confetti celebration animation!

2. **Student & Teacher Management**:
   - Complete CRUD: Add, edit, delete, search, filter, and view profiles.
   - 65+ Pakistani students across 3 classes (`11th ICS-A`, `11th Pre-Medical`, `12th Pre-Engineering`).
   - 11 faculty members with M.Phil / Ph.D qualifications and assigned subjects/classes.

3. **Attendance Management**:
   - Faculty mark daily attendance per class (Present / Absent / Leave) with 1-click "Mark All Present" shortcut.
   - Student personal attendance analytics with a 30-day interactive calendar timeline view.
   - Automatic warning alert badge if attendance drops below 75% per BISE Lahore regulations.

4. **Examinations & Marks Entry**:
   - Admin creates examinations (Monthly Tests, Mid-Terms, Pre-Boards/Finals).
   - Faculty enter subject-wise marks in an interactive table with live boundary validation ($0 \le \text{marks} \le \text{total}$).

5. **Automatic Results, Grades & Printable Transcripts**:
   - Automatic calculation of Grand Total, Percentage, Letter Grade (A+, A, B, C, D, F), and Pass/Fail.
   - Dynamic Class Position/Rank calculation (1st, 2nd, 3rd, etc.) with a Top Position Holders podium.
   - Official high-resolution printable Result Card / Transcript with Punjab College letterhead, signatures, and college seal (`window.print` ready).

6. **Fee Management & 3-Part Bank Challans**:
   - Fee structure per class (Tuition, Lab, Library, Exam, Sports funds).
   - Monthly vouchers with status tracking (Paid, Unpaid, Partial) and defaulters filter.
   - Printable 3-part bank fee voucher challan (Bank Copy, College Copy, Student Copy) for Bank of Punjab (BOP).

7. **Weekly Timetable Grid**:
   - Timetable matrix (Monday to Saturday, 6 periods) filterable by class and teacher.

8. **Educational Contents & Study Materials**:
   - Upload and download syllabus notes, formula sheets, past papers, and lecture slides.

9. **Campus Notices & Official Circulars**:
   - Announcements classified by category (Urgent, Exam, Holiday, General, Sports) and target audience (All, Students, Faculty). Pinned urgent banner for smog advisories and winter timings.

10. **Special Challenge - Smart Student Performance Reports**:
    - For each student, an AI-style diagnostic analytics report with:
      - Subject-wise score vs Class Average benchmark bar chart (Recharts)
      - Progress trend line chart across examinations
      - Attendance vs marks correlation
      - Strengths and weakness pills
      - Automated contextual narrative evaluation and actionable recommendations
      - Download / Print Report button.

---

## 🗄️ Supabase PostgreSQL Setup & Environment Variables

When deploying to Vercel or connecting to your real Supabase database:

1. Create a project on [Supabase](https://supabase.com).
2. Go to **SQL Editor** in Supabase and run:
   - `supabase/schema.sql`: Sets up normalized tables (`profiles`, `user_roles`, `students`, `teachers`, `classes`, `subjects`, `attendance`, `exams`, `marks`, `fees`, `fee_structures`, `timetable`, `study_materials`, `notices`, `admissions`) and Row Level Security (RLS).
   - `supabase/seed.sql`: Populates the database with initial demo data.
3. Configure your Environment Variables in Vercel project settings or `.env`:
   ```env
   # Frontend variables
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key

   # Backend Serverless variables
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/Sulemansaqib243342/punjab-college-smart-campus.git
cd punjab-college-smart-campus

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Run production build
npm run build
```

---

## 🚢 Deploying to Vercel via CLI

```bash
# Log in to Vercel CLI
npx vercel login

# Deploy to production
npx vercel --prod
```
Or simply connect your GitHub repository in the [Vercel Dashboard](https://vercel.com/new). Every push to `main` will automatically build and deploy!
