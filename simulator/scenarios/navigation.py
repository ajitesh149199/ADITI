NAVIGATION_SCENARIO = {
    "name": "Navigation",
    "objective": "navigation",

    "camera": {
        "frame_id": 2,
        "objects": [
            {
                "object": "doorway",
                "confidence": 0.92,
                "distance": 6.0,
                "direction": "ahead"
            },
            {
                "object": "person",
                "confidence": 0.88,
                "distance": 4.0,
                "direction": "left"
            }
        ]
    },

    "imu": {
        "movement": "walking",
        "heading": 85,
        "orientation": {
            "pitch": 0,
            "roll": 0,
            "yaw": 85
        }
    },

    "gps": {
        "latitude": 30.3167,
        "longitude": 78.0324,
        "accuracy_meters": 4.0
    },

    "audio": {
        "transcript": "Guide me to the entrance",
        "language": "en"
    }
}