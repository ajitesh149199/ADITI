import { useEffect, useState } from "react";

import {
    getScenarioEvaluations
} from "../services/api";
import { FlaskConical } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";

function ScenarioEvaluation({ refreshKey }) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {

        async function loadScenarioEvaluation() {

            try {

                const result =
                    await getScenarioEvaluations();

                setData(result);
                setError(null);

            } catch (err) {

                setError(err.message);

            }
        }

        loadScenarioEvaluation();

    }, [refreshKey]);


    if (error) {
        return (
            <div className="panel">
                <h2>Scenario Evaluation</h2>
                <p>{error}</p>
            </div>
        );
    }


    if (!data) {
        return (
            <div className="panel">
                <h2>Scenario Evaluation</h2>
                <p>Loading scenarios...</p>
            </div>
        );
    }


    const scenarios = data.scenarios || {};


    return (
        <div className="panel scenario-evaluation-panel">

            <PanelHeader
            icon={FlaskConical}
            title="Scenario Evaluation"
            subtitle="Per-scenario ADITI validation results"
            status="Ready"
            statusType="ready"
            accent="magenta"
            />

            <p>
                Scenarios evaluated:{" "}
                <strong>
                    {data.scenario_count ?? 0}
                </strong>
            </p>


            <div className="scenario-evaluation-grid">

                {Object.entries(scenarios).map(
                    ([name, result]) => (

                        <div
                            className="scenario-evaluation-card"
                            key={name}
                        >

                            <h3>{name}</h3>

                            <p>
                                <strong>Objective:</strong>{" "}
                                {
                                    result.objective
                                    ?? "unknown"
                                }
                            </p>

                            <p>
                                <strong>Detections:</strong>{" "}
                                {
                                    result.detections
                                    ?? 0
                                }
                            </p>

                            <p>
                                <strong>Kept:</strong>{" "}
                                {
                                    result.kept
                                    ?? 0
                                }
                            </p>

                            <p>
                                <strong>Delayed:</strong>{" "}
                                {
                                    result.delayed
                                    ?? 0
                                }
                            </p>

                            <p>
                                <strong>Suppressed:</strong>{" "}
                                {
                                    result.suppressed
                                    ?? 0
                                }
                            </p>

                            <p>
                                <strong>Decisions:</strong>{" "}
                                {
                                    result.decisions_generated
                                    ?? 0
                                }
                            </p>

                        </div>

                    )
                )}

            </div>

        </div>
    );
}


export default ScenarioEvaluation;