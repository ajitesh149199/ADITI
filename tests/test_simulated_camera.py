from simulator.camera.simulated_camera import SimulatedCamera

def test_simulated_camera():
    camera = SimulatedCamera()

    frame = camera.get_frame()
    aditi_input = camera.get_aditi_input()

    assert frame is not None 
    assert aditi_input.source == "camera"
    assert aditi_input.data_type == "object_detection"
    assert aditi_input.metadata["simulated"] is True