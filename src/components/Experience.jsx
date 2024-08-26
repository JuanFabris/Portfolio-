import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "./Avatar"; 
import { Office } from "./Office"; 
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

export const Experience = (props) => {
    const { section } = props; 
    const avatarRef = useRef(); 
    const [animation, setAnimation] = useState("Type");
    const [avatarPosition, setAvatarPosition] = useState([10, 5, -50]); // Initial position for avatar
    const [rotation, setRotation] = useState([0, 0, 0]);
    const targetPosition = useRef([-80, -320, -50]); // Target position when section is 1

    useEffect(() => {
        if (section === 1) {
            setAnimation("FallF"); // Trigger fall animation
            setRotation([0, 3.2, 0]); // Adjust rotation during fall
        } else {
            setAnimation("Type");
            setRotation([0, 0, 0]); // Reset rotation when typing
            setAvatarPosition([10, 5, -50]); // Reset position when typing
        }
    }, [section]);

    // Smooth transition to the target position
    useEffect(() => {
        const startPosition = new THREE.Vector3(...avatarPosition);
        const endPosition = new THREE.Vector3(...targetPosition.current);
        const duration = 0.2; // Duration of the transition in seconds
        const startTime = performance.now();

        const animate = (time) => {
            const elapsed = (time - startTime) / 1000; // Convert milliseconds to seconds
            const progress = Math.min(elapsed / duration, 1); // Clamp progress to [0, 1]

            // Calculate current position
            const currentPosition = startPosition.lerp(endPosition, progress);
            setAvatarPosition(currentPosition.toArray());

            // Continue the animation until it reaches the end
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        // Only trigger the animation when the animation is set to "FallF"
        if (animation === "FallF") {
            requestAnimationFrame(animate);
        }
    }, [animation]);

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