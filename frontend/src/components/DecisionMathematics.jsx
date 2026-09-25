import {
    useEffect,
    useState
} from "react";

import {
    Calculator,
    ChevronDown,
    ChevronUp
} from "lucide-react";

import {
    getDecisionMathematics
} from "../services/api";

import PanelHeader from "./ui/PanelHeader";
import "./DecisionMathematics.css";


function number(value, digits = 3) {

    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
        return "—";
    }

    return parsed.toFixed(digits);
}


function EquationRow({
    label,
    expression,
    value
}) {

    return (
        <div className="math-equation-row">

            <span className="math-equation-label">
                {label}
            </span>

            <code>
                {expression}
            </code>

            <strong>
                {value}
            </strong>

        </div>
    );
}


function MathCard({
    title,
    subtitle,
    score,
    children
}) {

    return (
        <article className="decision-math-card">

            <div className="decision-math-card-header">

                <div>
                    <span className="decision-math-kicker">
                        {subtitle}
                    </span>

                    <h4>
                        {title}
                    </h4>
                </div>

                <div className="decision-math-score">
                    {number(score)}
                </div>

            </div>

            <div className="decision-math-equations">
                {children}
            </div>

        </article>
    );
}


function DecisionMathematics({
    refreshKey = 0
}) {

    const [
        data,
        setData
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState(null);

    const [
        expanded,
        setExpanded
    ] = useState({
        relevance: true,
        reliability: true,
        trust: true
    });


    useEffect(() => {

        let active = true;

        async function loadMathematics() {

            try {

                setLoading(true);

                const response =
                    await getDecisionMathematics();

                if (!active) {
                    return;
                }

                setData(response);
                setError(null);

            } catch (err) {

                if (!active) {
                    return;
                }

                setError(err.message);

            } finally {

                if (active) {
                    setLoading(false);
                }
            }
        }

        loadMathematics();

        return () => {
            active = false;
        };

    }, [refreshKey]);


    function toggle(section) {

        setExpanded(previous => ({
            ...previous,
            [section]: !previous[section]
        }));
    }


    const relevance =
        Array.isArray(data?.relevance)
            ? data.relevance
            : [];

    const reliability =
        Array.isArray(data?.reliability)
            ? data.reliability
            : [];

    const trust =
        Array.isArray(data?.trust)
            ? data.trust
            : [];


    return (
        <div className="panel decision-mathematics-panel">

            <PanelHeader
                icon={Calculator}
                title="Decision Mathematics"
                subtitle="Relevance • Reliability • Trust"
                status="Live"
                statusType="live"
                accent="cyan"
            />

            <div className="decision-math-context">

                <div>
                    <span>SCENARIO</span>
                    <strong>
                        {data?.scenario || "—"}
                    </strong>
                </div>

                <div>
                    <span>OBJECTIVE</span>
                    <strong>
                        {data?.objective || "—"}
                    </strong>
                </div>

                <div>
                    <span>CALCULATION MODE</span>
                    <strong>
                        BACKEND EXPLAINABILITY
                    </strong>
                </div>

            </div>

            {
                loading && !data && (
                    <p className="decision-math-message">
                        Loading ADITI calculations...
                    </p>
                )
            }

            {
                error && (
                    <p className="decision-math-error">
                        {error}
                    </p>
                )
            }

            {
                data && (
                    <div className="decision-math-sections">

                        <section className="decision-math-section">

                            <button
                                type="button"
                                className="decision-math-section-title"
                                onClick={() => toggle("relevance")}
                            >
                                <span>
                                    01 — RELEVANCE CALCULATION
                                </span>

                                {
                                    expanded.relevance
                                        ? <ChevronUp size={17} />
                                        : <ChevronDown size={17} />
                                }
                            </button>

                            {
                                expanded.relevance && (
                                    <>
                                        <div className="decision-math-formula">
                                            <span>FORMULA</span>
                                            <code>
                                                {data.formulas?.relevance}
                                            </code>
                                        </div>

                                        <div className="decision-math-grid">

                                            {
                                                relevance.map(
                                                    (item, index) => (

                                                        <MathCard
                                                            key={`${item.object}-${index}`}
                                                            title={
                                                                String(
                                                                    item.object ||
                                                                    "unknown"
                                                                ).toUpperCase()
                                                            }
                                                            subtitle="OBJECT RELEVANCE"
                                                            score={
                                                                item.final_relevance
                                                            }
                                                        >

                                                            <EquationRow
                                                                label="Objective"
                                                                expression={`objective(${item.object})`}
                                                                value={`+ ${number(item.objective_relevance)}`}
                                                            />

                                                            <EquationRow
                                                                label="Distance"
                                                                expression={`${item.distance ?? "—"} m`}
                                                                value={`+ ${number(item.distance_relevance)}`}
                                                            />

                                                            <EquationRow
                                                                label="Direction"
                                                                expression={`${item.direction ?? "—"}`}
                                                                value={`+ ${number(item.direction_relevance)}`}
                                                            />

                                                            <EquationRow
                                                                label="Confidence"
                                                                expression={`${number(item.confidence, 2)} × ${number(item.confidence_weight, 2)}`}
                                                                value={`+ ${number(item.confidence_contribution)}`}
                                                            />

                                                            <div className="decision-math-total">

                                                                <span>
                                                                    RAW
                                                                </span>

                                                                <code>
                                                                    {number(item.objective_relevance)}
                                                                    {" + "}
                                                                    {number(item.distance_relevance)}
                                                                    {" + "}
                                                                    {number(item.direction_relevance)}
                                                                    {" + "}
                                                                    {number(item.confidence_contribution)}
                                                                </code>

                                                                <strong>
                                                                    = {number(item.raw_relevance)}
                                                                </strong>

                                                            </div>

                                                            {
                                                                item.capped_at_one && (
                                                                    <div className="decision-math-cap">
                                                                        CAPPED AT 1.000
                                                                    </div>
                                                                )
                                                            }

                                                        </MathCard>
                                                    )
                                                )
                                            }

                                        </div>
                                    </>
                                )
                            }

                        </section>


                        <section className="decision-math-section">

                            <button
                                type="button"
                                className="decision-math-section-title"
                                onClick={() => toggle("reliability")}
                            >
                                <span>
                                    02 — RELIABILITY CALCULATION
                                </span>

                                {
                                    expanded.reliability
                                        ? <ChevronUp size={17} />
                                        : <ChevronDown size={17} />
                                }
                            </button>

                            {
                                expanded.reliability && (
                                    <>
                                        <div className="decision-math-formula">
                                            <span>FORMULA</span>
                                            <code>
                                                {data.formulas?.reliability}
                                            </code>
                                        </div>

                                        <div className="decision-math-grid">

                                            {
                                                reliability.map(
                                                    (item, index) => (

                                                        <MathCard
                                                            key={`${item.source}-${index}`}
                                                            title={
                                                                String(
                                                                    item.source ||
                                                                    "unknown"
                                                                ).toUpperCase()
                                                            }
                                                            subtitle="SOURCE RELIABILITY"
                                                            score={
                                                                item.final_reliability
                                                            }
                                                        >

                                                            <EquationRow
                                                                label="Confidence"
                                                                expression={`${number(item.confidence, 2)} × ${number(item.confidence_weight, 2)}`}
                                                                value={`= ${number(item.confidence_contribution)}`}
                                                            />

                                                            <EquationRow
                                                                label="Source Weight"
                                                                expression={`${number(item.source_weight, 2)} × ${number(item.source_weight_factor, 2)}`}
                                                                value={`= ${number(item.source_contribution)}`}
                                                            />

                                                            <EquationRow
                                                                label="Freshness"
                                                                expression={`${number(item.freshness, 2)} × ${number(item.freshness_weight, 2)}`}
                                                                value={`= ${number(item.freshness_contribution)}`}
                                                            />

                                                            <div className="decision-math-total">

                                                                <span>
                                                                    TOTAL
                                                                </span>

                                                                <code>
                                                                    {number(item.confidence_contribution)}
                                                                    {" + "}
                                                                    {number(item.source_contribution)}
                                                                    {" + "}
                                                                    {number(item.freshness_contribution)}
                                                                </code>

                                                                <strong>
                                                                    = {number(item.calculated_reliability)}
                                                                </strong>

                                                            </div>

                                                        </MathCard>
                                                    )
                                                )
                                            }

                                        </div>
                                    </>
                                )
                            }

                        </section>


                        <section className="decision-math-section">

                            <button
                                type="button"
                                className="decision-math-section-title"
                                onClick={() => toggle("trust")}
                            >
                                <span>
                                    03 — TRUST CALCULATION
                                </span>

                                {
                                    expanded.trust
                                        ? <ChevronUp size={17} />
                                        : <ChevronDown size={17} />
                                }
                            </button>

                            {
                                expanded.trust && (
                                    <>
                                        <div className="decision-math-formula">
                                            <span>FORMULA</span>
                                            <code>
                                                {data.formulas?.trust}
                                            </code>
                                        </div>

                                        <div className="decision-math-grid">

                                            {
                                                trust.map(
                                                    (item, index) => (

                                                        <MathCard
                                                            key={`${item.object}-${index}`}
                                                            title={
                                                                String(
                                                                    item.object ||
                                                                    "unknown"
                                                                ).toUpperCase()
                                                            }
                                                            subtitle="FUSED TRUST"
                                                            score={
                                                                item.final_trust ??
                                                                item.calculated_trust
                                                            }
                                                        >

                                                            <EquationRow
                                                                label="Relevance"
                                                                expression={`${number(item.relevance)} × ${number(item.relevance_weight, 2)}`}
                                                                value={`= ${number(item.relevance_contribution)}`}
                                                            />

                                                            <EquationRow
                                                                label="Reliability"
                                                                expression={`${number(item.reliability)} × ${number(item.reliability_weight, 2)}`}
                                                                value={`= ${number(item.reliability_contribution)}`}
                                                            />

                                                            <div className="decision-math-total">

                                                                <span>
                                                                    TRUST
                                                                </span>

                                                                <code>
                                                                    {number(item.relevance_contribution)}
                                                                    {" + "}
                                                                    {number(item.reliability_contribution)}
                                                                </code>

                                                                <strong>
                                                                    = {number(item.calculated_trust)}
                                                                </strong>

                                                            </div>

                                                        </MathCard>
                                                    )
                                                )
                                            }

                                        </div>
                                    </>
                                )
                            }

                        </section>

                    </div>
                )
            }

        </div>
    );
}


export default DecisionMathematics;
