'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Color } from 'three';

const TopographicMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color('#000000') }, // Default black, will be localized
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Slow moving noise
      float noiseVal = snoise(vUv * 4.0 + vec2(uTime * 0.05, uTime * 0.02));
      
      // Create lines by taking sin of noise
      float lines = sin(noiseVal * 30.0);
      
      // Sharpness
      float alpha = smoothstep(0.95, 1.0, lines);
      
      // Fade out edges
      // float dist = distance(vUv, vec2(0.5));
      // alpha *= smoothstep(0.8, 0.2, dist);

      if (alpha < 0.01) discard;

      gl_FragColor = vec4(uColor, alpha * 0.1);
    }
  `
};

const TopoPlane = () => {
    const mesh = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new Color('#000000') },
    }), []);

    useFrame((state) => {
        if (mesh.current) {
            // mesh.current.rotation.z += 0.001;
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[20, 20]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={TopographicMaterial.vertexShader}
                fragmentShader={TopographicMaterial.fragmentShader}
                transparent={true}
            />
        </mesh>
    );
};

export const HeroBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full opacity-50 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <TopoPlane />
            </Canvas>
        </div>
    );
};
