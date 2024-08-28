import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "./Avatar"; 
import { Office } from "./Office"; 
import { motion } from 'framer-motion-3d';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const Experience = (props) => {
    const { section } = props; 
    const avatarRef = useRef(); 
    const [animation, setAnimation] = useState("Type");
    const [avatarPosition, setAvatarPosition] = useState(new THREE.Vector3(10, 5, -50));
    const [rotation, setRotation] = useState([0, 0, 0]);
    const targetPosition = useRef(new THREE.Vector3(-80, -320, -50));
    const animationTriggered = useRef(false);

    useEffect(() => {
        if (section === 1 && !animationTriggered.current) {
            setAnimation("Land");
            setRotation([0, 3.2, 0]);
            moveAvatarToTarget();
            animationTriggered.current = true;
        } else if (section === 0) {
            setAnimation("Type");
            setRotation([0, 0, 0]);
            resetAvatarPosition();
            animationTriggered.current = false;
        }
    }, [section]);

    const moveAvatarToTarget = () => {
        gsap.to(avatarPosition, {
            duration: 0.1,
            x: targetPosition.current.x,
            y: targetPosition.current.y,
            z: targetPosition.current.z,
            ease: "power4.inOut",
            onUpdate: () => {
                setAvatarPosition(avatarPosition.clone());
            },
            onComplete: handleAnimationEnd
        });
    };

    const resetAvatarPosition = () => {
        gsap.to(avatarPosition, {
            duration: 0.1,
            x: 10,
            y: 5,
            z: -50,
            ease: "power4.inOut",
            onUpdate: () => {
                setAvatarPosition(avatarPosition.clone());
            }
        });
    };

    const handleAnimationEnd = () => {
        console.log("Animation ended.");
    };

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[800, 20, 20]} intensity={2} />
            <motion.group
                position={[55, 0, 220]} 
                rotation={[0, 2.2, 0]} 
                scale={[1, 1, 1]} 
            >
                <Office />
                <Avatar
                    ref={avatarRef}
                    position={avatarPosition.toArray()}
                    scale={[55, 55, 55]} 
                    rotation={rotation} 
                    animation={animation}
                    onAnimationEnd={handleAnimationEnd}
                />
            </motion.group>
        </>
    );
};
