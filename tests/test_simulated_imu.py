from simulator.sensors.simulated_imu import SimulatedIMU


def test_simulated_imu():
    imu = SimulatedIMU()

    imu.set_data({
        "movement": "walking",
        "heading": 90,
        "orientation": {
            "pitch": 0,
            "roll": 0,
            "yaw": 90
        }
    })

    motion = imu.get_motion_data()
    aditi_input = imu.get_aditi_input()

    assert motion["movement"] == "walking"
    assert aditi_input.source == "imu"
    assert aditi_input.data_type == "motion"