import React from 'react'
import {motion} from 'framer-motion'
import { Avatar } from './Avatar';
import gsap from "https://cdn.skypack.dev/gsap@3.5.1";
import { useRef, useEffect } from 'react';

//HTML COMPONENTS


const Section = (props) => {
    const { children } = props;

    return (
        <motion.section className='
            h-screen w-screen p-8 max-w-screen-2xl mx-auto
            flex flex-col items-start justify-center
            '
            initial={{
                opacity: 0,
                y: 50,
            }}
            whileInView={{
                opacity : 1,
                y : 0,
                transition : {
                    duration : 1,
                    delay : 0.8
                }
            }}
            >
            {children}
        </motion.section>
    );
}

const AboutSection = () => {
    const nameRef = useRef(null);
    const name = "Gianluigi Lucca Fabris";

    useEffect(() => {
        // Function to reveal the letters of the name
        const revealTextEffect = (el) => {
            const textElements = createTextElements(el.textContent);
            setInnerElements(el, textElements);
            const animation = createAnimation(el);
            animation.play();
        };

        const createTextElements = (str) => {
            const words = str.split(" ");
            const wordElements = words.map(createWordElement);
            wordElements.forEach((wordElement) => {
                const letters = wordElement.textContent.split("");
                const letterElements = letters.map(createLetterElement);
                setInnerElements(wordElement, letterElements);
            });
            return wordElements;
        };

        const createWordElement = (word) => {
            const nonBreakingSpace = String.fromCharCode(160);
            return createTextElement({
                text: word + nonBreakingSpace,
                className: "word"
            });
        };

        const createLetterElement = (letter) => {
            return createTextElement({
                text: letter,
                className: "letter"
            });
        };

        const createTextElement = ({ text, className }) => {
            const el = document.createElement("span");
            el.style.display = "inline-block";
            el.innerHTML = text;
            el.classList.add(className);
            return el;
        };

        const setInnerElements = (el, elements) => {
            el.innerHTML = "";
            elements.forEach((element) => el.appendChild(element));
        };

        const createAnimation = (el) => {
            const animation = gsap.timeline();
            const words = [...el.querySelectorAll(".word")];
            const tweens = words.map(createWordTween);
            animation.add(tweens);
            animation.pause();
            el.classList.add("animation-initialized");
            return animation;
        };

        const createWordTween = (el, index) => {
            const letters = [...el.querySelectorAll(".letter")];
            const delay = index * 0.18;
            return gsap.fromTo(
                letters,
                {
                    opacity: 0,
                    xPercent: -50,
                },
                {
                    opacity: 1,
                    xPercent: 0,
                    ease: "bounce",
                    duration: 1,
                    stagger: 0.1,
                    delay,
                }
            );
        };

        // Timeout to reveal the name after 1 second
        const timeoutId = setTimeout(() => {
            if (nameRef.current) {
                nameRef.current.style.opacity = 1;
                revealTextEffect(nameRef.current);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Section>
            <h1 className='text-6xl font-extrabold leading-snug text-gray-200'>
                Hi, I'm
                <br />
                <span 
                    ref={nameRef} 
                    className='italic text-white opacity-0'
                    style={{ transition: 'opacity 0.5s ease-in' }} // Smooth transition for visibility
                >
                    {name}
                </span>
            </h1>
            <motion.p className=' rounded text-xl text-white mt-3 font-mono font-semibold'
                initial={{
                    opacity: 0,
                    y: 25
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 1,
                        delay: 1.3
                    }
                }}>
                I hold a degree in Criminology and a Master’s in Cybersecurity, <br/>followed by a six-month coding program and R&D experience at HFarm. <br/> Currently, I consider myself as a Frontend Developer and have recently <br/> started studying backend development to transition into a Full Stack Developer role.
            </motion.p>
            <motion.button
  className="button2 bg-transparent rounded-lg text-white p-3 mt-5 font-bold text-2xl"
  style={{
    width: '11em',
    height: '3.5em',
    border: '2px ridge #149CEA',
    outline: 'none',
    position: 'relative',
    fontSize: '18px',
    cursor: 'pointer',
  }}
  initial={{
    opacity: 0,
    y: 20,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 1.8,
    },
  }}
>
  Contact Me
  
</motion.button>
        </Section>
    );
};


const Skills = [
    { title: "Three.js / 3RF", level: 75 },
    { title: "React / React Native", level: 80 },
    { title: "Tailwind CSS", level: 70 },
    { title: "JavaScript", level: 80 },
    { title: "Node.js", level: 60 }
];

const Languages = [
    { title: "Italian", level: 100 },
    { title: "Spanish", level: 100 },
    { title: "English", level: 90 }
];

// Function to determine the color based on the level
const getColor = (level) => {
    if (level < 40) return 'bg-red-600';
    if (level < 70) return 'bg-yellow-500';
    return 'bg-green-500';
};


const ProgressBar = ({ title, level, index }) => {
    const barColor = getColor(level);

    return (
        <div className='relative w-80 group'>
            <motion.h3 
                className='text-xl font-bold text-gray-200 mb-2 group-hover:text-indigo-500 transition-colors duration-300'
                initial={{ opacity: 0 }}
                whileInView={{ 
                    opacity: 1,
                    transition: {
                        duration: 1,
                        delay: 0.5 + index * 0.2
                    }
                }}
            >
                {title}
            </motion.h3>
            <div className='h-2 w-full bg-gray-300 rounded-full shadow-lg'>
                <motion.div 
                    className={`h-full ${barColor} rounded-full transition-all duration-300 ease-in-out`} 
                    style={{ width: `${level}%` }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ 
                        scaleX: 1,
                        transition: {
                            duration: 1,
                            delay: 0.5 + index * 0.2
                        }
                    }}
                />
            </div>
            <motion.div
                className="absolute left-0 text-white font-bold text-sm mt-1"
                initial={{ opacity: 0 }}
                whileInView={{ 
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                        delay: 0.8 + index * 0.2
                    }
                }}
                style={{ left: `${level}%`, transform: 'translateX(-50%)' }}
            >
                
            </motion.div>
        </div>
    );
};

