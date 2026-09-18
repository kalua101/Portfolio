'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Github, Monitor, Globe, Shield, Layers, FileText, DollarSign, Wheat, Lock, Database } from 'lucide-react';

// Icon mapping
const iconMap: Record<string, any> = {
  Wheat, Monitor, Globe, Layers, FileText, Shield, DollarSign
};

const defaultProjects = [
  {
    id: 1,
    category: 'fullstack',
    title: 'AddisFarmers.org',
    description: 'Full-stack agricultural marketplace connecting Ethiopian farmers directly with urban buyers. Features real-time product management, multi-role authentication, order tracking, and admin dashboard with analytics.',
    technologies: ['Next.js 16', 'FastAPI', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'JWT Auth'],
    metrics: ['🌾 Direct Farmer Market', '🔐 Role-Based Access', '📊 Real-time Analytics'],
    gradient: 'from-emerald-500 via-lime-500 to-yellow-500',
    icon: Wheat,
    liveUrl: 'https://next-js-1st-virid.vercel.app/',
    adminUrl: 'https://next-js-1st-d9yag58bnd-kaleasbtiles-projects.vercel.app',
    apiUrl: 'https://next-js-1st-1.onrender.com',
    githubUrl: '#',
    featured: true,
    details: {
      backend: 'FastAPI + Python',
      frontend: 'Next.js 16.3.3 + React 19',
      database: 'PostgreSQL + SQLAlchemy',
      deployment: 'Vercel + Render.com',
      features: [
        'Direct marketplace eliminating middlemen',
        'Multi-role auth (User/Farmer/Admin/Super Admin)',
        'Real-time order lifecycle tracking',
        'Admin dashboard with live statistics',
        'Image upload & management system',
        'Responsive mobile-first design',
        'JWT-based secure authentication',
        'CORS-enabled REST API'
      ]
    }
  },
  {
    id: 2,
    category: 'fullstack',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
    metrics: ['⚡ 50% faster load time', '🚀 10k Active Users'],
    gradient: 'from-purple-500 to-purple-700',
    icon: Monitor,
  },
  {
    id: 3,
    category: 'backend',
    title: 'RESTful API Gateway',
    description: 'High-performance API gateway with rate limiting, caching, authentication, and comprehensive logging for microservices architecture.',
    technologies: ['NestJS', 'Redis', 'PostgreSQL', 'Docker'],
    metrics: ['⚡ 1000 req/sec', '📊 99.9% Uptime'],
    gradient: 'from-pink-500 to-rose-600',
    icon: Globe,
  },
  {
    id: 4,
    category: 'frontend',
    title: 'Design System Library',
    description: 'Comprehensive design system with 50+ reusable components, dark mode support, and accessibility-first approach using Tailwind and shadcn/ui.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
    metrics: ['🎨 50+ Components', '♿ WCAG AA'],
    gradient: 'from-cyan-500 to-blue-600',
    icon: Layers,
  },
  {
    id: 5,
    category: 'fullstack',
    title: 'Task Management SaaS',
    description: 'Collaborative task management platform with real-time updates, team workspaces, and advanced project tracking features.',
    technologies: ['Next.js', 'Drizzle ORM', 'MongoDB', 'WebSocket'],
    metrics: ['👥 5k Users', '⚡ Real-time Sync'],
    gradient: 'from-green-500 to-emerald-600',
    icon: FileText,
  },
  {
    id: 6,
    category: 'backend',
    title: 'Authentication Service',
    description: 'Secure authentication microservice with JWT, OAuth2, MFA support, and session management for enterprise applications.',
    technologies: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    metrics: ['🔒 Enterprise Security', '⚡ <1ms Response'],
    gradient: 'from-orange-500 to-red-600',
    icon: Shield,
  },
  {
    id: 7,
    category: 'frontend',
    title: 'Financial Dashboard',
    description: 'Interactive financial analytics dashboard with real-time charts, data visualization, and customizable widgets for portfolio tracking.',
    technologies: ['React', 'Chart.js', 'Tailwind', 'Zustand'],
    metrics: ['📊 Live Data', '⚡ 60fps Animations'],
    gradient: 'from-indigo-500 to-purple-700',
    icon: DollarSign,
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'backend', label: 'Backend / API' },
  { id: 'frontend', label: 'UI / Frontend' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    // Load projects from API
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.projects) {
          // Map icon names to actual icons
          const projectsWithIcons = data.projects.map((proj: any) => ({
            ...proj,
            icon: iconMap[proj.iconName] || Monitor
          }));
          setProjects(projectsWithIcons);
        }
      })
      .catch(err => console.error('Error loading projects:', err));
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A selection of my recent work
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-smooth ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg'
                  : 'bg-white dark:bg-surface-dark/80 border-2 border-rose-200 dark:border-white/10 hover:border-fuchsia-400 dark:hover:border-accent-primary'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="bg-white dark:bg-surface-dark border-2 border-rose-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-fuchsia-400 dark:hover:border-accent-primary hover:-translate-y-2 transition-smooth group scroll-animate"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Project Image Placeholder */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                  <Icon className="w-16 h-16 text-white/80 group-hover:scale-110 transition-smooth" />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  {/* Category & Title */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs font-semibold rounded-md mb-3">
                      {filters.find(f => f.id === project.category)?.label}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {project.metrics.map((metric) => (
                      <span key={metric}>{metric}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.liveUrl || '#'}
                      target={project.liveUrl ? '_blank' : undefined}
                      rel={project.liveUrl ? 'noopener noreferrer' : undefined}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 card-surface rounded-lg text-sm font-semibold hover:border-accent-primary hover:text-accent-primary transition-smooth"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {project.liveUrl ? 'Live Demo' : 'Demo'}
                    </a>
                    <a
                      href={project.githubUrl || '#'}
                      target={project.githubUrl && project.githubUrl !== '#' ? '_blank' : undefined}
                      rel={project.githubUrl && project.githubUrl !== '#' ? 'noopener noreferrer' : undefined}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 card-surface rounded-lg text-sm font-semibold hover:border-accent-primary hover:text-accent-primary transition-smooth"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
