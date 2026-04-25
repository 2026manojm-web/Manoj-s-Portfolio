import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010118); // Deep space color
    scene.fog = new THREE.FogExp2(0x010118, 0.0005);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 18);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // Enable shadows for realism
    renderer.setClearColor(0x010118, 1);
    mount.appendChild(renderer.domElement);
    
    // ========== DENSE STARFIELD (Visible stars) ==========
    const starCount = 8000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      // Spread stars across huge area
      starPositions[i * 3] = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 150 - 50;
      
      // Star colors (mostly white with some red/blue giants)
      const colorRand = Math.random();
      if (colorRand < 0.7) {
        starColors[i * 3] = 1;
        starColors[i * 3 + 1] = 1;
        starColors[i * 3 + 2] = 1;
      } else if (colorRand < 0.85) {
        // Blue giant
        starColors[i * 3] = 0.6;
        starColors[i * 3 + 1] = 0.7;
        starColors[i * 3 + 2] = 1;
      } else {
        // Red giant
        starColors[i * 3] = 1;
        starColors[i * 3 + 1] = 0.5;
        starColors[i * 3 + 2] = 0.5;
      }
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // ========== TWINKLING FOREGROUND STARS ==========
    const nearStarCount = 1500;
    const nearStarGeometry = new THREE.BufferGeometry();
    const nearStarPositions = new Float32Array(nearStarCount * 3);
    
    for (let i = 0; i < nearStarCount; i++) {
      nearStarPositions[i * 3] = (Math.random() - 0.5) * 120;
      nearStarPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      nearStarPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    
    nearStarGeometry.setAttribute('position', new THREE.BufferAttribute(nearStarPositions, 3));
    const nearStarMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const nearStars = new THREE.Points(nearStarGeometry, nearStarMaterial);
    scene.add(nearStars);
    
    // ========== CREATE REALISTIC PLANET TEXTURES ==========
    const createPlanetTexture = (baseColor, hasAtmosphere = false) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      
      // Base color
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add noise for realistic surface
      for (let i = 0; i < 15000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 3;
        const brightness = Math.random() * 60 + 20;
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, 0.5)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Add larger spots for gas giants
      if (baseColor.includes('200')) {
        for (let i = 0; i < 500; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = Math.random() * 15 + 5;
          ctx.fillStyle = `rgba(180, 150, 120, 0.3)`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 1);
      return texture;
    };
    
    // ========== CENTER SUN (Realistic) ==========
    const sunGeometry = new THREE.SphereGeometry(1.5, 128, 128);
    const sunMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaa66,
      emissive: 0xff4422,
      emissiveIntensity: 0.6,
      metalness: 0.95,
      roughness: 0.2,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // Sun glow (visible halo)
    const sunGlowGeometry = new THREE.SphereGeometry(1.65, 32, 32);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8844,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    scene.add(sunGlow);
    
    // Sun corona particles
    const coronaCount = 800;
    const coronaGeometry = new THREE.BufferGeometry();
    const coronaPositions = new Float32Array(coronaCount * 3);
    for (let i = 0; i < coronaCount; i++) {
      const radius = 1.7 + Math.random() * 0.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      coronaPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      coronaPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      coronaPositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    coronaGeometry.setAttribute('position', new THREE.BufferAttribute(coronaPositions, 3));
    const coronaMaterial = new THREE.PointsMaterial({
      color: 0xffaa66,
      size: 0.03,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const corona = new THREE.Points(coronaGeometry, coronaMaterial);
    scene.add(corona);
    
    // ========== PLANETS WITH REALISTIC PROPERTIES ==========
    const planetsData = [
      { name: 'Mercury', size: 0.12, distance: 2.4, color: 0xaa8866, speed: 0.025, roughness: 0.7, metalness: 0.3 },
      { name: 'Venus', size: 0.15, distance: 3.1, color: 0xccaa88, speed: 0.018, roughness: 0.6, metalness: 0.2 },
      { name: 'Earth', size: 0.16, distance: 3.8, color: 0x4488ff, speed: 0.015, roughness: 0.5, metalness: 0.1 },
      { name: 'Mars', size: 0.14, distance: 4.5, color: 0xcc6644, speed: 0.012, roughness: 0.6, metalness: 0.2 },
      { name: 'Jupiter', size: 0.32, distance: 5.5, color: 0xddaa88, speed: 0.008, roughness: 0.8, metalness: 0.1 },
      { name: 'Saturn', size: 0.28, distance: 6.5, color: 0xddbb99, speed: 0.007, roughness: 0.7, metalness: 0.15 },
      { name: 'Uranus', size: 0.22, distance: 7.5, color: 0xaaddff, speed: 0.006, roughness: 0.5, metalness: 0.2 },
      { name: 'Neptune', size: 0.22, distance: 8.5, color: 0x4488ff, speed: 0.005, roughness: 0.5, metalness: 0.2 }
    ];
    
    const planets = [];
    
    planetsData.forEach((data, index) => {
      const geometry = new THREE.SphereGeometry(data.size, 96, 96);
      const material = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: data.roughness,
        metalness: data.metalness,
        emissive: 0x000000,
      });
      const planet = new THREE.Mesh(geometry, material);
      scene.add(planet);
      
      planets.push({
        mesh: planet,
        distance: data.distance,
        speed: data.speed,
        angle: (index / planetsData.length) * Math.PI * 2,
        size: data.size,
        name: data.name
      });
      
      // Add orbit line
      const orbitPoints = [];
      for (let i = 0; i <= 200; i++) {
        const angle = (i / 200) * Math.PI * 2;
        const x = Math.cos(angle) * data.distance;
        const z = Math.sin(angle) * data.distance;
        orbitPoints.push(new THREE.Vector3(x, 0, z));
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x4488aa, transparent: true, opacity: 0.2 });
      const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
      scene.add(orbit);
    });
    
    // ========== SATURN RINGS ==========
    const ringGeometry = new THREE.TorusGeometry(0.42, 0.08, 64, 200);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xccaa88,
      emissive: 0x442200,
      metalness: 0.4,
      roughness: 0.6,
      transparent: true,
      opacity: 0.8
    });
    const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(saturnRing);
    
    // ========== ASTEROID BELT ==========
    const asteroidCount = 3000;
    const asteroidGeometry = new THREE.BufferGeometry();
    const asteroidPositions = new Float32Array(asteroidCount * 3);
    
    for (let i = 0; i < asteroidCount; i++) {
      const radius = 4.9 + Math.random() * 0.7;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 0.4;
      asteroidPositions[i * 3] = Math.cos(angle) * radius;
      asteroidPositions[i * 3 + 1] = yOffset;
      asteroidPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    asteroidGeometry.setAttribute('position', new THREE.BufferAttribute(asteroidPositions, 3));
    const asteroidMaterial = new THREE.PointsMaterial({
      color: 0xaa8866,
      size: 0.04,
      transparent: true
    });
    const asteroidBelt = new THREE.Points(asteroidGeometry, asteroidMaterial);
    scene.add(asteroidBelt);
    
    // ========== LIGHTING FOR REALISM ==========
    // Sun light (main light source)
    const sunLight = new THREE.PointLight(0xffaa66, 1.8, 40);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    scene.add(sunLight);
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x111122);
    scene.add(ambientLight);
    
    // Fill light from stars
    const fillLight = new THREE.PointLight(0x4488ff, 0.2);
    fillLight.position.set(10, 10, 10);
    scene.add(fillLight);
    
    // Back rim light
    const rimLight = new THREE.PointLight(0xff8866, 0.3);
    rimLight.position.set(-5, 5, -8);
    scene.add(rimLight);
    
    // ========== MOUSE INTERACTION ==========
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetZoom = 18;
    let currentZoom = 18;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      targetRotationY = mouseX * 1.2;
      targetRotationX = mouseY * 0.6;
    };
    
    const handleScroll = (event) => {
      const delta = event.deltaY;
      targetZoom += delta * 0.02;
      targetZoom = Math.max(8, Math.min(25, targetZoom)); // Min 8, Max 25
    };
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // ========== ANIMATION LOOP ==========
    let time = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;
      
      // Rotate sun
      sun.rotation.y += 0.002;
      sunGlow.rotation.y += 0.001;
      corona.rotation.y += 0.005;
      corona.rotation.x += 0.003;
      
      // Pulsing sun effect
      const intensity = 1.6 + Math.sin(time * 2) * 0.15;
      sunLight.intensity = intensity;
      sunMaterial.emissiveIntensity = 0.5 + Math.sin(time * 2.5) * 0.15;
      sunGlowMaterial.opacity = 0.12 + Math.sin(time * 1.5) * 0.05;
      
      // Animate planets
      planets.forEach(planet => {
        planet.angle += planet.speed * 0.6;
        const x = Math.cos(planet.angle) * planet.distance;
        const z = Math.sin(planet.angle) * planet.distance;
        planet.mesh.position.set(x, 0, z);
        
        // Rotate planet on axis
        planet.mesh.rotation.y += 0.01;
        
        // Saturn ring position
        if (planet.name === 'Saturn') {
          saturnRing.position.set(x, 0, z);
          saturnRing.rotation.x = 0.6;
          saturnRing.rotation.z = Math.sin(time) * 0.1;
        }
      });
      
      // Rotate asteroid belt
      asteroidBelt.rotation.y += 0.001;
      
      // Twinkling stars effect
      const twinkle = 0.5 + Math.sin(time * 4) * 0.3;
      nearStarMaterial.opacity = twinkle;
      
      // Rotate starfield slowly
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;
      nearStars.rotation.y -= 0.0003;
      
      // Animate lights
      fillLight.intensity = 0.18 + Math.sin(time * 0.7) * 0.05;
      
      // Smooth camera follow
      const smoothedRotX = targetRotationX * 0.05;
      const smoothedRotY = targetRotationY * 0.05;
      scene.rotation.x += (smoothedRotX - scene.rotation.x) * 0.05;
      scene.rotation.y += (smoothedRotY - scene.rotation.y) * 0.05;
      
      // Smooth zoom
      currentZoom += (targetZoom - currentZoom) * 0.05;
      camera.position.z = currentZoom;
      
      // Camera slight follow
      camera.position.x += (-mouseX * 0.8 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  
  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default ThreeScene;