# 🚀 Complete Deployment Guide - Deploy Now!

## ⚡ Quick Summary

✅ **Backend:** Already has environment variables configured  
✅ **Frontend:** Needs `VITE_API_URL` environment variable  
✅ **Database:** Bytehost configured and ready  
✅ **Users:** Auto-created on first request  

---

## 📋 STEP 1: Fix Frontend Environment Variables

### Go to Vercel Dashboard:
1. Open: https://vercel.com/dashboard
2. Select **Frontend Project** (`hrm-frontend`)
3. Go to **Settings** → **Environment Variables**

### Remove Wrong Variables (Frontend doesn't need these):
Delete these variables from frontend project:
- ❌ `PORT`
- ❌ `NODE_ENV`
- ❌ `DB_HOST`
- ❌ `DB_USER`
- ❌ `DB_PASSWORD`
- ❌ `DB_NAME`
- ❌ `DB_PORT`
- ❌ `DB_CONNECT_TIMEOUT`
- ❌ `DB_SKIP_CREATE`
- ❌ `JWT_SECRET`

### Add Required Variable:
Add this **ONE** variable:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://YOUR-BACKEND-URL.vercel.app/api` |

**⚠️ IMPORTANT:**
- Replace `YOUR-BACKEND-URL` with your actual backend URL
- **Must include `/api` at the end**
- Select **Production**, **Preview**, and **Development**

---

## 📋 STEP 2: Fix Backend Environment Variables

### Go to Vercel Dashboard:
1. Select **Backend Project** (`hrm-backend`)
2. Go to **Settings** → **Environment Variables**

### Remove Wrong Variable:
Delete this variable from backend:
- ❌ `VITE_API_URL` (Backend doesn't need this)

### Add Missing Variable (if not present):
Add this variable:

| Key | Value |
|-----|-------|
| `RUN_SEED` | `true` |

### Verify All Backend Variables Exist:
Make sure these **12 variables** are present:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `DB_HOST` | `sql100.byethost10.com` |
| `DB_USER` | `b10_40637242` |
| `DB_PASSWORD` | `d6ky275f` |
| `DB_NAME` | `b10_40637242_hrm_sys` |
| `DB_PORT` | `3306` |
| `DB_CONNECT_TIMEOUT` | `30000` |
| `DB_SKIP_CREATE` | `true` |
| `JWT_SECRET` | `hrm_secret_key_2024_production` |
| `FRONTEND_URL` | `https://YOUR-FRONTEND-URL.vercel.app` |
| `RUN_SEED` | `true` |

**⚠️ IMPORTANT:**
- Update `FRONTEND_URL` with your actual frontend URL
- All variables should be set for **Production**, **Preview**, and **Development**

---

## 🚀 STEP 3: Deploy Both Projects

### Deploy Backend:
1. Go to **Backend Project** → **Deployments**
2. Click **"Redeploy"** on the latest deployment
3. Wait for deployment to complete (1-2 minutes)
4. **Copy the backend URL** (e.g., `https://hrm-backend-xxx.vercel.app`)

### Deploy Frontend:
1. Go to **Frontend Project** → **Deployments**
2. Click **"Redeploy"** on the latest deployment
3. Wait for deployment to complete (1-2 minutes)
4. **Copy the frontend URL**

### Update Frontend Environment Variable:
1. Go back to **Frontend Project** → **Settings** → **Environment Variables**
2. Update `VITE_API_URL` with your backend URL + `/api`
3. **Redeploy frontend** again

### Update Backend CORS:
1. Go to **Backend Project** → **Settings** → **Environment Variables**
2. Update `FRONTEND_URL` with your frontend URL
3. **Redeploy backend** again

---

## ✅ STEP 4: Test Deployment

### Test Backend:
Visit: `https://YOUR-BACKEND-URL.vercel.app/api/health`

Should return:
```json
{"status":"healthy","timestamp":"2024-..."}
```

### Test Frontend:
Visit: `https://YOUR-FRONTEND-URL.vercel.app`

Should see: Login page

### Test Login:
Use these credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@hrm.com | admin123 |
| **Manager** | manager@hrm.com | manager123 |
| **Employee** | employee1@hrm.com | employee123 |

**Note:** Users are automatically created on first backend request. Wait 30 seconds after first deployment for users to be seeded.

---

## 🐛 Troubleshooting

### Login Fails:
1. Check backend logs: **Backend Project** → **Deployments** → Latest → **Functions** tab
2. Verify `VITE_API_URL` in frontend matches backend URL + `/api`
3. Check database connection in backend logs
4. Wait 30 seconds after first deployment (users are seeding)

### Frontend Can't Connect:
1. Verify `VITE_API_URL` is set correctly
2. Check backend CORS includes frontend URL
3. Verify backend is deployed and running

### Backend Connection Error:
1. Check Bytehost database is accessible
2. Verify all DB_* environment variables are correct
3. Check backend logs for connection errors

---

## 📝 Summary

✅ **Backend Environment Variables:** 12 variables (see table above)  
✅ **Frontend Environment Variables:** 1 variable (`VITE_API_URL`)  
✅ **Database:** Bytehost MySQL (no XAMPP needed)  
✅ **Users:** Auto-created on first request  
✅ **Deployment:** Both projects on Vercel  

**Everything is ready! Just follow the steps above to deploy!** 🚀

