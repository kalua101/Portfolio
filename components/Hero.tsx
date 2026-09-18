'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Picture */}
        <div className="mb-8 animate-fade-in">
          <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-6">
            {/* Multiple glow layers for stronger effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur-xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 dark:border-gray-800/50 shadow-2xl">
              <Image
                src="/profile.jpg"
                alt="Kaleab Temesgen"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/profile.svg';
                }}
              />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-surface-dark border-2 border-pink-200 dark:border-white/10 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-dot"></span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Available for new opportunities
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight">
          Hi, I'm <span className="gradient-text">Kaleab Temesgen</span>
          <br />
          Full-Stack Engineer & Data Science Enthusiast
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Engineer Intern at Space Science and Geospatial Institute (SSGI), building production-ready applications 
          and deep learning models. Passionate about creating scalable solutions that bridge software engineering 
          and data science.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text">SSGI</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Engineer Intern</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text">10+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text">2027</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">CS Graduate</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-smooth"
          >
            <span>View Projects</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-surface-dark border-2 border-purple-200 dark:border-white/10 rounded-xl font-semibold hover:border-fuchsia-400 dark:hover:border-accent-primary hover:-translate-y-1 transition-smooth"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
