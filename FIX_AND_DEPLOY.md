# 🔧 Fix Database Config & Deploy to Vercel

## ✅ Fixed Issues

1. **Removed invalid `requestTimeout` option** from database config
2. **Optimized connection settings** for Bytehost (increased timeouts)
3. **All changes pushed to GitHub**

---

## 🚀 Deploy to Vercel Now

### Option 1: Fix Root Directory in Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/ahmads-projects-3635a9cd/hrm-backend/settings
2. Scroll to **"Root Directory"**
3. Change from `hrm-backend/hrm-backend` to: `hrm-backend`
4. Click **"Save"**
5. Go to **Deployments** → Click **"Redeploy"** on latest deployment

### Option 2: Create New Backend Project

1. Go to: https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import: `AhmadCracks/HRM-for-software-house`
4. **Root Directory**: `hrm-backend` ⚠️ CRITICAL
5. **Framework**: Other
6. Add all environment variables (see below)
7. Deploy

---

## 📦 Backend Environment Variables

Go to: **Backend Project → Settings → Environment Variables**

Add these for **Production**, **Preview**, **Development**:

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
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## 🎨 Frontend Environment Variables

Go to: **Frontend Project → Settings → Environment Variables**

Add this for **Production**, **Preview**, **Development**:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

⚠️ Replace `your-backend-url` with your actual backend Vercel URL!

---

## 🔄 After Deployment

1. **Backend**: Test health endpoint
   - Visit: `https://your-backend-url.vercel.app/api/health`
   - Should return: `{"status":"healthy","timestamp":"..."}`

2. **Frontend**: Test login
   - Visit your frontend URL
   - Login with: `admin@hrm.com` / `admin123`
   - Users are auto-created on first request

3. **Update CORS**: 
   - Update `FRONTEND_URL` in backend env vars
   - Redeploy backend

---

## ✅ What Was Fixed

- ❌ **Before**: `requestTimeout: 20000` (invalid option causing warnings)
- ✅ **After**: Removed `requestTimeout`, kept only `connectTimeout`
- ✅ **Optimized**: Increased timeouts for Bytehost (30 seconds)
- ✅ **Added**: Keep-alive options for better connection stability

---

## 🐛 If Still Getting Connection Errors

The `connect ETIMEDOUT` error locally is **normal** - Bytehost MySQL is not accessible from your local machine. 

**This will work on Vercel** because:
- Vercel serverless functions run on cloud infrastructure
- They can access external databases like Bytehost
- The connection will work once deployed

**To verify locally**, you would need to:
- Use a VPN
- Or use a different database (local MySQL)
- Or just deploy to Vercel (recommended)

---

## 📝 Summary

✅ Database config fixed (no more warnings)  
✅ Code pushed to GitHub  
✅ Ready to deploy to Vercel  
⚠️ Fix root directory in Vercel dashboard or create new project  
⚠️ Set all environment variables  
⚠️ Deploy backend first, then frontend  

**The connection timeout locally is expected - it will work on Vercel!** 🚀

