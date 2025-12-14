# Quick Vercel Deployment Steps

## ✅ What's Been Done

1. ✅ Updated `db.js` with ByteHost database configuration (20s timeout)
2. ✅ Fixed Vite build issue (moved to devDependencies, added npx)
3. ✅ Updated Vercel configurations for both frontend and backend
4. ✅ Created environment template files
5. ✅ Pushed all changes to GitHub

## 🚀 Deploy to Vercel

### Step 1: Deploy Backend

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `ahmadkhan32/HRM-for-Softwarehousemanagementsystem`
4. Configure the project:
   - **Root Directory**: `hrm-backend`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. Add Environment Variables:
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
   ```

6. Click "Deploy"
7. **Copy the deployment URL** (e.g., `https://hrm-backend-xxx.vercel.app`)

### Step 2: Deploy Frontend

1. Click "Add New Project" again
2. Import the same repository
3. Configure the project:
   - **Root Directory**: `hrm-frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
   (Replace `your-backend-url` with your actual backend Vercel URL from Step 1)

5. Click "Deploy"

## 🔧 Troubleshooting

### If Backend Deployment Fails:
- Check that all environment variables are set correctly
- Verify ByteHost database allows external connections
- Check Vercel build logs for specific errors

### If Frontend Build Fails:
- Ensure `VITE_API_URL` is set correctly
- Check that Vite is in devDependencies (already fixed)
- Verify build command: `npm install && npm run build`

### Database Connection Issues:
- ByteHost may require whitelisting Vercel IPs
- Check ByteHost control panel for connection settings
- Verify database credentials are correct

## 📝 Important Notes

- The backend URL will be something like: `https://hrm-backend-xxx.vercel.app`
- Use this URL in frontend's `VITE_API_URL` environment variable
- Both deployments will auto-update when you push to GitHub
- Make sure CORS is enabled in backend (already configured)

## 🔗 After Deployment

1. Test backend: Visit `https://your-backend.vercel.app` - should show "API is running..."
2. Test frontend: Visit your frontend URL and try logging in
3. If login fails, check browser console for API connection errors

