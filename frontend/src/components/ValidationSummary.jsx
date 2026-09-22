import { useEffect, useState } from "react";

import {
    getValidationSummary
} from "../services/api";
import { ShieldCheck } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";


function ValidationSummary({ refreshKey }) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {

        async function loadValidation() {

            try {

                const result =
                    await getValidationSummary();

                setData(result);
                setError(null);

            } catch (err) {

                setError(err.message);

            }
        }

        loadValidation();

    }, []);


    if (error) {
        return (
            <div className="panel">
                <h2>ADITI Validation Summary</h2>
                <p>{error}</p>
            </div>
        );
    }


    if (!data) {
        return (
            <div className="panel validation-summary-panel">
                
            <PanelHeader
                    icon={ShieldCheck}
                    title="Validation Summary"
                    subtitle="System-wide verification and readiness check"
                    status="Ready"
                    statusType="ready"
                    accent="green"
                    />

                <p>Loading validation...</p>
            </div>
        );
    }


    const standard =
        data.standard_evaluation || {};

    const metrics =
        standard.metrics || {};

    const suppression =
        data.suppression_validation || {};


    return (
        <div className="panel validation-panel">

            <PanelHeader
                    icon={ShieldCheck}
                    title="Validation Summary"
                    subtitle="System-wide verification and readiness check"
                    status="Ready"
                    statusType="ready"
                    accent="green"
                    />

            <div className="validation-header">

                <div>
                    
                    
                    <p>
                        Combined evaluation and
                        suppression validation
                    </p>
                </div>

                <span
                    className={
                        data.overall_status
                        === "validation_passed"
                            ? "validation-badge validation-pass"
                            : "validation-badge validation-warning"
                    }
                >
                    {
                        data.overall_status
                        === "validation_passed"
                            ? "VALIDATION PASSED"
                            : "VALIDATION INCOMPLETE"
                    }
                </span>

            </div>


            <div className="validation-grid">

                <div className="validation-card">

                    <h3>Standard Experiments</h3>

                    <p className="validation-value">
                        {
                            standard
                                .experiments_recorded
                            ?? 0
                        }
                    </p>

                </div>


                <div className="validation-card">

                    <h3>Total Detections</h3>

                    <p className="validation-value">
                        {
                            metrics
                                .total_detections
                            ?? 0
                        }
                    </p>

                </div>


                <div className="validation-card">

                    <h3>Suppression Test</h3>

                    <p className="validation-value">
                        {
                            suppression.success
                                ? "PASS"
                                : "FAIL"
                        }
                    </p>

                </div>


                <div className="validation-card">

                    <h3>Items Suppressed</h3>

                    <p className="validation-value">
                        {
                            suppression
                                .suppressed_count
                            ?? 0
                        }
                    </p>

                </div>

            </div>


            <div className="validation-details">

                <p>
                    <strong>
                        Suppression Scenario:
                    </strong>{" "}
                    {
                        suppression.scenario
                        ?? "unknown"
                    }
                </p>

                <p>
                    <strong>Objective:</strong>{" "}
                    {
                        suppression.objective
                        ?? "unknown"
                    }
                </p>

                <p>
                    <strong>
                        Standard Suppression Rate:
                    </strong>{" "}
                    {
                        metrics.suppression_rate
                        ?? 0
                    }%
                </p>

                <p>
                    <strong>
                        Output Generation Rate:
                    </strong>{" "}
                    {
                        metrics
                            .output_generation_rate
                        ?? 0
                    }%
                </p>

            </div>

        </div>
    );
}


export default ValidationSummary;