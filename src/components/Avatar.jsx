import React, { forwardRef, useRef, useEffect, useMemo } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useFBX } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import * as THREE from 'three';

export const Avatar = forwardRef(({ animation, onAnimationEnd, position, ...props }, ref) => {
    const group = useRef();
    const { scene } = useGLTF('./models/Avatar.glb');
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);

    // Load animations
    const loadAnimations = () => {
        const animationFiles = [
            { name: 'Type', path: './animations/Typing.fbx' },
            { name: 'Flex', path: './animations/Pointing Gesture.fbx' },
            { name: 'Stand', path: './animations/Standing1.fbx' },
            { name: 'Land', path: './animations/Hard Landing.fbx' },
        ];

        return animationFiles.map(({ name, path }) => {
            const { animations } = useFBX(path);
            animations[0].name = name;
            return animations[0];
        });
    };

    const animations = loadAnimations();
    const { actions, mixer } = useAnimations(animations, group);

    useEffect(() => {
        const handleAnimationEnd = (callback) => {
            const onFinished = () => {
                if (callback) callback();
                mixer.removeEventListener('finished', onFinished);
            };
            mixer.addEventListener('finished', onFinished);
        };

        const playAnimation = (animName, callback) => {
            const action = actions[animName];
            action.reset().fadeIn(0.2).play();
            action.clampWhenFinished = true;
            action.setLoop(THREE.LoopOnce);
            handleAnimationEnd(callback);
        };

        const startAnimationSequence = () => {
            if (animation === "Land") {
                playAnimation("Land", () => {
                    playAnimation("Flex", () => {
                        playAnimation("Stand", onAnimationEnd);
                    });
                });
            } else if (animation === "Type") {
                const typeAction = actions["Type"];
                typeAction.reset().fadeIn(0).play();
            }
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
            {renderSkinnedMeshes(nodes, materials)}
        </group>
    );
});

// Helper function to render skinned meshes
const renderSkinnedMeshes = (nodes, materials) => {
    const skinnedMeshProps = [
        { name: "Hair", geometry: nodes.Wolf3D_Hair, material: materials.Wolf3D_Hair },
        { name: "Body", geometry: nodes.Wolf3D_Body, material: materials.Wolf3D_Body },
        { name: "OutfitBottom", geometry: nodes.Wolf3D_Outfit_Bottom, material: materials.Wolf3D_Outfit_Bottom },
        { name: "OutfitFootwear", geometry: nodes.Wolf3D_Outfit_Footwear, material: materials.Wolf3D_Outfit_Footwear },
        { name: "OutfitTop", geometry: nodes.Wolf3D_Outfit_Top, material: materials.Wolf3D_Outfit_Top },
        { name: "EyeLeft", geometry: nodes.EyeLeft, material: materials.Wolf3D_Eye },
        { name: "EyeRight", geometry: nodes.EyeRight, material: materials.Wolf3D_Eye },
        { name: "Head", geometry: nodes.Wolf3D_Head, material: materials.Wolf3D_Skin },
        { name: "Teeth", geometry: nodes.Wolf3D_Teeth, material: materials.Wolf3D_Teeth },
    ];

    return skinnedMeshProps.map(({ name, geometry, material }) => (
        <skinnedMesh
            key={name}
            geometry={geometry.geometry}
            material={material}
            skeleton={geometry.skeleton}
            morphTargetDictionary={geometry.morphTargetDictionary}
            morphTargetInfluences={geometry.morphTargetInfluences}
            frustumCulled={false}
        />
    ));
};

useGLTF.preload('./models/Avatar.glb');
