# 🔐 Portfolio Admin Dashboard Guide

## Access Your Admin Dashboard

**URL:** http://localhost:3001/admin

**Password:** `kaleab2024`

---

## 📋 Features

### 1. **Profile Management**
- ✅ Upload and change profile picture
- ✅ Edit name and professional title
- ✅ Update bio/description

### 2. **Experience & Education**
- ✅ Add new experience entries
- ✅ Edit existing experiences
- ✅ Delete experiences
- ✅ Manage: Period, Title, Company, Location, Description, Technologies

### 3. **Projects Management**
- ✅ Add new projects
- ✅ Edit project details
- ✅ Delete projects
- ✅ Manage: Title, Description, Technologies, Live URL, GitHub URL

---

## 🚀 How to Use

1. **Access Admin:**
   - Go to: http://localhost:3001/admin
   - Enter password: `kaleab2024`

2. **Make Changes:**
   - Click tabs to switch between sections
   - Fill in the forms
   - Click "Save" buttons

3. **Apply Changes:**
   - Changes are logged to browser console (F12 → Console)
   - Copy the logged data
   - Update the corresponding component files:
     - **Profile:** `/components/Hero.tsx`
     - **Experience:** `/components/Experience.tsx`
     - **Projects:** `/components/Projects.tsx`

---

## 📝 Important Notes

- ⚠️ This admin dashboard is for **editing only** - it doesn't automatically save to files
- 💾 To persist changes, you need to manually update the component files with the logged data
- 🔒 Change the password in `/app/admin/page.tsx` (line 15: `ADMIN_PASSWORD`)
- 🖼️ For profile pictures, save uploaded images to `/public/` folder

---

## 🔐 Change Admin Password

Edit `/app/admin/page.tsx` and change line 15:

```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

---

## 🌐 Production Deployment

When deploying to production (Vercel, etc.):

1. Change the admin password
2. Consider adding more secure authentication
3. Add environment variables for sensitive data
4. Consider using a database or CMS for persistent storage

---

## 📧 Need Help?

Contact: kaleabtemesgen@icloud.com
