CONFLICT_SCENARIO = {
    "name": "Conflicting Information",
    "objective": "obstacle_awareness",

    "camera": {
        "frame_id": 6,
        "objects": [
            {
                "object": "vehicle",
                "confidence": 0.55,
                "distance": 3.0,
                "direction": "ahead"
            }
        ]
    },

    "imu": {
        "movement": "walking",
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
        "accuracy_meters": 15.0
    },

    "audio": {
        "transcript": "Help me avoid obstacles",
        "language": "en"
    }
}