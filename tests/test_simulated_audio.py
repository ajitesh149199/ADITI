from simulator.sensors.simulated_audio import SimulatedAudio


def test_simulated_audio():
    audio = SimulatedAudio()

    audio.set_data({
        "transcript": "Help me avoid obstacles",
        "language": "en"
    })

    audio_data = audio.get_audio()
    aditi_input = audio.get_aditi_input()

    assert "transcript" in audio_data
    assert aditi_input.source == "audio"
    assert aditi_input.data_type == "speech"