'use client';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      className={`bg-white dark:bg-gray-800 shadow-inner py-2 w-full transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} youmake.fun | Kaiwei YOU | All rights reserved |  
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 hover:text-gray-700 dark:hover:text-gray-300"
            >
              苏ICP备2025181249号-1
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 