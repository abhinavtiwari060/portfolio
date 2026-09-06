# Abhinav Kumar Tiwari (Abhi) • Developer Portfolio & CMS

A production-grade, highly interactive personal developer portfolio and content management system built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **MongoDB + Mongoose**.

The visual language combines the warm orange energy of **Chai Code** (`#F97316`, `#EA580C`, amber glows) with tactile **Claymorphism / soft 3D UI** (soft dual-layer inner bevels, inflated rounded surfaces, floating tech pills, and micro-interactions).

---

## 🌟 Key Features

### 1. Public Portfolio
- **Hero Section**: Distinctive 3D profile container with live pulsing "Open to opportunities" badge, floating animated clay tech pills (React, Next.js, Node.js, MongoDB, JavaScript), and quick CTAs.
- **Dynamic About Me**: Deep-dive personal development journey, developer philosophy, what I like building, current learning areas, and education—all dynamically loaded from MongoDB.
- **Categorized Skills**: Filterable grid across Frontend, Backend, Database, and Tools with live proficiency indicators and custom icons.
- **Projects & Case Studies**: Project cards with 3D lift, hover image zoom, tech stack pills, source links, live demo links, and dedicated `/projects/[slug]` case study breakdown.
- **Articles & Blog**: Technical writing system with reading times, tags, category pills, comfortable reading typography, and dedicated `/articles/[slug]` markdown reader.
- **Video Testimonials**: Peer and mentor video cards with interactive modal player supporting YouTube, Vimeo, and direct MP4 videos.
- **Interactive Contact**: "Have an idea? Let's build it." form with honeypot spam protection, instant feedback toast, and celebratory confetti physics.
- **Sticky Clay Navbar & Footer**: Responsive mobile drawer, smooth section scrolling, and back-to-top button.

### 2. Full Admin CMS (`/admin`)
- **Protected by Secure Sessions**: Edge middleware checks encrypted HTTP-only JWT cookies (`jose`) with bcrypt password hashing.
- **Overview Dashboard**: Live KPI metrics (projects, articles, skills, video testimonials, unread messages) and shortcuts.
- **Profile Management**: Complete editor for bio, philosophy, education, resume URL, availability, and social links.
- **Projects CRUD**: Create, edit, and delete projects with Cloudinary image upload, slug generator, and case study fields.
- **Articles CRUD**: Full markdown article writer with tag manager and draft/published toggle.
- **Skills Management**: Add, categorize, and tune proficiency levels with interactive sliders.
- **Testimonials Management**: Embed video URLs and upload thumbnails.
- **Messages Inbox**: View inbound contact submissions, mark read/unread, and delete inquiries.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Vanilla Tailwind CSS + Custom Claymorphism Tokens |
| **Motion & Physics** | Framer Motion |
| **Database** | MongoDB & Mongoose (Zero SQL / Zero Prisma) |
| **Authentication** | Jose (Edge JWT) + Bcryptjs Password Hashing |
| **Media Architecture** | Cloudinary SDK (with local data URI fallback) |
| **Markdown** | Marked |
| **Icons** | Lucide React |

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (or copy from `.env.example`):

```env
# MongoDB Connection (Local or MongoDB Atlas)
MONGODB_URI=mongodb://127.0.0.1:27017/abhinav_portfolio
MONGODB_DB_NAME=abhinav_portfolio

# Authentication Secret (Generate with: openssl rand -base64 32)
AUTH_SECRET=abhi_chai_code_orange_portfolio_secret_key_2026_super_secure

# Cloudinary Media Storage (Optional for local testing, required for cloud uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Seed Initial Portfolio Content
Run the database seeder to populate rich, authentic data for Abhinav Kumar Tiwari:
```bash
npm run seed
```

> **Note**: If your local MongoDB server is not running, the application includes a smart dev fallback so the website and admin dashboard continue to run and display all content seamlessly!

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 🔐 Admin Credentials

To access the CMS dashboard, navigate to:
[http://localhost:3000/admin](http://localhost:3000/admin) (or `/admin/login`)

- **Default Email**: `admin@abhinav.dev`
- **Default Password**: `Admin@Chai123`

*(You can modify these credentials in `.env` or from the admin panel)*

---

## 🌐 Production Deployment (Vercel + MongoDB Atlas)

1. **MongoDB Atlas**:
   - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - In "Network Access", allow access from anywhere (`0.0.0.0/0`) for Vercel serverless functions.
   - In "Database Access", create a database user and copy the connection string.
2. **Cloudinary**:
   - Create a free account on [Cloudinary](https://cloudinary.com/) and obtain your Cloud Name, API Key, and API Secret.
3. **Deploy to Vercel**:
   - Push your repository to GitHub.
   - Import the project into [Vercel](https://vercel.com).
   - Set the environment variables (`MONGODB_URI`, `AUTH_SECRET`, `CLOUDINARY_*`, `NEXT_PUBLIC_APP_URL`).
   - Click **Deploy**.

---

## 📜 License
Personal Portfolio & CMS created for **Abhinav Kumar Tiwari**.
