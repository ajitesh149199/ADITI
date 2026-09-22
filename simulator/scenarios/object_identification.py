OBJECT_IDENTIFICATION_SCENARIO = {
    "name": "Object Identification",
    "objective": "object_identification",

    "camera": {
        "frame_id": 3,
        "objects": [
            {
                "object": "bottle",
                "confidence": 0.95,
                "distance": 1.0,
                "direction": "ahead"
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
        "transcript": "What is this?",
        "language": "en"
    }
}