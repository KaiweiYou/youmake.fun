'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WordCloud = dynamic(() => import('./components/features/WordCloud').then(mod => mod.default), { ssr: false });

// 作品集幻灯片组件
const PortfolioSlideshow = () => {
  // 支持图片和视频的作品集 - 使用现有图片作为占位符
  const items = [
    { type: 'image', src: '/images/selfie.jpeg' },
    { type: 'image', src: '/images/selfie2.jpeg' },
    { type: 'image', src: '/images/selfie3.jpeg' },
  ];
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((current - 1 + items.length) % items.length);
  const next = () => setCurrent((current + 1) % items.length);

  return (
    <div className="w-full flex flex-col items-center my-16">
      <div className="relative w-full max-w-5xl">
        <div className="h-[500px] flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* 幻灯片内容 */}
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                idx === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={`作品${idx+1}`}
                  fill
                  className="object-contain"
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority={idx === 0} // 优先加载第一张图
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  className="object-contain w-full h-full"
                  style={{ maxHeight: '100%', maxWidth: '100%', background: 'black' }}
                />
              )}
            </div>
          ))}
        </div>
        {/* 左右切换按钮，放在图片区域外面 */}
        <button
          onClick={prev}
          className="hidden md:flex items-center justify-center absolute left-0 -translate-x-20 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 opacity-50 hover:opacity-100 hover:scale-125 transition-all duration-300 z-20 shadow-lg"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          <svg className="w-10 h-10 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={next}
          className="hidden md:flex items-center justify-center absolute right-0 translate-x-20 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 opacity-50 hover:opacity-100 hover:scale-125 transition-all duration-300 z-20 shadow-lg"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          <svg className="w-10 h-10 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
        {/* 移动端按钮，依然在图片内侧 */}
        <button
          onClick={prev}
          className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 opacity-50 hover:opacity-100 hover:scale-125 transition-all duration-300 z-20 shadow-lg"
        >
          <svg className="w-8 h-8 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={next}
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-3 opacity-50 hover:opacity-100 hover:scale-125 transition-all duration-300 z-20 shadow-lg"
        >
          <svg className="w-8 h-8 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
          {items.map((_, idx) => (
            <span key={idx} className={`inline-block w-4 h-4 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-600'} transition-all duration-300`}></span>
          ))}
        </div>
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
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section as Element,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          if (!isSnapping) {
            isSnapping = true;
            lenis.scrollTo(section as Element, {
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
            lenis.scrollTo(section as Element, {
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
                src="/images/selfie3.jpeg"
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