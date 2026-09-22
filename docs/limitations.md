# ADITI Limitations

## 1. Prototype Limitation

The current ADITI implementation is a prototype intended to demonstrate the architecture and software workflow.

It should not be considered a production-ready assistive device.

---

## 2. AI Limitations

AI performance depends on:

- AI model quality
- Training data
- Camera quality
- Lighting conditions
- Object distance
- Processing hardware

The system may produce incorrect or incomplete detections.

---

## 3. Processing Hardware Limitation

A Raspberry Pi has limited computational resources compared with high-performance computers.

This can affect:

- AI inference speed
- Number of simultaneously running AI models
- Camera processing rate
- Real-time performance
- Power consumption

---

## 4. Depth Limitation

A standard RGB camera does not directly provide accurate depth information.

Accurate distance estimation may require:

- Depth camera
- Stereo camera
- Distance sensor
- Additional computer vision techniques

Depth information should not be considered exact unless it has been validated using suitable hardware.

---

## 5. Environmental Limitations

System performance may change under:

- Low-light conditions
- Excessive brightness
- Rain
- Fog
- Obstructions
- Crowded environments

---

## 6. GPS Limitations

GPS accuracy may decrease in:

- Indoor environments
- Dense buildings
- Underground areas
- Areas with weak satellite visibility

GPS information therefore cannot always be considered continuously reliable.

---

## 7. Communication Limitations

If external communication is used, performance may be affected by:

- Network availability
- Signal strength
- Interference
- Distance
- Connection failures

The system should therefore include communication-failure handling.

---

## 8. Power Limitation

Continuous camera operation and AI processing can consume significant power.

Battery capacity can therefore affect:

- Operating time
- Portability
- Continuous processing capability

---

## 9. Feedback Limitation

ADITI can reduce unnecessary feedback through prioritization and filtering, but it cannot completely eliminate incorrect feedback caused by incorrect sensor readings or AI predictions.

---

## 10. Safety Limitation

The prototype should not be considered the sole source of environmental awareness or navigation assistance.

AI predictions and sensor measurements can be incorrect.

The system is intended for research and prototype demonstration rather than guaranteed safety-critical operation.

---

## 11. Future Improvements

Future versions may include:

- More efficient AI models
- Dedicated AI accelerators
- Improved depth sensing
- More accurate sensors
- Better power management
- Improved feedback algorithms
- Personalized feedback
- Edge AI optimization
- Improved hardware integration
- Larger and more diverse datasets