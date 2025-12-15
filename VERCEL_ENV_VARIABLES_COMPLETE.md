# 🔐 Complete Vercel Environment Variables Reference

## 📦 BACKEND Environment Variables

### Required Variables for Backend Project

Go to: **Vercel Dashboard → Backend Project → Settings → Environment Variables**

Add these variables (Production, Preview, Development):

```env
# Database Configuration (Bytehost)
DB_HOST=sql100.byethost10.com
DB_USER=b10_40637242
DB_PASSWORD=d6ky275f
DB_NAME=b10_40637242_hrm_sys
DB_PORT=3306
DB_SKIP_CREATE=true
DB_CONNECT_TIMEOUT=30000

# Application Configuration
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_strong_secret_key_change_this_in_production_12345

# Frontend URL (Update after frontend deploys)
FRONTEND_URL=https://your-frontend-url.vercel.app

# Auto-seed users on first deployment
RUN_SEED=true
```

### Backend URL Location
- **File**: `hrm-backend/server.js`
- **CORS Configuration**: Lines 18-25
- **API Routes**: All routes are under `/api/*`

---

## 🎨 FRONTEND Environment Variables

### Required Variables for Frontend Project

Go to: **Vercel Dashboard → Frontend Project → Settings → Environment Variables**

Add this variable (Production, Preview, Development):

```env
# Backend API URL (Replace with your actual backend URL)
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Frontend Backend URL Configuration
- **File**: `hrm-frontend/src/api/axios.js`
- **Line**: 5
- **Code**: `const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';`

### How to Find Your Backend URL
1. Deploy backend first
2. Go to Backend Project → Deployments
3. Copy the deployment URL (e.g., `https://hrm-backend-abc123.vercel.app`)
4. Use: `https://hrm-backend-abc123.vercel.app/api` for `VITE_API_URL`

---

## 📋 Step-by-Step Deployment

### Step 1: Deploy Backend
1. Vercel Dashboard → Add New Project
2. Import: `AhmadCracks/HRM-for-software-house`
3. **Root Directory**: `hrm-backend` ⚠️ CRITICAL
4. Framework: **Other**
5. Add all backend environment variables above
6. Deploy → Copy backend URL

### Step 2: Deploy Frontend
1. Vercel Dashboard → Add New Project
2. Import: `AhmadCracks/HRM-for-software-house`
3. **Root Directory**: `hrm-frontend` ⚠️ CRITICAL
4. Framework: **Vite**
5. Add `VITE_API_URL` with your backend URL from Step 1
6. Deploy → Copy frontend URL

### Step 3: Update Backend CORS
1. Go to Backend Project → Settings → Environment Variables
2. Update `FRONTEND_URL` with your frontend URL from Step 2
3. Redeploy backend

---

## 🔑 Login Credentials (Auto-created)

These users are automatically created on first backend request:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@hrm.com | admin123 |
| **Manager** | manager@hrm.com | manager123 |
| **Employee** | employee1@hrm.com | employee123 |

---

## 🐛 Troubleshooting

### Backend Connection Issues
- Check all DB_* variables are set correctly
- Verify Bytehost database is accessible
- Check backend logs: Deployments → Latest → Functions tab

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly (must include `/api`)
- Check backend CORS includes frontend URL
- Open browser console to see API URL being used

### Login Fails
- Wait 30 seconds after first deployment (users are seeding)
- Check backend logs for database connection
- Verify users were created (check backend logs)

---

## 📝 Important Notes

- ✅ No XAMPP needed - everything runs on Vercel
- ✅ Database is on Bytehost - no local MySQL
- ✅ Users auto-created on first request
- ✅ All passwords hashed with bcrypt
- ⚠️ Backend URL must include `/api` suffix in `VITE_API_URL`
- ⚠️ Root directory must be set correctly for both projects

