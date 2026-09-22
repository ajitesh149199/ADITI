## ADITI — Ai driven Data, Information and Tech Integration
1. Project Overview

ADITI (Ai driven Data, Information and Tech Integration) is a modular assistive-technology architecture designed to integrate sensor data, camera-based vision, AI processing, and user feedback into a single system.

The project is being developed as a prototype for smart assistive glasses intended to help visually impaired users understand their surroundings through AI-generated information and appropriate feedback.

The architecture separates low-level sensor processing from computationally intensive AI processing so that different modules can be developed, tested, and replaced independently.

2. ## Problem Statement

Conventional assistive systems may generate multiple types of information simultaneously, which can result in unnecessary or excessive feedback to the user.

ADITI aims to provide a modular architecture that:

Collects information from different input sources.
Processes sensor and environmental data.
Performs AI-based visual analysis.
Determines which information is relevant.
Provides appropriate output to the user.
Reduces unnecessary feedback.
Allows simulated inputs to be replaced with real hardware inputs later.

3. ## Objectives

The main objectives of ADITI are:

To design a modular architecture for assistive AI systems.
To integrate multiple input sources into a common processing framework.
To separate low-power sensor processing from AI-intensive processing.
To perform camera-based object detection and recognition.
To process sensor information such as IMU and GPS data.
To prioritize important information before generating feedback.
To provide outputs through suitable feedback mechanisms.
To develop a software prototype before implementing the complete hardware system.
To make individual modules replaceable and independently testable.

4. ## System Architecture

ADITI consists of the following major layers:

                    ADITI
                      │
          ┌───────────┴───────────┐
          │                       │
     MCU / Sensor Layer       AI Computer
          │                       │
    ┌─────┼─────┐            ┌────┴────┐
    │     │     │            │         │
   IMU   GPS  Sensors      Camera    AI Model
    │     │     │            │         │
    └─────┴─────┘            └────┬────┘
          │                       │
          └───────────┬───────────┘
                      │
              Data Processing
                      │
              Decision / Priority
                      │
                   Outputs
MCU / Sensor Layer

The MCU layer handles low-level sensor acquisition and basic processing.

It is responsible for:

Reading sensor values.
Performing basic filtering or preprocessing.
Collecting motion information.
Collecting location information.
Sending sensor data to the AI computer or central application.
AI Computer

The AI computer performs computationally intensive operations such as:

Camera processing.
Object detection.
Object recognition.
AI inference.
Data interpretation.
Information prioritization.
Decision and Feedback Layer

This layer determines what information should be presented to the user.

The purpose is to avoid presenting every available piece of information at the same time.

5. ## Main Modules
5.1 Input Module

The input module receives data from different sources.

Possible inputs include:

Camera frames.
IMU data.
GPS coordinates.
Environmental sensor values.
Simulated sensor data.

During the minor-project prototype, simulated inputs can be used where physical hardware is not yet connected.

5.2 Sensor Processing Module

This module handles sensor data received from the MCU or simulator.

Its responsibilities include:

Reading sensor values.
Validating incoming data.
Normalizing data where required.
Detecting abnormal values.
Preparing sensor data for further processing.
5.3 Vision Module

The vision module processes camera input.

It is responsible for:

Receiving camera frames.
Preprocessing images.
Running the AI model.
Detecting objects.
Identifying relevant objects.
Producing structured detection results.
5.4 AI Module

The AI module analyzes visual information and generates meaningful results.

The prototype can support functions such as:

Object detection.
Object recognition.
Scene interpretation.
Detection confidence evaluation.
Selection of relevant information.

The AI model is designed as an independent component so that the model can be replaced or upgraded without redesigning the complete architecture.

5.5 Decision / Priority Module

The decision module determines which information is important enough to generate feedback.

It can consider factors such as:

Object detected.
Detection confidence.
Sensor state.
Environmental conditions.
Priority of the event.
Relevance to the current situation.

This module is an important part of the ADITI architecture because the system does not simply forward every available result to the user.

5.6 Output Module

The output module converts processed information into user feedback.

Possible outputs include:

Text.
Audio notifications.
Text-to-speech.
Visual information.
Haptic feedback.
Alerts.

The prototype can initially implement software-based output while keeping the architecture ready for hardware output devices.

6. ## Prototype Implementation

The minor-project implementation focuses primarily on the software architecture.

Instead of immediately connecting every physical component, the prototype can simulate sensor inputs and demonstrate how the complete data flow works.

The prototype therefore contains:

Simulated / Real Inputs
        ↓
Input Processing
        ↓
Sensor + Vision Processing
        ↓
AI Analysis
        ↓
Decision / Priority
        ↓
Output

The simulated components should follow the same data format expected from the eventual physical sensors.

This makes it possible to replace simulated inputs with actual hardware later without changing the complete application architecture.

