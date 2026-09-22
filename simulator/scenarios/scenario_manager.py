from simulator.scenarios.obstacle import OBSTACLE_SCENARIO
from simulator.scenarios.navigation import NAVIGATION_SCENARIO
from simulator.scenarios.object_identification import OBJECT_IDENTIFICATION_SCENARIO
from simulator.scenarios.text_reading import TEXT_READING_SCENARIO
from simulator.scenarios.general_assisstance import  GENERAL_ASSISSTANCE_SCENARIO
from simulator.scenarios.conflict import CONFLICT_SCENARIO
from simulator.scenarios.irrelevant_noise import IRRELEVANT_NOISE_SCENARIO


class ScenarioManager:

    def __init__(self):

        self.scenarios = {
            "obstacle": OBSTACLE_SCENARIO,
            "navigation": NAVIGATION_SCENARIO,
            "object_identification": OBJECT_IDENTIFICATION_SCENARIO,
            "text_reading": TEXT_READING_SCENARIO,
            "general_assistance": GENERAL_ASSISSTANCE_SCENARIO,
            "conflict": CONFLICT_SCENARIO,
            "irrelevant_noise": IRRELEVANT_NOISE_SCENARIO
        }

        self.current_scenario = None


    def set_scenario(self, scenario_name):

        if scenario_name not in self.scenarios:
            raise ValueError(
                f"Unknown scenario: {scenario_name}"
            )

        self.current_scenario = self.scenarios[
            scenario_name
        ]

        return self.current_scenario


    def get_current_scenario(self):

        return self.current_scenario


    def get_available_scenarios(self):

        return list(
            self.scenarios.keys()
        )