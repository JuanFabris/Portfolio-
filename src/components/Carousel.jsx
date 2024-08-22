import { animated, useSpring } from "@react-spring/three";
import { Float } from "@react-three/drei";
import { extend } from '@react-three/fiber';
import { BoxGeometry, CylinderGeometry } from 'three';
extend({ BoxGeometry, CylinderGeometry });

//Park
import { Bunny } from "./Park/Bunny";
import { CanCharacter } from "./Park/CanCharacter";
import { Ferris } from "./Park/Ferriswheel";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


const STEP_DURATION = 1000;

export const Carousel = (props) => {
  const { carouselRotation } = useSpring({
    from: {
      carouselRotation: 0,
    },
    to: [
      {
        carouselRotation: -Math.PI / 2,
        delay: STEP_DURATION,
      },
      {
        carouselRotation: -Math.PI,
        delay: STEP_DURATION,
      },
      {
        carouselRotation: -1.5 * Math.PI,
        delay: STEP_DURATION,
      },
      {
        carouselRotation: -2 * Math.PI,
        delay: STEP_DURATION,
      },
    ],
    config: {
      mass: 5,
      tension: 400,
      friction: 50,
    },
    loop: true,
    immediate: true,
  });

  return (
    <>
      <group rotation-y={-Math.PI / 4} position-y={-0.01}>
        <animated.group rotation-y={carouselRotation} rotation-x={Math.PI * (2/18)} position-x={5}>
        <mesh position={[0, -2, 0]}>
            <meshStandardMaterial color={"white"} />
            <cylinderGeometry args={[12, 12, 4, 64]} />
        </mesh>
        <mesh scale={[1, 6, 24]} position-y={3}>
            <boxGeometry />
            <meshStandardMaterial color={"white"} />
        </mesh>
        <mesh scale={[24, 6, 1]} position-y={3}>
            <boxGeometry />
            <meshStandardMaterial color={"white"} />
        </mesh>
          {/* PARK */}
          <>
            <Bunny position={[1.5, 0, 10]} rotation-y={Math.PI / 2} />
            <CanCharacter position={[1.5, 0, 7]} rotation-y={Math.PI / 20} />
            <Ferris  position={[5, 3.5, 2]} scale={3}/>
          </>
        </animated.group>
      </group>
    </>
  );
};
