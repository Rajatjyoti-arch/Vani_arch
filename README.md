# VANI (Verifiable Anonymous Network Intelligence)

## 🧠 Project Context for LLMs
**Use this document to understand the VANI architecture, codebase, and business logic.**

---

## 1. 📝 Executive Summary
**VANI** is a high-fidelity governance platform designed for educational institutions. It bridges the gap between **student anonymity** and **administrative accountability**. 
- **Core Problem:** Students fear retaliation when reporting issues; Administrations lack verifiable data to act.
- **Solution:** A Zero-Knowledge Architecture where students report anonymously but verifiably, and AI agents negotiate resolutions based on bylaws.

---

## 2. 🏛️ System Architecture
The system is divided into two distinct portals with separate authentication flows:

### A. Student Portal (Anonymous)
- **Authentication:** **Zero-Knowledge Proof (ZKP)** style.
  - No email/password for students.
  - Identity is hashed locally (SHA-256) in the browser.
  - Access via a **12-word Private Governance Key (Mnemonic)**.
  - The server *never* sees the raw student ID, only the hash.
- **Key Features:**
  - **Anonymous Credentialing:** Generate/Login with mnemonic.
  - **Student Dashboard:** View campus sentiment, active reports.
  - **Stealth Vault (Evidence Repository):** Upload encrypted evidence (AES-256).
  - **Governance Matrix (The Arena):** AI-mediated dispute resolution.
  - **Resolution Ledger:** View outcomes of past disputes.

### B. Admin Portal (Institutional Oversight)
- **Authentication:** Standard Email/Password with MFA (via Supabase Auth).
- **Key Features:**
  - **Admin Dashboard:** Geospatial heat maps of campus sentiment (Safe/Warning/Critical).
  - **Resolution Management:** Review and act on reports.
  - **System Setup:** Configure academic blocks, hostels, and categories.
  - **Audit Logs:** Read-only logs of all system activities.

---

## 3. 🛠️ Tech Stack

| Component | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite)** | TypeScript, Tailwind CSS, Shadcn UI, Framer Motion. |
| **Backend** | **Supabase** | PostgreSQL Database, Realtime subscriptions, Edge Functions. |
| **AI Engine** | **Google Gemini** | `gemini-1.5-pro` (Complex reasoning/Negotiation), `gemini-1.5-flash` (Chat/Guidance). |
| **Security** | **Client-Side Crypto** | `crypto-js` for SHA-256 hashing and AES-256 encryption. |
| **Routing** | **React Router** | Client-side routing with protected route wrappers. |
| **State** | **React Context** | `StudentSessionContext`, `AdminAuthContext`, `SettingsContext`. |

---

## 4. 📂 Directory Structure & Key Files

```bash
/src
├── /components         # Shared UI components (Shadcn UI)
│   ├── /admin          # Admin-specific components (Sidebar, Auth forms)
│   ├── /dashboard      # Student dashboard widgets (Stats, Activity Feed)
│   └── /ui             # Primitive UI elements (Buttons, Cards, Inputs)
├── /contexts           # Global State
│   ├── StudentSessionContext.tsx # Manages anonymous session & mnemonic
│   └── AdminAuthContext.tsx      # Manages admin login state
├── /pages              # Main Application Routes
│   ├── LandingPage.tsx           # Public entry point
│   ├── PortalSelection.tsx       # Choose Student vs Admin path
│   ├── AnonymousCredentialing.tsx # Student Login/Signup (Mnemonic generation)
│   ├── StudentDashboard.tsx      # Main Student View
│   ├── EvidenceRepository.tsx    # File upload & encryption interface
│   ├── GovernanceMatrix.tsx      # AI Negotiation Chat Interface
│   └── /admin                    # All Admin pages (Dashboard, Resolutions, etc.)
├── /lib                # Utilities
│   ├── supabase.ts     # Supabase client initialization
│   └── utils.ts        # Helper functions (CN, formatting)
└── App.tsx             # Main Router configuration
```

---

## 5. 🗄️ Database Schema (Supabase/PostgreSQL)

### Core Tables
- **`locations`**: Campus zones (e.g., "Mess", "Boys Hostel").
- **`reports`**: Issues filed by students.
  - `status`: 'open', 'in_review', 'resolved'.
  - `severity`: 'low', 'medium', 'high', 'critical'.
- **`campus_sentiment_stats`**: Aggregated stats per location (Trigger-updated).
  - `concern_level`: 'safe', 'warning', 'critical'.
- **`ghost_identities`**: Anonymous student profiles (linked via hash, not raw ID).
  - `reputation`: Score based on truthful reporting.
- **`stealth_vault`**: Encrypted file metadata (Evidence).
- **`arena_negotiations`**: Records of AI-mediated dispute resolutions.
- **`activity_logs`**: System-wide audit trail (Immutable).

### Key Triggers
- **`update_campus_stats`**: Automatically recalculates a zone's safety level when reports are added/resolved.
- **`log_activity`**: Automatically inserts into `activity_logs` for every major action (Report, Resolution, Negotiation).

---

## 6. 🔑 Key Workflows

### 1. The "Ghost" Login (Student)
1. User enters Student ID (e.g., "2023CS01").
2. App hashes it: `SHA256("2023CS01")` -> `hash_123`.
3. App generates a 12-word mnemonic.
4. **ONLY** the hash is sent to the DB to check existence/create record.
5. Mnemonic is stored in `sessionStorage` (never DB).

### 2. Filing a Report
1. Student selects location & category.
2. Writes description.
3. (Optional) Uploads evidence to **Stealth Vault**.
4. Report is saved to `reports` table.
5. DB Trigger updates `campus_sentiment_stats` for that location.

### 3. The Governance Matrix (AI Negotiation)
1. Student initiates a dispute in `/arena`.
2. **Gemini AI** acts as the mediator.
3. AI analyzes the report + university bylaws (context).
4. AI proposes a resolution.
5. If accepted, it's logged in `arena_negotiations` and the `ResolutionLedger`.

---

## 7. ⚙️ Environment Variables required
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 8. 🚀 Deployment
1. **Install Dependencies:** `npm install`
2. **Dev Server:** `npm run dev`
3. **Build:** `npm run build`
