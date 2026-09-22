from typing import Dict, Any, List
import time


class ReliabilityEngine:

    def __init__(self):
        self.fresh_threshold_seconds = 5.0

        self.source_weights = {
            "camera": 0.90,
            "imu": 0.95,
            "gps": 0.85,
            "audio": 0.90
        }

    def calculate_reliability(
        self,
        source: str,
        confidence: float,
        timestamp: float
    ) -> Dict[str, Any]:

        source_weight = self.source_weights.get(
            source,
            0.70
        )

        age = max(
            0.0,
            time.time() - timestamp
        )

        freshness_score = self.calculate_freshness(
            age
        )

        reliability_score = (
            confidence * 0.50
            + source_weight * 0.30
            + freshness_score * 0.20
        )

        reliability_score = min(
            max(reliability_score, 0.0),
            1.0
        )

        return {
            "source": source,
            "confidence": confidence,
            "source_weight": source_weight,
            "age_seconds": round(age, 3),
            "freshness_score": round(
                freshness_score,
                3
            ),
            "reliability_score": round(
                reliability_score,
                3
            ),
            "reliability_level": (
                self.get_reliability_level(
                    reliability_score
                )
            )
        }

    def calculate_freshness(
        self,
        age_seconds: float
    ) -> float:

        if age_seconds <= 1:
            return 1.0

        if age_seconds <= 3:
            return 0.8

        if age_seconds <= self.fresh_threshold_seconds:
            return 0.6

        if age_seconds <= 10:
            return 0.3

        return 0.1

    def get_reliability_level(
        self,
        score: float
    ) -> str:

        if score >= 0.80:
            return "high"

        if score >= 0.60:
            return "medium"

        if score >= 0.40:
            return "low"

        return "unreliable"

    def evaluate_inputs(
        self,
        inputs: List
    ) -> List[Dict[str, Any]]:

        results = []

        for input_data in inputs:

            result = self.calculate_reliability(
                source=input_data.source,
                confidence=input_data.confidence,
                timestamp=input_data.timestamp
            )

            results.append(result)

        results.sort(
            key=lambda item: item[
                "reliability_score"
            ],
            reverse=True
        )

        return results

    def detect_conflict(self, source_a, source_b):
        value_a = source_a.get("value")
        value_b = source_b.get("value")

        conflict = value_a != value_b

        return {
        "conflict": conflict,
        "source_a": source_a.get("source"),
        "source_b": source_b.get("source"),
        "value_a": value_a,
        "value_b": value_b
    }

    def calculate_trust_score(
        self,
        relevance_score: float,
        reliability_score: float
    ) -> float:

      trust_score = (
        relevance_score * 0.60
        + reliability_score * 0.40
    )

      return round(
        min(max(trust_score, 0.0), 1.0),
        3
    )

   