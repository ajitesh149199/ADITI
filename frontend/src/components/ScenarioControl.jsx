import { useEffect, useState } from "react";

import {
    getScenarios,
    setScenario
} from "../services/api";

import {
    Play,
    ChevronDown
} from "lucide-react";


function ScenarioControl({ onScenarioChanged }) {

    const [scenarios, setScenarios] = useState([]);
    const [selected, setSelected] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {

        async function loadScenarios() {

            try {

                const data = await getScenarios();

                setScenarios(data.scenarios);

                if (data.scenarios.length > 0) {
                    setSelected(data.scenarios[0]);
                }

                setError(null);

            } catch (err) {

                setError(err.message);
            }
        }

        loadScenarios();

    },
     []);


   async function handleRun() {

    if (!selected) {
        return;
    }

    try {

        await setScenario(selected);

        setError(null);

        if (onScenarioChanged) {
            await onScenarioChanged();
        }

    } catch (err) {

        setError(err.message);
    }
}


    return (

    <div className="aditi-scenario-control">

        <div className="scenario-control-heading">

            <div>

                <span className="control-small-label">
                    SCENARIO EXECUTION
                </span>

                <h3>
                    Simulation Scenario
                </h3>

                <p>
                    Select an environment for the ADITI
                    processing pipeline.
                </p>

            </div>

        </div>


        <div className="scenario-control-actions">

            {/* SELECT */}

            <div className="scenario-select-wrapper">

                <span className="scenario-input-label">
                    ACTIVE SCENARIO
                </span>

                <div className="scenario-select-container">

                    <select
                        value={selected}
                        onChange={(event) =>
                            setSelected(
                                event.target.value
                            )
                        }
                    >

                        {scenarios.map(
                            (scenario) => (

                                <option
                                    key={scenario}
                                    value={scenario}
                                >
                                    {
                                        scenario
                                            .replaceAll("_", " ")
                                            .toUpperCase()
                                    }
                                </option>

                            )
                        )}

                    </select>


                    <ChevronDown
                        className="scenario-chevron"
                        size={17}
                        strokeWidth={1.6}
                    />

                </div>

            </div>


            {/* RUN */}

            <button
                className="scenario-run-button"
                onClick={handleRun}
            >

                <Play
                    size={16}
                    strokeWidth={1.7}
                />

                <span>
                    RUN SCENARIO
                </span>

            </button>

        </div>


        {error && (

            <p className="scenario-error">
                {error}
            </p>

        )}

    </div>

);
}

export default ScenarioControl;