import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    motion,
    useScroll,
    useTransform
} from "framer-motion";

import {
    getDecision,
    getSystemStatus,
    getExperimentResults,
    getExperimentMetrics,
    getValidationSummary,
    runFullEvaluation
} from "../services/api";


/* =====================================================
   COMPONENTS
===================================================== */

import ScenarioControl
    from "../components/ScenarioControl";

import AditiDecision
    from "../components/AditiDecision";

import DetectionPanel
    from "../components/DetectionPanel";

import OutputStatus
    from "../components/OutputStatus";

import SensorStatus
    from "../components/SensorStatus";

import ModelStatus
    from "../components/ModelStatus";

import ResourceMonitor
    from "../components/ResourceMonitor";

import CameraView
    from "../components/CameraView";

import EvaluationPanel
    from "../components/EvaluationPanel";

import ScenarioEvaluation
    from "../components/ScenarioEvaluation";

import ValidationSummary
    from "../components/ValidationSummary";

import ExperimentHistory
    from "../components/ExperimentsHistory";

import EvaluationCharts
    from "../components/EvaluationCharts";

import FinalEvaluationSummary
    from "../components/FinalEvaluationSummary";

import DemoSummary
    from "../components/DemoSummary";

import AditiHero
    from "../components/cinematic/AditiHero";

import AditiSystemIntro
    from "../components/cinematic/AditiSystemIntro";

import DesktopScrollNavigator
    from "../components/navigation/DesktopScrollNavigator";

import MobileScrollNavigator
    from "../components/navigation/MobileScrollNavigator";

import ScrollReveal
    from "../components/ui/ScrollReveal";


