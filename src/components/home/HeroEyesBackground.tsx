"use client";

/**
 * Hero background: semi-transparent robotic AI eyes with soft glow.
 * Blink every 4–6s, subtle pulse, parallax mouse. Navy palette, enterprise-grade.
 */
import { useRef, useEffect, useCallback } from "react";

const EYE_COLOR = 0x6a5acd; // #6A5ACD purple accent
const EYE_GLOW = 0x4f8fc7;  // soft blue highlight
const NAVY_DARK = 0x08141f;  // #08141F
const NAVY = 0x0b1c2d;       // #0B1C2D

export function HeroEyesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const blinkRef = useRef<{ phase: "idle" | "close" | "open"; nextBlink: number; startTime: number }>({
    phase: "idle",
    nextBlink: 0,
    startTime: 0,
  });

  const handleMouse = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = -(e.clientY / window.innerHeight - 0.5) * 2;
    mouseRef.current = { x, y };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    let raf = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let leftEye: import("three").Mesh | null = null;
    let rightEye: import("three").Mesh | null = null;
    let leftPupil: import("three").Mesh | null = null;
    let rightPupil: import("three").Mesh | null = null;
    let cancelled = false;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const cleanup = () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(raf);
      renderer?.dispose();
      if (container && renderer?.domElement?.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };

    let onResize: () => void = () => {};

    void import("three").then((THREE) => {
      if (cancelled) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.set(0, 0, 6);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(NAVY_DARK, 0);
      container.appendChild(renderer.domElement);

      const eyeRadius = 0.22;
      const eyeSpacing = 0.72;
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: EYE_COLOR,
        transparent: true,
        opacity: 0.35,
      });
      const pupilMaterial = new THREE.MeshBasicMaterial({
        color: EYE_GLOW,
        transparent: true,
        opacity: 0.6,
      });

      const eyeGeometry = new THREE.SphereGeometry(eyeRadius, 16, 12);
      const pupilGeometry = new THREE.SphereGeometry(eyeRadius * 0.5, 12, 8);

      leftEye = new THREE.Mesh(eyeGeometry, glowMaterial);
      leftEye.position.set(-eyeSpacing / 2, 0, 0);
      scene.add(leftEye);

      rightEye = new THREE.Mesh(eyeGeometry, glowMaterial.clone());
      rightEye.position.set(eyeSpacing / 2, 0, 0);
      scene.add(rightEye);

      leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
      leftPupil.position.set(-eyeSpacing / 2, 0, eyeRadius * 0.3);
      scene.add(leftPupil);

      rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial.clone());
      rightPupil.position.set(eyeSpacing / 2, 0, eyeRadius * 0.3);
      scene.add(rightPupil);

      blinkRef.current.nextBlink = 4 + Math.random() * 2;

      onResize = () => {
        if (!container || cancelled) return;
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        camera!.aspect = w / h;
        camera!.updateProjectionMatrix();
        renderer!.setSize(w, h);
      };
      onResize();
      window.addEventListener("resize", onResize);
      window.addEventListener("mousemove", handleMouse);

      function animate(time: number) {
        if (cancelled) return;
        raf = requestAnimationFrame(animate);
        const t = time * 0.001;
        const { x: mx, y: my } = mouseRef.current;
        const parallax = isMobile ? 0 : 0.15;
        const rotY = mx * parallax;
        const rotX = my * parallax;

        if (leftEye && rightEye && leftPupil && rightPupil) {
          leftEye.rotation.y = rotY;
          leftEye.rotation.x = rotX;
          rightEye.rotation.y = rotY;
          rightEye.rotation.x = rotX;
          leftPupil.rotation.y = rotY;
          leftPupil.rotation.x = rotX;
          rightPupil.rotation.y = rotY;
          rightPupil.rotation.x = rotX;

          const blink = blinkRef.current;
          const now = t;
          if (blink.phase === "idle" && blink.nextBlink === 0) {
            blink.nextBlink = now + 4 + Math.random() * 2;
          }
          if (blink.phase === "idle" && now >= blink.nextBlink) {
            blink.phase = "close";
            blink.startTime = now;
          }
          const blinkDur = 0.12;
          if (blink.phase === "close") {
            const elapsed = now - blink.startTime;
            const progress = Math.min(1, elapsed / blinkDur);
            const sy = Math.max(0.06, 1 - progress);
            leftEye.scale.y = sy;
            rightEye.scale.y = sy;
            leftPupil.scale.y = sy;
            rightPupil.scale.y = sy;
            if (progress >= 1) {
              blink.phase = "open";
              blink.startTime = now;
            }
          } else if (blink.phase === "open") {
            const elapsed = now - blink.startTime;
            const progress = Math.min(1, elapsed / blinkDur);
            const sy = Math.max(0.06, progress);
            leftEye.scale.y = sy;
            rightEye.scale.y = sy;
            leftPupil.scale.y = sy;
            rightPupil.scale.y = sy;
            if (progress >= 1) {
              blink.phase = "idle";
              blink.nextBlink = now + 4 + Math.random() * 2;
            }
          } else {
            const pulse = 0.9 + 0.1 * Math.sin(t * 1.2);
            const mat = leftEye.material as { opacity: number };
            mat.opacity = 0.32 * pulse;
            (rightEye.material as { opacity: number }).opacity = 0.32 * pulse;
          }
        }

        renderer!.render(scene!, camera!);
      }
      raf = requestAnimationFrame(animate);
    });

    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden
      style={{ background: "transparent" }}
    />
  );
}
