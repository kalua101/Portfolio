# 🚀 Vercel Deployment Guide

## Quick Deploy via Website (Recommended)

### Step 1: Go to Vercel
Visit: **https://vercel.com**

### Step 2: Sign Up with GitHub
1. Click "Sign Up" or "Login"
2. Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

### Step 3: Import Your Repository
1. Click **"Add New..."** → **"Project"**
2. Find your repo: **`kalua101/Portfolio`**
3. Click **"Import"**

### Step 4: Configure (No Changes Needed!)
Vercel auto-detects everything:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

**No environment variables needed!**

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Get your live URL! 🎉

---

## Alternative: CLI Deployment

If you prefer command line:

### 1. Login to Vercel
```bash
vercel login
```
- Enter your email
- Click the verification link sent to your email

### 2. Deploy
```bash
vercel
```
- Follow the prompts
- Accept all defaults
- Your site will be deployed!

### 3. Deploy to Production
```bash
vercel --prod
```

---

## What You Get

✅ **Live URL**: `https://portfolio-yourname.vercel.app`
✅ **Free SSL Certificate**: Automatic HTTPS
✅ **Global CDN**: Fast worldwide
✅ **Auto-Deploy**: Push to GitHub = Auto-deploy
✅ **Custom Domain**: Can add later (free)

---

## After Deployment

### Test Your Site:
1. **Homepage**: All sections load
2. **Admin Panel**: Go to `/admin` (password: kaleab2024)
3. **Upload Profile**: Test image upload
4. **Theme Toggle**: Dark/light mode works
5. **Mobile**: Check responsive design
6. **Contact**: Email link works (kaleabt06@gmail.com)

### Auto-Deploy Setup:
Once deployed via Vercel website:
- Every push to `main` branch → Auto-deploys
- No manual action needed
- See deployment status in Vercel dashboard

---

## Custom Domain (Optional)

Want to use your own domain like `kaleabtemesgen.com`?

1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your custom domain
5. Update DNS records at your domain provider
6. Done! (Vercel handles SSL automatically)

---

## Troubleshooting

### Build Fails?
- Check the build logs in Vercel dashboard
- Most common: Missing dependencies (already handled!)
- Build command is correct: `npm run build`

### Admin Not Working?
- Check `/admin` path in browser
- Password is: `kaleab2024`
- Data file should be included in deployment

### Images Not Loading?
- Profile picture at `/public/profile.jpg` ✓
- Default SVG at `/public/profile.svg` ✓
- Both are committed to GitHub ✓

---

## Need Help?

**Vercel Support**: https://vercel.com/support
**Documentation**: https://vercel.com/docs

---

Generated: 2026-09-18
Repository: https://github.com/kalua101/Portfolio
Deployment Status: Ready ✅
