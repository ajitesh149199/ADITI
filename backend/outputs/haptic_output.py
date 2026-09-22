from abc import ABC, abstractmethod

class HapticOutput(ABC):

    @abstractmethod
    def vibrate(self, pattern:str) -> None:
        """Send a vibration pattern to the user."""
        pass