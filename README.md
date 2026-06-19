# National Scholarship Portal (NSP) - Final Workspace

**National Scholarship Portal** is a MERN (MongoDB, Express, React, Node.js) stack application for managing scholarship applications, institute verification, and government approval workflows.

This repository is organized as a **monorepo** with two main application folders:
- **`Backend`** → Express + MongoDB REST API
- **`Frontend`** → React + Vite web application

---

## Project Overview

The platform supports the following users and workflows:

- **Students** register, log in, update profile, and apply for scholarships.
- **Institutes** register, submit proof documents, and view/verify student applications.
- **State Officers** review institute registrations and scholarship applications.
- **Ministry Officers** make final approval or rejection decisions.

The application includes role-based access control, seed data for default officer accounts, and protected frontend routes.

---

## Repository Structure

```
Schlorship_Portal_Final_Eval/
├── Backend/                           # Express + MongoDB REST API
│   ├── scripts/
│   │   └── seed-officers.js          # Seed default officer accounts
│   ├── src/
│   │   ├── controllers/               # Business logic & request handlers
│   │   │   ├── instituteController.js
│   │   │   ├── officerController.js
│   │   │   ├── scholarshipController.js
│   │   │   └── studentController.js
│   │   ├── middleware/                # Auth, validation, error handling
│   │   │   └── auth.js
│   │   ├── models/                    # Mongoose schemas
│   │   │   ├── Institute.js
│   │   │   ├── Officer.js
│   │   │   ├── PasswordReset.js
│   │   │   ├── ScholarshipApplication.js
│   │   │   └── Student.js
│   │   ├── routes/                    # Express route definitions
│   │   │   ├── auth.js
│   │   │   ├── institute.js
│   │   │   ├── me.js
│   │   │   ├── officer.js
│   │   │   ├── scholarship.js
│   │   │   └── student.js
│   │   ├── utils/                     # Helper utilities
│   │   │   ├── cookies.js             # Cookie handling
│   │   │   ├── db.js                  # Database connection
│   │   │   ├── email.js               # OTP & email sending
│   │   │   └── env.js                 # Environment variables
│   │   └── index.js                   # Express server entry point
│   ├── .env                          # Backend environment (git-ignored)
│   ├── .env.example                  # Environment template
│   ├── package.json                  # Backend dependencies & scripts
│   └── package-lock.json
│
├── Frontend/                          # React + Vite web application
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Footer.jsx
│   │   │   ├── LogoBar.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/                     # Page-level components (routes)
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── StudentRegister.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── MyProfile.jsx
│   │   │   ├── ScholarshipForm.jsx
│   │   │   ├── CheckStatus.jsx
│   │   │   ├── ApplicationSuccess.jsx
│   │   │   ├── Institute.jsx
│   │   │   ├── InstituteRegister.jsx
│   │   │   ├── InstituteProfile.jsx
│   │   │   ├── InstituteDashboard.jsx
│   │   │   ├── InstituteApplications.jsx
│   │   │   ├── OfficerInstituteApprovals.jsx
│   │   │   ├── StateDashboard.jsx
│   │   │   ├── MinistryDashboard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   └── scholarships/
│   │   │       ├── CentralScholarship.jsx
│   │   │       ├── NationalMeritScholarship.jsx
│   │   │       ├── NTSEScholarship.jsx
│   │   │       ├── PostMatricScholarship.jsx
│   │   │       └── PragatiScholarship.jsx
│   │   ├── assets/                    # Images, icons, static files
│   │   ├── App.jsx                    # Root React component
│   │   ├── main.jsx                   # React DOM entry point
│   │   └── index.css                  # Global styles
│   ├── .vscode/                      # VS Code settings
│   ├── index.html                    # HTML template
│   ├── logo.svg                      # Application logo
│   ├── vite.config.js                # Vite bundler configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── proxy.config.js               # API proxy configuration
│   ├── package.json                  # Frontend dependencies & scripts
│   └── package-lock.json
│
├── .gitignore                         # Git ignore patterns
├── package.json                       # Root workspace config
├── package-lock.json
└── README.md                          # Project documentation
```

---

## Architecture Overview

### Backend Architecture (MVC Pattern)

**`src/index.js`** - Server entry point
- Initializes Express app
- Configures middleware (cors, helmet, rate limiting, cookie-parser)
- Mounts API routers
- Starts HTTP server on specified port

**`src/models/`** - Mongoose schemas
- `Student.js` - Student account data, credentials, profile information
- `Institute.js` - Institute details, verification status, documents
- `Officer.js` - Officer credentials and role assignment
- `ScholarshipApplication.js` - Scholarship application data and approval workflow
- `PasswordReset.js` - Temporary OTP tokens for password recovery

