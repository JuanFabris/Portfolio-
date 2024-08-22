import React from 'react'
import {motion} from 'framer-motion'

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
    return (
        <Section>
            <h1 className='text-6xl font-extrabold leading-snug'>
                Hi, I'm
                <br />
                <span className='bg-white px-1 italic'>Gianluigi Lucca Fabris</span>
            </h1>
            <motion.p className='text-lg text-gray-600 mt-4'
            initial = {{
                opacity : 0,
                y : 25
            }}
            whileInView={{
                opacity : 1,
                y : 0,
                transition : {
                    duration : 1,
                    delay : 1.3
                }
            }}>
                I'm a junior web developer aiming to
                <br />
                become a Full Stack software engineer
            </motion.p>
            <motion.button className='bg-blue-600 rounded-lg text-white p-3 mt-5 font-bold text-2xl'
            initial = {{
                opacity : 0,
                y : 20
            }}
            whileInView={{
                opacity : 1,
                y : 0,
                transition : {
                    duration : 1,
                    delay : 1.8
                }
            }}>Contact Me</motion.button>
        </Section>
    );
}

const Skills = [
    {
        title : "Threejs / 3RF",
        level : 75
    },
    {
        title : "React / React Native",
        level : 80
    },
    {
        title : "Tailwind CSS",
        level : 70
    },
    {
        title : "Javascript",
        level : 80
    },
    {
        title : "Node.js",
        level : 60
    }
]

const Lenguages = [
    {
        title : "Italian",
        level : 100
    },
    {
        title : "Spanish",
        level : 100
    },
    {
        title : "English",
        level : 90
    }
]

const SkillsSection = () => {
    return (
        <Section>
          <motion.div whileInView={"visible"}>
                <h2 className='text-5xl font-bold'>Skills</h2>
                <div className='mt-8 space-y-4'>
                    {Skills.map((skill, index) => 
                        <div className='w-64' key={index}>
                            <motion.h3 className='text-xl font-bold text-gray-800'
                            initial = {{
                                opacity : 0,
                            }}
                            variants={{
                                visible : {
                                    opacity : 1,
                                    transition : {
                                        duration : 1,
                                        delay : 0.5 + index * 0.2
                                    }
                                }
                            }}
                            >{skill.title}</motion.h3>
                            <div className='h-2 w-full bg-gray-400 rounded-full mt-2'>
                                <motion.div className='h-full bg-indigo-500 rounded-full border-x-black' 
                                     style={{ width: `${skill.level}%` }}
                                    initial = {{
                                        scaleX : 0,
                                        originX : 0
                                    }}
                                    variants={{
                                        visible : {
                                            scaleX : 1,
                                            transition : {
                                                duration : 1,
                                                delay : 0.5 + index * 0.2
                                            }
                                        }
                                    }}
                                    >
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
          <motion.div whileInView={'visible'}>
                <h2 className='text-5xl font-bold mt-16'>Lenguages</h2>
                <div className='mt-8 space-y-4'>
                    {Lenguages.map((lenguage, index) => 
                        <div className='w-64' key={index}>
                            <motion.h3 className='text-xl font-bold text-gray-800'
                            initial = {{
                                opacity : 0,
                            }}
                            variants={{
                                visible : {
                                    opacity : 1,
                                    transition : {
                                        duration : 1,
                                        delay : 0.5 + index * 0.2
                                    }
                                }
                               
                            }}
                            >{lenguage.title}</motion.h3>
                            <div className='h-2 w-full bg-gray-400 rounded-full mt-2'>
                                <motion.div className='h-full bg-indigo-500 rounded-full' 
                                    style={{ width: `${lenguage.level}%` }}
                                    initial = {{
                                        scaleX : 0,
                                        originX : 0
                                    }}
                                    variants={{
                                        visible : {
                                            scaleX : 1,
                                            transition : {
                                                duration : 1,
                                                delay : 0.5 + index * 0.2
                                            }
                                        }
                                    }}
                                >
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </Section>
    )
}

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
                    className='block w-full h-52 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-black-600'
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


