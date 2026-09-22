import {
    useRef
} from "react";


import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform
} from "motion/react";


import AditiEyes
from "./AditiEyes";


import AditiParticles
from "./AditiParticles";


import "./AditiHero.css";



function AditiHero() {

    const heroRef =
        useRef(null);


    /*
        Temporarily false while developing.

        Later we will restore:

        const reduceMotion =
            useReducedMotion();
    */

    const reduceMotion =
        false;


    const {
        scrollYProgress
    } = useScroll({

        target:
            heroRef,

        offset: [
            "start start",
            "end start"
        ]

    });


    const progress =
        scrollYProgress;



    /* =====================================
       ADITI TITLE
    ===================================== */


    const titleOpacity =
    useTransform(
        progress,
        [0, 0.08, 0.15, 0.22],
        [1, 1, 0.35, 0]
    );

    const titleScale =
    useTransform(
        progress,
        [0, 0.22],
        [1, 0.96]
    );

    const titleBlur =
    useTransform(
        progress,
        [0.08, 0.22],
        ["blur(0px)", "blur(18px)"]
    );

    const titleLetterSpacing =
    useTransform(
        progress,
        [0.05, 0.20],
        ["0.22em", "0.34em"]
    );


    /* =====================================
       EYES
    ===================================== */


    const eyesOpacity =
    useTransform(
        progress,
        [0.22, 0.30, 0.70, 0.84],
        [0, 1, 1, 0]
    );

    const eyesScale =
    useTransform(
        progress,
        [0.22, 0.34],
        [0.92, 1]
    );


    /* =====================================
       SYSTEM ONLINE
    ===================================== */


    const systemOpacity =
    useTransform(
        progress,
        [0.82, 0.94],
        [0, 1]
    );

const systemY =
    useTransform(
        progress,
        [0.82, 0.94],
        [18, 0]
    );



    /* =====================================
       REDUCED MOTION VERSION
    ===================================== */


    if (reduceMotion) {

        return (

            <section
                className="
                    aditi-hero
                    reduced-motion
                "
            >

                <div
                    className="
                        aditi-hero-stage
                    "
                >

                    <div
                        className="
                            aditi-identity
                        "
                    >

                        <h1>
                            ADITI
                        </h1>

                        <p>
                            AI-Driven Data,
                            Information & Technology
                            Integration
                        </p>

                    </div>

                </div>

            </section>

        );

    }



    return (

        <section
            ref={heroRef}
            className="aditi-hero"
        >

            <div
                className="
                    aditi-hero-stage
                "
            >


                {/* BACKGROUND GRID */}

                <div
                    className="
                        aditi-grid
                    "
                />



                {/* =================================
                    ADITI
                ================================= */}


                <motion.div
                    className="
                        aditi-identity
                    "

                    style={{
                        opacity:
                            titleOpacity,

                        scale:
                            titleScale,

                        filter:
                            titleBlur
                    }}
                >

                    <motion.h1
                        style={{
                            letterSpacing:
                                titleLetterSpacing
                        }}
                    >

                        ADITI

                    </motion.h1>


                    <p>

                        AI-Driven Data,
                        Information & Technology
                        Integration

                    </p>

                </motion.div>



                {/* =================================
                    PARTICLES
                ================================= */}

                {/*
                <AditiParticles
                    progress={progress}
                />
                */}



                {/* =================================
                    EYES
                ================================= */}


                <motion.div
                    className="
                        aditi-eyes-stage
                    "

                    style={{
                        opacity:
                            eyesOpacity,

                        scale:
                            eyesScale
                    }}
                >

                    <AditiEyes />

                </motion.div>



                {/* =================================
                    SYSTEM ONLINE
                ================================= */}


                <motion.div
                    className="
                        aditi-system-online
                    "

                    style={{
                        opacity:
                            systemOpacity,

                        y:
                            systemY
                    }}
                >

                    <span
                        className="
                            system-dot
                        "
                    />

                    SYSTEM ONLINE

                </motion.div>



                {/* =================================
                    SCROLL
                ================================= */}


                <motion.div
                    className="
                        aditi-scroll-indicator
                    "

                    style={{
                        opacity:
                            titleOpacity
                    }}
                >

                    <span>

                        SCROLL TO INITIALIZE

                    </span>


                    <div
                        className="
                            scroll-line
                        "
                    />

                </motion.div>


            </div>

        </section>

    );

}


export default AditiHero;