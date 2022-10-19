import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

const Planet = ({ planet }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += planet.moveSpeed;
    meshRef.current.rotation.y = planet.clockwiseRotation
      ? meshRef.current.rotation.y - planet.rotationSpeed
      : meshRef.current.rotation.y + planet.rotationSpeed;

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.1;
      ring2Ref.current.rotation.z += 0.1;
    }
  });

  const isSaturn = planet.name === 'saturn';

  return (
    <group ref={groupRef}>
      <mesh
        // onClick={e => handleClick(e, meshRef)}
        position={[planet.positionX, 0, 0]}
        rotation={[planet.name === 'saturn' ? Math.PI / 7 : 0, 0, 0]}
        ref={meshRef}>
        <sphereGeometry args={[planet.radius, 40, 40]} />
        <meshStandardMaterial map={new THREE.TextureLoader().load(planet.texture)} />
      </mesh>

      {isSaturn && (
        <>
          {/* <points */}
          <mesh
            position={[planet.positionX, 0, 0]}
            rotation={[Math.PI / 2 + Math.PI / 7, 0, 0]}
            ref={ringRef}>
            <ringGeometry args={[planet.radius + 0.6, planet.radius + 1.2, 50, 1]} />
            {/* <pointsMaterial color='#f0dfce' size={0.1} args={} /> */}
            <meshStandardMaterial color='#f0dfce' side={THREE.DoubleSide} transparent={true} opacity={0.6} />
          </mesh>
          {/* </points> */}
          <mesh
            position={[planet.positionX, 0, 0]}
            rotation={[Math.PI / 2 + Math.PI / 7, 0, 0]}
            ref={ring2Ref}>
            <ringGeometry args={[planet.radius + 1.3, planet.radius + 1.7, 50, 1]} />
            <meshStandardMaterial color='#d6c5b4' side={THREE.DoubleSide} transparent={true} opacity={0.6} />
          </mesh>
        </>
      )}
    </group>
  );
};

export default Planet;
