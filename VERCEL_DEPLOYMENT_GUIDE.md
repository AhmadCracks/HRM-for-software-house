# 🚀 Vercel Deployment Guide - HRM System

## 📋 Prerequisites
- GitHub repository: `https://github.com/AhmadCracks/HRM-for-software-house.git`
- Bytehost MySQL database credentials
- Vercel account

## 🔧 Step 1: Deploy Backend to Vercel

### 1.1 Create Backend Project in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import from GitHub: `AhmadCracks/HRM-for-software-house`
4. **Root Directory**: Set to `hrm-backend`
5. **Framework Preset**: Other

### 1.2 Configure Environment Variables
In Vercel project settings → Environment Variables, add:

```env
NODE_ENV=production
DB_HOST=sql100.byethost10.com
DB_USER=b10_40637242
DB_PASSWORD=d6ky275f
DB_NAME=b10_40637242_hrm_sys
DB_PORT=3306
DB_CONNECT_TIMEOUT=30000
DB_SKIP_CREATE=true
JWT_SECRET=your_very_strong_secret_key_change_this
FRONTEND_URL=https://your-frontend-url.vercel.app
RUN_SEED=true
```

### 1.3 Deploy Backend
- Click "Deploy"
- Wait for deployment to complete
- **Copy the deployment URL** (e.g., `https://hrm-backend-xxx.vercel.app`)

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Create Frontend Project in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import from GitHub: `AhmadCracks/HRM-for-software-house`
4. **Root Directory**: Set to `hrm-frontend`
5. **Framework Preset**: Vite

### 2.2 Configure Environment Variables
In Vercel project settings → Environment Variables, add:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

**⚠️ IMPORTANT**: Replace `your-backend-url.vercel.app` with your actual backend URL from Step 1.3

### 2.3 Deploy Frontend
- Click "Deploy"
- Wait for deployment to complete
- **Copy the frontend URL**

## 🔄 Step 3: Update Backend CORS

After deploying frontend, update the backend environment variable:
1. Go to Backend project in Vercel
2. Settings → Environment Variables
3. Update `FRONTEND_URL` to your frontend URL
4. Redeploy backend

## ✅ Step 4: Verify Deployment

### Test Backend
Visit: `https://your-backend-url.vercel.app/api/health`
Should return: `{"status":"healthy","timestamp":"..."}`

### Test Frontend
Visit your frontend URL and try logging in with:
- **Admin**: `admin@hrm.com` / `admin123`
- **Manager**: `manager@hrm.com` / `manager123`
- **Employee**: `employee1@hrm.com` / `employee123`

## 🔐 Login Credentials

The system automatically creates these users on first deployment:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hrm.com | admin123 |
| Manager | manager@hrm.com | manager123 |
| Employee | employee1@hrm.com | employee123 |

## 🐛 Troubleshooting

### Backend Connection Timeout
- Check Bytehost database is accessible
- Verify DB credentials in environment variables
- Check Bytehost allows remote MySQL connections

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly in frontend environment variables
- Check backend CORS settings include frontend URL
- Verify backend is deployed and running

### Login Fails
- Check backend logs in Vercel dashboard
- Verify database connection is working
- Check if users were seeded (check backend logs)

## 📝 Notes

- Backend uses serverless functions (no need for XAMPP)
- Database is hosted on Bytehost (no local MySQL needed)
- Users are automatically created on first backend request
- All passwords are hashed with bcrypt
