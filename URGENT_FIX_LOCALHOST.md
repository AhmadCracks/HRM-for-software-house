# 🚨 URGENT: Fix localhost Connection Error

## ❌ Current Error
```
POST http://localhost:5000/api/auth/login
```

**The frontend is trying to connect to localhost instead of your Vercel backend!**

## ✅ IMMEDIATE FIX (2 Minutes)

### Step 1: Find Your Backend URL

1. Go to **Vercel Dashboard**
2. Click on your **Backend Project** (`hrm-backend`)
3. Go to **Deployments** tab
4. Click on the latest successful deployment
5. **Copy the Domain URL** (e.g., `hrm-backend-abc123.vercel.app`)
6. **Full URL:** `https://hrm-backend-abc123.vercel.app`

### Step 2: Add Environment Variable in Vercel

1. Go to **Vercel Dashboard**
2. Click on your **Frontend Project** (`hrm-frontendd`)
3. Click **Settings** (gear icon, top right)
4. Click **Environment Variables** (left sidebar)
5. Click **Add New** button
6. Enter:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://hrm-backend-abc123.vercel.app/api`
     - Replace `abc123` with your actual backend URL
     - **MUST include `/api` at the end!**
   - **Environment:** Select all three:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
7. Click **Save**

### Step 3: Redeploy Frontend

**CRITICAL:** You MUST redeploy after adding the environment variable!

1. Go to **Deployments** tab
2. Click **Redeploy** button (top right)
3. Or click **⋯** (three dots) on latest deployment → **Redeploy**
4. Wait 1-2 minutes for build to complete

### Step 4: Test

1. Visit your frontend URL: `https://hrm-frontendd.vercel.app`
2. Open browser console (F12)
3. Should see: `🔗 API URL: https://hrm-backend-xxx.vercel.app/api`
4. Should NOT see: `localhost:5000`
5. Try logging in - should work!

---

## 🎯 Quick Example

**If your backend URL is:** `https://hrm-backend-abc123.vercel.app`

**Then set:**
```
VITE_API_URL=https://hrm-backend-abc123.vercel.app/api
```

**Important:**
- ✅ Include `https://`
- ✅ Include `/api` at the end
- ✅ No trailing slash after `/api`
- ✅ Use the exact URL from Vercel

---

## ⚠️ Common Mistakes

1. **Missing `/api`:**
   - ❌ `https://hrm-backend-xxx.vercel.app`
   - ✅ `https://hrm-backend-xxx.vercel.app/api`

2. **Wrong URL:**
   - ❌ Using frontend URL
   - ✅ Must use backend URL

3. **Not Redeploying:**
   - ❌ Adding variable but not redeploying
   - ✅ Must redeploy after adding variable

4. **Wrong Environment:**
   - ❌ Only set for Development
   - ✅ Set for Production, Preview, Development

---

## 🐛 If Still Not Working

### Check Environment Variable

1. Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Verify `VITE_API_URL` exists
3. Check the value is correct
4. Make sure it's set for **Production**

### Check Build Logs

1. Go to Deployments → Latest deployment
2. Click on the deployment
3. Check **Build Logs**
4. Look for any errors about environment variables

### Clear Browser Cache

1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Clear cache and cookies
3. Reload page

### Test in Incognito

1. Open incognito/private window
2. Visit frontend URL
3. Check if it works

---

## ✅ Success Checklist

After fixing, you should see:

- [ ] Browser console shows: `🔗 API URL: https://backend-url.vercel.app/api`
- [ ] No `localhost:5000` in console
- [ ] API calls go to Vercel backend
- [ ] Login works
- [ ] No connection errors

---

## 📝 Summary

**The Problem:** Frontend doesn't have `VITE_API_URL` environment variable set in Vercel

**The Solution:**
1. Find backend URL in Vercel
2. Add `VITE_API_URL=https://backend-url.vercel.app/api` to frontend
3. Redeploy frontend
4. Done! ✅

**This is a Vercel configuration issue, not a code issue. The code is ready!**

