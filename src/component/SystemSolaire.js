import React, { useRef, useState } from 'react';
import { Canvas, useFrame ,useLoader} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
import { TextureLoader, BufferGeometry, BufferAttribute, PointsMaterial, Points, } from 'three';


const Planet = ({ position, args, color, speed, orbitRadius,path,showParticles  }) => {

  const texture = useLoader(TextureLoader, path);
  const mesh = useRef(null);
  const theta = useRef(0);
  const eruptionParticles = useRef(null);

  useFrame(() => {
    theta.current += speed;
    const x = Math.cos(theta.current) * orbitRadius;
    const z = Math.sin(theta.current) * orbitRadius;
    mesh.current.position.set(x, position[1], z);
    if (eruptionParticles.current) {
      eruptionParticles.current.rotation.y += 0.001;
    }
   
    
  });

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  
  if (showParticles  && eruptionParticles.current) {
    // Création des particules d'éruption solaire
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const y = (Math.random() - 0.5) * 2;

      particlePositions[i] = x;
      particlePositions[i + 1] = y;
      particlePositions[i + 2] = z;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMaterial = new THREE.PointsMaterial({ color: '#ff6600' });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    eruptionParticles.current.add(particles);
  }


  return (
    <a.mesh onClick={() => setExpand(!expand)} position={position} ref={mesh} scale={props.scale}>
      <sphereBufferGeometry attach='geometry' args={args} />
      <meshStandardMaterial attach='material' map={texture} />
      {showParticles && <group ref={eruptionParticles} />}
    </a.mesh>
  );
};


 
function SystemSolaire() {

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Canvas colorManagement camera={{ position: [0, 5, 20], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[0, 10, 0]} intensity={1.5} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />

        <group>
        {/*  <mesh receiveShadow>
            <sphereBufferGeometry attach='geometry' args={[10, 64, 64]} />
            <meshStandardMaterial attach='material' color='#ffcc00' />
          </mesh>
          */}
          <Planet position={[0, 0, 0]} args={[10, 64, 64]} color='#ff0000' speed={0} orbitRadius={0}  path="/8k_sun.jpg"  showParticles={true} /> {/* Soleil */}
          <Planet position={[15, 0, 0]} args={[1, 32, 32]} color='#ff0000' speed={0.01} orbitRadius={15} path="/8k_mercure.jpg" /> {/* Mercure */}
          <Planet position={[18, 0, 0]} args={[1.5, 32, 32]} color='#ff6600' speed={0.008} orbitRadius={18} path="/8k_venus1.jpg"/> {/* Venus */}
          <Planet position={[21, 0, 0]} args={[1.8, 32, 32]} color='#00ff00' speed={0.006} orbitRadius={21} path="/8k_earth.jpg"/> {/* Terre */}
          <Planet position={[24, 0, 0]} args={[1.2, 32, 32]} color='#ff6600' speed={0.005} orbitRadius={24} path="/Mars_Map.webp"/> {/* Mars */}
          <Planet position={[27, 0, 0]} args={[2.5, 32, 32]} color='#ff9900' speed={0.004} orbitRadius={27} path="/Jupiter.jpg"/> {/* Jupiter */}
          <Planet position={[30, 0, 0]} args={[2.2, 32, 32]} color='#ffcc00' speed={0.003} orbitRadius={30} path="/Saturn242.webp"/> {/* Saturne */}
          <Planet position={[33, 0, 0]} args={[1.5, 32, 32]} color='#00ffff' speed={0.002} orbitRadius={33} path="/Dh_uranus_texture.webp"/> {/* Uranus */}
          <Planet position={[36, 0, 0]} args={[1.3, 32, 32]} color='#0000ff' speed={0.001} orbitRadius={36} path="/2k_neptune.jpg"/> {/* Neptune */}
          <Planet position={[39, 0, 0]} args={[0.8, 32, 32]} color='#ffffff' speed={0.0005} orbitRadius={39} path="/Pluto_Made.webp"/> {/* Pluton */}
        </group>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default SystemSolaire;
