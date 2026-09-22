from abc import ABC, abstractmethod
from typing import Dict

class GPSInterface(ABC):

    @abstractmethod
    def get_location(self) ->Dict:
        """Reeturn the latset GPS location."""
        pass