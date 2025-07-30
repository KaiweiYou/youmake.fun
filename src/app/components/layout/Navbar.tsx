'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isHomePage = window.location.pathname === '/';

      if (isHomePage) {
        // 在主页，根据滚动方向控制显示/隐藏
        if (currentScrollY < 50) {
          // 接近顶部时始终显示
          setVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // 向下滚动且超过100px时隐藏
          setVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // 向上滚动时显示
          setVisible(true);
        }
      } else {
        // 在其他页面，保持原有的滚动隐藏逻辑
        if (currentScrollY > 20) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // 初始检查
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-md w-full py-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              onClick={() => {
                localStorage.setItem('start-audio', '1');
                window.dispatchEvent(new Event('start-audio'));
              }}
            >
              <Image src="/icon4.png" alt="logo" width={40} height={40} className="mr-2" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">YouMakeFun</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <Link href="/interactive-art" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md font-medium">
                Interactive Art
              </Link>
            </div>
            <div className="relative group">
              <Link href="/music" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md font-medium">
                Music
              </Link>
            </div>
            <div className="relative group">
              <Link href="/code-creations" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md font-medium">
                Code Creations
              </Link>
            </div>
            <div className="relative group">
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md font-medium">
                Blog
              </Link>
            </div>
            <div className="relative group">
              <Link href="/about-contact" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md font-medium">
                About & Contact
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              {/* Hamburger menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/interactive-art" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md font-medium">
            Interactive Art
          </Link>
          <Link href="/music" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md font-medium">
            Music
          </Link>
          <Link href="/code-creations" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md font-medium">
            Code Creations
          </Link>
          <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md font-medium">
            Blog
          </Link>
          <Link href="/about-contact" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white block px-3 py-2 rounded-md font-medium">
            About & Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 