export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 py-8 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} DevPortfolio. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Designed & built with passion using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
