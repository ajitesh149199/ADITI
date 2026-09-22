import { Activity } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";


function SensorStatus({ status }) {

    if (!status) {
        return (
            <div className="panel sensor-panel">
                <PanelHeader
                icon={Activity}
                title="Sensor Intelligence"
                subtitle="Live multimodal input status"
                status="Active"
                statusType="active"
                accent="cyan"
                />
                <p>No system status available.</p>
            </div>
        );
    }

    const systemRunning =
        status.status === "running";

    const sensors = [
        {
            name: "Camera",
            status: systemRunning ? "ACTIVE" : "OFF"
        },
        {
            name: "IMU",
            status: systemRunning ? "ACTIVE" : "OFF"
        },
        {
            name: "GPS",
            status: systemRunning ? "ACTIVE" : "OFF"
        },
        {
            name: "Audio",
            status: systemRunning ? "ACTIVE" : "OFF"
        }
    ];

    return (
    <div className="panel sensor-panel">

        <PanelHeader
            icon={Activity}
            title="Sensor Intelligence"
            subtitle="Live multimodal input status"
            status={systemRunning ? "Active" : "Offline"}
            statusType={systemRunning ? "active" : "neutral"}
            accent="cyan"
        />

        <p>
            <strong>System:</strong>{" "}
            {status.system || "Unknown"}
        </p>
            

            <p>
                <strong>System State:</strong>{" "}
                {status.status || "Unknown"}
            </p>

            <div className="sensor-grid">

                {sensors.map((sensor) => (

                    <div
                        className="sensor-card"
                        key={sensor.name}
                    >

                        <h3>
                            {sensor.name}
                        </h3>

                        <span
                            className={
                                sensor.status === "ACTIVE"
                                    ? "sensor-badge sensor-active"
                                    : "sensor-badge sensor-off"
                            }
                        >
                            {sensor.status}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default SensorStatus;