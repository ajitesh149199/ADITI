from typing import Dict, Any, List


class ModelOrchestrator:

    def __init__(self):

        self.available_models = {
            "object_detection": True,
            "ocr": True,
            "speech_recognition": True,
            "text_to_speech": True,
            "navigation": True,
            "scene_description": True
        }

    def select_models(
        self,
        objective: str,
        context: Dict[str, Any]
    ) -> Dict[str, Any]:

        selected_models: List[str] = []
        suppressed_models: List[str] = []

        # -------------------------
        # OBJECTIVE-BASED SELECTION
        # -------------------------

        if objective == "obstacle_awareness":

            selected_models = [
                "object_detection"
            ]

        elif objective == "navigation":

            selected_models = [
                "object_detection",
                "navigation"
            ]

        elif objective == "object_identification":

            selected_models = [
                "object_detection"
            ]

        elif objective == "read_text":

            selected_models = [
                "ocr",
                "text_to_speech"
            ]

        elif objective == "environment_description":

            selected_models = [
                "object_detection",
                "scene_description"
            ]

        elif objective == "general_assistance":

            selected_models = [
                "object_detection"
            ]

        # -------------------------
        # CONTEXT-BASED ADJUSTMENT
        # -------------------------

        camera_available = (
            context.get("camera") is not None
        )

        gps_available = (
            context.get("gps") is not None
        )

        audio_available = (
            context.get("audio") is not None
        )

        if not camera_available:

            selected_models = [
                model
                for model in selected_models
                if model not in {
                    "object_detection",
                    "ocr",
                    "scene_description"
                }
            ]

        if not gps_available:

            selected_models = [
                model
                for model in selected_models
                if model != "navigation"
            ]

        if audio_available:
            selected_models.append(
                "speech_recognition"
            )

        # Remove duplicates
        selected_models = list(
            dict.fromkeys(selected_models)
        )

        # -------------------------
        # SUPPRESSED MODELS
        # -------------------------

        for model_name in self.available_models:

            if model_name not in selected_models:
                suppressed_models.append(
                    model_name
                )

        return {
            "objective": objective,
            "selected_models": selected_models,
            "suppressed_models": suppressed_models,
            "selected_count": len(
                selected_models
            ),
            "suppressed_count": len(
                suppressed_models
            )
        }

    def refine_selection(
        self,
        selection: Dict[str, Any],
        fused_results: List[Dict[str, Any]]
    ) -> Dict[str, Any]:

        selected = list(
            selection["selected_models"]
        )

        high_risk_present = any(
            item.get("risk_level") in {"high", "critical"}
            for item in fused_results
        )

        if high_risk_present:
            if "object_detection" not in selected:
                selected.append("object_detection")

        selected = list(
            dict.fromkeys(selected)
        )

        suppressed = [
            model
            for model in self.available_models
            if model not in selected
        ]

        return {
            "objective": selection["objective"],
            "selected_models": selected,
            "suppressed_models": suppressed,
            "selected_count": len(selected),
            "suppressed_count": len(suppressed)
        }