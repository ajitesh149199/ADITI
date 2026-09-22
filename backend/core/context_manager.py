from typing import Dict, List, Any, Optional
from backend.core.data_models import AditiInput
from backend.core.objective_manager import ObjectiveType


class ContextManager:

    def __init__(self):
        self.current_context: Dict[str, Any] = {}

    def build_context(
        self,
        objective: Optional[ObjectiveType],
        inputs: List[AditiInput]
    ) -> Dict[str, Any]:

        context = {
            "objective": (
            objective.value
            if hasattr(objective, "value")
            else objective
            ),
             
            "camera": None,
            "imu": None,
            "gps": None,
            "audio": None,
            "available_sources": [],
            "missing_sources": []
        }

        for input_data in inputs:
            source = input_data.source

            context["available_sources"].append(source)

            if source == "camera":
                context["camera"] = input_data.data

            elif source == "imu":
                context["imu"] = input_data.data

            elif source == "gps":
                context["gps"] = input_data.data

            elif source == "audio":
                context["audio"] = input_data.data

        expected_sources = [
            "camera",
            "imu",
            "gps",
            "audio"
        ]

        for source in expected_sources:
            if source not in context["available_sources"]:
                context["missing_sources"].append(source)

        self.current_context = context

        return context

    def get_context(self) -> Dict[str, Any]:
        return self.current_context

    def clear_context(self) -> None:
        self.current_context = {}