from typing import Dict, Any, List


class SuppressionEngine:

    def __init__(self):
        self.minimum_trust = 0.45

    def decide_information_action(
        self,
        fused_item: Dict[str, Any]
    ) -> Dict[str, Any]:

        relevance = fused_item.get(
            "relevance_score",
            0.0
        )

        trust = fused_item.get(
            "trust_score",
            0.0
        )

        risk = fused_item.get(
            "risk_level",
            "low"
        )

        object_name = fused_item.get(
            "object",
            "unknown"
        )

        # Very important or dangerous information
        if risk in {
            "high",
            "critical"
        } and trust >= self.minimum_trust:

            action = "keep"

        # Useful but not urgent
        elif relevance >= 0.60 and trust >= self.minimum_trust:

            action = "keep"

        # Possibly useful later
        elif relevance >= 0.35 and trust >= self.minimum_trust:

            action = "delay"

        # Low-value or weak information
        else:

            action = "suppress"

        return { 
            "object": object_name,
            "action": action,
            "relevance_score": relevance,
            "trust_score": trust,
            "risk_level": risk
        }

    def process_information(
        self,
        fused_results: List[Dict[str, Any]]
    ) -> Dict[str, Any]:

        kept = []
        delayed = []
        suppressed = []

        for item in fused_results:

            decision = self.decide_information_action(
                item
            )

            if decision["action"] == "keep":
                kept.append(item)

            elif decision["action"] == "delay":
                delayed.append(item)

            else:
                suppressed.append(item)

        return {
                    "kept": kept,
                    "delayed": delayed,
                    "suppressed": suppressed,
                    "kept_count": len(kept),
                    "delayed_count": len(delayed),
                    "suppressed_count": len(suppressed)
                }

    def remove_duplicates(
        self,
        items: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:

        unique_items = []
        seen_objects = set()

        for item in items:

            object_name = item.get(
                "object",
                "unknown"
            )

            if object_name not in seen_objects:

                unique_items.append(item)
                seen_objects.add(object_name)

        return unique_items

    