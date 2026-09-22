from simulator.sensors.simulated_gps import SimulatedGPS


def test_simulated_gps():
    gps = SimulatedGPS()

    gps.set_data({
        "latitude": 30.3165,
        "longitude": 78.0322,
        "accuracy_meters": 5.0
    })

    location = gps.get_location()
    aditi_input = gps.get_aditi_input()

    assert "latitude" in location
    assert "longitude" in location
    assert aditi_input.source == "gps"