// components/VantaBackground.js
import React, { useEffect, useRef } from 'react';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const ringsRef = useRef(null);

  useEffect(() => {
    const VANTA = window.VANTA;
    if (VANTA && !vantaRef.current) {
      vantaRef.current = VANTA.RINGS({
        el: ringsRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 300,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: '',
        color: 0xffc700,
        color2: 0x1a1a1a
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
