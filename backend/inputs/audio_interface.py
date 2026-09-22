from abc import ABC, abstractmethod
from typing import Any

class AudioInterface(ABC):

    @abstractmethod
    def get_audio(self) -> Any:
        """Return the latest Audio input."""
        pass