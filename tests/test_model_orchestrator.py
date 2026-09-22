from backend.core.model_orchestrator import ModelOrchestrator


def test_obstacle_model_selection():
    orchestrator = ModelOrchestrator()

    context = {
        "camera": {},
        "gps": {},
        "audio": None
    }

    result = orchestrator.select_models(
        "obstacle_awareness",
        context
    )

    assert "object_detection" in result["selected_models"]
    assert "ocr" in result["suppressed_models"]


def test_text_reading_model_selection():
    orchestrator = ModelOrchestrator()

    context = {
        "camera": {},
        "gps": {},
        "audio": None
    }

    result = orchestrator.select_models(
        "read_text",
        context
    )

    assert "ocr" in result["selected_models"]
    assert "text_to_speech" in result["selected_models"]


def test_navigation_without_gps():
    orchestrator = ModelOrchestrator()

    context = {
        "camera": {},
        "gps": None,
        "audio": None
    }

    result = orchestrator.select_models(
        "navigation",
        context
    )

    assert "navigation" not in result["selected_models"]


def test_no_camera_removes_vision_models():
    orchestrator = ModelOrchestrator()

    context = {
        "camera": None,
        "gps": {},
        "audio": None
    }

    result = orchestrator.select_models(
        "object_identification",
        context
    )

    assert "object_detection" not in result["selected_models"]


def test_high_risk_refinement():
    orchestrator = ModelOrchestrator()

    selection = {
        "objective": "general_assistance",
        "selected_models": [],
        "suppressed_models": [],
        "selected_count": 0,
        "suppressed_count": 0
    }

    fused_results = [
        {
            "object": "bicycle",
            "risk_level": "high"
        }
    ]

    result = orchestrator.refine_selection(
        selection,
        fused_results
    )

    assert "object_detection" in result["selected_models"]