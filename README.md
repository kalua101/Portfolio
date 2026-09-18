# Kaleab Temesgen - Portfolio Website

Modern, responsive portfolio website built with Next.js, featuring an admin panel for easy content management.

## 🚀 Features

- **✨ Modern Design**: Clean, professional interface with dark/light mode toggle
- **🎨 Pink/Rainbow Theme**: Beautiful gradient borders and backgrounds in light mode
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **🎬 Smooth Animations**: Scroll-triggered animations with IntersectionObserver
- **⚙️ Admin Panel**: Edit profile, projects, experience, and tech stack without code
- **💾 Auto-Save System**: All changes automatically saved to JSON file
- **🖼️ Profile Upload**: Upload and crop profile pictures directly from admin
- **🔒 Password Protected**: Secure admin access

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Cropping**: react-easy-crop
- **Font**: Inter (Google Fonts)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/kalua101/Portfolio.git

# Navigate to project directory
cd portfolio-nextjs

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🎯 Quick Start

### View Portfolio
Visit the homepage to see all sections:
- Hero with profile picture and intro
- About section
- Tech Stack & Ecosystem
- Featured Projects
- Professional Experience
- Contact information

### Access Admin Panel
1. Navigate to `/admin`
2. Enter password: `kaleab2024`
3. Edit content in 4 tabs:
   - **Profile**: Update bio, upload profile picture
   - **Experience**: Add/edit work experience
   - **Projects**: Manage project showcase
   - **Tech Stack**: Update technology categories

All changes auto-save instantly!

## 📁 Project Structure

```
portfolio-nextjs/
├── app/
│   ├── admin/
│   │   └── page.tsx           # Admin dashboard
│   ├── api/
│   │   ├── portfolio/
│   │   │   └── route.ts       # GET/POST portfolio data
│   │   └── upload/
│   │       └── route.ts       # Profile picture upload
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main portfolio page
│   └── globals.css            # Global styles
├── components/
│   ├── Hero.tsx               # Hero section
│   ├── About.tsx              # About section
│   ├── TechStack.tsx          # Tech stack grid
│   ├── Projects.tsx           # Projects showcase
│   ├── Experience.tsx         # Timeline
│   ├── Contact.tsx            # Contact section
│   ├── Footer.tsx             # Footer
│   ├── Navigation.tsx         # Header navigation
│   └── ThemeProvider.tsx      # Dark/light mode
├── hooks/
│   └── useScrollAnimation.ts  # Scroll animation hook
├── data/
│   └── portfolio.json         # All portfolio data
└── public/
    ├── profile.jpg            # Current profile picture
    └── profile.svg            # Default profile SVG
```

## 🎨 Customization

### Update Portfolio Data
Use the admin panel at `/admin` or manually edit `data/portfolio.json`:

```json
{
  "profile": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    "email": "your@email.com",
    "location": "Your Location",
    "phone": "+1234567890",
    "profilePicture": "/profile.jpg"
  },
  "projects": [...],
  "experience": [...],
  "techStack": {...}
}
```

### Change Admin Password
Edit `app/admin/page.tsx` line 15:
```tsx
const ADMIN_PASSWORD = 'your-new-password';
```

### Customize Colors
Modify `tailwind.config.ts` for theme colors.

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
No environment variables required - portfolio data stored in `/data/portfolio.json`.

## 🔧 Development

```bash
# Run dev server (port 3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## 📝 Admin Features

- **Profile Management**: Update name, title, bio, contact info
- **Profile Picture**: Upload, crop, and set profile image
- **Project Management**: Add/edit/delete projects with details
- **Experience Timeline**: Manage work experience entries
- **Tech Stack**: Organize technologies by categories
- **Auto-Save**: All changes save automatically (no manual save button)

## 🎬 Animations

- **Fade In**: Elements fade in as you scroll
- **Slide**: Content slides from left/right
- **Scale**: Items scale up on view
- **Header**: Hides on scroll down, shows on scroll up
- **Smooth Performance**: Optimized with IntersectionObserver

## 📧 Contact

- **Email**: kaleabt06@gmail.com
- **GitHub**: [github.com/kalua101](https://github.com/kalua101)
- **LinkedIn**: [linkedin.com/in/kaleabtemesgen-0a62343a5](https://www.linkedin.com/in/kaleabtemesgen-0a62343a5)
- **Location**: Addis Ababa, Ethiopia
- **Phone**: +251 972 108 293

## 📄 License

This project is open source and available for personal use.

---

Built with ❤️ by Kaleab Temesgen
