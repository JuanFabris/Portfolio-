// components/VantaBackground.js
import React, { useEffect, useRef } from 'react';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const ringsRef = useRef(null); // Reference for the DOM element

  useEffect(() => {
    // Check if Vanta is available in the global window object
    const VANTA = window.VANTA;
    if (VANTA && !vantaRef.current) {
      // Initialize Vanta.js effect
      vantaRef.current = VANTA.RINGS({
        el: ringsRef.current, // Attach to the ref
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 300,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0x000000, // Customize background color
        color: 0xffc700, // Primary color
        color2: 0x1a1a1a, // Secondary color
      });
    }
  }, []);

  return (
    <div
      ref={ringsRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Set behind other content
      }}
    />
  );
};

export default VantaBackground;
