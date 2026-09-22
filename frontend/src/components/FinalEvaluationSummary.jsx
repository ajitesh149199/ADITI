import {
    CircleCheckBig,
    FlaskConical,
    ScanSearch,
    Filter,
    Radio,
    Cpu,
    Info
} from "lucide-react";

import PanelHeader from "./ui/PanelHeader";


function FinalEvaluationSummary({ metrics }) {

    if (!metrics) {

        return (

            <div className="panel final-summary">

                <PanelHeader
                    icon={CircleCheckBig}
                    title="Final System Summary"
                    subtitle="ADITI evaluation and demonstration readiness"
                    status="Waiting"
                    statusType="neutral"
                    accent="green"
                />

                <div className="final-summary-empty">
                    No evaluation data available.
                </div>

            </div>
        );
    }


    const summaryMetrics = [

        {
            label: "Total Experiments",
            value: metrics.total_experiments ?? 0,
            icon: FlaskConical,
            accent: "cyan"
        },

        {
            label: "Total Detections",
            value: metrics.total_detections ?? 0,
            icon: ScanSearch,
            accent: "cyan"
        },

        {
            label: "Suppression Rate",
            value: `${metrics.suppression_rate ?? 0}%`,
            icon: Filter,
            accent: "magenta"
        },

        {
            label: "Output Generation",
            value: `${metrics.output_generation_rate ?? 0}%`,
            icon: Radio,
            accent: "magenta"
        },

        {
            label: "Avg. Models Avoided",
            value: metrics.average_models_avoided ?? 0,
            icon: Cpu,
            accent: "cyan"
        }

    ];


    return (

        <div className="panel final-summary">

            {/* =============================================
                PANEL HEADER
            ============================================= */}

            <PanelHeader
                icon={CircleCheckBig}
                title="Final System Summary"
                subtitle="ADITI evaluation and demonstration readiness"
                status="Ready"
                statusType="ready"
                accent="green"
            />


            {/* =============================================
                FINAL STATUS
            ============================================= */}

            <div className="final-status-banner">

                <div className="final-status-icon">

                    <CircleCheckBig
                        size={28}
                    />

                </div>


                <div className="final-status-content">

                    <span>
                        EVALUATION PIPELINE COMPLETE
                    </span>

                    <h3>
                        ADITI Simulation Summary
                    </h3>

                    <p>
                        Consolidated evaluation results
                        from the current ADITI software
                        simulation.
                    </p>

                </div>


                <div className="final-ready-indicator">

                    <span className="final-ready-dot" />

                    READY

                </div>

            </div>


            {/* =============================================
                METRICS
            ============================================= */}

            <div className="final-summary-grid">

                {summaryMetrics.map(
                    ({
                        label,
                        value,
                        icon: Icon,
                        accent
                    }) => (

                        <div
                            className={
                                `summary-card ${accent}`
                            }
                            key={label}
                        >

                            <div className="summary-card-top">

                                <div className="summary-card-icon">

                                    <Icon size={18} />

                                </div>

                                <span>
                                     METRIC
                                </span>

                            </div>


                            <div className="summary-card-value">
                                {value}
                            </div>


                            <div className="summary-card-label">
                                {label}
                            </div>

                        </div>

                    )
                )}

            </div>


            {/* =============================================
                SYSTEM NOTE
            ============================================= */}

            <div className="final-summary-note">

                <Info size={18} />

                <div>

                    <strong>
                        Simulation Data Notice
                    </strong>

                    <p>
                        Resource savings shown here are
                        simulated estimates produced by
                        the ADITI Resource Manager and
                        are not physical hardware
                        benchmark measurements.
                    </p>

                </div>

            </div>

        </div>
    );
}


export default FinalEvaluationSummary;