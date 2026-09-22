from typing import Dict, Any, List


class FusionEngine:

    def __init__(self):
        pass

    def fuse_object_information(
        self,
        object_data: Dict[str, Any],
        motion_data: Dict[str, Any],
        objective: str,
        relevance_score: float,
        reliability_score: float,
        trust_score: float
    ) -> Dict[str, Any]:

        object_name = object_data.get(
            "object",
            "unknown"
        )

        distance = object_data.get(
            "distance"
        )

        direction = object_data.get(
            "direction",
            "unknown"
        )

        movement = motion_data.get(
            "movement",
            "unknown"
        )

        heading = motion_data.get(
            "heading"
        )

        risk_level = self.calculate_risk_level(
            objective=objective,
            distance=distance,
            direction=direction,
            movement=movement,
            trust_score=trust_score
        )

        interpretation = (
            self.generate_interpretation(
                object_name=object_name,
                distance=distance,
                direction=direction,
                movement=movement,
                risk_level=risk_level
            )
        )

        return {
            "object": object_name,
            "distance": distance,
            "direction": direction,
            "user_movement": movement,
            "heading": heading,
            "objective": objective,
            "relevance_score": relevance_score,
            "reliability_score": reliability_score,
            "trust_score": trust_score,
            "risk_level": risk_level,
            "interpretation": interpretation
        }

    def calculate_risk_level(
        self,
        objective: str,
        distance: float,
        direction: str,
        movement: str,
        trust_score: float
    ) -> str:

        risk_score = 0.0

        #Non-safety objectives should not create
        #obstacle danger from distance alone.

        if objective in {
            "text_reading",
            "read_text"
        }:
            return "low"

        if objective in {
            "obstacle_awareness",
            "navigation"
        }:
            risk_score += 0.20

        if distance is not None:

            if distance <= 2:
                risk_score += 0.35

            elif distance <= 5:
                risk_score += 0.20

            elif distance <= 10:
                risk_score += 0.10

        if direction in {
            "ahead",
            "front",
            "center"
        }:
            risk_score += 0.25

        elif direction in {
            "left",
            "right"
        }:
            risk_score += 0.10

        if movement == "walking":
            risk_score += 0.10

        risk_score += trust_score * 0.10

        risk_score = min(
            max(risk_score, 0.0),
            1.0
        )

        if risk_score >= 0.80:
            return "critical"

        if risk_score >= 0.60:
            return "high"

        if risk_score >= 0.35:
            return "medium"

        return "low"

    def generate_interpretation(
        self,
        object_name: str,
        distance: float,
        direction: str,
        movement: str,
        risk_level: str
    ) -> str:

        distance_text = (
            f"{distance} meters"
            if distance is not None
            else "unknown distance"
        )

        return (
            f"{object_name.capitalize()} detected "
            f"{direction} at {distance_text}. "
            f"User movement is {movement}. "
            f"Estimated risk is {risk_level}."
        )

    def fuse_multiple_objects(
        self,
        objects: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:

        return sorted(
            objects,
            key=lambda item: (
                item.get("trust_score", 0.0)
            ),
            reverse=True
        )

    def build_fused_results(
        self,
        context: Dict[str, Any],
        relevance_results: List[Dict[str, Any]],
        reliability_results: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:

        camera_data = context.get(
            "camera",
            {}
        )

        motion_data = context.get(
            "imu",
            {}
        )

        objective = context.get(
            "objective"
        )

        camera_reliability = 0.0

        for item in reliability_results:

            if item.get("source") == "camera":
                camera_reliability = item.get(
                    "reliability_score",
                    0.0
                )

        camera_objects = camera_data.get(
            "objects",
            []
        )

        object_lookup = {
            item.get("object"): item
            for item in camera_objects
        }

        fused_results = []

        for relevance in relevance_results:

            object_name = relevance.get(
                "object"
            )

            object_data = object_lookup.get(
                object_name
            )

            if not object_data:
                continue

            relevance_score = relevance.get(
                "relevance_score",
                0.0
            )

            trust_score = round(
                (
                    relevance_score * 0.60
                    +
                    camera_reliability * 0.40
                ),
                3
            )

            fused = self.fuse_object_information(
                object_data=object_data,
                motion_data=motion_data,
                objective=objective,
                relevance_score=relevance_score,
                reliability_score=(
                    camera_reliability
                ),
                trust_score=trust_score
            )

            fused_results.append(fused)

        return self.fuse_multiple_objects(
            fused_results
        )

