import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "./Avatar"; 
import { Office } from "./Office"; 
import { motion } from 'framer-motion-3d';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three'; // Import THREE here if needed for Vector3

gsap.registerPlugin(ScrollTrigger);

export const Experience = (props) => {
    const { section } = props; 
    const avatarRef = useRef(); 
    const [animation, setAnimation] = useState("Type");
    const [avatarPosition, setAvatarPosition] = useState(new THREE.Vector3(10, 5, -50));
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initial state based on screen width
    const targetPosition = useRef(new THREE.Vector3(-80, -320, -50));
    const mobileTargetPosition = useRef(new THREE.Vector3(-40, -350, -50)); // Adjusted for mobile
    const animationTriggered = useRef(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (section === 1 && !animationTriggered.current) {
            if (isMobile) {
                setAnimation("Land"); // Mobile-specific animation
                moveAvatarToTarget(mobileTargetPosition.current);
                setRotation([0, 10, 0]);
            } else {
                setAnimation("Land");
                moveAvatarToTarget(targetPosition.current);
            }
            setRotation([0, 3.2, 0]);
            animationTriggered.current = true;
        } else if (section === 0) {
            setAnimation("Type");
            setRotation([0, 0, 0]);
            resetAvatarPosition();
            animationTriggered.current = false;
        }
    }, [section, isMobile]);

    const moveAvatarToTarget = (target) => {
        gsap.to(avatarPosition, {
            duration: 0.1,
            x: target.x,
            y: target.y,
            z: target.z,
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
