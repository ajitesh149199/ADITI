import { Radio } from "lucide-react";
import PanelHeader from "./ui/PanelHeader";

function OutputStatus({ decision }) {

    const outputs =
        decision?.outputs || {};

    const audioActive =
        (outputs.audio?.length || 0) > 0;

    const hapticActive =
        (outputs.haptic?.length || 0) > 0;

    const visualActive =
        (outputs.visual?.length || 0) > 0;

    return (
        <div className="panel output-panel">

            <PanelHeader
            icon={Radio}
            title="Output Intelligence"
            subtitle="Selected feedback channels"
            status="Ready"
            statusType="ready"
            accent="magenta"
            />

            <div className="output-grid">

                <div className="output-card">
                    <h3>Audio</h3>

                    <span
                        className={
                            audioActive
                                ? "output-badge output-active"
                                : "output-badge output-off"
                        }
                    >
                        {audioActive ? "ACTIVE" : "OFF"}
                    </span>
                </div>


                <div className="output-card">
                    <h3>Haptic</h3>

                    <span
                        className={
                            hapticActive
                                ? "output-badge output-active"
                                : "output-badge output-off"
                        }
                    >
                        {hapticActive ? "ACTIVE" : "OFF"}
                    </span>
                </div>


                <div className="output-card">
                    <h3>Visual</h3>

                    <span
                        className={
                            visualActive
                                ? "output-badge output-active"
                                : "output-badge output-off"
                        }
                    >
                        {visualActive ? "ACTIVE" : "OFF"}
                    </span>
                </div>

            </div>

        </div>
    );
}

export default OutputStatus;