// SkillsSection Component
const SkillsSection = () => {
    return (
        <Section>
            <motion.div whileInView={"visible"}>
                <h2 className='text-5xl font-bold text-gray-200 border-b-4 border-white pb-2'>Skills</h2>
                <div className='mt-8 space-y-6'>
                    {Skills.map((skill, index) => (
                        <ProgressBar 
                            key={index} 
                            title={skill.title} 
                            level={skill.level} 
                            index={index} 
                        />
                    ))}
                </div>
            </motion.div>
            <motion.div whileInView={'visible'}>
                <h2 className='text-5xl font-bold mt-16 text-gray-200 border-b-4 border-white pb-2'>Languages</h2>
                <div className='mt-8 space-y-6'>
                    {Languages.map((language, index) => (
                        <ProgressBar 
                            key={index} 
                            title={language.title} 
                            level={language.level} 
                            index={index} 
                        />
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};




const ContactSection = () => {
    return (
        <Section>
            <h2 className='text-5xl font-bold'>Contact Me</h2>
            <div className='mt-8 p-8 rounded-md bg-white w-96 max-w-full'>
                <form>
                    <label for="name" className='font-medium text-gray-900 block mb-1'>
                        Name
                    </label>
                    <input
                    type='text'
                    name='name'
                    id='name'
                    className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-black-600'
                    />
                      <label for="email" className='font-medium text-gray-900 block mb-1'>
                        Email
                    </label>
                    <input
                    type='text'
                    name='email'
                    id='email'
                    className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-black-600'
                    />
                      <label for="message" className='font-medium text-gray-900 block mb-1'>
                        Message
                    </label>
                    <input
                    type='text'
                    name='message'
                    id='message'
                    className='block w-full h-52 rounded-md border-0 text-gray-200 shadow-sm ring-1 ring-inset ring-black-600'
                    />
                    <button className='bg-blue-600 rounded-lg text-white p-3 mt-5 font-bold text-2xl'>
                        Submit
                    </button>

                </form>
            </div>
        </Section>
    )
}

export const Interface = () => {
    return (
        <>
            <div className='flex flex-col items-center w-screen'>
                <AboutSection />
                <SkillsSection />
                <Section>
                    <h1>Projects</h1>
                </Section>
                <ContactSection />
            </div>
        </>
    );
}


