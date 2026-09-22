from simulator.camera.simulated_camera import SimulatedCamera
from simulator.sensors.simulated_imu import SimulatedIMU
from simulator.sensors.simulated_gps import SimulatedGPS
from simulator.sensors.simulated_audio import SimulatedAudio
from simulator.scenarios.scenario_manager import ScenarioManager


class SimulatorController:

    def __init__(self):

        self.camera = SimulatedCamera()
        self.imu = SimulatedIMU()
        self.gps = SimulatedGPS()
        self.audio = SimulatedAudio()

        self.scenario_manager = ScenarioManager()

        self.current_scenario_key = None

        self.load_scenario("obstacle")


    def load_scenario(self, scenario_name: str):

        scenario = self.scenario_manager.set_scenario(
            scenario_name
        )

        self.current_scenario_key = scenario_name

        self.camera.set_data(
            scenario["camera"]
        )

        self.imu.set_data(
            scenario["imu"]
        )

        self.gps.set_data(
            scenario["gps"]
        )

        self.audio.set_data(
            scenario["audio"]
        )

        return scenario


    def get_current_scenario_key(self):

        return self.current_scenario_key


    def get_current_scenario(self):

        return self.scenario_manager.get_current_scenario()


    def get_available_scenarios(self):

        return self.scenario_manager.get_available_scenarios()


    def collect_inputs(self):

        return [
            self.camera.get_aditi_input(),
            self.imu.get_aditi_input(),
            self.gps.get_aditi_input(),
            self.audio.get_aditi_input()
        ]

    def collect_inputs_with_failure(
        self,
        failed_source: str
):

        inputs = self.collect_inputs()

        return [
        item
        for item in inputs
        if item.source != failed_source
    ]