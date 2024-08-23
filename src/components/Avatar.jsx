import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useFBX } from '@react-three/drei';
import { useControls } from 'leva';
import { useGraph } from '@react-three/fiber';

export function Avatar(props) {
  const { animation, wireframe } = props;
  const { headFollow, cursorFollow } = useControls({
    headFollow: false,
    cursorFollow: false,
  });
  const group = useRef();
  const { scene } = useGLTF('./models/Avatar.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { animations: type } = useFBX('./animations/Typing.fbx');
  const { animations: standUp } = useFBX('./animations/Stand Up (1).fbx');
  const { animations: greet } = useFBX('./animations/KneelingPointing.fbx');
  const { animations: lift } = useFBX('./animations/Lifting.fbx');
  const { animations: walk } = useFBX('./animations/Stop Walking.fbx');

  type[0].name = "Type";
  // standUp[0].name = "StandUp";
  // greet[0].name = "greet";
  // lift[0].name = "lift";
  // walk[0].name = "walk";

  //const { actions, mixer } = useAnimations([type[0], standUp[0], greet[0], walk[0], lift[0]], group);
  const { actions, mixer } = useAnimations([type[0]], group);

  // useFrame((state) => {
  //   const { camera, pointer } = state;

  //   if (headFollow) {
  //     const head = group.current.getObjectByName('Head');
  //     if (head) {
  //       head.lookAt(camera.position);
  //     }
  //   }

  //   if (cursorFollow) {
  //     const spine = group.current.getObjectByName('Spine');
  //     if (spine) {
  //       const target = new THREE.Vector3(pointer.x, pointer.y, 1);
  //       spine.lookAt(target);
  //     }
  //   }
  // });

// useEffect(() => {
//   const { walk, lift } = actions;

//   // Stop any other actions that might be playing
//   mixer.stopAllAction();

//   // Start the first animation
//   const walkAction = walk.play()

//   // Blend to the second animation
//   const liftAction = lift.play();

//   // Set up the blending duration between the animations
//   liftAction.crossFadeFrom(walkAction, 1, true);

//   // Optionally: handle animation looping
//   walkAction.setLoop(THREE.LoopOnce, 1); // Play 'walk' animation only once
//   liftAction.setLoop(THREE.LoopOnce, 1); // Play 'lift' animation only once

//   // Clean up: stop actions when the component unmounts or dependencies change
//   return () => {
//     walkAction.stop();
//     liftAction.stop();
//   };
// }, [animation, actions, mixer]);

useEffect(() => {
  const action = actions[animation];
  if (action) {
    action.reset().fadeIn(0).play();
  }
  
  return () => {
    // Only clean up if the component is unmounting, not on every render
    if (action) {
      action.fadeOut(0.5);
    }
  };
}, [animation, actions]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe, materials]);

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        frustumCulled={false}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        frustumCulled={false}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        frustumCulled={false}
      />
    </group>
  );
}

useGLTF.preload('./models/Avatar.glb');
