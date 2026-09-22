from backend.core.output_manager import OutputManager


def test_high_risk_uses_audio_and_haptic():

    manager = OutputManager()

    item = {
        "object": "bicycle",
        "risk_level": "high",
        "relevance_score": 0.90,
        "trust_score": 0.90
    }

    result = manager.choose_output(
        item
    )

    assert "audio" in result["outputs"]
    assert "haptic" in result["outputs"]


def test_medium_risk_uses_haptic():

    manager = OutputManager()

    item = {
        "object": "person",
        "risk_level": "medium",
        "relevance_score": 0.55,
        "trust_score": 0.80
    }

    result = manager.choose_output(
        item
    )

    assert "haptic" in result["outputs"]


def test_low_trust_produces_no_output():

    manager = OutputManager()

    item = {
        "object": "object",
        "risk_level": "high",
        "relevance_score": 0.90,
        "trust_score": 0.30
    }

    result = manager.choose_output(
        item
    )

    assert result["outputs"] == []
    assert result["output_required"] is False

def test_process_multiple_outputs():

    manager = OutputManager()

    kept_items = [
        {
            "object": "bicycle",
            "risk_level": "high",
            "relevance_score": 0.90,
            "trust_score": 0.90
        },
        {
            "object": "person",
            "risk_level": "medium",
            "relevance_score": 0.55,
            "trust_score": 0.80
        }
    ]

    result = manager.process_outputs(
        kept_items
    )

    assert result["audio_count"] >= 1
    assert result["haptic_count"] >= 1


def test_final_decision():

    manager = OutputManager()

    output_results = {
        "decisions": [
            {
                "object": "bicycle",
                "outputs": [
                    "audio",
                    "haptic"
                ],
                "risk_level": "high",
                "relevance_score": 0.90,
                "trust_score": 0.90
            }
        ]
    }

    result = manager.build_final_decision(
        output_results
    )

    assert result["action"] == "warn"
    assert result["priority"] == "high"
    assert "audio" in result["outputs"]