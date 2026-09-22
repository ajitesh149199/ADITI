import time

from backend.inputs.audio_interface import AudioInterface
from backend.core.data_models import AditiInput


class SimulatedAudio(AudioInterface):

    def __init__(self):
        self.audio_data = {}

    def set_data(self, audio_data):
        self.audio_data = audio_data

    def get_audio(self):
        return self.audio_data

    def get_aditi_input(self) -> AditiInput:
        return AditiInput(
            source="audio",
            data_type="speech",
            data=self.audio_data,
            confidence=0.96,
            timestamp=time.time(),
            metadata={
                "simulated": True
            }
        )