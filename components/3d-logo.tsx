"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PresentationControls, Environment, ContactShadows } from "@react-three/drei"
import type * as THREE from "three"

function PALogo(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!)

  // Rotate the logo
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef} {...props} castShadow receiveShadow>
      <group>
        {/* P shape */}
        <mesh position={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 0.3, 0.3]} />
          <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.8, 0.3, 0.3]} />
          <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
        </mesh>

        {/* A shape */}
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <meshStandardMaterial color="#34d399" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[1.1, 0, 0]} rotation={[0, 0, -Math.PI / 12]} castShadow>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <meshStandardMaterial color="#34d399" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0.8, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 0.3, 0.3]} />
          <meshStandardMaterial color="#34d399" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </mesh>
  )
}

export default function Logo3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
        >
          <PALogo position={[0, 0, 0]} scale={1.2} />
        </PresentationControls>
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
