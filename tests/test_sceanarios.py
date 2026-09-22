from simulator.simulator_controller import (
    SimulatorController
)


def test_available_scenarios():

    simulator = SimulatorController()

    scenarios = (
        simulator.get_available_scenarios()
    )

    assert "obstacle" in scenarios
    assert "navigation" in scenarios
    assert "text_reading" in scenarios


def test_switch_scenario():

    simulator = SimulatorController()

    scenario = simulator.load_scenario(
        "navigation"
    )

    assert scenario["objective"] == "navigation"

    inputs = simulator.collect_inputs()

    assert len(inputs) == 4


def test_object_scenario():

    simulator = SimulatorController()

    simulator.load_scenario(
        "object_identification"
    )

    camera = simulator.camera.get_frame()

    assert (
        camera["objects"][0]["object"]
        == "bottle"
    )

def test_gps_failure():

    simulator = SimulatorController()

    inputs = (
        simulator.collect_inputs_with_failure(
            "gps"
        )
    )

    sources = [
        item.source
        for item in inputs
    ]

    assert "gps" not in sources