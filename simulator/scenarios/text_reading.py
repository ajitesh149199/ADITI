TEXT_READING_SCENARIO = {
    "name": "Text Reading",
    "objective": "read_text",

    "camera": {
        "frame_id": 4,
        "objects": [
            {
                "object": "sign",
                "confidence": 0.96,
                "distance": 2.0,
                "direction": "ahead"
            }
        ],
        "detected_text": "Main Entrance"
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
        "transcript": "Read this sign",
        "language": "en"
    }
}
