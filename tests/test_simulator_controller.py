from simulator.simulator_controller import SimulatorController


def test_simulator_controller():
    simulator = SimulatorController()

    inputs = simulator.collect_inputs()

    assert len(inputs) == 4

    sources = [input_data.source for input_data in inputs]

    assert "camera" in sources
    assert "imu" in sources
    assert "gps" in sources
    assert "audio" in sources