**`src/routes/`** - Express route definitions
- `auth.js` - Public registration/login endpoints
- `me.js` - Protected profile endpoints
- `student.js` - Student-specific operations
- `institute.js` - Institute-specific operations  
- `officer.js` - Officer-specific operations
- `scholarship.js` - Scholarship application operations

**`src/controllers/`** - Business logic
- `studentController.js` - Student registration, login, OTP, password reset
- `instituteController.js` - Institute registration, verification, lookup
- `officerController.js` - Officer login, institution approvals
- `scholarshipController.js` - Application submission, approval tracking

**`src/middleware/`** - Request processing
- `auth.js` - JWT verification and role-based access control

**`src/utils/`** - Helper utilities
- `db.js` - MongoDB connection initialization
- `env.js` - Environment variable management and validation
- `cookies.js` - HTTP-only JWT cookie creation and clearing
- `email.js` - Nodemailer configuration for OTP delivery

**`scripts/`** - Automation
- `seed-officers.js` - Seeds default officer accounts for testing

### Frontend Architecture (React + Router)

**`App.jsx`** - Root component
- Defines all routes
- Implements protected routes based on user role

**`pages/`** - Full-page components (one per route)
- **Authentication**: `Login.jsx`, `StudentRegister.jsx`, `InstituteRegister.jsx`, `ForgotPassword.jsx`
- **Student**: `StudentDashboard.jsx`, `MyProfile.jsx`, `ScholarshipForm.jsx`, `CheckStatus.jsx`, `ApplicationSuccess.jsx`
- **Institute**: `Institute.jsx`, `InstituteRegister.jsx`, `InstituteProfile.jsx`, `InstituteDashboard.jsx`, `InstituteApplications.jsx`
- **Officer**: `OfficerInstituteApprovals.jsx`, `StateDashboard.jsx`, `MinistryDashboard.jsx`
- **General**: `Home.jsx`, `AboutUs.jsx`, `ContactUs.jsx`
- **Scholarships**: `scholarships/` directory with specific scholarship details pages

**`components/`** - Reusable UI components
- `Navbar.jsx` - Top navigation bar
- `Footer.jsx` - Footer component
- `LogoBar.jsx` - Logo and branding header

---

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Frontend Framework** | React | 18.2.0 | UI components and state |
| **Routing** | React Router DOM | 6.22.0 | Client-side page navigation |
| **Build Tool** | Vite | 5.1.0 | Fast development server & bundler |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| **CSS Processing** | PostCSS | 8.4.35 | CSS transformation and autoprefixer |
| **HTTP Client** | Axios | 1.7.9 | API requests |
| **Data Visualization** | Chart.js + react-chartjs-2 | 4.5.1 + 5.3.1 | Dashboard charts |
| **Backend Framework** | Express.js | 4.19.2 | REST API server |
| **Database** | MongoDB | (Cloud) | NoSQL document store |
| **ODM** | Mongoose | 8.5.2 | Schema validation & ORM |
| **Authentication** | JWT (jsonwebtoken) | 9.0.2 | Stateless token authentication |
| **Password Security** | bcryptjs | 2.4.3 | Secure password hashing |
| **HTTP Security** | Helmet | 7.1.0 | Security headers middleware |
| **Rate Limiting** | express-rate-limit | 7.4.0 | Brute-force protection |
| **CORS** | cors | 2.8.5 | Cross-origin resource sharing |
| **Email Service** | Nodemailer | 6.9.3 | OTP email delivery |
| **Cookies** | cookie-parser | 1.4.6 | HTTP cookie handling |
| **Input Validation** | Zod | 3.23.8 / 4.4.3 | Schema validation (backend/frontend) |
| **Concurrency** | concurrently | 8.2.2 | Run multiple npm scripts simultaneously |

---

## Installation & Setup

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher
- **MongoDB** (Atlas Cloud or local instance)
- **Git** for cloning

### Step 1: Clone Repository

```bash
git clone https://github.com/ParasJagdale/National_Schlorship_Portal_Final.git
cd Schlorship_Portal_Final_Eval
```

### Step 2: Install Dependencies

```bash
# Install root workspace dependencies
npm install

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install

# Return to root
cd ..
```

### Step 3: Environment Configuration

**Backend** - Create `Backend/.env` file:

```env
# Server Configuration
PORT=5174
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT & Security
JWT_SECRET=your-secret-key-here

# CORS
FRONTEND_ORIGIN=http://localhost:5173

# Email (Nodemailer) - Gmail Example
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@scholarship.portal
```

> **Note**: For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

**Frontend** - Create `Frontend/.env.local` file:

```env
VITE_API_URL=http://localhost:5174/api
```

---

## Running the Application

### Option 1: Run Both Apps from Root (Recommended)

```bash
npm run dev
```

This starts both backend and frontend simultaneously using **concurrently**.

Available root commands:
- `npm run dev` - Start both backend and frontend
- `npm run server` - Start only backend  
- `npm run client` - Start only frontend
- `npm run seed` - Seed default officer accounts

