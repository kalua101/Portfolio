'use client';

import { useState, FormEvent } from 'react';
import { Github, Linkedin, Mail, Send, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Using Web3Forms (free service)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // You'll need to get this from web3forms.com
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to: 'kaleabt06@gmail.com',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        alert("✅ Thank you! Your message has been sent successfully.");
      } else {
        setSubmitStatus('error');
        alert("❌ Something went wrong. Please try emailing me directly at kaleabt06@gmail.com");
      }
    } catch (error) {
      setSubmitStatus('error');
      alert("❌ Failed to send message. Please email me directly at kaleabt06@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/kalua101', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kaleabtemesgen-0a62343a5', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:kaleabt06@gmail.com', label: 'Email' },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Let's work together
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-dark border-2 border-pink-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 dark:focus:ring-accent-primary dark:focus:border-accent-primary transition-smooth outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-dark border-2 border-pink-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 dark:focus:ring-accent-primary dark:focus:border-accent-primary transition-smooth outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-dark border-2 border-pink-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 dark:focus:ring-accent-primary dark:focus:border-accent-primary transition-smooth outline-none"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 card-surface rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-smooth outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-surface-dark border-2 border-purple-200 dark:border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 text-accent-primary" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Phone className="w-5 h-5 text-accent-primary" />
                  <span>+251 972 108 293</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="w-5 h-5 text-accent-primary" />
                  <a href="mailto:kaleabt06@gmail.com" className="hover:text-accent-primary transition-colors">
                    kaleabt06@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mb-8">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 flex items-center justify-center bg-white dark:bg-surface-dark/80 border-2 border-blue-200 dark:border-white/10 rounded-xl hover:border-cyan-400 dark:hover:border-accent-primary hover:-translate-y-1 transition-smooth group"
                    >
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-accent-primary transition-colors" />
                    </a>
                  );
                })}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse-dot"></span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Available for internships & projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
