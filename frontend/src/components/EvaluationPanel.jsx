import { useEffect, useState } from "react";

import {
    getValidationSummary,
    runAllExperiments
} from "../services/api";

import { ChartNoAxesCombined } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";


function EvaluationPanel({ refreshKey }) {

    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);
    const [running, setRunning] = useState(false);


    /* =====================================================
       LOAD EVALUATION DATA
    ===================================================== */

    useEffect(() => {

        async function loadEvaluation() {

            try {

                const data =
                    await getValidationSummary();

                setSummary(data);
                setError(null);

            } catch (err) {

                setError(err.message);

            }
        }

        loadEvaluation();

    }, [refreshKey]);


    /* =====================================================
       RUN FULL EVALUATION
    ===================================================== */

    async function handleRunEvaluation() {

        try {

            setRunning(true);
            setError(null);

            await runAllExperiments();

            const updatedSummary =
                await getValidationSummary();

            setSummary(updatedSummary);

        } catch (err) {

            setError(err.message);

        } finally {

            setRunning(false);

        }
    }


    /* =====================================================
       ERROR STATE
    ===================================================== */

    if (error) {

        return (

            <div className="panel">

                <PanelHeader
                    icon={ChartNoAxesCombined}
                    title="Evaluation"
                    subtitle="System performance and experiment analysis"
                    status="Error"
                    statusType="neutral"
                    accent="cyan"
                />

                <p>{error}</p>

            </div>
        );
    }


    /* =====================================================
       LOADING STATE
    ===================================================== */

    if (!summary) {

        return (

            <div className="panel">

                <PanelHeader
                    icon={ChartNoAxesCombined}
                    title="Evaluation"
                    subtitle="System performance and experiment analysis"
                    status="Loading"
                    statusType="neutral"
                    accent="cyan"
                />

                <p>Loading evaluation...</p>

            </div>
        );
    }


    /* =====================================================
       EXTRACT BACKEND DATA
    ===================================================== */

    const standardEvaluation =
        summary.standard_evaluation || {};

    const metrics =
        standardEvaluation.metrics || {};

    const experimentsRecorded =
        standardEvaluation.experiments_recorded ?? 0;

    const status =
        summary.overall_status || "unknown";


    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="panel evaluation-panel">

            <PanelHeader
                icon={ChartNoAxesCombined}
                title="Evaluation"
                subtitle="System performance and experiment analysis"
                status="Ready"
                statusType="ready"
                accent="cyan"
            />


            <button
                className="evaluation-button"
                onClick={handleRunEvaluation}
                disabled={running}
            >

                {running
                    ? "Running Evaluation..."
                    : "Run ADITI Evaluation"
                }

            </button>


            <p>
                <strong>Status:</strong>{" "}
                {status}
            </p>


            <p>
                <strong>Experiments:</strong>{" "}
                {experimentsRecorded}
            </p>


            <div className="evaluation-grid">


                <div className="evaluation-card">

                    <h3>Detections</h3>

                    <p>
                        {metrics.total_detections ?? 0}
                    </p>

                </div>


                <div className="evaluation-card">

                    <h3>Kept</h3>

                    <p>
                        {metrics.total_kept ?? 0}
                    </p>

                </div>


                <div className="evaluation-card">

                    <h3>Suppressed</h3>

                    <p>
                        {metrics.total_suppressed ?? 0}
                    </p>

                </div>


                <div className="evaluation-card">

                    <h3>Suppression Rate</h3>

                    <p>
                        {metrics.suppression_rate ?? 0}%
                    </p>

                </div>


                <div className="evaluation-card">

                    <h3>Output Rate</h3>

                    <p>
                        {
                            metrics.output_generation_rate
                            ?? 0
                        }%
                    </p>

                </div>


                <div className="evaluation-card">

                    <h3>Models Avoided</h3>

                    <p>
                        {
                            metrics.average_models_avoided
                            ?? 0
                        }
                    </p>

                </div>


            </div>

        </div>
    );
}


export default EvaluationPanel;