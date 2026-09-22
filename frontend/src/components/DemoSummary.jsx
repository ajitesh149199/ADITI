import {
    CircleCheckBig,
    FlaskConical,
    Filter,
    Cpu,
    Radio,
    Info
} from "lucide-react";

import PanelHeader from "./ui/PanelHeader";


function DemoSummary({
    validation,
    metrics
}) {

    const validationPassed =
        validation?.overall_status ===
        "validation_passed";

    const suppressionPassed =
        validation
            ?.suppression_validation
            ?.success ?? false;

    const experiments =
        metrics?.total_experiments ?? 0;

    const modelsAvoided =
        metrics?.average_models_avoided ?? 0;

    const outputRate =
        metrics?.output_generation_rate ?? 0;


    const demoMetrics = [

        {
            label: "Controlled Experiments",
            value: experiments,
            description:
                "Standard scenarios tested",
            icon: FlaskConical,
            accent: "cyan"
        },

        {
            label: "Suppression Engine",
            value:
                suppressionPassed
                    ? "PASS"
                    : "CHECK",
            description:
                "Irrelevant information test",
            icon: Filter,
            accent:
                suppressionPassed
                    ? "green"
                    : "magenta"
        },

        {
            label: "Average Models Avoided",
            value: modelsAvoided,
            description:
                "Resource optimization",
            icon: Cpu,
            accent: "cyan"
        },

        {
            label: "Output Generation",
            value: `${outputRate}%`,
            description:
                "Selective feedback rate",
            icon: Radio,
            accent: "magenta"
        }

    ];


    return (

        <div className="panel demo-summary">


            {/* =========================================
                PANEL HEADER
            ========================================= */}

            <PanelHeader
                icon={CircleCheckBig}
                title="ADITI Final Demonstration"
                subtitle="Summary of the software simulation and evaluation"
                status={
                    validationPassed
                        ? "Validated"
                        : "Pending"
                }
                statusType={
                    validationPassed
                        ? "ready"
                        : "neutral"
                }
                accent={
                    validationPassed
                        ? "green"
                        : "magenta"
                }
            />


            {/* =========================================
                DEMO STATUS
            ========================================= */}

            <div className="demo-validation-banner">

                <div className="demo-validation-icon">

                    <CircleCheckBig size={26} />

                </div>


                <div className="demo-validation-content">

                    <span>
                         SYSTEM VERIFICATION
                    </span>

                    <h3>
                        {
                            validationPassed
                                ? "ADITI Validation Complete"
                                : "Validation In Progress"
                        }
                    </h3>

                    <p>
                        Evaluation results from the
                        current software simulation
                        are summarized below.
                    </p>

                </div>


                <div
                    className={
                        validationPassed
                            ? "demo-status-pill pass"
                            : "demo-status-pill warning"
                    }
                >

                    <span className="demo-status-dot" />

                    {
                        validationPassed
                            ? "SYSTEM VALIDATED"
                            : "VALIDATION PENDING"
                    }

                </div>

            </div>


            {/* =========================================
                DEMO METRICS
            ========================================= */}

            <div className="demo-summary-grid">

                {demoMetrics.map(
                    ({
                        label,
                        value,
                        description,
                        icon: Icon,
                        accent
                    }) => (

                        <div
                            key={label}
                            className={
                                `demo-card ${accent}`
                            }
                        >

                            <div className="demo-card-top">

                                <div className="demo-card-icon">

                                    <Icon size={18} />

                                </div>

                                <span>
                                     DEMO METRIC
                                </span>

                            </div>


                            <div className="demo-card-value">

                                {value}

                            </div>


                            <h3>
                                {label}
                            </h3>


                            <p>
                                {description}
                            </p>

                        </div>

                    )
                )}

            </div>


            {/* =========================================
                CONCLUSION
            ========================================= */}

            <div className="demo-conclusion">

                <div className="demo-conclusion-header">

                    <div className="demo-conclusion-icon">

                        <CircleCheckBig
                            size={20}
                        />

                    </div>

                    <div>

                        <span>
                             DEMONSTRATION CONCLUSION
                        </span>

                        <h3>
                            ADITI System Evaluation
                        </h3>

                    </div>

                </div>


                <div className="demo-conclusion-body">

                    <p>
                        ADITI demonstrates a modular
                        decision pipeline that processes
                        multimodal simulated inputs,
                        evaluates relevance and
                        reliability, suppresses
                        unnecessary information,
                        selectively activates outputs,
                        and avoids unnecessary AI
                        models according to the
                        current objective.
                    </p>

                    <div className="demo-conclusion-note">

                        <Info size={17} />

                        <p>
                            Resource values shown in this
                            prototype are simulated
                            estimates and are intended to
                            demonstrate the architecture,
                            not physical hardware
                            performance.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default DemoSummary;