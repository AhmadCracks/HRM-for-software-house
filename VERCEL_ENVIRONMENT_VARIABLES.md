# Vercel Environment Variables Configuration

## ✅ Backend Environment Variables (hrm-backend)

Add these in your **Backend Vercel Project** (`hrm-frontend-lac.vercel.app`):

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

## ✅ Frontend Environment Variables (hrm-frontendd)

Add this in your **Frontend Vercel Project** (`hrm-frontendd.vercel.app`):

```
VITE_API_URL=https://hrm-frontend-lac.vercel.app/api
```

## 📝 Login Credentials

After seeding the database, use these credentials:

### Admin
- **Email:** `admin@hrm.com`
- **Password:** `admin123`

### Manager
- **Email:** `manager@hrm.com`
- **Password:** `manager123`

### Employee 1
- **Email:** `employee1@hrm.com`
- **Password:** `employee123`

### Employee 2
- **Email:** `employee2@hrm.com`
- **Password:** `employee123`

## 🔧 To Seed Database (Create Login Users)

If users don't exist, run the seed script. You can do this by:
1. Connecting to your ByteHost database via phpMyAdmin
2. Or running the seed script locally (it will connect to ByteHost)
3. Or create a Vercel serverless function to run the seed

## ✅ Current Configuration

- **Backend URL:** `https://hrm-frontend-lac.vercel.app`
- **Frontend URL:** `https://hrm-frontendd.vercel.app`
- **Database:** ByteHost MySQL (`sql100.byethost10.com`)
- **Database Name:** `b10_40637242_hrm_sys`

## 🔍 Verification Steps

1. **Test Backend:** Visit `https://hrm-frontend-lac.vercel.app` - should show "API is running..."
2. **Test Frontend:** Visit `https://hrm-frontendd.vercel.app` - should load the login page
3. **Test Login:** Use `admin@hrm.com` / `admin123` to login
4. **Check Console:** Open browser console (F12) and verify API calls go to backend URL

