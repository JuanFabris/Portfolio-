import React, { forwardRef, useRef, useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useFBX } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import * as THREE from 'three';

export const Avatar = forwardRef(({ animation, onAnimationEnd, position, ...props }, ref) => {
    const group = useRef();
    const { scene } = useGLTF('./models/Avatar.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);

    // Load animations
    const { animations: type } = useFBX('./animations/Typing.fbx');
    const { animations: lift } = useFBX('./animations/Lifting.fbx');
    const { animations: walk } = useFBX('./animations/Stop Walking.fbx');
    const { animations: fallFlat } = useFBX('./animations/Falling Flat Impact.fbx');
    const { animations: getup } = useFBX('./animations/Getting Up.fbx');
    const { animations: fall } = useFBX('./animations/Falling.fbx');

    type[0].name = "Type";
    walk[0].name = "Walk";
    lift[0].name = "Lift";
    fallFlat[0].name = "FallF";
    getup[0].name = "Getup";
    fall[0].name = "Fall";

    const { actions, mixer } = useAnimations([type[0], walk[0], lift[0], fall[0], getup[0], fallFlat[0]], group);

    useEffect(() => {

        if(animation === "Type") {
            const typeAct = actions["Type"];
            typeAct.reset().fadeIn(0).play()
        }
        // Start the animation sequence based on the selected animation
        const startAnimationSequence = () => {
            if (animation === "FallF") {
                //playAnimation("Fall", () => {
                    playAnimation("FallF", () => {
                        playAnimation("Getup", () => {
                            playAnimation("Walk", () => {
                                playAnimation("Lift", onAnimationEnd);
                            });
                        });
                    });
                //});
            }
        };

        const playAnimation = (animName, callback) => {
            const action = actions[animName];
            action.reset().fadeIn(0.1).play();
            action.clampWhenFinished = true;
            action.setLoop(THREE.LoopOnce);

            // Event listener for when the animation finishes
            const onFinished = () => {
                if (callback) callback();
                mixer.removeEventListener('finished', onFinished); // Clean up listener after it finishes
            };

            mixer.addEventListener('finished', onFinished);
        };

        startAnimationSequence();

        return () => {
            // Clean up all event listeners on component unmount
            mixer.removeEventListener('finished', () => {});
        };
    }, [actions, animation, mixer, onAnimationEnd]);

    // Apply the position prop to the group
    useEffect(() => {
        if (group.current) {
            group.current.position.set(...position);
        }
    }, [position]);

    return (
        <group {...props} ref={group} dispose={null}>
            <primitive object={nodes.Hips} />
            {/* Render skinned meshes */}
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
