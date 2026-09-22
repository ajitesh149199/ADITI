# ADITI Baseline

## 1. Purpose

The baseline defines the reference system used to evaluate the ADITI architecture.

The baseline provides a point of comparison for evaluating processing performance, AI performance, and feedback management.

---

## 2. Baseline System

The baseline represents a conventional assistive AI processing pipeline.

The general flow is:

Camera / Sensor Input
        |
        v
AI Processing
        |
        v
Detected Information
        |
        v
User Feedback

The baseline does not contain the complete ADITI decision and feedback-selection mechanism.

---

## 3. Baseline Characteristics

The baseline primarily performs:

- Input collection
- AI detection
- Basic recognition
- Direct feedback

The baseline provides limited event prioritization and feedback filtering.

---

## 4. Baseline Measurements

The following measurements should be recorded.

### Processing

- Processing time
- AI inference time
- CPU usage
- RAM usage
- Number of processed frames

### AI

- Detection accuracy
- Recognition accuracy
- Confidence score

### Feedback

- Total generated alerts
- Repeated alerts
- Unnecessary alerts
- Feedback frequency

---

## 5. Purpose of Comparison

The baseline is used to determine whether ADITI can:

- Reduce unnecessary feedback
- Reduce repeated feedback
- Maintain acceptable AI performance
- Improve event prioritization
- Maintain reasonable processing requirements
- Provide a modular architecture