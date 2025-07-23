'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const AudioVisualizerBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // 页面加载时检测localStorage
    if (typeof window !== 'undefined' && localStorage.getItem('start-audio') === '1') {
      setStarted(true);
    }
    const handleStart = () => setStarted(true);
    window.addEventListener('start-audio', handleStart);
    return () => window.removeEventListener('start-audio', handleStart);
  }, []);

  useEffect(() => {
    if (!started) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    let audio: THREE.Audio;
    let analyser: THREE.AudioAnalyser;
    let uniforms: { tAudioData: { value: THREE.DataTexture } };
    let scene: THREE.Scene;
    let camera: THREE.OrthographicCamera;

    const fftSize = 128;
    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const listener = new THREE.AudioListener();
      audio = new THREE.Audio(listener);

      const file = 'public/music/final project.wav';
      const mediaElement = new Audio(file);
      mediaElement.loop = true;
      mediaElement.autoplay = true;
      mediaElement.crossOrigin = 'anonymous';
      mediaElement.play().catch(() => {
        console.warn('Autoplay blocked — click or tap to start audio.');
      });

      audio.setMediaElementSource(mediaElement);

      analyser = new THREE.AudioAnalyser(audio, fftSize);

      uniforms = {
        tAudioData: { value: new THREE.DataTexture(analyser.data, fftSize / 2, 1, THREE.RedFormat) }
      };

      const vertexShader = `
        attribute vec3 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        precision mediump float;
        uniform sampler2D tAudioData;
        varying vec2 vUv;

        void main() {
          vec3 bg = vec3(0.05,0.05,0.05);
          vec3 color = vec3(0.6,0.9,1.0);
          float f = texture2D(tAudioData, vec2(vUv.x,0.0)).r;
          float i = step(vUv.y, f) * step(f - 0.01, vUv.y);
          gl_FragColor = vec4(mix(bg, color, i), 0.5);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2,2), material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      window.addEventListener('resize', onResize);
      renderer.setAnimationLoop(renderLoop);
    };

    const onResize = () => {
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const renderLoop = () => {
      if (analyser && uniforms.tAudioData.value) {
        analyser.getFrequencyData();
        uniforms.tAudioData.value.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };

    init();

    return () => {
      window.removeEventListener('resize', onResize);
      renderer?.dispose();
    };
  }, [started]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    />
  );
};

export default AudioVisualizerBackground;
