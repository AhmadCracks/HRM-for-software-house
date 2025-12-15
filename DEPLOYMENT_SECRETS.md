# 🚀 Vercel Deployment Configuration

Here are the exact **Environment Variables** you need to set in your Vercel Project Settings.

## 1️⃣ Backend Project (`hrm-backend`)
Go to **Settings** → **Environment Variables** on Vercel and add these:

| Key | Value |
|-----|-------|
| `DB_HOST` | `sql100.byethost10.com` |
| `DB_USER` | `b10_40637242` |
| `DB_PASSWORD` | `d6ky275f` |
| `DB_NAME` | `b10_40637242_hrm_sys` |
| `DB_PORT` | `3306` |
| `DB_SKIP_CREATE` | `true` |
| `FRONTEND_URL` | `https://hrm-for-software-house.vercel.app` |

*> **Note:** `FRONTEND_URL` is important for fixing the CORS error.*

---

## 2️⃣ Frontend Project (`hrm-frontend`)
Go to **Settings** → **Environment Variables** on Vercel and add this:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://hrm-for-software-house-backend.vercel.app/api` |

*> **Important:** Make sure there is **no trailing slash** after `/api` unless your code expects it, but usually `/api` is enough. The error logs showed `/api/auth/login`, so ensure the variable + path is correct.*

---

## 🔄 How to Apply Changes
1.  Add/Update these variables in Vercel.
2.  Go to the **Deployments** tab.
3.  Click the **three dots** (⋮) next to the latest deployment and select **"Redeploy"** for both Backend and Frontend.
4.  This ensures the new variables are loaded.
