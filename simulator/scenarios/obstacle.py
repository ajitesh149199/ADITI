OBSTACLE_SCENARIO = {
    "name": "Obstacle Awareness",
    "objective": "obstacle_awareness",

    "camera": {
        "frame_id": 1,
        "objects": [
            {
                "object": "bicycle",
                "confidence": 0.94,
                "distance": 2.0,
                "direction": "ahead"
            },
            {
                "object": "tree",
                "confidence": 0.96,
                "distance": 7.0,
                "direction": "right"
            },
            {
                "object": "person",
                "confidence": 0.90,
                "distance": 5.0,
                "direction": "left"
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
        "accuracy_meters": 5.0
    },

    "audio": {
        "transcript": "Help me avoid obstacles",
        "language": "en"
    }
}