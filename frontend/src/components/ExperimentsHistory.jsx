import { useEffect, useState } from "react";

import {
    getExperimentHistory
} from "../services/api";

import {
    History
} from "lucide-react";

import PanelHeader from "./ui/PanelHeader";


function ExperimentHistory({ refreshKey }) {

    const [historyData, setHistoryData] =
        useState(null);

    const [error, setError] =
        useState(null);

    const [isDeleting, setIsDeleting] =
        useState(false);


    /* =====================================================
       LOAD EXPERIMENT HISTORY
    ===================================================== */

    async function loadHistory() {

        try {

            const data =
                await getExperimentHistory();

            setHistoryData({
                run_count:
                    data?.run_count ?? 0,

                history:
                    Array.isArray(data?.history)
                        ? data.history
                        : []
            });

            setError(null);

        } catch (err) {

            console.error(
                "HISTORY LOAD ERROR:",
                err
            );

            setError(
                err.message ||
                "Failed to load experiment history."
            );
        }
    }


    useEffect(() => {

        loadHistory();

    }, [refreshKey]);


    /* =====================================================
       ERROR STATE
    ===================================================== */

    if (error && !historyData) {

        return (

            <div className="panel history-panel">

                <PanelHeader
                    icon={History}
                    title="Experiment History"
                    subtitle="Recorded ADITI evaluation runs"
                    status="Error"
                    statusType="neutral"
                    accent="magenta"
                />

                <p>
                    {error}
                </p>

            </div>
        );
    }


    /* =====================================================
       LOADING STATE
    ===================================================== */

    if (!historyData) {

        return (

            <div className="panel history-panel">

                <PanelHeader
                    icon={History}
                    title="Experiment History"
                    subtitle="Recorded ADITI evaluation runs"
                    status="Loading"
                    statusType="neutral"
                    accent="magenta"
                />

                <p>
                    Loading history...
                </p>

            </div>
        );
    }


    /* =====================================================
       HISTORY ARRAY
    ===================================================== */

    const history =
        Array.isArray(historyData.history)
            ? historyData.history
            : [];

    const runCount =
        historyData.run_count ?? history.length;


    /* =====================================================
       DELETE ALL HISTORY
    ===================================================== */

    async function handleDeleteAllHistory() {

        if (history.length === 0) {
            return;
        }

        const confirmed =
            window.confirm(
                "Delete all evaluation history? This cannot be undone."
            );

        if (!confirmed) {
            return;
        }


        try {

            setIsDeleting(true);

            const response =
                await fetch(
                    "http://127.0.0.1:8000/experiments/history",
                    {
                        method: "DELETE"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to delete evaluation history."
                );
            }


            const data =
                await response.json();


            setHistoryData({
                run_count:
                    data?.run_count ?? 0,

                history:
                    Array.isArray(data?.history)
                        ? data.history
                        : []
            });


            setError(null);


        } catch (err) {

            console.error(
                "DELETE HISTORY ERROR:",
                err
            );

            setError(
                err.message ||
                "Failed to delete evaluation history."
            );

        } finally {

            setIsDeleting(false);
        }
    }


    /* =====================================================
       MAIN UI
    ===================================================== */

    return (

        <div className="panel history-panel">


            {/* =================================================
                PANEL HEADER
            ================================================= */}

            <PanelHeader
                icon={History}
                title="Experiment History"
                subtitle="Recorded ADITI evaluation runs"
                status={
                    history.length > 0
                        ? "Logged"
                        : "Empty"
                }
                statusType={
                    history.length > 0
                        ? "ready"
                        : "neutral"
                }
                accent="magenta"
            />


            {/* =================================================
                HISTORY INFORMATION + ACTIONS
            ================================================= */}

            <div className="history-header">

                <div>

                    <p>
                        Previous controlled ADITI experiment runs
                    </p>

                </div>


                <div className="history-actions">


                    {/* RUN COUNT */}

                    <span className="history-count">

                        Runs: {runCount}

                    </span>


                    {/* DELETE BUTTON */}

                    <button
                        type="button"
                        className="history-delete-button"
                        onClick={
                            handleDeleteAllHistory
                        }
                        disabled={
                            history.length === 0 ||
                            isDeleting
                        }
                    >

                        {
                            isDeleting
                                ? "DELETING..."
                                : "DELETE ALL HISTORY"
                        }

                    </button>

                </div>

            </div>


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

                <p className="history-error">

                    {error}

                </p>

            )}


            {/* =================================================
                EMPTY HISTORY
            ================================================= */}

            {history.length === 0 ? (

                <div className="empty-state">

                    <p>
                        No saved experiment history yet.
                    </p>

                </div>

            ) : (


                /* =================================================
                   HISTORY TABLE
                ================================================= */

                <div className="history-table-wrapper">


                    <table className="history-table">


                        {/* TABLE HEADER */}

                        <thead>

                            <tr>

                                <th>Run</th>

                                <th>Timestamp</th>

                                <th>Experiments</th>

                                <th>Detections</th>

                                <th>Suppression</th>

                                <th>Output Rate</th>

                                <th>Models Avoided</th>

                            </tr>

                        </thead>


                        {/* TABLE BODY */}

                        <tbody>

                            {history
                                .slice()
                                .reverse()
                                .map(
                                    (
                                        run,
                                        index
                                    ) => {

                                        const metrics =
                                            run.metrics || {};


                                        return (

                                            <tr
                                                key={
                                                    run.timestamp ||
                                                    index
                                                }
                                            >


                                                {/* RUN NUMBER */}

                                                <td>

                                                    {
                                                        history.length
                                                        - index
                                                    }

                                                </td>


                                                {/* TIMESTAMP */}

                                                <td>

                                                    {
                                                        run.timestamp
                                                            ? new Date(
                                                                run.timestamp
                                                            ).toLocaleString()
                                                            : "Unknown"
                                                    }

                                                </td>


                                                {/* EXPERIMENT COUNT */}

                                                <td>

                                                    {
                                                        run.experiment_count
                                                        ?? 0
                                                    }

                                                </td>


                                                {/* TOTAL DETECTIONS */}

                                                <td>

                                                    {
                                                        metrics
                                                            .total_detections
                                                        ?? 0
                                                    }

                                                </td>


                                                {/* SUPPRESSION RATE */}

                                                <td>

                                                    {
                                                        metrics
                                                            .suppression_rate
                                                        ?? 0
                                                    }%

                                                </td>


                                                {/* OUTPUT GENERATION RATE */}

                                                <td>

                                                    {
                                                        metrics
                                                            .output_generation_rate
                                                        ?? 0
                                                    }%

                                                </td>


                                                {/* MODELS AVOIDED */}

                                                <td>

                                                    {
                                                        metrics
                                                            .average_models_avoided
                                                        ?? 0
                                                    }

                                                </td>


                                            </tr>
                                        );
                                    }
                                )}

                        </tbody>


                    </table>


                </div>
            )}


        </div>
    );
}


export default ExperimentHistory;