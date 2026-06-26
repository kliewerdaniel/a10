'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from './SafeCanvas';
import * as THREE from 'three';

const COLORS = {
  green: new THREE.Color('#1F8A4C'),
  pink: new THREE.Color('#F06CA8'),
  orange: new THREE.Color('#E85A1F'),
  yellow: new THREE.Color('#F5C518'),
  cream: new THREE.Color('#EFE9D9'),
};

function PointillistField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 400;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const colorArray = new Float32Array(count * 3);
    const colorChoices = [COLORS.green, COLORS.pink, COLORS.orange, COLORS.yellow, COLORS.cream, COLORS.cream];

    const items = Array.from({ length: count }, (_, i) => {
      const color = colorChoices[i % colorChoices.length];
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;

      return {
        x: (Math.random() - 0.5) * 28,
        y: (Math.random() - 0.5) * 18,
        z: (Math.random() - 0.5) * 12 - 4,
        speed: Math.random() * 0.15 + 0.02,
        offset: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.06 + 0.02,
      };
    });

    return { items, colorArray };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.items.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * p.speed + p.offset) * 1.2,
        p.y + Math.cos(time * p.speed * 0.7 + p.offset) * 0.8,
        p.z
      );
      const s = p.scale + Math.sin(time * 0.3 + p.offset) * 0.01;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.7} vertexColors />
      <instancedBufferAttribute attach="instanceColor" args={[particles.colorArray, 3]} />
    </instancedMesh>
  );
}

const heroFallback = (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 dot-pattern opacity-30" />
    <div className="absolute inset-0 glaze-all" />
  </div>
);

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <SafeCanvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        fallback={heroFallback}
      >
        <PointillistField />
      </SafeCanvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
    </div>
  );
}
