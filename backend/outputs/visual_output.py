from abc import ABC, abstractmethod
from typing import Any

class VisualOutput(ABC):

    @abstractmethod
    def display(self, data: Any) -> None:
        """Send information to a Visual Display"""
        pass