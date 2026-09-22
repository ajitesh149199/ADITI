from datetime import datetime
import json
import os
import csv


class EvaluationManager:

    def __init__(self):

        self.results = []

        self.file_path = os.path.join(
            "data",
            "experiment_results.json"
        )

        self.history_file_path = os.path.join(
            "data",
            "experiment_history.json"
        )

        self.load_results()


    # =========================================================
    # SAVE CURRENT EXPERIMENT RESULTS
    # =========================================================

    def save_results(self):

        os.makedirs(
            os.path.dirname(self.file_path),
            exist_ok=True
        )

        with open(
            self.file_path,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                self.results,
                file,
                indent=4
            )


    # =========================================================
    # LOAD CURRENT EXPERIMENT RESULTS
    # =========================================================

    def load_results(self):

        if not os.path.exists(self.file_path):
            return

        try:

            with open(
                self.file_path,
                "r",
                encoding="utf-8"
            ) as file:

                self.results = json.load(file)

        except (
            json.JSONDecodeError,
            OSError
        ):

            self.results = []


    # =========================================================
    # RECORD ONE EXPERIMENT RESULT
    # =========================================================

    def record_result(
        self,
        scenario,
        objective,
        fused_results,
        suppression,
        outputs,
        resources
    ):

        result = {
            "timestamp": datetime.now().isoformat(),

            "scenario": scenario,
            "objective": objective,

            "detections": len(
                fused_results or []
            ),

            "kept": suppression.get(
                "kept_count",
                0
            ),

            "delayed": suppression.get(
                "delayed_count",
                0
            ),

            "suppressed": suppression.get(
                "suppressed_count",
                0
            ),

            "decisions_generated": len(
                outputs.get(
                    "decisions",
                    []
                )
            ),

            "audio_outputs": len(
                outputs.get(
                    "audio",
                    []
                )
            ),

            "haptic_outputs": len(
                outputs.get(
                    "haptic",
                    []
                )
            ),

            "visual_outputs": len(
                outputs.get(
                    "visual",
                    []
                )
            ),

            "models_avoided": resources.get(
                "models_avoided",
                0
            ),

            "cpu_saved": resources.get(
                "cpu_saved",
                0
            ),

            "memory_saved_mb": resources.get(
                "memory_saved_mb",
                0
            ),

            "latency_saved_ms": resources.get(
                "latency_saved_ms",
                0
            ),

            "power_units_saved": resources.get(
                "power_units_saved",
                0
            )
        }

        self.results.append(result)

        self.save_results()

        return result


    # =========================================================
    # GET CURRENT RESULTS
    # =========================================================

    def get_results(self):

        return self.results


    # =========================================================
    # CALCULATE EVALUATION METRICS
    # =========================================================

    def calculate_metrics(self):

        if not self.results:

            return {
                "total_experiments": 0,
                "total_detections": 0,
                "total_kept": 0,
                "total_delayed": 0,
                "total_suppressed": 0,
                "suppression_rate": 0.0,
                "output_generation_rate": 0.0,
                "average_models_avoided": 0.0
            }

        total_experiments = len(
            self.results
        )

        total_detections = sum(
            result.get("detections", 0)
            for result in self.results
        )

        total_kept = sum(
            result.get("kept", 0)
            for result in self.results
        )

        total_delayed = sum(
            result.get("delayed", 0)
            for result in self.results
        )

        total_suppressed = sum(
            result.get("suppressed", 0)
            for result in self.results
        )

        total_decisions = sum(
            result.get(
                "decisions_generated",
                0
            )
            for result in self.results
        )

        total_models_avoided = sum(
            result.get(
                "models_avoided",
                0
            )
            for result in self.results
        )

        processed_information = (
            total_kept
            + total_delayed
            + total_suppressed
        )

        suppression_rate = 0.0

        if processed_information > 0:

            suppression_rate = (
                total_suppressed
                / processed_information
            ) * 100

        output_generation_rate = (
            total_decisions
            / total_experiments
        ) * 100

        average_models_avoided = (
            total_models_avoided
            / total_experiments
        )

        return {
            "total_experiments":
                total_experiments,

            "total_detections":
                total_detections,

            "total_kept":
                total_kept,

            "total_delayed":
                total_delayed,

            "total_suppressed":
                total_suppressed,

            "suppression_rate":
                round(
                    suppression_rate,
                    2
                ),

            "output_generation_rate":
                round(
                    output_generation_rate,
                    2
                ),

            "average_models_avoided":
                round(
                    average_models_avoided,
                    2
                )
        }


    # =========================================================
    # SAVE ONE FULL RUN TO HISTORY
    # =========================================================

    def save_run_to_history(self):

        history = []

        if os.path.exists(
            self.history_file_path
        ):

            try:

                with open(
                    self.history_file_path,
                    "r",
                    encoding="utf-8"
                ) as file:

                    history = json.load(file)

                    if not isinstance(
                        history,
                        list
                    ):
                        history = []

            except (
                json.JSONDecodeError,
                OSError
            ):

                history = []

        run_record = {
            "timestamp":
                datetime.now().isoformat(),

            "experiment_count":
                len(self.results),

            "metrics":
                self.calculate_metrics(),

            "results":
                self.results.copy()
        }

        history.append(
            run_record
        )

        os.makedirs(
            os.path.dirname(
                self.history_file_path
            ),
            exist_ok=True
        )

        with open(
            self.history_file_path,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                history,
                file,
                indent=4
            )

        return run_record


    # =========================================================
    # GET SAVED HISTORY
    # =========================================================

    def get_history(self):

        if not os.path.exists(
            self.history_file_path
        ):

            return []

        try:

            with open(
                self.history_file_path,
                "r",
                encoding="utf-8"
            ) as file:

                history = json.load(file)

                if isinstance(
                    history,
                    list
                ):
                    return history

                return []

        except (
            json.JSONDecodeError,
            OSError
        ):

            return []


    # =========================================================
    # PERMANENTLY CLEAR SAVED HISTORY
    # =========================================================

    def clear_history(self):

        os.makedirs(
            os.path.dirname(
                self.history_file_path
            ),
            exist_ok=True
        )

        with open(
            self.history_file_path,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                [],
                file,
                indent=4
            )

        return {
            "status": "cleared",
            "history": []
        }


    # =========================================================
    # EXPORT JSON + CSV REPORTS
    # =========================================================

    def export_report_files(self):

        os.makedirs(
            "data",
            exist_ok=True
        )

        metrics = (
            self.calculate_metrics()
        )

        json_path = os.path.join(
            "data",
            "evaluation_summary.json"
        )

        csv_path = os.path.join(
            "data",
            "evaluation_summary.csv"
        )

        summary = {
            "generated_at":
                datetime.now().isoformat(),

            "metrics":
                metrics,

            "results":
                self.results
        }

        # Save JSON report

        with open(
            json_path,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                summary,
                file,
                indent=4
            )

        # CSV columns

        fieldnames = [
            "scenario",
            "objective",
            "detections",
            "kept",
            "delayed",
            "suppressed",
            "decisions_generated",
            "audio_outputs",
            "haptic_outputs",
            "visual_outputs",
            "models_avoided",
            "cpu_saved",
            "memory_saved_mb",
            "latency_saved_ms",
            "power_units_saved"
        ]

        # Save CSV report

        with open(
            csv_path,
            "w",
            newline="",
            encoding="utf-8"
        ) as file:

            writer = csv.DictWriter(
                file,
                fieldnames=fieldnames
            )

            writer.writeheader()

            for result in self.results:

                row = {
                    key:
                        result.get(
                            key,
                            0
                        )
                    for key in fieldnames
                }

                writer.writerow(
                    row
                )

        return {
            "status":
                "exported",

            "json_file":
                json_path,

            "csv_file":
                csv_path,

            "experiment_count":
                len(self.results)
        }


    # =========================================================
    # CLEAR CURRENT EXPERIMENT RESULTS
    # =========================================================

    def clear_results(self):

        self.results = []

        self.save_results()

        return {
            "status": "cleared",
            "results": []
        }
