/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 .\public\models\Ferris wheel.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Ferris(props) {
  const { nodes, materials } = useGLTF('./models/Ferriswheel.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['ferris_wheel-Mesh'].geometry} material={materials._cabin_green} />
      <mesh geometry={nodes['ferris_wheel-Mesh_1'].geometry} material={materials.ferris_wheel_white} />
      <mesh geometry={nodes['ferris_wheel-Mesh_2'].geometry} material={materials.ferris_wheel_red} />
      <mesh geometry={nodes['ferris_wheel-Mesh_3'].geometry} material={materials.ferris_wheel_yellow} />
      <mesh geometry={nodes['ferris_wheel-Mesh_4'].geometry} material={materials.ferris_wheel_legs_red} />
      <mesh geometry={nodes['ferris_wheel-Mesh_5'].geometry} material={materials.ferris_wheel_blue} />
      <mesh geometry={nodes['ferris_wheel-Mesh_6'].geometry} material={materials.ferris_wheel_orange} />
      <mesh geometry={nodes['ferris_wheel-Mesh_7'].geometry} material={materials.cabin_red} />
      <mesh geometry={nodes['ferris_wheel-Mesh_8'].geometry} material={materials.cabin_blue} />
      <mesh geometry={nodes['ferris_wheel-Mesh_9'].geometry} material={materials.cabin_orange} />
    </group>
  )
}

useGLTF.preload('./models/Ferriswheel.glb')
