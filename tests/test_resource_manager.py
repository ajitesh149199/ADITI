from backend.core.resource_manager import ResourceManager


def test_single_model_cost():

    manager = ResourceManager()

    result = manager.estimate_model_cost(
        "object_detection"
    )

    assert result["cpu"] > 0
    assert result["memory"] > 0


def test_total_resource_cost():

    manager = ResourceManager()

    result = manager.calculate_total_cost(
        [
            "object_detection",
            "navigation"
        ]
    )

    assert result["model_count"] == 2
    assert result["estimated_cpu"] > 0
    assert result["estimated_memory_mb"] > 0


def test_aditi_uses_fewer_resources():

    manager = ResourceManager()

    all_models = list(
        manager.model_costs.keys()
    )

    selected_models = [
        "object_detection",
        "navigation"
    ]

    result = manager.compare_resource_usage(
        all_models,
        selected_models
    )

    assert result["models_avoided"] > 0
    assert result["cpu_saved"] > 0

def test_resource_limits():

    manager = ResourceManager()

    result = manager.check_limits(
        [
            "object_detection",
            "navigation"
        ]
    )

    assert "within_limits" in result
    assert "usage" in result