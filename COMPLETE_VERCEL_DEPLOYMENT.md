# 🚀 Complete Vercel Deployment Guide - Full Project

## 📋 Pre-Deployment Checklist

### Step 1: Verify Root Directories

**Backend Project:**
- Vercel Dashboard → Backend Project → Settings → General
- Root Directory: `hrm-backend`
- If not set, set it now and save

**Frontend Project:**
- Vercel Dashboard → Frontend Project → Settings → General  
- Root Directory: `hrm-frontend`
- If not set, set it now and save

---

## 🔧 Backend Configuration

### Step 2: Backend Environment Variables

**Location:** Vercel Dashboard → Backend Project → Settings → Environment Variables

**Add these 11 variables** (select Production, Preview, Development for each):

```
PORT=5000
NODE_ENV=production
DB_HOST=sql100.byethost10.com
DB_USER=b10_40637242
DB_PASSWORD=d6ky275f
DB_NAME=b10_40637242_hrm_sys
DB_PORT=3306
DB_CONNECT_TIMEOUT=20000
DB_SKIP_CREATE=true
JWT_SECRET=verystrongsecretkey123
FRONTEND_URL=https://hrm-frontendd.vercel.app
```

**How to add:**
1. Click "Add New"
2. Enter Key and Value
3. Select all environments (Production, Preview, Development)
4. Click "Save"
5. Repeat for all 11 variables

---

## 🎨 Frontend Configuration

### Step 3: Find Your Backend URL

1. Go to Vercel Dashboard
2. Click on **Backend Project** (`hrm-backend` or similar)
3. Go to **Deployments** tab
4. Click on latest successful deployment
5. **Copy the Domain URL** (e.g., `hrm-backend-abc123.vercel.app`)
6. **Full URL:** `https://hrm-backend-abc123.vercel.app`

### Step 4: Frontend Environment Variables

**Location:** Vercel Dashboard → Frontend Project → Settings → Environment Variables

**Add this 1 variable:**

```
VITE_API_URL=https://YOUR_BACKEND_URL.vercel.app/api
```

**Replace `YOUR_BACKEND_URL` with your actual backend URL from Step 3**

**Example:**
- If backend URL is: `hrm-backend-abc123.vercel.app`
- Then set: `VITE_API_URL=https://hrm-backend-abc123.vercel.app/api`

**Important:**
- ✅ Must include `https://`
- ✅ Must include `/api` at the end
- ✅ No trailing slash after `/api`
- ✅ Select all environments (Production, Preview, Development)
- ✅ Click "Save"

---

## 🚀 Deploy Both Projects

### Step 5: Deploy Backend

1. Go to **Backend Project** → **Deployments** tab
2. Click **Redeploy** button (or ⋯ menu → Redeploy)
3. Wait for build to complete (1-2 minutes)
4. Check build logs for any errors
5. Test: Visit backend URL → Should see `{"message":"API is running...","status":"ok"}`

### Step 6: Deploy Frontend

1. Go to **Frontend Project** → **Deployments** tab
2. Click **Redeploy** button (or ⋯ menu → Redeploy)
3. Wait for build to complete (1-2 minutes)
4. Check build logs for any errors
5. Test: Visit frontend URL → Should see login page

---

## ✅ Verification Steps

### Test Backend

1. **Root Endpoint:**
   ```
   https://your-backend-url.vercel.app
   ```
   Should return: `{"message":"API is running...","status":"ok"}`

2. **Health Check:**
   ```
   https://your-backend-url.vercel.app/api/health
   ```
   Should return: `{"status":"healthy","database":"connected"}`

### Test Frontend

1. **Home Page:**
   ```
   https://hrm-frontendd.vercel.app
   ```
   Should show: Login page (not 404)

2. **Browser Console:**
   - Press F12 → Console tab
   - Should see: `🔗 API URL: https://your-backend-url.vercel.app/api`
   - Should NOT see: `localhost:5000`
   - Should NOT see: `ERR_CONNECTION_REFUSED`

3. **Login Test:**
   - Email: `admin@hrm.com`
   - Password: `admin123`
   - Should login successfully
   - Should redirect to dashboard

---

## 🔐 Login Credentials

After database is seeded, use these:

- **Admin:** `admin@hrm.com` / `admin123`
- **Manager:** `manager@hrm.com` / `manager123`
- **Employee 1:** `employee1@hrm.com` / `employee123`
- **Employee 2:** `employee2@hrm.com` / `employee123`

---

## 🐛 Troubleshooting

### Backend Returns 404

**Check:**
- ✅ Root Directory is set to `hrm-backend`
- ✅ All environment variables are set
- ✅ Build completed successfully
- ✅ Check Function Logs for errors

### Frontend Returns 404

**Check:**
- ✅ Root Directory is set to `hrm-frontend`
- ✅ `VITE_API_URL` environment variable is set
- ✅ Build completed successfully
- ✅ Check Build Logs for errors

### Frontend Still Using localhost

**Check:**
- ✅ `VITE_API_URL` is set in Vercel
- ✅ Value includes `/api` at the end
- ✅ Set for Production environment
- ✅ Frontend was redeployed AFTER adding variable
- ✅ Clear browser cache or use incognito mode

### Database Connection Failed

**Check:**
- ✅ All DB_* environment variables are set correctly
- ✅ ByteHost database is accessible
- ✅ `DB_SKIP_CREATE=true` is set
- ✅ Check Function Logs for specific error

### CORS Errors

**Check:**
- ✅ `FRONTEND_URL` is set in backend
- ✅ Frontend URL matches in CORS allowed origins
- ✅ Check browser console for exact error

---

## 📝 Environment Variables Summary

### Backend (11 variables)
```
PORT=5000
NODE_ENV=production
DB_HOST=sql100.byethost10.com
DB_USER=b10_40637242
DB_PASSWORD=d6ky275f
DB_NAME=b10_40637242_hrm_sys
DB_PORT=3306
DB_CONNECT_TIMEOUT=20000
DB_SKIP_CREATE=true
JWT_SECRET=verystrongsecretkey123
FRONTEND_URL=https://hrm-frontendd.vercel.app
```

### Frontend (1 variable)
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

---

## ✅ Final Checklist

Before considering deployment complete:

- [ ] Backend root directory set to `hrm-backend`
- [ ] Frontend root directory set to `hrm-frontend`
- [ ] All 11 backend environment variables added
- [ ] Frontend `VITE_API_URL` environment variable added
- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Backend URL shows API message
- [ ] Frontend URL shows login page
- [ ] No localhost errors in console
- [ ] Login works with test credentials
- [ ] Database connection working

---

## 🎯 Quick Reference

**Backend URL:** `https://hrm-backend-xxx.vercel.app`  
**Frontend URL:** `https://hrm-frontendd.vercel.app`

**Backend Root:** `hrm-backend`  
**Frontend Root:** `hrm-frontend`

**Database:** ByteHost MySQL (`sql100.byethost10.com`)

---

## 🚀 After Deployment

Your project will be live at:
- **Backend:** Your backend Vercel URL
- **Frontend:** `https://hrm-frontendd.vercel.app`

All code is ready and pushed to GitHub. Just configure Vercel and deploy! 🎉

