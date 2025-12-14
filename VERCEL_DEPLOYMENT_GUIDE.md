# Vercel Deployment Guide - HRM System

## Overview
This guide will help you deploy both frontend and backend to Vercel with Bytehost database.

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- Bytehost database credentials

## Step 1: Deploy Backend to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project**: Click "Add New" → "Project" → Import from GitHub
3. **Select Repository**: Choose `AhmadCracks/HRM-for-software-house`
4. **Configure Backend**:
   - **Root Directory**: Set to `hrm-backend`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Environment Variables** (CRITICAL - Add these in Vercel Dashboard):
   ```
   DB_HOST=sql100.byethost10.com
   DB_PORT=3306
   DB_NAME=b10_40637242_hrm_sys
   DB_USER=b10_40637242
   DB_PASSWORD=d6ky275f
   DB_SKIP_CREATE=true
   DB_CONNECT_TIMEOUT=20000
   NODE_ENV=production
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   RUN_SEED=true
   ```

6. **Deploy**: Click "Deploy"
7. **Note the Backend URL**: After deployment, copy the URL (e.g., `https://hrm-backend-xxx.vercel.app`)

## Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project**: Click "Add New" → "Project" → Import from GitHub
3. **Select Repository**: Choose `AhmadCracks/HRM-for-software-house`
4. **Configure Frontend**:
   - **Root Directory**: Set to `hrm-frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install`

5. **Environment Variables** (CRITICAL - Add these in Vercel Dashboard):
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
   Replace `your-backend-url.vercel.app` with your actual backend URL from Step 1.

6. **Deploy**: Click "Deploy"

## Step 3: Update Backend CORS

After deploying frontend, update the backend environment variable:
1. Go to Backend project in Vercel
2. Settings → Environment Variables
3. Update `FRONTEND_URL` to your frontend URL
4. Redeploy backend

## Step 4: Test Login Credentials

Default login credentials (created automatically on first deployment):
- **Admin**: `admin@hrm.com` / `admin123`
- **Manager**: `manager@hrm.com` / `manager123`
- **Employee**: `employee1@hrm.com` / `employee123`

## Troubleshooting

### Backend Issues:
- **Database Connection Error**: Check Bytehost credentials in environment variables
- **CORS Error**: Make sure `FRONTEND_URL` matches your frontend domain
- **Login Fails**: Wait a few seconds after first deployment for seed script to run

### Frontend Issues:
- **API Not Found**: Check `VITE_API_URL` is set correctly
- **Build Fails**: Make sure root directory is set to `hrm-frontend`

## Important Notes

1. **Database**: Bytehost database must be accessible from Vercel servers
2. **First Deployment**: May take 1-2 minutes for database connection and seeding
3. **Environment Variables**: Must be set in Vercel Dashboard, not in `.env` files
4. **JWT Secret**: Change `JWT_SECRET` to a strong random string in production

## Quick Deploy Commands (Alternative)

If you prefer CLI:

```bash
# Deploy Backend
cd hrm-backend
vercel --prod

# Deploy Frontend  
cd hrm-frontend
vercel --prod
```

Then set environment variables in Vercel Dashboard.

