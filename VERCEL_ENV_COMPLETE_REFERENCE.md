# 🔐 Complete Vercel Environment Variables Reference

## 📍 Backend URL Configuration Locations

### Frontend Backend URL
- **File**: `hrm-frontend/src/api/axios.js`
- **Line**: 5
- **Code**: `const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';`
- **Environment Variable**: `VITE_API_URL`
- **Format**: `https://your-backend-url.vercel.app/api` (must include `/api`)

### Backend CORS Configuration
- **File**: `hrm-backend/server.js`
- **Lines**: 18-25
- **Environment Variable**: `FRONTEND_URL`
- **Format**: `https://your-frontend-url.vercel.app`

---

## 📦 BACKEND Environment Variables

### Vercel Dashboard Location
**Backend Project → Settings → Environment Variables**

Add these for **Production**, **Preview**, and **Development**:

```env
# ============================================
# DATABASE CONFIGURATION (Bytehost)
# ============================================
DB_HOST=sql100.byethost10.com
DB_USER=b10_40637242
DB_PASSWORD=d6ky275f
DB_NAME=b10_40637242_hrm_sys
DB_PORT=3306
DB_SKIP_CREATE=true
DB_CONNECT_TIMEOUT=30000

# ============================================
# APPLICATION CONFIGURATION
# ============================================
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_strong_secret_key_change_this_in_production_12345

# ============================================
# FRONTEND URL (Update after frontend deploys)
# ============================================
FRONTEND_URL=https://your-frontend-url.vercel.app

# ============================================
# AUTO-SEED USERS
# ============================================
RUN_SEED=true
```

