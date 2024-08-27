import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "./Avatar"; 
import { Office } from "./Office"; 
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

export const Experience = (props) => {
    const { section } = props; 
    const avatarRef = useRef(); 
    const [animation, setAnimation] = useState("Type");
    const [avatarPosition, setAvatarPosition] = useState([10, 5, -50]);
    const [rotation, setRotation] = useState([0, 0, 0]);
    const targetPosition = useRef([-80, -320, -50]);
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
            setAvatarPosition([10, 5, -50]);
            animationTriggered.current = false;
        }
    }, [section]);
    
    const moveAvatarToTarget = () => {
        const startPosition = new THREE.Vector3(...avatarPosition);
        const endPosition = new THREE.Vector3(...targetPosition.current);
        const duration = 0.1;
        const startTime = performance.now();
    
        const easeOutQuad = (t) => t * (2 - t); //easing function
    
        const animate = (time) => {
            const elapsed = (time - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
    
            //apply ease
            const easedProgress = easeOutQuad(progress);
    
            // Calculate current position
            const currentPosition = startPosition.lerp(endPosition, easedProgress);
            setAvatarPosition(currentPosition.toArray());
    
            // Continue the animation until it reaches the end
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
    
        // Start the movement animation
        requestAnimationFrame(animate);
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
                    position={avatarPosition}
                    scale={[55, 55, 55]} 
                    rotation={rotation} 
                    animation={animation} // Fixed typo here
                    onAnimationEnd={handleAnimationEnd}
                />
            </motion.group>
        </>
    );
};
