# ⚡ Quick Deploy to Vercel - HRM System

## 🎯 What's Fixed
✅ Backend configured for Vercel serverless  
✅ Bytehost database connection configured  
✅ Auto-seed users on first deployment  
✅ Login credentials will work automatically  

## 🚀 Deploy Backend (5 minutes)

### Step 1: Create Backend Project
1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import: `AhmadCracks/HRM-for-software-house`
4. **Root Directory**: `hrm-backend` ⚠️ IMPORTANT
5. Framework: **Other**

### Step 2: Set Environment Variables
Click **"Environment Variables"** and add these:

```
DB_HOST = sql100.byethost10.com
DB_USER = b10_40637242
DB_PASSWORD = d6ky275f
DB_NAME = b10_40637242_hrm_sys
DB_PORT = 3306
DB_SKIP_CREATE = true
DB_CONNECT_TIMEOUT = 30000
JWT_SECRET = your_strong_secret_key_here
NODE_ENV = production
RUN_SEED = true
FRONTEND_URL = (leave empty for now, add after frontend deploys)
```

### Step 3: Deploy
Click **"Deploy"** and wait. Copy the URL (e.g., `https://hrm-backend-xxx.vercel.app`)

---

## 🎨 Deploy Frontend (3 minutes)

### Step 1: Create Frontend Project
1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import: `AhmadCracks/HRM-for-software-house`
4. **Root Directory**: `hrm-frontend` ⚠️ IMPORTANT
5. Framework: **Vite**

### Step 2: Set Environment Variable
Click **"Environment Variables"** and add:

```
VITE_API_URL = https://YOUR-BACKEND-URL.vercel.app/api
```

⚠️ Replace `YOUR-BACKEND-URL` with your actual backend URL from above!

### Step 3: Deploy
Click **"Deploy"** and wait. Copy the frontend URL.

---

## 🔄 Final Step: Update Backend CORS

1. Go back to **Backend Project** → **Settings** → **Environment Variables**
2. Add/Update: `FRONTEND_URL = https://your-frontend-url.vercel.app`
3. Go to **Deployments** → Click **"Redeploy"** on latest deployment

---

## ✅ Test Login

Visit your frontend URL and login with:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@hrm.com | admin123 |
| **Manager** | manager@hrm.com | manager123 |
| **Employee** | employee1@hrm.com | employee123 |

Users are **automatically created** on first backend request! 🎉

---

## 🐛 If Login Fails

1. Check backend logs: Backend Project → **Deployments** → Click latest → **Functions** tab
2. Verify `VITE_API_URL` in frontend matches backend URL
3. Check database connection in backend logs
4. Wait 30 seconds after first deployment (users are seeding)

---

## 📝 Notes

- ✅ No XAMPP needed - everything runs on Vercel
- ✅ Database is on Bytehost - no local MySQL
- ✅ Users auto-created on first request
- ✅ All passwords hashed with bcrypt