### Backend Environment Variables Summary
| Variable | Value | Required | Notes |
|----------|-------|----------|-------|
| `DB_HOST` | `sql100.byethost10.com` | ✅ Yes | Bytehost MySQL host |
| `DB_USER` | `b10_40637242` | ✅ Yes | Bytehost database user |
| `DB_PASSWORD` | `d6ky275f` | ✅ Yes | Bytehost database password |
| `DB_NAME` | `b10_40637242_hrm_sys` | ✅ Yes | Database name |
| `DB_PORT` | `3306` | ✅ Yes | MySQL port |
| `DB_SKIP_CREATE` | `true` | ✅ Yes | Skip DB creation (Bytehost doesn't allow) |
| `DB_CONNECT_TIMEOUT` | `30000` | ✅ Yes | Connection timeout (30 seconds) |
| `NODE_ENV` | `production` | ✅ Yes | Environment mode |
| `PORT` | `5000` | ✅ Yes | Server port |
| `JWT_SECRET` | `your_secret_key` | ✅ Yes | Change this! |
| `FRONTEND_URL` | `https://...` | ✅ Yes | Update after frontend deploys |
| `RUN_SEED` | `true` | ✅ Yes | Auto-create users on first request |

---

## 🎨 FRONTEND Environment Variables

### Vercel Dashboard Location
**Frontend Project → Settings → Environment Variables**

Add this for **Production**, **Preview**, and **Development**:

```env
# ============================================
# BACKEND API URL
# ============================================
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Frontend Environment Variables Summary
| Variable | Value | Required | Notes |
|----------|-------|----------|-------|
| `VITE_API_URL` | `https://backend-url.vercel.app/api` | ✅ Yes | Must include `/api` suffix |

### ⚠️ Important Notes
- **Must include `/api`** at the end of the URL
- Example: If backend is `https://hrm-backend-abc123.vercel.app`, use `https://hrm-backend-abc123.vercel.app/api`
- This is configured in `hrm-frontend/src/api/axios.js` line 5

---

## 🚀 Deployment Steps

### Step 1: Deploy Backend
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import: `AhmadCracks/HRM-for-software-house`
4. **Root Directory**: `hrm-backend` ⚠️ CRITICAL
5. **Framework Preset**: Other
6. **Build Command**: Leave default
7. **Output Directory**: Leave default
8. Click **"Environment Variables"**
9. Add all backend variables from above
10. Click **"Deploy"**
11. **Copy the backend URL** (e.g., `https://hrm-backend-abc123.vercel.app`)

### Step 2: Deploy Frontend
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import: `AhmadCracks/HRM-for-software-house`
4. **Root Directory**: `hrm-frontend` ⚠️ CRITICAL
5. **Framework Preset**: Vite
6. Click **"Environment Variables"**
7. Add: `VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app/api`
   - Replace `YOUR-BACKEND-URL` with actual backend URL from Step 1
8. Click **"Deploy"**
9. **Copy the frontend URL** (e.g., `https://hrm-frontend-xyz789.vercel.app`)

### Step 3: Update Backend CORS
1. Go to **Backend Project** → **Settings** → **Environment Variables**
2. Update `FRONTEND_URL` with your frontend URL from Step 2
3. Go to **Deployments** → Click **"Redeploy"** on latest deployment

---

## 🔑 Login Credentials (Auto-created)

These users are **automatically created** on first backend request:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@hrm.com | admin123 |
| **Manager** | manager@hrm.com | manager123 |
| **Employee** | employee1@hrm.com | employee123 |

### User Creation Process
- Users are created automatically when backend receives first request
- Check backend logs: **Deployments → Latest → Functions tab**
- Look for: `✅ Admin user ready`, `✅ Manager user ready`, `✅ Employee user ready`

---

## 🐛 Troubleshooting

### Backend Can't Connect to Database
1. Check all `DB_*` variables are set correctly
2. Verify Bytehost database is accessible
3. Check backend logs: **Deployments → Latest → Functions tab**
4. Look for: `✅ MySQL connection established successfully`

### Frontend Can't Connect to Backend
1. Verify `VITE_API_URL` is set correctly (must include `/api`)
2. Check browser console for API URL being used
3. Verify backend CORS includes frontend URL
4. Check backend logs for CORS errors

### Login Fails
1. Wait 30 seconds after first deployment (users are seeding)
2. Check backend logs for user creation messages
3. Verify database connection is working
4. Check if users exist in database (via Bytehost phpMyAdmin)

### CORS Errors
1. Update `FRONTEND_URL` in backend environment variables
2. Redeploy backend after updating `FRONTEND_URL`
3. Check backend logs for CORS blocked origins

---

## 📝 Quick Reference

### Backend URL Location
- **Frontend Config**: `hrm-frontend/src/api/axios.js:5`
- **Backend CORS**: `hrm-backend/server.js:18-25`

### Environment Files
- **Backend Template**: `hrm-backend/env.template`
- **Frontend Template**: `hrm-frontend/env.template` (if exists)

### Key Files
- **Backend Server**: `hrm-backend/server.js`
- **Database Config**: `hrm-backend/config/db.js`
- **Frontend API**: `hrm-frontend/src/api/axios.js`
- **Vercel Backend Config**: `hrm-backend/vercel.json`
- **Vercel Frontend Config**: `hrm-frontend/vercel.json`

---

## ✅ Checklist

### Backend Deployment
- [ ] Root directory set to `hrm-backend`
- [ ] All database variables set (DB_HOST, DB_USER, DB_PASSWORD, etc.)
- [ ] JWT_SECRET set (change default!)
- [ ] RUN_SEED=true
- [ ] Backend deployed successfully
- [ ] Backend URL copied

### Frontend Deployment
- [ ] Root directory set to `hrm-frontend`
- [ ] VITE_API_URL set with backend URL + `/api`
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied

### Final Steps
- [ ] FRONTEND_URL updated in backend environment variables
- [ ] Backend redeployed after CORS update
- [ ] Test login with admin@hrm.com / admin123
- [ ] Check browser console for API URL
- [ ] Verify backend logs show user creation

---

## 🎯 Summary

**Backend URL is configured in:**
1. **Frontend**: `hrm-frontend/src/api/axios.js` - Uses `VITE_API_URL` environment variable
2. **Backend CORS**: `hrm-backend/server.js` - Uses `FRONTEND_URL` environment variable

**All environment variables must be set in Vercel Dashboard for each project separately!**

