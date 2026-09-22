from backend.inputs.camera_interface import CameraInterface  
from backend.inputs.imu_interface import IMUInterface
from backend.inputs.gps_interface import GPSInterface
from backend.inputs.audio_interface import AudioInterface

def test_input_interfaces_exist():
    assert CameraInterface is not None
    assert IMUInterface is not None
    assert GPSInterface is not None
    assert AudioInterface is not None
