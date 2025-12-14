# 🚀 Live Deployment Configuration - Vercel + ByteHost

## ✅ Current Live URLs

- **Backend:** `https://hrm-frontend-lac.vercel.app`
- **Frontend:** `https://hrm-frontendd.vercel.app`
- **Database:** ByteHost MySQL (`sql100.byethost10.com`)

## 📋 Backend Vercel Environment Variables

Add these in **Backend Project** (`hrm-frontend-lac.vercel.app`):

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

## 📋 Frontend Vercel Environment Variables

Add this in **Frontend Project** (`hrm-frontendd.vercel.app`):

```
VITE_API_URL=https://hrm-frontend-lac.vercel.app/api
```

## 🔐 Login Credentials

These are the default credentials from the seed file. Make sure the database is seeded:

### Admin Account
- **Email:** `admin@hrm.com`
- **Password:** `admin123`
- **Role:** Admin (Full access)

### Manager Account
- **Email:** `manager@hrm.com`
- **Password:** `manager123`
- **Role:** Manager

### Employee Accounts
- **Email:** `employee1@hrm.com`
- **Password:** `employee123`
- **Role:** Employee

- **Email:** `employee2@hrm.com`
- **Password:** `employee123`
- **Role:** Employee

## 🔧 Database Configuration (ByteHost)

The system is configured to connect to ByteHost MySQL:
- **Host:** `sql100.byethost10.com`
- **Database:** `b10_40637242_hrm_sys`
- **User:** `b10_40637242`
- **Port:** `3306`
- **Connection Timeout:** `20000ms` (20 seconds)

All database credentials are already configured in `hrm-backend/config/db.js` and will use environment variables from Vercel.

## ✅ Configuration Files Updated

1. ✅ `hrm-backend/config/db.js` - ByteHost database configuration
2. ✅ `hrm-backend/server.js` - CORS configured for both frontend URLs
3. ✅ `hrm-frontend/src/api/axios.js` - API URL with fallback to backend
4. ✅ `hrm-backend/env.template` - Environment variables template
5. ✅ `hrm-frontend/env.template` - Frontend environment variables template

## 🧪 Testing Steps

1. **Test Backend:**
   - Visit: `https://hrm-frontend-lac.vercel.app`
   - Should see: "API is running..."

2. **Test Frontend:**
   - Visit: `https://hrm-frontendd.vercel.app`
   - Should see: Login page

3. **Test Login:**
   - Use: `admin@hrm.com` / `admin123`
   - Should redirect to admin dashboard

4. **Check API Connection:**
   - Open browser console (F12)
   - Go to Network tab
   - Login and verify API calls go to: `https://hrm-frontend-lac.vercel.app/api/...`

## ⚠️ Important Notes

1. **Database Seeding:** If users don't exist, you need to seed the database. The seed file is at `hrm-backend/seeders/seed.js`

2. **CORS:** Backend CORS is configured to allow requests from:
   - `http://localhost:3000` (local development)
   - `https://hrm-frontendd.vercel.app` (production frontend)
   - `https://hrm-frontend-lac.vercel.app` (if needed)

3. **Environment Variables:** Make sure all environment variables are set in Vercel for both projects

4. **Redeploy:** After adding/changing environment variables, redeploy both projects

## 🔄 If Login Doesn't Work

1. Check if database is seeded (users exist)
2. Verify environment variables are set correctly
3. Check Vercel build logs for errors
4. Verify database connection in backend logs
5. Check browser console for API errors

