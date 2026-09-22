from backend.outputs.audio_output import AudioOutput
from backend.outputs.haptic_output import HapticOutput
from backend.outputs.visual_output import VisualOutput

def test_output_interfaces_exist():
    assert AudioOutput is not None
    assert HapticOutput is not None 
    assert VisualOutput is not None