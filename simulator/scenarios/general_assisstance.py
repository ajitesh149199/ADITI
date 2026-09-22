GENERAL_ASSISSTANCE_SCENARIO = {
    "name": "General Assistance",
    "objective": "general_assistance",

    "camera": {
        "frame_id": 5,
        "objects": [
            {
                "object": "chair",
                "confidence": 0.91,
                "distance": 3.0,
                "direction": "right"
            },
            {
                "object": "table",
                "confidence": 0.93,
                "distance": 4.0,
                "direction": "left"
            }
        ]
    },

    "imu": {
        "movement": "standing",
        "heading": 90,
        "orientation": {
            "pitch": 0,
            "roll": 0,
            "yaw": 90
        }
    },

    "gps": {
        "latitude": 30.3165,
        "longitude": 78.0322,
        "accuracy_meters": 5.0
    },

    "audio": {
        "transcript": "Describe my surroundings",
        "language": "en"
    }
}