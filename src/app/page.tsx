'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WordCloud = dynamic(() => import('./components/features/WordCloud').then(mod => mod.default), { ssr: false });

import { getFeaturedProjects } from '../data/projects';
import Link from 'next/link';

// 作品集幻灯片组件
const PortfolioSlideshow = () => {
  const items = getFeaturedProjects();
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((current - 1 + items.length) % items.length);
  const next = () => setCurrent((current + 1) % items.length);

  return (
    <div className="w-full flex flex-col items-center my-16">
      <div className="relative w-full max-w-5xl px-4">
        <div className="h-[500px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl relative group">
          {items.map((item, idx) => (
            <div
              key={item.slug}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              {/* Image Container */}
              <div className="relative w-full h-full">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                  <div className={`transform transition-all duration-700 delay-100 ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium uppercase tracking-wider border border-white/10">
                        {item.category.replace('-', ' ')}
                      </span>
                      <span className="text-gray-300 text-sm">{item.date}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h2>
                    <p className="max-w-2xl text-lg text-gray-200 mb-8 line-clamp-2 md:line-clamp-none">
                      {item.description}
                    </p>
                    <Link
                      href={`/${item.category}/${item.slug}`}
                      className="inline-flex items-center px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                      View Project
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Controls - Only show if more than 1 item */}
          {items.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 text-white transition-all z-20"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 text-white transition-all z-20"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
        </div>

        {/* Indicators */}
        {items.length > 1 && (
          <div className="flex justify-center space-x-3 mt-6">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const wordCloudContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Guard clause
    if (!mainRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    gsap.registerPlugin(ScrollTrigger);

    // 为每个section设置snap scrolling with damping effect
    const sections = gsap.utils.toArray('.scroll-section');
    let isSnapping = false;

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section as Element,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          if (!isSnapping) {
            isSnapping = true;
            lenis.scrollTo(section as HTMLElement, {
              offset: 0,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                isSnapping = false;
              }
            });
          }
        },
        onEnterBack: () => {
          if (!isSnapping) {
            isSnapping = true;
            lenis.scrollTo(section as HTMLElement, {
              offset: 0,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                isSnapping = false;
              }
            });
          }
        }
      });
    });

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    // Changed to vertical scrolling with snap effect
    <main ref={mainRef} className="w-full">
      {/* --- Section 1: Introduction --- */}
      <section className="scroll-section min-h-screen w-full flex items-center justify-center pt-20 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-4 py-8">
          {/* 左侧：I Play + WordCloud + For Fun */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mx-auto md:mx-0 mb-10 md:mb-0">
            <span className="text-3xl font-bold text-gray-900 dark:text-white mb-5">I Play</span>
            <div ref={wordCloudContainerRef} className="w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] flex justify-center items-center">
              <WordCloud />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white mt-5">For Fun</span>
          </div>
          {/* 右侧：个人信息 */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
            <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 md:mb-8">
              <Image
                src="/images/profile.jpg"
                alt="avatar"
                fill
                className="rounded-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-gray-900 dark:text-white">
              Kaiwei YOU
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-4 md:mt-5 mr-2 md:mr-0">
              Interactive artist - Musician - Coder
            </p>
            <div className="flex space-x-6 mt-6 md:mt-7 mr-2 md:mr-0 justify-center md:justify-end">
              <a href="https://github.com/kaiweiYOU" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://space.bilibili.com/101558906?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 5.5c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v13c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-13zm18 0H4v13h16v-13zM8 10h2v4H8v-4zm6 0h2v4h-2v-4z" />
                  <path d="M5 2l3 3M19 2l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
            <span className="text-xs mb-1">Scroll down</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* --- Section 2: Portfolio --- */}
      <section className="scroll-section h-screen w-full flex items-center justify-center">
        <PortfolioSlideshow />
      </section>
    </main>
  );
}