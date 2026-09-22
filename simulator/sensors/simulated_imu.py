import time

from backend.inputs.imu_interface import IMUInterface
from backend.core.data_models import AditiInput


class SimulatedIMU(IMUInterface):

    def __init__(self):
        self.motion_data = {}

    def set_data(self, motion_data):
        self.motion_data = motion_data

    def get_motion_data(self):
        return self.motion_data

    def get_aditi_input(self) -> AditiInput:
        return AditiInput(
            source="imu",
            data_type="motion",
            data=self.motion_data,
            confidence=0.98,
            timestamp=time.time(),
            metadata={
                "simulated": True
            }
        )