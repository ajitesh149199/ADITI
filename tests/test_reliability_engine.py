import time

from backend.core.reliability_engine import ReliabilityEngine
from simulator.simulator_controller import SimulatorController


def test_high_reliability():

    engine = ReliabilityEngine()

    result = engine.calculate_reliability(
        source="imu",
        confidence=0.98,
        timestamp=time.time()
    )

    assert result["reliability_score"] > 0.8
    assert result["reliability_level"] == "high"

def test_old_data_has_lower_reliability():

    engine = ReliabilityEngine()

    fresh = engine.calculate_reliability(
        source="camera",
        confidence=0.90,
        timestamp=time.time()
    )

    old = engine.calculate_reliability(
        source="camera",
        confidence=0.90,
        timestamp=time.time() - 20
    )

    assert (
        fresh["reliability_score"]
        >
        old["reliability_score"]
    )

def test_low_confidence_reduces_reliability():

    engine = ReliabilityEngine()

    high_confidence = (
        engine.calculate_reliability(
            source="camera",
            confidence=0.95,
            timestamp=time.time()
        )
    )

    low_confidence = (
        engine.calculate_reliability(
            source="camera",
            confidence=0.30,
            timestamp=time.time()
        )
    )

    assert (
        high_confidence[
            "reliability_score"
        ]
        >
        low_confidence[
            "reliability_score"
        ]
    )

def test_reliability_from_simulator():

    simulator = SimulatorController()
    engine = ReliabilityEngine()

    inputs = simulator.collect_inputs()

    results = engine.evaluate_inputs(
        inputs
    )

    assert len(results) == 4

    for result in results:
        assert (
            0.0
            <= result["reliability_score"]
            <= 1.0
        )


    def detect_conflict(
        self,
        statement_a: Dict[str, Any],
        statement_b: Dict[str, Any]
    ) -> Dict[str, Any]:

        value_a = statement_a.get("value")
        value_b = statement_b.get("value")

        conflict = value_a != value_b

        return {
            "conflict": conflict,
            "source_a": statement_a.get(
                "source"
            ),
            "source_b": statement_b.get(
                "source"
            ),
            "value_a": value_a,
            "value_b": value_b
        }


def test_conflict_detection():

    engine = ReliabilityEngine()

    camera_statement = {
        "source": "camera",
        "value": "obstacle_present"
    }

    depth_statement = {
        "source": "depth",
        "value": "no_obstacle"
    }

    result = engine.detect_conflict(
        camera_statement,
        depth_statement
    )

    assert result["conflict"] is True


def test_no_conflict():

    engine = ReliabilityEngine()

    source_a = {
        "source": "camera",
        "value": "obstacle_present"
    }

    source_b = {
        "source": "depth",
        "value": "obstacle_present"
    }

    result = engine.detect_conflict(
        source_a,
        source_b
    )

    assert result["conflict"] is False

    def test_trust_score():
    
            engine = ReliabilityEngine()
    
    trust = engine.calculate_trust_score(
        relevance_score=0.90,
            reliability_score=0.80
)
    
    assert 0.0 <= trust <= 1.0
    assert trust > 0.8