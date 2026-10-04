"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 1. Futuristic Wireframe Sphere (Icosahedron)
    const sphereGeo = new THREE.IcosahedronGeometry(2.8, 4);
    const wireframeGeo = new THREE.WireframeGeometry(sphereGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const wireframeSphere = new THREE.LineSegments(wireframeGeo, wireframeMat);
    scene.add(wireframeSphere);

    // 2. Inner Glowing Core Polyhedron
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x991b1b,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 3. Ambient Interactive Particle Field
    const particleCount = 280;
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = (Math.random() - 0.5) * 16;
      posArray[i + 2] = (Math.random() - 0.5) * 12;
      scaleArray[i / 3] = Math.random() * 2 + 0.5;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xff4b4b,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Mouse Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Scroll Tracking for depth
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      // Rotate Wireframe Sphere
      wireframeSphere.rotation.x = elapsed * 0.08 + currentY * 0.25;
      wireframeSphere.rotation.y = elapsed * 0.12 + currentX * 0.35;

      coreMesh.rotation.x = -elapsed * 0.06;
      coreMesh.rotation.y = -elapsed * 0.09;

      // Scroll reactive scale and position
      const scrollFactor = Math.min(scrollY / 1200, 1);
      wireframeSphere.position.y = -scrollFactor * 1.5;
      wireframeSphere.position.z = -scrollFactor * 2;
      wireframeSphere.scale.setScalar(1 + scrollFactor * 0.35);

      // Particles subtle wave
      particlesMesh.rotation.y = elapsed * 0.02 + currentX * 0.15;
      particlesMesh.rotation.x = elapsed * 0.015 - currentY * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      wireframeGeo.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
}
