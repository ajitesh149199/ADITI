import { motion } from "motion/react";

import {
    Target,
    Layers3,
    Filter,
    ShieldCheck,
    GitMerge,
    EyeOff,
    Cpu,
    Radio
} from "lucide-react";

import "./AditiSystemIntro.css";


const modules = [
    {
        number: "01",
        key: "objective_manager",
        name: "OBJECTIVE",
        type: "MANAGER",
        icon: Target
    },
    {
        number: "02",
        key: "context_manager",
        name: "CONTEXT",
        type: "MANAGER",
        icon: Layers3
    },
    {
        number: "03",
        key: "relevance_engine",
        name: "RELEVANCE",
        type: "ENGINE",
        icon: Filter
    },
    {
        number: "04",
        key: "reliability_engine",
        name: "RELIABILITY",
        type: "ENGINE",
        icon: ShieldCheck
    },
    {
        number: "05",
        key: "fusion_engine",
        name: "FUSION",
        type: "ENGINE",
        icon: GitMerge
    },
    {
        number: "06",
        key: "suppression_engine",
        name: "SUPPRESSION",
        type: "ENGINE",
        icon: EyeOff
    },
    {
        number: "07",
        key: "model_orchestrator",
        name: "ORCHESTRATION",
        type: "ENGINE",
        icon: Cpu
    },
    {
        number: "08",
        key: "output_manager",
        name: "OUTPUT",
        type: "MANAGER",
        icon: Radio
    }
];


