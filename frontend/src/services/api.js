/* =========================================================
   ADITI API CONFIGURATION

   Local development:
   Falls back to http://127.0.0.1:8000

   Production:
   Uses VITE_API_BASE_URL from the hosting environment
========================================================= */

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000";


/* =========================================================
   SYSTEM
========================================================= */

export async function getSystemStatus() {

    const response = await fetch(
        `${API_BASE_URL}/system/status`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get system status"
        );
    }

    return response.json();
}


/* =========================================================
   DECISION
========================================================= */

export async function getDecision() {

    const response = await fetch(
        `${API_BASE_URL}/decision`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get ADITI decision"
        );
    }

    return response.json();
}


/* =========================================================
   DECISION MATHEMATICS

   Provides the complete calculation breakdown for:
   - Relevance
   - Reliability
   - Trust
========================================================= */

export async function getDecisionMathematics() {

    const response = await fetch(
        `${API_BASE_URL}/decision/mathematics`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get decision mathematics"
        );
    }

    return response.json();
}


/* =========================================================
   SIMULATOR
========================================================= */

export async function getScenarios() {

    const response = await fetch(
        `${API_BASE_URL}/simulator/scenarios`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get scenarios"
        );
    }

    return response.json();
}


export async function setScenario(scenarioName) {

    const response = await fetch(
        `${API_BASE_URL}/simulator/scenario/${scenarioName}`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to change scenario"
        );
    }

    return response.json();
}


/* =========================================================
   CURRENT SIMULATOR SCENARIO

   Used by the interactive 3D Camera / Vision monitor.
   Returns the complete scenario currently loaded by
   SimulatorController.
========================================================= */

export async function getCurrentScenario() {

    const response = await fetch(
        `${API_BASE_URL}/simulator/current-scenario`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get current simulator scenario"
        );
    }

    return response.json();
}


/* =========================================================
   RESOURCES
========================================================= */

export async function getResources() {

    const response = await fetch(
        `${API_BASE_URL}/resources`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get resource information"
        );
    }

    return response.json();
}


/* =========================================================
   MODEL SELECTION
========================================================= */

export async function getModelSelection() {

    const response = await fetch(
        `${API_BASE_URL}/models/selection`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get model selection"
        );
    }

    return response.json();
}


/* =========================================================
   EXPERIMENTS
========================================================= */

export async function runAllExperiments() {

    const response = await fetch(
        `${API_BASE_URL}/experiments/run-all`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to run ADITI evaluation"
        );
    }

    return response.json();
}


export async function getScenarioEvaluations() {

    const response = await fetch(
        `${API_BASE_URL}/experiments/by-scenario`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get scenario evaluations"
        );
    }

    return response.json();
}


export async function getValidationSummary() {

    const response = await fetch(
        `${API_BASE_URL}/experiments/validation-summary`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get validation summary"
        );
    }

    return response.json();
}


export async function getExperimentHistory() {

    const response = await fetch(
        `${API_BASE_URL}/experiments/history`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get experiment history"
        );
    }

    return response.json();
}


export async function getExperimentResults() {

    const response = await fetch(
        `${API_BASE_URL}/experiments/results`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get experiment results"
        );
    }

    return response.json();
}


export async function getExperimentMetrics() {

    const response = await fetch(
        `${API_BASE_URL}/experiments/metrics`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to get experiment metrics"
        );
    }

    return response.json();
}


/* =========================================================
   FULL EVALUATION
========================================================= */

export async function runFullEvaluation() {

    const response = await fetch(
        `${API_BASE_URL}/experiments/run-all`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to run full ADITI evaluation"
        );
    }

    return response.json();
}