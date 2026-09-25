from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.core.data_models import AditiInput
from simulator.simulator_controller import SimulatorController

from backend.core.objective_manager import (
    ObjectiveManager,
    ObjectiveType
)

from backend.core.context_manager import ContextManager
from backend.core.relevance_engine import RelevanceEngine
from backend.core.reliability_engine import ReliabilityEngine
from backend.core.fusion_engine import FusionEngine
from backend.core.model_orchestrator import ModelOrchestrator
from backend.core.suppression_engine import SuppressionEngine
from backend.core.resource_manager import ResourceManager
from backend.core.output_manager import OutputManager
from backend.core.evaluation_manager import EvaluationManager

import os
import threading


# =========================================================
# ADITI FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="ADITI",
    description=(
        "Artificially Driven Data, Information "
        "and Tech Integration"
    ),
    version="1.0.0"
)


# =========================================================
# CORS CONFIGURATION
#
# Local development:
#   http://localhost:5173
#   http://127.0.0.1:5173
#
# Production:
#   Set FRONTEND_URLS on the hosting platform.
#
# Multiple URLs can be separated with commas.
# =========================================================

DEFAULT_FRONTEND_URLS = (
    "http://localhost:5173,"
    "http://127.0.0.1:5173"
)

frontend_urls = os.getenv(
    "FRONTEND_URLS",
    DEFAULT_FRONTEND_URLS
)

