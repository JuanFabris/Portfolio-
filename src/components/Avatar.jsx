import React, { forwardRef, useRef, useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useFBX } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import * as THREE from 'three';

export const Avatar = forwardRef((props, ref) => {
    const { animation } = props; 
    const group = useRef();
    const { scene } = useGLTF('./models/Avatar.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);
    
    // Load animations
    const { animations: type } = useFBX('./animations/Typing.fbx');
    const { animations: lift } = useFBX('./animations/Lifting.fbx');
    const { animations: walk } = useFBX('./animations/Stop Walking.fbx');

    type[0].name = "Type";
    walk[0].name = "Walk";
    lift[0].name = "Lift";

    const { actions, mixer } = useAnimations([type[0], walk[0], lift[0]], group);


    useEffect(() => {
      const action = actions[animation];

      // Reset and play the specified animation
      action.reset().fadeIn(0.5).play();

      if (animation === "Walk") {
          action.setLoop(THREE.LoopOnce); // Play walk once
          action.clampWhenFinished = true; // Clamp at the last frame
          
          // Listen for when the walk action finishes
          mixer.addEventListener('finished', () => {
              // Hold the avatar's position by setting time to the last frame
              action.time = action.getClip().duration; // Go to the last frame
              action.stop(); // Stop walking animation

              // Play the lift animation
              const liftAction = actions["Lift"];
              liftAction.reset().fadeIn(0.5).play();
              liftAction.setLoop(THREE.LoopOnce); // Play lift once
              liftAction.clampWhenFinished = true; // Clamp at the last frame
              
              // Ensure the lift animation stops at the last frame
              mixer.addEventListener('finished', () => {
                  liftAction.stop(); // Stop the lift action
                  liftAction.time = liftAction.getClip().duration; // Stay at the last frame
              });
          });
      } else if (animation === "Type") {
          action.setLoop(THREE.LoopRepeat); // Keep typing indefinitely
      }

      // Cleanup function to remove event listeners
      return () => {
          mixer.removeEventListener('finished', () => {});
          action.fadeOut(0.5);
      };
  }, [animation, actions, mixer]);


    return (
        <group {...props} ref={group} dispose={null}>
            <primitive object={nodes.Hips} />
            {/* Skinned Meshes */}
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
});

useGLTF.preload('./models/Avatar.glb');

