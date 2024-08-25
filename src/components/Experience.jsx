import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "./Avatar"; // Assuming Avatar is correctly imported
import { Office } from "./Office"; // Assuming Office is correctly imported
import { motion } from 'framer-motion-3d';

export const Experience = (props) => {
    const { section } = props; // Get the current section from props
    const avatarRef = useRef(); // Reference for the main avatar
    const newAvatarRef = useRef(); // Reference for the new avatar
    const [showNewAvatar, setShowNewAvatar] = useState(false); // Control visibility of new avatar
    const [newAvatarPosition, setNewAvatarPosition] = useState([-100, -320, -50]); // Initial position of the new avatar

    useEffect(() => {
        if (section === 1) { // When section is SkillsSection
            setShowNewAvatar(true); // Show new avatar
        } else {
            setShowNewAvatar(false); // Hide avatar when not in SkillsSection
        }
    }, [section]);

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[800, 20, 20]} intensity={2} />
            <motion.group
                position={[55, 0, 220]} // Position of the group
                rotation={[0, 2.2, 0]} // Rotation of the group
                scale={[1, 1, 1]} // Scale of the group
            >
                <Office />
                <Avatar
                    ref={avatarRef}
                    position={[10, 5, -50]} // Position of the main avatar
                    scale={[55, 55, 55]} // Scale of the main avatar
                    rotation={[0, 0, 0]} // Rotation of the main avatar
                    animation={"Type"} // Animation for the main avatar
                />
                {showNewAvatar && (
                    <Avatar
                        ref={newAvatarRef} // Ref for the new avatar
                        position={newAvatarPosition} // Use updated position for new avatar
                        scale={[55, 55, 55]} // Scale of the new avatar
                        rotation={[0, 9.5, 0]} // Rotation of the new avatar
                        animation={"Walk"} // Animation for the new avatar
                    />
                )}
            </motion.group>
        </>
    );
};
