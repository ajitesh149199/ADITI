IRRELEVANT_NOISE_SCENARIO = {
    "name": "Irrelevant Noise",
    "objective": "navigation",

    "camera": {
        "frame_id": 99,

        "objects": [
            {
                "object": "distant_poster",
                "confidence": 0.30,
                "distance": 15.0,
                "direction": "right"
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
        "transcript": "",
        "language": "en"
    }
}