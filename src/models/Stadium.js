import React from 'react'
import { useGLTF } from '@react-three/drei'
import Stadium from 'images/optimizedField.glb'

export default function Model(props) {
  const { nodes, materials } = useGLTF(Stadium)

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_0_0_0.geometry}
        material={materials.L0_0_0_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_1_0_0.geometry}
        material={materials.L0_1_0_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_2_0_0.geometry}
        material={materials.L0_2_0_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_3_0_0.geometry}
        material={materials.L0_3_0_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_0_1_0.geometry}
        material={materials.L0_0_1_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_1_1_0.geometry}
        material={materials.L0_1_1_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_2_1_0.geometry}
        material={materials.L0_2_1_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_3_1_0.geometry}
        material={materials.L0_3_1_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_0_2_0.geometry}
        material={materials.L0_0_2_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_1_2_0.geometry}
        material={materials.L0_1_2_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_2_2_0.geometry}
        material={materials.L0_2_2_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_3_2_0.geometry}
        material={materials.L0_3_2_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_0_3_0.geometry}
        material={materials.L0_0_3_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_1_3_0.geometry}
        material={materials.L0_1_3_0_geom_mat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L0_2_3_0.geometry}
        material={materials.L0_2_3_0_geom_mat}
      />
    </group>
  )
}

useGLTF.preload(Stadium)