# 🔐 Complete Vercel Environment Variables - Backend & Frontend

## 📋 BACKEND Environment Variables

**Project:** Backend (Root Directory: `hrm-backend`)  
**Location:** Vercel Dashboard → Backend Project → Settings → Environment Variables

### Required Variables (11 total):

```env
PORT=5000
NODE_ENV=production
DB_HOST=sql100.byethost10.com
DB_USER=b10_40637242
DB_PASSWORD=d6ky275f
DB_NAME=b10_40637242_hrm_sys
DB_PORT=3306
DB_CONNECT_TIMEOUT=30000
DB_SKIP_CREATE=true
JWT_SECRET=hrm_secret_key_2024_production_change_this
FRONTEND_URL=https://your-frontend-url.vercel.app
RUN_SEED=true
```

**⚠️ Important:**
- Set all variables for **Production**, **Preview**, and **Development** environments
- `FRONTEND_URL` should be updated after frontend is deployed
- `JWT_SECRET` should be changed to a strong random string in production

---

## 📋 FRONTEND Environment Variables

**Project:** Frontend (Root Directory: `hrm-frontend`)  
**Location:** Vercel Dashboard → Frontend Project → Settings → Environment Variables

### Required Variables (1 total):

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

**⚠️ Important:**
- Replace `your-backend-url.vercel.app` with your actual backend deployment URL
- **Must include `/api` at the end**
- Set for **Production**, **Preview**, and **Development** environments

---

## 🚀 Deployment Order

1. **Deploy Backend First**
   - Set root directory: `hrm-backend`
   - Add all 12 backend environment variables
   - Deploy and copy the backend URL

2. **Deploy Frontend Second**
   - Set root directory: `hrm-frontend`
   - Add `VITE_API_URL` with backend URL + `/api`
   - Deploy

3. **Update Backend CORS**
   - Go back to backend project
   - Update `FRONTEND_URL` with frontend URL
   - Redeploy backend

---

## ✅ Verification Checklist

### Backend:
- [ ] Root directory set to `hrm-backend`
- [ ] All 12 environment variables added
- [ ] Deployment successful
- [ ] Health check works: `https://backend-url.vercel.app/api/health`
- [ ] Returns: `{"status":"healthy","timestamp":"..."}`

### Frontend:
- [ ] Root directory set to `hrm-frontend`
- [ ] `VITE_API_URL` environment variable added
- [ ] Deployment successful
- [ ] Login page loads correctly

### Login Test:
- [ ] Admin login: `admin@hrm.com` / `admin123`
- [ ] Manager login: `manager@hrm.com` / `manager123`
- [ ] Employee login: `employee1@hrm.com` / `employee123`

---

## 🔐 Auto-Created Users

These users are automatically created on first backend request:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hrm.com | admin123 |
| Manager | manager@hrm.com | manager123 |
| Employee | employee1@hrm.com | employee123 |

**Note:** Users are created automatically when the backend first connects to the database. No manual seeding needed!

