'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WordCloud = dynamic(() => import('./components/features/WordCloud').then(mod => mod.default), { ssr: false });

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const wordCloudContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Guard clause
    if (!mainRef.current) return;

    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.scroll-section');
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: mainRef.current,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.4, max: 0.8 },
          delay: 0.1,
          ease: "power2.inOut",
        },
        end: () => "+=" + (mainRef.current?.offsetWidth || 0),
      },
    });

    return () => {
      if (lenisRef.current) {
        // lenis.destroy() will also remove the ticker
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main ref={mainRef} className="h-screen w-full flex flex-nowrap overflow-x-hidden bg-white dark:bg-gray-800">
      {/* --- Section 1: Introduction --- */}
      <section className="scroll-section h-screen w-screen flex-shrink-0 flex items-center justify-center pb-40">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-4">
          {/* 左侧：I Play + WordCloud + For Fun */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mx-auto md:mx-0 mb-10 md:mb-0">
            <span className="text-3xl font-bold text-gray-900 mb-5">I Play</span>
            <div ref={wordCloudContainerRef} className="w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] flex justify-center items-center">
              <WordCloud />
            </div>
            <span className="text-3xl font-bold text-gray-900 mt-5">For Fun</span>
          </div>
          {/* 右侧：个人信息 */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
            <div className="relative w-48 h-48 mb-6 md:mb-8">
              <Image
                src="/images/selfie.jpeg"
                alt="avatar"
                fill
                className="rounded-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white">
              Kaiwei YOU
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mt-5 mr-2 md:mr-0">
              Interactive artist - Musician - Coder
            </p>
            <div className="flex space-x-6 mt-7 mr-2 md:mr-0 justify-center md:justify-end">
              <a href="https://github.com/kaiweiYOU" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://space.bilibili.com/101558906?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 5.5c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v13c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-13zm18 0H4v13h16v-13zM8 10h2v4H8v-4zm6 0h2v4h-2v-4z" />
                  <path d="M5 2l3 3M19 2l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}