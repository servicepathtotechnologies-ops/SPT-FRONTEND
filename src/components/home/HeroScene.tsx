"use client";

import { useRef, useEffect } from "react";

/**
 * Hero 3D background using vanilla Three.js (no @react-three/fiber)
 * to avoid React 19 / R3F compatibility issues.
 * Dark theme: cyan and purple particles.
 */
export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    let raf = 0;
    let renderer: {
      dispose(): void;
      domElement: HTMLCanvasElement;
      setSize(w: number, h: number): void;
      setPixelRatio(n: number): void;
      setClearColor(hex: number, alpha: number): void;
      render(scene: object, camera: object): void;
    } | null = null;
    let geometry: { dispose(): void; setAttribute(name: string, attr: unknown): void } | null = null;
    let material: { dispose(): void } | null = null;
    let cancelled = false;

    const cleanup = () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      renderer?.dispose();
      geometry?.dispose();
      material?.dispose();
      if (container && renderer?.domElement?.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };

    let onResize: () => void = () => {};

    void import("three").then((THREE) => {
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x08141f, 0);
      container.appendChild(renderer.domElement);

      const count = 800;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const navy = { r: 11 / 255, g: 28 / 255, b: 45 / 255 };
      const purple = { r: 106 / 255, g: 90 / 255, b: 205 / 255 };
      const blue = { r: 79 / 255, g: 143 / 255, b: 199 / 255 };
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 24;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        const mix = Math.random();
        const t = Math.random();
        colors[i * 3] = navy.r * (1 - t) + (purple.r * mix + blue.r * (1 - mix)) * t;
        colors[i * 3 + 1] = navy.g * (1 - t) + (purple.g * mix + blue.g * (1 - mix)) * t;
        colors[i * 3 + 2] = navy.b * (1 - t) + (purple.b * mix + blue.b * (1 - mix)) * t;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      material = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
        depthWrite: false,
      });
      const points = new THREE.Points(
        geometry as unknown as import("three").BufferGeometry,
        material as unknown as import("three").PointsMaterial
      );
      scene.add(points);

      onResize = () => {
        if (!container || cancelled) return;
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer!.setSize(width, height);
      };
      onResize();
      window.addEventListener("resize", onResize);

      function animate() {
        if (cancelled) return;
        raf = requestAnimationFrame(animate);
        points.rotation.y += 0.0006;
        renderer!.render(scene, camera);
      }
      animate();
    });

    return cleanup;
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden />;
}
