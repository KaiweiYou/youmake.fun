'use client'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, TrackballControls } from '@react-three/drei'
import type { ReactNode } from 'react'
import type { Group } from 'three'

// 定义 Word 组件的 props 类型
type WordProps = {
  children: ReactNode;
  color: string;
  position: [number, number, number] | THREE.Vector3;
}

// 一个独立的单词组件，使用 HTML
function Word({ children, color, position }: WordProps) {
  return (
    <Html position={position}>
      <div style={{ 
        color: color, 
        fontSize: '24px', // 使用像素单位更稳定
        fontWeight: 'bold',
        fontFamily: 'Inter, sans-serif', // 指定字体
        whiteSpace: 'nowrap' // 防止文字换行
      }}>
        {children}
      </div>
    </Html>
  )
}

// 整个词云组件
function Cloud({ radius = 20 }) {
  // 定义词语列表 (恢复所有单词)
  const words = useMemo(() => {
    const wordList = [
      'Music','Arduino','Sound Design','Live Coding','MaxMsp',
      'Touchdesigner','AIGC','React','Next.js','Shader','Game',
      'Unity','Unreal','3D Printing','Modeling','Wood Craft',
      'Interactive Art','AR'
    ]
    const temp: { pos: THREE.Vector3; word: string }[] = []
    
    const phi = Math.PI * (3. - Math.sqrt(5.))

    for (let i = 0; i < wordList.length; i++) {
      const y = 1 - (i / (wordList.length - 1)) * 2
      const R = Math.sqrt(1 - y * y)
      const theta = phi * i
      
      const x = Math.cos(theta) * R
      const z = Math.sin(theta) * R
      
      const pos = new THREE.Vector3(x, y, z).multiplyScalar(radius)
      const word = wordList[i]
      temp.push({ pos, word })
    }
    return temp
  }, [radius])

  const colors = useMemo(() => ['#FF6347', '#FFA500', '#FFD700', '#ADFF2F', '#32CD32', '#00BFFF', '#1E90FF', '#8A2BE2', '#DA70D6', '#FF1493'], []);

  return words.map(({ pos, word }, index) => (
    <Word key={index} position={pos} color={colors[index % colors.length]}>
      {word}
    </Word>
  ))
}

function WordCloudWrapper() {
  const groupRef = useRef<Group>(null!)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Cloud radius={22} />
    </group>
  )
}

// 主画布组件，作为默认导出
export default function Scene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={['#202025', 0, 80]} />
      <WordCloudWrapper />
      <TrackballControls noPan={true} zoomSpeed={1.5} rotateSpeed={2.0} noZoom={true} />
    </Canvas>
  )
} 