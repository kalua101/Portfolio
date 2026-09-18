const experiences = [
  {
    period: 'June 2026 - Present',
    title: 'Engineer Intern',
    company: 'Space Science and Geospatial Institute (SSGI)',
    location: 'Addis Ababa, Ethiopia',
    description: 'Working on end-to-end deep learning project forecasting geomagnetic activity—specifically the Dst index (Disturbance Storm Time)—by processing NASA OMNI solar wind datasets (1999–2004) through a 24-hour sliding sequence window. Built with PyTorch, the pipeline features a Hybrid LSTM-GRU architecture for time-series prediction.',
    technologies: ['PyTorch', 'Python', 'LSTM-GRU', 'Deep Learning', 'Time Series', 'NASA OMNI'],
  },
  {
    period: '2024 - 2026',
    title: 'Full-Stack Developer',
    company: 'AddisFarmers.org',
    location: 'Addis Ababa, Ethiopia',
    description: 'Built a full-stack agricultural marketplace platform connecting Ethiopian farmers directly with urban buyers. Developed complete end-to-end solution including multi-role authentication (User/Farmer/Admin/Super Admin), real-time product management, order tracking system, admin dashboard with analytics, and image upload functionality. Deployed on Vercel and Render with production-ready infrastructure.',
    technologies: ['Next.js 16', 'React 19', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'TypeScript', 'Tailwind CSS'],
  },
  {
    period: 'October 2024 - July 2027',
    title: 'Computer Science Student',
    company: 'Hope Enterprise University College',
    location: 'Addis Ababa, Ethiopia',
    description: 'Pursuing Bachelor\'s Degree in Computer Science with focus on software engineering, data science, and machine learning. Building strong foundation in algorithms, data structures, web development, and artificial intelligence.',
    technologies: ['Data Science', 'Machine Learning', 'Software Engineering', 'Programming Fundamentals'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-gray-50/50 dark:bg-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Experience & Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            My professional journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-20 scroll-animate-left" style={{ transitionDelay: `${index * 80}ms` }}>
                {/* Timeline Dot */}
                <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary border-4 border-white dark:border-background-dark"></div>

                {/* Content Card */}
                <div className="bg-white dark:bg-surface-dark border-2 border-blue-200 dark:border-white/10 rounded-2xl p-6 hover:border-cyan-400 dark:hover:border-accent-primary hover:translate-x-2 transition-smooth">
                  <div className="text-sm font-semibold text-accent-primary mb-2">
                    {exp.period}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {exp.title}
                  </h3>
                  <div className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                    {exp.company}
                  </div>
                  {exp.location && (
                    <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                      📍 {exp.location}
                    </div>
                  )}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
