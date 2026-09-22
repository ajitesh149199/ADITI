from backend.core.objective_manager import (
    ObjectiveManager,
    ObjectiveType
)


def test_set_objective():
    manager = ObjectiveManager()

    result = manager.set_objective(
        ObjectiveType.NAVIGATION
    )

    assert result == ObjectiveType.NAVIGATION
    assert manager.get_objective() == ObjectiveType.NAVIGATION


def test_clear_objective():
    manager = ObjectiveManager()

    manager.set_objective(
        ObjectiveType.READ_TEXT
    )

    manager.clear_objective()

    assert manager.get_objective() is None

def test_objective_from_text():
    manager = ObjectiveManager()

    result = manager.infer_from_text(
        "Help me avoid obstacles"
    )

    assert result == ObjectiveType.OBSTACLE_AWARENESS