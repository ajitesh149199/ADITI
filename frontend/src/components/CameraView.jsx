import { ScanEye } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";

function CameraView({ results }) {

    const detections = results || [];

    return (
        <div className="panel camera-panel">

            <PanelHeader
            icon={ScanEye}
            title="Camera / Vision"
            subtitle="Visual perception and simulated environment feed"
            status="Live"
            statusType="live"
            accent="cyan"
            />


            <div className="camera-screen">

                {detections.length === 0 ? (

                    <div className="camera-empty">

                        <p>
                            No simulated vision data available.
                        </p>

                    </div>

                ) : (

                    <div className="camera-detections">

                        {detections.map(
                            (item, index) => (

                                <div
                                    className="camera-detection-card"
                                    key={index}
                                >

                                    <h3>
                                        {item.object || "Unknown"}
                                    </h3>

                                    <p>
                                        <strong>Distance:</strong>{" "}
                                        {item.distance ?? "N/A"} m
                                    </p>

                                    <p>
                                        <strong>Direction:</strong>{" "}
                                        {item.direction ?? "N/A"}
                                    </p>

                                    <p>
                                        <strong>Risk:</strong>{" "}
                                        {item.risk_level || "N/A"}
                                    </p>

                                    <p>
                                        <strong>Trust:</strong>{" "}
                                        {item.trust_score ?? "N/A"}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default CameraView;