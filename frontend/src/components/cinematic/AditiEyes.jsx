import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    motion
} from "motion/react";


function AditiEyes() {

    const [blink, setBlink] = useState(false);

    const idleBlinkTimer = useRef(null);
    const blinkTimer = useRef(null);


    useEffect(() => {

        let cancelled = false;


        const performBlink = () => {

            if (cancelled) {
                return;
            }

            setBlink(true);

            blinkTimer.current = setTimeout(() => {

                if (!cancelled) {
                    setBlink(false);
                }

            }, 120);
        };


        const scheduleNextBlink = () => {

            const delay =
                4000 +
                Math.random() * 4000;

            idleBlinkTimer.current = setTimeout(() => {

                performBlink();
                scheduleNextBlink();

            }, delay);
        };


        const firstBlinkTimer = setTimeout(() => {

            performBlink();
            scheduleNextBlink();

        }, 700);


        return () => {

            cancelled = true;

            clearTimeout(firstBlinkTimer);
            clearTimeout(idleBlinkTimer.current);
            clearTimeout(blinkTimer.current);
        };

    }, []);


    return (

        <div className="aditi-eyes-svg-wrapper">

            <svg
                className="aditi-eyes-svg"
                viewBox="0 0 1200 430"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="ADITI visual perception interface"
            >

                <defs>

                    <filter
                        id="aditiPinkGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >

                        <feGaussianBlur
                            stdDeviation="3"
                            result="blur"
                        />

                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>

                    </filter>


                    <filter
                        id="aditiCyanGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >

                        <feGaussianBlur
                            stdDeviation="2.2"
                            result="blur"
                        />

                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>

                    </filter>

                </defs>


                {/* =========================================
                    LEFT EYE
                ========================================= */}

                <g>

                    {/* UPPER LID — THIS NOW BLINKS */}

                    <motion.path
    d="
        M 75 218
        C 130 185,
          177 128,
          255 105
        C 334 81,
          417 108,
          493 169
        C 511 184,
          526 201,
          540 218
    "

    className="eye-main-line"

    initial={{
        pathLength: 0,
        opacity: 0
    }}

    animate={{
                            pathLength: 1,
                            opacity: 1,

                            d: blink
                                ? `
                                    M 75 218
                                    C 175 214,
                                      300 216,
                                      420 216
                                    C 470 216,
                                      510 217,
                                      540 218
                                `
                                : `
                                    M 75 218
                                    C 130 185,
                                      177 128,
                                      255 105
                                    C 334 81,
                                      417 108,
                                      493 169
                                    C 511 184,
                                      526 201,
                                      540 218
                                `
                        }}

                        transition={{
                            pathLength: {
                                duration: 0.5
                            },

                            opacity: {
                                duration: 0.2
                            },

                            d: {
                                duration: blink
                                    ? 0.07
                                    : 0.11,

                                ease: "easeInOut"
                            }
                        }}
                    />


                    {/* LOWER LID */}

                    <motion.path
                        d="
                            M 78 219
                            C 137 253,
                              196 277,
                              276 282
                            C 367 288,
                              458 259,
                              540 218
                        "

                        className="eye-secondary-line"

                        initial={{
                            pathLength: 0,
                            opacity: 0
                        }}

                        animate={{
                            pathLength: 1,
                            opacity: 1
                        }}

                        transition={{
                            duration: 0.5,
                            delay: 0.02,
                            ease: "easeOut"
                        }}
                    />


                    {/* IRIS */}

                    <motion.ellipse
                        cx="320"
                        cy="191"

                        rx="68"
                        ry="70"

                        className="eye-iris"

                        initial={{
                            opacity: 0,
                            scale: 0.85
                        }}

                        animate={{
                            opacity: blink ? 0 : 1,
                            scale: blink ? 0.95 : 1
                        }}

                        transition={{
                            opacity: {
                                duration: 0.035
                            },

                            scale: {
                                duration: 0.08
                            }
                        }}

                        style={{
                            transformOrigin: "320px 191px"
                        }}
                    />


                    {/* IRIS RING 1 */}

                    <motion.ellipse
                        cx="320"
                        cy="191"

                        rx="51"
                        ry="54"

                        className="eye-iris-inner"

                        initial={{
                            opacity: 0
                        }}

                        animate={{
                            opacity: blink ? 0 : 1
                        }}

                        transition={{
                            duration: 0.04
                        }}
                    />


                    {/* IRIS RING 2 */}

                    <motion.ellipse
                        cx="320"
                        cy="191"

                        rx="34"
                        ry="36"

                        className="
                            eye-iris-inner
                            eye-iris-inner-faint
                        "

                        initial={{
                            opacity: 0
                        }}

                        animate={{
                            opacity: blink ? 0 : 1
                        }}

                        transition={{
                            duration: 0.04
                        }}
                    />


                    {/* PUPIL */}

                    <motion.ellipse
                        cx="320"
                        cy="191"

                        rx="22"
                        ry="29"

                        className="eye-pupil"

                        initial={{
                            opacity: 0,
                            scale: 0.75
                        }}

                        animate={{
                            opacity: blink ? 0 : 1,
                            scale: blink ? 0.9 : 1
                        }}

                        transition={{
                            duration: 0.04
                        }}

                        style={{
                            transformOrigin: "320px 191px"
                        }}
                    />


                    {/* HIGHLIGHT */}

                    <motion.circle
                        cx="301"
                        cy="168"

                        r="7"

                        className="eye-highlight"

                        animate={{
                            opacity: blink ? 0 : 0.82
                        }}

                        transition={{
                            duration: 0.035
                        }}
                    />


                    {/* LASHES FOLLOW THE UPPER LID */}

                    <motion.g
                        className="eye-lashes"

                        animate={{
                            y: blink ? 50 : 0,
                            opacity: 1
                        }}

                        transition={{
                            duration: blink
                                ? 0.07
                                : 0.11,

                            ease: "easeInOut"
                        }}
                    >

                        <path d="M 142 161 L 116 121" />
                        <path d="M 178 132 L 158 87" />
                        <path d="M 220 112 L 210 64" />
                        <path d="M 264 101 L 262 53" />
                        <path d="M 307 97 L 314 53" />

                    </motion.g>

                </g>


                {/* =========================================
                    RIGHT EYE
                ========================================= */}

                <g>

                    {/* UPPER LID — THIS NOW BLINKS */}

                    <motion.path
    d="
        M 658 216
        C 704 175,
          765 130,
          842 109
        C 930 84,
          1027 110,
          1091 169
        C 1111 187,
          1128 205,
          1142 221
    "

    className="eye-main-line"

    initial={{
        pathLength: 0,
        opacity: 0
    }}

    animate={{
                            pathLength: 1,
                            opacity: 1,

                            d: blink
                                ? `
                                    M 658 216
                                    C 775 214,
                                      890 216,
                                      1010 216
                                    C 1060 216,
                                      1105 218,
                                      1142 221
                                `
                                : `
                                    M 658 216
                                    C 704 175,
                                      765 130,
                                      842 109
                                    C 930 84,
                                      1027 110,
                                      1091 169
                                    C 1111 187,
                                      1128 205,
                                      1142 221
                                `
                        }}

                        transition={{
                            pathLength: {
                                duration: 0.5
                            },

                            opacity: {
                                duration: 0.2
                            },

                            d: {
                                duration: blink
                                    ? 0.07
                                    : 0.11,

                                ease: "easeInOut"
                            }
                        }}
                    />


                    {/* LOWER LID */}

                    <motion.path
                        d="
                            M 658 216
                            C 718 257,
                              786 278,
                              870 282
                            C 973 286,
                              1060 260,
                              1142 221
                        "

                        className="eye-secondary-line"

                        initial={{
                            pathLength: 0,
                            opacity: 0
                        }}

                        animate={{
                            pathLength: 1,
                            opacity: 1
                        }}

                        transition={{
                            duration: 0.5,
                            delay: 0.025,
                            ease: "easeOut"
                        }}
                    />


                    {/* IRIS */}

                    <motion.ellipse
                        cx="873"
                        cy="187"

                        rx="65"
                        ry="67"

                        className="eye-iris"

                        initial={{
                            opacity: 0,
                            scale: 0.85
                        }}

                        animate={{
                            opacity: blink ? 0 : 1,
                            scale: blink ? 0.95 : 1
                        }}

                        transition={{
                            opacity: {
                                duration: 0.035
                            },

                            scale: {
                                duration: 0.08
                            }
                        }}

                        style={{
                            transformOrigin: "873px 187px"
                        }}
                    />


                    {/* IRIS RING 1 */}

                    <motion.ellipse
                        cx="873"
                        cy="187"

                        rx="49"
                        ry="52"

                        className="eye-iris-inner"

                        animate={{
                            opacity: blink ? 0 : 1
                        }}

                        transition={{
                            duration: 0.04
                        }}
                    />


                    {/* IRIS RING 2 */}

                    <motion.ellipse
                        cx="873"
                        cy="187"

                        rx="33"
                        ry="35"

                        className="
                            eye-iris-inner
                            eye-iris-inner-faint
                        "

                        animate={{
                            opacity: blink ? 0 : 1
                        }}

                        transition={{
                            duration: 0.04
                        }}
                    />


                    {/* PUPIL */}

                    <motion.ellipse
                        cx="873"
                        cy="187"

                        rx="22"
                        ry="28"

                        className="eye-pupil"

                        animate={{
                            opacity: blink ? 0 : 1,
                            scale: blink ? 0.9 : 1
                        }}

                        transition={{
                            duration: 0.04
                        }}

                        style={{
                            transformOrigin: "873px 187px"
                        }}
                    />


                    {/* HIGHLIGHT */}

                    <motion.circle
                        cx="855"
                        cy="165"

                        r="7"

                        className="eye-highlight"

                        animate={{
                            opacity: blink ? 0 : 0.82
                        }}

                        transition={{
                            duration: 0.035
                        }}
                    />


                    {/* LASHES FOLLOW THE UPPER LID */}

                    <motion.g
                        className="eye-lashes"

                        animate={{
                            y: blink ? 48 : 0,
                            opacity: 1
                        }}

                        transition={{
                            duration: blink
                                ? 0.07
                                : 0.11,

                            ease: "easeInOut"
                        }}
                    >

                        <path d="M 1065 144 L 1087 102" />
                        <path d="M 1025 119 L 1039 74" />
                        <path d="M 981 103 L 987 58" />
                        <path d="M 938 96 L 936 51" />

                    </motion.g>

                </g>


                {/* =========================================
                    EDGE MARKS
                ========================================= */}

                <motion.g
                    className="eye-tech-marks"

                    initial={{
                        opacity: 0
                    }}

                    animate={{
                        opacity: 1
                    }}

                    transition={{
                        duration: 0.22,
                        delay: 0.1
                    }}
                >

                    <path d="M 45 215 L 68 215" />
                    <path d="M 1150 222 L 1178 222" />

                    <circle
                        cx="44"
                        cy="215"
                        r="2"
                    />

                    <circle
                        cx="1180"
                        cy="222"
                        r="2"
                    />

                </motion.g>

            </svg>

        </div>

    );
}


export default AditiEyes;