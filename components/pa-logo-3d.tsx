"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, ContactShadows, PresentationControls } from "@react-three/drei"
import type * as THREE from "three"

function PALogoModel(props: any) {
  const meshRef = useRef<THREE.Group>(null!)

  // Rotate the logo
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={meshRef} {...props}>
      {/* P shape - updated to match the image */}
      <mesh castShadow position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 5, 0.5]} />
        <meshStandardMaterial color="#2563eb" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* P curved top */}
      <mesh castShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial color="#2563eb" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* P middle section */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 0.5]} />
        <meshStandardMaterial color="#2563eb" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* A left diagonal */}
      <mesh castShadow position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 12]}>
        <boxGeometry args={[0.8, 5, 0.5]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* A right diagonal */}
      <mesh castShadow position={[3, 0, 0]} rotation={[0, 0, -Math.PI / 12]}>
        <boxGeometry args={[0.8, 5, 0.5]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* A crossbar */}
      <mesh castShadow position={[2.25, 0, 0]}>
        <boxGeometry args={[1.5, 0.8, 0.5]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function PALogo3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
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
          <PALogoModel position={[0, 0, 0]} scale={0.8} />
        </PresentationControls>
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
