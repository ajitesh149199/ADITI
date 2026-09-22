import {
    useEffect,
    useState
} from "react";


const sections = [

    {
        id: "intro",
        label: "INTRO"
    },

    {
        id: "control",
        label: "CONTROL"
    },

    {
        id: "vision",
        label: "VISION"
    },

    {
        id: "evaluation",
        label: "EVALUATION"
    },

    {
        id: "validation",
        label: "VALIDATION"
    },

    {
        id: "history",
        label: "HISTORY"
    },

    {
        id:"charts",
        label:"CHARTS"
    },

    {
        id: "summary",
        label: "SUMMARY"
    },

    {
        id:"final_demonstration",
        label:"FINAL DEMO"
    },

    {
        id: "sensors",
        label: "SENSORS"
    },

    {
        id: "output",
        label: "OUTPUT"
    },

    {
        id: "decision",
        label: "DECISION"
    },

    {
        id: "models",
        label: "MODELS"
    },

    {
        id: "resources",
        label: "RESOURCES"
    }

];


function DesktopScrollNavigator() {

    const [activeSection, setActiveSection] =
        useState("intro");

    const [scrollPercent, setScrollPercent] =
        useState(0);


    useEffect(() => {

        function handleScroll() {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percent =
                documentHeight > 0
                    ? Math.round(
                        (scrollTop / documentHeight) * 100
                    )
                    : 0;

            setScrollPercent(percent);


            let currentSection = "intro";

            for (const section of sections) {

                const element =
                    document.getElementById(
                        section.id
                    );

                if (!element) {
                    continue;
                }

                const rect =
                    element.getBoundingClientRect();

                if (rect.top <= window.innerHeight * 0.45) {
                    currentSection =
                        section.id;
                }
            }

            setActiveSection(
                currentSection
            );
        }


        handleScroll();


        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };

    }, []);


    function scrollToSection(id) {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    const activeIndex =
        sections.findIndex(
            (section) =>
                section.id === activeSection
        );


    return (

        <aside className="desktop-scroll-nav">

            <div className="scroll-nav-percent">
                {scrollPercent}%
            </div>


            <div className="scroll-nav-rail">

                <div
                    className="scroll-nav-progress"
                    style={{
                        height:
                            `${scrollPercent}%`
                    }}
                />


                {sections.map(
                    (section, index) => {

                        const isActive =
                            section.id ===
                            activeSection;

                        const isComplete =
                            index < activeIndex;

                        return (

                            <button
                                key={section.id}
                                className={
                                    [
                                        "scroll-nav-point",
                                        isActive
                                            ? "active"
                                            : "",
                                        isComplete
                                            ? "complete"
                                            : ""
                                    ]
                                        .filter(Boolean)
                                        .join(" ")
                                }
                                onClick={() =>
                                    scrollToSection(
                                        section.id
                                    )
                                }
                                type="button"
                                aria-label={
                                    `Scroll to ${section.label}`
                                }
                            >

                                <span className="scroll-nav-label">
                                    {section.label}
                                </span>

                                <span className="scroll-nav-dot" />

                            </button>

                        );
                    }
                )}

            </div>

        </aside>
    );
}


export default DesktopScrollNavigator;