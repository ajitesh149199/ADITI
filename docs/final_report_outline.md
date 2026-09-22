# ADITI Minor Project — Final Report Outline

## Front Matter

1. Title Page
2. Certificate
3. Declaration
4. Acknowledgement
5. Abstract
6. Table of Contents
7. List of Figures
8. List of Tables

---

# Chapter 1 — Introduction

## 1.1 Background
Introduction to multimodal AI systems and assistive intelligent systems.

## 1.2 Problem Statement
Traditional systems may process unnecessary information and activate
unnecessary models even when that information is not relevant to the
current objective.

## 1.3 Proposed Solution
ADITI provides an objective-aware modular pipeline for selecting,
evaluating, fusing, suppressing, and outputting information.

## 1.4 Project Objectives
- Build a modular multimodal AI simulation framework.
- Process simulated camera, IMU, GPS, and audio inputs.
- Evaluate relevance and reliability.
- Fuse information from multiple sources.
- Suppress unnecessary information.
- Select appropriate outputs.
- Demonstrate selective AI-model activation.
- Evaluate the architecture using controlled scenarios.

## 1.5 Scope
This minor project focuses on software simulation.
Physical smart-glasses hardware is future work.

---

# Chapter 2 — Existing Approach and Motivation

## 2.1 Existing Multimodal Systems

## 2.2 Problems / Limitations

## 2.3 Motivation for ADITI

## 2.4 Existing Approach vs ADITI

---

# Chapter 3 — Proposed ADITI Architecture

## 3.1 Architecture Overview

## 3.2 Input Layer
- Camera
- IMU
- GPS
- Audio

## 3.3 Objective Manager

## 3.4 Context Manager

## 3.5 Relevance Engine

## 3.6 Reliability Engine

## 3.7 Fusion Engine

## 3.8 Suppression Engine

## 3.9 Model Orchestrator

## 3.10 Resource Manager

## 3.11 Output Manager

## 3.12 Complete Processing Flow

---

# Chapter 4 — System Design and Implementation

## 4.1 Technology Stack

Backend:
- Python
- FastAPI
- Uvicorn
- Pydantic

Frontend:
- React
- Vite
- JavaScript

Testing:
- Pytest

## 4.2 Project Folder Structure

## 4.3 Backend Implementation

## 4.4 Simulator Implementation

## 4.5 Frontend Dashboard

## 4.6 Backend–Frontend Communication

## 4.7 API Endpoints

---

# Chapter 5 — Simulation Scenarios

## 5.1 Obstacle Awareness

## 5.2 Navigation

## 5.3 Object Identification

## 5.4 Text Reading

## 5.5 General Assistance

## 5.6 Conflict Scenario

## 5.7 Irrelevant Noise Scenario

---

# Chapter 6 — Testing and Validation

## 6.1 Testing Method

## 6.2 Unit Testing

Final automated test result:

46 tests passed.

## 6.3 Scenario Testing

## 6.4 Suppression Validation

## 6.5 System Validation

---

# Chapter 7 — Results and Evaluation

## 7.1 Experiment Results

## 7.2 Output Generation

## 7.3 Information Suppression

## 7.4 Selective Model Usage

## 7.5 Resource Comparison

Important:
CPU, memory, latency, and power figures in the minor project are
simulated/model-estimated values rather than measurements from
physical hardware.

## 7.6 Result Discussion

---

# Chapter 8 — Advantages and Limitations

## 8.1 Advantages

## 8.2 Current Limitations

- Simulated sensor data
- No physical hardware measurements
- Rule-based relevance/reliability logic
- Limited controlled scenarios
- No real-world accuracy benchmark yet
- Resource values are estimated
- Hardware integration remains future work

---

# Chapter 9 — Future Scope

- Smart-glasses hardware integration
- Real camera input
- Real IMU
- GPS
- Microphone
- Object detection
- OCR
- Text-to-speech
- Haptic feedback
- Real-time monitoring
- On-device AI
- Real hardware resource measurements

---

# Chapter 10 — Conclusion

Summarize what ADITI demonstrates and what was successfully
implemented in the minor project.

---

# References

Research papers, documentation, libraries, frameworks, and other
sources used during development.

---

# Appendix

## A — Important Source Code
## B — API Screenshots
## C — Dashboard Screenshots
## D — Test Results
## E — Experiment Results