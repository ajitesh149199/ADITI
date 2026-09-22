import time

from backend.inputs.camera_interface import CameraInterface
from backend.core.data_models import AditiInput


class SimulatedCamera(CameraInterface):

    def __init__(self):
        self.frame_data = {
            "frame_id": 0,
            "objects": []
        }

    def set_data(self, frame_data):
        self.frame_data = frame_data

    def get_frame(self):
        return self.frame_data

    def get_aditi_input(self) -> AditiInput:
        return AditiInput(
            source="camera",
            data_type="object_detection",
            data=self.frame_data,
            confidence=1.0,
            timestamp=time.time(),
            metadata={
                "simulated": True
            }
        )