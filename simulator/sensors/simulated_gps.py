import time

from backend.inputs.gps_interface import GPSInterface
from backend.core.data_models import AditiInput


class SimulatedGPS(GPSInterface):

    def __init__(self):
        self.location_data = {}

    def set_data(self, location_data):
        self.location_data = location_data

    def get_location(self):
        return self.location_data

    def get_aditi_input(self) -> AditiInput:
        return AditiInput(
            source="gps",
            data_type="location",
            data=self.location_data,
            confidence=0.95,
            timestamp=time.time(),
            metadata={
                "simulated": True
            }
        )