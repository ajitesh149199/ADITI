from abc import ABC, abstractmethod
from typing import Any

class CameraInterface(ABC) :

    @abstractmethod
    def get_frame(self) -> Any:
        """Return the latest camera frame."""
        pass