from backend.core.fusion_engine import FusionEngine


def test_fuse_object_information():

    engine = FusionEngine()

    object_data = {
        "object": "bicycle",
        "distance": 2.0,
        "direction": "ahead"
    }

    motion_data = {
        "movement": "walking",
        "heading": 90
    }

    result = engine.fuse_object_information(
        object_data=object_data,
        motion_data=motion_data,
        objective="obstacle_awareness",
        relevance_score=0.90,
        reliability_score=0.88,
        trust_score=0.892
    )

    assert result["object"] == "bicycle"

    assert result["risk_level"] in {
        "medium",
        "high",
        "critical"
    }

    assert result["interpretation"] is not None

    def test_low_risk_object():

     engine = FusionEngine()

    result = engine.fuse_object_information(
        object_data={
            "object": "tree",
            "distance": 20,
            "direction": "right"
        },
        motion_data={
            "movement": "standing",
            "heading": 90
        },
        objective="general_assistance",
        relevance_score=0.20,
        reliability_score=0.90,
        trust_score=0.48
    )

    assert result["risk_level"] == "low"

from backend.core.context_manager import (
    ContextManager
)

from backend.core.objective_manager import (
    ObjectiveType
)

from backend.core.relevance_engine import (
    RelevanceEngine
)

from backend.core.reliability_engine import (
    ReliabilityEngine
)

from simulator.simulator_controller import (
    SimulatorController
)


def test_full_fusion_pipeline():

    simulator = SimulatorController()

    context_manager = ContextManager()
    relevance_engine = RelevanceEngine()
    reliability_engine = ReliabilityEngine()
    fusion_engine = FusionEngine()

    inputs = simulator.collect_inputs()

    context = context_manager.build_context(
        ObjectiveType.OBSTACLE_AWARENESS,
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

    assert len(fused_results) > 0

    assert "risk_level" in fused_results[0]

    assert "interpretation" in fused_results[0]

    assert "trust_score" in fused_results[0]