import { useScroll } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {gsap} from 'gsap';


export const ScrollManager = (props) => {
    const {section, onSectionChange} = props;

    const data = useScroll();
    const lastScroll = useRef(0)
    const isAnimating = useRef(false)

    data.fill.classList.add("top-0");
    data.fill.classList.add("absolute");

    useEffect(() => {
        gsap.to(data.el, {
            duration : 1,
            scrollTop : section * data.el.clientHeight,
            onStart: () => {
                isAnimating.current = true
            },
            onComplete : () => {
                isAnimating.current = false
            }
        })
    }, [section])

    useFrame(() => {
        if (isAnimating.current) {
            lastScroll.current = data.scroll.current;
            return;
        }

        const curSection = Math.floor(data.scroll.current * data.pages); // Current section

        // Section 0 to 1
        if (data.scroll.current > lastScroll.current && curSection === 0 && data.scroll.current) {
            onSectionChange(1);
        }

        // Section 1 to 0
        if (data.scroll.current < lastScroll.current && curSection === 1 && data.scroll.current) {
            onSectionChange(0);
        }

        // Section 1 to 2
        if (data.scroll.current > lastScroll.current && curSection === 1 && data.scroll.current > (1 / (data.pages - 1))) {
            onSectionChange(2);
        }

        // Section 2 to 1
    if (data.scroll.current < lastScroll.current && curSection === 2) {
        onSectionChange(1);
            }

        lastScroll.current = data.scroll.current;
    });
}