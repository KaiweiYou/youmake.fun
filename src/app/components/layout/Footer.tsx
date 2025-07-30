'use client';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isHomePage = window.location.pathname === '/';
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = currentScrollY + windowHeight >= documentHeight - 100;

      if (isHomePage) {
        // 在主页，根据滚动位置和方向控制显示/隐藏
        if (currentScrollY < 50) {
          // 接近顶部时隐藏
          setVisible(false);
        } else if (isNearBottom) {
          // 接近底部时显示
          setVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // 向下滚动且超过100px时隐藏
          setVisible(false);
        } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
          // 向上滚动且不在顶部时显示
          setVisible(true);
        }
      } else {
        // 在其他页面，保持原有逻辑
        if (currentScrollY > 100) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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