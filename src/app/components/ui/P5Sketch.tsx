'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface P5SketchProps {
  width?: number;
  height?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: p5.Color;
  angle: number;
}

const P5Sketch = ({ width = 400, height = 400 }: P5SketchProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      const particleCount = 50;
      let colors: p5.Color[] = [];

      p.setup = () => {
        p.createCanvas(width, height);
        p.background(255);
        
        // 在 setup 中初始化颜色
        colors = [
          p.color(180, 0, 0),    // 红色
          p.color(0, 0, 100),    // 蓝色
          p.color(100, 100, 0),  // 黄色
          p.color(0, 0, 0),      // 黑色
        ];
        
        // 初始化粒子
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: p.random(width),
            y: p.random(height),
            size: p.random(10, 30),
            speedX: p.random(-1, 1),
            speedY: p.random(-1, 1),
            color: p.random(colors),
            angle: p.random(p.TWO_PI)
          });
        }
      };

      p.draw = () => {
        p.background(255, 10); // 半透明背景，创造拖尾效果

        // 更新和绘制粒子
        particles.forEach(particle => {
          // 更新位置
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          particle.angle += 0.02;

          // 边界检查
          if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

          // 绘制粒子
          p.push();
          p.translate(particle.x, particle.y);
          p.rotate(particle.angle);
          
          // 包豪斯风格的几何形状
          p.fill(particle.color);
          p.noStroke();
          
          // 随机选择形状
          const shapeType = Math.floor(p.random(3));
          switch(shapeType) {
            case 0: // 圆形
              p.circle(0, 0, particle.size);
              break;
            case 1: // 方形
              p.rectMode(p.CENTER);
              p.rect(0, 0, particle.size, particle.size);
              break;
            case 2: // 三角形
              p.triangle(
                -particle.size/2, particle.size/2,
                particle.size/2, particle.size/2,
                0, -particle.size/2
              );
              break;
          }
          
          p.pop();

          // 绘制连接线
          particles.forEach(otherParticle => {
            const d = p.dist(particle.x, particle.y, otherParticle.x, otherParticle.y);
            if (d < 100) {
              p.stroke(0, 0, 0, 50);
              p.line(particle.x, particle.y, otherParticle.x, otherParticle.y);
            }
          });
        });
      };
    };

    const p5Instance = new p5(sketch, containerRef.current);

    return () => {
      p5Instance.remove();
    };
  }, [width, height]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full fixed top-0 left-0 -z-10"
    />
  );
};

export default P5Sketch; 