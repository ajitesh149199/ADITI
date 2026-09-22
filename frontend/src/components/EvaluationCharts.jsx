import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import { ChartSpline } from "lucide-react";

import PanelHeader from "./ui/PanelHeader";


/* =========================================================
   CUSTOM ADITI TOOLTIP
========================================================= */

function AditiTooltip({ active, payload, label }) {

    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                minWidth: "170px",
                padding: "12px 14px",
                background: "rgba(5, 8, 14, 0.96)",
                border: "1px solid rgba(0, 229, 255, 0.28)",
                borderRadius: "10px",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.55)",
                color: "#ffffff"
            }}
        >
            <div
                style={{
                    marginBottom: "8px",
                    paddingBottom: "7px",
                    borderBottom:
                        "1px solid rgba(255,255,255,0.10)",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.08em"
                }}
            >
                {label}
            </div>

            {payload.map((entry) => (

                <div
                    key={entry.dataKey}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "22px",
                        marginTop: "6px",
                        fontSize: "11px"
                    }}
                >
                    <span
                        style={{
                            color:
                                entry.color ||
                                "rgba(255,255,255,0.65)"
                        }}
                    >
                        {entry.name}
                    </span>

                    <strong
                        style={{
                            color: "#ffffff"
                        }}
                    >
                        {entry.value}
                    </strong>
                </div>

            ))}
        </div>
    );
}


/* =========================================================
   X-AXIS LABEL
========================================================= */

function ScenarioTick({
    x,
    y,
    payload
}) {

    const scenarioNames = {

        "Obstacle Awareness": [
            "Obstacle",
            "Awareness"
        ],

        "Navigation": [
            "Navigation"
        ],

        "Object Identification": [
            "Object",
            "Identification"
        ],

        "Text Reading": [
            "Text",
            "Reading"
        ],

        "General Assistance": [
            "General",
            "Assistance"
        ]
    };

    const lines =
        scenarioNames[payload.value] ||
        [payload.value];

    return (
        <g transform={`translate(${x},${y})`}>

            <text
                x={0}
                y={0}
                dy={14}
                textAnchor="middle"
                fill="rgba(255,255,255,0.58)"
                fontSize={10}
            >
                {lines.map((line, index) => (

                    <tspan
                        key={index}
                        x={0}
                        dy={
                            index === 0
                                ? 0
                                : 13
                        }
                    >
                        {line}
                    </tspan>

                ))}
            </text>

        </g>
    );
}


/* =========================================================
   EVALUATION CHARTS
========================================================= */

