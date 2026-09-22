from abc import ABC, abstractmethod
from typing import Dict

class IMUInterface(ABC):

    @abstractmethod
    def get_motion_data(self) ->Dict:
        """Return the latest IMU motion data."""
        pass