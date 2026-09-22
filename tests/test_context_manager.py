from backend.core.context_manager import ContextManager
from backend.core.objective_manager import ObjectiveType
from simulator.simulator_controller import SimulatorController


def test_build_context():
    simulator = SimulatorController()
    context_manager = ContextManager()

    inputs = simulator.collect_inputs()

    context = context_manager.build_context(
        ObjectiveType.OBSTACLE_AWARENESS,
        inputs
    )

    assert context["objective"] == "obstacle_awareness"

    assert context["camera"] is not None
    assert context["imu"] is not None
    assert context["gps"] is not None
    assert context["audio"] is not None

    assert "camera" in context["available_sources"]
    assert "imu" in context["available_sources"]
    assert "gps" in context["available_sources"]
    assert "audio" in context["available_sources"]


def test_clear_context():
    simulator = SimulatorController()
    context_manager = ContextManager()

    context_manager.build_context(
        ObjectiveType.NAVIGATION,
        simulator.collect_inputs()
    )

    context_manager.clear_context()

    assert context_manager.get_context() == {}


def test_missing_source():
    simulator = SimulatorController()
    context_manager = ContextManager()

    inputs = simulator.collect_inputs()

    inputs_without_gps = [
        item for item in inputs
        if item.source != "gps"
    ]

    context = context_manager.build_context(
        ObjectiveType.NAVIGATION,
        inputs_without_gps
    )

    assert context["gps"] is None
    assert "gps" in context["missing_sources"]