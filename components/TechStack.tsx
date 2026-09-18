'use client';

import { useState, useEffect } from 'react';

const defaultTechCategories = [
  {
    title: 'Frontend Development',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript ES6+'],
  },
  {
    title: 'Backend & API',
    technologies: ['FastAPI', 'Python', 'Node.js', 'REST API', 'JWT Authentication', 'OAuth2', 'SQLAlchemy'],
  },
  {
    title: 'Data Science & ML',
    technologies: ['PyTorch', 'Machine Learning', 'Deep Learning', 'LSTM-GRU', 'Time Series Analysis', 'NumPy', 'Pandas'],
  },
  {
    title: 'Database & Storage',
    technologies: ['PostgreSQL', 'SQL', 'Database Design', 'Alembic', 'ACID Transactions'],
  },
  {
    title: 'DevOps & Deployment',
    technologies: ['Vercel', 'Render.com', 'Git', 'GitHub', 'CI/CD', 'Docker', 'Linux'],
  },
  {
    title: 'Tools & Practices',
    technologies: ['VS Code', 'Postman', 'Chrome DevTools', 'Agile', 'Clean Code', 'RESTful Design'],
  },
];

export default function TechStack() {
  const [techCategories, setTechCategories] = useState(defaultTechCategories);

  useEffect(() => {
    // Load tech stack from API
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.techStack) {
          setTechCategories(data.techStack);
        }
      })
      .catch(err => console.error('Error loading tech stack:', err));
  }, []);

  return (
    <section id="stack" className="py-20 px-4 bg-gray-50/50 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Tech Stack & Ecosystem
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Technologies I work with
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-white dark:bg-surface-dark border-2 border-pink-200 dark:border-white/10 rounded-2xl p-6 hover:border-purple-400 dark:hover:border-accent-primary hover:-translate-y-2 transition-smooth group scroll-animate-scale"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-accent-primary hover:text-accent-primary hover:scale-105 transition-smooth cursor-pointer"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
