# ADITI Experiment Plan

## 1. Objective

The objective of the experiments is to evaluate the functionality and performance of the ADITI architecture.

The experiments will compare ADITI with the defined baseline.

---

## 2. Experiment Environment

The experimental system will consist of:

- Raspberry Pi or development computer
- Camera
- Simulated or physical sensors
- AI model
- ADITI software modules
- Monitoring dashboard
- Audio/haptic output where implemented

During the minor project, simulated sensor data may be used where physical hardware is unavailable.

---

## 3. Experiment 1: Input Processing

### Objective

Verify that ADITI correctly receives and validates input data.

### Procedure

1. Generate sensor input.
2. Send the input to the input module.
3. Validate the received data.
4. Check timestamps and values.
5. Record invalid input handling.

### Expected Result

Valid inputs should be accepted and invalid inputs should be rejected.

---

## 4. Experiment 2: AI Detection

### Objective

Evaluate object detection performance.

### Procedure

1. Provide camera frames.
2. Run the AI model.
3. Record detected objects.
4. Record confidence values.
5. Compare detections with expected objects.

### Measurements

- Detection accuracy
- Inference time
- Confidence score

---

## 5. Experiment 3: Feedback Selection

### Objective

Determine whether ADITI reduces unnecessary feedback.

### Procedure

1. Generate multiple events.
2. Assign different priorities.
3. Pass events to the decision module.
4. Record generated outputs.
5. Compare total events with user feedback events.

### Measurements

- Total events
- Selected events
- Suppressed events
- Duplicate events
- Unnecessary feedback

---

## 6. Experiment 4: Resource Usage

### Objective

Measure the resources required by the system.

### Measurements

- CPU usage
- RAM usage
- Processing time
- AI inference time

The baseline and ADITI should be tested under equivalent conditions.

---

## 7. Experiment 5: End-to-End Latency

### Objective

Measure the time between input generation and final feedback.

### Measurement

Input
   |
   v
AI Processing
   |
   v
Decision
   |
   v
Output

Latency = Output Timestamp - Input Timestamp

---

## 8. Experiment 6: Fault Handling

### Objective

Verify system behavior when input or processing failures occur.

Test conditions include:

- Missing sensor data
- Invalid sensor values
- Camera unavailable
- Communication failure
- Invalid AI result

### Expected Result

The system should identify the failure and avoid generating incorrect feedback.

---

## 9. Comparison

The following parameters should be compared:

- Detection accuracy
- Processing time
- CPU usage
- RAM usage
- Feedback count
- Duplicate feedback
- Unnecessary feedback
- End-to-end latency
- Fault handling