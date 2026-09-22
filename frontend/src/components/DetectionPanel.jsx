function DetectionPanel({ results }) {

    if (!results || results.length === 0) {
        return (
            <div className="panel">
                <h2>Detected Information</h2>
                <p>No detections available.</p>
            </div>
        );
    }

    return (
        <div className="panel">

            <h2>Detected Information</h2>

            <div className="detection-container">

                {results.map((item, index) => (

                    <div
                        className="detection-card"
                        key={index}
                    >

                        <h3>
                            {item.object || "Unknown Object"}
                        </h3>

                        <p>
                            <strong>Relevance:</strong>{" "}
                            {item.relevance_score ?? "N/A"}
                        </p>

                        <p>
                            <strong>Trust:</strong>{" "}
                            {item.trust_score ?? "N/A"}
                        </p>

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
                            {item.risk_level || "unknown"}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default DetectionPanel;