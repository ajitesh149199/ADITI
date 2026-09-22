import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    motion
} from "motion/react";


function AditiEyes() {

    const [blink, setBlink] =
        useState(false);

    const timeoutRef =
        useRef(null);


    useEffect(() => {

        let cancelled =
            false;


        const performBlink = () => {

            if (cancelled) {
                return;
            }


            setBlink(true);


            setTimeout(() => {

                if (!cancelled) {
                    setBlink(false);
                }

            }, 170);
        };


        const scheduleBlink = () => {

            const delay =
                4000 +
                Math.random() * 4000;


            timeoutRef.current =
                setTimeout(() => {

                    performBlink();

                    scheduleBlink();

                }, delay);
        };


        const firstBlink =
            setTimeout(() => {

                performBlink();

                scheduleBlink();

            }, 1100);


        return () => {

            cancelled =
                true;

            clearTimeout(
                firstBlink
            );

            clearTimeout(
                timeoutRef.current
            );

        };

    }, []);


    return (

        <div className="aditi-eyes-svg-wrapper">

            <svg
                className="aditi-eyes-svg"
                viewBox="0 0 1200 430"
                role="img"
                aria-label="ADITI visual perception interface"
            >

                <defs>

                    <filter id="aditiPinkGlow">

                        <feGaussianBlur
                            stdDeviation="3"
                            result="blur"
                        />

                        <feMerge>

                            <feMergeNode
                                in="blur"
                            />

                            <feMergeNode
                                in="SourceGraphic"
                            />

                        </feMerge>

                    </filter>


                    <filter id="aditiCyanGlow">

                        <feGaussianBlur
                            stdDeviation="2.2"
                            result="blur"
                        />

                        <feMerge>

                            <feMergeNode
                                in="blur"
                            />

                            <feMergeNode
                                in="SourceGraphic"
                            />

                        </feMerge>

                    </filter>

                </defs>


                {/* =================================
                    LEFT EYE
                ================================= */}


                <g>

                    {/* Main upper eyelid */}

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
                            opacity: 1
                        }}
                        transition={{
                            duration: 1.05,
                            ease:
                                [0.215, 0.61, 0.355, 1]
                        }}
                    />


                    {/* Lower eyelid */}

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
                            pathLength: 0
                        }}
                        animate={{
                            pathLength: 1
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.08
                        }}
                    />


                    {/* Sketch upper accent */}

                    <motion.path
                        d="
                        M 105 189
                        C 165 122,
                          245 86,
                          331 94
                        C 400 99,
                          455 128,
                          501 165
                        "
                        className="eye-sketch-line"
                        initial={{
                            pathLength: 0
                        }}
                        animate={{
                            pathLength: 1
                        }}
                        transition={{
                            duration: 1.1,
                            delay: 0.16
                        }}
                    />


                    {/* Lower sketch */}

                    <motion.path
                        d="
                        M 128 253
                        C 206 307,
                          353 321,
                          472 267
                        "
                        className="eye-cyan-sketch"
                        initial={{
                            pathLength: 0
                        }}
                        animate={{
                            pathLength: 1
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.28
                        }}
                    />


                    {/* Iris */}

                    <motion.ellipse
                        cx="320"
                        cy="191"

                        rx="68"
                        ry={
                            blink
                                ? 4
                                : 70
                        }

                        className="eye-iris"

                        animate={{
                            opacity:
                                blink
                                    ? 0
                                    : 1
                        }}

                        transition={{
                            duration: 0.08
                        }}
                    />


                    {/* Iris sketch rings */}

                    {!blink && (

                        <>

                            <ellipse
                                cx="320"
                                cy="191"
                                rx="52"
                                ry="55"
                                className="eye-iris-inner"
                            />

                            <ellipse
                                cx="320"
                                cy="191"
                                rx="34"
                                ry="37"
                                className="eye-iris-inner faint"
                            />

                        </>

                    )}


                    {/* Pupil */}

                    <motion.ellipse
                        cx="320"
                        cy="191"

                        rx="23"

                        ry={
                            blink
                                ? 1
                                : 29
                        }

                        className="eye-pupil"

                        animate={{
                            opacity:
                                blink
                                    ? 0
                                    : 1
                        }}
                    />


                    {/* Reflection */}

                    {!blink && (

                        <circle
                            cx="301"
                            cy="168"
                            r="7"
                            className="eye-highlight"
                        />

                    )}


                    {/* Blinking upper lid */}

                    <motion.path
                        d="
                        M 76 218
                        C 175 126,
                          302 80,
                          430 125
                        C 479 143,
                          515 182,
                          540 218
                        "
                        fill="#000000"

                        animate={{
                            d: blink

                                ? `
                                M 76 218
                                C 190 214,
                                  305 217,
                                  422 217
                                C 468 217,
                                  505 218,
                                  540 218
                                `

                                : `
                                M 76 218
                                C 175 126,
                                  302 80,
                                  430 125
                                C 479 143,
                                  515 182,
                                  540 218
                                `
                        }}

                        transition={{
                            duration:
                                blink
                                    ? 0.08
                                    : 0.14,

                            ease:
                                "easeInOut"
                        }}
                    />


                    {/* Lashes */}

                    <g className="eye-lashes">

                        <path
                            d="
                            M 142 161
                            L 116 121
                            "
                        />

                        <path
                            d="
                            M 178 132
                            L 158 87
                            "
                        />

                        <path
                            d="
                            M 220 112
                            L 210 64
                            "
                        />

                        <path
                            d="
                            M 264 101
                            L 262 53
                            "
                        />

                        <path
                            d="
                            M 307 97
                            L 314 53
                            "
                        />

                    </g>

                </g>



                {/* =================================
                    RIGHT EYE
                ================================= */}


                <g>

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
                            opacity: 1
                        }}
                        transition={{
                            duration: 1.08,
                            delay: 0.04
                        }}
                    />


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
                            pathLength: 0
                        }}
                        animate={{
                            pathLength: 1
                        }}
                        transition={{
                            duration: 1.05,
                            delay: 0.1
                        }}
                    />


                    <motion.path
                        d="
                        M 690 180
                        C 755 120,
                          834 91,
                          920 95
                        C 996 99,
                          1054 128,
                          1105 168
                        "
                        className="eye-sketch-line"
                        initial={{
                            pathLength: 0
                        }}
                        animate={{
                            pathLength: 1
                        }}
                        transition={{
                            duration: 1.1,
                            delay: 0.18
                        }}
                    />


                    <motion.path
                        d="
                        M 704 250
                        C 792 308,
                          949 318,
                          1098 262
                        "
                        className="eye-cyan-sketch"
                        initial={{
                            pathLength: 0
                        }}
                        animate={{
                            pathLength: 1
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3
                        }}
                    />


                    <motion.ellipse
                        cx="873"
                        cy="187"

                        rx="65"

                        ry={
                            blink
                                ? 4
                                : 67
                        }

                        className="eye-iris"

                        animate={{
                            opacity:
                                blink
                                    ? 0
                                    : 1
                        }}
                    />


                    {!blink && (

                        <>

                            <ellipse
                                cx="873"
                                cy="187"
                                rx="50"
                                ry="53"
                                className="eye-iris-inner"
                            />

                            <ellipse
                                cx="873"
                                cy="187"
                                rx="33"
                                ry="36"
                                className="eye-iris-inner faint"
                            />

                        </>

                    )}


                    <motion.ellipse
                        cx="873"
                        cy="187"

                        rx="22"

                        ry={
                            blink
                                ? 1
                                : 28
                        }

                        className="eye-pupil"

                        animate={{
                            opacity:
                                blink
                                    ? 0
                                    : 1
                        }}
                    />


                    {!blink && (

                        <circle
                            cx="855"
                            cy="165"
                            r="7"
                            className="eye-highlight"
                        />

                    )}


                    <motion.path
                        d="
                        M 658 216
                        C 759 129,
                          875 87,
                          1001 121
                        C 1057 136,
                          1105 180,
                          1142 221
                        "
                        fill="#000000"

                        animate={{
                            d: blink

                                ? `
                                M 658 216
                                C 775 214,
                                  890 217,
                                  1010 217
                                C 1060 218,
                                  1102 219,
                                  1142 221
                                `

                                : `
                                M 658 216
                                C 759 129,
                                  875 87,
                                  1001 121
                                C 1057 136,
                                  1105 180,
                                  1142 221
                                `
                        }}

                        transition={{
                            duration:
                                blink
                                    ? 0.08
                                    : 0.14,

                            ease:
                                "easeInOut"
                        }}
                    />


                    <g className="eye-lashes">

                        <path
                            d="
                            M 1065 144
                            L 1087 102
                            "
                        />

                        <path
                            d="
                            M 1025 119
                            L 1039 74
                            "
                        />

                        <path
                            d="
                            M 981 103
                            L 987 58
                            "
                        />

                        <path
                            d="
                            M 938 96
                            L 936 51
                            "
                        />

                    </g>

                </g>


                {/* Small floating technical marks */}

                <g className="eye-tech-marks">

                    <path
                        d="
                        M 45 215
                        L 68 215
                        "
                    />

                    <path
                        d="
                        M 1150 222
                        L 1178 222
                        "
                    />

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

                </g>

            </svg>

        </div>

    );
}


export default AditiEyes;