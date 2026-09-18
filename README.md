# Next.js Portfolio - Setup Instructions

## 🚀 Quick Start

Your Next.js portfolio has been partially set up. To complete the installation:

### 1. Install Dependencies

```bash
cd c:\Users\hp\OneDrive\Desktop\portfolio-nextjs
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── ThemeProvider.tsx   # Dark/Light mode context
│   ├── Navigation.tsx      # Sticky navbar ✅
│   ├── Hero.tsx           # Hero section (needs creation)
│   ├── About.tsx          # About section (needs creation)
│   ├── TechStack.tsx      # Tech stack grid (needs creation)
│   ├── Projects.tsx       # Projects showcase (needs creation)
│   ├── Experience.tsx     # Timeline (needs creation)
│   ├── Contact.tsx        # Contact form (needs creation)
│   └── Footer.tsx         # Footer (needs creation)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## ✅ Already Created

- ✅ Next.js 15 setup with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS with custom theme
- ✅ Dark/Light mode toggle
- ✅ Responsive navigation bar
- ✅ Theme provider context
- ✅ Custom gradient utilities

## 📝 Remaining Components to Create

I've set up the foundation. You need to create these component files:

### Hero.tsx
```tsx
'use client';
export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4">
      {/* Hero content */}
    </section>
  );
}
```

### About.tsx, TechStack.tsx, Projects.tsx, Experience.tsx, Contact.tsx, Footer.tsx
Follow the same pattern as Hero.tsx

## 🎨 Features

- ⚡ Next.js 15 with App Router
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🚀 Optimized for production
- 🔍 SEO-friendly

## 🛠️ Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📦 Dependencies

All required packages are in `package.json`:
- next ^15.1.0
- react ^19.0.0
- react-dom ^19.0.0
- typescript ^5.7.2
- tailwindcss ^3.4.17
- lucide-react ^0.468.0

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Deploy the `.next` folder

## 📖 Next Steps

1. Run `npm install` to install all dependencies
2. Create the remaining component files
3. Add your personal content and projects
4. Customize colors in `tailwind.config.ts`
5. Deploy to Vercel or your preferred hosting

## 💡 Tips

- Use `lucide-react` for icons
- Follow the Tailwind CSS utility-first approach
- Keep components modular and reusable
- Use TypeScript interfaces for props

---

Need help? The vanilla HTML/CSS/JS version is still available in the `portfolio` folder!
