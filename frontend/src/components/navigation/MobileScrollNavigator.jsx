import {
    useEffect,
    useState
} from "react";


const sections = [
    { id: "intro", label: "INTRO" },
    { id: "control", label: "CONTROL" },
    { id: "vision", label: "VISION" },
    { id: "evaluation", label: "EVALUATION" },
    { id: "validation", label: "VALIDATION" },
    { id: "history", label: "HISTORY" },
    { id: "charts", label: "CHARTS"},
    { id: "summary", label: "SUMMARY" },
    { id: "final_demonstration", label: "FINAL DEMO"},
    { id: "sensors", label: "SENSORS" },
    { id: "output", label: "OUTPUT" },
    { id: "decision", label: "DECISION" },
    { id: "models", label: "MODELS" },
    { id: "resources", label: "RESOURCES" }
];


function MobileScrollNavigator() {

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

                if (
                    rect.top <=
                    window.innerHeight * 0.38
                ) {
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


    const currentLabel =
        sections.find(
            (section) =>
                section.id === activeSection
        )?.label || "INTRO";


    return (

        <div className="mobile-scroll-nav">

            <div className="mobile-scroll-nav-inner">

                <div className="mobile-scroll-section">

                    <span className="mobile-scroll-prefix">
                        
                    </span>

                    <span className="mobile-scroll-label">
                        {currentLabel}
                    </span>

                </div>


                <div className="mobile-scroll-percent">
                    {scrollPercent}%
                </div>

            </div>


            <div className="mobile-scroll-track">

                <div
                    className="mobile-scroll-progress"
                    style={{
                        width:
                            `${scrollPercent}%`
                    }}
                />

            </div>

        </div>
    );
}


export default MobileScrollNavigator;