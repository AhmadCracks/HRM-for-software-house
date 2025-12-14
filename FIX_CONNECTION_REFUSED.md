# 🔧 Fix: ERR_CONNECTION_REFUSED Error

## ❌ Error
```
localhost:5000/api/auth/login:1 Failed to load resource: net::ERR_CONNECTION_REFUSED
```

## 🔍 Problem
The frontend is trying to connect to `localhost:5000` instead of your Vercel backend URL.

## ✅ Solution

### Step 1: Add Environment Variable in Vercel

**Go to:** Vercel Dashboard → Frontend Project (`hrm-frontendd`) → Settings → Environment Variables

**Add this variable:**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://hrm-backend-xxx.vercel.app/api` |

**Important:**
- Replace `xxx` with your actual backend deployment URL
- Must include `/api` at the end
- Select **Production**, **Preview**, and **Development**
- Click **Save**

### Step 2: Find Your Backend URL

1. Go to Vercel Dashboard
2. Click on your **Backend Project** (`hrm-backend`)
3. Go to **Deployments** tab
4. Click on the latest successful deployment
5. Copy the **Domain** URL (e.g., `hrm-backend-abc123.vercel.app`)
6. Use this in `VITE_API_URL`: `https://hrm-backend-abc123.vercel.app/api`

### Step 3: Redeploy Frontend

1. After adding the environment variable
2. Go to **Deployments** tab
3. Click **Redeploy** on latest deployment
4. Wait for build to complete

### Step 4: Verify

1. Visit your frontend URL
2. Open browser console (F12)
3. Should see API calls going to: `https://hrm-backend-xxx.vercel.app/api/...`
4. No more `localhost:5000` errors!

---

## 🐛 If Still Not Working

### Check Environment Variable

1. Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables
2. Verify `VITE_API_URL` is set correctly
3. Make sure it's set for **Production** environment
4. Value should be: `https://your-backend-url.vercel.app/api`

### Check Build Logs

1. Go to Deployments → Latest deployment
2. Check build logs
3. Look for any errors about environment variables

### Clear Browser Cache

1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Clear cache and cookies
3. Reload the page

### Test in Incognito Mode

1. Open incognito/private window
2. Visit your frontend URL
3. Check if it works

---

## ✅ Success Indicators

You'll know it's fixed when:

1. ✅ No `ERR_CONNECTION_REFUSED` errors
2. ✅ API calls go to Vercel backend URL (not localhost)
3. ✅ Login works
4. ✅ Browser console shows correct API URL

---

## 📝 Quick Checklist

- [ ] Found backend URL in Vercel
- [ ] Added `VITE_API_URL` environment variable
- [ ] Set value to: `https://backend-url.vercel.app/api`
- [ ] Selected Production, Preview, Development
- [ ] Clicked Save
- [ ] Redeployed frontend
- [ ] Tested in browser
- [ ] No more localhost errors!

---

## 🎯 Example

**Backend URL:** `https://hrm-backend-abc123.vercel.app`

**Environment Variable:**
```
VITE_API_URL=https://hrm-backend-abc123.vercel.app/api
```

That's it! After redeploying, the frontend will use the correct backend URL.

