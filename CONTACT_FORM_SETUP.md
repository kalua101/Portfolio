# 📧 Contact Form Setup Guide

Your contact form is configured to send emails to **kaleabt06@gmail.com** using Web3Forms (free service).

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your Free Access Key

1. Go to: **https://web3forms.com**
2. Scroll down to "Get Your Access Key"
3. Enter your email: **kaleabt06@gmail.com**
4. Click **"Get Access Key"**
5. Check your email inbox
6. Copy the access key (looks like: `abc123-def456-ghi789`)

### Step 2: Update Your Contact Component

1. Open: `components/Contact.tsx`
2. Find line with: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'`
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key
4. Save the file

Example:
```typescript
access_key: 'abc123-def456-ghi789', // Your real key here
```

### Step 3: Deploy

```bash
git add components/Contact.tsx
git commit -m "Add Web3Forms access key for contact form"
git push origin main
```

Vercel will auto-deploy in ~2 minutes!

---

## ✅ How It Works

1. **User fills form** on your website
2. **Clicks "Send Message"**
3. **Web3Forms sends email** to kaleabt06@gmail.com
4. **You receive email** with:
   - Name
   - Email (to reply)
   - Subject
   - Message

---

## 🆓 Web3Forms Features

- ✅ **100% Free** for unlimited emails
- ✅ **No registration** required
- ✅ **No API limits**
- ✅ **Spam protection** included
- ✅ **Works immediately**
- ✅ **No credit card** needed

---

## 🔄 Alternative Option: Formspree

If you prefer Formspree instead:

1. Go to: **https://formspree.io**
2. Sign up with GitHub
3. Create a new form
4. Set email to: kaleabt06@gmail.com
5. Copy the form endpoint
6. Update Contact.tsx to use Formspree endpoint

---

## 📝 Email Format You'll Receive

```
From: noreply@web3forms.com
To: kaleabt06@gmail.com
Subject: [Subject from form]

Name: John Doe
Email: john@example.com

Message:
Hi, I'd like to discuss a project...
```

You can reply directly to the sender's email!

---

## 🧪 Testing

After setup:
1. Go to your live site
2. Fill out the contact form
3. Click "Send Message"
4. Check your Gmail: kaleabt06@gmail.com
5. Email should arrive within 30 seconds

---

## ❓ Troubleshooting

### Form not sending?
- Check access key is correct (no quotes or extra spaces)
- Check your email (kaleabt06@gmail.com) inbox
- Check spam folder
- Verify Vercel deployment completed

### Still not working?
The form will show an alert with the error. Check:
1. Internet connection
2. Access key is valid
3. Email address is correct

---

## 🔒 Security Note

Your access key is safe to commit to GitHub. Web3Forms access keys are:
- Public-facing (meant to be in frontend code)
- Rate-limited per domain
- Spam-protected
- Cannot be abused

---

Generated: 2026-09-18
Contact Email: kaleabt06@gmail.com
Service: Web3Forms (https://web3forms.com)