function EvaluationCharts({ results = [] }) {


    /* =====================================================
       EMPTY STATE
    ===================================================== */

    if (
        !Array.isArray(results) ||
        results.length === 0
    ) {

        return (

            <div className="panel evaluation-charts">

                <PanelHeader
                    icon={ChartSpline}
                    title="Evaluation Analytics"
                    subtitle="Visual analysis of ADITI experiment performance"
                    status="Waiting"
                    statusType="neutral"
                    accent="cyan"
                />

                <div className="chart-empty-state">

                    <ChartSpline size={30} />

                    <p>
                        Run the ADITI experiments to
                        generate evaluation analytics.
                    </p>

                </div>

            </div>
        );
    }


    /* =====================================================
       PREPARE BACKEND DATA
    ===================================================== */

    const chartData = results.map((result) => ({

        scenario:
            result.scenario || "Unknown",

        kept:
            Number(result.kept ?? 0),

        delayed:
            Number(result.delayed ?? 0),

        suppressed:
            Number(result.suppressed ?? 0),

        modelsAvoided:
            Number(result.models_avoided ?? 0)

    }));


    /* =====================================================
       Y-AXIS LIMITS
    ===================================================== */

    const informationMaximum = Math.max(

        1,

        ...chartData.map((item) =>
            Math.max(
                item.kept,
                item.delayed,
                item.suppressed
            )
        )

    );


    const modelMaximum = Math.max(

        1,

        ...chartData.map(
            (item) => item.modelsAvoided
        )

    );


    return (

        <div className="panel evaluation-charts">


            {/* =================================================
                PANEL HEADER
            ================================================= */}

            <PanelHeader
                icon={ChartSpline}
                title="Evaluation Analytics"
                subtitle="Visual analysis of ADITI experiment performance"
                status="Live Data"
                statusType="ready"
                accent="cyan"
            />


            {/* =================================================
                ANALYTICS INTRO
            ================================================= */}

            <div className="analytics-intro">

                <div>

                    <span className="analytics-label">
                        EXPERIMENT VISUALIZATION
                    </span>

                    <h3>
                        ADITI Performance Intelligence
                    </h3>

                    <p>
                        Scenario-level visualization of
                        information filtering and model
                        optimization.
                    </p>

                </div>


                <div className="analytics-scenario-count">

                    <span>
                        SCENARIOS
                    </span>

                    <strong>
                        {chartData.length}
                    </strong>

                </div>

            </div>


            {/* =================================================
                CHART 01 — INFORMATION PROCESSING
            ================================================= */}

            <div className="chart-section">

                <div className="chart-section-header">

                    <div>

                        <span className="chart-index">
                            01
                        </span>

                        <h3>
                            Information Processing
                        </h3>

                        <p>
                            Kept, delayed and suppressed
                            information by scenario.
                        </p>

                    </div>


                    <span className="chart-status">
                        FILTERING
                    </span>

                </div>


                <div
                    className="chart-container"
                    style={{
                        width: "100%",
                        height: "380px",
                        minHeight: "380px",
                        position: "relative"
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 25,
                                right: 25,
                                left: 10,
                                bottom: 55
                            }}
                            barCategoryGap="22%"
                            barGap={3}
                        >

                            <CartesianGrid
                                stroke="rgba(255,255,255,0.08)"
                                strokeDasharray="4 5"
                                vertical={false}
                            />


                            <XAxis
                                dataKey="scenario"
                                tick={<ScenarioTick />}
                                axisLine={{
                                    stroke:
                                        "rgba(0,229,255,0.20)"
                                }}
                                tickLine={false}
                                interval={0}
                                height={55}
                            />


                            <YAxis
                                domain={[
                                    0,
                                    informationMaximum + 1
                                ]}
                                allowDecimals={false}
                                tick={{
                                    fill:
                                        "rgba(255,255,255,0.55)",
                                    fontSize: 11
                                }}
                                axisLine={false}
                                tickLine={false}
                            />


                            <Tooltip
                                content={<AditiTooltip />}
                                cursor={{
                                    fill:
                                        "rgba(0,229,255,0.035)"
                                }}
                            />


                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                wrapperStyle={{
                                    fontSize: "12px",
                                    color:
                                        "rgba(255,255,255,0.65)"
                                }}
                            />


                            <Bar
                                dataKey="delayed"
                                name="Delayed"
                                fill="#9ca3af"
                                isAnimationActive={false}
                                maxBarSize={40}
                            />


                            <Bar
                                dataKey="kept"
                                name="Kept"
                                fill="#00e5ff"
                                isAnimationActive={false}
                                maxBarSize={40}
                            />


                            <Bar
                                dataKey="suppressed"
                                name="Suppressed"
                                fill="#ff2bd6"
                                isAnimationActive={false}
                                maxBarSize={40}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* =================================================
                CHART 02 — MODEL OPTIMIZATION
            ================================================= */}

            <div className="chart-section">

                <div className="chart-section-header">

                    <div>

                        <span className="chart-index">
                            02
                        </span>

                        <h3>
                            Model Optimization
                        </h3>

                        <p>
                            Unnecessary model executions
                            avoided by ADITI.
                        </p>

                    </div>


                    <span className="chart-status magenta">
                        OPTIMIZATION
                    </span>

                </div>


                <div
                    className="chart-container"
                    style={{
                        width: "100%",
                        height: "380px",
                        minHeight: "380px",
                        position: "relative"
                    }}
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={chartData}
                            margin={{
                                top: 25,
                                right: 25,
                                left: 10,
                                bottom: 55
                            }}
                            barCategoryGap="28%"
                        >

                            <CartesianGrid
                                stroke="rgba(255,255,255,0.08)"
                                strokeDasharray="4 5"
                                vertical={false}
                            />


                            <XAxis
                                dataKey="scenario"
                                tick={<ScenarioTick />}
                                axisLine={{
                                    stroke:
                                        "rgba(255,43,214,0.20)"
                                }}
                                tickLine={false}
                                interval={0}
                                height={55}
                            />


                            <YAxis
                                domain={[
                                    0,
                                    modelMaximum + 1
                                ]}
                                allowDecimals={false}
                                tick={{
                                    fill:
                                        "rgba(255,255,255,0.55)",
                                    fontSize: 11
                                }}
                                axisLine={false}
                                tickLine={false}
                            />


                            <Tooltip
                                content={<AditiTooltip />}
                                cursor={{
                                    fill:
                                        "rgba(255,43,214,0.035)"
                                }}
                            />


                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                wrapperStyle={{
                                    fontSize: "12px",
                                    color:
                                        "rgba(255,255,255,0.65)"
                                }}
                            />


                            <Bar
                                dataKey="modelsAvoided"
                                name="Models Avoided"
                                fill="#ff2bd6"
                                isAnimationActive={false}
                                maxBarSize={54}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}


export default EvaluationCharts;