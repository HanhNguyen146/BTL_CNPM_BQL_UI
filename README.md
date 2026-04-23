# Tutor Support System (TSS) - Admin Dashboard

**Course:** Software Engineering - CO3001
![BQL_home](public/BQL_home.png)
## Project Overview

This repository contains the **Admin Dashboard** for the **Tutor Support System** at Ho Chi Minh City University of Technology (HCMUT). Built with **Next.js (App Router)**, the application provides administrators with a centralized interface to manage students, tutors, and program reports.

The dashboard integrates a lightweight file-based backend using Next.js API Routes and JSON data files — no separate backend server required. The entire application (frontend + API) runs on a single `npm run dev` command.

## Features & Scope

### 1. Overview Dashboard (`/`)
A high-level snapshot of the program's current status.

* **Statistics Cards:** Displays real-time counts of students and tutors pulled directly from the JSON database, alongside fixed metrics for completed sessions and new feedback.
* **Recent Activity Feed:** A log of the latest system events with timestamps and categorized icons.
* **Quick Access Panel:** One-click navigation shortcuts to major sections of the dashboard.
* **Welcome Banner:** Displays the current date and admin greeting with HCMUT branding.

### 2. Student Management (`/students`)
A full CRUD interface for managing program participants.

* **Student List:** Paginated table with avatar initials, MSSV badge, and program label.
* **Search & Filter:** Real-time filtering by name or MSSV with toast feedback on results.
* **Add Student (`/students/add`):** Dedicated form page with validation, redirects back to the list on success.
* **Delete:** Row-select-then-delete pattern with confirmation toast.
* **Sync:** Simulates synchronization with the HCMUT\_DATACORE system.

### 3. Tutor Management (`/tutors`)
Mirrors the student management interface with tutor-specific fields.

* **Tutor List:** Table with avatar initials, subject badge (color-coded by field), and clickable mailto email links.
* **Search & Filter:** Real-time filtering by name, subject, or email.
* **Add Tutor (`/tutors/add`):** Dedicated form page for name, subject, and email with full validation.
* **Delete:** Same row-select-then-delete pattern as students.

### 4. Reports (`/reports`)
A data visualization and export module for program analytics.

* **Feedback Panel:** Categorized feedback banners (Học tập, Tutor, Hệ thống, Khác).
* **Chart Type Selector:** Card-based UI to switch between chart visualizations.
* **Export Controls:** Inline confirmation flow for report download (replaces browser `window.confirm`).

### 5. Settings (`/setting`)
A static server-rendered settings page for system configuration.

* **Admin Profile Card:** Displays admin avatar, name, and HCMUT logo.
* **Account & System Settings:** Grouped setting rows with colored icons and chevron navigation.

## Technical Stack

| Category | Technology |
| :--- | :--- |
| **Core Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Icons** | lucide-react |
| **Animations** | framer-motion |
| **Language** | TypeScript |
| **Backend** | Next.js API Routes (same process) |
| **Database** | JSON flat files (`data/students.json`, `data/tutors.json`) |
| **Architecture** | Server Components + Client Components, file-based persistence |

## Project Structure

```
btl-cnpm-main/
├── app/
│   ├── page.tsx                  # Overview dashboard (Server Component)
│   ├── layout.tsx                # Root layout wrapping DashboardLayout
│   ├── students/
│   │   ├── page.tsx              # Student list (Client Component)
│   │   └── add/page.tsx          # Add student form
│   ├── tutors/
│   │   ├── page.tsx              # Tutor list (Client Component)
│   │   └── add/page.tsx          # Add tutor form
│   ├── reports/page.tsx          # Reports & analytics
│   ├── setting/page.tsx          # System settings (Server Component)
│   └── api/
│       ├── students/route.ts     # GET, POST /api/students
│       ├── students/[id]/route.ts# DELETE /api/students/:id
│       ├── tutors/route.ts       # GET, POST /api/tutors
│       ├── tutors/[id]/route.ts  # DELETE /api/tutors/:id
│       └── stats/route.ts        # GET /api/stats
├── components/
│   └── DashboardLayout.tsx       # Sidebar + header shell
├── lib/
│   └── db.ts                     # readDb / writeDb JSON helpers
├── data/
│   ├── students.json             # Student records
│   └── tutors.json               # Tutor records
└── public/
    ├── bklogo_transparent.png    # HCMUT logo
    ├── anh_truongbk.jpg          # Campus photo (sidebar banner)
    └── admin_avatar.jpg          # Admin profile photo
```

## Installation & Setup Guide

### Prerequisites
Before running the project, ensure you have the following installed:

- **Node.js**: Version 18.17.0 or higher
- **Package Manager**: `npm`, `yarn`, or `pnpm`

> No separate backend server is needed. The API runs inside the same Next.js process.

---

### Local Development Setup

#### 1. Clone the repository:
```bash
git clone https://github.com/CallmeBao/BTL-CNPM.git
cd BTL-CNPM
```

#### 2. Install dependencies:
```bash
npm install
```

#### 3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The admin dashboard and all API routes will be available immediately.
