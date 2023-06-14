import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three'
import { TextureLoader } from 'three';

const Planet = ({ position, args, color, speed, orbitRadius }) => {
  const mesh = useRef(null);
  const theta = useRef(0);

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();
    theta.current += speed;
    const x = Math.cos(theta.current) * orbitRadius;
    const z = Math.sin(theta.current) * orbitRadius;
    const y = Math.sin(elapsedTime * speed) * 2;
    mesh.current.position.set(x, y, z);
  });

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <a.mesh onClick={() => setExpand(!expand)} position={position} ref={mesh} scale={props.scale}>
      <sphereBufferGeometry attach='geometry' args={args} />
      <meshStandardMaterial attach='material' color={color} />
    </a.mesh>
  );
};

const Orbit = ({radius}) => {
 
  const curve = new THREE.EllipseCurve(0,0,radius,radius,0,2* Math.PI,false,0);
  const points = curve.getPoints(100);
  const vertices = points.map((point)=> new THREE.Vector3(point.x,0,point.y));

  return(
    <mesh  rotation={[Math.PI / 2,0,0]} >
      <circleBufferGeometry args={[radius,64]}/>
      <meshBasicMaterial  color="#fff"  wireframe />

   </mesh>
  )
}

function SolarSystem() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Canvas colorManagement camera={{ position: [0, 5, 20], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[0, 10, 0]} intensity={1.5} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />

        <group>
          <mesh receiveShadow>
            <sphereBufferGeometry attach='geometry' args={[10, 64, 64]} />
            <meshStandardMaterial attach='material' color='#ffcc00' />
            
          </mesh>

          <Orbit radius={15} />
          <Orbit radius={18} />
          <Orbit radius={21} />
          <Orbit radius={24} />
          <Orbit radius={27} />
          <Orbit radius={30} />
          <Orbit radius={33} />
          <Orbit radius={36} />

          <Planet position={[0, 0, 0]} args={[1, 32, 32]} color='#ff0000' speed={0} orbitRadius={0} /> {/* Soleil */}
          <Planet position={[15, 0, 0]} args={[1, 32, 32]} color='#ff0000' speed={0.01} orbitRadius={15} /> {/* Mercure */}
          <Planet position={[18, 0, 0]} args={[1.5, 32, 32]} color='#ff6600' speed={0.008} orbitRadius={18} /> {/* Venus */}
          <Planet position={[21, 0, 0]} args={[1.8, 32, 32]} color='#00ff00' speed={0.006} orbitRadius={21} /> {/* Terre */}
          <Planet position={[24, 0, 0]} args={[1.2, 32, 32]} color='#ff6600' speed={0.005} orbitRadius={24} /> {/* Mars */}
          <Planet position={[27, 0, 0]} args={[2.5, 32, 32]} color='#ff9900' speed={0.004} orbitRadius={27} /> {/* Jupiter */}
          <Planet position={[30, 0, 0]} args={[2.2, 32, 32]} color='#ffcc00' speed={0.003} orbitRadius={30} /> {/* Saturne */}
          <Planet position={[33, 0, 0]} args={[1.5, 32, 32]} color='#00ffff' speed={0.002} orbitRadius={33} /> {/* Uranus */}
          <Planet position={[36, 0, 0]} args={[1.3, 32, 32]} color='#0000ff' speed={0.001} orbitRadius={36} /> {/* Neptune */}
          <Planet position={[39, 0, 0]} args={[0.8, 32, 32]} color='#ffffff' speed={0.0005} orbitRadius={39} /> {/* Pluton */}
        </group>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default SolarSystem;
