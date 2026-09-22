import { BrainCircuit } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";


function AditiDecision({ decision }) {

    if (!decision) {
        return (
            <div className="panel decision-panel">
                <h2>ADITI Decision</h2>
                <p>No ADITI data available.</p>
            </div>
        );
    }

    const decisions =
        decision.outputs?.decisions || [];

    const fusedResults =
        decision.fused_results || [];

    const primaryResult =
        fusedResults.length > 0
            ? fusedResults[0]
            : null;

    return (
        <div className="panel decision-panel">

            <PanelHeader
            icon={BrainCircuit}
            title="Current Decision"
            subtitle="ADITI decision intelligence"
            status="Decision Ready"
            statusType="ready"
            accent="magenta"
            />

            <div className="decision-main">

                <p>
                    <strong>Objective:</strong>{" "}
                    {
                        decision.objective ||
                        primaryResult?.objective ||
                        "Not set"
                    }
                </p>

                <p>
                    <strong>Detected Object:</strong>{" "}
                    {primaryResult?.object || "None"}
                </p>

                <p>
                    <strong>Risk:</strong>{" "}
                    {primaryResult?.risk_level || "N/A"}
                </p>

                <p>
                    <strong>Trust:</strong>{" "}
                    {primaryResult?.trust_score ?? "N/A"}
                </p>

            </div>

            <div className="decision-output">

                <h3>Decision Output</h3>

                {decisions.length > 0 ? (

                    decisions.map((item, index) => (

                        <div
                            className="decision-result-card"
                            key={index}
                        >

                            <p>
                                <strong>Object:</strong>{" "}
                                {item.object || "Unknown"}
                            </p>

                            <p>
                                <strong>
                                    Output Required:
                                </strong>{" "}
                                {item.output_required
                                    ? "Yes"
                                    : "No"}
                            </p>

                            <p>
                                <strong>Outputs:</strong>{" "}
                                {
                                    item.outputs &&
                                    item.outputs.length > 0
                                        ? item.outputs.join(", ")
                                        : "None"
                                }
                            </p>

                            <p>
                                <strong>Risk:</strong>{" "}
                                {item.risk_level || "N/A"}
                            </p>

                            <p>
                                <strong>Relevance:</strong>{" "}
                                {item.relevance_score ?? "N/A"}
                            </p>

                            <p>
                                <strong>Trust:</strong>{" "}
                                {item.trust_score ?? "N/A"}
                            </p>

                        </div>

                                        ))
                ) : (
                    <p>
                        No output decision generated.
                    </p>
                )}

            </div>

        </div>
    );
}

export default AditiDecision;