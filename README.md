# Smart Campus - College Management System
### Punjab College, Minar-e-Pakistan Campus, Lahore

A complete, production-grade College Management System built with **React, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons, Recharts, and Supabase (PostgreSQL with RLS)**.

---

## 🏛️ Campus Identity
- **Institution**: Punjab College, Minar-e-Pakistan Campus, Lahore (Affiliated with BISE Lahore)
- **Motto**: *"The Step to Success"*
- **Color Theme**: Navy Blue (`#0e244d`) + Crimson Red (`#c01823`) + Gold & Crisp White

---

## 🔑 Demo Accounts & Role-Based Access Control (RBAC)

The login screen provides **1-click quick-fill buttons** for each role, as well as a quick role switcher in the navbar:

| Role | Email | Password | Name & Title |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@smartcampus.com` | `Admin@123` | Prof. Dr. Muhammad Asif (Campus Director & Principal) |
| **Teacher** | `teacher@smartcampus.com` | `Teacher@123` | Prof. Tariq Mahmood (Head of Computer Science) |
| **Student** | `student@smartcampus.com` | `Student@123` | Muhammad Hamza Khan (Roll: `PCL-24-101`, Class: 11th ICS-A) |

---

## 🚀 Key Modules & Functional Features

1. **Student Admission & Registration**:
   - Public & internal online admission form (Name, Father Name, CNIC/B-Form, DOB, Gender, Phone, Email, Address, Matric marks, Board, Group selection: Pre-Medical / Pre-Engineering / ICS / Commerce / Arts, Photo preview).
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

## 🗄️ Database Schema & Supabase Setup

The application features a dual-mode engine:
1. **Out of the box**: Runs with an offline reactive, persistent LocalStorage store loaded with the realistic Pakistani dataset (65+ students, 11 teachers, 30 days attendance, 2 exams with marks, fees, timetable, 8 notices).
2. **With Supabase**:
   - Create a project on [Supabase](https://supabase.com).
   - In Supabase SQL Editor, run `supabase/schema.sql` (defines `profiles`, `user_roles`, `students`, `teachers`, `classes`, `subjects`, `attendance`, `exams`, `marks`, `fees`, `fee_structures`, `timetable`, `study_materials`, `notices`, `admissions`, and complete Row Level Security policies).
   - Run `supabase/seed.sql` for initial seed rows.
   - Add your credentials to `.env`:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

---

## 🛠️ Installation & Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run production build check
npm run build
```
