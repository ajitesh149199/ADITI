from typing import Dict, Any, List


class ResourceManager:

    def __init__(self):

        self.model_costs = {
            "object_detection": {
                "cpu": 30,
                "memory": 300,
                "latency_ms": 120,
                "power_units": 3
            },
            "ocr": {
                "cpu": 20,
                "memory": 200,
                "latency_ms": 100,
                "power_units": 2
            },
            "speech_recognition": {
                "cpu": 25,
                "memory": 250,
                "latency_ms": 150,
                "power_units": 3
            },
            "text_to_speech": {
                "cpu": 10,
                "memory": 100,
                "latency_ms": 80,
                "power_units": 1
            },
            "navigation": {
                "cpu": 15,
                "memory": 150,
                "latency_ms": 100,
                "power_units": 2
            },
            "scene_description": {
                "cpu": 40,
                "memory": 400,
                "latency_ms": 250,
                "power_units": 4
            }
        }

    def estimate_model_cost(
        self,
        model_name: str
    ) -> Dict[str, Any]:

        return self.model_costs.get(
            model_name,
            {
                "cpu": 0,
                "memory": 0,
                "latency_ms": 0,
                "power_units": 0
            }
        )

    def calculate_total_cost(
        self,
        selected_models: List[str]
    ) -> Dict[str, Any]:

        total_cpu = 0
        total_memory = 0
        total_latency = 0
        total_power = 0

        for model in selected_models:

            cost = self.estimate_model_cost(
                model
            )

            total_cpu += cost["cpu"]
            total_memory += cost["memory"]
            total_latency += cost["latency_ms"]
            total_power += cost["power_units"]

        return {
            "models": selected_models,
            "model_count": len(selected_models),
            "estimated_cpu": total_cpu,
            "estimated_memory_mb": total_memory,
            "estimated_latency_ms": total_latency,
            "estimated_power_units": total_power
        }

    def compare_resource_usage(
        self,
        all_models: List[str],
        selected_models: List[str]
    ) -> Dict[str, Any]:

        baseline = self.calculate_total_cost(
            all_models
        )

        aditi = self.calculate_total_cost(
            selected_models
        )

        return {
            "baseline": baseline,
            "aditi": aditi,
            "models_avoided": (
                len(all_models)
                - len(selected_models)
            ),
            "cpu_saved": (
                baseline["estimated_cpu"]
                - aditi["estimated_cpu"]
            ),
            "memory_saved_mb": (
                baseline["estimated_memory_mb"]
                - aditi["estimated_memory_mb"]
            ),
            "latency_saved_ms": (
                baseline["estimated_latency_ms"]
                - aditi["estimated_latency_ms"]
            ),
            "power_units_saved": (
                baseline["estimated_power_units"]
                - aditi["estimated_power_units"]
            )
        }

    def check_limits(
        self,
        selected_models: List[str],
        cpu_limit: int = 80,
        memory_limit_mb: int = 1000,
        power_limit: int = 10
    ) -> Dict[str, Any]:

        usage = self.calculate_total_cost(
            selected_models
        )

        within_cpu = (
            usage["estimated_cpu"]
            <= cpu_limit
        )

        within_memory = (
            usage["estimated_memory_mb"]
            <= memory_limit_mb
        )

        within_power = (
            usage["estimated_power_units"]
            <= power_limit
        )

        return {
            "within_limits": (
                within_cpu
                and within_memory
                and within_power
            ),
            "cpu_ok": within_cpu,
            "memory_ok": within_memory,
            "power_ok": within_power,
            "usage": usage
        }