import React,{useRef, useState} from 'react'
import { Canvas,useFrame } from '@react-three/fiber'
import { SoftShadows,MeshWobbleMaterial,OrbitControls } from '@react-three/drei';
import { useSpring,a } from '@react-spring/three';


const SpinningMesh = ({position,args,color,speed}) => {
  
  const mesh = useRef(null);
  useFrame(()=> (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  
  const [expand,setExpand] = useState(false);

  const props = useSpring({
    scale : expand ? [1.4,1.4,1.4] : [1,1,1],
  })
  return(
      <a.mesh 
        onClick={()=>setExpand(!expand)}
        castShadow 
        position={position}  
        ref={mesh} 
        scale={props.scale}
        >
          <boxBufferGeometry attach='geometry' args={args} />
          <MeshWobbleMaterial 
            attach='material' 
            color={color} 
            speed={speed} 
            factor={2}
          />
     </a.mesh>
  )
}

 {/* <mesh  rotation={[Math.PI / 2,0,0]} >
      <circleBufferGeometry args={[radius,64]}/>
      <meshBasicMaterial  color="#fff"  wireframe />

   </mesh>*/}

function Rectangle() {

  
  return (
    <div
       style={{height:"100vh",width:"100%"}}
    >
      <Canvas 
        colorManagement 
        camera={{position:[-5,2,10],fov:60}}  
        style={{height:"100vh",width:"100%"}}
        >
           <ambientLight intensity={0.3} />
           <directionalLight
              castShadow
              position={[0,10,0]}
              intensity={1.5}
              shadowMapSize={{ width: 1024, height: 1024 }} // Utilisation de camel case
              shadowCameraFar={50} // Utilisation de camel case
              shadowCameraLeft={-10} // Utilisation de camel case
              shadowCameraRight={10} // Utilisation de camel case
              shadowCameraTop={10} // Utilisation de camel case
              shadowCameraBottom={-10} // Utilisation de camel case
           
           />
           <pointLight   position={[-10,0,-20]}   intensity={0.5} />
           <pointLight   position={[0,-10,0]}   intensity={1.5} />
           <group>
             <mesh   
              receiveShadow
              rotation={[-Math.PI/2,0,0]} 
              position={[0,-3,0]} 
              >
              <planeBufferGeometry attach="geometry" args={[100,100]} />
              <shadowMaterial attach='material' opacity={0.3} />
             </mesh>
             <SpinningMesh position={[0,1,0]} args={[3,2,1]} speed={2} />
             <SpinningMesh position={[-2,1,-5]} color="pink" speed={6} />
             <SpinningMesh position={[5,1,-2]} color="pink" speed={6} />
           </group>
          
           <OrbitControls/>
      </Canvas>
    </div>
  )
}

export default Rectangle