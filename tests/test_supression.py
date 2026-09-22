from backend.core.suppression_engine import (
    SuppressionEngine
)


def test_high_risk_information_is_kept():

    engine = SuppressionEngine()

    fused_item = {
        "object": "bicycle",
        "relevance_score": 0.90,
        "trust_score": 0.88,
        "risk_level": "high"
    }

    result = engine.decide_information_action(
        fused_item
    )

    assert result["action"] == "keep"


def test_low_relevance_information_is_suppressed():

    engine = SuppressionEngine()

    fused_item = {
        "object": "tree",
        "relevance_score": 0.15,
        "trust_score": 0.90,
        "risk_level": "low"
    }

    result = engine.decide_information_action(
        fused_item
    )

    assert result["action"] == "suppress"


def test_medium_relevance_can_be_delayed():

    engine = SuppressionEngine()

    fused_item = {
        "object": "person",
        "relevance_score": 0.45,
        "trust_score": 0.80,
        "risk_level": "low"
    }

    result = engine.decide_information_action(
        fused_item
    )

    assert result["action"] == "delay"

def test_process_multiple_information():

    engine = SuppressionEngine()

    fused_results = [
        {
            "object": "bicycle",
            "relevance_score": 0.90,
            "trust_score": 0.90,
            "risk_level": "high"
        },
        {
            "object": "tree",
            "relevance_score": 0.10,
            "trust_score": 0.90,
            "risk_level": "low"
        },
        {
            "object": "person",
            "relevance_score": 0.45,
            "trust_score": 0.80,
            "risk_level": "low"
        }
    ]

    result = engine.process_information(
        fused_results
    )

    assert result["kept_count"] == 1
    assert result["delayed_count"] == 1
    assert result["suppressed_count"] == 1 

def test_duplicate_information_removed():

    engine = SuppressionEngine()

    items = [
        {
            "object": "bicycle"
        },
        {
            "object": "bicycle"
        },
        {
            "object": "person"
        }
    ]

    result = engine.remove_duplicates(
        items
    )

    assert len(result) == 2   