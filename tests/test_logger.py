from backend.utils.logger import get_logger


def test_logger_creation():
    logger = get_logger("ADITI_TEST")

    assert logger is not None
    assert logger.name == "ADITI_TEST"