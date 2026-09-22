from simulator.simulator_controller import SimulatorController


def test_aditi_foundation():
    simulator = SimulatorController()

    inputs = simulator.collect_inputs()

    assert len(inputs) > 0

    for input_data in inputs:
        assert input_data.source
        assert input_data.data_type
        assert input_data.timestamp > 0
        assert 0.0 <= input_data.confidence <= 1.0