function AditiSystemIntro({
    systemStatus
}) {

    const getRawModuleState = (
        moduleKey
    ) => {

        if (!systemStatus) {
            return null;
        }

        /*
        Supports both:

        systemStatus.objective_manager

        and:

        systemStatus.modules.objective_manager
        */

        if (
            systemStatus.modules &&
            systemStatus.modules[moduleKey] !==
            undefined
        ) {
            return (
                systemStatus.modules[
                    moduleKey
                ]
            );
        }

        return (
            systemStatus[moduleKey]
        );
    };


    const getModuleStatus = (
        moduleKey
    ) => {

        if (!systemStatus) {
            return {
                label: "CONNECTING",
                className: "connecting",
                signal: "// WAIT"
            };
        }


        const rawState =
            getRawModuleState(
                moduleKey
            );


        if (
            rawState === true
        ) {
            return {
                label: "ACTIVE",
                className: "active",
                signal: "// READY"
            };
        }


        if (
            typeof rawState ===
            "string"
        ) {

            const normalizedState =
                rawState
                    .toLowerCase()
                    .trim();


            if (
                [
                    "running",
                    "ready",
                    "online",
                    "active",
                    "ok"
                ].includes(
                    normalizedState
                )
            ) {
                return {
                    label: "ACTIVE",
                    className: "active",
                    signal: "// READY"
                };
            }
        }


        if (
            rawState &&
            typeof rawState ===
            "object"
        ) {

            const value =
                rawState.status ??
                rawState.state ??
                rawState.ready;


            if (
                value === true
            ) {
                return {
                    label: "ACTIVE",
                    className: "active",
                    signal: "// READY"
                };
            }


            if (
                typeof value ===
                "string"
            ) {

                const normalizedValue =
                    value
                        .toLowerCase()
                        .trim();


                if (
                    [
                        "running",
                        "ready",
                        "online",
                        "active",
                        "ok"
                    ].includes(
                        normalizedValue
                    )
                ) {
                    return {
                        label: "ACTIVE",
                        className: "active",
                        signal: "// READY"
                    };
                }
            }
        }


        return {
            label: "OFFLINE",
            className: "offline",
            signal: "// CHECK"
        };
    };


    const activeModuleCount =
        modules.filter(
            (module) => {

                const status =
                    getModuleStatus(
                        module.key
                    );

                return (
                    status.className ===
                    "active"
                );
            }
        ).length;


    const totalModules =
        modules.length;


    const systemOnline =
        Boolean(
            systemStatus
        ) &&
        activeModuleCount ===
            totalModules;


    const systemConnecting =
        !systemStatus;


    const coreStatusText =
        systemConnecting
            ? "ADITI CORE CONNECTING"
            : systemOnline
                ? "ADITI CORE ONLINE"
                : "ADITI CORE DEGRADED";


    const systemStateClass =
        systemConnecting
            ? "connecting"
            : systemOnline
                ? "online"
                : "degraded";


    return (

        <section
            className="aditi-system-intro"
        >

            {/* =========================================
                BACKGROUND
            ========================================= */}

            <div
                className="system-intro-grid"
            />

            <div
                className="
                    system-intro-glow
                    system-intro-glow-pink
                "
            />

            <div
                className="
                    system-intro-glow
                    system-intro-glow-cyan
                "
            />


            {/* =========================================
                CORE STATUS
            ========================================= */}

            <motion.div
                className={`
                    system-intro-status
                    ${systemStateClass}
                `}

                initial={{
                    opacity: 0,
                    y: 18
                }}

                whileInView={{
                    opacity: 1,
                    y: 0
                }}

                viewport={{
                    once: false,
                    amount: 0.5
                }}

                transition={{
                    duration: 0.55
                }}
            >

                <span
                    className="
                        system-intro-dot
                    "
                />

                {coreStatusText}

            </motion.div>


            {/* =========================================
                MAIN HEADING
            ========================================= */}

            <motion.div
                className="
                    system-intro-heading
                "

                initial={{
                    opacity: 0,
                    y: 40
                }}

                whileInView={{
                    opacity: 1,
                    y: 0
                }}

                viewport={{
                    once: false,
                    amount: 0.35
                }}

                transition={{
                    duration: 0.8,
                    ease: [
                        0.215,
                        0.61,
                        0.355,
                        1
                    ]
                }}
            >

                <span
                    className="
                        system-initialized-label
                    "
                >
                    SYSTEM INITIALIZED
                </span>


                <h2>

                    <span
                        className="
                            intro-word
                            intro-word-pink
                        "
                    >
                        Perception.
                    </span>

                    <span
                        className="
                            intro-word
                        "
                    >
                        Relevance.
                    </span>

                    <span
                        className="
                            intro-word
                        "
                    >
                        Decision.
                    </span>

                </h2>


                <p>

                    ADITI processes multimodal
                    information, evaluates what
                    matters, suppresses unnecessary
                    data and selects only the
                    feedback required for the
                    current objective.

                </p>

            </motion.div>


            {/* =========================================
                ARCHITECTURE LABEL
            ========================================= */}

            <motion.div
                className="
                    architecture-heading
                "

                initial={{
                    opacity: 0,
                    y: 20
                }}

                whileInView={{
                    opacity: 1,
                    y: 0
                }}

                viewport={{
                    once: false,
                    amount: 0.4
                }}

                transition={{
                    duration: 0.55
                }}
            >

                <div>

                    <span
                        className="
                            architecture-kicker
                        "
                    >
                        ADITI ARCHITECTURE
                    </span>

                    <h3>
                        Processing Core
                    </h3>

                </div>


                <span
                    className="
                        architecture-count
                    "
                >
                    {
                        String(
                            activeModuleCount
                        ).padStart(
                            2,
                            "0"
                        )
                    }
                    /
                    {
                        String(
                            totalModules
                        ).padStart(
                            2,
                            "0"
                        )
                    }
                    {" "}
                    ACTIVE
                </span>

            </motion.div>


            {/* =========================================
                GLASS MODULE CARDS
            ========================================= */}

            <div
                className="
                    system-intro-modules
                "
            >

                {modules.map(
                    (
                        module,
                        index
                    ) => {

                        const Icon =
                            module.icon;


                        const status =
                            getModuleStatus(
                                module.key
                            );


                        return (

                            <motion.article
                                key={
                                    module.key
                                }

                                className={`
                                    system-module
                                    module-${status.className}
                                `}

                                initial={{
                                    opacity: 0,
                                    y: 28,
                                    scale: 0.985
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1
                                }}

                                viewport={{
                                    once: false,
                                    amount: 0.25
                                }}

                                transition={{
                                    duration: 0.55,

                                    delay:
                                        index *
                                        0.055,

                                    ease: [
                                        0.215,
                                        0.61,
                                        0.355,
                                        1
                                    ]
                                }}
                            >

                                <div
                                    className="
                                        module-card-top
                                    "
                                >

                                    <span
                                        className="
                                            module-number
                                        "
                                    >
                                        {
                                            module.number
                                        }
                                    </span>


                                    <div
                                        className="
                                            module-icon
                                        "
                                    >

                                        <Icon
                                            size={21}
                                            strokeWidth={
                                                1.6
                                            }
                                        />

                                    </div>

                                </div>


                                <div
                                    className="
                                        module-card-main
                                    "
                                >

                                    <span
                                        className="
                                            module-name
                                        "
                                    >
                                        {
                                            module.name
                                        }
                                    </span>


                                    <span
                                        className="
                                            module-type
                                        "
                                    >
                                        {
                                            module.type
                                        }
                                    </span>

                                </div>


                                <div
                                    className="
                                        module-card-bottom
                                    "
                                >

                                    <div
                                        className={`
                                            module-state
                                            ${status.className}
                                        `}
                                    >

                                        <span
                                            className="
                                                module-state-dot
                                            "
                                        />

                                        {
                                            status.label
                                        }

                                    </div>


                                    <span
                                        className={`
                                            module-signal
                                            ${status.className}
                                        `}
                                    >
                                        {
                                            status.signal
                                        }
                                    </span>

                                </div>

                            </motion.article>

                        );
                    }
                )}

            </div>


            {/* =========================================
                ENTER DASHBOARD
            ========================================= */}

            <motion.div
                className="
                    system-intro-enter
                "

                initial={{
                    opacity: 0,
                    y: 15
                }}

                whileInView={{
                    opacity: 1,
                    y: 0
                }}

                viewport={{
                    once: false,
                    amount: 0.65
                }}

                transition={{
                    duration: 0.6
                }}
            >

                <span>

                    {
                        systemConnecting
                            ? "ESTABLISHING CORE CONNECTION"
                            : systemOnline
                                ? "ENTERING CONTROL INTERFACE"
                                : "CONTROL INTERFACE — LIMITED STATUS"
                    }

                </span>

                <div
                    className="
                        system-enter-line
                    "
                />

            </motion.div>

        </section>

    );
}


export default AditiSystemIntro;