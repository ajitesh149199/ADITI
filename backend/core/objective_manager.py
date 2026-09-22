from enum import Enum
from typing import Optional


class ObjectiveType(str, Enum):
    NAVIGATION = "navigation"
    OBSTACLE_AWARENESS = "obstacle_awareness"
    OBJECT_IDENTIFICATION = "object_identification"
    READ_TEXT = "read_text"
    ENVIRONMENT_DESCRIPTION = "environment_description"
    GENERAL_ASSISTANCE = "general_assistance"


class ObjectiveManager:

    def __init__(self):
        self.current_objective: Optional[ObjectiveType] = None

    def set_objective(self, objective: ObjectiveType) -> ObjectiveType:
        self.current_objective = objective
        return self.current_objective

    def get_objective(self) -> Optional[ObjectiveType]:
        return self.current_objective

    def clear_objective(self) -> None:
        self.current_objective = None

    def infer_from_text(self, text: str) -> ObjectiveType:
        text = text.lower()

        if "navigate" in text or "guide me" in text:
            objective = ObjectiveType.NAVIGATION

        elif "avoid obstacle" in text or "avoid obstacles" in text:
            objective = ObjectiveType.OBSTACLE_AWARENESS

        elif "what is this" in text or "identify" in text:
            objective = ObjectiveType.OBJECT_IDENTIFICATION

        elif "read" in text:
            objective = ObjectiveType.READ_TEXT

        elif "describe" in text or "surroundings" in text:
            objective = ObjectiveType.ENVIRONMENT_DESCRIPTION

        else:
            objective = ObjectiveType.GENERAL_ASSISTANCE

        self.current_objective = objective
        return objective