allowed_origins = [
    url.strip().rstrip("/")
    for url in frontend_urls.split(",")
    if url.strip()
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# ADITI CORE MODULES
# =========================================================

objective_manager = ObjectiveManager()
context_manager = ContextManager()
relevance_engine = RelevanceEngine()
reliability_engine = ReliabilityEngine()
fusion_engine = FusionEngine()
model_orchestrator = ModelOrchestrator()
suppression_engine = SuppressionEngine()
resource_manager = ResourceManager()
output_manager = OutputManager()
evaluation_manager = EvaluationManager()
simulator = SimulatorController()
simulator_lock = threading.RLock()

@app.get("/")
def root():
    return {
            "system": "ADITI",
            "status": "running"
                   }

@app.get("/system/status")
def system_status():

    return {
        "system": "ADITI",
        "status": "running",

        "modules": {

            "objective_manager": {
                "status": "running"
            },

            "context_manager": {
                "status": "running"
            },

            "relevance_engine": {
                "status": "running"
            },

            "reliability_engine": {
                "status": "running"
            },

            "fusion_engine": {
                "status": "running"
            },

            "suppression_engine": {
                "status": "running"
            },

            "model_orchestrator": {
                "status": "running"
            },

            "output_manager": {
                "status": "running"
            }

        }
    }

@app.post("/input/test")
def test_input(input_data:AditiInput):
    return{
        "received" : True,
        "input" : input_data
    }
 
@app.get("/simulator/inputs")
def simulator_inputs():
    inputs = simulator.collect_inputs()

    return {
        "count": len(inputs),
        "inputs": inputs
    }

@app.post("/objective/{objective}")
def set_objective(objective: ObjectiveType):
    current = objective_manager.set_objective(objective)

    return {
        "objective": current,
        "status": "active"
    }


@app.get("/objective")
def get_objective():
    return {
        "objective": objective_manager.get_objective()
    }

@app.get("/context")
def get_context():
    inputs = simulator.collect_inputs()

    context = context_manager.build_context(
        objective_manager.get_objective(),
        inputs
    )

    return context

@app.get("/relevance")
def get_relevance():

    inputs = simulator.collect_inputs()

    context = context_manager.build_context(
        objective_manager.get_objective(),
        inputs
    )

    relevance_results = (
        relevance_engine.evaluate_camera_context(
            context
        )
    )

    return {
        "objective": context.get("objective"),
        "results": relevance_results
    }

@app.get("/reliability")
def get_reliability():

    inputs = simulator.collect_inputs()

    results = (
        reliability_engine.evaluate_inputs(
            inputs
        )
    )

    return {
        "results": results
    }

@app.get("/fusion")
def get_fusion():

    inputs = simulator.collect_inputs()

    context = context_manager.build_context(
        objective_manager.get_objective(),
        inputs
    )

    relevance_results = relevance_engine.evaluate_camera_context(
        context
    )

    reliability_results = reliability_engine.evaluate_inputs(
        inputs
    )

    fused_results = fusion_engine.build_fused_results(
        context,
        relevance_results,
        reliability_results
    )

    return {
        "objective": context.get("objective"),
        "results": fused_results
    }

# =========================================================
# DECISION MATHEMATICS
# =========================================================
# Exposes the real intermediate calculations used by ADITI
# for Relevance, Reliability and Trust.
#
# IMPORTANT:
# The scores themselves are still produced by the existing
# RelevanceEngine and ReliabilityEngine. This endpoint only
# exposes their inputs, weighted contributions and final
# values so the frontend can explain the mathematics.
# =========================================================

@app.get("/decision/mathematics")
def get_decision_mathematics():

    with simulator_lock:

        current_scenario = simulator.get_current_scenario()

        scenario_objective = None

        if current_scenario:
            scenario_objective = current_scenario.get(
                "objective"
            )

        inputs = simulator.collect_inputs()

        context = context_manager.build_context(
            scenario_objective,
            inputs
        )

        relevance_results = (
            relevance_engine.evaluate_camera_context(
                context
            )
        )

        reliability_results = (
            reliability_engine.evaluate_inputs(
                inputs
            )
        )

        fused_results = (
            fusion_engine.build_fused_results(
                context,
                relevance_results,
                reliability_results
            )
        )

        # -------------------------------------------------
        # Relevance calculation breakdown
        # -------------------------------------------------

        relevance_breakdown = []

        camera_context = context.get(
            "camera",
            {}
        )

        camera_objects = camera_context.get(
            "objects",
            []
        )

        objective = context.get(
            "objective"
        )

        for detected_object in camera_objects:

            object_name = detected_object.get(
                "object",
                "unknown"
            )

            distance = detected_object.get(
                "distance"
            )

            direction = detected_object.get(
                "direction"
            )

            confidence = detected_object.get(
                "confidence",
                0.0
            )

            # ---------------------------------------------
            # Relevance contribution breakdown
            #
            # These rules mirror RelevanceEngine exactly.
            # They are expanded here only so the dashboard
            # can explain each contribution separately.
            # ---------------------------------------------

            normalized_object = str(
                object_name
            ).lower()

            normalized_direction = str(
                direction or "unknown"
            ).lower()

            objective_relevance = 0.0

            if objective == "obstacle_awareness":

                obstacle_objects = {
                    "car",
                    "bicycle",
                    "motorcycle",
                    "person",
                    "wall",
                    "pole",
                    "stairs",
                    "vehicle"
                }

                if normalized_object in obstacle_objects:
                    objective_relevance = 0.35

            elif objective == "navigation":

                navigation_objects = {
                    "door",
                    "doorway",
                    "stairs",
                    "crosswalk",
                    "road",
                    "vehicle",
                    "person"
                }

                if normalized_object in navigation_objects:
                    objective_relevance = 0.30

            elif objective == "object_identification":
                objective_relevance = 0.40

            elif objective == "environment_description":
                objective_relevance = 0.25

            elif objective == "general_assistance":
                objective_relevance = 0.25


            distance_relevance = 0.0

            if distance is not None:

                if distance <= 2:
                    distance_relevance = 0.30

                elif distance <= 5:
                    distance_relevance = 0.20

                elif distance <= 10:
                    distance_relevance = 0.10


            direction_relevance = 0.0

            if normalized_direction in {
                "ahead",
                "front",
                "center"
            }:
                direction_relevance = 0.20

            elif normalized_direction in {
                "left",
                "right"
            }:
                direction_relevance = 0.10


            confidence_contribution = (
                confidence * 0.15
            )

            raw_relevance = (
                objective_relevance
                + distance_relevance
                + direction_relevance
                + confidence_contribution
            )

            final_relevance = min(
                raw_relevance,
                1.0
            )

            relevance_breakdown.append({
                "object": object_name,
                "objective": objective,
                "distance": distance,
                "direction": direction,
                "confidence": confidence,

                "objective_relevance":
                    round(
                        objective_relevance,
                        3
                    ),

                "distance_relevance":
                    round(
                        distance_relevance,
                        3
                    ),

                "direction_relevance":
                    round(
                        direction_relevance,
                        3
                    ),

                "confidence_weight": 0.15,

                "confidence_contribution":
                    round(
                        confidence_contribution,
                        3
                    ),

                "raw_relevance":
                    round(
                        raw_relevance,
                        3
                    ),

                "final_relevance":
                    round(
                        final_relevance,
                        3
                    ),

                "capped_at_one":
                    raw_relevance > 1.0
            })

        # -------------------------------------------------
        # Reliability calculation breakdown
        # -------------------------------------------------

        reliability_breakdown = []

        for result in reliability_results:

            confidence = result.get(
                "confidence",
                0.0
            )

            source_weight = result.get(
                "source_weight",
                0.0
            )

            # ReliabilityEngine returns this as
            # "freshness_score".
            freshness = result.get(
                "freshness_score",
                0.0
            )

            confidence_contribution = (
                confidence * 0.50
            )

            source_contribution = (
                source_weight * 0.30
            )

            freshness_contribution = (
                freshness * 0.20
            )

            calculated_reliability = (
                confidence_contribution
                + source_contribution
                + freshness_contribution
            )

            reliability_breakdown.append({
                "source": result.get(
                    "source",
                    "unknown"
                ),

                "confidence": confidence,
                "confidence_weight": 0.50,
                "confidence_contribution":
                    round(
                        confidence_contribution,
                        3
                    ),

                "source_weight": source_weight,
                "source_weight_factor": 0.30,
                "source_contribution":
                    round(
                        source_contribution,
                        3
                    ),

                "freshness": freshness,
                "freshness_weight": 0.20,
                "freshness_contribution":
                    round(
                        freshness_contribution,
                        3
                    ),

                "calculated_reliability":
                    round(
                        calculated_reliability,
                        3
                    ),

                "final_reliability":
                    result.get(
                        "reliability_score"
                    )
            })

        # -------------------------------------------------
        # Trust calculation breakdown
        # -------------------------------------------------

        trust_breakdown = []

        # Camera reliability is the reliability value used for
        # camera-detected objects. Keep it available as a safe
        # fallback if a fused item does not expose the component
        # score directly.
        camera_reliability = 0.0

        for reliability_item in reliability_results:

            if (
                reliability_item.get("source")
                == "camera"
            ):
                camera_reliability = (
                    reliability_item.get(
                        "reliability_score",
                        0.0
                    )
                )
                break

        # Relevance results are indexed by object so the
        # explainability endpoint can recover the exact
        # RelevanceEngine score when needed.
        relevance_by_object = {}

        for relevance_item in relevance_results:

            relevance_key = str(
                relevance_item.get(
                    "object",
                    "unknown"
                )
            ).lower()

            relevance_by_object[
                relevance_key
            ] = relevance_item.get(
                "relevance_score",
                0.0
            )

        for item in fused_results:

            object_name = item.get(
                "object",
                "unknown"
            )

            object_key = str(
                object_name
            ).lower()

            # Prefer component values carried by FusionEngine.
            # Fall back to the exact source-engine results.
            relevance = item.get(
                "relevance_score",
                relevance_by_object.get(
                    object_key,
                    0.0
                )
            )

            reliability = item.get(
                "reliability_score",
                camera_reliability
            )

            relevance_contribution = (
                relevance * 0.60
            )

            reliability_contribution = (
                reliability * 0.40
            )

            # Use the same ReliabilityEngine trust method used
            # by ADITI instead of duplicating the final clamp
            # and rounding behavior here.
            calculated_trust = (
                reliability_engine
                .calculate_trust_score(
                    relevance,
                    reliability
                )
            )

            trust_breakdown.append({
                "object": object_name,

                "relevance": relevance,
                "relevance_weight": 0.60,
                "relevance_contribution":
                    round(
                        relevance_contribution,
                        3
                    ),

                "reliability": reliability,
                "reliability_weight": 0.40,
                "reliability_contribution":
                    round(
                        reliability_contribution,
                        3
                    ),

                "calculated_trust":
                    calculated_trust,

                "final_trust":
                    item.get(
                        "trust_score",
                        calculated_trust
                    )
            })

        return {
            "scenario": (
                current_scenario.get(
                    "name",
                    "unknown"
                )
                if current_scenario
                else "unknown"
            ),

            "objective": objective,

            "formulas": {
                "relevance": (
                    "objective_relevance + "
                    "distance_relevance + "
                    "direction_relevance + "
                    "(confidence * 0.15)"
                ),

                "reliability": (
                    "(confidence * 0.50) + "
                    "(source_weight * 0.30) + "
                    "(freshness_score * 0.20)"
                ),

                "trust": (
                    "(relevance * 0.60) + "
                    "(reliability * 0.40)"
                )
            },

            "relevance":
                relevance_breakdown,

            "reliability":
                reliability_breakdown,

            "trust":
                trust_breakdown
        }


@app.get("/models/selection")
def get_model_selection():

    inputs = simulator.collect_inputs()

    context = context_manager.build_context(
        objective_manager.get_objective(),
        inputs
    )

    objective = context.get(
        "objective"
    )

    if objective is None:
        objective = "general_assistance"

    selection = (
        model_orchestrator.select_models(
            objective,
            context
        )
    )

    return selection

@app.get("/suppression")
def get_suppression():
        
    inputs = simulator.collect_inputs()
        
    context = context_manager.build_context(
                objective_manager.get_objective(),
                inputs
            )
        
    relevance_results = (
                relevance_engine.evaluate_camera_context(
                    context
                )
            )
        
    reliability_results = (
                reliability_engine.evaluate_inputs(
                    inputs
                )
            )
        
    fused_results = (
                fusion_engine.build_fused_results(
                    context,
                    relevance_results,
                    reliability_results
                )
            )
        
    suppression_results = (
                suppression_engine.process_information(
                    fused_results
                )
            )
        
    return {
"objective": context.get("objective"),
"results": suppression_results
    }


@app.get("/resources")
def get_resources():

    inputs = simulator.collect_inputs()

    context = context_manager.build_context(
        objective_manager.get_objective(),
        inputs
    )

    objective = context.get("objective")

    if objective is None:
        objective = "general_assistance"

    selection = model_orchestrator.select_models(
        objective,
        context
    )

    selected_models = selection[
        "selected_models"
    ]

    all_models = list(
        model_orchestrator.available_models.keys()
    )

    comparison = (
        resource_manager.compare_resource_usage(
            all_models,
            selected_models
        )
    )

    return comparison


@app.get("/decision")
def get_decision(record_evaluation: bool = False):

    # Get the currently loaded simulator scenario.
    current_scenario = simulator.get_current_scenario()

    # Read the objective directly from the current scenario.
    scenario_objective = None

    if current_scenario:
        scenario_objective = current_scenario.get(
            "objective"
        )

    # Collect simulated multimodal inputs.
    inputs = simulator.collect_inputs()

    # Build context using the scenario objective.
    context = context_manager.build_context(
        scenario_objective,
        inputs
    )

    # Evaluate relevance.
    relevance_results = (
        relevance_engine.evaluate_camera_context(
            context
        )
    )

    # Evaluate reliability.
    reliability_results = (
        reliability_engine.evaluate_inputs(
            inputs
        )
    )

    # Fuse context, relevance and reliability.
    fused_results = (
        fusion_engine.build_fused_results(
            context,
            relevance_results,
            reliability_results
        )
    )

    # Decide what information should be
    # kept, delayed or suppressed.
    suppression_results = (
        suppression_engine.process_information(
            fused_results
        )
    )

    # Generate output decisions only from
    # information that was kept.
    output_results = (
        output_manager.process_outputs(
            suppression_results["kept"]
        )
    )

    # Build the final high-level decision.
    final_decision = (
        output_manager.build_final_decision(
            output_results
        )
    )

    # Get scenario name for evaluation records.
    scenario_name = "unknown"

    if current_scenario:
        scenario_name = current_scenario.get(
            "name",
            "unknown"
        )

    # Get simulated resource comparison.
    resource_results = get_resources()

    # Record only when explicitly requested.
    if record_evaluation:

        evaluation_manager.record_result(
            scenario=scenario_name,
            objective=(
                scenario_objective
                if scenario_objective
                else "unknown"
            ),
            fused_results=fused_results,
            suppression=suppression_results,
            outputs=output_results,
            resources=resource_results
        )

    return {
        "objective": context.get(
            "objective"
        ),
        "fused_results": fused_results,
        "suppression": suppression_results,
        "outputs": output_results,
        "final_decision": final_decision
    }


@app.get("/simulator/scenarios")
def get_simulator_scenarios():

    return {
        "scenarios":
            simulator.get_available_scenarios()
    }


# =========================================================
# CURRENT SIMULATOR SCENARIO
# =========================================================
# Exposes the complete scenario currently loaded by the
# SimulatorController. The frontend Camera / Vision simulator
# can use this endpoint so its visual scene always matches
# the same stored camera, IMU, GPS and audio scenario data
# used by the ADITI backend.
# =========================================================

@app.get("/simulator/current-scenario")
def get_current_simulator_scenario():

    with simulator_lock:

        scenario = simulator.get_current_scenario()
        scenario_key = simulator.get_current_scenario_key()

        if scenario is None:
            raise HTTPException(
                status_code=404,
                detail="No simulator scenario is currently loaded."
            )

        return {
            "scenario_key": scenario_key,
            "scenario": scenario
        }


@app.post("/simulator/scenario/{scenario_name}")
def set_simulator_scenario(scenario_name: str):

    with simulator_lock:

        scenario= simulator.load_scenario(
            scenario_name
        )

        return {
            "message":"Scenario changed sucessfully",
            "Scenario": scenario
        }


@app.get("/simulator/failure/{source}")
def simulate_sensor_failure(
    source: str
):

    inputs = (
        simulator.collect_inputs_with_failure(
            source
        )
    )

    context = context_manager.build_context(
        objective_manager.get_objective(),
        inputs
    )

    return {
        "failed_source": source,
        "context": context
    }


@app.get("/experiments/results")
def get_experiment_results():

    return {
        "count": len(
            evaluation_manager.get_results()
        ),
        "results":
            evaluation_manager.get_results()
    }


@app.delete("/experiments/results")
def clear_experiment_results():

    evaluation_manager.clear_results()

    return {
        "message":
            "Experiment results cleared"
    }

@app.post("/experiments/run-all")
def run_all_experiments():

    with simulator_lock:

        # ---------------------------------------------
        # Remember the scenario selected by the user
        # before starting the full evaluation.
        # ---------------------------------------------

        previous_scenario_key = (
            simulator.get_current_scenario_key()
        )


        # ---------------------------------------------
        # Start with clean experiment results
        # ---------------------------------------------

        evaluation_manager.clear_results()


        scenarios = [
            "obstacle",
            "navigation",
            "object_identification",
            "text_reading",
            "general_assistance"
        ]


        completed = []


        try:

            # -----------------------------------------
            # Run every standard evaluation scenario
            # -----------------------------------------

            for scenario_name in scenarios:

                simulator.load_scenario(
                    scenario_name
                )


                decision = get_decision(
                    record_evaluation=True
                )


                current_scenario = (
                    simulator.get_current_scenario()
                )


                completed.append({

                    "scenario":
                        scenario_name,

                    "objective":
                        current_scenario.get(
                            "objective",
                            "unknown"
                        ),

                    "final_decision":
                        decision.get(
                            "final_decision"
                        )
                })


            # -----------------------------------------
            # Save completed evaluation to history
            # -----------------------------------------

            history_record = (
                evaluation_manager
                .save_run_to_history()
            )


            return {

                "message":
                    "ADITI experiment run completed",

                "scenarios_tested":
                    len(completed),

                "completed":
                    completed,

                "experiment_results":
                    evaluation_manager.get_results(),

                "history_record":
                    history_record
            }


        finally:

            # -----------------------------------------
            # IMPORTANT:
            # Restore the scenario that was active
            # before Run Full Evaluation was pressed.
            # -----------------------------------------

            if previous_scenario_key:

                simulator.load_scenario(
                    previous_scenario_key
                )

@app.get("/experiments/metrics")
def get_experiment_metrics():

    return evaluation_manager.calculate_metrics()


@app.get("/experiments/by-scenario")
def get_experiments_by_scenario():

    results = evaluation_manager.get_results()

    grouped = {}

    for result in results:

        scenario = result.get(
            "scenario",
            "unknown"
        )

        grouped[scenario] = result

    return {
        "scenario_count": len(grouped),
        "scenarios": grouped
    }


@app.post("/experiments/run-suppression-test")
def run_suppression_test():

    simulator.load_scenario(
        "irrelevant_noise"
    )

    decision = get_decision()

    suppression = decision.get(
        "suppression",
        {}
    )

    suppressed_items = suppression.get(
        "suppressed",
        []
    )

    kept_items = suppression.get(
        "kept",
        []
    )

    delayed_items = suppression.get(
        "delayed",
        []
    )

    suppression_success = (
        len(suppressed_items) > 0
    )

    return {
        "test": "irrelevant_information_suppression",

        "scenario": "irrelevant_noise",

        "objective": (
            simulator
            .get_current_scenario()
            .get("objective", "unknown")
        ),

        "suppression_success":
            suppression_success,

        "suppressed_count":
            len(suppressed_items),

        "kept_count":
            len(kept_items),

        "delayed_count":
            len(delayed_items),

        "suppressed_items":
            suppressed_items
    }


@app.get("/experiments/validation-summary")
def get_validation_summary():

    with simulator_lock:

        standard_results = (
            evaluation_manager.get_results()
        )

        metrics = (
            evaluation_manager.calculate_metrics()
        )

        # Remember current scenario
        previous_scenario_key = (
    simulator.get_current_scenario_key()
)
       

        # Load dedicated suppression scenario
        simulator.load_scenario(
            "irrelevant_noise"
        )

        # Run ADITI without recording it as
        # a standard experiment.
        suppression_decision = get_decision(
            record_evaluation=False
        )

        suppression_data = (
            suppression_decision.get(
                "suppression",
                {}
            )
        )

        suppressed_items = (
            suppression_data.get(
                "suppressed",
                []
            )
        )

        suppression_success = (
            len(suppressed_items) > 0
        )

        # Restore previous simulator scenario
        if previous_scenario_key:

         simulator.load_scenario(
         previous_scenario_key
    )

        return {
            "system": "ADITI Validation",

            "standard_evaluation": {
                "experiments_recorded":
                    len(standard_results),

                "metrics":
                    metrics
            },

            "suppression_validation": {
                "scenario":
                    "irrelevant_noise",

                "objective":
                    "navigation",

                "success":
                    suppression_success,

                "suppressed_count":
                    len(suppressed_items)
            },

            "overall_status": (
                "validation_passed"
                if suppression_success
                else "validation_incomplete"
            )
        }


@app.get("/experiments/history")
def get_experiment_history():

    history = evaluation_manager.get_history()

    return {
        "run_count": len(history),
        "history": history
    }


@app.delete("/experiments/history")
def delete_experiment_history():

    try:

        evaluation_manager.clear_history()

        return {
            "success": True,
            "message": "All experiment history deleted.",
            "run_count": 0,
            "history": []
        }

    except Exception as exc:

        print(
            "DELETE HISTORY ERROR:",
            repr(exc)
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Failed to delete "
                f"experiment history: {str(exc)}"
            )
        )


@app.get("/experiments/history/latest")
def get_latest_experiment_history():

    history = evaluation_manager.get_history()

    if not history:
        return {
            "status": "no_history",
            "latest_run": None
        }

    return {
        "status": "available",
        "latest_run": history[-1]
    }


@app.post("/experiments/export")
def export_experiment_report():

    return evaluation_manager.export_report_files()