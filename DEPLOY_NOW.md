# 🚀 DEPLOY NOW - Complete Vercel Deployment Guide

## ✅ All Code is Ready and Pushed to GitHub

Repository: `https://github.com/AhmadCracks/HRM-for-software-house.git`

---

## 📦 STEP 1: Deploy Backend (5 minutes)

### 1.1 Create Backend Project
1. Go to: https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select: `AhmadCracks/HRM-for-software-house`
5. Click **"Import"**

### 1.2 Configure Project Settings
- **Project Name**: `hrm-backend` (or any name)
- **Root Directory**: `hrm-backend` ⚠️ **CRITICAL - Click "Edit" and set this!**
- **Framework Preset**: **Other**
- **Build Command**: Leave default
- **Output Directory**: Leave default
- **Install Command**: Leave default

### 1.3 Add Environment Variables
Click **"Environment Variables"** and add these (for **Production**, **Preview**, **Development**):

```env
DB_HOST=sql100.byethost10.com
DB_USER=b10_40637242
DB_PASSWORD=d6ky275f
DB_NAME=b10_40637242_hrm_sys
DB_PORT=3306
DB_SKIP_CREATE=true
DB_CONNECT_TIMEOUT=30000
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_strong_secret_key_change_this_12345
RUN_SEED=true
FRONTEND_URL=https://placeholder.vercel.app
```

⚠️ **Note**: Leave `FRONTEND_URL` as placeholder for now, update after frontend deploys.

### 1.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. **Copy the deployment URL** (e.g., `https://hrm-backend-abc123.vercel.app`)
4. Test: Visit `https://your-backend-url.vercel.app/api/health`
   - Should return: `{"status":"healthy","timestamp":"..."}`

---

## 🎨 STEP 2: Deploy Frontend (3 minutes)

### 2.1 Create Frontend Project
1. Go to: https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select: `AhmadCracks/HRM-for-software-house`
5. Click **"Import"**

### 2.2 Configure Project Settings
- **Project Name**: `hrm-frontend` (or any name)
- **Root Directory**: `hrm-frontend` ⚠️ **CRITICAL - Click "Edit" and set this!**
- **Framework Preset**: **Vite** (should auto-detect)
- **Build Command**: Leave default (`npm run build`)
- **Output Directory**: Leave default (`dist`)
- **Install Command**: Leave default

### 2.3 Add Environment Variable
Click **"Environment Variables"** and add (for **Production**, **Preview**, **Development**):

```env
VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app/api
```

⚠️ **Replace `YOUR-BACKEND-URL`** with your actual backend URL from Step 1.4!

**Example**: If backend is `https://hrm-backend-abc123.vercel.app`, then:
```env
VITE_API_URL=https://hrm-backend-abc123.vercel.app/api
```

### 2.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment (1-2 minutes)
3. **Copy the frontend URL** (e.g., `https://hrm-frontend-xyz789.vercel.app`)

---

## 🔄 STEP 3: Update Backend CORS (1 minute)

### 3.1 Update Frontend URL in Backend
1. Go to **Backend Project** → **Settings** → **Environment Variables**
2. Find `FRONTEND_URL`
3. Update value to your frontend URL from Step 2.4
   - Example: `https://hrm-frontend-xyz789.vercel.app`
4. Click **"Save"**

### 3.2 Redeploy Backend
1. Go to **Backend Project** → **Deployments**
2. Click **"..."** (three dots) on latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment

---

## ✅ STEP 4: Test Login

### 4.1 Visit Frontend
Go to your frontend URL: `https://your-frontend-url.vercel.app`

### 4.2 Login Credentials
These users are **automatically created** on first backend request:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@hrm.com | admin123 |
| **Manager** | manager@hrm.com | manager123 |
| **Employee** | employee1@hrm.com | employee123 |

### 4.3 If Login Fails
1. Wait 30 seconds (users are being seeded)
2. Check backend logs:
   - Backend Project → Deployments → Latest → **Functions** tab
   - Look for: `✅ Admin user ready`, `✅ Manager user ready`, `✅ Employee user ready`
3. Check browser console (F12) for API errors
4. Verify `VITE_API_URL` is set correctly

---

## 📍 Backend URL Locations

### Where Backend URL is Configured:

1. **Frontend Configuration**
   - **File**: `hrm-frontend/src/api/axios.js`
   - **Line**: 5
   - **Code**: `const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';`
   - **Environment Variable**: `VITE_API_URL`
   - **Set in**: Vercel Frontend Project → Environment Variables

2. **Backend CORS Configuration**
   - **File**: `hrm-backend/server.js`
   - **Lines**: 18-39
   - **Environment Variable**: `FRONTEND_URL`
   - **Set in**: Vercel Backend Project → Environment Variables

---

## 🐛 Troubleshooting

### Backend Deployment Fails
- ✅ Check Root Directory is set to `hrm-backend`
- ✅ Verify all environment variables are set
- ✅ Check build logs for errors

### Frontend Can't Connect to Backend
- ✅ Verify `VITE_API_URL` includes `/api` at the end
- ✅ Check browser console (F12) for API URL
- ✅ Verify backend is deployed and accessible
- ✅ Test backend health: `https://your-backend-url.vercel.app/api/health`

### Login Fails
- ✅ Wait 30 seconds after first deployment
- ✅ Check backend logs for user creation
- ✅ Verify database connection in backend logs
- ✅ Check browser console for API errors

### CORS Errors
- ✅ Update `FRONTEND_URL` in backend environment variables
- ✅ Redeploy backend after updating `FRONTEND_URL`
- ✅ Check backend logs for CORS blocked origins

---

## 📝 Quick Reference

### Environment Variables Summary

**Backend (11 variables):**
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`, `DB_SKIP_CREATE`, `DB_CONNECT_TIMEOUT`
- `NODE_ENV`, `PORT`, `JWT_SECRET`, `RUN_SEED`, `FRONTEND_URL`

**Frontend (1 variable):**
- `VITE_API_URL`

### Key Files
- Backend Server: `hrm-backend/server.js`
- Database Config: `hrm-backend/config/db.js`
- Frontend API: `hrm-frontend/src/api/axios.js`
- Vercel Backend Config: `hrm-backend/vercel.json`
- Vercel Frontend Config: `hrm-frontend/vercel.json`

---

## 🎯 Summary

✅ **Backend URL is configured in:**
1. Frontend: `hrm-frontend/src/api/axios.js` → Uses `VITE_API_URL` env var
2. Backend CORS: `hrm-backend/server.js` → Uses `FRONTEND_URL` env var

✅ **All environment variables must be set in Vercel Dashboard for each project!**

✅ **No XAMPP needed - everything runs on Vercel with Bytehost database!**

---

## 🚀 Ready to Deploy!

Follow the steps above and your HRM system will be live on Vercel! 🎉
