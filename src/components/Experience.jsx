import { ContactShadows, Environment, OrbitControls, Sky } from "@react-three/drei";

import { Carousel } from "./Carousel";
import { Avatar } from "./Avatar";
import {Office } from "./Office"

import { useFrame } from "@react-three/fiber";
import { Depth, LayerMaterial, Noise } from "lamina";
import { useRef } from "react";

import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { useControls } from "leva";

import { motion } from "framer-motion-3d";





export const Experience = (props) => {
  
  // const {animation} = useControls({
  //   animation : {
  //     value : "Type", //default
  //     options : ["StandUp", "Type", "greet", "lift", "walk"]
  //   }
  // })

  const {section} = props;
  
  return (
    <>  
        
       <ambientLight intensity={1}/>
       <directionalLight position={[800, 20, 20]} intensity={2} />
        <motion.group
          position={[55, 0, 220]}
          rotation={[0,2.2,0]}
          scale={[1., 1., 1.]}
          animate = {{
            y : section === 0 ? 0 : -1
          }}
        >
        <Office />
        <Avatar 
          position={[10, 5, -50]} 
          scale={[55, 55, 55]} 
          rotation={[0, 0, 0]}
          animation = {"Type"}
        />
        </motion.group>
    </>
  );
};