function Dashboard() {

    /* =====================================================
       STATE
    ===================================================== */

    const [
        decision,
        setDecision
    ] = useState(null);

    const [
        systemStatus,
        setSystemStatus
    ] = useState(null);

    const [
        error,
        setError
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        refreshKey,
        setRefreshKey
    ] = useState(0);

    const [
        experimentResults,
        setExperimentResults
    ] = useState(null);

    const [
        experimentMetrics,
        setExperimentMetrics
    ] = useState(null);

    const [
        validationSummary,
        setValidationSummary
    ] = useState(null);

    const [
        evaluationRunning,
        setEvaluationRunning
    ] = useState(false);

    const [
        evaluationMessage,
        setEvaluationMessage
    ] = useState("");


    /* =====================================================
       REFERENCES
    ===================================================== */

    const dashboardRef =
        useRef(null);

    const loadingRef =
        useRef(false);


    /* =====================================================
       HERO → DASHBOARD REVEAL
    ===================================================== */

    const {
        scrollYProgress:
            dashboardScrollProgress
    } = useScroll({
        target: dashboardRef,
        offset: [
            "start end",
            "start 35%"
        ]
    });


    const dashboardOpacity =
        useTransform(
            dashboardScrollProgress,
            [0, 0.75],
            [0.35, 1]
        );


    const dashboardBlur =
        useTransform(
            dashboardScrollProgress,
            [0, 0.75],
            [
                "blur(12px)",
                "blur(0px)"
            ]
        );


    const dashboardScale =
        useTransform(
            dashboardScrollProgress,
            [0, 0.75],
            [
                0.985,
                1
            ]
        );


    const dashboardY =
        useTransform(
            dashboardScrollProgress,
            [0, 0.75],
            [
                35,
                0
            ]
        );


    /* =====================================================
       LOAD MAIN DASHBOARD DATA

       force = false
       Normal automatic refresh.

       force = true
       User has just executed a scenario and the newest
       decision must be fetched immediately.
    ===================================================== */

    async function loadData(
        force = false
    ) {

        /*
         * Prevent ordinary polling requests from
         * overlapping.
         *
         * A scenario-triggered forced refresh is allowed
         * through this guard.
         */
        if (
            loadingRef.current &&
            !force
        ) {
            return;
        }


        loadingRef.current = true;


        try {

            setLoading(true);


            const [
                decisionData,
                statusData,
                experimentData,
                metricsData
            ] = await Promise.all([

                getDecision(),

                getSystemStatus(),

                getExperimentResults(),

                getExperimentMetrics()

            ]);


            /*
             * IMPORTANT:
             * Replace the old decision with the latest
             * backend /decision response.
             */
            setDecision(
                decisionData
            );


            setSystemStatus(
                statusData
            );


            setExperimentResults(
                experimentData
            );


            setExperimentMetrics(
                metricsData
            );


            /*
             * Child components using refreshKey will
             * refresh after the main data has completed.
             */
            setRefreshKey(
                previous =>
                    previous + 1
            );


            setError(null);


        } catch (err) {

            setError(
                err.message
            );


            console.error(
                "Dashboard refresh failed:",
                err
            );


        } finally {

            setLoading(false);

            loadingRef.current = false;
        }
    }


    /* =====================================================
       LOAD VALIDATION DATA
    ===================================================== */

    async function loadValidationData() {

        try {

            const validationData =
                await getValidationSummary();


            setValidationSummary(
                validationData
            );


        } catch (err) {

            console.error(
                "Validation loading failed:",
                err
            );
        }
    }


    /* =====================================================
       FULL EVALUATION
    ===================================================== */

    async function handleFullEvaluation() {

        try {

            setEvaluationRunning(
                true
            );


            setEvaluationMessage(
                ""
            );


            setError(
                null
            );


            /*
             * Run the complete backend evaluation suite.
             */
            await runFullEvaluation();


            /*
             * Evaluation changed backend state, therefore
             * force retrieval of the newest data.
             */
            await loadData(
                true
            );


            await loadValidationData();


            setEvaluationMessage(
                "Full ADITI evaluation completed successfully."
            );


        } catch (err) {

            setError(
                err.message
            );


            setEvaluationMessage(
                "Evaluation could not be completed."
            );


        } finally {

            setEvaluationRunning(
                false
            );
        }
    }


    /* =====================================================
       SCENARIO COMPLETION

       ScenarioControl calls this AFTER setScenario()
       finishes successfully.
    ===================================================== */

    async function handleScenarioChanged() {

        /*
         * Force the dashboard to retrieve the decision
         * belonging to the scenario that was just run.
         */
        await loadData(
            true
        );

        
    }


    /* =====================================================
       INITIAL LOAD + AUTO REFRESH
    ===================================================== */

    useEffect(() => {

        /*
         * Initial dashboard load.
         */
        loadData();


        /*
         * Background refresh every 5 seconds.
         */
        const interval =
            setInterval(
                () => {

                    /*
                     * Do not perform unnecessary polling
                     * while the browser tab is hidden.
                     */
                    if (
                        document.visibilityState
                        === "visible"
                    ) {

                        loadData();
                    }

                },
                5000
            );


        return () => {

            clearInterval(
                interval
            );
        };

    }, []);


    /* =====================================================
       INITIAL VALIDATION LOAD
    ===================================================== */

    useEffect(() => {

        loadValidationData();

    }, []);


    /* =====================================================
       UI
    ===================================================== */

    return (

        <>

            {/* =============================================
                DESKTOP SCROLL NAVIGATOR
            ============================================= */}

            <DesktopScrollNavigator />


            {/* =============================================
                MOBILE SCROLL NAVIGATOR
            ============================================= */}

            <MobileScrollNavigator />


            {/* =============================================
                CINEMATIC HERO
            ============================================= */}

            <AditiHero />


            {/* =============================================
                SYSTEM INTRODUCTION
            ============================================= */}

            <div id="intro">

                <AditiSystemIntro
                    systemStatus={
                        systemStatus
                    }
                />

            </div>


            {/* =============================================
                DASHBOARD REVEAL
            ============================================= */}

            <motion.div

                ref={
                    dashboardRef
                }

                className="dashboard-reveal"

                style={{

                    opacity:
                        dashboardOpacity,

                    filter:
                        dashboardBlur,

                    scale:
                        dashboardScale,

                    y:
                        dashboardY
                }}
            >

                <div className="dashboard">


                    {/* =====================================
                        DASHBOARD HEADER
                    ===================================== */}

                    <header className="dashboard-header">

                        <h1>
                            ADITI Dashboard
                        </h1>

                        <p>
                            AI-Driven Data,
                            Information &
                            Technology Integration
                        </p>

                    </header>


                    {/* =====================================
                        CONTROL
                    ===================================== */}

                    <div
                        id="control"
                        className="dashboard-controls"
                    >

                        <button
                            onClick={
                                () =>
                                    loadData(true)
                            }
                        >
                            Refresh ADITI
                        </button>


                        <button

                            onClick={
                                handleFullEvaluation
                            }

                            disabled={
                                evaluationRunning
                            }
                        >

                            {
                                evaluationRunning

                                    ? "Running Evaluation..."

                                    : "Run Full Evaluation"
                            }

                        </button>


                        
                           {evaluationMessage && (
    <div className="evaluation-success-panel">
        <div className="evaluation-success-icon">
            ✓
        </div>

        <div className="evaluation-success-content">
            <span className="evaluation-success-title">
                EVALUATION COMPLETE
            </span>

            <span className="evaluation-success-text">
                {evaluationMessage}
            </span>
        </div>

        <span className="evaluation-success-badge">
            SUCCESS
        </span>
    </div>
)}
                        


                        {/* =================================
                            SCENARIO CONTROL

                            After a scenario finishes,
                            handleScenarioChanged() performs
                            a forced dashboard refresh.
                        ================================= */}

                        <ScenarioControl

                            onScenarioChanged={
                                handleScenarioChanged
                            }

                        />

                    </div>


                    {/* =====================================
                        LOADING
                    ===================================== */}

                    {
                        loading && (

                            <p className="loading-message">

                                Loading ADITI data...

                            </p>
                        )
                    }


                    {/* =====================================
                        ERROR
                    ===================================== */}

                    {
                        error && (

                            <p className="error-message">

                                Error: {error}

                            </p>
                        )
                    }


                    {/* =====================================
                        DASHBOARD GRID
                    ===================================== */}

                    <div className="dashboard-grid">


                        {/* ===============================
                            VISION
                        =============================== */}

                        <div
                            id="vision"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <CameraView

                                    results={
                                        decision
                                            ?.fused_results
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            EVALUATION
                        =============================== */}

                        <div
                            id="evaluation"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <EvaluationPanel

                                    refreshKey={
                                        refreshKey
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            SCENARIO EVALUATION
                        =============================== */}

                        <div
                            id="scenario_evaluation"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <ScenarioEvaluation

                                    refreshKey={
                                        refreshKey
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            VALIDATION
                        =============================== */}

                        <div
                            id="validation"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <ValidationSummary />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            HISTORY
                        =============================== */}

                        <div
                            id="history"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <ExperimentHistory

                                    refreshKey={
                                        refreshKey
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            EVALUATION ANALYTICS
                        =============================== */}

                        <div
                            id="charts"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <EvaluationCharts

                                    results={
                                        experimentResults
                                            ?.results || []
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            FINAL EVALUATION
                        =============================== */}

                        <div
                            id="summary"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <FinalEvaluationSummary

                                    metrics={
                                        experimentMetrics
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            FINAL DEMONSTRATION / SUMMARY
                        =============================== */}

                        <div
                            id="final_demonstration"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <DemoSummary

                                    validation={
                                        validationSummary
                                    }

                                    metrics={
                                        experimentMetrics
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            SENSORS
                        =============================== */}

                        <div
                            id="sensors"
                            className="dashboard-anchor-cell"
                        >

                            <ScrollReveal
                                delay={0}
                            >

                                <SensorStatus

                                    status={
                                        systemStatus
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            OUTPUT
                        =============================== */}

                        <div
                            id="output"
                            className="dashboard-anchor-cell"
                        >

                            <ScrollReveal
                                delay={0.08}
                            >

                                <OutputStatus

                                    decision={
                                        decision
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            DETECTION
                        =============================== */}

                        <ScrollReveal
                            delay={0.05}
                        >

                            <DetectionPanel

                                results={
                                    decision
                                        ?.fused_results
                                }

                            />

                        </ScrollReveal>


                        {/* ===============================
                            DECISION
                        =============================== */}

                        <div
                            id="decision"
                            className="dashboard-anchor-cell"
                        >

                            <ScrollReveal
                                delay={0.05}
                            >

                                <AditiDecision

                                    decision={
                                        decision
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            MODELS
                        =============================== */}

                        <div
                            id="models"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <ModelStatus

                                    refreshKey={
                                        refreshKey
                                    }

                                />

                            </ScrollReveal>

                        </div>


                        {/* ===============================
                            RESOURCES
                        =============================== */}

                        <div
                            id="resources"
                            className="dashboard-wide"
                        >

                            <ScrollReveal>

                                <ResourceMonitor

                                    refreshKey={
                                        refreshKey
                                    }

                                />

                            </ScrollReveal>

                        </div>


                    </div>

                </div>

            </motion.div>

        </>
    );
}


export default Dashboard;