import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    // Use passive event listeners and requestAnimationFrame for smooth performance
    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame for smooth rendering
            requestAnimationFrame(() => {
              entry.target.classList.add('visible');
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
