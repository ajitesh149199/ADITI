from typing import Dict, Any, List


class OutputManager:

    def __init__(self):
        pass

    def choose_output(
        self,
        item: Dict[str, Any]
    ) -> Dict[str, Any]:

        risk = item.get(
            "risk_level",
            "low"
        )

        relevance = item.get(
            "relevance_score",
            0.0
        )

        trust = item.get(
            "trust_score",
            0.0
        )

        object_name = item.get(
            "object",
            "unknown"
        )

        objective = item.get(
            "objective",
            None
        )

        # --------------------------------
        # OUTPUT DECISION
        # --------------------------------

        if trust < 0.45:
            outputs = []

        

        elif risk == "high":
          outputs = [
        "audio",
        "haptic"
        ]

        elif (
         objective == "general_assistance"
         and relevance >= 0.60
        ):
         outputs = [
        "audio"
        ]

        elif risk == "medium":
         outputs = [
        "haptic"
        ]

        elif relevance >= 0.60:
         outputs = [
        "audio"
    ]
            

        elif relevance >= 0.60:
            outputs = [
                "audio"
            ]

        else:
            outputs = []

        return {
            "object": object_name,
            "outputs": outputs,
            "output_required": len(outputs) > 0,
            "risk_level": risk,
            "relevance_score": relevance,
            "trust_score": trust
        }

    def process_outputs(
        self,
        kept_items: List[Dict[str, Any]]
    ) -> Dict[str, Any]:

        decisions = []

        audio_items = []
        haptic_items = []
        visual_items = []
        no_output_items = []

        for item in kept_items:

            decision = self.choose_output(
                item
            )

            decisions.append(decision)

            outputs = decision["outputs"]

            if "audio" in outputs:
                audio_items.append(item)

            if "haptic" in outputs:
                haptic_items.append(item)

            if "visual" in outputs:
                visual_items.append(item)

            if not outputs:
                no_output_items.append(item)

        return {
            "decisions": decisions,
            "audio": audio_items,
            "haptic": haptic_items,
            "visual": visual_items,
            "no_output": no_output_items,
            "audio_count": len(audio_items),
            "haptic_count": len(haptic_items),
            "visual_count": len(visual_items),
            "no_output_count": len(no_output_items)
        }

    def build_final_decision(
        self,
        output_results: Dict[str, Any]
    ) -> Dict[str, Any]:

        decisions = output_results.get(
            "decisions",
            []
        )

        if not decisions:
            return {
                "action": "none",
                "priority": "low",
                "outputs": []
            }

        priority_order = {
            "critical": 4,
            "high": 3,
            "medium": 2,
            "low": 1
        }

        highest = max(
            decisions,
            key=lambda item: priority_order.get(
                item.get("risk_level", "low"),
                0
            )
        )

        return {
            "action": (
                "warn"
                if highest["outputs"]
                else "none"
            ),
            "priority": highest[
                "risk_level"
            ],
            "object": highest[
                "object"
            ],
            "outputs": highest[
                "outputs"
            ],
            "confidence": highest[
                "trust_score"
            ]
        }