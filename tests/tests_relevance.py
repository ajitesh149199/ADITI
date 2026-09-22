from backend.core.relevance_engine import RelevanceEngine


def test_high_relevance_obstacle():

    engine = RelevanceEngine()

    detected_object = {
        "object": "bicycle",
        "confidence": 0.95,
        "distance": 1.5,
        "direction": "ahead"
    }

    result = engine.calculate_object_relevance(
        detected_object,
        "obstacle_awareness"
    )

    assert result["relevance_score"] > 0.7

    assert result["priority"] in {
        "medium",
        "high"
    }


def test_low_relevance_object():

    engine = RelevanceEngine()

    detected_object = {
        "object": "tree",
        "confidence": 0.90,
        "distance": 20,
        "direction": "right"
    }

    result = engine.calculate_object_relevance(
        detected_object,
        "obstacle_awareness"
    )

    assert result["relevance_score"] < 0.5


def test_score_never_exceeds_one():

    engine = RelevanceEngine()

    detected_object = {
        "object": "vehicle",
        "confidence": 1.0,
        "distance": 1,
        "direction": "ahead"
    }

    result = engine.calculate_object_relevance(
        detected_object,
        "obstacle_awareness"
    )

    assert result["relevance_score"] <= 1.0


from backend.core.context_manager import ContextManager
from backend.core.objective_manager import ObjectiveType
from simulator.simulator_controller import SimulatorController


def test_relevance_from_context():

    simulator = SimulatorController()

    context_manager = ContextManager()

    relevance_engine = RelevanceEngine()

    context = context_manager.build_context(
        ObjectiveType.OBSTACLE_AWARENESS,
        simulator.collect_inputs()
    )

    results = relevance_engine.evaluate_camera_context(
        context
    )

    assert len(results) > 0

    assert "relevance_score" in results[0]

    assert "priority" in results[0]