### Option 2: Run Apps Separately

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```
Backend runs on: `http://localhost:5174`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## Seeding Default Data

Run this command to create demo officer accounts:

```bash
npm run seed
```

**Default Seeded Credentials:**
- **State Officer**: `stateoffice@gmail.com` / `admin123`
- **Ministry Officer**: `centraloffice@gmail.com` / `admin123`

---

## Data Flow: Student Registration Example

### Frontend Flow
1. **User fills form** in `StudentRegister.jsx` with email, password, name, etc.
2. **Form validation** using Zod schema
3. **Axios POST request** to `/api/auth/register`

### Backend Flow
1. **Route handler** (`auth.js`) receives request
2. **Controller** (`studentController.js`) validates data with Zod
3. **Check if email exists** in database
4. **Hash password** with bcryptjs
5. **Create Student** document in MongoDB
6. **Send OTP email** via Nodemailer (`utils/email.js`)
7. **Return success response** with user data

### Response Flow
1. **Frontend receives** response and redirects to OTP verification
2. **User enters OTP** received via email
3. **Backend verifies OTP** against stored token
4. **Account activated** in database
5. **JWT token generated** and sent as HTTP-only cookie
6. **User redirected** to dashboard

---

## User Roles & Workflows

### Student Workflow
1. Register with email/password
2. Verify OTP sent to email
3. Log in to dashboard
4. Update profile information
5. Browse available scholarships
6. Apply for scholarships
7. Track application status

### Institute Workflow
1. Register with institute code and proof documents
2. Wait for state officer review
3. After approval, log in to dashboard
4. View student scholarship applications
5. Verify and approve applications

### State Officer Workflow
1. Log in with officer credentials
2. Review pending institute registrations
3. Approve/reject institutes
4. Review scholarship applications (first stage)
5. Forward to ministry officer

### Ministry Officer Workflow
1. Log in to ministry dashboard
2. Review forwarded applications from state officers
3. Make final approval/rejection decisions

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Student/Institute registration
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Initiate password reset

### User Profile
- `GET /api/me` - Get current user profile
- `PUT /api/me` - Update user profile

### Student Operations
- `GET /api/student` - Get student applications
- `POST /api/scholarship/apply` - Submit scholarship application
- `GET /api/scholarship/status` - Check application status

### Institute Operations
- `GET /api/institute` - Get institute details
- `GET /api/institute/applications` - Get applications for verification

### Officer Operations
- `GET /api/officer/approvals` - Get pending approvals
- `POST /api/officer/approve` - Approve/reject items

---

## Troubleshooting

### OTP Not Sending (ETIMEDOUT Error)
**Cause**: SMTP connection timeout, usually due to company firewall blocking ports 465/587.

**Solution**:
1. Check if port 465 or 587 is open on your network
2. Use Mailtrap or Ethereal for testing if SMTP is blocked
3. Configure SMTP settings correctly (port, secure flag)

### MongoDB Connection Error
**Cause**: Invalid connection string or credentials.

**Solution**:
1. Verify `MONGODB_URI` in `Backend/.env`
2. Check MongoDB Atlas IP whitelist includes your IP
3. Ensure username/password are URL-encoded

### Frontend Not Connecting to Backend
**Cause**: CORS issue or wrong API URL.

**Solution**:
1. Verify `VITE_API_URL` in `Frontend/.env.local`
2. Check CORS configuration in backend `index.js`
3. Ensure backend is running on correct port

---

## Security Notes

- ✅ Passwords stored only as bcrypt hashes
- ✅ JWTs stored in HTTP-only cookies (not localStorage)
- ✅ `.env` files ignored via `.gitignore`
- ✅ Input validation via Zod schemas
- ✅ Rate limiting on login/register endpoints
- ✅ Helmet middleware adds security headers
- ✅ CORS configured to allow only frontend origin

---

## Interview Summary

> "This is a full-stack MERN application for managing national scholarship programs. The backend uses Express with MongoDB for robust API design, JWT authentication for security, and Nodemailer for OTP delivery. The frontend is built with React and Vite for a responsive multi-role dashboard experience. I implemented role-based access control with protected routes, used Zod for input validation on both client and server, and configured a monorepo workspace with concurrently for seamless development. The application supports students, institutes, and officers in a complete scholarship workflow."

---

## Project Resources

- **Repository**: https://github.com/ParasJagdale/National_Schlorship_Portal_Final
- **Owner**: ParasJagdale
- **License**: Check LICENSE file
- **Last Updated**: June 2026

---

## Notes

- Always keep `.env` files local and never commit them to GitHub
- Use `.env.example` as a template for other developers
- Run `npm run seed` after fresh database setup
- Test email functionality with correct SMTP credentials
- Check MongoDB Atlas security rules for connection issues