7. ## Project Structure
ADITI/
│
├── backend/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── processing/
│   ├── sensors/
│   └── main.py
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── main.*
│
├── ai/
│   ├── models/
│   ├── inference/
│   ├── preprocessing/
│   └── postprocessing/
│
├── simulator/
│   ├── sensor_simulator/
│   ├── camera_simulator/
│   └── scenarios/
│
├── config/
│   └── config.*
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── docs/
│   ├── architecture.md
│   ├── input_contract.md
│   ├── output_contract.md
│   ├── module_specification.md
│   ├── baseline.md
│   ├── experiment_plan.md
│   ├── results.md
│   └── limitations.md
│
├── requirements.txt
├── README.md
└── .gitignore

8. ## Data Flow

The general data flow of the system is:

Input
  ↓
Validation
  ↓
Preprocessing
  ↓
AI / Sensor Processing
  ↓
Result Generation
  ↓
Priority Evaluation
  ↓
Feedback Selection
  ↓
User Output

For camera-based processing:

Camera
  ↓
Frame Capture
  ↓
Image Preprocessing
  ↓
AI Model
  ↓
Object Detection
  ↓
Confidence Evaluation
  ↓
Priority / Decision
  ↓
Output

9. ## Technology Stack

The exact technology stack can be modified during development, but the prototype is designed around the following categories:

## Programming

Python for backend and AI processing.
JavaScript / TypeScript for frontend development where required.
AI / Computer Vision
Computer vision framework.
Object detection model.
Image-processing libraries.
Backend
REST API or equivalent communication layer.
Modular processing services.
Frontend
Web-based dashboard.
Real-time system status.
Camera/vision display.
Sensor information display.
AI detection results.
Hardware Integration

## The architecture is designed to support:

ESP32 or another MCU.
Camera.
IMU.
GPS.
Additional environmental or assistive sensors.
Audio output.
Haptic output.

10. ## Installation

Clone or copy the project into the development environment.

Install the required dependencies using:

pip install -r requirements.txt

Configure the project settings using the configuration file inside the config/ directory.

The AI model and other required resources should be placed in their respective directories.

11. ## Running the Prototype

Start the backend application using the project's configured entry point.

For example:

python backend/main.py

Start the frontend separately according to the selected frontend framework.

The simulator can then be started to generate test sensor and camera inputs.

The resulting information should flow through:

Simulator
   ↓
Backend
   ↓
Processing
   ↓
AI
   ↓
Decision
   ↓
Frontend / Output

12. ## Testing

Testing is performed at multiple levels.

## Unit Testing

Individual modules are tested independently, including:

Sensor processing.
Input validation.
AI processing.
Decision logic.
Output generation.
Integration Testing

## Multiple modules are tested together to verify correct data flow.

Scenario Testing

Different simulated situations are used to verify whether the system produces appropriate outputs.

## Examples of scenarios include:

No object detected.
Single object detected.
Multiple objects detected.
High-confidence detection.
Low-confidence detection.
Multiple simultaneous sensor events.

13. ## Design Principles

ADITI follows the following principles:

Modularity

Each major function is implemented as an independent module.

Replaceability

Simulated components can later be replaced with physical sensors or hardware modules.

Separation of Responsibilities

Sensor acquisition, AI processing, decision-making, and output generation are kept separate.

Scalability

Additional sensors, AI models, and output mechanisms can be added without redesigning the complete architecture.

Priority-Based Feedback

The system attempts to provide relevant information instead of forwarding every available result.

14. ## Current Scope

The current minor-project prototype focuses on demonstrating:

ADITI architecture.
Modular data flow.
Simulated sensor inputs.
Camera input.
AI-based visual processing.
Object detection/recognition.
Decision and priority processing.
Output generation.
Frontend visualization.
Backend communication.

Physical smart-glasses hardware can be integrated in a later stage.

15. ## Future Scope

Future development can include:

Complete physical smart-glasses implementation.
ESP32-based sensor acquisition.
Raspberry Pi or similar AI computer.
Real-time camera processing.
GPS integration.
IMU integration.
Text-to-speech.
Haptic feedback.
Depth estimation.
Improved object recognition.
Hardware power optimization.
Wireless communication.
Battery-powered operation.
Real-world testing.
Model optimization for edge devices.

16. ## Limitations

The prototype has several limitations:

Simulated sensor data may not represent all real-world sensor behavior.
AI performance depends on the selected model and hardware.
Real-time processing may require higher computational resources.
Camera-based detection can be affected by lighting, distance, and occlusion.
Prototype results may differ from results obtained using physical smart-glasses hardware.
The current system is a research and development prototype and is not intended to replace professional assistive devices.

17. ## Project Documentation

Detailed technical documentation is maintained in the docs/ directory.

The documentation includes:

architecture.md — System architecture and module relationships.
input_contract.md — Input data formats and requirements.
output_contract.md — Output formats and feedback definitions.
module_specification.md — Detailed module responsibilities.
baseline.md — Baseline system used for comparison.
experiment_plan.md — Planned experiments and evaluation procedure.
results.md — Experimental results.
limitations.md — Known limitations and constraints.

18. ## Conclusion

ADITI provides a modular architecture for integrating sensors, AI-based vision, decision-making, and user feedback into an assistive system.

The minor-project prototype demonstrates the software architecture and data flow before complete hardware implementation. Its modular design allows individual components to be tested, replaced, or upgraded independently.

The architecture can therefore serve as the software foundation for a future physical smart-glasses prototype.