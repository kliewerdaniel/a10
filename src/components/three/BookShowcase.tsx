'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { SafeCanvas } from './SafeCanvas';
import * as THREE from 'three';

function BookModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2 + 0.35;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.03 - 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={meshRef} position={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0.85]}>
          <boxGeometry args={[2.6, 3.6, 0.08]} />
          <meshStandardMaterial color="#0F0F0F" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.85]}>
          <boxGeometry args={[2.6, 3.6, 0.08]} />
          <meshStandardMaterial color="#0F0F0F" roughness={0.3} />
        </mesh>
        <mesh position={[-1.3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.7, 3.6, 0.08]} />
          <meshStandardMaterial color="#0F0F0F" roughness={0.3} />
        </mesh>
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[2.35, 3.4, 1.55]} />
          <meshStandardMaterial color="#EFE9D9" roughness={0.95} />
        </mesh>

        <mesh position={[-0.5, 1.0, 0.91]}>
          <circleGeometry args={[0.15, 16]} />
          <meshBasicMaterial color="#1F8A4C" transparent opacity={0.9} />
        </mesh>
        <mesh position={[-0.3, 1.15, 0.91]}>
          <circleGeometry args={[0.08, 12]} />
          <meshBasicMaterial color="#1F8A4C" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.5, 1.0, 0.91]}>
          <circleGeometry args={[0.15, 16]} />
          <meshBasicMaterial color="#F06CA8" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0.3, 0.85, 0.91]}>
          <circleGeometry args={[0.08, 12]} />
          <meshBasicMaterial color="#F06CA8" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0.5, 0.91]}>
          <circleGeometry args={[0.12, 16]} />
          <meshBasicMaterial color="#E85A1F" transparent opacity={0.8} />
        </mesh>

        <mesh position={[0, -0.1, 0.91]}>
          <planeGeometry args={[1.8, 0.06]} />
          <meshBasicMaterial color="#EFE9D9" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, -1.2, 0.91]}>
          <planeGeometry args={[1.0, 0.15]} />
          <meshBasicMaterial color="#1F8A4C" transparent opacity={0.85} />
        </mesh>

        <mesh position={[0, 0, 0]} scale={[3.5, 4.5, 2.8]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#1F8A4C" transparent opacity={0.015} />
        </mesh>
      </group>
    </Float>
  );
}

const bookFallback = (
  <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
    <div className="w-48 h-64 bg-surface border-4 border-ink flex items-center justify-center shadow-brutalist-xl">
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 25 }).map((_, i) => {
          const colors = ['bg-green', 'bg-pink', 'bg-orange', 'bg-yellow'];
          return <div key={i} className={`w-2 h-2 rounded-full ${colors[i % colors.length]} ${i % 3 === 0 ? 'opacity-80' : 'opacity-40'}`} />;
        })}
      </div>
    </div>
  </div>
);

export function BookShowcase() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <SafeCanvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        fallback={bookFallback}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-3, 2, 4]} intensity={0.4} color="#1F8A4C" distance={15} />
        <pointLight position={[3, -1, 3]} intensity={0.2} color="#F06CA8" distance={12} />
        <BookModel />
      </SafeCanvas>
    </div>
  );
}
