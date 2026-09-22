import { useEffect, useState } from "react";
import { getResources } from "../services/api";
import { Gauge } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";


function ResourceMonitor({ refreshKey }) {

    const [resources, setResources] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadResources() {

            try {

                const data = await getResources();

                setResources(data);
                setError(null);

            } catch (err) {

                setError(err.message);
            }
        }

        loadResources();

    }, [refreshKey]);


    if (error) {
        return (
            <div className="panel">
                <h2>Resource Monitor</h2>
                <p>Error: {error}</p>
            </div>
        );
    }


    if (!resources) {
        return (
            <div className="panel">
                <h2>Resource Monitor</h2>
                <p>Loading resource data...</p>
            </div>
        );
    }


    return (
        <div className="panel resource-panel">

            <PanelHeader
            icon={Gauge}
            title="Resource Monitor"
            subtitle="Runtime efficiency and processing usage"
            status="Live"
            statusType="live"
            accent="cyan"
            />

            <div className="resource-grid">

                <div className="resource-card">
                    <h3>Models Avoided</h3>

                    <p className="resource-value">
                        {resources.models_avoided ?? 0}
                    </p>
                </div>


                <div className="resource-card">
                    <h3>CPU Saved</h3>

                    <p className="resource-value">
                        {resources.cpu_saved ?? 0}
                    </p>
                </div>


                <div className="resource-card">
                    <h3>Memory Saved</h3>

                    <p className="resource-value">
                        {resources.memory_saved_mb ?? 0} MB
                    </p>
                </div>


                <div className="resource-card">
                    <h3>Latency Saved</h3>

                    <p className="resource-value">
                        {resources.latency_saved_ms ?? 0} ms
                    </p>
                </div>


                <div className="resource-card">
                    <h3>Power Saved</h3>

                    <p className="resource-value">
                        {resources.power_units_saved ?? 0}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default ResourceMonitor;