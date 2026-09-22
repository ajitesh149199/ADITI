from abc import ABC, abstractmethod 

class AudioOutput(ABC):

    @abstractmethod
    def speak(self, text: str)  -> None:
        """Deliver a spoken messsage to the user."""
pass
    