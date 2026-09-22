import { useEffect, useState } from "react";
import { getModelSelection } from "../services/api";
import { Cpu } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";


function ModelStatus({ refreshKey }) {

    const [models, setModels] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadModels() {

            try {

                const data = await getModelSelection();

                setModels(data);
                setError(null);

            } catch (err) {

                setError(err.message);
            }
        }

        loadModels();

    }, [refreshKey]);


    const activeModels =
        models?.selected_models || [];

    const suppressedModels =
        models?.suppressed_models || [];


    return (
        <div className="panel model-panel">

            <PanelHeader
            icon={Cpu}
            title="Model Orchestration"
            subtitle="Dynamic AI model selection and suppression"
            status="Active"
            statusType="active"
            accent="magenta"
            />

            {error && (
                <p>
                    Error: {error}
                </p>
            )}

            <div className="model-status-container">

                <div className="model-group">

                    <h3>Active Models</h3>

                    {activeModels.length > 0 ? (

                        activeModels.map(
                            (model) => (

                                <div
                                    className="model-item active-model"
                                    key={model}
                                >
                                    <span>
                                        {model}
                                    </span>

                                    <span className="model-badge">
                                        ACTIVE
                                    </span>
                                </div>

                            )
                        )

                    ) : (

                        <p>No active models.</p>

                    )}

                </div>


                <div className="model-group">

                    <h3>Suppressed Models</h3>

                    {suppressedModels.length > 0 ? (

                        suppressedModels.map(
                            (model) => (

                                <div
                                    className="model-item suppressed-model"
                                    key={model}
                                >
                                    <span>
                                        {model}
                                    </span>

                                    <span className="model-badge">
                                        OFF
                                    </span>
                                </div>

                            )
                        )

                    ) : (

                        <p>No suppressed models.</p>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ModelStatus;