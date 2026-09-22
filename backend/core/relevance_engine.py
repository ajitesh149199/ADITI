from typing import Dict, Any, List


class RelevanceEngine:

    def __init__(self):
        self.low_threshold = 0.30
        self.medium_threshold = 0.60
        self.high_threshold = 0.80

    def calculate_object_relevance(
        self,
        detected_object: Dict[str, Any],
        objective: str
    ) -> Dict[str, Any]:

        score = 0.0

        object_name = detected_object.get(
            "object",
            "unknown"
        ).lower()

        confidence = detected_object.get(
            "confidence",
            0.0
        )

        distance = detected_object.get(
            "distance"
        )

        direction = detected_object.get(
            "direction",
            "unknown"
        ).lower()

        # -------------------------
        # 1. Objective relevance
        # -------------------------

        if objective == "obstacle_awareness":

            obstacle_objects = {
                "car",
                "bicycle",
                "motorcycle",
                "person",
                "wall",
                "pole",
                "stairs",
                "vehicle"
            }

            if object_name in obstacle_objects:
                score += 0.35

        elif objective == "navigation":

            navigation_objects = {
                "door",
                "doorway",
                "stairs",
                "crosswalk",
                "road",
                "vehicle",
                "person"
            }

            if object_name in navigation_objects:
                score += 0.30

        elif objective == "object_identification":
            score += 0.40

        elif objective == "environment_description":
            score += 0.25


        elif objective == "general_assistance":
          score += 0.25

        # -------------------------
        # 2. Distance relevance
        # -------------------------

        if distance is not None:

            if distance <= 2:
                score += 0.30

            elif distance <= 5:
                score += 0.20

            elif distance <= 10:
                score += 0.10

        # -------------------------
        # 3. Direction relevance
        # -------------------------

        if direction in {
            "ahead",
            "front",
            "center"
        }:
            score += 0.20

        elif direction in {
            "left",
            "right"
        }:
            score += 0.10

        # -------------------------
        # 4. Confidence
        # -------------------------

        score += confidence * 0.15

        score = min(score, 1.0)

        return {
            "object": object_name,
            "relevance_score": round(score, 3),
            "priority": self.get_priority(score),
            "confidence": confidence,
            "distance": distance,
            "direction": direction
        }

    def get_priority(self, score: float) -> str:

        if score >= self.high_threshold:
            return "high"

        if score >= self.medium_threshold:
            return "medium"

        if score >= self.low_threshold:
            return "low"

        return "ignore"

    def evaluate_camera_context(
        self,
        context: Dict[str, Any]
    ) -> List[Dict[str, Any]]:

        camera_data = context.get("camera")

        if not camera_data:
            return []

        objects = camera_data.get(
            "objects",
            []
        )

        objective = context.get(
            "objective"
        )

        results = []

        for detected_object in objects:

            result = self.calculate_object_relevance(
                detected_object,
                objective
            )

        results.append(result)

        results.sort(
        key=lambda item: item["relevance_score"],
        reverse=True
)
        return results